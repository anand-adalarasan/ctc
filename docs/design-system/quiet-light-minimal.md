# Quiet Light Minimal

Quiet Light Minimal is the light-theme evolution of the Follow the Light direction for Christ Tamil Church. It keeps the guided, spiritual, spacious feeling leaders liked in the reference, but translates it into a bright, visitor-friendly system using the existing CTC brand colors.

## Design Intent

The site should feel:

- Bright
- Welcoming
- Spiritual
- Modern
- Family-focused
- Easy to visit
- Premium without feeling corporate

Avoid:

- Dark homepage systems
- Neon green effects
- Large lime or orange blocks
- Dashboard-like card grids
- Old church bulletin styling
- Dense above-the-fold content

## Palette: White + Brand Pop

Use white as the dominant experience. Use gray for structure and copy. Use lime as the light-path accent. Use orange for primary visitor actions.

```css
:root {
  --ql-bg: #ffffff;
  --ql-bg-warm: #fffefa;
  --ql-surface: #ffffff;
  --ql-surface-soft: #f7f7f5;
  --ql-ink: #1e241b;
  --ql-body: #4f5353;
  --ql-muted: #6d6e70;
  --ql-muted-soft: #929497;
  --ql-lime: #8cc63e;
  --ql-lime-deep: #5e8f24;
  --ql-lime-soft: #eef8e5;
  --ql-lime-wash: #f7fbf1;
  --ql-orange: #f99d37;
  --ql-orange-deep: #c76312;
  --ql-orange-soft: #fff0df;
  --ql-line: rgba(109, 110, 112, 0.16);
  --ql-line-soft: rgba(109, 110, 112, 0.09);
  --ql-shadow-sm: 0 10px 30px rgba(30, 36, 27, 0.06);
  --ql-shadow-md: 0 22px 60px rgba(30, 36, 27, 0.09);
  --ql-rail: clamp(22px, 6vw, 84px);
}
```

## Color Usage

- White and warm white are the main page backgrounds.
- `#6D6E70` grounds body text, metadata, and dividers.
- `#8CC63E` is the light-path accent: timeline rail, active section dots, small icons, active nav, and subtle hover states.
- `#F99D37` is the action color: "I'm New", Get Directions, and key first-time visitor CTA moments.
- Use dark ink for headings so the page feels premium and readable.

## Typography

- Display headings: `Fraunces`, 400-500.
- Body, nav, and buttons: `Inter`.
- Tamil support: `Anek Tamil`.
- Keep letter spacing at `0` for readable UI text. Use uppercase labels sparingly.

## Timeline Component

The homepage uses a quiet left-side timeline to separate and connect major sections.

Desktop:

- A thin vertical rail sits on the left.
- Each major section has one node.
- Nodes become lime when the section is visible.
- Optional tiny step text can sit beside the node.

Mobile:

- Hide the fixed rail.
- Keep section headers clear and stacked.
- Do not reserve left rail spacing.

The timeline is a guide, not a progress tracker. It should feel calm and spiritual.

## Motion

Use restrained motion only:

- Hero image soft reveal.
- Hero text stagger fade-up.
- Section content fade-up.
- Timeline node activation.
- Gateway tile hover lift.
- CTA arrow movement.

Respect `prefers-reduced-motion` by disabling transforms and showing content immediately.

## Homepage Sections

For the leader-approved Follow the Light homepage direction, use the Josh reference section flow translated into a light theme:

1. Opening: animated light mark, Tamil scripture invitation, first-time visitor message, and "Follow the light" cue.
2. Sunday: large worship rhythm/time treatment.
3. Ways to Belong: editorial ministry list with luminous row hover.
4. Mission + Verse: two-column mission statement and scripture.
5. Visit: "Come home" ending with address, directions, and contact actions.
6. Footer: light closing footer with church identity, worship details, contact, and quick links.

This homepage intentionally does not use the earlier gateway/welcome/place/visitor section set.

## Hero Composition

The opening section should be visitor-clear before it is experimental.

Use a cinematic two-column welcome scene:

- Left side: Tamil scripture invitation, English headline, short visitor copy, Sunday details, and one primary CTA.
- Right side: one warm church/community image with the animated light mark layered as an accent.
- The headline should communicate the church clearly: "A Tamil church family in Chicagoland."
- The first hero phrase should be `என்னிடத்தில் வாருங்கள்` with a small Matthew 11:28 reference.
- Use one primary hero CTA: "I'm New". Do not pair it with "Watch Online" in the hero.
- The CTA belongs directly under the message, not only in fixed chrome.
- Keep Sunday worship time and location visible above the fold.

The animated light system should guide attention toward the message and visit actions. It should not replace human warmth, church identity, or visitor clarity.

## Footer

For the light Follow the Light homepage, the footer should stay bright and calm.
Use white/warm-white surfaces, a subtle lime/orange glow, and a quiet continuation
of the left light rail. Avoid dropping into a heavy dark-green footer on this
homepage because it interrupts the white + brand pop direction.

## Atmosphere Animations

The Josh-inspired homepage may use a richer motion layer than standard inner pages:

- Living light particle canvas.
- Pointer-following light glow on fine pointers.
- Scroll-progress comet on the left rail.
- Animated star/light mark.
- Tamil/English greeting swap.
- Section reveal and section-node activation.
- Ministry row hover movement.

Because the theme is light, motion needs more surface area and contrast than the original dark reference:

- Use a 2px rail with a visible lime/orange comet.
- Active section nodes should fill, glow softly, and draw a short horizontal line toward content.
- Each active section may reveal a broad, low-opacity lime/orange wash behind content.
- The opening section should include a large soft light beam behind the star and greeting.
- Ministry rows should use a pale lime wash, stronger title movement, and arrow affordance on hover.
- The cursor glow should be large enough to read on white, with lime center and orange outer warmth.

Keep all of these respectful of `prefers-reduced-motion`. Reduced-motion users should see static content immediately with no cursor glow, grain motion, spinning, or greeting swap.
