# Claude Code Prompt: Trycon Docs — Internal Documentation Website

---

## Project Overview

Build **Trycon Docs** — an internal documentation and knowledge-base website for Trycon Systems. It will serve as the single source of truth for all employees to access company-wide information including About Company, Policies, Trainings, and Roles & Responsibilities.

**Tech Stack:**
- **Framework:** Next.js 15 (App Router)
- **CMS:** Prismic (Headless CMS for all content)
- **Styling:** Tailwind CSS v4
- **Fonts:** Space Grotesk (headlines) + Inter (body/UI) via `next/font/google`
- **Icons:** Material Symbols Outlined (Google Fonts)
- **Deployment:** Vercel
- **Repo:** GitHub

---

## Design System: "Electric Noir / Neon Architect"

This is a **dark-mode-first**, high-personality editorial UI. Follow every rule below exactly.

### Color Tokens (Tailwind Custom Colors)

```js
colors: {
  "background":                "#131313",
  "surface":                   "#131313",
  "surface-dim":               "#131313",
  "surface-bright":            "#393939",
  "surface-container-lowest":  "#0e0e0e",
  "surface-container-low":     "#1c1b1b",
  "surface-container":         "#201f1f",
  "surface-container-high":    "#2a2a2a",
  "surface-container-highest": "#353534",
  "surface-variant":           "#353534",
  "on-surface":                "#e5e2e1",
  "on-surface-variant":        "#cbc3d7",
  "on-background":             "#e5e2e1",
  "primary":                   "#d0bcff",
  "primary-fixed":             "#e9ddff",
  "primary-fixed-dim":         "#d0bcff",
  "primary-container":         "#a078ff",
  "on-primary":                "#3c0091",
  "on-primary-container":      "#340080",
  "on-primary-fixed":          "#23005c",
  "on-primary-fixed-variant":  "#5516be",
  "inverse-primary":           "#6d3bd7",
  "secondary":                 "#4edea3",
  "secondary-fixed":           "#6ffbbe",
  "secondary-fixed-dim":       "#4edea3",
  "secondary-container":       "#00a572",
  "on-secondary":              "#003824",
  "on-secondary-container":    "#00311f",
  "on-secondary-fixed":        "#002113",
  "on-secondary-fixed-variant":"#005236",
  "tertiary":                  "#ffb95f",
  "tertiary-fixed":            "#ffddb8",
  "tertiary-fixed-dim":        "#ffb95f",
  "tertiary-container":        "#ca8100",
  "on-tertiary":               "#472a00",
  "on-tertiary-container":     "#3e2400",
  "on-tertiary-fixed":         "#2a1700",
  "on-tertiary-fixed-variant": "#653e00",
  "outline":                   "#958ea0",
  "outline-variant":           "#494454",
  "inverse-surface":           "#e5e2e1",
  "inverse-on-surface":        "#313030",
  "surface-tint":              "#d0bcff",
  "error":                     "#ffb4ab",
  "error-container":           "#93000a",
  "on-error":                  "#690005",
  "on-error-container":        "#ffdad6",
}
```

### Typography

```js
fontFamily: {
  headline: ["Space Grotesk", "sans-serif"],
  body:     ["Inter", "sans-serif"],
  label:    ["Inter", "sans-serif"],
}
```

- **Display/Headlines:** `font-headline`, sizes from `text-4xl` to `text-6xl`, `tracking-tight` (`-0.04em`), **always left-aligned**
- **Body/UI:** `font-body`, `text-sm` (0.875rem) as standard density
- **Never center-align headlines.** Use left-aligned editorial blocks.

### Core Visual Rules

1. **No solid 1px borders for sectioning.** Define depth via background color shifts between `surface-container` levels.
2. **Glass panels:** `bg-surface-variant/60 backdrop-blur-2xl` for floating menus and modals.
3. **Body background:** `#131313` with a subtle dot-grid overlay:
   ```css
   background-image: radial-gradient(rgba(255,255,255,0.02) 1px, transparent 0);
   background-size: 24px 24px;
   ```
