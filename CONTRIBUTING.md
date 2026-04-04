# Contributing to OpenSubstance.org

Thank you for helping make drug safety information more accurate. This project relies on community contributions — especially from people with lived experience, pharmacology knowledge, and harm reduction expertise.

## You don't need to know how to code

The most valuable contributions are **data corrections**. If you see something wrong — a safety rating, an addiction percentage, a combination rating, a supply purity number — we want to know.

### How to report a data issue

1. Go to [github.com/cdepman/opensubstance.org/issues](https://github.com/cdepman/opensubstance.org/issues)
2. Click **New Issue**
3. Choose the **Data Correction** template
4. Fill in:
   - **Which substance(s)?** — e.g., "MDMA"
   - **What's wrong?** — e.g., "The addiction rate of 5% seems too high/low"
   - **What should it be?** — e.g., "Closer to 3% based on..."
   - **Source** — a link to a study, article, or dataset that supports the correction. This is important. We don't change data based on opinions — we need evidence.
5. Click Submit

That's it. You don't need to touch any code. We'll review the source and update the data.

### How to suggest a new substance

1. Go to Issues → New Issue → **New Substance** template
2. Tell us:
   - Substance name and common street names
   - Why it should be included (how widely used is it?)
   - Any data sources you can point to

### How to report a bug or UI issue

1. Go to Issues → New Issue → **Bug Report** template
2. Describe what's broken and include a screenshot if possible

## If you do know how to code

### Setup

```bash
git clone https://github.com/cdepman/opensubstance.org.git
cd opensubstance.org
npm install
npm run dev
```

### Making changes

1. Fork the repository
2. Create a branch: `git checkout -b fix/mdma-addiction-rate`
3. Make your changes
4. Test locally
5. Open a pull request with:
   - What you changed
   - Why (with source links for any data changes)

### What we need help with

- **Data verification** — every number in this app should be traceable to a peer-reviewed source or established harm reduction organization
- **Mobile responsiveness** — testing on various devices and screen sizes
- **Accessibility** — screen reader support, color contrast, keyboard navigation
- **Translations** — harm reduction information should be available in every language
- **New substance profiles** — with sourced data
- **Combination mechanism explanations** — the "WHY" behind dangerous interactions

## Data standards

All data in OpenSubstance must meet these standards:

- **Sourced**: every number traces to a published study, government dataset, or established harm reduction organization (DanceSafe, DrugsData, TripSit, PsychonautWiki, etc.)
- **Conservative**: when sources disagree, we use the safer estimate
- **Honest**: we show ranges where single numbers are misleading, and say "unknown" rather than guess
- **Current**: we prefer recent data over old data. A 2023 drug checking result beats a 1994 survey.
- **Plain language**: no jargon. If a pharmacologist wouldn't explain it this way to their friend at a party, rewrite it.

## Code of conduct

This is a harm reduction project. We operate with compassion, respect, and evidence.

- No stigmatizing language about people who use drugs
- No moral judgments about substance use
- No promotion of drug use (we provide information for people who have already decided to use)
- No gatekeeping — all good-faith contributions are welcome regardless of background
- Cite your sources

## Questions?

Open an issue with the question label, or reach out directly.

Thank you for helping keep people safer.
