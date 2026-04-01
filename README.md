# DoseGuide.org

**Evidence-based harm reduction. Not medical advice.**

DoseGuide is a free, open-source tool that provides honest, sourced safety information about recreational substances. It exists because people use drugs whether or not they have good information — and having good information saves lives.

## Why this exists

Every year, tens of thousands of people die from drug overdoses that could have been prevented with better information. Not "don't do drugs" information — that doesn't work. Practical information:

- **How much is too much?** Not the LD50 from a textbook, but the real-world margin between a normal dose and danger — and what shifts that margin (your health, your environment, what else you took).
- **Is it what you think it is?** Only 1.9% of US "heroin" samples actually contain heroin (Maryland RAD 2021-2024). 26% of "MDMA" contains something else (DrugsData). Knowing this — and testing — saves lives.
- **What happens if you mix them?** Polydrug combinations are a leading cause of overdose death. Benzos + opioids. Stimulants + opioids. Alcohol + GHB. MDMA + MAOIs. These combinations kill people who thought they were being careful.
- **How likely are you to get hooked?** Not a 1-5 scale — the actual percentage from epidemiological research where available. 67.5% lifetime for nicotine (Lopez-Quintero 2011). ~3% within 24 months for hallucinogens (Stone 2007). Where no population data exists, we say so explicitly.

Most drug information online is either:
- **Prohibitionist** — "all drugs are equally bad, just say no" (useless if someone has already decided to use)
- **Pro-drug** — minimizes risks to seem cool (dangerous)
- **Clinical** — accurate but unreadable for the person who needs it at 2am

DoseGuide tries to be none of these. It's the information a smart, caring friend with a pharmacology degree would give you.

## Data sources

- **Harm scores**: 14 substances from Nutt 2010 (Lancet MCDA). 4 more from subsequent MCDA studies: fentanyl=90 (Broman 2025), nitrous=6 (Ferreira 2022), DMT=5 (Broman 2025), poppers=5 (Ferreira 2022). The remaining 7 (tramadol, kratom, DXM, 2C-x, PCP, mescaline, caffeine) are DoseGuide estimates, marked with dashed bars in the charts and `conf:"estimated"` in the data.
- **Drug combinations**: TripSit v4.0 interaction chart + mechanism explanations
- **Addiction rates**: 5 with population-based survival analysis (Lopez-Quintero 2011 for nicotine, alcohol, cannabis, cocaine; Anthony 1994 for heroin). Hallucinogens from Anthony 1994 (~4.9% lifetime) and Stone 2007 (~3% within 24 months). Amphetamines from Anthony 1994. Ketamine from Barrios 2025 (GDS, convenience sample). MDMA, GHB, DXM, kratom, and 2C-B have **no population-based capture rates** — our numbers are editorial estimates clearly labeled as such.
- **Supply purity**: Cocaine purity ~88% (DEA 2024, levamisole down to ~5%). MDMA from DrugsData (Sevigny & Thyssen 2024). Heroin from Maryland RAD (1.9% concordance). Ketamine from Italy GC/MS (78%). Others are editorial estimates.
- **Safety margins**: Gable 2004 (Addiction) covers 20+ substances with lethal-to-effective dose ratios. Individual values derived from this and clinical toxicology literature.
- **Dosage ranges**: PsychonautWiki
- **Psychological risk**: Global Drug Survey 2019-2021
- **Cocaine cardiac risk**: Mittleman 1999 (23.7-fold MI risk increase within 60 min of use)

## Sourcing transparency

Every substance in `src/data/substances.js` has a `_src` object with per-field citations:

```js
_src: {
  harm:          { ref: "nutt2010", conf: "measured", note: "..." },
  addictPct:     { ref: "lopez2011", conf: "derived", note: "..." },
  pctAsExpected: { ref: "maryland_rad", conf: "measured", note: "..." },
  margin:        { ref: "gable2006", conf: "derived", note: "..." },
}
```

Confidence levels:

- **measured** — directly from a cited study with this specific number
- **derived** — calculated/extracted from a cited study (e.g., reading a survival curve)
- **estimated** — extrapolated from related data or clinical consensus
- **editorial** — reasonable expert opinion without empirical backing

Citation keys map to the `CITE` table at the top of `substances.js` and to full references on the Sources page.

## Setup

```bash
# Clone
git clone https://github.com/cdepman/doseguide.org.git
cd doseguide.org

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Requires Node.js 18+. Built with React 19 + Vite.

## Project structure

```
src/
├── main.jsx                         # Entry point
├── App.jsx                          # Shell: header, nav, footer, routing
├── data/
│   ├── substances.js                # All substance data (safety, addiction, supply, etc.)
│   └── combinations.js              # Drug interaction data + mechanism explanations
├── components/
│   ├── SafetyDots.jsx               # Safety indicator dots on cards
│   ├── Detail.jsx                   # Expanded substance detail + lethal dose viz
│   ├── Combos.jsx                   # Pairwise combo results + poly warnings
│   ├── Matrix.jsx                   # Full interaction matrix grid (desktop)
│   ├── InteractionsMobile.jsx       # Mobile interactions lookup (single-substance)
│   └── Charts.jsx                   # All ranking charts (safety, harm, addiction, supply)
└── views/
    ├── SubstanceIndex.jsx           # Substance directory with expand/collapse cards
    ├── CombinationChecker.jsx       # Substance picker + combo results
    └── Sources.jsx                  # Data sources page with citations
```

## Contributing

This project exists to save lives. Contributions are welcome.

### What we need most

- **Data corrections** — If a number is wrong, outdated, or missing context, please fix it. Every claim should be traceable to a source. Open an issue or PR with the correction and the source.
- **New substances** — Add substances to `src/data/substances.js` following the existing format. Every field needs a source.
- **New drug checking data** — Supply purity numbers get outdated fast. If you have access to recent drug checking data, please contribute it.
- **Mobile UX improvements** — This is a mobile-first app used by people in loud, dark, stressful environments. Readability and speed matter more than aesthetics.
- **Translations** — Harm reduction information should be available in every language.

### How to contribute

1. Fork the repo
2. Create a branch (`git checkout -b fix/cocaine-margin-data`)
3. Make your changes
4. Open a PR with a clear description of what changed and why
5. Include sources for any data changes

### What we won't accept

- Removal of safety warnings or harm information
- Changes that make substances appear safer than evidence supports
- Commercial features, tracking, or advertising
- Content that promotes drug use rather than reducing harm

## Deployment

Deployed on Netlify. `npm run build` produces a static site in `dist/`.

The `netlify.toml` config handles the build command and SPA routing.

## License

[CC BY-NC-SA 4.0](LICENSE) — Free to share and adapt for non-commercial purposes with attribution. No commercial use without permission.

---

**If someone is overdosing: Call 911. Give Narcan. Start rescue breathing.**

**If you're struggling: SAMHSA helpline 1-800-662-4357 (free, confidential, 24/7)**
