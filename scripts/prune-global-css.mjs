import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";

const root = process.cwd();
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".html"]);

function collectFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(absolute);
    return sourceExtensions.has(path.extname(entry.name)) ? [absolute] : [];
  });
}

function collectCssFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectCssFiles(absolute);
    return entry.name.endsWith(".css") ? [absolute] : [];
  });
}

function splitSelectors(selector) {
  const parts = [];
  let start = 0;
  let depth = 0;
  let quote = "";

  for (let index = 0; index < selector.length; index += 1) {
    const character = selector[index];
    if (quote) {
      if (character === quote && selector[index - 1] !== "\\") quote = "";
      continue;
    }
    if (character === '"' || character === "'") quote = character;
    else if (character === "(" || character === "[") depth += 1;
    else if (character === ")" || character === "]") depth -= 1;
    else if (character === "," && depth === 0) {
      parts.push(selector.slice(start, index).trim());
      start = index + 1;
    }
  }

  parts.push(selector.slice(start).trim());
  return parts.filter(Boolean);
}

const sourceText = collectFiles(path.join(root, "src"))
  .concat([path.join(root, "index.html")])
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

const classCache = new Map();
function isUsed(className) {
  if (!classCache.has(className)) {
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    classCache.set(
      className,
      new RegExp(`(^|[^A-Za-z0-9_-])${escaped}([^A-Za-z0-9_-]|$)`).test(sourceText),
    );
  }
  return classCache.get(className);
}

const allCssFiles = collectCssFiles(path.join(root, "src"));
const cssPaths = process.argv.includes("--all")
  ? allCssFiles
  : [path.join(root, "src", "styles.css")];
const write = process.argv.includes("--write");
const reports = [];

for (const cssPath of cssPaths) {
  const original = fs.readFileSync(cssPath, "utf8");
  const rootNode = postcss.parse(original, { from: cssPath });
  let rulesRemoved = 0;
  let selectorBranchesRemoved = 0;

  rootNode.walkRules((rule) => {
    if (rule.parent?.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;

    const selectors = splitSelectors(rule.selector);
    const kept = selectors.filter((selector) => {
      const classes = [...selector.matchAll(/\.(-?[_a-zA-Z]+[\w-]*)/g)].map((match) => match[1]);
      return classes.length === 0 || classes.every(isUsed);
    });

    selectorBranchesRemoved += selectors.length - kept.length;
    if (kept.length === 0) {
      rulesRemoved += 1;
      rule.remove();
    } else if (kept.length !== selectors.length) {
      rule.selector = kept.join(",\n");
    }
  });

  rootNode.walkAtRules((atRule) => {
    if (atRule.nodes && atRule.nodes.length === 0) atRule.remove();
  });

  const result = rootNode.toString();
  if (write) fs.writeFileSync(cssPath, result, "utf8");
  if (rulesRemoved || selectorBranchesRemoved) {
    reports.push({
      file: path.relative(root, cssPath),
      rulesRemoved,
      selectorBranchesRemoved,
      bytesBefore: Buffer.byteLength(original),
      bytesAfter: Buffer.byteLength(result),
    });
  }
}

console.log(JSON.stringify({ write, reports }, null, 2));
