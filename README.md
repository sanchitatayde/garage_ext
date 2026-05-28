# Zoop.one Claims — Garage Prototype

Working prototype of the garage-side Zoop.one Claims app. Mobile-first
(~390 px frame), no backend — all data is mocked behind typed accessors.

## Stack

- **Next.js 16** App Router · React 19 · TypeScript strict
- **Tailwind CSS v4** (CSS-first tokens in `app/globals.css`)
- **Zustand** for session, drawer, and toast state
- **lucide-react** for icons
- **Fonts**: Geist (body) + Geist Mono (numbers/IDs), via `next/font/google`

## Run locally

```bash
npm install        # if you cloned fresh
npm run dev        # http://localhost:3000
npm run build      # production build (also runs typecheck + lint)
```

No environment variables. Closes the tab → session resets (deliberate
prototype behaviour).

## Route map

| URL | What it is |
|---|---|
| `/` | Redirect → `/login` |
| `/login` | Mobile-number entry + validation → sends OTP |
| `/login/verify` | 6-digit OTP input, 45s resend countdown |
| `/register` | First-time "Confirm your garage" form (pre-filled) |
| `/home` | Dashboard: claim carousel + ProgressDots + tasks + skeletons |
| `/claims` | My Claims list with filter chips |
| `/claims/[id]` | Claim detail: status banner, Estimate Approved card, Vertical timeline with sub-items, Documents + Damage Photos |
| `/support` | Stub (templatized FAQ planned) |
| `/profile` | Stub (Garage profile planned) |
| `/sandbox` | Kitchen-sink of tokens + base components |

## Folder layout

```
app/
  (auth)/login, /login/verify, /register   → auth shell, no tabs
  (app)/home, /claims, /claims/[id], /support  → app shell + bottom tabs + drawer
  profile/                                  → standalone, no tabs
  sandbox/                                  → token/component playground
components/
  ui/        → Button, Input, SegmentedToggle, Chip, Card, ListRow,
              ProgressDots, ProgressSegmented, IconTile, FilterChips,
              Skeleton, ToastViewport
  shell/    → AppHeader, PageHeader, BottomTabBar, MenuDrawer
  claims/   → ClaimCard, ClaimCarousel, ClaimListCard, VerticalStepper
  tasks/    → TaskRow
  auth/     → OtpInput
lib/
  store/    → menu (drawer), session, toast (Zustand)
  cn.ts, format.ts, claim-helpers.ts
  mock-data.ts  ← all entities live here, exposed via getX() functions
types/
  index.ts  ← shared types (Garage, Claim, Stage, Task, …)
```

## Try the happy path

1. `/` → redirects to `/login`.
2. Enter any valid 10-digit mobile (e.g. `9839274020`) → **Send OTP**.
3. Type any 6 digits (other than `000000`, which fails on purpose) → auto-verifies → **/home**.
4. Tap the burger ☰ → drawer slides in → tap "Sai Garage" → `/profile`.
5. Tap **My Claims** tab → filter chips → tap any card → claim detail with timeline + documents.

## Known TODOs

- `/support` — templatized FAQ surface
- `/profile` — full Garage profile (Personal info / Contact / KYC)
- Claim list & dashboard claim sets aren't unified (one entity per array
  for now; merging is one accessor change)
- The "View Repair photos" CTA on claim detail is currently a styled
  no-op; wire to an in-page section or a modal once a design exists
- Real `<img />` placeholders for document/photo thumbs (currently grey
  stacked rects)

## Deploy to Vercel

Two zero-config paths — pick one:

### A. CLI (fastest)
```bash
cd ~/Desktop/zoop-claims-prototype
npx vercel
```
Follow the prompts — log in via the browser, accept the default project
name + scope. Vercel will run `npm run build` remotely and hand back a
preview URL like `https://zoop-claims-prototype-xyz.vercel.app`.

### B. GitHub + Vercel.com
```bash
cd ~/Desktop/zoop-claims-prototype
gh repo create zoop-claims-prototype --public --source=. --push
# or: create the repo manually on github.com, then:
#     git remote add origin <repo-url> && git push -u origin main
```
Then go to **vercel.com/new**, click "Import Git Repository", pick the
repo, accept defaults, **Deploy**.

There are no env vars to set and no build configuration needed.
