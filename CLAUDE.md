# DoseGuide.org — Claude Code Instructions

## Project Overview
DoseGuide is an open-source harm reduction resource. Accuracy and transparency are the highest priorities. Every quantitative claim must be traceable to a source.

## Critical Rules

### Sourcing — Every New Citation Must Be Added in Three Places
When any new peer-reviewed source, government report, or dataset is cited in the code:
1. **CITE table** in `src/data/substances.js` — add the short key + full reference
2. **Sources page** in `src/views/Sources.jsx` — add to the appropriate section (Harm Scores, Interactions, Addiction, Safety Margins, Supply & Purity, or Dosage & Effects)
3. **README.md** — add to the Data Sources section if it's a primary source for a data category

This is non-negotiable. Transparency is the entire philosophy of this project.

### Tone — Describe, Don't Prescribe
All user-facing text should state facts, not commands. "Fentanyl strips can detect contamination" not "Always use fentanyl strips." The user decides what to do with the information. Exception: emergency instructions (calling 911, giving Narcan) can be imperative.

### Data Confidence Levels
Every quantitative field in substance data has a `_src` object with:
- `ref` — CITE key or null
- `conf` — "measured" | "derived" | "estimated" | "editorial"
- `note` — human-readable explanation (no variable names or code internals)

When adding or changing a number, always update the corresponding `_src` entry.

### Harm Score Sources
- 14 substances from Nutt 2010 (Lancet)
- Fentanyl from Broman 2025 (Harm Reduction Journal)
- Nitrous and poppers from Ferreira 2022
- DMT from Broman 2025
- Remaining 7 are DoseGuide estimates marked with `harmEstimated:true`

### Interaction Data
- Base from TripSit v4.0
- DoseGuide has corrected several ratings with peer-reviewed citations
- When changing a rating, add the mechanism explanation to the MECH map in `combinations.js` with inline citation
- Comment block at top of `combinations.js` documents all corrections from TripSit base

### MED_WARNINGS System
Medication warnings (like lithium + psychedelics) are in the `MED_WARNINGS` export in `substances.js` and rendered in `Detail.jsx`. Use this for non-recreational medications that have critical interactions with recreational substances.

## Tech Stack
- React 19 + Vite
- No CSS framework — all inline styles
- Mobile-first, dark theme
- Deployed on Netlify

## File Structure
- `src/data/substances.js` — all substance data + CITE table + MED_WARNINGS
- `src/data/combinations.js` — interaction ratings (CO map) + mechanisms (MECH map)
- `src/components/Charts.jsx` — rankings page with jump tabs
- `src/components/Detail.jsx` — expanded substance detail panel
- `src/components/Matrix.jsx` — desktop interaction grid
- `src/components/InteractionsMobile.jsx` — mobile interaction lookup
- `src/components/CrisisFooter.jsx` — persistent emergency help bar
- `src/views/Sources.jsx` — data sources page with sections + jump tabs
- `src/App.jsx` — shell, nav, routing, about modal
