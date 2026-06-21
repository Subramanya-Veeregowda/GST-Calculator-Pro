# GST Calculator Pro — Master Specification Document

> **Version:** 1.1.0-spec  
> **Date:** 2026-06-21  
> **Author:** Subramanya V (subramanyav2002@gmail.com)  
> **Built for:** Digital Heroes — [digitalheroesco.com](https://digitalheroesco.com)  
> **Status:** ⏳ Awaiting Final Approval Before Implementation

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [Target Users & User Stories](#2-target-users--user-stories)
3. [Technical Architecture](#3-technical-architecture)
4. [Folder Structure](#4-folder-structure)
5. [Feature Roadmap](#5-feature-roadmap)
6. [Phase Breakdown](#6-phase-breakdown)
7. [Routing Map](#7-routing-map)
8. [State Management Plan](#8-state-management-plan)
9. [History Module Spec](#9-history-module-spec)
10. [PDF Strategy](#10-pdf-strategy)
11. [Responsive Strategy](#11-responsive-strategy)
12. [PWA Requirements](#12-pwa-requirements)
13. [Design System](#13-design-system)
14. [Digital Heroes Requirements](#14-digital-heroes-requirements)
15. [React Native Compatibility Plan](#15-react-native-compatibility-plan)
16. [Deployment Strategy](#16-deployment-strategy)

---

## 1. Product Vision

### Problem Statement
Small businesses, freelancers, shop owners, and GST taxpayers in India frequently need to:
- Calculate GST breakdowns (inclusive/exclusive) instantly
- Generate professional GST-compliant invoices
- Track their calculation and invoice history
- Work offline in areas with poor connectivity

Most available tools are either overly complex, desktop-only, non-mobile-friendly, or require expensive subscriptions.

### Product Vision Statement
> **GST Calculator Pro** is a premium, offline-capable, mobile-first Progressive Web App that empowers Indian small businesses and freelancers to instantly calculate GST, generate professional PDF invoices, and maintain a searchable local history — completely in **Guest Mode** with no registration friction, internet dependency, or recurring cost. All data remains securely stored on the user's local device.

### Core Value Proposition
| Pillar | Description |
|--------|-------------|
| **Speed** | Instant GST calculations with no page reload |
| **Professionalism** | PDF invoices that look business-grade |
| **Offline** | Full PWA — works without internet after first load |
| **Privacy** | All data stored locally — no server, no tracking, no login required |
| **Mobile-First** | Designed for the smartphone-first Indian SMB user |

---

## 2. Target Users & User Stories

### Primary Personas

| Persona | Description |
|---------|-------------|
| **Ravi — Shop Owner** | Runs a retail shop, needs to calculate GST on goods and generate quick invoices |
| **Priya — Freelancer** | Freelance designer, raises GST invoices for clients, needs professional PDFs |
| **Ankit — Accountant** | Manages accounts for 5 small businesses, needs bulk calculation history |
| **Meena — Consultant** | Service provider, needs to split GST (CGST/SGST vs IGST) correctly |

### User Stories

#### Onboarding & Profile (Guest Mode)
- As a user, I want to jump straight into using the app without signing up.
- As a user, I want to save my profile information (Business Name, Owner Name, GSTIN, Phone, Email, Address) in the Settings so it auto-populates on invoices.

#### GST Calculator
- As a user, I want to enter an amount and select a GST rate (0%, 5%, 12%, 18%, 28%) to get a breakdown.
- As a user, I want to toggle between "GST Exclusive" (add GST on top) and "GST Inclusive" (extract GST from total).
- As a user, I want to see CGST + SGST split (intra-state) or IGST (inter-state) automatically.
- As a user, I want to see the Base Amount, GST Amount, and Total clearly.
- As a user, I want to copy the result or share it.
- As a user, I want my calculation to be auto-saved to history locally.

#### Invoice Generator
- As a user, I want to create a new invoice with line items, customer details, and GST rate.
- As a user, I want to add/remove/edit line items dynamically with support for different GST rates per line item.
- As a user, I want auto-calculated totals (subtotal, GST, grand total).
- As a user, I want to choose between CGST+SGST or IGST.
- As a user, I want to download a professional PDF invoice.
- As a user, I want invoice numbers to auto-increment in the format `INV-YYYYMM-001`.

#### History
- As a user, I want to see all my past GST calculations with date, amount, and result.
- As a user, I want to see all my past invoices with invoice number, customer name, and date.
- As a user, I want to search and filter history locally.
- As a user, I want to delete individual records or clear all history.

#### Settings
- As a user, I want to toggle between light and dark themes.
- As a user, I want the app to remember my preferences locally.

#### PWA
- As a user, I want to install the app on my home screen.
- As a user, I want the app to work fully offline after the first install.

---

## 3. Technical Architecture

### Stack Decisions

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **UI Framework** | React 18 | Component model, ecosystem, RN compatibility |
| **Build Tool** | Vite 5 | Fast HMR, native ESM, excellent PWA plugin support |
| **Styling** | Tailwind CSS v4 | Utility-first, design tokens, purging |
| **Routing** | React Router v6 | Nested routes, lazy loading |
| **PDF Generation** | jsPDF + jspdf-autotable | Client-side, no server required |
| **PWA** | vite-plugin-pwa (Workbox) | Service worker, manifest, offline cache |
| **Storage** | LocalStorage (via service layer) | Simple, no backend needed, future-swappable |
| **State** | React Context + useReducer | No external library, React Native portable |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                        UI Layer                          │
│              React Components (Presentational)           │
│           ← Only renders, handles user events →          │
├─────────────────────────────────────────────────────────┤
│                      Hooks Layer                         │
│         Custom Hooks (useGST, useInvoice, useProfile)    │
│    ← Bridges UI to services, manages local state →       │
├─────────────────────────────────────────────────────────┤
│                    Services Layer                        │
│   GSTService | InvoiceService | ProfileService | PDFService│
│   HistoryService | StorageService | ThemeService         │
│         ← Pure business logic, no React imports →        │
├─────────────────────────────────────────────────────────┤
│                    Storage Layer                         │
│             StorageAdapter (LocalStorage)                │
│    ← Abstracted so it can swap to AsyncStorage (RN) →    │
└─────────────────────────────────────────────────────────┘
```

### Key Architectural Rules
1. **No business logic in components** — Components are pure presentational
2. **Services are framework-agnostic** — No React imports in service files
3. **Hooks are the bridge** — All state transformations happen in custom hooks
4. **Storage is abstracted** — StorageAdapter wraps LocalStorage; future RN uses AsyncStorage adapter
5. **Context is minimal** — Only global state (theme, user profile) in context
6. **Lazy loading** — All routes are code-split with React.lazy
7. **Guest Mode First** — The app never attempts to log the user in; everything is driven by LocalStorage.

---

## 4. Folder Structure

```
gst-calculator-pro/
├── public/
│   ├── icons/                    # PWA icons
│   ├── splash/                   # Splash screen images
│   └── favicon.ico
│
├── src/
│   ├── main.jsx                  # Entry point
│   ├── App.jsx                   # Root component, Router setup
│   │
│   ├── core/                     # Framework-agnostic business logic
│   │   ├── services/
│   │   │   ├── gst.service.js        # GST calculation logic
│   │   │   ├── invoice.service.js    # Invoice creation, numbering
│   │   │   ├── pdf.service.js        # PDF generation (jsPDF)
│   │   │   ├── profile.service.js    # User profile management
│   │   │   ├── history.service.js    # History CRUD
│   │   │   ├── storage.service.js    # StorageAdapter (wraps LocalStorage)
│   │   │   └── theme.service.js      # Theme persistence
│   │   │
│   │   ├── models/
│   │   │   ├── gst.model.js          # GSTCalculation type/schema
│   │   │   ├── invoice.model.js      # Invoice type/schema
│   │   │   ├── profile.model.js      # Profile type/schema
│   │   │   └── history.model.js      # History entry type/schema
│   │   │
│   │   └── constants/
│   │       ├── gst-rates.js          # [0, 5, 12, 18, 28]
│   │       ├── tax-types.js          # IGST, CGST+SGST
│   │       └── app.constants.js      # App name, version, links
│   │
│   ├── hooks/                    # React custom hooks (bridge layer)
│   │   ├── useGSTCalculator.js
│   │   ├── useInvoice.js
│   │   ├── useHistory.js
│   │   ├── useProfile.js
│   │   ├── useTheme.js
│   │   └── usePDF.js
│   │
│   ├── context/                  # React Context (global state)
│   │   ├── ThemeContext.jsx
│   │   └── AppContext.jsx        # Combined provider
│   │
│   ├── router/
│   │   ├── AppRouter.jsx         # Route definitions
│   │   └── routes.js             # Route constants
│   │
│   ├── layouts/
│   │   ├── AppLayout.jsx         # Main shell (nav + content)
│   │   └── components/
│   │       ├── Sidebar.jsx       # Desktop sidebar nav
│   │       ├── TopBar.jsx        # Desktop top bar
│   │       ├── BottomNav.jsx     # Mobile bottom navigation
│   │       └── Footer.jsx        # Digital Heroes footer
│   │
│   ├── pages/
│   │   ├── calculator/
│   │   │   └── CalculatorPage.jsx
│   │   ├── invoice/
│   │   │   ├── InvoiceListPage.jsx
│   │   │   └── InvoiceCreatePage.jsx
│   │   ├── history/
│   │   │   └── HistoryPage.jsx
│   │   ├── settings/
│   │   │   └── SettingsPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Primitives
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Toggle.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Spinner.jsx
│   │   │   └── EmptyState.jsx
│   │   │
│   │   ├── calculator/
│   │   │   ├── AmountInput.jsx
│   │   │   ├── GSTRateSelector.jsx
│   │   │   ├── CalculationTypeToggle.jsx
│   │   │   ├── TaxTypeSelector.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   └── BreakdownTable.jsx
│   │   │
│   │   ├── invoice/
│   │   │   ├── InvoiceForm.jsx
│   │   │   ├── LineItemRow.jsx
│   │   │   ├── InvoiceSummary.jsx
│   │   │   ├── InvoiceCard.jsx
│   │   │   └── PDFPreview.jsx
│   │   │
│   │   ├── history/
│   │   │   ├── HistoryList.jsx
│   │   │   ├── HistorySearchBar.jsx
│   │   │   ├── HistoryFilterBar.jsx
│   │   │   ├── CalcHistoryItem.jsx
│   │   │   └── InvoiceHistoryItem.jsx
│   │   │
│   │   └── shared/
│   │       ├── DigitalHeroesButton.jsx
│   │       ├── ThemeToggle.jsx
│   │       ├── InstallPrompt.jsx
│   │       └── OfflineBanner.jsx
│   │
│   ├── styles/
│   │   ├── index.css             # Tailwind v4 entry + custom tokens
│   │   └── animations.css        # Keyframe animations
│   │
│   └── utils/
│       ├── format.js             # Currency, date formatters
│       ├── validation.js         # Form validators
│       └── cn.js                 # classnames utility
│
├── .env.example
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── index.html
├── vercel.json
├── MASTER_SPEC.md
└── README.md
```

---

## 5. Feature Roadmap

### MVP (Phases 1–4)
| Feature | Priority | Complexity |
|---------|----------|------------|
| Project scaffolding (Vite + React + Tailwind v4) | P0 | Low |
| PWA setup (manifest + service worker) | P0 | Medium |
| Theme system (dark/light) | P0 | Low |
| Responsive layout (bottom nav / sidebar) | P0 | Medium |
| User Profile/Settings (LocalStorage) | P0 | Low |
| GST Calculator (exclusive/inclusive) | P0 | Low |
| CGST/SGST vs IGST split | P0 | Low |
| Invoice Generator (multi-line items, per-line GST) | P0 | High |
| Auto-increment invoice numbers `INV-YYYYMM-001` | P0 | Low |
| PDF download | P0 | Medium |
| History (calc + invoice) with search/filter | P1 | Medium |
| Digital Heroes footer & button | P0 | Low |
| Offline banner | P1 | Low |
| Install prompt | P1 | Low |

### Post-MVP (Phase 5+)
| Feature | Priority |
|---------|----------|
| Invoice template selector | P2 |
| Multi-currency support | P2 |
| Export history as CSV/Excel | P2 |
| Backend migration (if ever needed) | P3 |
| React Native mobile app | P3 |

---

## 6. Phase Breakdown

### Phase 1 — Foundation & Shell
**Goal:** Fully working responsive shell with routing, theme, and PWA

**Deliverables:**
- Vite + React + Tailwind CSS v4 project initialized
- React Router with lazy-loaded routes
- AppLayout: BottomNav (mobile) + Sidebar (desktop)
- TopBar with theme toggle
- Dark/Light theme system
- PWA manifest + Workbox service worker
- Digital Heroes footer + button on all pages
- Offline banner component
- User Profile / Settings stub (saved to LocalStorage)

---

### Phase 2 — GST Calculator
**Goal:** Fully functional GST calculator with history auto-save

**Deliverables:**
- `gst.service.js` — pure calculation logic
- `useGSTCalculator` hook
- CalculatorPage with:
  - Amount input (numeric, formatted)
  - GST Rate selector (0, 5, 12, 18, 28%)
  - Calculation type toggle (Exclusive / Inclusive)
  - Tax type selector (CGST+SGST / IGST)
  - Real-time result card
  - CGST, SGST / IGST breakdown
  - Base, GST, Total display
  - Save to History + auto-save on calculate
  - Copy result to clipboard

---

### Phase 3 — Invoice Generator
**Goal:** Create, preview, and download professional GST invoices as PDF

**Deliverables:**
- `invoice.service.js` — invoice creation, line item management, totals
- `pdf.service.js` — PDF rendering via jsPDF + jspdf-autotable
- `useInvoice` hook
- InvoiceCreatePage with:
  - Business details (auto-filled from profile settings)
  - Customer name, address, GSTIN (optional)
  - Invoice number (auto-incremented `INV-YYYYMM-001`)
  - Invoice date + due date
  - Line items: Description, Qty, Unit Price, **GST Rate (per line item)**
  - Dynamic add/remove line items
  - Auto-calculated: Subtotal, GST, Grand Total
  - Tax type toggle (CGST+SGST / IGST)
  - Download PDF button
  - Save invoice to history
- InvoiceListPage — list of saved invoices
- InvoiceCard — summary card with download + delete actions

---

### Phase 4 — History & Settings Module
**Goal:** Full history browser with search, filter, management, and profile editing

**Deliverables:**
- `history.service.js` — CRUD operations for both calc and invoice history
- `useHistory` hook
- HistoryPage with tabs:
  - **Calculations Tab** — list of saved GST calculations
  - **Invoices Tab** — list of saved invoices
- HistorySearchBar — search by amount, customer, date
- HistoryFilterBar — filter by date range, GST rate, type
- Delete individual record
- Clear all history (with confirmation modal)
- SettingsPage:
  - Form to update User Profile (Business Name, Owner Name, GSTIN, Phone, Email, Address)

---

### Phase 5 — Polish, Testing & Deployment
**Goal:** Production-ready, tested, deployed application

**Deliverables:**
- UI polish pass (animations, spacing, typography)
- Accessibility audit (aria-labels, keyboard nav, focus rings)
- Performance audit (Lighthouse score >= 90)
- PWA audit (Lighthouse PWA score >= 90)
- Vercel deployment via GitHub

---

## 7. Routing Map

```
/ (root) → redirects to /calculator

├── /calculator            → CalculatorPage
├── /invoice
│   ├── /                 → InvoiceListPage
│   └── /new              → InvoiceCreatePage
├── /history              → HistoryPage
└── /settings             → SettingsPage

404 → NotFoundPage
```

### Route Constants

```js
// src/router/routes.js
export const ROUTES = {
  CALCULATOR:      '/calculator',
  INVOICE_LIST:    '/invoice',
  INVOICE_NEW:     '/invoice/new',
  HISTORY:         '/history',
  SETTINGS:        '/settings',
}
```

---

## 8. State Management Plan

### Philosophy
- No Redux / Zustand — Context + useReducer is sufficient and React Native portable
- Global state is minimal — Only theme and user profile settings
- Page-level state — Calculator inputs/results, invoice form live in local component state via custom hooks
- Persistence is a service concern — Hooks call services for storage, not components

### Global State (Context)

**ProfileContext / SettingsContext:**
```
profile           : Profile
updateProfile()   : void
```

**ThemeContext shape:**
```
theme             : 'dark' | 'light'
toggleTheme()     : void
```

### LocalStorage Keys

| Key | Contents |
|-----|----------|
| `gst_pro_user` | User profile object |
| `gst_pro_theme` | 'dark' or 'light' |
| `gst_pro_calc_history` | Array of calculation history records |
| `gst_pro_invoice_history` | Array of invoice history records |
| `gst_pro_invoice_counter` | Last invoice sequence number mapped to YYYYMM |

### StorageAdapter Pattern

```js
// src/core/services/storage.service.js
// Web implementation — wraps localStorage
// Future RN: swap to AsyncStorage adapter (same interface)
export const StorageAdapter = {
  get:    (key)        => JSON.parse(localStorage.getItem(key)),
  set:    (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: (key)        => localStorage.removeItem(key),
  clear:  ()           => localStorage.clear()
}
```

---

## 9. History Module Spec

### Storage
- `gst_pro_calc_history` — Array (newest first), max 500 records
- `gst_pro_invoice_history` — Array (newest first), max 200 records

### HistoryService API

```js
// GST Calculations
addCalcRecord(record)              : void
getCalcHistory()                   : CalcRecord[]
deleteCalcRecord(id)               : void
clearCalcHistory()                 : void
searchCalcHistory(query)           : CalcRecord[]
filterCalcHistory({ dateRange, gstRate, type }) : CalcRecord[]

// Invoices
addInvoiceRecord(record)           : void
getInvoiceHistory()                : InvoiceRecord[]
deleteInvoiceRecord(id)            : void
clearInvoiceHistory()              : void
searchInvoiceHistory(query)        : InvoiceRecord[]
```

---

## 10. PDF Strategy

### Libraries
- **jsPDF** v2.x — PDF document creation
- **jspdf-autotable** — Table rendering for line items

### PDF Generation Flow

```
User clicks "Download PDF"
    ↓
usePDF hook calls PDFService.generateInvoicePDF(invoice, userProfile)
    ↓
PDFService constructs jsPDF document:
  - Header: Business name, address, GSTIN
  - Invoice details: Number (INV-YYYYMM-XXX), date, due date
  - Customer block: Name, address, GSTIN
  - Line items table (includes per-line GST)
  - Totals section: Subtotal, CGST, SGST/IGST, Grand Total
  - Footer: Terms, "Generated by GST Calculator Pro"
    ↓
jsPDF.save("invoice-INV-YYYYMM-001.pdf")
```

---

## 11. Responsive Strategy

### Layout Strategy

| Screen | Navigation | Layout |
|--------|-----------|--------|
| Mobile (< 768px) | **Bottom Navigation Bar** | Single column, full-width cards |
| Tablet (768–1023px) | **Side Rail** (icon-only) | Two-column grid |
| Desktop (1024px+) | **Full Sidebar** (icons + labels) | Three-column for invoice form |

---

## 12. PWA Requirements

### Service Worker Strategy (Workbox via vite-plugin-pwa)
- App Shell (HTML, JS, CSS) -> CacheFirst
- Static Assets (icons, fonts) -> CacheFirst
- PDF Generation -> Client-side offline

### Offline Capabilities
- Full app shell loads offline
- GST Calculator works offline
- Invoice creation works offline
- History browsing works offline
- PDF download works offline (client-side generation)
- No data sync needed (all data is local)

---

## 13. Design System

The complete visual design guidelines, typography, color palette (Dark Teal Theme), and component inventory are detailed in the `DESIGN_SYSTEM.md` document, which has been finalized and approved based on the reference UI.

---

## 14. Digital Heroes Requirements

### Implementation Checklist
- [ ] Footer component on every page showing:
  - "Subramanya V"
  - "subramanyav2002@gmail.com"
- [ ] "Built for Digital Heroes" button:
  - Visible on ALL pages (in footer or sidebar)
  - Links to: https://digitalheroesco.com
  - Opens in new tab with rel="noopener noreferrer"
  - Styled as a premium CTA button (not a plain link)

---

## 15. React Native Compatibility Plan

### Architecture Guardrails

| Rule | Rationale |
|------|-----------|
| No window / document references in services | RN has no DOM |
| No localStorage calls in components or hooks | RN uses AsyncStorage |
| All storage goes through StorageAdapter | Swap adapter for RN |
| No JSX in service files | Services must be pure JS |
| PDF service uses abstract generatePDF(data) interface | RN swaps implementation |
| Navigation calls abstracted via router constants | RN uses React Navigation |
| No browser-only CSS in logic files | Logic must be UI-free |

---

## 16. Deployment Strategy

### Target Platform
- **Vercel Free Plan** (primary hosting)
- **GitHub** (source control + CI/CD trigger)

---

*Document Version: 1.1.0-spec | Created: 2026-06-21 | Status: Awaiting Final Approval*
