<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Prismic

## Routes config
Do NOT pass a `routes` array to `prismic.createClient()` in this project. The `doc_page` type uses a `category` Select field in its URL path, but Prismic's link resolver only works with content relationship fields — not Select fields. Passing routes causes a silent `[Link resolver error]` on every API call, returning empty arrays instead of documents. All URLs in this project are built manually (`/${doc.data.category}/${doc.uid}`), so no route resolver is needed.

## Creating content from the terminal
Use the Prismic Migration API — don't tell the user to use the dashboard to create documents:

```bash
curl -X POST "https://migration.prismic.io/documents" \
  -H "Authorization: Bearer <write-token>" \
  -H "repository: trycon-docs" \
  -H "Content-Type: application/json" \
  -d '{ "title": "Doc Title", "type": "doc_page", "uid": "my-uid", "lang": "en-us", "data": { ... } }'
```

- Creates documents as **drafts**. The publish endpoint rejects Bearer tokens — user must publish from the Prismic dashboard.
- Update existing docs with `PUT .../documents/<id>`. **PUT on existing published documents takes effect immediately** — the CDN reflects the change without a manual publish step. Only new documents (POST) land as drafts.
- **DELETE is not supported** by the Migration API — `DELETE /documents/<id>` returns 404. To remove documents, the user must archive them manually from the Prismic dashboard.
- Custom types: `POST/PUT https://customtypes.prismic.io/customtypes`
- Shared slices: `POST/PUT https://customtypes.prismic.io/slices`

## Prismic CDN API requires a ref parameter

Always fetch the master ref first, then include `?ref=<ref>` in every CDN query. Without it the response omits the `results` key entirely:

```bash
REF=$(curl -s "https://trycon-docs.cdn.prismic.io/api/v2" | python3 -c "import json,sys; print(json.load(sys.stdin)['refs'][0]['ref'])")
curl -s "https://trycon-docs.cdn.prismic.io/api/v2/documents/search?ref=$REF&q=..."
```

**Why:** Omitting `?ref=` returns a response without a `results` key, causing a `KeyError` at runtime with no helpful error message.

## Querying documents by UID
Use `my.<type>.uid` (not `document.uid`) in Prismic REST API v2 queries:
```
?q=[[at(my.doc_page.uid,"leave-policy")]]
```
`at(document.uid, ...)` returns a parsing error. Always scope the UID predicate to the specific type.

## Vercel
This project's Vercel deployment runs **Node.js 20.x** (explicitly pinned — do not change). The default Node 24.x caused runtime fetch issues with `@prismicio/client`.

---

# Architecture

## Dev commands
- `npm run dev` → Next.js dev server on port 3000
- `npm run slicemachine` → Slice Machine UI on port 9999

## URL structure
All URLs are built manually as `/${doc.data.category}/${doc.uid}`. There is no Prismic route resolver — do not add one.

## Navigation
The sidebar is driven by a single `navigation` Prismic document (singleton type). It has a `nav_sections` group with nested `links` group (`label`, `link`, `icon`, `badge`). Fetch it by type: `client.getSingle("navigation")`.

## Custom types and slices on disk
- Custom type JSON: `customtypes/<type-name>/index.json`
- Slice model JSON: `components/slices/<SliceName>/model.json`
- TypeScript types: `prismicio-types.d.ts` (hand-written — `prismic-ts-codegen` could not resolve local file paths)

## Slices
Six shared slices: `RichText`, `CalloutBlock`, `StepList`, `CardGrid`, `ContactTable`, `FaqAccordion`. Dispatched via `components/slices/SliceZone.tsx`.

## Heading levels
Prismic `heading1` blocks render as `<h2>` (main sections), `heading2` as `<h3>` (subsections), `heading3` as `<h4>`. This is intentional — `<h1>` is reserved for the page title rendered outside the slice zone.

## TOC anchor IDs
The right-side TOC (`TableOfContents.tsx`) is built in `app/[category]/[uid]/page.tsx` and linked to rendered heading `id` attributes in `RichText/index.tsx`. Both must use the same ID derivation logic or TOC links will silently point nowhere. Current logic: extract from `{#anchor}` suffix if present, otherwise derive from lowercased text with non-word chars stripped.

## Session learnings — 2026-04-06

## Google Docs → Markdown → Prismic conversion artifacts
Content exported from Google Docs to Markdown and then imported into Prismic retains two artifacts that must be cleaned up:

1. **Heading anchors stored as literal text** — Pandoc-style `{#anchor-id}` suffixes (e.g. `A. Disclaimer {#a.-disclaimer}`) appear verbatim in the Prismic heading block's `text` field. Strip them with `re.sub(r'\s*\{#[^}]+\}', '', text)` or handle in the renderer.
2. **Markdown link syntax stored as plain paragraphs** — Quick Access / table-of-contents sections like `[A. Disclaimer](#a.-disclaimer)` are stored as plain-text paragraphs, not Prismic hyperlink spans. They render as literal text, not clickable links.
3. **Markdown bold markers in preformatted/paragraph blocks** — `**bold text**` asterisks appear as literal characters in `preformatted` table blocks and `paragraph` blocks. Strip with `block['text'].replace('**', '')` via the Migration API. Use the Prismic CDN query to find all affected docs at once: fetch all `doc_page` docs, filter for blocks where `'**' in block.get('text', '')`, then PUT each dirty doc back.

**Why:** First fix attempt (adding `id` to h2/h3) had no visible effect because section headings were actually `heading1` type and the anchor text was embedded in the displayed text. Had to inspect raw Prismic API response to discover both issues.

## Session learnings — 2026-04-06 (continued)

## Google Docs → Markdown → Prismic: full artifact list

The existing note above is incomplete. A full import also produces:

4. **Inline `[text](url)` links stored as plain text throughout** — Not just in Quick Access sections. Any hyperlink in the original Google Doc gets stored as literal `[link text](https://url)` in the paragraph's `text` field with no Prismic hyperlink span. Fix by parsing the markdown link, building a span `{"start": N, "end": M, "type": "hyperlink", "data": {"link_type": "Web", "url": "..."}}`, and replacing the `[text](url)` substring with just `text`.
5. **`### ` heading prefixes stored inside list items** — Pandoc sometimes emits subsection headings as `### Procedure {#procedure}` inside an ordered list item rather than as a proper heading block. Strip the `^#{1,6}\s+` prefix.
6. **Pandoc escape sequences throughout all block types** — Any punctuation that Pandoc escapes in Markdown appears verbatim: `\=`, `\>`, `\<`, `\-`, `\(`, `\)`, `\.`, `\*`, `\&`, `\+`, `\[`, `\]`. Unescape with `re.sub(r'\\([^\w\s])', r'\1', text)` (removes backslash before any non-word, non-space character).

**Span adjustment is required** whenever text length changes: record each `(original_position, old_len, new_len)` substitution, then shift every span's `start` and `end` by the cumulative delta of all prior substitutions.

## SSG pages require a Vercel redeploy to show Prismic content changes

This app uses `generateStaticParams()` (static site generation, not ISR). After updating documents via the Migration API, the live Vercel site still serves the old baked-in HTML until a new build runs. Trigger a rebuild immediately with the deploy hook:

```bash
curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_BuH3xY2Rxqk9sGRcXdEPIDJa69hU/QgvQVpOW1J"
```

**Why:** Content fixes were confirmed in the Prismic CDN but the live site still showed old content until the redeploy completed.
