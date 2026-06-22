## How to use this document
Work through milestones in order. Each story maps to a React concept from your learning notes. Every task is a concrete action you can complete in under 30 minutes.

---

## Milestone 1 — Foundation & Setup
**Estimate: 1–2 days**

### Story 1.1 — Initialise Next.js project
*Project setup*
- [ ] Run `npx create-next-app@latest devexpenses --typescript --tailwind --eslint --app`
- [ ] Verify dev server starts on `localhost:3000`
- [ ] Remove boilerplate from `app/page.tsx` and clear `globals.css` defaults
- [ ] Install extra packages: `npm install zustand` and `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react`

### Story 1.2 — Configure project structure
*TypeScript config*
- [ ] Create folders: `components/` `types/` `lib/` `store/` `utils/`
- [ ] Add path aliases to `tsconfig.json` (`@/components`, `@/types`, `@/lib`, `@/store`, `@/utils`)
- [ ] Create `vitest.config.ts` with jsdom environment and React plugin
- [ ] Create `vitest.setup.ts` importing `@testing-library/jest-dom`

### Story 1.3 — Define TypeScript types
*Type system*
- [ ] Create `types/expense.ts`: `Expense` interface with `id`, `name`, `amount`, `category`, `billingCycle`, `date`, `notes`
- [ ] Add `Category` type: `"Software" | "Subscription" | "Hardware" | "Learning" | "Other"`
- [ ] Add `BillingCycle` type: `"monthly" | "annual" | "one-time"`
- [ ] Create `types/api.ts`: `ApiResponse<T>` generic type
- [ ] Run `npx tsc --noEmit` to verify zero TypeScript errors

### Story 1.4 — Build in-memory data layer
*Topic 9 — data source*
- [ ] Create `lib/store.ts` with a module-level `expenses: Expense[]` array
- [ ] Implement `getExpenses(): Expense[]` function
- [ ] Implement `addExpense(data): Expense` using `crypto.randomUUID()` for id
- [ ] Implement `deleteExpense(id): boolean` — returns false if not found
- [ ] Add 6 seed expenses covering all 5 category types

### Story 1.5 — Utility functions + first unit tests
*Topic 12 — unit tests*
- [ ] Create `utils/formatCurrency.ts` — throws on negative, formats INR and USD
- [ ] Create `utils/formatDate.ts` — formats ISO string to readable date (e.g. 12 Jun 2025)
- [ ] Create `utils/calculateSummary.ts` — returns monthly total, annual total, count from `Expense[]`
- [ ] Write `utils/formatCurrency.test.ts`: 4 cases (positive, zero, negative throws, USD)
- [ ] Write `utils/calculateSummary.test.ts`: mixed billing cycles, empty array
- [ ] Run `npx vitest` — verify all tests pass green

---

## Milestone 2 — App Router Shell
**Estimate: 1 day**

### Story 2.1 — Root layout with Navigation
*Topic 7 — layout.tsx*
- [ ] Create `app/layout.tsx` with `html` and `body` tags, import `globals.css`
- [ ] Create `components/Navigation.tsx` with links: Dashboard `/` and Add Expense `/expenses/new`
- [ ] Add `usePathname` hook to Navigation for active link detection — mark file as `"use client"`
- [ ] Style active link with Tailwind (`border-b`, `font-weight` change)
- [ ] Import and render Navigation inside `layout.tsx` before the main content area

### Story 2.2 — Create all special route files
*Topic 7 — loading / error / not-found*
- [ ] Create `app/loading.tsx` — return an animated pulse skeleton or spinner `div`
- [ ] Create `app/error.tsx` — mark `"use client"`, accept `error` and `reset` props, show message + Reset button
- [ ] Create `app/not-found.tsx` — friendly 404 message with a link back to home
- [ ] Create `app/expenses/new/page.tsx` — placeholder heading for now

### Story 2.3 — Verify all routes work
*Smoke test*
- [ ] Visit `localhost:3000` — root layout renders with Navigation, page content renders below
- [ ] Visit `localhost:3000/expenses/new` — nested route renders correctly
- [ ] Visit `localhost:3000/fake-anything` — `not-found.tsx` renders
- [ ] Temporarily throw an error in `page.tsx`, verify `error.tsx` catches it, then revert

---

## Milestone 3 — API Layer
**Estimate: 1 day**

