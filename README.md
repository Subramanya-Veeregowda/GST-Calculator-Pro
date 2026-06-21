# GST Calculator Pro

A premium, high-performance application designed for fast Goods and Services Tax calculations and professional invoice generation. It empowers businesses, freelancers, and accountants with an intuitive interface to handle complex tax compliance with precision and speed.

---

![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05033?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-121011?style=for-the-badge&logo=github&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Responsive Design](https://img.shields.io/badge/Responsive_Design-00D4AA?style=for-the-badge)

---

## Overview

### Purpose
The primary purpose of GST Calculator Pro is to simplify the often complex and error-prone process of calculating taxes and managing financial records. It provides a standardized, error-free environment for rapid tax operations.

### Business Use Case
Ideal for retail environments, B2B service providers, and freelance professionals who need to quickly determine tax inclusions and exclusions, and instantly provide standardized PDF invoices to clients without relying on heavy enterprise accounting software.

### Target Users
- Small to Medium Business Owners
- Independent Freelancers
- Accountants and Financial Consultants
- Retail Cashiers

### Core Functionality
At its core, the application instantly calculates CGST, SGST, and IGST based on real-time inputs. It features a persistent history log for auditing and a powerful PDF generation engine for immediate invoicing, all wrapped in a robust frontend architecture.

---

## Live Demo

**Demo URL:**
[https://your-demo-link-here](https://your-demo-link-here)

*(Note: Live demo URL will be updated soon once deployment is finalized.)*

---

## Android Application

**Android App URL:**
[https://your-android-app-link-here](https://your-android-app-link-here)

*(Note: Android App link will be updated soon once published on the Play Store.)*

---

## Tech Stack

| Category | Technologies |
| --- | --- |
| Frontend | React 19, HTML5, JavaScript (ES6+) |
| Build Tool | Vite |
| Styling | Tailwind CSS v4, Framer Motion |
| Version Control | Git, GitHub |
| Deployment | TBD |

---

## Features

- GST Inclusive Calculation
- GST Exclusive Calculation
- Multi-rate GST Support
- Real-time Calculation
- Invoice Generation
- Calculation History
- Dark Mode Support
- Responsive Design
- Mobile Friendly Interface
- Theme Synchronization
- Contact Section
- Footer Navigation

---

## Architecture

The project utilizes a modern Component-Based Architecture to ensure scalability and maintainability. It emphasizes strict Separation of Concerns by isolating state management, business logic, and UI rendering.

- **Component-Based Architecture**: Modular UI pieces built for reuse across multiple views.
- **React Context API**: Global state management for overarching application settings like the Theme System.
- **Modular Folder Structure**: Clean directory separation enforcing boundaries between layouts, core services, and visual components.
- **Reusable Components**: Agnostic UI elements like buttons and inputs configured via props and generic class merging.
- **Separation of Concerns**: Custom hooks handle complex component lifecycle logic, while core services handle mathematical algorithms and local storage manipulation independently.

```text
src/
├── assets/
├── components/
├── context/
├── core/
├── hooks/
├── layouts/
├── pages/
├── router/
├── shared/
├── ui/
└── utils/
```

- `assets/`: Static media, icons, and placeholder imagery.
- `components/`: Feature-specific and isolated React components.
- `context/`: Global state providers like the ThemeContext.
- `core/`: Core business logic, constants, and pure services.
- `hooks/`: Custom React hooks for component state abstraction.
- `layouts/`: Page wrappers containing global navigation elements.
- `pages/`: Top-level route components representing application views.
- `router/`: Application routing configuration and suspense fallbacks.
- `shared/`: Universally utilized components like Loaders and animations.
- `ui/`: Reusable, highly generic atomic UI elements like Buttons and Inputs.
- `utils/`: Pure helper functions for formatting and validation.

---

## Installation & Setup

### Prerequisites

- Node.js
- npm

### Clone Repository

```bash
git clone https://github.com/Subramanya-Veeregowda/GST-Calculator-Pro.git
```

### Navigate

```bash
cd GST-Calculator-Pro
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

---

## Limitations

- No authentication system
- No cloud persistence
- No advanced analytics
- No role-based access control
- Android app not yet published

---

## Future Roadmap

### v1.1
- Implementation of multi-currency parsing and support.
- Configurable regional tax slabs.
- Export calculation history to CSV/Excel format.

### v2.0
- Introduction of user authentication mechanisms.
- Cloud database integration for persistent cross-device syncing.
- Customizable PDF invoice templates with user-uploaded branding.

### v3.0
- Launch of advanced analytics dashboard.
- Role-based access control for team environments.
- Automated API integrations with standard accounting software.

---

<div align="center">

Copyright © 2026 GST Calculator Pro | All Rights Reserved<br />

  
  <br />

  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](LINKEDIN_URL)
  [![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://your-portfolio-link.com)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](GITHUB_URL)
  [![LeetCode](https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=white)](LEETCODE_URL)
  [![HackerRank](https://img.shields.io/badge/HackerRank-2EC866?style=for-the-badge&logo=hackerrank&logoColor=white)](HACKERRANK_URL)
  [![NeetCode](https://img.shields.io/badge/NeetCode-000000?style=for-the-badge)](NEETCODE_URL)
  [![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](WHATSAPP_URL)
</div>
