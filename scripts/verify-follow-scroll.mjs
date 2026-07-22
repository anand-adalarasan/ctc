// Verifies the homepage's native-scroll "Follow the Light" behavior end to
// end: Hero -> Worship -> Connect -> Grow -> Serve -> Footer and back.
//
// Unlike an earlier version of this script, this one:
//  - covers Hero and Footer explicitly (not just the four ministry scenes),
//  - waits for real scroll settlement (polls window.scrollY via rAF until it
//    stops moving, or a generous timeout), never a fixed 260-350ms guess,
//  - asserts scrolling tracks input proportionally (no forced jump-to-stop),
//    which is the concrete symptom of the JS scroll-hijacking this rewrite
//    removes,
//  - statically asserts the component source no longer attaches non-passive
//    wheel/touchmove listeners, calls preventDefault(), or drives
//    programmatic scrollTo() — the primary cause of trackpad lag.
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

function assertNoScrollHijacking() {
  const source = readFileSync(
    join(repoRoot, "src/components/FollowTheLight/FollowTheLight.tsx"),
    "utf8"
  );
  const forbidden = [
    "preventDefault",
    "scrollTo(",
    `addEventListener("wheel"`,
    `addEventListener("touchstart"`,
    `addEventListener("touchmove"`,
    `addEventListener("keydown"`
  ];
  const hits = forbidden.filter((needle) => source.includes(needle));
  if (hits.length > 0) {
    throw new Error(
      `FollowTheLight.tsx still contains scroll-hijacking code: ${hits.join(", ")}`
    );
  }
}

const browser = spawn("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", [
  "--headless", "--disable-gpu", "--no-first-run", "--remote-debugging-pipe",
  `--user-data-dir=${join(tmpdir(), "ctc-edge-scroll-verification")}`,
], { stdio: ["ignore", "ignore", "pipe", "pipe", "pipe"] });

let id = 0;
let buffer = Buffer.alloc(0);
const pending = new Map();
browser.stdio[4].on("data", (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);
  let end;
  while ((end = buffer.indexOf(0)) >= 0) {
    const raw = buffer.subarray(0, end).toString();
    buffer = buffer.subarray(end + 1);
    if (!raw) continue;
    const message = JSON.parse(raw);
    const request = pending.get(message.id);
    if (!request) continue;
    pending.delete(message.id);
    message.error ? request.reject(new Error(message.error.message)) : request.resolve(message.result);
  }
});

function send(method, params = {}, sessionId) {
  const requestId = ++id;
  browser.stdio[3].write(`${JSON.stringify({ id: requestId, method, params, sessionId })}\0`);
  return new Promise((resolve, reject) => pending.set(requestId, { resolve, reject }));
}
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function evaluate(sessionId, expression, awaitPromise = false) {
  const result = await send(
    "Runtime.evaluate",
    { expression, returnByValue: true, awaitPromise },
    sessionId
  );
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || "evaluate() threw");
  }
  return result.result.value;
}

// Waits for real scroll settlement (six consecutive stable animation frames)
// instead of a fixed delay, so it works regardless of gesture speed or
// inertial tail length.
async function waitForScrollSettle(sessionId, timeoutMs = 4000) {
  return evaluate(
    sessionId,
    `new Promise((resolve) => {
      let last = window.scrollY;
      let stable = 0;
      const start = performance.now();
      function check() {
        const y = window.scrollY;
        stable = Math.abs(y - last) < 0.5 ? stable + 1 : 0;
        last = y;
        if (stable >= 6 || performance.now() - start > ${timeoutMs}) {
          resolve(y);
          return;
        }
        requestAnimationFrame(check);
      }
      requestAnimationFrame(check);
    })`,
    true
  );
}

