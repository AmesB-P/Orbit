---
version: alpha
name: "Orbit"
description: "A calm personal planner with an editorial studio presence and a practical weekly calendar."
colors:
  canvas: "#b6b1ca"
  surface: "#f7f5fb"
  control: "#ffffff"
  ink: "#393248"
  selected: "#796191"
  event-surface: "#ece5f3"
  event-marker: "#9c81b7"
  event-muted: "#716477"
  focus-accent: "#c75a3c"
  border: "#ded8e8"
  border-strong: "#cfc8dc"
typography:
  display:
    fontFamily: "Cormorant Garamond Variable, Cormorant Garamond, Georgia, serif"
  sans:
    fontFamily: "Jost Variable, Jost, sans-serif"
  mono:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, monospace"
rounded:
  feature: "1rem"
  panel: "0.75rem"
  control: "0.5rem"
spacing:
  page-max: "74rem"
  base: "0.25rem"
components:
  button: {}
  event-card: {}
  dialog: {}
  calendar-grid: {}
---

# Orbit Design System

## Overview

### Creative North Star

Orbit takes the composed, editorial feeling of a small featured studio and applies it to a personal planning surface. The week is a protected working field: expressive only at the top, quiet and legible where time must be read and edited.

### Product context and register

- **Audience and primary job:** A single person arranging appointments, personal commitments, work, and protected focus time.
- **Usage scene:** Frequent desktop planning with quick mobile agenda review and capture.
- **Register:** Product utility with an editorial studio header; calendar operations remain familiar and direct.
- **Memorable signature:** A dark-plum, serif-led Orbit masthead paired with a precise, light planner grid.
- **Restraint:** Event cards, time lanes, fields, and destructive actions are deliberately plain so the schedule remains scannable.
- **Anti-references:** Generic SaaS card grids, decorative gradients, and color-only status systems.
- **Token ownership/runtime mapping:** `src/app/globals.css` is the canonical runtime Tailwind v4 token source. This document mirrors those values and intent; it does not generate CSS.

## Colors

Orbit uses the existing light palette without substitutions. Canvas `#b6b1ca` frames surface `#f7f5fb`; ink `#393248` creates the masthead and primary type contrast. Selected plum `#796191` denotes active navigation and today, while event surface `#ece5f3`, marker `#9c81b7`, and muted text `#716477` organize schedule details. Focus uses terracotta `#c75a3c` with text and icon support, never color alone.

The warm tan and brown palette from the Featured Studio source is intentionally excluded. Existing white, border, and error tones are semantic tokens, not new visual directions.

## Typography

Cormorant Garamond is reserved for page and section titles; it establishes the editorial voice without reducing data clarity. Jost is used for navigation, controls, fields, and event names. JetBrains Mono is for compact calendar metadata, weekday labels, and time values. Labels use modest tracking rather than all-caps body copy.

## Layout

The maximum frame is 1184px on the lavender canvas. Desktop uses an asymmetric two-part command header before the seven-day grid. The visual center is the dark Orbit masthead; the adjacent control deck contains week context, derived metrics, navigation, and creation actions. At widths below 1024px, this composition stacks, followed by a horizontally scrollable date selector and selected-day agenda.

Use the four-pixel spacing rhythm, 16px feature-card corners, 12px panels, 8px fields/event cards, and pill selectors. Calendar data always keeps readable rows and explicit horizontal overflow cues.

## Elevation & Shapes

The outer planner has the existing plum-tinted panel shadow. Event cards use a lighter shadow and lift by one pixel only on direct interaction. Avoid floating shadows for ordinary layout sections. Borders define grid structure; tonal surfaces establish hierarchy.

## Components

### Foundational states

Enabled controls have pointer, hover, pressed, and visible two-pixel focus states. Minimum target size is 44px. Disabled controls retain geometry and reduce opacity. Skeletons preserve the finished planner’s footprint. Error text appears in words and is associated with its field.

### Buttons and navigation

Primary creation uses solid plum, focus creation uses an outlined terracotta treatment, and destructive confirmation uses the existing danger tone. Week and Day are pill selectors with text labels. Icon-only buttons always expose accessible names.

### Calendar and events

Every event card shows its title, category icon, category name, and time/all-day text alongside its color marker. Overlapping events remain lane-based. Empty time slots are buttons and become visible on hover or keyboard focus.

### Forms and overlays

Event editing is a centered Radix dialog on desktop and an anchored full-height sheet on narrow screens. Forms use app-owned validation with `noValidate`, named labels, inline error text, stable save geometry, and non-resizable notes. Deletion remains an explicit in-dialog confirmation.

### Iconography

Use Phosphor icons with a consistent 18px action size and 14px event-metadata size. Icons reinforce rather than replace labels in user-facing event identity.

### Motion

Motion is CSS-only and communicates hierarchy or response: a single 240ms composition reveal, 180–200ms overlay/sheet transitions, and brief interaction feedback. Reduced-motion preferences remove transforms, delays, and repeated animation.

## Do's and Don'ts

- **Do:** Keep the studio-like expression concentrated in the command header and typographic hierarchy.
- **Do:** Use plain language and familiar calendar controls for planning work.
- **Don't:** Import the reference’s palette or use gradients, decorative imagery, or fake dashboard metrics.
- **Don't:** Depend on color, hover, or motion alone to communicate event identity or control state.
