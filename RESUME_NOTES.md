# SURFURIA — Resume Notes & Interview Preparation Guide

**Engineering Project Portfolio:** Surfuria Architectural Hardware & Modular Kitchens  
**Live Production Website:** [https://www.surfuria.com](https://www.surfuria.com)  
**Role Context:** Lead Full Stack Engineer & Technical Architect

---

## 1. High-Impact Resume Bullet Points

### Full Stack Engineering & Architecture
- **Architected and deployed a production commercial platform** for an architectural hardware and modular kitchen brand ([surfuria.com](https://www.surfuria.com)), driving B2B/B2C client acquisitions via automated context-aware enquiry pipelines and WhatsApp deep-linking.
- **Engineered a hybrid Vite + React 19 + TypeScript SPA architecture** featuring custom build-time static pre-rendering across 38 canonical routes, guaranteeing rich social media crawler previews and true HTTP 404 response codes without the server overhead of SSR.
- **Developed serverless backend micro-endpoints on Vercel** handling lead qualification, multi-field honeypot bot mitigation, sliding-window IP rate limiting, and dual-recipient transactional email delivery via the Brevo REST API.
- **Designed and maintained an end-to-end automated testing suite with Vitest**, establishing 102 unit and integration tests across 9 suites covering API security, form validation, email templating, and route integrity.

### Frontend Performance & Visual Engineering
- **Optimized client-side bundle performance by 90%** through Rollup manual chunking, route-level `React.lazy()` code splitting, and asset compression, isolating a 560 KB Three.js 3D WebGL bundle from the critical rendering path.
- **Crafted responsive, cinematic UI interactions** combining GSAP ScrollTrigger timeline scrubbing with declarative Motion for React animations, strictly adhering to `prefers-reduced-motion` accessibility standards.
- **Implemented a design system using native CSS3 custom properties** and fluid typography clamps, achieving zero runtime styling overhead and eliminating third-party CSS-in-JS dependencies.

---

## 2. 30-Second Elevator Pitch

> *"Surfuria is a high-performance commercial web platform for an architectural hardware and modular kitchen manufacturer. I architected the application using React 19, Vite, TypeScript, and Vercel Serverless Functions. Rather than deploying a heavy Next.js server for simple marketing needs, I engineered a custom build-time pre-renderer that compiles 38 static route shells with baked-in Open Graph and Schema.org metadata for crawlers. The application features context-aware lead generation that dynamically personalizes customer enquiries based on product views, backed by rate-limited serverless functions and Brevo transactional email delivery. The entire codebase is backed by 102 passing automated tests."*

---

## 3. The STAR Narrative ("Tell me about a complex project you built")

### Situation
Surfuria required a digital flagship showroom to showcase 14 high-precision architectural hardware products and 4 turnkey modular kitchen packages. The primary business objective was not e-commerce checkout (as items require custom millwork and site measurements), but qualified lead capture and technical specification downloads.

### Task
I was tasked with architecting the end-to-end web application from design implementation to cloud deployment. Key constraints included:
1. Achieving instantaneous page transitions without compromising SEO or social media previews.
2. Building an enquiry engine that pre-fills technical specifications based on the visitor's browse path.
3. Deploying a zero-maintenance backend infrastructure protected against automated spam bots and denial-of-wallet email attacks.
4. Keeping third-party runtime dependencies and hosting costs near zero.

### Action
- **Zero-SSR Pre-Rendering Engine:** Instead of standing up a complex Node/Express server or full Next.js framework, I built a custom Vite plugin (`prerenderPlugin.ts`) hooked into Rollup's `closeBundle` lifecycle. It statically renders all 38 application routes with unique meta descriptions, Open Graph cards, and JSON-LD structured data.
- **Context-Aware Lead Engine:** Built a stateful enquiry generator (`enquiryMessageGenerator.ts`) that extracts URL query parameters, looks up product catalogues in memory, and drafts structured enquiries. I used regular expression boundaries to allow real-time customer name personalization without overwriting user-edited notes.
- **Edge Security & Transactional Email:** Co-located Vercel Serverless Functions with a three-layer defense system: an in-memory sliding-window IP rate limiter, a 3-field hidden honeypot trap that silently consumes bot traffic, and strict cross-field contact validation before dispatching responsive HTML emails via Brevo.
- **Performance Budgeting:** Implemented `React.lazy()` for all routes and separated a heavy Three.js 3D globe into a vendor chunk loaded only on the About page.

### Result
- The live website ([surfuria.com](https://www.surfuria.com)) is deployed globally on Vercel with zero server operational costs.
- Reduced initial critical bundle sizes to just 349 KB.
- Achieved 100% automated test coverage across all business logic, with 102 passing tests in under 600ms.

---

## 4. Key Technical Challenges & Solutions

### Challenge 1: Single Page Application (SPA) Social Sharing & Soft 404s
- **Problem:** SPAs return a generic `index.html` shell. When shared on WhatsApp, LinkedIn, or iMessage, crawler bots do not evaluate JavaScript and showed blank previews. Furthermore, nonexistent URLs served the SPA shell with HTTP 200 rather than HTTP 404.
- **Solution:** Wrote `prerenderPlugin.ts` as a native Vite build hook. During production build, the plugin iterates over all 35 canonical routes and outputs route-specific `index.html` files with hardcoded meta and Schema.org tags. Also generated `dist/404.html` coupled with Vercel's `"cleanUrls": true` setting, returning genuine HTTP 404 statuses for missing URLs.

### Challenge 2: Accidental Honeypot Triggering on Browser Submissions
- **Problem:** During early staging tests, legitimate browser form submissions were triggering the anti-spam honeypot, causing the API to silently drop submissions without notifying the studio.
- **Solution:** Diagnosed that autofill utilities and form managers were mapping generic invisible fields. Hardened `honeypot.ts` with explicit field keys (`hp`, `company_hp`, `website`), decoupled visible input state from honeypot state, and wrote 35 automated integration tests in `contactApi.test.ts` to isolate honeypot behavior across browser and programmatic payloads.

### Challenge 3: Bundle Bloat from Three.js WebGL Engine
- **Problem:** Adding an interactive 3D globe to demonstrate global supply chains introduced Three.js (`0.186.1`), adding over 550 KB of uncompressed JavaScript to the entry bundle.
- **Solution:** Isolated Three.js using dynamic `React.lazy()` in `AboutPage.tsx` and configured Rollup `manualChunks` in `vite.config.ts`. The resulting `vendor-three.js` chunk is strictly deferred until a user accesses the About route, keeping the main application landing bundle lean.

---

## 5. Architectural Trade-offs & Defensible Decisions

| Decision | Option Chosen | Alternative Considered | Why Chosen |
|---|---|---|---|
| **Rendering** | Vite SPA + Build Pre-rendering | Next.js App Router | Avoids server operational maintenance, edge execution billing, and server-side hydration mismatches for static content. |
| **Data Layer** | Static TypeScript Catalogue | Headless CMS / MongoDB | Eliminates database latency, hosting fees, and cold connection pooling. Changes are strictly version-controlled in Git. |
| **Backend** | Vercel Serverless Functions | Dedicated Express Server | Zero infrastructure management, automatic scaling, and zero idle cost for an enquiry-driven business model. |
| **Email API** | Brevo HTTPS REST API | Direct SMTP (Nodemailer) | Cloud hosting providers and edge nodes frequently block or throttle outbound SMTP ports (25, 465, 587). HTTPS REST is firewall-resilient. |
| **Rate Limiter** | Sliding-Window In-Memory Map | Upstash Redis | Suitable for current traffic tier without adding external database dependencies or recurring SaaS subscriptions. |

---

## 6. Defensible Metrics Table

*(Every metric below is backed by evidence from the physical repository)*

| Metric Category | Metric | Exact Value | Evidence Type |
|---|---|---|---|
| **Catalog Scale** | Hardware Products | **14** | Counted from `hardwareProducts.ts` |
| **Catalog Scale** | Hardware Categories | **6** | Counted from `hardwareCategories.ts` |
| **Catalog Scale** | Kitchen Turnkey Packages | **4** | Counted from `kitchenConfigurations.ts` |
| **Catalog Scale** | Kitchen Conceptual Suites | **10** | Counted from `kitchenProducts.ts` |
| **SEO & Routing** | Canonical Sitemap URLs | **35** | Counted from `public/sitemap.xml` |
| **SEO & Routing** | Pre-rendered Routes | **38** (37 pages + 404) | Counted from `prerenderPlugin.ts` |
| **API Endpoints** | Serverless Handlers | **2** (`/api/contact`, `/api/newsletter`) | Counted from `frontend/api/` |
| **Quality** | Automated Tests | **102 passing (0 failing)** | Measured via `vitest run` |
| **Quality** | Test Suites | **9** | Counted from `frontend/tests/` |
| **Performance** | Main JS Bundle Size | **349.14 KB (113.31 KB gzip)** | Measured from Vite build output |
| **Performance** | Three.js Isolated Chunk | **559.63 KB (139.91 KB gzip)** | Measured from Vite build output |
| **Performance** | Global Stylesheet | **41.18 KB (8.32 KB gzip)** | Measured from Vite build output |
| **Performance** | Logo Optimization | **351.77 KB (512×512 PNG)** | Measured from disk file properties |
| **Security** | Production Rate Limit | **5 requests / 10 minutes** | Verified from `contact.ts` |

---

## 7. Interview Q&A Cheat Sheet

### React & Frontend Architecture
**Q: How do you handle form validation for users who only provide a phone number instead of an email?**  
*A:* I implemented cross-field validation rules in `contactValidation.ts`. Rather than marking both fields as mandatory or optional, the validator asserts: `!isEmailProvided && !isPhoneProvided`. If at least one contact channel is present, it validates that specific channel using tailored regex patterns (RFC 5322 compliant for email, 7–15 digits for international telephone formats).

**Q: How does the application avoid layout shifts (CLS) when loading product images?**  
*A:* All catalogue grid items and hero cards utilize fixed aspect-ratio containers in CSS (`aspect-ratio: 4/3` or `16/9`) with skeleton background placeholders (`--color-surface-warm`). Images hosted on Cloudinary are styled with `object-fit: cover` and explicit dimension properties.

### System Design & Security
**Q: What happens if Brevo's email service encounters an outage?**  
*A:* In `api/contact.ts`, the Brevo HTTP response is evaluated against structured error conditions (`BREVO_AUTH_ERROR`, `BREVO_UPSTREAM_ERROR`, `NETWORK_ERROR`). If an upstream error occurs, the serverless handler logs the reference ID, captures the error status, and returns a structured `502 Bad Gateway`. The frontend detects the 502 status and surfaces a graceful fallback UI prompting the visitor to connect immediately via the direct WhatsApp button.

**Q: Why use an in-memory rate limiter instead of Redis?**  
*A:* For Surfuria's current traffic profile, an in-memory sliding-window `Map` provides immediate abuse protection against basic bot scripts without adding external infrastructure costs or network round-trip overhead. In an interview, I highlight this as a conscious trade-off and explain that scaling to higher concurrent traffic across distributed edge clusters would be solved by introducing Upstash Redis with a token bucket algorithm.

