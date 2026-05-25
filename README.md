# Inbound Fax Classification — Interactive Training

A self-contained, browser-based training module that teaches medical admin staff at **Optimal Health Holdings** (beOptimal.ca) how to verify and correct AI-classified inbound faxes. Staff learn the exact ruleset the classifier follows, then test their judgment on 50 realistic sample faxes.

**Live:** https://optimal-research-team.github.io/fax-training/

---

## Overview

The module has two sequential steps plus a results & review flow:

1. **Step 1 — Interactive Overview.** A guided walkthrough of the classification ruleset across five sections: why verification matters, the 12 categories, the document-naming formula (with a live builder), priority triage (normal vs. abnormal), and the 10 common mistakes. Staff must visit every section and acknowledge all 10 mistake cards before the test unlocks.

2. **Step 2 — Practice Test.** 50 questions, each showing an OCR-style fax preview. The trainee picks a category and a priority, submits, and receives immediate per-question feedback with the correct answers, a teaching note, the suggested document name, and any related guardrail.

3. **Results & Review.** Final score out of 100 (pass ≥ 80%), accuracy broken down by category, the specific guardrails the trainee tripped, time taken, and a read-only review of every answer.

Progress persists in `localStorage`, so a trainee can close the browser and resume.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | React + Vite + TypeScript |
| Routing | React Router (`HashRouter`) — works on any static host with no server rewrites |
| Styling | Tailwind CSS with a warm-clinical design system |
| Fonts | Inter (UI), Fraunces (display), JetBrains Mono (OCR) — bundled via `@fontsource` |
| State | React Context + `localStorage` (`fax_training_progress_v1`) |
| Backend | None. Fully static, all data lives in the bundle. |

## Architecture

```
src/
  data/            # Typed ruleset: categories, naming, priority, guardrails, 50 faxes
  context/         # ProgressContext — progress state + persistence
  lib/             # storage (localStorage) + scoring (results calculation)
  components/      # Reusable UI: BrandMark, TopBar, Button, CategoryChip, FaxPreview, icons
  screens/         # Landing, Overview, Test, Results, Review
    sections/      # The five Step 1 sections
```

### Routes

```
/                  Landing (welcome + resume prompt)
/overview          Step 1 — Interactive ruleset overview
/overview/:section Deep link to a section (why · categories · naming · priority · mistakes)
/test              Step 2 — resumes from the saved question index
/test/:n           A specific question by 1-based index
/results           Final score + breakdown + restart
/review            Read-only review of all 50 answers
```

## Local development

This project uses Node 22.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. The Vite `base` is set to `./` (relative), so the same build works from any subpath or host.

## Scope (v1)

Tests **category** and **priority** only. The suggested document name is shown in feedback for the trainee to self-compare — it is not graded. No accounts, no server-side persistence, no PDF/image rendering (structured snippets only).