### Story 3.1 — Expense CRUD endpoints
*Topic 8 — Route handlers*
- [ ] Create `app/api/expenses/route.ts`
- [ ] Implement `GET` handler: call `getExpenses()`, return `NextResponse.json(expenses)`
- [ ] Implement `POST` handler: parse body, validate name and amount present, call `addExpense()`, return 201
- [ ] Return 400 with error message if validation fails in POST
- [ ] Create `app/api/expenses/[id]/route.ts`
- [ ] Implement `DELETE` handler: call `deleteExpense(id)`, return 204 on success, 404 if not found
- [ ] Test GET by visiting `localhost:3000/api/expenses` in browser — JSON array should appear

### Story 3.2 — Middleware
*Topic 8 — Middleware*
- [ ] Create `middleware.ts` at project root (same level as `app/`, not inside it)
- [ ] Log request method and pathname to console for every matched request
- [ ] Add demo auth check: if no `auth-demo` cookie on `/expenses` routes, redirect to `/`
- [ ] Export `config.matcher`: `["/expenses/:path*", "/api/:path*"]`
- [ ] Verify middleware runs: terminal shows request logs when navigating pages

### Story 3.3 — Webhook endpoint with event deduplication
*Topics 10 + 11 — Webhooks, event consistency*
- [ ] Create `app/api/webhook/route.ts`
- [ ] Declare module-level: `const processedIds = new Set<string>()`
- [ ] Implement `POST`: parse body as `{ id: string, type: string, data: unknown }`
- [ ] If `event.id` is in `processedIds`, return 200 with `{ status: "already_processed" }`
- [ ] If new: add to Set, log event type, return 200 with `{ received: true }`
- [ ] Test deduplication: send two identical POST requests — second returns `already_processed`

---

## Milestone 4 — Core UI Components
**Estimate: 2 days**

### Story 4.1 — SummaryCard — composition leaf
*Topic 1 — Composition*
- [ ] Create `components/SummaryCard.tsx`
- [ ] Props: `title: string`, `value: string`, `subtitle?: string`
- [ ] Style with Tailwind: `rounded-lg border p-4 flex flex-col gap-1`
- [ ] Render title as small muted text, value as large `font-medium` text

### Story 4.2 — EmptyState component
*Topic 4 — Empty states*
- [ ] Create `components/EmptyState.tsx`
- [ ] Props: `message: string`, `actionLabel?: string`, `onAction?: () => void`
- [ ] Render centred icon + message in a `py-16` container
- [ ] Render action button only when both `actionLabel` and `onAction` props are provided

### Story 4.3 — ErrorBoundary class component
*Topic 4 — Error boundaries*
- [ ] Create `components/ErrorBoundary.tsx` as a `React.Component` class (not functional)
- [ ] Add state type: `{ hasError: boolean; error?: Error }`
- [ ] Implement `static getDerivedStateFromError(error)`: return `{ hasError: true, error }`
- [ ] Implement `componentDidCatch(error, info)`: `console.error` both arguments
- [ ] In `render()`: return `fallback` prop when `hasError` is true, otherwise return `children`

### Story 4.4 — ExpenseCard component
*Topic 1 — Composition*
- [ ] Create `components/ExpenseCard.tsx`
- [ ] Props: `expense: Expense`, `onDelete: (id: string) => void`
- [ ] Render: name (`font-medium`), formatted amount, category badge, billing cycle pill, formatted date
- [ ] Use different Tailwind colours per category in the badge (Software=blue, Hardware=amber, Learning=teal, etc.)
- [ ] Add Delete button that calls `onDelete(expense.id)` — no internal delete logic in this component

### Story 4.5 — ExpenseList with all data states
*Topics 3+4 — useEffect, useMemo, useCallback, loading/empty/error*
- [ ] Create `components/ExpenseList.tsx`, mark `"use client"`
- [ ] Add `useState` for: `expenses` (Expense[]), `loading` (boolean, initial `true`), `error` (string)
- [ ] Add `useEffect`: fetch `GET /api/expenses` on mount, set state on success, catch and set error on failure
- [ ] Add `useMemo`: filter expenses by `searchQuery` prop — recalculates only when `expenses` or `searchQuery` changes
- [ ] Add `useCallback`: `handleDelete` — sends `DELETE /api/expenses/id`, filters deleted item from state
- [ ] Render loading spinner when `loading` is true
- [ ] Render error message with retry button when `error` is non-empty
- [ ] Render `EmptyState` when filtered list is empty, map `ExpenseCard`s otherwise

