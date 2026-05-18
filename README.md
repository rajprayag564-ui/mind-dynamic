**DynamicMind**

- **Project:** DynamicMind — marketing + course site built with Next.js and Tailwind CSS.
- **Stack:** Next.js (app router), TypeScript, Tailwind CSS, Firebase (auth + client), Vercel for deployment.

**Getting Started**

- **Install:**

```bash
npm install
```

- **Run (development):**

```bash
npm run dev
```

- **Build:**

```bash
npm run build

npm start
```

**Project layout (key folders)**

- `app/` — Next.js app routes and pages (use this to find pages like `login`, `dashboard`, `courses`).
- `components/` — React UI components grouped by feature (landing, auth, contact, UI primitives).
- `lib/` — Utility code and small data modules (see `lib/firebase` for Firebase setup).
- `public/` — Static assets and images.
- `scripts/` — helper scripts (e.g., `verify-env.js`).

**Firebase**

- Firebase helpers live in `lib/firebase/` (`auth.ts`, `client.ts`). Ensure the required environment variables are set before running (project credentials in Vercel or `.env.local`). Use `scripts/verify-env.js` to validate env vars.

**Useful scripts**

- `npm run dev` — run dev server at http://localhost:3000
- `npm run build` — compile production build
- `npm run start` — run production server locally

**Deployment**

- This project is ready for Vercel. Configure environment variables in your Vercel project, then deploy from the repository.

**Useful files**

- `app/page.tsx` — landing page entry
- `components/landing/navbar.tsx` — main navigation
- `lib/firebase/client.ts` — Firebase client initialization

**Contributing**

- Fork, create a branch, make changes, and open a pull request. Add short, focused commits and a clear PR description.

**Contact / Support**

- For local setup issues or env var questions, see `scripts/verify-env.js` or contact the project maintainer.

---

**About**

DynamicMind is a marketing and course-delivery site for online learning programs. The project combines a public-facing marketing site (landing pages, pricing, testimonials, contact) with a simple course delivery experience (enrollment, user dashboard, course access). The goal is to provide a lightweight, maintainable platform for launching online cohorts and delivering course content.

**What we're building**

- A responsive marketing site to attract students and collect leads (landing, pricing, contact forms).
- Authentication and enrollment flows (sign up, enroll in a course, manage access).
- A learner dashboard to access enrolled course content and track progress.
- Admin/maintainer pages for managing course content and viewing enrollments (future).

See [TARGET.md](TARGET.md) for the project target document: goals, audience, MVP scope, success metrics, and roadmap.

If you'd like, I can also add a short Development Setup section (env examples), or create a separate `CONTRIBUTING.md` and `ENVIRONMENT.md` with exact env variable names and examples.
