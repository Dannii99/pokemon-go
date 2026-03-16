# UI Visual Guidelines

This document defines the preferred visual direction for the product based on the current reference UI.

It is not a strict design system.
It should guide visual consistency while still allowing exploration when a screen has no established pattern yet.

## Visual Direction

The product should feel:

- modern
- dark-first
- polished
- content-focused
- tech/gaming adjacent
- visually rich but still usable

The overall aesthetic should balance:

- strong dark surfaces
- vibrant accent color
- soft borders
- rounded cards
- clear hierarchy
- lightweight depth through subtle shadows and overlays

Avoid corporate-flat or overly generic admin styling.

## Theme Preference

Prefer dark mode as the primary visual reference.

Light mode may exist, but new UI proposals should primarily align with the dark visual language unless the task explicitly requires otherwise.

## Color Palette

Reference colors extracted from the current UI:

- Primary: `#924cfa`
- Background dark: `#170f23`
- Surface dark: `#251b36`
- Border dark: `#3a2d52`
- Background light: `#f7f5f8`

Supporting semantic accents seen in the reference:

- Success / positive: green tones
- Info / neutral highlight: blue tones
- Danger / live / alert: red tones
- Platform accents may use brand-like colors when useful (for example Twitch purple, YouTube red, Kick green)

## Color Usage Rules

### Primary Color

Use the primary purple as the main brand/action color for:

- active navigation states
- focused controls
- highlighted filters
- badges
- key actions
- important icons
- selected UI states

Do not overuse primary on large backgrounds.

Prefer it as an accent, not as the entire page color.

### Backgrounds

Prefer layered dark surfaces:

- page/app background: very dark
- cards/panels: slightly lighter dark surface
- overlays/hover/focus states: subtle tonal lift

This creates depth without needing heavy shadows.

### Borders

Borders should be subtle and low-contrast.

Use borders mainly to:

- separate surfaces
- define cards
- organize sections

Avoid harsh bright borders.

### Semantic Colors

Use semantic color sparingly and purposefully:

- red for live status, alerts, urgency
- green for growth/success
- blue for neutral informational metrics
- purple for product identity and main actions

## Typography

Preferred type style:

- clean
- modern
- readable
- medium contrast hierarchy

Reference font:

- Inter

Typography should feel compact but breathable.

### Suggested hierarchy

- Page titles: bold, prominent
- Section titles: strong but smaller than page titles
- Card titles/statistics: visually punchy
- Secondary text: muted slate tones
- Meta text: small but readable

Avoid overly decorative typography.

## Border Radius

The reference UI uses soft rounded corners.

Preferred radius style:

- controls: rounded-lg
- cards/panels: rounded-xl to rounded-2xl
- pills/badges: rounded-full or soft rounded
- avatars: rounded-full

The UI should feel soft and modern, not boxy.

## Shadow and Depth

Use depth subtly.

Preferred depth style:

- light shadows on cards
- hover emphasis through border tint or small lift
- overlays with blur/transparency when useful
- gradients only for highlighted promotional or featured sections

Avoid:

- large heavy shadows everywhere
- excessive glow
- noisy visual effects

## Surface Patterns

Most major content blocks should use card-like surfaces.

Preferred card style:

- dark surface background
- subtle border
- rounded corners
- moderate internal padding
- optional hover border accent
- occasional soft shadow

Cards should feel premium and organized.

## Layout Style

The visual reference suggests this preferred shell:

- left sidebar navigation
- top header
- scrollable content area
- spacious dashboard sections

This is the default layout direction for admin/dashboard pages.

### Layout feel

- breathable spacing
- modular sections
- strong grouping with cards/grids
- content broken into digestible blocks

Avoid cramped layouts.

## Spacing Style

The spacing should feel generous and modern.

General preference:

- comfortable gaps between sections
- cards with enough padding to breathe
- consistent spacing rhythm across pages
- dashboards should not feel dense

Favor a polished UI over squeezing too much data into one screen.

## Navigation Styling

Navigation should feel clear and premium.

Preferred patterns:

- active item highlighted with primary tint/background
- inactive items muted
- icon + label pairing
- soft hover states
- section grouping when useful

The sidebar should feel like part of the product identity, not just utility chrome.

## Header Styling

Headers may include:

- search
- notifications
- profile area
- contextual actions

Preferred style:

- translucent or elevated surface
- subtle border separation
- clear alignment
- compact but polished controls

Sticky headers are acceptable when useful.

## Cards and Content Blocks

### Stats Cards

Preferred traits:

- icon badge
- metric label
- strong number
- small growth/change indicator
- subtle semantic accent color

These cards should be quick to scan.

### Stream or Content Cards

Preferred traits:

- strong thumbnail/media area
- top overlay metadata when useful
- profile/avatar + title + secondary info
- hover feedback
- platform indicator where relevant

These cards should feel more visual than traditional enterprise cards.

### Promo / Highlight Cards

Allowed for:

- featured content
- premium features
- spotlight sections

These may use:

- gradients
- stronger contrast
- more visual flair

Use sparingly.

## Media and Imagery

The reference UI uses rich imagery heavily.

Preferred media style:

- large thumbnails
- edge-to-edge media inside cards
- overlays for text readability
- rounded clipping
- platform/status indicators layered on top

When a page is content-driven, media can be an important part of the layout.

## Interactive States

Interactive elements should communicate clearly.

Preferred interaction style:

- hover through subtle background lift, border tint, or scale
- focus through primary ring or visible highlight
- active/selected states clearly distinguishable
- transitions should feel smooth but restrained

Avoid flashy or exaggerated motion.

## Badges and Pills

Badges are useful for:

- live status
- featured labels
- growth indicators
- filters
- platform tagging

Preferred style:

- compact
- rounded
- high contrast
- color-coded by meaning

## Icons

The reference uses outlined icons with occasional filled emphasis.

Preferred icon style:

- clean
- modern
- consistent stroke/fill language
- used to support clarity, not decorate excessively

Icons may receive semantic or primary tint when needed.

## Tables vs Cards

Because this product is visually content-oriented, cards and mixed dashboard layouts are often preferable to dense tables.

Guidance:

- use cards/lists for discovery, browsing, and content previews
- use tables for management, structured admin data, and dense comparison
- do not default to tables when a more visual layout would improve the experience

## Visual Personality

The product should sit somewhere between:

- modern SaaS admin
- creator/streaming dashboard
- premium dark UI

It should not feel like:

- a plain enterprise backoffice
- a neon-overloaded gamer interface
- a minimal white corporate dashboard

The tone is:
**premium, modern, slightly expressive, but still functional**.

## Exploration Rules

If a page does not yet have an established pattern, the AI may explore alternatives as long as it preserves:

- dark-first visual language
- purple primary identity
- soft rounded surfaces
- modern spacing
- clear information hierarchy
- visual consistency with the reference UI

Exploration is encouraged for:

- dashboard compositions
- card arrangements
- section layouts
- content presentation

Exploration should not break the core visual identity.

## Consistency Checklist

When generating new UI, prefer consistency with these signals:

- dark layered backgrounds
- purple primary accent
- rounded-xl / rounded-2xl surfaces
- subtle borders
- breathable spacing
- visual cards over flat blocks
- media-friendly content presentation
- clean modern typography
- polished but restrained interactivity