4. **Ambient shadows for floating elements:** `shadow-[0px_20px_40px_rgba(0,0,0,0.4)]` + `shadow-[0_0_12px_rgba(139,92,246,0.1)]`
5. **Ghost Border fallback (accessibility only):** `border-outline-variant/15` — felt, not seen.
6. **Roundedness:** `rounded-2xl` (1.5rem) for containers, `rounded-xl` (1rem) for cards, `rounded-full` for buttons/chips.
7. **Never use `#FFFFFF`** for text. Use `text-on-surface` (`#e5e2e1`).
8. **No standard drop shadows on cards.** Use tonal background shifts only.

### Button Styles

- **Primary:** `bg-primary-container text-on-primary-container rounded-full shadow-[0_0_12px_rgba(139,92,246,0.2)] hover:shadow-[0_0_18px_rgba(139,92,246,0.35)] transition-all`
- **Secondary:** `bg-surface-container-high text-on-surface rounded-full hover:bg-surface-container-highest transition-all`

### Card Hover Pattern

```
bg-surface-container-low → hover:bg-surface-container-high + border border-primary/20
```

### Input Focus Pattern

- Default: `bg-surface-container-lowest border-none`
- Focus: `ring-2 ring-primary/20 bg-surface-container-low`

### Glow Chip (Status Indicators)

```html
<span class="bg-secondary/10 text-secondary border border-secondary/30 px-2 py-0.5 rounded-full text-xs shadow-[0_0_4px_theme(colors.secondary/40)] animate-pulse">
  Live
</span>
```

### Spacing

- Between major page sections: `mb-16` to `mb-24`
- Between list items (no divider lines): `space-y-6`
- Headline → body paragraph: `gap-4` (1rem)

---

## Application Architecture

### Directory Structure

```
trycon-docs/
├── app/
│   ├── layout.tsx                  # Root layout: fonts, global styles, header, footer
│   ├── page.tsx                    # Home/Hub page
│   ├── [uid]/
│   │   └── page.tsx                # Dynamic page for any top-level doc
│   ├── trainings/
│   │   ├── page.tsx                # Trainings index
│   │   └── [uid]/page.tsx          # Individual training page
│   ├── policies/
│   │   ├── page.tsx                # Policies index
│   │   └── [uid]/page.tsx
│   ├── roles/
│   │   ├── page.tsx                # Roles & Responsibilities index
│   │   └── [uid]/page.tsx
│   └── about/
│       └── page.tsx                # About Company (single page)
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx             # Left navigation drawer
│   │   ├── TableOfContents.tsx     # Right TOC sidebar
│   │   └── Footer.tsx
│   ├── slices/                     # Prismic Slice components
│   │   ├── RichText/index.tsx
│   │   ├── CalloutBlock/index.tsx
│   │   ├── StepList/index.tsx
│   │   ├── CardGrid/index.tsx
│   │   ├── ContactTable/index.tsx
│   │   ├── FaqAccordion/index.tsx
│   │   └── index.ts                # Slice registry
│   └── ui/
│       ├── GlowChip.tsx
│       ├── SectionHeading.tsx
│       ├── PaginationFooter.tsx
│       └── BreadcrumbBar.tsx
├── lib/
│   └── prismic.ts                  # Prismic client setup
├── prismicio.ts                    # Prismic config
├── slicemachine.config.json
└── tailwind.config.ts
```

---

## Prismic CMS Setup

### 1. Initialize Prismic

```bash
npx @slicemachine/init@latest
```

Choose: **Next.js**, project name: `trycon-docs`.

### 2. Custom Types

Create the following Custom Types in Prismic:

#### `doc_page` (Repeatable) — General documentation page
```json
{
  "uid": "UID",
  "title": "Key Text",
  "category": "Select: about | policies | trainings | roles",
  "breadcrumb_label": "Key Text",
  "reading_time": "Number",
  "badge_label": "Key Text (e.g. Popular, Required, New)",
  "slices": "Slice Zone"
}
```

