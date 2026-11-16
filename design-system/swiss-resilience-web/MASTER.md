# MASTER DESIGN SYSTEM — Swiss Resilience Hub — Multi-User ORP/RAV Co-Pilot SaaS (`swiss-resilience-web`)

- **Generator**: `nextlevelbuilder/ui-ux-pro-max-skill` (`v2.15`) + `ibelick/ui-skills` Synergy
- **Pattern**: `Hero-Centric + Interactive Self-Check Quiz + Bento Pricing Tiers`
- **Style**: `Swiss Institutional Trust + Bento Grid`
- **Design Dials**: `density=4` | `motion=5` | `variance=6`

## 1. Semantic Color Tokens (`tokens.css` & `tokens.json`)
- `--color-background`: `#0b1020`
- `--color-surface`: `#111827`
- `--color-surface-subtle`: `#1e293b`
- `--color-primary`: `#dc2626`
- `--color-on-primary`: `#ffffff`
- `--color-success`: `#059669`
- `--color-text`: `#f8fafc`
- `--color-text-muted`: `#cbd5e1`
- `--color-border`: `#334155`
- `--color-ring`: `#ef4444`

## 2. Typography & Resilient Layout Rules
- **Heading Font**: `Plus Jakarta Sans, Inter Variable, system-ui, sans-serif` (`text-wrap: balance`)
- **Body Font**: `Inter Variable, system-ui, sans-serif` (`text-wrap: pretty`, `line-height: 1.5`)
- **Monospace / Numeric Font**: `JetBrains Mono, ui-monospace, monospace` (`font-variant-numeric: tabular-nums`)
- **Resilient Wrapping**: Long job IDs, URLs, and SHA/Gmail tokens MUST set `overflow-wrap: anywhere; word-break: break-word`.

## 3. Mandatory Pre-Delivery Checklist (`ui-ux-pro-max` + `ibelick/ui-skills`)
- [x] Minimum `44x44px` touch target (`min-height: 44px`) on all interactive buttons, filter pills, and inputs
- [x] `100dvh` (`min-height: 100dvh`) + `env(safe-area-inset-bottom)` for Telegram Mini App WebView
- [x] `font-variant-numeric: tabular-nums` on all counters, CHF balances, quotas (`14/10`), and `p50_ms`/`p95_ms` metrics
- [x] `role="status" aria-live="polite"` on dynamic status and telemetry banners
- [x] IME-safe Enter key handling (`!event.isComposing`) on live filter/search inputs
- [x] `@media (prefers-reduced-motion: reduce)` respected across all transitions
