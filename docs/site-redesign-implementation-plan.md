# Christ Tamil Church subpage redesign and migration plan

Status: implementation blueprint, prepared July 12, 2026

## 1. Current-state audit

### Platform and styling

- React 18, TypeScript, Vite, and React Router 6; icons come from `lucide-react`.
- Routes are declared directly in `src/App.tsx`; there is no CMS, API layer, test runner, form service, or metadata library.
- The approved homepage and most global/interior styles live in `src/styles.css`. The canonical design rules are documented in `docs/design-system/ctc-design-template.md`.
- Shared factual content is partly centralized in `src/data/site.ts`; images are registered in `src/data/images.ts`, though several locally imported ministry images bypass that registry.
- Reveal-on-scroll behavior is provided by `useRevealOnScroll`; the homepage has additional exclusive canvas, comet, and Follow the Light effects that must not be copied to inner pages.

### Homepage design language to extend

- Deep green leads; cream and sage bands create pacing; brass/bronze is reserved for labels and a single primary CTA.
- Display typography, restrained body widths, generous vertical spacing, rounded image frames/cards, pill buttons, and editorial image/text alternation establish the visual character.
- Interior pages should use a compact `PageHero`, two to four single-purpose bands, and a contextual closing CTA.
- Canonical responsive checkpoints are wide desktop (about 1900 px), tablet (about 900 px), and phones (487 px and 380 px).

### Current routes

| Route | Current role | Assessment |
| --- | --- | --- |
| `/` | Approved homepage | Retain; reference implementation |
| `/visit` | Visitor information | Expand into the combined I'm New and About destination |
| `/worship` | Sunday worship experience | Retain; remove overlap with Visit |
| `/grow` | Ministry landing page | Rename route to `/ministries`, retain redirect |
| `/grow/bible-study-prayer` | Bible study and prayer | Retain under Ministries |
| `/grow/sunday-school` | B.L.A.S.T. Sunday School | Retain under Ministries |
| `/grow/kids-circle` | Kids Circle | Retain under Ministries |
| `/serve` | Community outreach | Retain and deepen |
| `/sermons` | Three illustrative cards | Retain route, replace fabricated/placeholder entries with verified archive data |
| `/connect` | Events and fellowship | Rename route to `/events`, retain redirect |
| `/faith` | Statement of faith | Merge into I'm New; redirect to `/visit#beliefs` |
| `/pastors` | Pastor profile | Merge into I'm New; redirect to `/visit#leadership` |
| `/contact` | Contact/Facebook embed | Retain; make contact and prayer task primary |

### Reusable components already present

- `Layout`: shared header, mobile navigation, footer, skip link, active route handling.
- `SectionHeader`, `FeatureRows`, `EventFlyerCard`.
- `ChildrenMinistry` primitives for hero cards, feature grids, related pages, acronym strip, and family CTA.
- `useRevealOnScroll` for restrained progressive enhancement.

### Major inconsistencies and risks

- The header navigation is hard-coded in `Layout.tsx` while a different navigation model exists in `src/data/site.ts`.
- The footer links to `/events`, but that route does not exist, creating a dead internal link.
- Several pages are thin (`Serve`, `Sermons`, `Pastors`) or contain implementation-facing language instead of visitor-facing copy.
- The current sermon cards use unverified titles/descriptions and must be removed or replaced with source-backed records.
- Factual conflicts: current app says Sunday at 10:30 AM; legacy pages say 12:30 PM. Current app uses `(773) 936-3697` and `ctcchicago@gmail.com`; legacy pages use `+1-773-936-3097` and `info@ChristTamilChurch.com`.
- Some text is mojibake (`வணக்கம்`, separators, copyright symbol) and must be normalized as UTF-8.
- The legacy events page mixes recurring service information with events and displays stale times. The annual retreat page contains event-specific pricing that should be archived unless reconfirmed.
- No route-level titles, descriptions, canonicals, 404 route, redirect mechanism, automated accessibility checks, or broken-link checks exist.
- The mobile menu closes on route change and supports Escape, but needs focus management, focus return, scroll locking, and current-page semantics verification.
- Remote Unsplash assets can affect reliability, privacy, and layout stability; dimensions and local optimization should be evaluated.
- The worktree contains existing user changes to the homepage, motion components, Sunday School styles, global styles, and build output. Migration work must avoid overwriting them.