#### `navigation` (Single) — Sidebar nav structure
```json
{
  "nav_sections": [
    {
      "section_label": "Key Text",
      "links": [
        {
          "label": "Key Text",
          "link": "Link",
          "icon": "Key Text (Material Symbol name)"
        }
      ]
    }
  ]
}
```

### 3. Slices

Register and build the following Slices in Slice Machine:

| Slice Name       | Purpose                                         |
|------------------|-------------------------------------------------|
| `RichText`       | Standard rich text body content (headings, paragraphs, lists, inline code) |
| `CalloutBlock`   | Amber warning / info / success callout box      |
| `StepList`       | Numbered step-by-step checklist with code snippets |
| `CardGrid`       | 2–3 column grid of tool/feature cards           |
| `ContactTable`   | "Who to Talk To" table with avatar, name, area, Slack |
| `FaqAccordion`   | Collapsible FAQ items                           |

Each slice uses the design tokens above. See component specs below.

---

## Component Specifications

### Header (`components/layout/Header.tsx`)

```
Fixed top bar, h-16, z-50
Background: bg-[#131313]/60 backdrop-blur-xl
Bottom glow: shadow-[0_0_12px_rgba(139,92,246,0.1)]

Left:
  - Logo: gradient icon (primary→secondary) + "Trycon Docs" in Space Grotesk
    gradient text: bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent
  - Desktop nav links: Trainings | Policies | Roles | About
    Active: text-primary border-b-2 border-primary
    Inactive: text-zinc-400 hover:text-zinc-200

Right:
  - Search bar (hidden on mobile): bg-surface-container-lowest, rounded-xl, border-outline-variant/15
    focus-within: ring-2 ring-primary/20
    Keyboard shortcut badge: "/" key in bg-surface-container-high
  - User avatar: rounded-full border-primary/20
  - Mobile: hamburger icon
```

### Sidebar (`components/layout/Sidebar.tsx`)

```
Fixed left, w-72, bg-[#0e0e0e], top-16, height calc(100vh-64px)
Overflow-y-auto, no scrollbar

Sections pulled from Prismic 'navigation' single type.

Active item:
  bg-violet-500/10 text-primary border-r-2 border-primary rounded-r-lg

Inactive item:
  text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-lg transition-all

Section labels:
  text-[10px] uppercase tracking-widest text-zinc-500 font-bold
```

### Table of Contents (`components/layout/TableOfContents.tsx`)

```
Fixed right, w-72, top-16, height calc(100vh-64px), hidden below lg
Pull h2/h3 headings from page content via IntersectionObserver

Active heading: text-primary
Inactive: text-zinc-500 hover:text-zinc-200

Bottom actions:
  - "Give Feedback" — Primary button (full width, rounded-full)
  - "Edit this page" — Secondary button (full width, rounded-full)
  Separated by a ghost divider: border-t border-outline-variant/10
```

### BreadcrumbBar (`components/ui/BreadcrumbBar.tsx`)

```
Above the page title:
"Trainings  ›  Onboarding Guide"
text-xs text-zinc-500
With a badge chip (e.g. "Popular", "Required") using GlowChip component
```

### SectionHeading (`components/ui/SectionHeading.tsx`)

```
Numbered section marker:
<span class="w-8 h-8 rounded bg-primary/10 border border-primary/20 
             flex items-center justify-center text-primary text-sm">
  01
</span>
+ headline text in font-headline font-bold text-2xl
```

### PaginationFooter (`components/ui/PaginationFooter.tsx`)

```
flex justify-between, border-t border-outline-variant/10, pt-12
Left: PREVIOUS label (text-zinc-500 uppercase text-[10px]) + page title with left arrow
Right: NEXT label + page title with right arrow
Both: hover:text-primary transition-colors
```

### Slices