---

## Milestone 5 — Forms, Hooks & Global State
**Estimate: 2–3 days**

### Story 5.1 — AddExpenseForm — controlled form with all hooks
*Topics 2+3 — Controlled form, useState, useEffect, useRef*
- [ ] Create `components/AddExpenseForm.tsx`, mark `"use client"`
- [ ] Add `useState` for each field: `name`, `amount`, `category`, `billingCycle`, `notes`
- [ ] Add `useState` for: `errors` (object), `isSubmitting` (boolean)
- [ ] Add `useRef` on the name input element: `nameRef = useRef<HTMLInputElement>(null)`
- [ ] Add `useEffect` to focus name input on mount: `nameRef.current?.focus()`
- [ ] Write `validate()`: checks name is non-empty, amount is a positive number, returns errors object
- [ ] Write `handleSubmit`: calls `validate()`, sets `isSubmitting`, POSTs to `/api/expenses`, resets form on success
- [ ] Render: controlled inputs (value + onChange), inline error messages, disabled submit button while `isSubmitting`

### Story 5.2 — SearchBar — useRef keyboard shortcut
*Topic 3 — useRef + useEffect*
- [ ] Create `components/SearchBar.tsx`, mark `"use client"`
- [ ] Add `useRef` on the input element
- [ ] Add `useEffect`: add `keydown` listener on `window` — if key is `"/"` and input not focused, focus it and `preventDefault()`
- [ ] Return cleanup function from `useEffect` that removes the event listener
- [ ] Add `useCallback` wrapping the `onChange` handler, dependency array `[onSearch]`
- [ ] Set placeholder text to `"Search (press / to focus)"`

### Story 5.3 — Modal — full accessibility and focus management
*Topic 5 — Accessibility, focus management*
- [ ] Create `components/Modal.tsx`, mark `"use client"`
- [ ] Props: `isOpen: boolean`, `onClose: () => void`, `title: string`, `children: React.ReactNode`
- [ ] Add `useRef`: `modalRef` on container div, `previousFocusRef` for storing prior focus target
- [ ] Add `useEffect`: on open → store `document.activeElement`, focus modal; on close → restore stored focus
- [ ] Add `onKeyDown` on container: if Escape key pressed, call `onClose()`
- [ ] Add ARIA: `role="dialog"` `aria-modal="true"` `aria-labelledby` pointing to title id, `tabIndex={-1}`
- [ ] Add backdrop `div` with `onClick={onClose}` — renders behind modal content
- [ ] Use Modal in `ExpenseCard`: Delete button opens confirmation modal, Confirm calls `onDelete`, Cancel closes

### Story 5.4 — Zustand global store
*Topic 6 — Global app state*
- [ ] Install Zustand: `npm install zustand`
- [ ] Create `store/useAppStore.ts` using `create()` from zustand
- [ ] State: `currency` ("INR" | "USD", default "INR"), `notifications` (string[])
- [ ] Actions: `setCurrency(c)`, `addNotification(message)`, `clearNotifications()`
- [ ] Update `formatCurrency.ts` to read `currency` from the store
- [ ] In `ExpenseList` `handleDelete` success: call `addNotification("Expense deleted")`
- [ ] Add notification banner in Navigation that reads notifications, clears after 3 seconds

### Story 5.5 — Wire the dashboard page together
*Topic 9 — Dynamic rendering*
- [ ] Update `app/page.tsx` as async server component: call `getExpenses()` directly (no fetch needed)
- [ ] Compute: monthly total, annual total, total count from expenses
- [ ] Render 3 `SummaryCard` components with computed values
- [ ] Create `components/DashboardClient.tsx` `"use client"`: holds `searchQuery` state, renders `SearchBar` + `ExpenseList`
- [ ] Import `DashboardClient` in `page.tsx` (client boundary below the server-rendered summary cards)
- [ ] Wrap `DashboardClient` in `ErrorBoundary` with a fallback message
- [ ] Add an "Add expense" link/button on the dashboard pointing to `/expenses/new`

---

## Milestone 6 — Polish, Tests & CI/CD
**Estimate: 1 day**