async function state(sessionId) {
  return evaluate(sessionId, `(() => {
    const active = document.querySelector('[aria-label="Our life together"] [class*="_on_"] [class*="eyebrow"]');
    const hero = document.getElementById('open');
    const footer = document.querySelector('footer.footer');
    const heroRect = hero.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const vh = window.innerHeight;
    return {
      scrollY: Math.round(window.scrollY),
      activeScene: active ? active.textContent : null,
      heroVisible: heroRect.top < vh * 0.6 && heroRect.bottom > vh * 0.4,
      footerVisible: footerRect.top < vh * 0.6 && footerRect.bottom > 0,
      maxScroll: Math.round(document.documentElement.scrollHeight - vh)
    };
  })()`);
}

async function page(width, height, mobile, reducedMotion = false) {
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile }, sessionId);
  await send("Emulation.setTouchEmulationEnabled", { enabled: mobile, maxTouchPoints: 1 }, sessionId);
  if (reducedMotion) {
    await send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }]
    }, sessionId);
  }
  await send("Page.enable", {}, sessionId);
  await send("Runtime.enable", {}, sessionId);
  await send("Page.navigate", { url: "http://127.0.0.1:5174/ctc/" }, sessionId);
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await evaluate(sessionId, `Boolean(document.querySelector('[aria-label="Our life together"]') && document.getElementById('open') && document.querySelector('footer.footer'))`)) break;
    await wait(200);
  }
  await evaluate(sessionId, `window.scrollTo(0, 0)`);
  await waitForScrollSettle(sessionId);
  return sessionId;
}

// Dispatches a stream of small wheel ticks (like a real trackpad) and
// records scrollY after every tick, with no forced wait between them, so the
// trace exposes whether scrolling tracks input proportionally or jumps.
async function wheelTrace(sessionId, direction, ticks = 60, magnitude = 55) {
  const trace = [];
  for (let i = 0; i < ticks; i += 1) {
    await send("Input.dispatchMouseEvent", {
      type: "mouseWheel", x: 700, y: 430, deltaX: 0, deltaY: direction * magnitude,
    }, sessionId);
    trace.push((await state(sessionId)).scrollY);
  }
  await waitForScrollSettle(sessionId);
  trace.push((await state(sessionId)).scrollY);
  return trace;
}

// Dispatches a continuous multi-point touch swipe (not a single start/end
// jump) so native touch-scroll momentum is exercised like a real finger.
async function touchTrace(sessionId, direction, steps = 24) {
  const startY = direction > 0 ? 700 : 140;
  const endY = direction > 0 ? 140 : 700;
  const trace = [];
  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 195, y: startY }] }, sessionId);
  for (let i = 1; i <= steps; i += 1) {
    const y = startY + ((endY - startY) * i) / steps;
    await send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 195, y }] }, sessionId);
    trace.push((await state(sessionId)).scrollY);
  }
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }, sessionId);
  await waitForScrollSettle(sessionId);
  trace.push((await state(sessionId)).scrollY);
  return trace;
}

function assertMonotonic(trace, direction, label) {
  for (let i = 1; i < trace.length; i += 1) {
    const delta = trace[i] - trace[i - 1];
    if (direction > 0 ? delta < -1 : delta > 1) {
      throw new Error(`${label}: scrollY moved the wrong way (${trace[i - 1]} -> ${trace[i]})`);
    }
  }
}

function assertNoForcedJump(trace, label, maxStepFraction = 0.35) {
  // A forced scrollTo()-driven "jump to next stop" shows up as one huge step
  // relative to the whole trace range. Proportional native scrolling does
  // not produce a single dominant step.
  const range = Math.max(1, trace[trace.length - 1] - trace[0]);
  for (let i = 1; i < trace.length; i += 1) {
    const step = Math.abs(trace[i] - trace[i - 1]);
    if (step > range * maxStepFraction && step > 150) {
      throw new Error(
        `${label}: found an oversized single scroll step (${step}px of ${range}px total) — looks like a forced programmatic jump, not native tracking`
      );
    }
  }
}

