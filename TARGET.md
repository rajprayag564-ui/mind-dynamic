Project Target Document — DynamicMind

1. Project Overview

- DynamicMind is a marketing + course delivery site built with Next.js and Tailwind CSS. It combines public marketing pages with user authentication, enrollment, and a learner dashboard.

2. Target Audience

- Individual learners seeking short cohort-based online courses.
- Small teams or companies purchasing training for employees.
- Course creators who want a lightweight platform to run cohorts.

3. Goals & Success Metrics

- Goal: Launch an MVP that accepts enrollments and delivers course content.
  - Metric: 1st cohort of N learners enrolled within 30 days of launch.
  - Metric: <80% critical bugs reported in first month.

- Goal: Convert visitors to leads via marketing pages.
  - Metric: Lead conversion rate (visitors → contact submissions) >= 2%.

4. Scope & MVP

- Included in MVP:
  - Landing page, pricing, testimonials, contact form.
  - Authentication (email sign-in) via Firebase.
  - Simple enrollment flow and payment placeholder (integration later).
  - Learner dashboard listing enrolled courses and content links.

- Out of scope for MVP:
  - Full CMS for course content (content will be simple files or static pages).
  - Advanced payment & subscription management (defer to later integration).

5. Feature Roadmap (short-term)

- Phase 1 (MVP): Landing, auth, enrollment, dashboard, contact.
- Phase 2: Payment integration, basic admin interface, course progress tracking.
- Phase 3: Content authoring tools, analytics, cohort management.

6. Non-Goals / Constraints

- Not building a fully-featured LMS on day one.
- Keep infrastructure costs low (use Vercel + Firebase where possible).

7. Technical Notes

- Frontend: Next.js app router, TypeScript, Tailwind CSS.
- Auth: Firebase Auth (email + OAuth later).
- Data: Firebase Firestore or lightweight data store for enrollments.
- Deployment: Vercel.

8. Environment / Required Secrets (examples)

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY` (server only)

9. Next Steps

- Add `.env.example` listing required keys.
- Prepare initial marketing copy and course outline.
- Deploy staging to Vercel and test enrollment flow.

Contact: Project maintainer (see repository owner) for questions and access.
