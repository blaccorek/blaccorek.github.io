# AGENTS.md

Operating guide for AI coding agents working in this repository. Read this
before making changes, alongside the architectural decisions in
[docs/adr/](docs/adr/README.md).

## 1. Project snapshot

Personal CV / portfolio site for Tsiorintsoa Andriamihamina (DevOps consultant).

- **Framework**: SvelteKit 2 + Svelte 5 (runes API — `$props`, `$derived`,
  `$state`)
- **Adapter**: `@sveltejs/adapter-static`, fully prerendered
  ([ADR-0003](docs/adr/0003-static-prerendered-site.md))
- **Styling**: Tailwind CSS 4 + own atoms / molecules, no UI library
  ([ADR-0008](docs/adr/0008-own-component-library.md))
- **Content**: JSON files in [src/lib/data/](src/lib/data/)
  ([ADR-0004](docs/adr/0004-json-content-source.md))
- **Language**: TypeScript (strict via `@tsconfig/svelte`)
- **Tests**: Vitest (unit) + Playwright (UI)
  ([ADR-0006](docs/adr/0006-test-strategy.md))
- **Lint / format**: ESLint flat config + Prettier (tab width 4, single quotes,
  no trailing commas)

## 2. Architectural decisions

The "why" behind structural choices lives in [docs/adr/](docs/adr/README.md).
The ones that affect day-to-day work:

- [ADR-0001 — Atomic design](docs/adr/0001-atomic-design.md): atoms / molecules
  / organisms / templates / pages, with strict downward imports.
- [ADR-0002 — Component folder layout](docs/adr/0002-component-folder-layout.md):
  each component is a folder with `index.svelte` + `<name>.svelte.ts` +
  `<name>.test.ts`.
- [ADR-0003 — Static prerendered site](docs/adr/0003-static-prerendered-site.md):
  no runtime backend; all data resolves at build time.
- [ADR-0004 — JSON content](docs/adr/0004-json-content-source.md): content lives
  in `src/lib/data/*.json`, loaded via `+page.ts`.
- [ADR-0006 — Test strategy](docs/adr/0006-test-strategy.md): Vitest co-located
  for pure logic; Playwright in [tests/](tests/) with role-based queries.
- [ADR-0007 — Brand design system](docs/adr/0007-brand-design-system.md): the
  logo-derived `primary` / `secondary` palettes in [src/app.css](src/app.css)
  are the only source of colour; the layout owns the page shell.
- [ADR-0008 — Own component library](docs/adr/0008-own-component-library.md):
  primitives live in `src/lib/atoms/`; variants are named unions resolved by a
  pure helper, not free-form class overrides. Supersedes ADR-0005 (Flowbite).

Before contradicting an ADR, supersede it with a new one instead of silently
working around it.

## 3. Clean code guidelines

- **Names earn comments**. Prefer a descriptive identifier over a comment
  explaining a vague one. Only write a comment when the _why_ is non-obvious (a
  workaround, a constraint, a subtle invariant).
- **Pure helpers in `.ts` files**. Anything expressible without Svelte (string
  formatting, date logic, data shaping) lives in a `.ts` or `.svelte.ts` file
  and is unit-tested.
- **`$derived` over manual reactivity**. Compute view-state with `$derived`;
  don't mutate `$state` in response to props.
- **Props are typed and destructured**:
    ```ts
    interface Props {
        firstname: string;
        lastname: string;
        jobTitle: string;
    }
    const { firstname, lastname, jobTitle }: Props = $props();
    ```
- **No dead code**. Don't leave commented-out blocks, `console.log`, or unowned
  TODOs.
- **No premature abstraction**. Three similar lines beat a one-use generic.
  Extract on the third occurrence, not the second.
- **Imports**: ordered by `@trivago/prettier-plugin-sort-imports` — `^svelte`
  first, then `^[./]`, with separation. Don't fight the formatter.
- **Use `$lib` and `$app/paths`**. Never write `../../lib/...` or hardcode the
  base path; use `resolve()` from `$app/paths` for static asset URLs.