## 2. Recommended information architecture

Primary navigation, in the requested order:

1. Home
2. I'm New
3. Worship
4. Grow
5. Connect
6. Serve
7. Contact
8. Events

Hierarchy:

```text
Home
I'm New
  Plan Your Visit
  Mission & Vision
  Beliefs
  Leadership
Worship
Ministries
  Bible Study & Prayer
  Sunday School — B.L.A.S.T.
  Kids Circle
  Fellowship (section until verified programs warrant pages)
Events
Sermons
Serve
Contact & Prayer
```

Key decisions:

- I'm New combines first-visit information with church identity, mission, beliefs, and leadership. This removes a standalone About destination while giving newcomers one complete orientation journey.
- Worship explains the service itself and links back to I'm New for arrival details without repeating full sections.
- Grow remains the requested header label and groups participant-oriented ministries.
- Connect remains a relationship/fellowship destination. Events is also retained as a distinct header item for scheduled gatherings; their content models must avoid duplication.
- Sermons remains top-level because the legacy archive is substantial, but Blog/Clay Pot stays archived until a maintained content source is confirmed.
- Serve remains top-level because outreach is a distinct next step, but its schedule and activities require confirmation.

## 3. Legacy migration matrix

| Legacy page or link | Existing purpose | Action | New destination | Retain | Rewrite | Redirect |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | Entry, verse, worship, media, events | Redesign already completed | `/` | Core visitor priorities and bilingual identity | Remove slider-era presentation and stale duplicates | No |
| `/mission/` | Mission and vision | Merge | `/visit#mission` | Goal and four vision points | Grammar, headings, visitor framing | Yes |
| `/beliefs/` | Statement of faith | Merge | `/visit#beliefs` | All seven theological statements and references | Readability only; preserve meaning | Yes |
| `/pastor/` | Pastor profile | Merge | `/visit#leadership` | Verified name, role, biography, photo | Remove implementation-facing copy | Yes |
| `/contact-us/` | Contact and prayer form | Rename/redesign | `/contact` | Contact/prayer intent and fields if form delivery is restored | Task-focused labels, consent/error states | Yes |
| `/worship/` | What happens on Sunday | Redesign | `/worship` | Music, testimony, Kids Circle, prayer, Sunday School, sermon, communion, fellowship | Consolidate sequence and clarify expectations | Canonical route retained |
| `/events/` | Recurring service listing | Redesign | `/events` | Verified recurring and upcoming gatherings | Separate recurring rhythms from dated events | Canonical route retained |
| `/fellowship-hour/` | Post-service fellowship | Convert to section | `/events#fellowship` | Purpose and after-service invitation | Remove unverified 2:30 time | Yes |
| `/bible-study/` | Bible study and fasting prayer | Redesign/rename | `/ministries/bible-study-prayer` | Program purposes and verified cadence | Visitor-focused structure | Yes |
| `/sunday-school/` | B.L.A.S.T. children’s ministry | Redesign | `/ministries/sunday-school` | Acronym, gospel focus, all-ages welcome | Parent-facing expectations and safety detail only when verified | Yes |
| `/kids-circle/` | Children’s segment during service | Redesign | `/ministries/kids-circle` | Purpose and during-service context | Parent-facing structure | Yes |
| `/audio-sermons/` | Large bilingual sermon archive | Rename/redesign | `/sermons` | Verified date, theme, speaker, working media URL | Normalize names/dates; introduce filters | Yes |
| `/blog/` or Clay Pot link | Legacy blog | Archive pending audit | `/sermons` or no public replacement | Only articles confirmed useful/current | None until source is accessible and ownership is clear | Yes if URL confirmed |
| `/community-outreach/` | Service activities | Redesign | `/serve` | Food packing, meals, donation drives | Remove/flag unverified schedule | Yes |
| `/annual-church-retreat/` and `/?p=1455` | One dated retreat registration/pricing page | Archive | `/events` | Historical record only if church requests it | Do not migrate stale prices/form | Yes |
| Legacy past-events views | Historical event list | Archive or merge selectively | `/events` | Only meaningful records with dates/media | Remove expired calls to action | Yes where URLs are known |