function assertVisitedInOrder(labels, expectedOrder, label) {
  const seen = [...new Set(labels.filter(Boolean))];
  let cursor = -1;
  for (const scene of seen) {
    const index = expectedOrder.indexOf(scene);
    if (index === -1) continue;
    if (index < cursor) {
      throw new Error(`${label}: scenes visited out of order — saw ${seen.join(" -> ")}`);
    }
    cursor = index;
  }
}

async function verifyDesktopFullRoute() {
  const session = await page(1440, 900, false);

  const top = await state(session);
  if (!top.heroVisible || top.scrollY !== 0) {
    throw new Error(`Desktop: expected to start at Hero, got ${JSON.stringify(top)}`);
  }

  const down = await wheelTrace(session, 1, 90, 60);
  assertMonotonic(down, 1, "Desktop downward wheel trace");
  assertNoForcedJump(down, "Desktop downward wheel trace");

  const bottom = await state(session);
  if (!bottom.footerVisible) {
    throw new Error(`Desktop: expected to reach Footer, got ${JSON.stringify(bottom)}`);
  }

  const up = await wheelTrace(session, -1, 90, 60);
  assertMonotonic(up, -1, "Desktop upward wheel trace");
  assertNoForcedJump(up, "Desktop upward wheel trace");

  const backAtTop = await state(session);
  if (!backAtTop.heroVisible) {
    throw new Error(`Desktop: expected to return to Hero, got ${JSON.stringify(backAtTop)}`);
  }

  return { down, up, bottom, backAtTop };
}

async function verifyMobileFullRoute() {
  const session = await page(390, 844, true);

  const top = await state(session);
  if (!top.heroVisible) {
    throw new Error(`Mobile: expected to start at Hero, got ${JSON.stringify(top)}`);
  }

  // Several swipes are needed to cross the full Hero -> Footer distance.
  let lastFooterVisible = false;
  const sceneLabels = [];
  for (let i = 0; i < 8 && !lastFooterVisible; i += 1) {
    await touchTrace(session, 1, 20);
    const s = await state(session);
    sceneLabels.push(s.activeScene);
    lastFooterVisible = s.footerVisible;
  }
  if (!lastFooterVisible) {
    throw new Error("Mobile: did not reach Footer after repeated swipes down");
  }
  assertVisitedInOrder(sceneLabels, ["Worship", "Connect", "Grow", "Serve"], "Mobile downward swipes");

  let backAtHero = false;
  const reverseLabels = [];
  for (let i = 0; i < 8 && !backAtHero; i += 1) {
    await touchTrace(session, -1, 20);
    const s = await state(session);
    reverseLabels.push(s.activeScene);
    backAtHero = s.heroVisible;
  }
  if (!backAtHero) {
    throw new Error("Mobile: did not return to Hero after repeated swipes up");
  }
  assertVisitedInOrder(reverseLabels, ["Serve", "Grow", "Connect", "Worship"], "Mobile upward swipes");

  return { sceneLabels, reverseLabels };
}

async function verifyReducedMotion() {
  const session = await page(1440, 900, false, true);
  const allOn = await evaluate(session, `Array.from(
    document.querySelectorAll('[aria-label="Our life together"] [class*="_scene_"]')
  ).every((scene) => !scene.hasAttribute('aria-hidden') && !scene.hasAttribute('inert'))`);
  if (!allOn) {
    throw new Error("Reduced motion: expected every scene visible and focusable, found hidden/inert scenes");
  }
  return { allOn };
}

try {
  assertNoScrollHijacking();
  const desktop = await verifyDesktopFullRoute();
  const mobile = await verifyMobileFullRoute();
  const reducedMotion = await verifyReducedMotion();

  console.log(JSON.stringify({
    passed: true,
    desktopDownTrace: desktop.down,
    desktopUpTrace: desktop.up,
    mobileScenesDown: mobile.sceneLabels,
    mobileScenesUp: mobile.reverseLabels,
    reducedMotion
  }, null, 2));
} catch (error) {
  console.error(JSON.stringify({ passed: false, error: error.message }, null, 2));
  process.exitCode = 1;
} finally {
  browser.kill();
}