#### `RichText`
- Renders Prismic rich text.
- `h1`: `font-headline text-4xl font-black tracking-tight text-on-surface mb-2`
- `h2`: `font-headline text-2xl font-bold` with `SectionHeading` wrapper (auto-numbered)
- `h3`: `font-headline text-lg font-semibold text-on-surface-variant`
- `p`: `font-body text-sm text-zinc-400 leading-relaxed`
- `code` (inline): `font-mono text-xs bg-surface-container-high text-primary px-1.5 py-0.5 rounded`
- `pre` (block): `bg-surface-container-lowest rounded-xl p-4 font-mono text-xs text-secondary overflow-x-auto`
- `a`: `text-primary hover:underline`
- `ul`/`ol`: `space-y-2 text-sm text-zinc-400`

#### `CalloutBlock`
```
Variants: warning (tertiary/amber) | info (primary/violet) | success (secondary/mint)

bg-[variant-container]/10 border border-[variant]/20 p-6 rounded-2xl flex gap-4

Icon: Material Symbol (warning / info / check_circle)
Title: font-bold text-[variant]
Body: text-sm text-zinc-400
```

#### `StepList`
```
Numbered steps list.

Each step:
  flex items-start gap-4
  Step number: w-8 h-8 rounded-full bg-primary/10 text-primary text-sm flex-shrink-0
  Content: title (font-medium text-zinc-200) + body text + optional code block
  
Connecting line between steps: left-4 top-8 w-px h-full bg-outline-variant/20
```

#### `CardGrid`
```
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6

Each card:
  bg-surface-container-low p-6 rounded-2xl 
  hover:bg-surface-container-high hover:border hover:border-primary/20 
  transition-all group cursor-default

  - Icon: Material Symbol, color by card type (primary/secondary/tertiary)
    group-hover:scale-110 transition-transform
  - Title: font-bold text-zinc-200 mb-2
  - Description: text-xs text-zinc-500
```

#### `ContactTable`
```
Table with columns: Point of Contact | Area | Slack Channel

Header row: text-zinc-500 font-medium, no border — use divide-y divide-outline-variant/10

Avatar: w-8 h-8 rounded-full bg-zinc-800 text-[10px] text-zinc-400 font-bold (initials)
Slack channel: font-mono text-primary
```

#### `FaqAccordion`
```
<details> / <summary> pattern (or Headless UI Disclosure for animation)

Container: bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden
Summary: p-4 flex justify-between hover:bg-white/5 transition-all
  - Question: font-medium text-zinc-200
  - Chevron icon: rotate-180 when open, transition-transform
Answer: p-4 pt-0 text-sm text-zinc-400 border-t border-outline-variant/5
```

---

## Page Layouts

### Doc Page Layout (`app/[category]/[uid]/page.tsx`)

```
Root: flex min-h-screen pt-16

Left:   <Sidebar />          (fixed, w-72, hidden on mobile)
Center: <main>               (ml-72 mr-72 on lg, px-8 md:px-16, max-w-3xl mx-auto)
          <BreadcrumbBar />
          <PageHeader />       (title, reading time, badge)
          <SliceZone />        (renders all slices)
          <PaginationFooter />
Right:  <TableOfContents />  (fixed, w-72, hidden below lg)
```

### Index/Hub Pages (e.g., `app/trainings/page.tsx`)

```
Card grid of all documents in that category.
Each card: title, badge, reading time estimate, short description.
Use CardGrid layout with bg-surface-container-low cards.
```

### Home Page (`app/page.tsx`)

```
Hero section:
  - Large headline: "Everything you need to know about Trycon."
  - Subtext: "Your internal source of truth for policies, training, roles, and more."
  - Two CTA buttons: "Browse Trainings" (primary) + "View Policies" (secondary)
  
Category cards below:
  4 cards: About | Policies | Trainings | Roles & Responsibilities
  Use CardGrid with icon, label, doc count.
```

---

## Prismic Integration

### Client Setup (`lib/prismic.ts`)

```ts
import * as prismic from "@prismicio/client";
import { CreateClientConfig, enableAutoPreviews } from "@prismicio/next";
import sm from "./slicemachine.config.json";

export function createClient(config: CreateClientConfig = {}) {
  const client = prismic.createClient(sm.repositoryName, {
    routes: [
      { type: "doc_page", path: "/:category/:uid" },
    ],
    ...config,
  });
  enableAutoPreviews({ client, ...config });
  return client;
}
```