## 4. Shared component plan

| Component | Purpose | Consumers |
| --- | --- | --- |
| `PageHero` | Compact interior hero with eyebrow, title, intro, optional image/CTA | All interior pages |
| `ContentSection` | Canonical width, semantic band, tone and spacing | All interior pages |
| `ImageTextSection` | Alternating editorial image/copy | I'm New, Worship, Serve, ministry pages |
| `FeatureGrid` | Small set of scannable concepts | Worship, Grow, I'm New |
| `InfoCard` / `ServiceInfoCard` | Time, address, parking, child information | I'm New, Worship, Contact |
| `MinistryCard` | Audience, purpose, cadence, CTA | Ministries and related-ministry areas |
| `EventCard` | Verified date/cadence/location and state | Events, homepage preview |
| `SermonCard` | Title, speaker, date, language, media link | Sermons |
| `ScriptureHighlight` | A single theological/editorial pause | I'm New, Worship, ministries |
| `Accordion` | Accessible disclosure for FAQs/beliefs on small screens | I'm New, Worship |
| `CallToAction` / `ClosingBand` | One contextual next step | All interior pages |
| `Breadcrumbs` | Orientation on nested ministry routes | Ministry detail pages |
| `PageMeta` | Route title, description, canonical URL | Every route |
| `RedirectRoute` and `NotFound` | Preserve legacy URLs and prevent dead ends | Router |

All shared primitives should use the canonical tokens, accept semantic elements where appropriate, preserve visible focus states, and work without animation.

## 5. Page-by-page plan

### I'm New (`/visit`)

- Goal/audience: help first-time individuals and families understand the church, decide to attend, and know what CTC believes.
- Sections: welcoming hero; verified time/location; arrival and parking; service overview; children; fellowship; mission and vision; beliefs; leadership; FAQ; directions CTA.
- Sources: current `churchInfo`, legacy Worship/Fellowship/Mission/Beliefs/Pastor content, verified church input.
- CTAs: Get directions (primary), explore Worship (secondary), ask a question.
- Pattern/motion: visitor/editorial hybrid with alternating bands and gentle section reveals only; optional accessible belief accordion on small screens.
- Responsive: keep time/address above the fold, stack arrival steps, constrain doctrine line lengths, preserve anchor offsets, and keep directions usable without an embed.

### Worship (`/worship`)

- Goal/audience: set clear expectations for a Tamil-and-English Sunday gathering.
- Sections: hero; service essentials; worship flow; children; communion/fellowship; first-visit CTA.
- Sources: legacy Worship plus current centralized facts.
- CTAs: Plan your visit; get directions.
- Pattern/motion: visitor template with restrained stagger on worship-flow items.
- Responsive: present the sequence linearly; no text over complex images.

### Ministries (`/ministries`)

- Goal/audience: help adults and parents find a relevant path to participate.
- Sections: hero; ministry pathways; children/family band; prayer/Bible study band; fellowship and outreach; contact CTA.
- Sources: current Grow content and verified legacy ministry pages.
- CTAs: open ministry detail; ask where to begin.
- Pattern/motion: ministry landing/listing hybrid; cards reveal by row.
- Responsive: cards become a single readable list and show audience/cadence without hover.

### Bible Study & Prayer

