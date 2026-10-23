# PRYDD design direction

## Adopted direction

The comparison is closed. The PRYDD design is now the site's homepage at `/`, and the reversible comparison route `/design/prydd` has been removed along with the one-payment destination and the palette switcher.

- **Destination:** three product panels. The one-sending-money sequence is no longer built; its implementation remains in git history.
- **Palette:** the hero palette follows `prefers-color-scheme` rather than a control. Light mode uses the white hero; dark mode uses the `#17191d` hero with `#fafaf7` type. The full-blue palette is dropped. As in the comparison, the palette governs the hero only: **the body stays white/black in both schemes**.
- **Theming:** the hero and body colours read from `--prydd-*` custom properties declared on the page root in `components/prydd/prydd-home.module.css`, replacing the hard-coded values that were scattered through both stylesheets. Only `--hero-bg` and `--hero-ink` change under `@media (prefers-color-scheme: dark)`; the body tokens are scheme-independent by design.
- **Brand:** the rebrand is applied, and the site is `prydd.co`. Copy, metadata, JSON-LD, sitemap, robots, favicons, the generated Open Graph card and the transactional email sender all read PRYDD, and the navbar, footer and waitlist header share the `PryddWordmark`.
- **Identifiers kept:** `com.giftedborg.xend` in `assetlinks.json` and `apple-app-site-association` is the mobile bundle ID; renaming it breaks Android deep links and passkey sign-in. `@xend_global` is a live X account with no PRYDD equivalent yet. `Entrypoint Labs, Inc.` is the legal entity, not the brand, and stays in the Terms and Privacy Policy.
- **Open:** `public/litepaper.pdf` is still Xend-branded and is linked from the navbar and footer. There is no theme toggle; the hero palette follows the operating system.

Sections below record the discovery that produced this direction. Where they describe the comparison controls, both destinations or three palettes, they are history.


Working brief from the design discussion on 14 October 2026. A reversible local comparison at `/design/prydd` implements the user's explicit reference mapping for review. Both motion destinations and the three hero palettes remain available by request; selecting one is a later design decision.

## Governing reference mapping

The user's latest clarification supersedes earlier interpretations about combining these references throughout the page:

| Reference | Assigned role |
| --- | --- |
| Wise | Hero text structure: large tightly set headline, short central explanation and early-access action. |
| Plasma | The full-screen true 3D photo globe, matching the original spherical behaviour as closely as possible. |
| Revolut | The continuous, reversible scroll transition from globe hero to the next product scene. |
| Altitude | Approximately 99% of the page's shape and style: restrained sentence-case body typography, white space, section geometry, product surfaces and long-form pacing. |

Wise's oversized uppercase treatment belongs to the hero. The body must not repeat it or introduce large blue rounded chapter containers. Altitude's rendered page and measured stylesheet govern the body geometry.

## Agreed direction

- Name: **PRYDD** (P-R-Y-D-D). Existing PRYYD brand assets are provisional; spelling mistakes must not hold up discovery. The user will update assets later if needed.
- Main narrative: **One app for everyday global money.** This establishes the positioning; final headline wording is still to be explored.
- Main conversion: **Join early access.**
- Colour remains a hero comparison: white with blue accents, full blue, and dark with bright accents. All three use the same white/black Altitude-style body, layout and copy.
- Desktop hero: use Plasma's real 3D globe from “Start spending in minutes” as faithfully as possible, with the earlier spherical concept's full-screen composition and prominent headline/action in the centre. The user rejected the scattered-photo ring in the first live implementation. The globe-style question is resolved by this instruction.
- Wise governs the hero text structure. Altitude governs the rest of the page's shape and style. Revolut governs the hero transition.
- The primary motion reference is Revolut's transition from the hero into its next product section. Adapt that continuous handoff to the PRYDD globe, then continue the product story.
- Keep both destinations for further exploration: **three product panels** and **one sending-money sequence**. After reviewing the local comparison, the user explicitly chose to retain both; neither is the final destination.
- A scroll gesture starts a timed, directional handoff so a heavy flick cannot skip its visible stages. A reverse gesture returns to the hero. Apply the same control to both destination variants; ordinary scrolling continues after the handoff settles.
- The user likes the middle-card handoff and directed the globe to remain behind the balance card after settling. The same sphere contracts and is centred on the card; its exposed silhouette remains visible as the complete scene scrolls away.
- The user's supplied Wise screenshot governs the hero's very large tightly set uppercase headline, short centred explanation and compact pill action. Its colour field is explored through PRYDD's hero palettes; body panels follow Altitude.
- The page should tell its story through visuals and short labels, so visitors can understand it without reading every paragraph.
- The user rejected generic abbreviated rows and the subsequent oversized Wise-style body. Use Altitude's long sequence of restrained, alternating product chapters and focused layered visual explanations.
- The header begins with **PRYDD / How it works**. After the hero handoff it expands to **Add money / Your account / Send by username / FAQs**, indicates the active chapter and keeps **Join early access** available.
- Use the agreed choices in a local prototype to compare colour and motion, then continue the drilling session from that evidence.

