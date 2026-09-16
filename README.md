# Orbit

Orbit is a local-first weekly and daily planner for protecting focus time. It is a single-user MVP with mock data, no account, and no external calendar integrations.

## Requirements

- Node.js 20.9 or later
- pnpm 12 (the version is recorded in `package.json`)

## Start locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The Week view is available at `/`; a selected day is available at `/day/YYYY-MM-DD`.

For testing on a phone on the same trusted network, start the server so it is reachable on the LAN, then open `http://192.168.1.13:3000`. The configured address in `next.config.ts` is development-only. Update it if DHCP gives the computer a different LAN address, then restart the development server.

## Commands

```bash
pnpm dev             # Start the Next.js development server
pnpm build           # Produce a production build
pnpm start           # Serve the production build
pnpm typecheck       # Run TypeScript without emitting files
pnpm lint            # Run ESLint
pnpm test            # Run Vitest once
pnpm test:watch      # Run Vitest interactively
pnpm format          # Apply Prettier formatting
pnpm format:check    # Verify formatting without writing
```

## Architecture

- `src/components/planner/` contains presentational Week, Day, agenda, card, navigation, and header components.
- `src/hooks/use-calendar-planner.ts` owns client hydration, local persistence, selection, navigation, CRUD, and editor state.
- `src/lib/calendar.ts` contains date, time, sorting, positioning, lane assignment, and draft-default rules.
- `src/lib/event-form.ts` owns editor validation and time options; `src/lib/event-meta.ts` centralizes readable category and color metadata.
- `src/components/event-editor.tsx` composes the accessible Radix dialog and React Hook Form UI.

## Local data

Events are persisted only in the browser under `orbit.events.v1`. A relative-date mock calendar is seeded only when no stored record exists. Invalid stored data is surfaced in the interface and can be reset to the sample calendar. Clearing browser site data resets Orbit.

Dates and times are intentionally plain local strings. Orbit does not perform time-zone conversion, support recurrence or multi-day events, connect to external calendars, provide authentication, or include drag-and-drop scheduling.

## Visual system

The canonical visual specification is in [DESIGN.md](./DESIGN.md). Orbit uses its existing light palette and locally bundled typefaces; no remote font download is required at runtime.