- Goal/audience: explain spiritual formation gatherings and how to join.
- Sections: purpose; what to expect; verified rhythms; prayer invitation; related ministries; contact CTA.
- Sources: legacy Bible Study and current data, with schedule conflict flagged.
- Motion/responsive: ministry template; no decorative motion; schedules become stacked facts.

### Sunday School — B.L.A.S.T.

- Goal/audience: give parents confidence and children a clear invitation.
- Sections: purpose; B.L.A.S.T. meaning; experience; verified timing/ages; parent checklist; related ministries; family CTA.
- Sources: legacy Sunday School and current page.
- Motion/responsive: restrained card stagger; acronym wraps accessibly; parent essentials precede decorative content on phones.

### Kids Circle

- Goal/audience: clarify the short children’s experience during worship.
- Sections: purpose; during-service flow; audience/timing when verified; relationship to Sunday School; parent CTA.
- Sources: legacy Kids Circle and current page.
- Motion/responsive: ministry template; concise mobile reading order.

### Events (`/events`)

- Goal/audience: show what is actually happening and recurring church rhythms.
- Sections: hero; next verified event; recurring weekly/monthly gatherings; annual/seasonal items; empty state; fellowship section; contact CTA.
- Sources: `churchEvents`, confirmed announcements, legacy Events/Fellowship.
- CTAs: event-specific action; contact for details.
- Pattern/motion: listing template; no filters until volume justifies them.
- Responsive: date/location remain visible; flyers retain readable aspect ratio and text alternatives.

### Sermons (`/sermons`)

- Goal/audience: provide a trustworthy bilingual teaching archive.
- Sections: hero; latest verified message; language/year filters; archive; unavailable-link state; worship CTA.
- Sources: legacy Audio Sermons and future maintained media source.
- CTAs: Watch/listen; join Sunday worship.
- Pattern/motion: listing template; subtle hover/play feedback only.
- Responsive: filters use native controls or scroll-safe chips; Tamil titles retain proper font support.

### Serve (`/serve`)

- Goal/audience: turn interest into a concrete service conversation.
- Sections: hero; purpose; verified outreach activities; how participation works; other ministry service paths if confirmed; contact CTA.
- Sources: legacy Community Outreach and verified church input.
- CTAs: Ask about serving; contact the church.
- Pattern/motion: editorial/ministry template; one gentle image reveal.
- Responsive: activity cards stack; do not publish an uncertain schedule.

### Contact & Prayer (`/contact`)

- Goal/audience: make calling, emailing, directions, and prayer requests simple.
- Sections: hero; contact methods; directions; accessible form only when delivery endpoint is verified; social link; privacy note.
- Sources: centralized church info and legacy form purpose.
- CTAs: call/email, directions, submit request when functional.
- Pattern/motion: contact template; no animation on validation/error feedback.
- Responsive: avoid making a heavy Facebook embed the primary content; large tap targets and correct keyboard types.

## 6. Removal and archive list

- Remove the homepage-era slider, generic “get connected via media” repetition, and duplicate subscription forms from migrated content; they obscure primary tasks.
- Remove fabricated sermon cards from production content; replace only with verified legacy records or a clearly labeled unavailable state.
- Archive the dated annual retreat pricing/registration page; expired prices and logistics could mislead visitors.
- Convert Fellowship Hour from a standalone thin page into an Events or Worship section.
- Merge standalone About, Mission, Beliefs, and Pastor pages into I'm New; each remains addressable through redirects and anchors.
- Keep Clay Pot/blog out of navigation until its archive, ownership, update cadence, and useful articles are verified.
- Remove implementation notes such as “becomes a clean archive” from visitor-facing pages.
- Do not carry forward generic decorative icons/images that do not add meaning, repeated prominent images, or the homepage-only atmospheric effects.
- Do not display event schedules, pastor biographies, sermon titles, or contact details that cannot be sourced.

## 7. Sequenced implementation checklist

### Foundation

