# Image Guidelines — Quiet Grace Minimal

## Purpose

Images should make the Christ Tamil Church website feel warm, human, spiritual, and welcoming.

The website should not rely on weak, low-resolution, generic, or overly staged images. Photography should enrich the message while keeping the page spacious and elegant.

## Image Personality

Images should feel:

- Warm
- Real
- Human
- Natural-light
- Community-centered
- Family-focused
- Spiritual but not staged
- Editorial quality
- Welcoming to first-time visitors

## Preferred Image Themes

Use images that support the actual church experience:

### Hero

- Tamil/South Asian family at a church entrance
- Church members greeting after worship
- Warm fellowship moment
- Multi-generational family/community image
- Natural light and authentic smiles

### Worship / About

- Bright worship service
- Congregation facing stage
- Visible cross if natural
- Warm sanctuary setting
- Uplifting and genuine

### Events

- Church family picnic
- Fellowship meal or gathering
- Prayer conference atmosphere
- Women’s fellowship table scene
- VBS / children’s activity
- Family camp / outdoor fellowship

### Bible Study

- Open Bible in natural light
- Bible study group
- Scripture reading
- Bible journal and coffee

### Prayer

- Hands folded in prayer
- People praying together
- Quiet prayer moment
- Candle/Bible if tasteful

### Sermons

- Pastor preaching
- Church stage/pulpit
- Microphone and Bible
- Warm stage lighting

### Community Outreach

- Volunteers serving
- Community help moment
- Hands helping
- Food pantry / outreach image

## Unsplash Search Terms

Use Unsplash only if real church photos are not available.

Recommended search terms:

- `church family fellowship`
- `Indian family community`
- `Christian fellowship family`
- `church community gathering`
- `church worship congregation`
- `worship service church`
- `church interior worship`
- `open Bible sunlight`
- `Bible study group`
- `prayer hands`
- `people praying church`
- `church fellowship`
- `community gathering`
- `people fellowship dinner`
- `picnic family park`
- `children Bible class`
- `volunteers community`
- `pastor preaching church`
- `church stage sermon`

## Image Usage Rules

### Use 5–7 excellent images total on homepage

Do not fill the page with many average images.

### Use one strong image per major section

Avoid busy image collages.

### Do not imply stock-photo people are church members

If needed, avoid copy that says “our members” directly on stock-photo images.

### Avoid images with visible logos or brands

This includes apparel logos, signage, watermarks, and copyrighted art.

### Avoid dark, gloomy images

The site should feel warm, hopeful, and welcoming.

### Avoid overly corporate images

No business meeting stock photos that feel unrelated to church.

## Recommended Homepage Image Placement

### Hero

Use one large full-background image only.

- Full-bleed or full-section background image
- `object-fit: cover`
- Warm ivory overlay for readable text
- Natural light
- Warm family/community moment
- No busy collage
- One floating Sunday Worship card only

### Welcome/About

Use one worship/community image.

- Bright sanctuary or fellowship scene
- Rounded corners
- No text over image

### Events

Use up to three event images.

- One image per event card
- Avoid more than 3 event cards on homepage

### Ministries

Do not use a photo for every ministry card on the homepage.

Use icons for homepage ministry preview.

### Sermon

Use one video thumbnail / sermon image.

### Visitor Section

Optional one warm family welcome image.

## Image Styling

```css
.image-frame {
  overflow: hidden;
  border-radius: var(--radius-xl);
  background: var(--qgm-surface-soft);
}

.image-frame img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.hero-image {
  aspect-ratio: 1.18 / 1;
  border-radius: var(--radius-xl);
}

.section-image {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
}

.event-image {
  aspect-ratio: 16 / 10;
}
```

## Object Fit

Use:

```css
object-fit: cover;
```

For photos.

Use:

```css
object-fit: contain;
```

Only for flyer-style event images where text must remain visible.

## Performance Rules

- Use optimized image sizes.
- Use `loading="lazy"` for below-the-fold images.
- Do not lazy-load the primary hero image if it is the LCP image.
- Add width and height where practical.
- Use `auto=format` and `q=80` when using Unsplash image URLs.

Example:

```text
https://images.unsplash.com/photo-id?auto=format&fit=crop&w=1600&q=80
```

Recommended widths:

- Hero: `w=1600` or `w=1800`
- Section image: `w=1200`
- Event cards: `w=900`
- Small thumbnails: `w=600`

## Accessibility

Every meaningful image needs helpful alt text.

Good alt text:

```text
Tamil Christian family greeting one another outside a church entrance
```

```text
Congregation gathered for worship in a bright church sanctuary
```

```text
Open Bible on a table in warm natural light
```

Bad alt text:

```text
church image
```

```text
photo
```

```text
hero image
```

Decorative images should use empty alt text:

```html
<img src="..." alt="" />
```

## Image Registry

If possible, centralize image references in:

`src/data/images.ts`

Example:

```ts
export const siteImages = {
  hero: {
    src: "...",
    alt: "Tamil Christian family greeting one another outside a church entrance",
    creditName: "Photographer Name",
    creditUrl: "https://unsplash.com/@photographer?utm_source=christ_tamil_church&utm_medium=referral",
    unsplashUrl: "https://unsplash.com/photos/...",
    usage: "Homepage hero"
  },
  worship: {
    src: "...",
    alt: "Congregation gathered for worship in a bright church sanctuary",
    creditName: "Photographer Name",
    creditUrl: "https://unsplash.com/@photographer?utm_source=christ_tamil_church&utm_medium=referral",
    unsplashUrl: "https://unsplash.com/photos/...",
    usage: "Welcome/about section"
  }
};
```

## Unsplash Notes

- Store attribution metadata even if not visually displayed.
- If using the Unsplash API, follow the API rules for hotlinking and attribution.
- Do not use images with visible logos, copyrighted artwork, or obvious brand marks.

## Image QA Checklist

Before finalizing:

- Does the image feel warm and human?
- Does the image support the section’s message?
- Is the crop natural?
- Is the image bright enough?
- Does it avoid logos/watermarks?
- Is alt text meaningful?
- Is the image optimized?
- Is below-the-fold loading lazy?
- Does the page still feel spacious?
- Are there too many images?