- **Accessibility is non-negotiable**. Every image needs a meaningful `alt` — or
  `alt=""` when it is decorative and the adjacent text already names it
  (technology chips). External links need `rel="noopener noreferrer"` (the
  `link` atom adds it). Use semantic headings in order (`h1` → `h2` → `h3`).

## 4. TDD workflow

Default to test-first. The tooling split is fixed by
[ADR-0006](docs/adr/0006-test-strategy.md); the workflow itself:

1. **Pick the seam**. Pure logic → Vitest unit test. UI behaviour the user sees
   → Playwright test. If UI logic is complex enough to warrant a test on its
   own, _extract it_ into a `.svelte.ts` helper and unit-test the helper.
2. **Red**: write the failing test first. Unit tests next to the source as
   `*.test.ts`; UI specs under [tests/](tests/).
3. **Green**: implement the smallest change that turns the test green.
4. **Refactor**: clean up names, extract helpers, delete duplication — with the
   test still green.

What to unit-test in this repo: string / date formatters (`toCamelCase`,
`buildDate`, `buildTitle`), data-mapping logic, branching fallbacks (e.g.
`degree || programType`).

What to UI-test: page `<title>`, primary headings, links by role, and any
visible behaviour a visitor relies on. Parameterise with a loop for table-driven
cases (see [tests/navigation.test.ts](tests/navigation.test.ts)).

Assert what the visitor sees, not what a change removed. A test that an old
element is gone (`toHaveCount(0)`, `not.toBeVisible()`) only guards against a
revert and says nothing about the page. Check for absence only when the page
itself hides or removes something in response to the visitor — a closed menu, a
dismissed banner — because then the disappearance is the behaviour.

## 5. Adding a new component

1. Decide its layer (atom / molecule / organism per
   [ADR-0001](docs/adr/0001-atomic-design.md)). Justify it in one sentence.
2. Create `src/lib/<layer>/<name>/index.svelte` and, if needed,
   `<name>.svelte.ts` for types and pure helpers
   ([ADR-0002](docs/adr/0002-component-folder-layout.md)).
3. **Red**: write `<name>.test.ts` for any helper, and a Playwright spec for any
   user-visible behaviour the component introduces.
4. **Green**: implement using `$props()`, `$derived`, and typed interfaces.
5. **Refactor**: collapse duplication, run `npm run format`.
6. Consume it from the page or higher-layer component — never let a lower layer
   reach upward.

## 6. Adding a new route

1. Create `src/routes/<slug>/+page.svelte` and (if it needs data) `+page.ts`
   returning typed data from [src/lib/data/](src/lib/data/).
2. Add a `<svelte:head>` with route-specific `<title>` and
   `<meta name="description">` — SEO is part of "done" here.
3. Add the route to `menuItems` in
   [src/routes/+layout.ts](src/routes/+layout.ts).
4. Add a Playwright spec under [tests/](tests/) that loads the route and asserts
   its heading + that the nav link reaches it.

## 7. Commands

```bash
npm run test              # integration then unit
npm run test:unit         # vitest, single run
npm run test:unit:watch   # vitest, watch mode
npm run test:integration  # playwright
npm run check             # svelte-check (type errors)
npm run lint              # prettier + eslint
npm run format            # prettier --write
```

Before declaring work done: `npm run check && npm run lint && npm run test` must
all pass. For any UI change, also exercise the flow in a browser (`npm run dev`)
— type checks confirm correctness, not feature behaviour.

## 8. Things to never do

- Don't introduce a runtime backend — see
  [ADR-0003](docs/adr/0003-static-prerendered-site.md).
- Don't add a new global CSS file; extend [src/app.css](src/app.css) or use
  Tailwind utilities.
- Don't hardcode a colour. Use `primary-*` / `secondary-*` / `gray-*` utilities,
  with a `dark:` counterpart on every surface — see
  [ADR-0007](docs/adr/0007-brand-design-system.md).
- Don't add a UI component library back, and don't hand-roll markup for
  something `src/lib/atoms/` already covers — see
  [ADR-0008](docs/adr/0008-own-component-library.md).
- Don't commit `console.log`, `.only` / `.skip` in tests, or unused imports.
- Don't widen scope. A bug fix changes the minimum needed; a feature ships its
  own tests.
