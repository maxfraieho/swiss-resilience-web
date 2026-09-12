# ADR-017: Viewport Stacking Context Isolation, Brand Simplification (SwissRelief), and Mobile-First Interaction Architecture

* **Status:** ACCEPTED
* **Date:** 2026-09-12
* **Author:** Swiss Resilience Team & Lead Architect
* **Deciders:** Arsen & Lead Architect
* **Consulted:** Utopia Knowledge Graph, W3C CSS Stacking Context Specification, Telegram Mini App Standards (TMA SDK v7.10)

---

## 1. Context & Problem Statement

Production telemetry and photographic evidence from host `.184` (9 mobile and desktop screenshots taken at `2026-09-12 19:25–19:28` across screens ranging from 360px to 1920px) revealed four severe visual and architectural defects degrading user experience and conversion:

1. **Mobile Sandwich Drawer Height Clipping (~120px Window):**
   When triggering the hamburger navigation button on mobile devices, the drawer overlay opened confined inside an unnatural ~120px horizontal band at the top of the screen instead of spanning the entire viewport (`100dvh`). Navigation links, language buttons, and call-to-action elements were inaccessible without scrolling through an awkward peephole.
2. **Language Dropdown Overlap & Stacking Context Conflict:**
   In desktop view, clicking the language dropdown caused options (`Français`, `Deutsch`, etc.) to be rendered underneath or clipped by the horizontal `.service-banner`. In mobile view, the dropdown button was crammed horizontally into the header alongside brand text and hamburger icons, causing touch collisions.
3. **CH-ISCO Art. 21a LEI Alert Breakup on Narrow Displays:**
   The statutory priority notice (`stellen-alert`) employed a rigid row-flex layout. On small screens (< 640px), the gold badge container collapsed into an empty block while text overflowed outside the viewport boundary.
4. **Brand Titling Cognitive & Layout Overhead:**
   The full brand title (*« Swiss Resilience Navigator 2.5 · Pan-Swiss Bêta »* — 44 characters) occupied excessive header real estate, forcing unnatural text wraps and pushing primary interface actions off-canvas.

---

## 2. Root Cause Analysis (W3C CSS Specification & Stacking Contexts)

### 2.1 The `backdrop-filter` Containing Block Trap
According to the **W3C CSS Filter Effects Module Level 1**:
> *"A value other than none for the filter or backdrop-filter property results in the creation of a containing block for absolute and fixed positioned descendants unless the element is the root element."*

In `styles.css`:
```css
.nav-wrap {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 12px 0;
  backdrop-filter: blur(8px); /* <-- CREATES LOCAL CONTAINING BLOCK! */
}
```
Because `.mobile-drawer-overlay` was nested inside `.nav-wrap` in the JSX tree:
```jsx
<div className="nav-wrap">
  {mobileMenuOpen && (
    <div className="mobile-drawer-overlay"> ... </div>
  )}
</div>
```
The fixed overlay (`position: fixed; inset: 0;`) was trapped within `.nav-wrap`'s bounding box (~120px height), completely disabling viewport-wide expansion (`100dvh`).

### 2.2 Stacking Order between Siblings
Both `.nav` and `.service-banner` possessed composited filter layers (`backdrop-filter: blur(20px)` and `blur(16px)`). Because `.service-banner` occurred later in DOM order without explicit relative z-index isolation on `.nav`, `.service-banner` was composited *over* the `.lang-dropdown-menu` (`z-index: 100`).

---

## 3. Decision Drivers

* **Flawless Mobile Experience:** All drawers, dialogs, and modals must span `100dvh` without parent clipping.
* **Instant Brand Recognition:** A punchy, empathetic name that fits mobile headers on single line.
* **Strict Stacking Context Isolation:** Absolute dropdowns must reliably float above all sibling content.
* **Zero-Layout-Shift (CLS) & Fluid Responsiveness:** Clean reflow from 320px smartphones to 4K desktop screens.

---

## 4. Decision & Implementation

### 4.1 Brand Simplification: `SwissRelief` (Pan-Swiss 2.6)
* **Adopted Name:** `SwissRelief`
* **Badge / Version:** `PAN-SWISS 2.6`
* **Tagline:** « Barèmes sociaux, Logement & Emploi dans les 26 cantons »
* Reduces header footprint from 44 characters to 11 characters, eliminating responsive wrapping defects.

### 4.2 DOM Hierarchy Extraction & Stacking Isolation
1. **Drawer Extraction:**
   Extracted `.mobile-drawer-overlay` from inside `.nav-wrap` directly into `App` root level (or React Portal targetting `document.body`), with CSS:
   ```css
   .mobile-drawer-overlay {
     position: fixed;
     inset: 0;
     width: 100vw;
     height: 100dvh;
     z-index: 99999;
     background: rgba(4, 7, 13, 0.88);
     backdrop-filter: blur(16px);
     display: flex;
     justify-content: flex-end;
   }
   ```
2. **Elimination of `backdrop-filter` on `.nav-wrap`:**
   Removed `backdrop-filter` from `.nav-wrap` and consolidated glassmorphism onto `.nav` and `.service-banner` directly, preventing accidental containing block creation.
3. **Explicit Stacking Stratification:**
   - `.nav`: `position: relative; z-index: 1000;`
   - `.lang-dropdown-container`: `position: relative; z-index: 1001;`
   - `.lang-dropdown-menu`: `position: absolute; z-index: 1100;`
   - `.service-banner`: `position: relative; z-index: 10;`
4. **Adaptive Language Selector Separation:**
   - On mobile screens (`< 768px`), the header dropdown is hidden (`display: none`). Language switching is accomplished via a tactile 2×2 grid (`FR` | `DE` | `IT` | `UK`) inside the full-screen sandwich drawer.
   - On desktop screens (`≥ 768px`), the top dropdown menu is active and isolated above `.service-banner`.

### 4.3 Responsive `stellen-alert` Flex Direction
Updated `.stellen-alert` to `flex-direction: column; align-items: flex-start; gap: 8px;` on screens under 768px, preventing badge squashing and text truncation.

---

## 5. Consequences & Verification

* **Positive:**
  - Drawer opens smoothly across 100% of viewport height on all mobile devices.
  - Language menu never overlaps with or clips beneath service chips.
  - Clean brand mark and short name create an uncluttered, professional aesthetic.
  - Zero layout regressions across desktop and mobile test runners.
* **Negative:**
  - Requires build-time bundling synchronization via `build.cjs`.
