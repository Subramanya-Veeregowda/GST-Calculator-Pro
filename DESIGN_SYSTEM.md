# GST Calculator Pro — Design System

> **Version:** 1.1.0  
> **Date:** 2026-06-21  
> **Status:** ✅ Ready for Implementation Approval  
> **Source of Truth:** UI Screenshots + v0.app Reference  
> **Author:** Subramanya V — subramanyav2002@gmail.com  
> **Built for:** Digital Heroes — https://digitalheroesco.com

---

## Table of Contents

1. [Visual Design Philosophy](#1-visual-design-philosophy)
2. [Color Palette](#2-color-palette)
3. [Typography Scale](#3-typography-scale)
4. [Spacing System](#4-spacing-system)
5. [Component Inventory](#5-component-inventory)
6. [Navigation Design](#6-navigation-design)
7. [Mobile Layout Specification](#7-mobile-layout-specification)
8. [Tablet Layout Specification](#8-tablet-layout-specification)
9. [Desktop Layout Specification](#9-desktop-layout-specification)
10. [GST Calculator UI Specification](#10-gst-calculator-ui-specification)
11. [Invoice Generator UI Specification](#11-invoice-generator-ui-specification)
12. [Invoice PDF Visual Specification](#12-invoice-pdf-visual-specification)
13. [Animation Guidelines](#13-animation-guidelines)
14. [Accessibility Guidelines](#14-accessibility-guidelines)
15. [Responsive Rules](#15-responsive-rules)

---

## 1. Visual Design Philosophy

### Core Aesthetic

The application follows a **premium dark SaaS aesthetic** inspired directly by the v0.app reference UI. The visual language is:

- **Dark-first:** Near-black deep charcoal backgrounds with layered surface elevations
- **Teal-accented:** A vibrant teal/cyan primary color (`#00D4AA`) creates the brand identity
- **Glassmorphism:** Frosted glass cards with subtle borders and backdrop blur
- **Minimal and focused:** Content-first layout with generous whitespace
- **Professional:** Typography-driven hierarchy, not decoration-driven

### Design DNA (from screenshots)

```
Background:  Very dark charcoal / near-black (not pure #000000)
Surface:     Slightly elevated dark panels with subtle borders
Accent:      Vibrant teal-cyan (#00D4AA family)
Text:        Off-white primary, muted gray secondary
Cards:       Dark panels with 1px teal-tinted border, slight glass effect
Buttons:     Teal filled (primary) | Ghost outlined (secondary)
Badge/Tags:  Small teal pill labels above section headings
```

### Light Theme

The light theme is a full-contrast inversion:
- Background: Near-white `#F8FAFC`
- Surface: White `#FFFFFF` with light gray border
- Accent: Same teal `#00D4AA` (unchanged)
- Text: Near-black `#0F172A`

---

## 2. Color Palette

### 2.1 Primary Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#00D4AA` | CTA buttons, active states, highlights, "Pro" text |
| `--color-primary-hover` | `#00BFA0` | Button hover state |
| `--color-primary-muted` | `#00D4AA1A` | Teal tint backgrounds, badge fills |
| `--color-primary-border` | `#00D4AA33` | Teal-tinted card borders |

### 2.2 Dark Theme (Default)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-base` | `#0A0F0D` | Page background (very dark, slight green tint) |
| `--color-bg-surface` | `#111816` | Card backgrounds, panel surfaces |
| `--color-bg-elevated` | `#1A2320` | Elevated cards, input backgrounds |
| `--color-bg-overlay` | `#1F2D2A` | Modals, dropdowns, tooltips |
| `--color-border` | `#1E2D2A` | Default card borders |
| `--color-border-teal` | `#00D4AA2E` | Teal-accent borders (active cards, focused inputs) |
| `--color-border-subtle` | `#FFFFFF0A` | Subtle dividers |

### 2.3 Text Colors (Dark Theme)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-primary` | `#F0FDF9` | Main headings, primary body text |
| `--color-text-secondary` | `#94A3B8` | Subheadings, descriptions, placeholders |
| `--color-text-muted` | `#64748B` | Labels, captions, disabled text |
| `--color-text-accent` | `#00D4AA` | Highlighted values, amounts, links |
| `--color-text-inverse` | `#0A0F0D` | Text on teal buttons |

### 2.4 Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#10B981` | Success states, positive values |
| `--color-warning` | `#F59E0B` | Warnings, due dates |
| `--color-error` | `#EF4444` | Errors, destructive actions |
| `--color-info` | `#3B82F6` | Info states, links |

### 2.5 Light Theme Overrides

| Token | Light Hex | Notes |
|-------|-----------|-------|
| `--color-bg-base` | `#F8FAFC` | Near-white page background |
| `--color-bg-surface` | `#FFFFFF` | White card backgrounds |
| `--color-bg-elevated` | `#F1F5F9` | Elevated inputs, panels |
| `--color-border` | `#E2E8F0` | Light gray borders |
| `--color-text-primary` | `#0F172A` | Near-black headings |
| `--color-text-secondary` | `#475569` | Slate secondary text |
| `--color-text-muted` | `#94A3B8` | Light muted text |

### 2.6 Gradient Palette

```css
/* Hero gradient — used behind headline */
--gradient-hero: radial-gradient(ellipse 80% 50% at 50% -20%, #00D4AA18, transparent);

/* Card glow — teal glow on active/hover card */
--gradient-card-glow: linear-gradient(135deg, #00D4AA0D 0%, transparent 50%);

/* Button fill */
--gradient-button: linear-gradient(135deg, #00D4AA, #00BFA0);

/* Result display panel */
--gradient-result: linear-gradient(135deg, #00D4AA15, #1A2320);

/* Footer gradient */
--gradient-footer: linear-gradient(to top, #00D4AA08, transparent);
```

---

## 3. Typography Scale

### 3.1 Font Family

```css
/* Primary: Inter — clean, professional, modern */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;

/* Monospace: JetBrains Mono — for amounts, invoice numbers, calculations */
--font-mono: 'JetBrains Mono', 'Roboto Mono', monospace;
```

**Google Fonts import:**
```
Inter: 300, 400, 500, 600, 700, 800
JetBrains Mono: 400, 500, 600
```

### 3.2 Type Scale

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `--text-xs` | 11px | 1.4 | 400 | Captions, fine print, timestamps |
| `--text-sm` | 13px | 1.5 | 400 | Labels, secondary body, form hints |
| `--text-base` | 15px | 1.6 | 400 | Primary body text, descriptions |
| `--text-lg` | 18px | 1.5 | 500 | Card titles, section subtitles |
| `--text-xl` | 22px | 1.4 | 600 | Page section headings |
| `--text-2xl` | 28px | 1.3 | 700 | Section hero headings |
| `--text-3xl` | 36px | 1.2 | 700 | Feature headings |
| `--text-4xl` | 48px | 1.1 | 800 | Main hero headline |
| `--text-5xl` | 60px | 1.0 | 800 | Large desktop hero |

### 3.3 Specific Element Styles (from screenshots)

#### Hero Headline (from screenshot)
```
"GST Calculator Pro"
Font: Inter 800
Size: 48px mobile → 60px desktop
Color: #F0FDF9 (white) with "Pro" in #00D4AA (teal)
Letter-spacing: -0.02em
Line-height: 1.1
```

#### Section Badge Labels
```
"GST CALCULATOR" / "INVOICE GENERATOR" / "FEATURES"
Font: Inter 600
Size: 11px
Color: #00D4AA
Letter-spacing: 0.12em (wide tracking)
Text-transform: UPPERCASE
Background: #00D4AA1A
Padding: 4px 12px
Border-radius: 100px (pill)
Border: 1px solid #00D4AA33
```

#### Section Headings
```
"Calculate GST in seconds"
"Create professional invoices"
Font: Inter 700
Size: 32px mobile → 40px desktop
Color: #F0FDF9
Letter-spacing: -0.01em
```

#### Amount Display (Result Card)
```
"₹11,800.00"
Font: JetBrains Mono 700
Size: 36px mobile → 48px desktop
Color: #00D4AA
Letter-spacing: -0.02em
```

#### Amount in Words
```
"Eleven Thousand Eight Hundred Rupees Only"
Font: Inter 400 italic
Size: 13px
Color: #94A3B8
```

#### Navigation Links
```
Font: Inter 500
Size: 14px
Color: #94A3B8 (default) → #F0FDF9 (hover) → #00D4AA (active)
```

---

## 4. Spacing System

### 4.1 Base Grid

- **Base unit:** 4px
- **Primary scale unit:** 8px
- **Grid system:** 12-column on desktop, 4-column on mobile

### 4.2 Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight icon padding |
| `--space-2` | 8px | Inline spacing, icon gaps |
| `--space-3` | 12px | Small component padding |
| `--space-4` | 16px | Standard padding, form gaps |
| `--space-5` | 20px | Card internal padding (mobile) |
| `--space-6` | 24px | Card internal padding (desktop) |
| `--space-8` | 32px | Section inner margins |
| `--space-10` | 40px | Between components |
| `--space-12` | 48px | Between page sections |
| `--space-16` | 64px | Major section breaks |
| `--space-20` | 80px | Hero padding |
| `--space-24` | 96px | Section padding (desktop) |

### 4.3 Layout Widths

| Token | Value | Usage |
|-------|-------|-------|
| `--max-width-sm` | 540px | Modals, small forms |
| `--max-width-md` | 768px | Content pages |
| `--max-width-lg` | 1024px | App layout |
| `--max-width-xl` | 1280px | Wide content |
| `--max-width-content` | 1200px | Primary content container |

### 4.4 Border Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Badges, tags, small elements |
| `--radius-md` | 10px | Buttons, inputs |
| `--radius-lg` | 14px | Cards, panels |
| `--radius-xl` | 20px | Large cards, modals |
| `--radius-full` | 9999px | Pills, avatar, toggle |

---

## 5. Component Inventory

### 5.1 Card Component

**Dark Card (default):**
```
Background:    var(--color-bg-surface) = #111816
Border:        1px solid #1E2D2A
Border-radius: 14px
Padding:       24px (desktop) / 20px (mobile)
Box-shadow:    0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,170,0.05)

Hover state:
  Border:      1px solid #00D4AA33
  Box-shadow:  0 4px 24px rgba(0,212,170,0.08)
  Transform:   translateY(-1px)
  Transition:  all 200ms ease
```

**Glass Card (elevated):**
```
Background:    rgba(17, 24, 22, 0.8)
Backdrop-filter: blur(12px)
Border:        1px solid rgba(0,212,170,0.15)
Border-radius: 16px
Box-shadow:    0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)
```

**Result Panel (special — used for calc output):**
```
Background:    linear-gradient(135deg, #00D4AA0D, #1A2320)
Border:        1px solid #00D4AA33
Border-radius: 14px
Padding:       24px
```

### 5.2 Button Components

**Primary Button (Teal filled — "Calculate", "Generate Invoice"):**
```
Background:    #00D4AA
Color:         #0A0F0D (dark text on teal)
Font:          Inter 600, 14px
Padding:       10px 24px (standard) / 12px 32px (large)
Border-radius: 10px
Border:        none
Box-shadow:    0 0 0 0 #00D4AA40

Hover:
  Background:  #00BFA0
  Box-shadow:  0 0 20px rgba(0,212,170,0.3)
  Transform:   translateY(-1px)

Active:
  Transform:   translateY(0)
  Box-shadow:  none

Disabled:
  Opacity:     0.4
  Cursor:      not-allowed
```

**Hero CTA Button ("Calculate GST ↓"):**
```
Background:    #00D4AA
Color:         #0A0F0D
Font:          Inter 600, 16px
Padding:       14px 28px
Border-radius: 10px
Has arrow icon →
```

**Secondary Button ("Generate Invoice" — Ghost style):**
```
Background:    transparent
Color:         #F0FDF9
Font:          Inter 600, 16px
Padding:       14px 28px
Border:        1px solid #FFFFFF20
Border-radius: 10px

Hover:
  Background:  #FFFFFF0A
  Border:      1px solid #FFFFFF40
```

**Icon Button (Reset, Copy):**
```
Background:    transparent
Color:         #94A3B8
Padding:       8px
Border:        1px solid #1E2D2A
Border-radius: 8px
Size:          36px × 36px

Hover:
  Background:  #1A2320
  Color:       #F0FDF9
```

**"Built for Digital Heroes" Button:**
```
Background:    linear-gradient(135deg, #00D4AA, #00BFA0)
Color:         #0A0F0D
Font:          Inter 700, 14px
Padding:       10px 20px
Border-radius: 10px
Box-shadow:    0 4px 16px rgba(0,212,170,0.35)
Has ✦ or ⚡ icon prefix

Hover:
  Box-shadow:  0 6px 24px rgba(0,212,170,0.5)
  Transform:   translateY(-2px)
```

### 5.3 Input Components

**Text Input:**
```
Background:    #1A2320
Border:        1px solid #1E2D2A
Color:         #F0FDF9
Font:          Inter 400, 15px
Padding:       12px 16px
Border-radius: 10px
Placeholder:   #64748B

Focus:
  Border:      1px solid #00D4AA
  Box-shadow:  0 0 0 3px rgba(0,212,170,0.12)
  Outline:     none

Error:
  Border:      1px solid #EF4444
  Box-shadow:  0 0 0 3px rgba(239,68,68,0.12)
```

**Number Input (Amount field — from calculator screenshot):**
```
Background:    #1A2320
Border:        1px solid #00D4AA33 (teal accent when focused)
Color:         #F0FDF9
Font:          JetBrains Mono 500, 20px
Padding:       14px 16px
Border-radius: 10px
Placeholder:   "0.00"
Has ₹ prefix icon
```

**Label style:**
```
Font:    Inter 500, 13px
Color:   #94A3B8
Margin-bottom: 6px
```

### 5.4 GST Rate Selector (Pill Tabs)

From calculator screenshot — horizontal pill tab group:
```
Container:
  Background:    #1A2320
  Border:        1px solid #1E2D2A
  Border-radius: 10px
  Padding:       4px
  Display:       flex, gap: 2px

Each Rate Pill:
  Font:          Inter 600, 13px
  Padding:       8px 16px
  Border-radius: 8px
  Color:         #64748B (inactive)

Active Pill:
  Background:    #00D4AA
  Color:         #0A0F0D
  Box-shadow:    0 2px 8px rgba(0,212,170,0.3)

Rates shown: 0% | 5% | 12% | 18% | 28%
```

### 5.5 Toggle / Switch

**Calculation Mode Toggle ("Add GST" vs "Remove GST"):**
```
Container:
  Display:       flex
  Background:    #1A2320
  Border:        1px solid #1E2D2A
  Border-radius: 10px
  Padding:       4px

Each Option:
  Font:          Inter 600, 13px
  Padding:       8px 20px
  Border-radius: 8px
  Color:         #64748B (inactive)

Active Option:
  Background:    #00D4AA
  Color:         #0A0F0D
  Transition:    all 200ms ease
```

### 5.6 Result/Breakdown Display Cards

**Amount Breakdown Row:**
```
Layout:        flex, space-between
Label:         Inter 400, 13px, color #94A3B8
Value:         JetBrains Mono 600, 15px, color #F0FDF9

Highlighted row (Total):
  Label:       Inter 700, 16px, color #F0FDF9
  Value:       JetBrains Mono 700, 32px, color #00D4AA
  Background:  #00D4AA0A
  Border:      1px solid #00D4AA22
  Padding:     16px
  Border-radius: 10px
```

**CGST/SGST Split Row:**
```
Color:  #94A3B8 (muted, secondary info)
Font:   Inter 400, 13px
Value:  JetBrains Mono 500, 13px, color #64748B
```

### 5.7 Badge/Tag Component

**Section Label Badge:**
```
Background:    #00D4AA1A
Border:        1px solid #00D4AA33
Color:         #00D4AA
Font:          Inter 600, 11px
Letter-spacing: 0.12em
Padding:       4px 12px
Border-radius: 100px
Text-transform: uppercase
Display:       inline-flex
```

### 5.8 Table Component (Invoice Line Items)

```
Header Row:
  Background:    #111816
  Font:          Inter 600, 12px
  Color:         #64748B
  Letter-spacing: 0.06em
  Text-transform: uppercase
  Padding:       10px 16px

Data Row:
  Background:    transparent
  Border-bottom: 1px solid #1E2D2A
  Font:          Inter 400, 14px
  Color:         #F0FDF9
  Padding:       12px 16px

  Hover:
    Background:  #1A2320

Last Row (Totals):
  Background:    #111816
  Font:          Inter 600, 14px
  Border-top:    1px solid #1E2D2A
```

### 5.9 Modal/Dialog Component

```
Overlay:       rgba(0,0,0,0.7) with backdrop-blur(4px)
Modal:
  Background:  #111816
  Border:      1px solid #1E2D2A
  Border-radius: 20px
  Padding:     32px
  Max-width:   480px (sm) / 640px (md)
  Box-shadow:  0 24px 64px rgba(0,0,0,0.5)

Animation:
  Enter: scale(0.96) → scale(1) + opacity(0) → opacity(1)
  Duration: 200ms ease-out
```

### 5.10 Toast/Notification

```
Position:      Fixed, bottom-right (desktop) / bottom-center (mobile)
Background:    #1A2320
Border:        1px solid #1E2D2A
Border-radius: 12px
Padding:       14px 18px
Font:          Inter 500, 14px
Box-shadow:    0 8px 32px rgba(0,0,0,0.4)

Success:       Left border 3px solid #10B981
Error:         Left border 3px solid #EF4444
Info:          Left border 3px solid #00D4AA

Animation:
  Enter: translateY(100%) → translateY(0), duration 300ms
  Exit:  translateY(0) → translateY(120%), duration 250ms
```

### 5.11 Empty State Component

```
Container:
  Text-align:  center
  Padding:     64px 24px
  
Icon:          48px, color #1E2D2A (very muted)
Heading:       Inter 600, 18px, color #64748B
Body:          Inter 400, 14px, color #475569
CTA:           Primary button (optional)
```

### 5.12 Avatar Component

```
Size:          36px (nav) / 48px (profile)
Background:    linear-gradient(135deg, #00D4AA, #00BFA0)
Color:         #0A0F0D
Font:          Inter 700, 14px (initials)
Border-radius: 50%
```

### 5.13 Stats Row (Hero Section)

From hero screenshot — 3 stats displayed below hero CTAs:
```
Stats: "4+ GST Rates" | "100% Free Forever" | "PDF Invoice Export"

Each Stat:
  Icon:        16px teal checkmark ✓ or similar
  Font:        Inter 500, 13px
  Color:       #94A3B8
  Icon-color:  #00D4AA
  
Layout:        flex, gap: 24px, centered
```

---

## 6. Navigation Design

### 6.1 Top Navigation Bar (Desktop + Tablet)

**From screenshots — horizontal top nav:**

```
Container:
  Position:      sticky, top: 0
  Height:        64px
  Background:    rgba(10, 15, 13, 0.85)
  Backdrop-filter: blur(16px)
  Border-bottom: 1px solid #1E2D2A
  Z-index:       100

Layout:          flex, align-center, justify-space-between
Padding:         0 24px (tablet) / 0 48px (desktop)
Max-width:       1200px, centered
```

**Left section:**
```
Logo:
  Icon:   Teal "G" or calculator icon in teal circle
  Text:   "GST Calculator" + "Pro" (teal)
  Font:   Inter 700, 18px
  Color:  #F0FDF9 with "Pro" in #00D4AA
```

**Center section (nav links — from screenshot):**
```
Links: Calculator | Invoice | History | Features | About

Each Link:
  Font:          Inter 500, 14px
  Color:         #94A3B8 (default)
  Padding:       8px 16px
  Border-radius: 8px
  Gap between:   4px

  Hover:
    Color:       #F0FDF9
    Background:  #FFFFFF08

  Active:
    Color:       #00D4AA
    Background:  #00D4AA12
```

**Right section:**
```
Theme toggle:    Moon/Sun icon button (36×36px)
```

### 6.2 Mobile Bottom Navigation

**From screenshots — fixed bottom nav bar:**

```
Container:
  Position:      fixed, bottom: 0, left: 0, right: 0
  Height:        64px + safe-area-inset-bottom
  Background:    rgba(10, 15, 13, 0.92)
  Backdrop-filter: blur(20px)
  Border-top:    1px solid #1E2D2A
  Z-index:       100
  Padding-bottom: env(safe-area-inset-bottom)

Layout:          grid, 4 columns, even width

Tabs: Calculator | Invoice | History | Settings
```

**Each Tab Item:**
```
Layout:          flex-column, align-center, gap: 2px
Padding:         8px 0

Icon:            24px Lucide icon
Icon-color:      #64748B (inactive) → #00D4AA (active)
Label:           Inter 500, 11px
Label-color:     #64748B (inactive) → #00D4AA (active)

Active Indicator:
  Position:      absolute, top: 0
  Width:         24px
  Height:        2px
  Background:    #00D4AA
  Border-radius: 0 0 2px 2px
```

### 6.3 Sidebar Navigation (Tablet Collapsed / Desktop Full)

**Tablet (collapsed sidebar — icon-only rail):**
```
Width:           64px
Position:        fixed, left: 0, top: 0, bottom: 0
Background:      rgba(10, 15, 13, 0.95)
Border-right:    1px solid #1E2D2A
Backdrop-filter: blur(16px)

Icon size:       22px
Icon-color:      #64748B → #00D4AA (active)
Active:          teal dot indicator OR teal background pill
Padding:         12px 8px per icon
```

**Desktop (full sidebar with labels):**
```
Width:           240px
Logo section:    Height 64px, padding 0 20px
Nav section:     Padding 16px 12px, gap 4px between items

Each Item:
  Layout:        flex, align-center, gap: 12px
  Height:        44px
  Padding:       0 12px
  Border-radius: 10px
  Icon:          20px
  Font:          Inter 500, 14px
  Color:         #94A3B8 (default)

  Active:
    Background:  #00D4AA18
    Color:       #00D4AA
    Icon-color:  #00D4AA

  Hover:
    Background:  #FFFFFF08
    Color:       #F0FDF9
```

---

## 7. Mobile Layout Specification

### 7.1 Viewport Targets

| Device | Viewport | Priority |
|--------|----------|----------|
| Small Android | 360×640 | P0 |
| iPhone SE | 375×667 | P0 |
| iPhone 14 / 15 | 390×844 | P0 |
| Small landscape | 640×360 | P1 |
| Large landscape | 844×390 | P1 |

### 7.2 Mobile Shell Structure

```
┌─────────────────────────────┐
│  [Status Bar — system]      │  env(safe-area-inset-top)
├─────────────────────────────┤
│  Page Title + Right Action  │  48px TopBar (mobile-only)
├─────────────────────────────┤
│                             │
│                             │
│      Page Content           │  flex: 1, overflow-y: auto
│      (scrollable)           │  padding: 0 16px 80px
│                             │
│                             │
├─────────────────────────────┤
│  Bottom Navigation          │  64px + safe-area-inset-bottom
│  [Calc] [Invoice] [Hist] [⚙]│
└─────────────────────────────┘
```

### 7.3 Mobile TopBar

```
Height:        48px
Padding:       0 16px
Background:    transparent (content below shows through)
Layout:        flex, space-between, align-center

Left:          Page title (Inter 600, 18px, #F0FDF9)
Right:         Theme toggle icon (28×28px)
```

### 7.4 Mobile Card Layout

```
Full-width:    width: 100%, no side margin
Card padding:  20px
Border-radius: 14px
Gap between cards: 12px
Section gap:   24px
```

### 7.5 Mobile Content Rules

- Single column layout for all content
- Full-width inputs and buttons
- Horizontal scroll for pill tabs (GST rates)
- Bottom sheet modals instead of centered modals
- Swipe-friendly list items (minimum 48px touch target)
- No hover-dependent interactions (use tap/press states)

### 7.6 Safe Area Support

```css
/* Applied to BottomNav */
padding-bottom: env(safe-area-inset-bottom);

/* Applied to page root */
padding-top: env(safe-area-inset-top);

/* Applied to page content */
padding-bottom: calc(64px + env(safe-area-inset-bottom));
```

---

## 8. Tablet Layout Specification

### 8.1 Viewport Targets

| Device | Viewport |
|--------|----------|
| iPad / Android Tablet | 768×1024 |

### 8.2 Tablet Shell Structure

```
┌──────────┬──────────────────────────────────┐
│          │  TopBar (64px)                    │
│  Icon    ├──────────────────────────────────┤
│  Rail    │                                  │
│  (64px)  │  Page Content                    │
│          │  (padding: 24px)                 │
│ [Calc]   │                                  │
│ [Inv]    │  Two-column grid for calc         │
│ [Hist]   │  Full-width for invoice form      │
│ [Set]    │                                  │
│          │                                  │
└──────────┴──────────────────────────────────┘
```

### 8.3 Tablet Grid

- Sidebar: 64px icon rail
- Content: `calc(100vw - 64px)`
- Two-column grid: `repeat(2, 1fr)`, gap: 20px
- Card padding: 24px

---

## 9. Desktop Layout Specification

### 9.1 Viewport Targets

| Screen | Width |
|--------|-------|
| Laptop | 1280px |
| Desktop | 1440px |
| Large | 1920px |

### 9.2 Desktop Shell Structure (App pages)

```
┌─────────────────────────────────────────────────────────┐
│  Full-width TopBar with logo + nav links                │  64px
├──────────────────┬──────────────────────────────────────┤
│                  │                                      │
│   Sidebar        │   Main Content Area                  │
│   (240px)        │   max-width: 1200px                  │
│                  │   padding: 32px                      │
│   Logo           │                                      │
│   ───────        │   Two or three-column layout         │
│   Calculator     │   based on page context              │
│   Invoice        │                                      │
│   History        │                                      │
│   Settings       │                                      │
│                  │                                      │
│   ───────        │                                      │
│   DH Button      │                                      │
│                  │                                      │
└──────────────────┴──────────────────────────────────────┘
│  Footer (full-width)                                    │
└─────────────────────────────────────────────────────────┘
```

### 9.3 Desktop Grid System

**Calculator Page:**
```
Layout: Two columns
Left:   Input panel (40% width)
Right:  Result panel (60% width)
Gap:    24px
```

**Invoice Page:**
```
Layout: Two columns
Left:   Form panel (55% width)
Right:  Invoice Preview panel (45% width)
Gap:    24px
```

**History Page:**
```
Layout: Full-width with tabs
List:   Table view with sortable columns
```

**Settings Page:**
```
Layout: Two columns
Left:   Navigation/category list (240px)
Right:  Settings content
```

### 9.4 Landing/Home Page (Desktop)

The landing page matches the reference screenshot with:

```
Hero Section:
  Max-width:    1200px, centered
  Padding:      120px 48px
  Text-align:   center
  Badge → H1 → Subtitle → CTA Buttons → Stats

Calculator Section:
  Max-width:    900px, centered
  Two columns:  Input card (left) + Result card (right)

Invoice Section:
  Max-width:    1100px, centered
  Two columns:  Form (left) + Preview (right)

History Section:
  Max-width:    900px, centered
  Full-width card with tabs

Features Section:
  Max-width:    1100px, centered
  3-column grid of feature cards

CTA Section:
  Full-width with centered text + button

Footer:
  Max-width:    1200px, centered
  3-4 columns
```

---

## 10. GST Calculator UI Specification

### 10.1 Page Layout (from calculator screenshot)

```
Section Badge:  "GST CALCULATOR" (teal pill)
Heading:        "Calculate GST in seconds"
Subtext:        "Add or extract GST on any amount. Switch between exclusive and inclusive modes for accurate results every time."

Content Card:
  Layout:       Two columns (input left, result right) on desktop
                Single column on mobile

Left Panel — Inputs:
  1. Amount field
  2. GST Rate selector (pill tabs)
  3. Calculation Mode toggle
  4. Action buttons

Right Panel — Results:
  Result display card
```

### 10.2 Input Panel Specification

**Amount Field:**
```
Label:         "Amount"
Placeholder:   "0 1000" or "Enter amount"
Type:          number, min=0
Icon:          ₹ symbol (left padding)
Style:         Large number input (JetBrains Mono)
Validation:    Numeric only, max 2 decimal places
```

**GST Rate Selector:**
```
Label:         "GST Rate"
Type:          Pill tab group (horizontal)
Options:       0% | 5% | 12% | 18% | 28%
Default:       18%
Style:         Active pill = teal filled
               Inactive = dark surface
```

**Calculation Mode Toggle:**
```
Label:         "Calculation mode"
Options:       
  "Add GST"   → Exclusive mode (add GST on top of amount)
  "Remove GST" → Inclusive mode (extract GST from total)
Default:       "Add GST"
Style:         Segmented toggle (same as rate selector)
```

**Action Buttons Row:**
```
Primary:   "Calculate" button (full-width, teal, with ⚡ icon)
Secondary: "Reset" button (ghost, icon only or icon+text)
Tertiary:  "Copy" button (ghost, icon only or icon+text)

Mobile: Stack vertically, full-width Calculate, inline Reset+Copy
Desktop: Horizontal row
```

### 10.3 Result Panel Specification

**Result Card — from screenshot:**
```
Background:    gradient (#00D4AA0D → #1A2320)
Border:        1px solid #00D4AA33

Content rows:
  Amount Before GST:   Label (sm) + Value (mono, md)  →  right-aligned
  GST Amount (18%):    Label (sm) + Value (mono, md, teal)  →  right-aligned

  Divider line

  Total Amount:        
    Label:    "₹" + big amount (JetBrains Mono 700, 36-48px, teal)
    Full-width, center-aligned on mobile

  Amount in Words:
    Font: Inter 400 italic, 13px
    Color: #94A3B8
    Text: "Eleven Thousand Eight Hundred Rupees Only"

  If CGST+SGST mode:
    CGST (9%): value
    SGST (9%): value
  
  If IGST mode:
    IGST (18%): value
```

### 10.4 Tax Type Indicator

```
Small toggle or info pills:
  "CGST + SGST" (intra-state)
  "IGST" (inter-state)
  
Style: text button or small segmented control below result
Color: #94A3B8, active: #00D4AA
```

---

## 11. Invoice Generator UI Specification

### 11.1 Page Layout (from invoice screenshot)

```
Section Badge:  "INVOICE GENERATOR"
Heading:        "Create professional invoices"
Subtext:        "Fill in the details, preview your totals live, and export a clean, GST-compliant PDF invoice in one click."

Content Layout:
  Two columns (desktop): Form (left) + Preview (right)
  Single column (mobile): Form → Preview below
```

### 11.2 Invoice Form Panel

**Customer Information Section:**
```
Customer Name*        [text input]   placeholder: "Acme Pvt. Ltd."
Invoice Number        [text input]   auto: "INV-YYYYMM-XXX", editable
Date                  [date input]   default: today
```

**Product/Service Section:**
```
Product / Service*    [text input]   placeholder: "Web design services"
Quantity              [number input] default: 1
Unit Price (₹)        [number input] default: 0.00
GST Rate              [select/pills] per-line: 0% / 5% / 12% / 18% / 28%

[+ Add Item] button   → ghost, teal text, adds new row
```

**Line Items Table (multi-item mode):**
```
Columns: # | Description | Qty | Rate | GST% | Amount | [✕]

Each row has its own GST rate selector
Last row: [+ Add Another Item]
```

**Tax Type Selection:**
```
"Tax Type:  [CGST + SGST ▾] or [IGST ▾]"
Small segmented or select component
```

**Notes / Terms:**
```
Notes [textarea]    optional, placeholder: "Payment due within 30 days"
```

**Download Button:**
```
"⬇ Download PDF"   — full-width primary teal button
"💾 Save Invoice"  — secondary ghost button
```

### 11.3 Invoice Preview Panel

**From screenshots — Live preview card on the right:**
```
Background:    #111816
Border:        1px solid #1E2D2A
Border-radius: 14px
Padding:       20px

Header:
  Title:        "Invoice Preview"
  Badge:        Invoice number "INV-202506-2428"

Live preview rows:
  Billed To:    [Customer name or "—"]
  Date:         [Selected date]
  Item:         [Product name or "—"]
  Qty × Price:  "1 × ₹0.00"
  
  Divider

  Subtotal:     "₹0.00"
  GST (18%):    "₹0.00"
  
  Grand Total:
    Background: #00D4AA15
    Border:     1px solid #00D4AA33
    Color:      #00D4AA
    Font:       JetBrains Mono 700, 20px
    Value:      "₹0.00"
```

---

## 12. Invoice PDF Visual Specification

### 12.1 PDF Page Setup

```
Page Size:     A4 (210mm × 297mm)
Margins:       Top: 15mm, Right: 15mm, Bottom: 15mm, Left: 15mm
Font:          Helvetica (jsPDF built-in)
Color Mode:    RGB
```

### 12.2 PDF Header Section

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  [Business Name]                   TAX INVOICE   │
│  Business Address                                │
│  Phone: XXXXXXXXXX                 Invoice No:   │
│  Email: email@business.com         INV-202506-001│
│  GSTIN: 29XXXXX                    Date: 21/06/26│
│                                    Due: 21/07/26 │
│                                                  │
└──────────────────────────────────────────────────┘

Business Name: Bold, 16px
"TAX INVOICE":  Bold, 18px, teal color (#00D4AA)
Address block:  Regular, 10px, gray
Invoice details: Right-aligned, 10px
```

### 12.3 Customer (Bill To) Section

```
┌──────────────────────────────────────────────────┐
│  Bill To:                                        │
│  [Customer Name]                                 │
│  [Customer Address]                              │
│  GSTIN: [Customer GSTIN or blank]                │
└──────────────────────────────────────────────────┘

"Bill To:" Bold, 10px, teal
Content: Regular, 10px
Section has light gray background fill
```

### 12.4 Line Items Table

```
Columns: # | Description | HSN/SAC | Qty | Unit Price | GST Rate | Amount

Header row:
  Background:  #1A2320 (dark — jsPDF fillColor equivalent)
  Font:        Bold, 10px
  Color:       White
  Padding:     8px per cell

Data rows:
  Alternating: white / very light gray (#F9FAFB)
  Font:        Regular, 10px
  Padding:     7px per cell

Column widths (A4):
  #:           8mm
  Description: 55mm
  HSN/SAC:     20mm (optional)
  Qty:         15mm
  Unit Price:  25mm
  GST%:        15mm
  Amount:      25mm (right-aligned)
```

### 12.5 Totals Section

```
┌──────────────────────────────────────────────────┐
│                      Subtotal:   ₹ 1,000.00      │
│                      CGST (9%):  ₹   90.00       │
│                      SGST (9%):  ₹   90.00       │
│              ─────────────────────────────        │
│                    Grand Total:  ₹ 1,180.00      │
└──────────────────────────────────────────────────┘

Grand Total row:
  Background:  Teal (#00D4AA) fill
  Color:       Dark (#0A0F0D)
  Font:        Bold, 12px
```

### 12.6 PDF Footer

```
─────────────────────────────────────────────────
Terms & Conditions:
Payment is due within 30 days of invoice date.
Please make payment to the bank account mentioned.

                    [Authorized Signature]
                    ______________________
                    [Business Name]

─────────────────────────────────────────────────
Generated by GST Calculator Pro | Built for Digital Heroes | digitalheroesco.com
Page 1 of 1
```

---

## 13. Animation Guidelines

### 13.1 Core Principles

- **Purposeful:** Every animation communicates state change, not decoration
- **Snappy:** Maximum duration 300ms for UI interactions
- **Consistent:** All animations use the same easing families

### 13.2 Easing Functions

```css
--ease-smooth:  cubic-bezier(0.4, 0, 0.2, 1)    /* General transitions */
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1) /* Bouncy appear effects */
--ease-sharp:   cubic-bezier(0.4, 0, 0.6, 1)     /* Quick dismissals */
--ease-out:     cubic-bezier(0, 0, 0.2, 1)        /* Enter animations */
--ease-in:      cubic-bezier(0.4, 0, 1, 1)        /* Exit animations */
```

### 13.3 Duration Scale

```css
--duration-fast:    100ms   /* Hover states, color changes */
--duration-normal:  200ms   /* Button presses, tab switches */
--duration-medium:  300ms   /* Card reveals, modal open */
--duration-slow:    400ms   /* Page transitions, complex reveals */
--duration-slower:  600ms   /* Count-up numbers, stagger effects */
```

### 13.4 Interaction Animations

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Button hover | `translateY(-1px)` + glow shadow | 150ms | `--ease-smooth` |
| Button active | `translateY(0)` | 100ms | `--ease-sharp` |
| Card hover | `translateY(-2px)` + border teal | 200ms | `--ease-smooth` |
| Pill tab switch | Background slides (position-based) | 200ms | `--ease-smooth` |
| Toggle switch | Background + text color | 200ms | `--ease-smooth` |
| Input focus | Ring appears, border changes | 150ms | `--ease-out` |

### 13.5 Page Transition

```css
/* Route-level page transition */
Enter: 
  opacity: 0 → 1
  transform: translateY(8px) → translateY(0)
  Duration: 300ms, ease-out
  
Exit:
  opacity: 1 → 0
  Duration: 200ms, ease-in
```

### 13.6 Content Reveal (Stagger)

```
Cards/items reveal on scroll-into-view:
  Each item: opacity(0) → opacity(1) + translateY(12px) → translateY(0)
  Stagger delay: 60ms per item
  Duration: 400ms
  Easing: --ease-out
```

### 13.7 Number Count-Up (Result Display)

```
When calculation result updates:
  Animate number from old value → new value
  Duration: 500ms
  Easing: ease-out
  Library: Custom requestAnimationFrame loop or CSS counter
```

### 13.8 Calculator Result Reveal

```
When result is calculated:
  1. Result card: opacity(0) + scale(0.98) → opacity(1) + scale(1)
  2. Numbers: count-up animation
  3. Amount in words: fade in after 200ms delay
  Duration: 300ms
```

### 13.9 Modal/Dialog Animations

```
Open:
  Overlay: opacity(0) → opacity(1), 200ms
  Modal: scale(0.96) + opacity(0) → scale(1) + opacity(1), 200ms, spring

Close:
  Modal: scale(1) → scale(0.96) + opacity(0), 150ms, ease-in
  Overlay: opacity(1) → opacity(0), 200ms
```

### 13.10 Toast Notifications

```
Enter (bottom):
  transform: translateY(100%) → translateY(0)
  opacity: 0 → 1
  Duration: 300ms, spring

Exit:
  transform: translateY(0) → translateY(120%)
  opacity: 1 → 0
  Duration: 250ms, ease-in
```

### 13.11 PWA Install Banner

```
Slide up from bottom:
  transform: translateY(100%) → translateY(0)
  Duration: 400ms, spring
```

### 13.12 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all transforms, keep opacity-only transitions */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 14. Accessibility Guidelines

### 14.1 Color Contrast Requirements

| Pair | Ratio | Standard |
|------|-------|---------|
| Primary text (#F0FDF9) on bg (#0A0F0D) | 19.5:1 | AAA ✅ |
| Secondary text (#94A3B8) on bg (#0A0F0D) | 5.4:1 | AA ✅ |
| Teal (#00D4AA) on dark (#111816) | 8.1:1 | AAA ✅ |
| Dark text (#0A0F0D) on teal (#00D4AA) | 11.2:1 | AAA ✅ |
| Muted text (#64748B) on bg (#0A0F0D) | 3.5:1 | AA Large ✅ |

### 14.2 Focus Management

```css
/* Visible focus ring — all interactive elements */
:focus-visible {
  outline: 2px solid #00D4AA;
  outline-offset: 2px;
  border-radius: inherit;
}

/* Remove default outline but keep for keyboard users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 14.3 Touch Target Sizes

- Minimum touch target: **44×44px** (mobile)
- Bottom nav items: **minimum 64px width × 64px height**
- Icon buttons: **minimum 44×44px** with padding
- List item rows: **minimum 48px height**

### 14.4 ARIA Requirements

```html
<!-- Navigation -->
<nav aria-label="Main navigation">
<nav aria-label="Bottom navigation">

<!-- Page regions -->
<main id="main-content">
<aside aria-label="Invoice preview">

<!-- Dynamic content -->
aria-live="polite"    → GST calculation results
aria-live="assertive" → Errors, form validation

<!-- Buttons -->
aria-label="Reset calculation"
aria-label="Copy result to clipboard"
aria-label="Download PDF invoice"
aria-label="Delete history record"

<!-- Form inputs -->
<label for="amount-input">Amount (₹)</label>
<input id="amount-input" aria-required="true" aria-describedby="amount-hint">
<div id="amount-hint">Enter the base amount in Indian Rupees</div>

<!-- Toggle/radio groups -->
role="group"
aria-label="Calculation Mode"
aria-checked="true/false" for active option
```

### 14.5 Keyboard Navigation

- Tab order follows visual reading order (left-to-right, top-to-bottom)
- All interactive elements reachable via Tab
- Escape key closes modals and dropdowns
- Enter/Space activates buttons and toggles
- Arrow keys navigate pill tab groups and rate selectors
- Skip-to-main-content link (visually hidden, first focusable element)

### 14.6 Screen Reader Announcements

```
When GST is calculated:
  Announce: "GST calculated. Total amount: ₹11,800. GST amount: ₹1,800."
  
When PDF is downloaded:
  Announce: "Invoice PDF downloaded successfully."
  
When item is deleted:
  Announce: "Invoice INV-202506-001 deleted."
```

### 14.7 Form Validation

- Inline error messages below invalid fields (not just color)
- Error message connected to input via `aria-describedby`
- Required fields marked with `*` and `aria-required="true"`
- Error summary at top of form on submit failure

---

## 15. Responsive Rules

### 15.1 Tailwind CSS v4 Breakpoint Configuration

```css
/* In tailwind.config.js / @theme layer */
@theme {
  --breakpoint-xs:  360px;    /* Small Android */
  --breakpoint-sm:  375px;    /* Standard mobile */
  --breakpoint-md:  768px;    /* Tablet */
  --breakpoint-lg:  1024px;   /* Laptop */
  --breakpoint-xl:  1280px;   /* Desktop */
  --breakpoint-2xl: 1440px;   /* Large desktop */
  --breakpoint-3xl: 1920px;   /* Ultra-wide */
}
```

### 15.2 Layout Rules by Breakpoint

| Breakpoint | Navigation | Columns | Card Padding | Font Scale |
|-----------|-----------|---------|-------------|------------|
| < 768px (mobile) | Bottom nav | 1 | 20px | 90% |
| 768–1023px (tablet) | Icon sidebar | 1–2 | 24px | 95% |
| 1024–1279px (laptop) | Full sidebar | 2 | 28px | 100% |
| 1280–1439px (desktop) | Full sidebar | 2–3 | 32px | 100% |
| 1440px+ (large) | Full sidebar | 2–3 | 32px | 110% |

### 15.3 Component Responsive Behavior

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Hero H1 | 36px | 48px | 60px |
| Calculator | Single column | Single column | Two column |
| Invoice form | Single column | Single column | Two column (60/40 split) |
| Invoice preview | Below form | Below form | Right panel |
| History list | Stacked cards | Table view | Table view |
| Feature grid | 1 column | 2 columns | 3 columns |
| CTA buttons | Stacked full-width | Inline | Inline |
| Bottom nav | Fixed bottom | Hidden | Hidden |
| Sidebar | Hidden | Icon rail | Full labels |

### 15.4 Typography Responsive Rules

```css
/* Hero headline */
font-size: clamp(32px, 5vw, 60px);
letter-spacing: -0.02em;

/* Section heading */
font-size: clamp(24px, 3vw, 40px);

/* Amount display */
font-size: clamp(28px, 4vw, 48px);

/* Body text */
font-size: clamp(14px, 1.5vw, 16px);
```

### 15.5 Image / Media Responsive Rules

- All images: `max-width: 100%`, `height: auto`
- Icons: vector SVG, scales cleanly
- PDF preview: hidden on mobile portrait, shown on landscape/tablet+

### 15.6 Landscape Mobile Handling

```
640×360 / 844×390:
  Navigation: Bottom nav (reduced height: 48px) OR hidden with hamburger
  Layout:     Two-column where space allows
  Font:       Reduced 90% scale
  Calculator: Input + result side by side if width >= 640px
```

### 15.7 Print Styles

```css
@media print {
  nav, .bottom-nav, .sidebar { display: none; }
  .card { box-shadow: none; border: 1px solid #ccc; }
  body { background: white; color: black; }
}
```

---

## Appendix: Tailwind CSS v4 Theme Tokens

```css
/* src/styles/index.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary:          #00D4AA;
  --color-primary-hover:    #00BFA0;
  --color-primary-muted:    rgba(0, 212, 170, 0.1);
  --color-primary-border:   rgba(0, 212, 170, 0.2);
  
  --color-bg-base:          #0A0F0D;
  --color-bg-surface:       #111816;
  --color-bg-elevated:      #1A2320;
  --color-bg-overlay:       #1F2D2A;
  
  --color-border:           #1E2D2A;
  --color-border-teal:      rgba(0, 212, 170, 0.18);
  --color-border-subtle:    rgba(255, 255, 255, 0.04);
  
  --color-text-primary:     #F0FDF9;
  --color-text-secondary:   #94A3B8;
  --color-text-muted:       #64748B;
  --color-text-accent:      #00D4AA;
  --color-text-inverse:     #0A0F0D;
  
  --color-success:          #10B981;
  --color-warning:          #F59E0B;
  --color-error:            #EF4444;
  
  /* Fonts */
  --font-sans:  'Inter', system-ui, sans-serif;
  --font-mono:  'JetBrains Mono', monospace;
  
  /* Spacing — 4px base unit */
  --spacing-1:   4px;
  --spacing-2:   8px;
  --spacing-3:   12px;
  --spacing-4:   16px;
  --spacing-5:   20px;
  --spacing-6:   24px;
  --spacing-8:   32px;
  --spacing-10:  40px;
  --spacing-12:  48px;
  --spacing-16:  64px;
  --spacing-20:  80px;
  
  /* Border radii */
  --radius-sm:   6px;
  --radius-md:   10px;
  --radius-lg:   14px;
  --radius-xl:   20px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-card:   0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,170,0.05);
  --shadow-hover:  0 4px 24px rgba(0,212,170,0.08);
  --shadow-glow:   0 0 20px rgba(0,212,170,0.3);
  --shadow-modal:  0 24px 64px rgba(0,0,0,0.5);
  
  /* Animations */
  --ease-smooth:   cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out:      cubic-bezier(0, 0, 0.2, 1);
  
  --duration-fast:   100ms;
  --duration-normal: 200ms;
  --duration-medium: 300ms;
  --duration-slow:   400ms;
}
```

---

## Appendix: Icon Library

**Library:** Lucide React (tree-shakeable, consistent stroke icons)

| Usage | Icon Name |
|-------|-----------|
| Calculator | `Calculator` |
| Invoice | `FileText` |
| History | `Clock` |
| Settings | `Settings` |
| Download PDF | `Download` |
| Copy | `Copy` |
| Reset | `RotateCcw` |
| Add item | `Plus` |
| Delete | `Trash2` |
| Rupee | `IndianRupee` |
| Theme toggle (dark) | `Moon` |
| Theme toggle (light) | `Sun` |
| Check | `Check` |
| Alert | `AlertCircle` |
| Close | `X` |
| Menu | `Menu` |
| User | `User` |
| Building | `Building2` |
| Phone | `Phone` |
| Mail | `Mail` |
| Map | `MapPin` |
| Share | `Share2` |
| Search | `Search` |
| Filter | `Filter` |
| Arrow right | `ArrowRight` |
| External link | `ExternalLink` |
| Wifi off | `WifiOff` |
| Star / hero | `Sparkles` |

---

*Design System Version: 1.1.0 | Created: 2026-06-21 | Status: Finalized*
