# Senior Developer Portfolio & Client Acquisition Platform

A modern, high-converting personal developer portfolio and client acquisition website built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **React Hook Form**, **Zod**, and **Resend**.

---

## ⚡ Core Features

- **Hero & Value Proposition**: Live pulse availability badge, dynamic typography, metrics counter banner, instant CTAs, and one-click email copy drawer.
- **Featured Engineering Works**: Filterable case study cards (`Web & SaaS`, `Systems & IoT`, `Interactive Tools & Canvas`) with expandable deep-dive architecture modals, live demos, and source code links.
- **Services & Scope of Work**: 4 core pillar cards detailing turnaround times, typical stack, deliverable checklists, and a 4-stage delivery milestone workflow.
- **Bento-Grid Tech Arsenal**: Interactive categorization across Languages, Frontend Systems, Backend/Cloud, and Embedded/Hardware.
- **Career Milestone Timeline**: Chronological leadership achievements and quantifiable impact metrics.
- **Client Acquisition Hub**:
  - Zod-validated dynamic inquiry form (project type multi-select, budget range, target timeline, scope description).
  - Confetti celebration feedback upon submission.
  - One-click copy email button with toast notification.
  - Cal.com 15-minute technical discovery call scheduling modal.
  - Interactive Executive Resume modal with print/save-PDF support.
- **App Router API Route (`/api/inquire`)**: Server-side Zod validation with Resend email notification dispatch and local developer fallback mode.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5+ (App Router, Server Actions/Components)
- **UI & Styling:** Tailwind CSS, Lucide Icons, Glassmorphic Cyber Theme
- **Animations:** Framer Motion, Canvas Confetti
- **Forms & Validation:** React Hook Form, Zod
- **Email Notifications:** Resend API

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (Optional)
Create a `.env.local` file in the root directory:
```env
RESEND_API_KEY=re_your_api_key_here
NOTIFICATION_EMAIL=your.email@domain.com
```
*(Note: If no API key is provided, the API operates in development logger mode and gracefully confirms submission).*

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

### 4. Build for Production
```bash
npm run build
npm start
```