### Story 6.1 — Accessibility audit
*Topic 5 — Keyboard support + ARIA*
- [ ] Audit all buttons: every button has visible text or an `aria-label` attribute
- [ ] Tab through `AddExpenseForm`: all fields reachable in logical order, no unwanted focus traps
- [ ] Open delete Modal, press Tab repeatedly: focus must stay inside modal while it is open
- [ ] Press Escape while modal is open: modal must close and focus must return to the Delete button
- [ ] Add `aria-live="polite"` region in `layout.tsx` for the notification messages
- [ ] Navigate the entire app using only keyboard (no mouse): add, search, delete — all must work

### Story 6.2 — Component unit tests
*Topic 12 — React Testing Library*
- [ ] Write `ExpenseCard.test.tsx`: renders expense name and formatted amount
- [ ] Write `ExpenseCard.test.tsx`: clicking Delete button calls `onDelete` with the correct expense id
- [ ] Write `EmptyState.test.tsx`: renders the message prop, hides button when `onAction` not provided
- [ ] Write `SummaryCard.test.tsx`: renders title and value props correctly
- [ ] Run `npx vitest run` — all tests (utils + components) pass with zero failures

### Story 6.3 — CI/CD pipeline
*Topic 12 — GitHub Actions*
- [ ] Create `.github/workflows/ci.yml`
- [ ] Add trigger: on `push` and `pull_request` to the `main` branch
- [ ] Add steps: `actions/checkout`, `actions/setup-node` v20 with npm cache
- [ ] Add step: `npm ci`
- [ ] Add step: `npx tsc --noEmit` (type check stage)
- [ ] Add step: `npm run lint` (ESLint stage)
- [ ] Add step: `npx vitest run` (unit test stage)
- [ ] Add step: `npm run build` (production build stage)

### Story 6.4 — Final cleanup and README
*Project wrap-up*
- [ ] Write `README.md`: project description, `npm install` + `npm run dev` setup, list of npm scripts
- [ ] Remove all `console.log` debug statements from API routes and components
- [ ] Run `npm run build` locally and fix any type or build errors before final push
- [ ] Manual smoke test: add expense, search, delete, visit `/fake-route`, test form validation
- [ ] Push to GitHub and verify the full CI pipeline passes green in the Actions tab

---

## Concept → file reference

| React topic | File(s) that demonstrate it |
|---|---|
| Composition-first design | `SummaryCard`, `EmptyState`, `ExpenseCard`, `ExpenseList` |
| Controlled form patterns | `AddExpenseForm` |
| useState | `AddExpenseForm`, `ExpenseList`, `DashboardClient` |
| useEffect | `AddExpenseForm` (focus), `ExpenseList` (fetch), `Modal` (focus), `SearchBar` (keyboard) |
| useMemo | `ExpenseList` (filtered expenses) |
| useCallback | `ExpenseList` (handleDelete), `SearchBar` (onChange) |
| useRef | `AddExpenseForm` (name input), `Modal` (focus), `SearchBar` (input focus) |
| Error boundaries | `ErrorBoundary.tsx`, `app/error.tsx` |
| Loading states | `ExpenseList`, `app/loading.tsx` |
| Empty states | `EmptyState.tsx` used in `ExpenseList` |
| Accessibility | `Modal.tsx` (focus trap, ARIA), `SearchBar` (keyboard), Navigation |
| Local UI state | `Modal` open/close in `ExpenseCard` |
| Form state | `AddExpenseForm` fields + errors |
| Server state cache | `ExpenseList` via TanStack Query (optional upgrade) |
| Global app state | `store/useAppStore.ts` (Zustand) |
| App Router layout | `app/layout.tsx` |
| App Router page | `app/page.tsx`, `app/expenses/new/page.tsx` |
| App Router loading | `app/loading.tsx` |
| App Router error | `app/error.tsx` |
| App Router not-found | `app/not-found.tsx` |
| Route handlers | `app/api/expenses/route.ts`, `app/api/expenses/[id]/route.ts` |
| Middleware | `middleware.ts` |
| Static generation | Not used here (no public pages) |
| Dynamic rendering | `app/page.tsx` (reads live data) |
| Client-side fetch | `ExpenseList` via `useEffect` + `fetch` |
| Webhooks | `app/api/webhook/route.ts` |
| Event deduplication | `app/api/webhook/route.ts` (Set-based dedup) |
| Unit tests | `utils/*.test.ts`, `components/*.test.tsx` |
| CI/CD pipeline | `.github/workflows/ci.yml` |