### Data Fetching Pattern

Use `generateStaticParams` + `generateMetadata` for all dynamic routes. Fetch navigation from the `navigation` single type for the Sidebar on every page (server component).

```ts
// Example: app/trainings/[uid]/page.tsx
import { createClient } from "@/lib/prismic";

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("doc_page", {
    filters: [prismic.filter.at("my.doc_page.category", "trainings")],
  });
  return pages.map((page) => ({ uid: page.uid }));
}
```

---

## Setup Commands

Run these in order:

```bash
# 1. Create Next.js app
npx create-next-app@latest trycon-docs \
  --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

cd trycon-docs

# 2. Install Prismic
npm install @prismicio/client @prismicio/next @prismicio/react
npm install --save-dev @slicemachine/adapter-next slice-machine-ui

# 3. Init Slice Machine (follow prompts — connect your Prismic repo)
npx @slicemachine/init@latest

# 4. Install other dependencies
npm install clsx tailwind-merge

# 5. Start Slice Machine (to build slices visually)
npm run slicemachine
```

---

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=your-repo-name
```

For Vercel deployment, add the same variable in the Vercel project settings.

---

## Vercel Deployment

1. Push repo to GitHub.
2. Connect GitHub repo to Vercel (import project).
3. Set environment variable `NEXT_PUBLIC_PRISMIC_ENVIRONMENT`.
4. In Prismic dashboard → Settings → Webhooks → add Vercel Deploy Hook URL to trigger rebuilds on content changes.
5. Enable **Vercel Preview** in Prismic for draft previews (optional).

---

## Key Implementation Notes

1. **All text content is managed in Prismic.** No hardcoded page copy — every article, section, card, and FAQ is a Prismic document rendered through slices.

2. **Navigation is also CMS-driven.** The sidebar nav items come from the `navigation` single type, so editors can add/reorder sections without touching code.

3. **The design must match the Electric Noir spec exactly** — no default Tailwind card styles, no white backgrounds, no borders for sectioning. Every surface must use the color token system above.

4. **Fonts via `next/font/google`** — not Google Fonts CDN link — for performance:
   ```ts
   import { Space_Grotesk, Inter } from "next/font/google";
   const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-headline" });
   const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
   ```

5. **Material Symbols** are loaded via a `<link>` tag in `app/layout.tsx` `<head>`. Use `font-variation-settings: 'FILL' 1` for filled icons.

6. **No hardcoded colors.** Always use Tailwind design token classes (e.g., `bg-surface-container-low`, `text-primary`) — never arbitrary hex values except for the body background.

7. **Responsive:** Sidebar hidden on mobile (hamburger → drawer). TOC hidden below `lg`. Main content full-width on mobile.

8. **`generateMetadata`** for each page pulling title from Prismic for SEO.

---

## Sample Seed Content to Create in Prismic

After setup, create these documents to test:

**Training:** "Onboarding Guide"
- Slices: RichText (intro), StepList (Environment Setup steps), CardGrid (Tools), ContactTable (Who to Talk To), FaqAccordion (FAQs)
- Badge: "Popular" | Reading time: 10 min

**Policy:** "Remote Work Policy"
- Slices: RichText (overview), CalloutBlock (key rule), FaqAccordion

**Role:** "Engineering Lead"
- Slices: RichText (responsibilities), CardGrid (tools they own), ContactTable

---

## Acceptance Criteria

- [ ] Home page with 4 category entry points
- [ ] Left sidebar driven by Prismic navigation type
- [ ] Right TOC with active heading highlight (IntersectionObserver)
- [ ] All 6 slice types rendering correctly with Electric Noir design
- [ ] Breadcrumb, badge chip, reading time on every doc page
- [ ] Prev/Next pagination between docs in same category
- [ ] Mobile responsive (sidebar drawer, no right TOC on mobile)
- [ ] Search bar in header (UI only — can be wired to Prismic search or Algolia later)
- [ ] Deploys successfully to Vercel with Prismic webhook for content rebuilds
- [ ] No TypeScript errors, no ESLint warnings