## References and observations

- [Plasma Personal](https://www.plasma.org/personal): the referenced desktop globe is a real 3D photo sphere. Inspection of its published renderer established spherical geometry, tangent photo planes, Fibonacci distribution, slow rotation and depth-based sizing that leaves a quiet centre. A [live reference capture](design-references/plasma-globe-live.jpg) is saved. In the earlier 390 × 844 reference observation, this section omitted the globe and retained its heading/action; PRYDD's local comparison retains an adapted mobile sphere.
- [Wise](https://wise.com/): the initial Indonesia browser observation showed a different version. The user's subsequently supplied screenshot of “SEND MONEY GLOBALLY FOR LESS” is the intended reference and takes precedence for design interpretation. A durable copy is saved at [the Wise reference](design-references/wise-hero-user-reference.png).
- [Revolut](https://www.revolut.com/): the inspected UK page moves from a large lifestyle hero into a central rounded account card with neighbouring account cards as the next section emerges. The same central subject persists across the handoff. Re-study of its [published hero implementation](https://www.revolut.com/_next/static/chunks/7920.39ee27d97ddb1d9b.js) identified a timed state transition with a document scroll lock, 1180ms forward/1080ms reverse lock timers and `cubic-bezier(.35,0,0,1)`. The observed page holds heavy scrolling while the handoff runs. PRYDD adapts this directional timing to its own globe and mobile layout.
- Supplied kit: `/Users/gifted/Downloads/PRYYD-Brand-Kit/`. It contains the Passage symbol, a Montserrat Medium wordmark, monochrome variants and a secondary sculpted symbol. It does not establish a final blue palette. These are reference materials, not user instructions.
- [Altitude](https://altitude.xyz/) is the intended storytelling reference, confirmed by the user. Re-study found a long sequence: dashboard, customer/metric proof, product overview, accounts, payments, cards, invoicing, accounting, customer stories, security, FAQ and closing action. Account details, recipients, invoice states and transaction review explain different actions. PRYDD should use that unfolding clarity and varied visual grammar with its own provisional consumer capabilities.
- The latest [Wise](https://wise.com/) web reading returned a different UK account page. This regional comparison is context only; the supplied screenshot governs PRYDD's hero text structure, and Wise does not govern the body.
- Altitude's [published body stylesheet](https://altitude.xyz/_next/static/immutable/chunks/0e6ydtqfq2mfj.css) confirms a 1440px shell, 64px desktop gutters, regular 28–40px feature headings, faint copy rules and 128px chapter gaps. Product chapters alternate equal columns with contained, layered visuals. Its [font stylesheet](https://altitude.xyz/_next/static/immutable/chunks/341r05pz6m0qg.css) identifies GT Standard variable as the reference typeface.

## Recommendations awaiting discussion

- For concept exploration, use a broad everyday audience managing money across countries as a working assumption consistent with the chosen narrative. No specific audience segment or launch market has been approved.
- The launch-scope question is open. Continue concept exploration with the current documented funding, USD holding and username-transfer capabilities as a working assumption; the user has requested a rebrand and has not specified expanded capabilities.
- Mobile hero: preserve the spherical composition, quiet centre, readable headline and action at ordinary phone widths. The local renderer adapts its camera to the viewport; final visual fidelity remains under review.
- Explain **Add money → Hold dollars → Send by username** through the longer chapters below. Replace repeated benefit rows with connected actions and visible results; keep each chapter visually distinct.
- Use readable activity to connect a payment with the remaining balance. Current example amounts are **$250 added → $25 sent → $225 remaining**.
- Montserrat remains the hero and wordmark typeface. The body uses local Inter as an OFL-licensed neutral proxy for Altitude's GT Standard, with the source's regular weight, sentence case and restrained scale.
- Keep the heavy uppercase Wise-style headline within the full-screen globe hero. Body chapters and transition headings use the Altitude scale.

## Hero transition comparison

The user has chosen Revolut's hero-to-next-section transition as the motion inspiration. Both PRYDD adaptations are implemented at `/design/prydd` for comparison before choosing the final destination.

### Variant 1: Three product panels

1. The initial viewport contains the globe, the large everyday-global-money headline and the early-access action.
2. As the visitor scrolls, the hero headline leaves and the globe contracts into a rounded central product panel. Preserve the same visual subject through this handoff.
3. A dollar-balance view appears in the centre; neighbouring panels reveal adding money and sending by username.
4. The three panels settle into the first product overview. The smaller globe stays visible behind the middle balance card. Ordinary page scrolling then carries the complete scene into the focused product explanations inspired by Altitude.

### Variant 2: One sending-money sequence

1. Start with the same full-screen globe, headline and early-access action.
2. As the visitor scrolls, the hero contracts into one rounded product scene, carrying a smaller globe motif through the handoff.
3. Reveal one clear username transfer: recipient, dollar amount, then a completed-payment state. Use a single large focused composition, not three separate feature panels.
4. Settle the sequence into the first product section, then continue with the balance and funding stories below it.

Both sequences use scroll gestures to start a timed handoff, with reverse input returning to the hero. The globe remains behind the destination card; it is measured on resize so the account remains its centre on desktop and phone. The three hero palettes are independent of the destination; the body remains white/black in every variant. Reduced-motion preferences and viewport heights of 600px or less use ordinary page flow without the pinned transformation or input gate. Choosing the final destination and hero palette remains a design decision. Labels are **Add money / Hold dollars / Send by username**. Product states are illustrative and do not verify live app capabilities.

### Storyboards for comparison

- [Variant 1 — Three product panels](design-concepts/prydd-transition-1-three-panels.png).
- [Variant 2 — One sending sequence](design-concepts/prydd-transition-2-send-sequence.png).
- [Storyboard generation prompts](design-concepts/transition-generation-prompts.json).

These static boards show four states: hero, contraction, reveal, and settled first section. They use the same white/blue baseline for comparison; that palette is still provisional. Both use illustrative usernames and amounts, not screenshots of the live product. They do not verify motion timing, responsive behaviour or exact typography.

The prototype carries the globe into the central product scene and recedes its photographs as content appears. Review the settled panel position, text legibility and early-access action during the handoff. Use neutral illustrative activity timing such as “Today”.

## Current longer page story

The body now follows Altitude's measured shape and typography. Four alternating product chapters carry the provisional consumer story, followed by contextual, practical and conversion sections. Copy and visual fidelity remain subject to review; the page establishes no new product capabilities.

- **Shell:** 1440px maximum width, 64px desktop gutters and 24px mobile gutters.
- **Product chapters:** equal columns with a 64px gap, reducing to 40px below 1200px; one column below 992px. Desktop chapter spacing is 128px, reducing to 96px on tablet and 72px on mobile. Copy begins with a faint rule and 32px top padding.
- **Type:** sentence-case 28–40px feature headings, weight 400, 0.95 line height and −0.02em tracking. Body copy is 16px at desktop and 14px below 992px, with 1.3 line height.
- **Surfaces:** rectangular soft landscape scenes containing layered white UI panels with restrained shadows and approximately 12–20px radii. Large rounded blue chapter containers and oversized uppercase body headings are superseded.

| Chapter | Current visual explanation |
| --- | --- |
| Local funding | Ruled copy, concise bullets and an account anchor beside a field scene. Local currency leads through an add-money panel into a **$250** dollar balance, without a method or rate claim. |
| Dollar account | A flipped chapter pairs the **$250** account/activity scene with a clear explanation and an anchor to username payments. |
| Username payment | A shore scene contains **@maya**, a **$25** payment and its result. The sending-transition variant shows the recipient's received-payment perspective instead of replaying compose. |
| Payment result | A flipped chapter connects the receipt, activity and **$225** remaining balance. The phone receipt becomes a compact strip so the balance and activity remain visible. |
| Human context | A restrained centred heading and proportion-preserving portrait strip, without fabricated customer quotes, counts or audience claims. |
| Practical overview | One dark rectangular landscape/list split summarises adding local money, holding USD and paying another PRYDD user by username. It makes no security claim. |
| FAQ | A source-like 40/60 desktop split: introductory copy/action beside native disclosure rows. It stacks at tablet width. |
| Closing | A pale **#dfe5ea** section with a regular 32–56px heading and an early-access action in two columns, followed by a black footer with grouped product, early-access and legal links. |

Chapter anchors are `prydd-funding`, `prydd-account`, `prydd-people`, `prydd-activity` and `prydd-faq`. Product fragments and amounts are illustrative, identified once in the page. The launch scope remains provisional: local funding, USD holding and transfers to other users by username.

The earlier [page-story concept](design-concepts/prydd-page-story.png), its [generation prompt](design-concepts/page-story-generation-prompt.json) and the subsequent oversized colour-block body are **superseded for body layout and style**. They remain discovery records. The hero transition storyboards still record the two retained destinations, while Altitude governs their product typography/surfaces and the page below. Keep recovery/access claims out of final copy until the current flow is confirmed.

## Product evidence and asset refresh

The current repository describes local-currency funding, holding dollars and sending to other users by username. It is a marketing/waitlist repository; its copy is not verification of live app capabilities.

- The existing balance screen is useful as a reference for balance and activity. Disabled Swap and Bulk Transfer controls must not become feature promises.
- The existing deposit image shows a handle and Solana address. It does not demonstrate bank funding or an outgoing payment sequence.
- The existing recovery image asks for a secret recovery phrase, while current copy says passkey access with no seed phrase. Confirm the current product flow before choosing recovery copy or imagery.
- Prepare refreshed PRYDD assets after the story is agreed. Do not present illustrative states as screenshots proving live capabilities.

The local prototype uses the supplied kit's original Passage symbol at [public/prydd/mark.svg](../public/prydd/mark.svg), alongside a PRYDD text wordmark. Hero and wordmark typography uses [Montserrat variable](../public/prydd/montserrat-variable.ttf), with its [OFL licence](../public/prydd/OFL.txt). Body typography uses local [Inter variable](../public/prydd/inter-variable.ttf), with its [OFL licence](../public/prydd/Inter-OFL.txt), as a neutral proxy for Altitude's GT Standard.

The corrected hero uses a real [Three.js renderer](../components/prydd/photo-globe.tsx), matching the observed Plasma geometry and depth behaviour: 400 tangent photo planes on a radius-3.1 Fibonacci sphere, depth-based size changes and slow rotation. It uses **89 original photographs** saved locally in [public/prydd/globe](../public/prydd/globe); [provenance JSON](design-references/plasma-photo-sources.json) records their original URLs, local paths and hashes for this faithful local study. Exact visual parity is still a review criterion, not a completion claim.

Responsive camera framing caps the nominal sphere diameter at 86% of the renderer's width and height, including room for the outer photo planes and hover lift. The entrance lift is bounded so the sphere stays in frame throughout its staggered reveal. The handoff measures the destination card on resize and keeps this same renderer behind it; the sphere is neither replaced with a flat image nor removed after settling. Short viewports reserve space above the comparison controls and use ordinary flow.

The separate [generated atlas](../public/prydd/photos-atlas.png) remains illustrative body photography of fictional adults and everyday places. Its [prompt and provenance](design-concepts/photo-atlas-generation-prompt.json) are saved. Body portraits crop atlas cells with preserved proportions; they are not the source of the corrected 3D hero photographs. The body also uses local [sky](../public/prydd/landscape-sky.png), [shore](../public/prydd/landscape-shore.png) and [field](../public/prydd/landscape-field.png) scene backgrounds. Product objects and amounts remain illustrative.

## Remaining decisions

Confirm the launch scope, current product flows, initial audience and launch coverage before publishing. Continue exploring both motion destinations and defer their final selection. The Plasma globe style, Altitude reference and timed scroll handoff are directed; no separate globe-style question remains. Compare the colour variants before selecting a final palette. These later publication decisions do not prevent completing the local prototype and its requested visual checks.

## First visual comparison

Generated with the built-in image generation tool. These are static concept boards showing desktop and mobile hero interpretations; they do not establish implemented responsive behaviour, exact font metrics, motion or final logo artwork.

- [A — White and blue](design-concepts/prydd-hero-a-white-blue.png): approachable baseline with charcoal type and blue actions.
- [B — Full blue](design-concepts/prydd-hero-b-full-blue.png): bolder colour presence, white type and white actions.
- [C — Dark and blue](design-concepts/prydd-hero-c-dark-blue.png): charcoal background with white type and blue actions.
- [Generation prompts](design-concepts/generation-prompts.json): base concept and the two colour edits.

All three retain the same copy and layout. These boards remain useful for palette and centred headline exploration. The user's correction preserves the earlier spherical concept and directs the real Plasma-style 3D renderer. No palette has been selected; audience and launch coverage remain unconfirmed.

## Local implementation and verification

The user's completion criterion is a full desktop/mobile visual pass with the known globe clipping and comparable layout mistakes resolved. The checks below were completed on 15 October 2026; the comparison remains local and retains the requested variants.

The comparison lives at `/design/prydd` with `noindex, nofollow` metadata. It provides both destination variants, three palette controls, the scroll-controlled globe handoff and the ordinary-flow fallback described above. The existing homepage remains unchanged; **Join early access** links to the existing `/waitlist` route.

The local production preview is available at [127.0.0.1:4031/design/prydd](http://127.0.0.1:4031/design/prydd). The comparison bar switches destination and palette; changing destination returns to the beginning. Direct links may initialise `?destination=send` and `?palette=blue` or `?palette=dark`. `?motion=reduce` exposes the ordinary-flow view for review.

The requested full visual pass covers the hero, both settled destinations, all four product chapters, human context, practical overview, FAQ, closing action and actual footer at 1440 × 900 desktop and 320 × 780 phone sizes. Additional checks cover 390 × 844 phones, 1280 × 800/720 desktop and the 853 × 905 app pane. A 780 × 390 landscape check verifies ordinary flow, a complete globe and an unobscured early-access button. Saved viewport captures are in [full-qa](design-concepts/browser-checks/full-qa); full-page captures supplement these but are not evidence of pinned animation states.

The mobile clipping issue was fixed by responsive camera framing. The narrow layouts show the complete circular sphere and fit the balance, payment and activity labels without horizontal page overflow. The funding scene now has a visible connector in a real gap and a readable sequence label on a pale surface. Captions beneath the settled cards have space below the retained sphere. Desktop chapters retain equal columns, a 64px gap, regular 40px/38px Inter headings, thin copy rules and rectangular layered product scenes. Phone chapters stack with 24px gutters and approximately 28px headings.

Checks confirmed a ready `three.js r183` canvas, a visible globe behind both destination cards, payment completion, reverse scrolling back to the hero, header chapter anchors/current-location indication, a working native FAQ disclosure, all hero palettes and the forced `?motion=reduce` ordinary-flow view. Heavy wheel bursts and keyboard scrolling play a 1.180s forward handoff or 1.080s reverse handoff before restoring ordinary scrolling; resets and chapter anchors cancel an active lock. Wheel and keyboard input were tested in responsive browser viewports; physical-device touch testing and an operating-system preference change were not performed. The production preview removes the development badge.

The updated production build and focused TypeScript check passed. The full repository TypeScript check remains affected by pre-existing `useReveal` argument errors in about/contact/services/work and missing `use-mobile`/`use-toast` hooks. Builds still report the pre-existing workspace-root and email-renderer Prettier warnings; the build completes successfully.

Current saved production evidence:

- [True 3D hero](design-concepts/browser-checks/prydd-3d-hero-current.png).
- [Altitude-style account chapter](design-concepts/browser-checks/prydd-altitude-body-current.png).
- [Retained three-panel destination](design-concepts/browser-checks/prydd-three-panels-current.png).
- [Complete mobile globe](design-concepts/browser-checks/prydd-mobile-hero-current.png).

Earlier `prydd-desktop-*`, `prydd-mobile-payment.jpg` and `prydd-reduced-motion.jpg` captures record the superseded implementation. They are not proof of the corrected globe or body.

The corrected prototype remains a local design comparison. Both destinations and all palettes are retained for exploration as requested; launch scope and refreshed product assets remain later publication decisions.