- [x] Audit current routes, shared components, stack, and design rules.
- [x] Inventory the public legacy navigation and major content destinations.
- [x] Define target sitemap, migration matrix, component plan, and page briefs.
- [ ] Resolve worship time, phone, email, pastor profile, and ministry schedule conflicts with church leadership.
- [ ] Normalize UTF-8/mojibake and centralize all verified organization facts.
- [ ] Create one canonical navigation model used by header, footer, sitemap, and link checks.
- [x] Add route metadata, canonical URLs, a 404 page, and legacy redirects.

### Representative vertical slice

- [ ] Build `PageHero`, `ContentSection`, `ImageTextSection`, `ScriptureHighlight`, `Accordion`, and `ClosingBand` primitives.
- [x] Expand I'm New as the representative visitor/editorial page using only source-backed content.
- [x] Merge the About content into `/visit` and redirect `/about`, `/faith`, `/beliefs`, `/mission`, `/pastor`, and `/pastors` to the appropriate `/visit` anchors.
- [ ] Verify I'm New at 1900, 900, 487, and 380 px; keyboard, reduced motion, contrast, headings, and links.
- [ ] Record the approved pattern in `docs/design-system/pages/im-new.md` before scaling.

### Visitor journey and navigation

- [ ] Upgrade shared header/mobile navigation/footer, including focus management and dead-link removal.
- [ ] Complete I'm New and Worship without duplicated sections.
- [ ] Validate current service facts before release.

### Ministries and participation

- [ ] Implement Ministries landing page and redirect `/grow`.
- [ ] Migrate Bible Study & Prayer, Sunday School, and Kids Circle one page at a time.
- [ ] Complete Serve from verified outreach content.

### Listings and contact

- [x] Separate Events from Connect; distinguish recurring and annual gatherings using the current event data.
- [x] Replace illustrative sermon records with an initial verified legacy set and working media URLs; defer filters until the full archive is reviewed.
- [x] Implement Contact & Prayer using direct phone/email actions because no verified form endpoint exists.

### Quality and release

- [ ] Add automated route/link checking and test every direct URL/refresh.
- [ ] Run responsive visual QA at canonical widths on every page.
- [ ] Run keyboard and screen-reader smoke tests; automated accessibility audit; reduced-motion check.
- [ ] Check image dimensions, lazy loading, layout shift, bundle size, and remote asset reliability.
- [ ] Review titles, descriptions, canonicals, redirects, sitemap/robots support, and structured church data.
- [ ] Complete factual/content sign-off and remove all implementation notes from public UI.
- [ ] Build successfully and document results, remaining debt, and future enhancements.

## Church confirmation required

1. Is Sunday worship at 10:30 AM (current app) or 12:30 PM (legacy site)? Does Sunday School have a separate start time?
2. Is the public phone `(773) 936-3697` or `(773) 936-3097`?
3. Is the public email `ctcchicago@gmail.com`, `info@ChristTamilChurch.com`, or should both be used for different purposes?
4. Confirm the current pastor’s full name, title, biography, and approved photo; legacy sermon records include multiple name variants.
5. Confirm Bible Study, Prayer Conference, Fasting Prayer, outreach, fellowship, and children’s ministry schedules and locations.
6. Identify the maintained source for current sermons/events and whether old Facebook Watch links should remain public.
7. Confirm whether Clay Pot/blog articles should be preserved, archived privately, or redirected to Sermons.
8. Confirm whether a contact/prayer form has an existing delivery endpoint and privacy policy.

## Delivery strategy

Migrate one page per reviewable change. Start with the combined I'm New page to validate the visitor/editorial template; then complete Worship, Grow and its detail pages, Connect, Events, Sermons, Serve, and Contact. Each page is complete only after desktop/tablet/mobile, keyboard, reduced-motion, content-source, metadata, and link checks pass. Existing homepage work remains untouched except for shared navigation, verified links, and centralized facts that are explicitly required site-wide.
