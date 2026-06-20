# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nuxt 3 web application for "多元陪伴照顧服務試辦計畫" (Multi-dimensional Accompaniment Care Service Pilot Program). Combines a public-facing website with an admin dashboard (`/admin/`). Traditional Chinese UI.

## Commands

```bash
# Development
yarn dev          # Start dev server
yarn build        # Build for production (output to .output/)
yarn generate     # Static site generation
yarn preview      # Preview production build
yarn postinstall  # Run nuxt prepare
```

No test or lint commands are configured.

## Architecture

### Frontend (Nuxt 3 + Vue 3)
- **Pages**: `/pages/` — file-based routing. Public pages + `/pages/admin/` for dashboard
- **Layouts**: `/layouts/` — `default.vue`, `admin.vue`, `layout-one.vue`
- **Components**: `/components/` — organized by feature (header, footer, faq, news, service, blog, etc.)
- **Composables**: `/composables/` — `useQA.ts`, `useSticky.ts`, `useVideoPopup.ts`
- **Data**: `/data/` — static TypeScript data files (menu, blog, news, team)
- **Middleware**: `/middleware/auth.global.js` — protects `/admin` routes via JWT cookie check

### Backend (Nitro/H3 Server)
- **API Routes**: `/server/api/` — Nuxt 3 file-based API routing (`[id].get.js`, `index.post.js` pattern)
  - Auth: `/api/auth/` (login, logout, verify)
  - CRUD endpoints: announcements, qa, qa-categories, qa-contents, banners, knowledge, service-unit, languages, user-reminder
  - Utility: `/api/captcha/`, `/api/createdb/`
- **Models**: `/server/models/` — raw MSSQL query functions (no ORM for main tables). Each model handles CRUD for its table.
- **Controllers**: `/server/controllers/` — business logic for QA and announcements
- **Auth**: `/server/utils/auth.js` — JWT generation/verification. Token stored in `auth_token` cookie (24hr expiry)

### Database
- **MSSQL** (Microsoft SQL Server) — connection config in `/server/config/db.js`
- **Prisma**: minimal schema at `/prisma/schema.prisma` (only UserReminders model)
- Tables use soft deletes (`is_deleted` flag)
- Schema SQL files in `/server/database/`
- DB init logic in `/server/config/initDb.js`
- Images stored as binary data in MSSQL

### Key Dependencies
- **CSS**: Bootstrap 5.3.2, SASS
- **Rich Text Editors**: CKEditor 5, TinyMCE, Tiptap (multiple options available)
- **UI**: Swiper 11, SweetAlert2, vue3-toastify, GSAP animations
- **Validation**: vee-validate + Yup
- **Security**: nuxt-security module with CSP headers
- **State**: Pinia

## Environment Variables
- `JWT_SECRET` — JWT signing key (has default fallback)
- `NODE_ENV` — environment detection
- Database credentials are hardcoded in `/server/config/db.js`

## Conventions
- API routes follow Nuxt 3 server file naming: `index.get.js` for list, `index.post.js` for create, `[id].get.js` for read, `[id].put.js` for update, `[id].delete.js` for delete
- Models use raw `mssql` queries (not Prisma) for most tables
- File uploads go to `/public/uploads/`
