# Project Overview: iREPLY HRIS Modernization

## Mission
To migrate the legacy PHP-based Attendance Module into a high-performance, high-fidelity React/Next.js frontend deployed on Vercel, while maintaining a secure connection to the existing PHP backend (HelioHost) and Database.

## Current Milestone: Attendance Module Frontend
- **Status:** Scaffolding complete. High-fidelity UI implemented.
- **Frontend:** Vite + React 19 + Tailwind CSS v3.
- **Backend:** PHP 8.1 API (CORS-enabled).
- **Deployment:** Vercel (Front-end) + HelioHost (Back-end).

## Core Functionality
1. **Attendance Tracking:** View personal logs with auto-calculated hours (minus 1hr lunch).
2. **Management Dashboard:** Bento Grid stats for present/late/OT counts.
3. **Request System:** File Disputes, Overtime, and Leave via right-side quick-drawers.
4. **Role Management:** Dynamic UI rendering based on `role_id` (Employee, Coach, Admin).
