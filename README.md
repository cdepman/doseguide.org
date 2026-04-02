# DoseGuide.org

**Evidence-based harm reduction. Not medical advice.**

DoseGuide is an open-source harm reduction resource. It does not encourage drug use. It exists because people use drugs whether or not they have good information, and the evidence is clear that informed users have better outcomes.

All data is sourced from peer-reviewed research, government agencies, and established harm reduction organizations including the Global Drug Survey, The Lancet, DanceSafe, and SAMHSA.

This project is personal. My father, Dr. Mark Depman, spent a good part of his career as an emergency physician in Vermont working at the intersection of substance use and harm reduction. In 2025, the Vermont Association for Mental Health and Addiction Recovery established the [Dr. Mark Depman Trailblazer Award](https://vermontbiz.com/news/2025/february/18/vamhar-presents-inaugural-dr-mark-depman-trailblazer-award-recovery-day-2025) in his honor. I grew up watching him advocate for his patients and insist that compassion and evidence, not stigma and punishment, save lives and heal communities.

DoseGuide is built in that spirit.

— Charlie

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

The full list of 30+ sources with links is on the [Sources page](https://doseguide.org/#sources). Every quantitative claim has a per-field citation in the source code (see [Sourcing transparency](#sourcing-transparency) below).

### Harm scores (MCDA)
- 14 substances from **Nutt, King & Phillips 2010** (Lancet, 20 drugs, 16 criteria, expert panel)
- 4 from subsequent MCDA studies: fentanyl=90 (**Broman et al. 2025**, Harm Reduction Journal, 19 drugs, 18 criteria, 17 US experts), nitrous=6 and poppers=5 (**Ferreira et al. 2022**, Drug Science Policy & Law), DMT=5 (Broman 2025)
- 7 remaining (tramadol, kratom, DXM, 2C-x, PCP, mescaline, caffeine) are DoseGuide estimates, marked with dashed bars in charts

### Drug interactions
- Base data from **TripSit v4.0** combination chart
- **DoseGuide corrections from peer-reviewed literature**: cocaine+opioids upgraded to Dangerous (**CDC SUDORS 2023**: 47% of overdose deaths involve both), all stimulant+opioid combos upgraded (unmasking mechanism, **Friedman & Shover 2023**), MDMA+SSRIs changed to Decrease (**Liechti et al. 2000**, Neuropsychopharmacology), kratom interactions added (**Olsen et al. 2019**, MMWR), GHB+stimulant temporal mismatch added (**Liechti 2006**)
- 18 mechanism explanations cite specific papers (Boyer & Shannon 2005, Mittleman 1999, van Amsterdam 2024, Emmanouil & Quock 2007, Lukas & Orozco 2001, etc.)

### Addiction rates
- 5 with population-based survival analysis: **Lopez-Quintero et al. 2011** (NESARC n=43,093) for nicotine, alcohol, cannabis, cocaine; **Anthony et al. 1994** (NCS n=8,098) for heroin
- Hallucinogens: **Anthony 1994** (~4.9% lifetime) and **Stone et al. 2007** (NHSDA n=114,241, ~3% within 24 months)
- Amphetamines: **Anthony 1994** + **Wagner & Anthony 2002**
- Ketamine: **Barrios et al. 2025** (GDS 2018, n=130,761, convenience sample)
- Benzos: **Blanco et al. 2018** (NSDUH n=102,000) + **Anthony 1994** sedatives category
- Caffeine: **Sweeney et al. 2020** (n=1,006, DSM-5 criteria)
- MDMA, GHB, DXM, kratom, 2C-B have **no population-based capture rates** — numbers are editorial estimates clearly labeled as such

### Supply purity
- Cocaine: **DEA CY2024 Annual Cocaine Report** (~88% purity, levamisole down to ~5%)
- MDMA: **DrugsData/Sevigny & Thyssen 2024** (74% MDMA-only, 25 years of data)
- Heroin: **Maryland RAD 2021-2024** (1.9% concordance in US)
- Ketamine, LSD, amphetamine, cocaine: **Fregonese et al. 2021** (Italy GC/MS)
- Fentanyl contamination: **Lim et al. 2024** (Lancet, 11.9M NFLIS samples, 2.7% nationally)
- Tusi/pink cocaine: **Barbaro & Bouchard 2024** (94% ketamine, 0% 2C-B)
- Others are editorial estimates based on product identifiability

### Safety margins & lethal doses
- **Gable 2004** (Addiction) — lethal-to-effective dose ratios for 20 substances (heroin 6:1 through cannabis >1,000:1)
- Validated by **Lachenmeier & Rehm 2015** (Scientific Reports, margin of exposure analysis)
- Displayed in Lethal Dose Ratio chart and substance detail drawers

### Other sources
- **Dosage ranges**: PsychonautWiki
- **Psychological risk**: Global Drug Survey 2019-2021
- **Cocaine cardiac risk**: **Mittleman et al. 1999** (Circulation) — 24x MI risk within 60 min
- **CYP2D6 metabolizer rates**: **Bradford 2002** (Pharmacogenomics) — 5-10% Caucasian, ~1% East Asian
- **Fentanyl lethal dose**: DEA + EUDA drug profile — 2mg for opioid-naive individuals
- **Benzo+opioid deaths**: **Jones & McAninch 2015** (Am J Prev Med); since ~2017 stimulant-opioid deaths surpassed in absolute numbers
- **Xylazine crisis**: **Kariisa et al. 2023** (MMWR) — 20-fold increase 2015-2020
- **Cocaethylene**: **van Amsterdam et al. 2024** (J Clin Med) — 18-25x sudden death risk vs cocaine alone
- **Kratom deaths**: **Olsen et al. 2019** (MMWR) — only 4.6% of 152 kratom-positive deaths had kratom as sole substance

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
