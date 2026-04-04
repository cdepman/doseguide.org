# Spec: Combination Data Sourcing & Transparency Overhaul

## Problem

DoseGuide's substance data has a rigorous per-field sourcing system (`_src` objects with `ref`, `conf`, `note`), but the combination/interaction data in `combinations.js` has no equivalent. The ~350+ ratings in the `CO` map and ~50+ mechanism explanations in the `MECH` map vary widely in evidence quality, yet they all look identical to users. For a harm reduction resource where accuracy is life-or-death, this is the single biggest transparency gap in the project.

### What's at stake

A user checking whether it's safe to combine GHB + amphetamines sees a "Caution" rating and a mechanism explanation citing Liechti 2006 — good. But a user checking LSD + caffeine sees "Caution" with no mechanism and no source — they have no way to know whether that rating reflects peer-reviewed pharmacology or a volunteer's best guess on a wiki in 2014. Both look equally authoritative.

---

## Current state audit

### What's well-sourced today

**Documented TripSit corrections** — The comment block at the top of `combinations.js` explicitly lists every deviation from TripSit v4.0 with justification:

| Correction | Source |
|---|---|
| cocaine + opioids → "dangerous" | CDC SUDORS 2023 |
| all stimulant + opioid → "dangerous" | Friedman & Shover 2023 (unmasking mechanism) |
| MDMA + SSRIs → "decrease" | Liechti 2000 |
| GHB + stimulant temporal mismatch | Liechti 2006 |
| kratom interactions added | Olsen 2019, Eudaley 2023 |

**Well-cited MECH entries** — The highest-risk mechanism explanations include inline author/year citations:

- cocaethylene: van Amsterdam 2024
- nitrous + opioids: Emmanouil & Quock 2007
- GHB + stimulants: Liechti 2006
- cannabis + alcohol THC elevation: Lukas & Orozco 2001
- antiretroviral + MDMA: Henry & Hill 1998
- gabapentin + opioids: Gomes 2017, FDA 2019
- lithium + psychedelics: Nayak 2021
- opioids + benzos: CDC 2020 statistics
- kratom + tramadol serotonin risk: Eudaley 2023
- kratom + benzos: Olsen 2019
- DXM + opioids: three overlapping mechanisms cited
- caffeine + cocaine: Pires 2004

**Sources page** — The Interactions section on `Sources.jsx` lists 12 sources with DOI links, type badges (Peer-reviewed / Government / Community), and usage descriptions.

**CITE table** — `substances.js` has 40+ short keys mapping to full references, including all mechanism-level sources.

### Where the gaps are

**Gap 1: No per-rating sourcing on the CO map.** The ~350+ combination ratings have zero per-entry attribution. There is no way to distinguish:
- A rating directly from TripSit v4.0, unmodified
- A rating DoseGuide corrected with a peer-reviewed citation
- A rating DoseGuide added that didn't exist in TripSit (e.g., medication combos)

For substance data, you have `_src.harm.ref = "nutt2010"` with `conf = "measured"`. For combination data, `cocaine+opioids: "dangerous"` is just a string — no ref, no confidence level, no note.

**Gap 2: Many MECH entries lack citations.** Roughly half the mechanism explanations state pharmacological facts without attributing them. Examples:

| Entry | Text (abbreviated) | Issue |
|---|---|---|
| alcohol + GHB | "Both enhance GABA. Combined sedation causes respiratory arrest." | No citation. |
| alcohol + opioids | "Both slow breathing. The #1 accidental drug death combination." | "#1" is a statistical claim — needs CDC or similar. |
| alcohol + benzos | "Both act on GABA receptors. Together they suppress breathing far more than either alone." | No citation. |
| GHB + opioids | "Both suppress GABA and breathing. Combined effect is synergistic." | "Synergistic" is a specific pharmacological claim. |
| opioids + tramadol | "Stacking opioids. Additive respiratory depression plus tramadol's seizure risk." | Tramadol seizure risk needs citation. |
| fentanyl + benzos | "Fentanyl already has almost no safety margin — adding any benzo removes what little margin exists." | No citation. "Most common combination found in overdose deaths" needs CDC. |
| MDMA + MAOIs | "Can be rapidly fatal. MAOIs prevent serotonin breakdown while MDMA floods the synapse with serotonin." | Correct but uncited. Boyer & Shannon 2005 covers this. |
| stimulant + stimulant entries | Describe cardiovascular stacking without citation. | Could cite Mittleman 1999 or similar. |

These are all pharmacologically correct, but they're presented identically to entries that DO cite specific studies. A reader (or a critical reviewer) can't tell the difference.

**Gap 3: No confidence levels for interaction ratings.** Substance data has four tiers: `measured`, `derived`, `estimated`, `editorial`. Combination data has none. A TripSit-sourced `lsd+caffeine: "caution"` looks identical to a peer-review-corrected `cocaine+opioids: "dangerous"`.

**Gap 4: "Synergy" ratings have no mechanism notes.** Entries like `lsd+ketamine: "synergy"`, `mushrooms+nitrous: "synergy"`, `dmt+cannabis: "synergy"` carry real risks at high doses. Users see a green "synergy" icon with the generic description "Effects are amplified" but no explanation of what that amplification means physiologically or why dose caution matters.

**Gap 5: "Decrease" ratings may mislead.** The generic description "One reduces the other's effects" could lead users to re-dose, which is the actual danger. Some decrease entries (like SSRIs + psychedelics) have clinical significance worth noting — others (like alcohol + psychedelics) are straightforward. None have mechanism notes.

**Gap 6: Medication combo sources are class-level, not pair-level.** The CYP inhibitor, gabapentin, bupropion, PDE5, antiretroviral, and methadone entries are well-reasoned pharmacologically and cite relevant papers. But individual pairings (e.g., `gabapentin+alcohol`, `bupropion+caffeine`) inherit from a class-level mechanism without per-pair evidence.

---

## Proposed changes

### 1. Add `CO_SRC` — per-rating source and confidence metadata

Create a parallel export in `combinations.js` that provides sourcing metadata for every combination rating.

```js
// Source and confidence for each CO rating
// src: "tripsit" = TripSit v4.0 unmodified
//      "dg_corrected" = DoseGuide changed from TripSit with citation
//      "dg_added" = DoseGuide original (not in TripSit)
// ref: CITE key for the supporting evidence (null = community consensus only)
// note: brief justification (optional, for corrected/added entries)

export const CO_SRC = {
  // ── CORRECTIONS FROM TRIPSIT ──
  "cocaine+opioids":      { src: "dg_corrected", ref: "cdc_sudors", note: "TripSit: unsafe. Upgraded: 79% of cocaine deaths co-involve opioids (CDC SUDORS 2023)." },
  "cocaine+fentanyl":     { src: "dg_corrected", ref: "cdc_sudors", note: "TripSit: unsafe. Upgraded: fentanyl-involved polysubstance death data." },
  "amphetamines+opioids": { src: "dg_corrected", ref: "friedman2023", note: "TripSit: caution. Upgraded: stimulant unmasking mechanism (Friedman & Shover 2023)." },
  "amphetamines+fentanyl":{ src: "dg_corrected", ref: "friedman2023", note: "TripSit: caution. Upgraded." },
  "methamphetamine+opioids":{ src: "dg_corrected", ref: "friedman2023", note: "TripSit: caution. Upgraded." },
  "methamphetamine+fentanyl":{ src: "dg_corrected", ref: "friedman2023", note: "TripSit: caution. Upgraded." },
  "mdma+ssri":            { src: "dg_corrected", ref: "liechti2000", note: "TripSit: caution/unsafe. Changed to decrease: SSRIs block MDMA (Liechti 2000)." },
  "mdma+fentanyl":        { src: "dg_corrected", ref: null, note: "TripSit: caution. Upgraded to dangerous: serotonergic opioid + serotonin releaser." },

  // ── DOSEGUIDE ADDITIONS (not in TripSit) ──
  "gabapentin+opioids":   { src: "dg_added", ref: "gomes2017", note: "FDA 2019 black box warning. 90% of gabapentin deaths also involve opioids." },
  "gabapentin+fentanyl":  { src: "dg_added", ref: "fda2019_gaba", note: "Leading combination in overdose deaths." },
  "antiretroviral+mdma":  { src: "dg_added", ref: "henry1998", note: "Fatal interaction documented. CYP2D6/3A4 inhibition." },
  "bupropion+mdma":       { src: "dg_added", ref: "schmid2015", note: "Seizure threshold + serotonergic interaction." },
  "cyp_inhibitor+mdma":   { src: "dg_added", ref: "henry1998", note: "Class-level CYP inhibition. 2-10x blood level increase." },
  // ... (all medication combos are dg_added)

  // ── ALL OTHER ENTRIES: TripSit unmodified ──
  // Everything not listed above defaults to { src: "tripsit", ref: "tripsit", note: null }
};

// Helper: look up source for a combo, defaulting to TripSit
export function getCoSrc(a, b) {
  const key = [a, b].sort().join("+");
  return CO_SRC[key] || CO_SRC[a + "+" + b] || CO_SRC[b + "+" + a]
    || { src: "tripsit", ref: "tripsit", note: null };
}
```

**Why a separate object instead of modifying CO?** The CO map is a compact lookup table used in hot rendering paths. Merging metadata into it would bloat every entry. A parallel object keeps the rating lookups fast and the metadata accessible when needed.

**Effort estimate:** Medium. Requires cataloging every correction and addition (the comment block at the top already lists most of them), then marking everything else as `tripsit`. The default-to-TripSit pattern means you only need explicit entries for corrections and additions — maybe 30-40 entries.

### 2. Add citations to all uncited MECH entries

Every mechanism explanation that makes a pharmacological claim should cite at least one source. For well-established pharmacology (e.g., "GABA synergism causes respiratory depression"), a review article or textbook reference is sufficient — it doesn't need to be a novel finding.

**Recommended citations for currently uncited MECH entries:**

| MECH entry | Recommended citation | Notes |
|---|---|---|
| alcohol + GHB | Busardò & Jones 2015 (already in CITE table) | GHB pharmacology review covers GABA synergism |
| alcohol + opioids | Jones & McAninch 2015 (Am J Prev Med) | Already cited in README for benzo+opioid deaths; covers polysubstance respiratory depression |
| alcohol + fentanyl | Same as above + DEA fentanyl lethal dose data | |
| alcohol + benzos | FDA opioid+benzo black box communication 2016 or Jones & McAninch 2015 | |
| alcohol + tramadol | Tramadol seizure threshold: Ryan & Isbister 2015 (J Toxicol Clin Toxicol) | New citation needed |
| alcohol + ketamine | Aspiration risk: general anesthesia literature, or Schep et al. 2012 (Clin Toxicol) | New citation needed |
| GHB + opioids | Busardò & Jones 2015 | Already in CITE |
| GHB + fentanyl | Same | |
| GHB + benzos | Same | |
| opioids + fentanyl | CDC SUDORS or NIDA overdose data | |
| opioids + tramadol | Codd 1995 (already in CITE) for serotonergic mechanism | |
| opioids + MAOIs | Boyer & Shannon 2005 (already in CITE) | |
| fentanyl + benzos | CDC SUDORS; Jones & McAninch 2015 | |
| MDMA + amphetamines | Boyer & Shannon 2005 for serotonin syndrome risk | |
| MDMA + DXM | Boyer & Shannon 2005 | |
| MDMA + MAOIs | Boyer & Shannon 2005 | |
| MDMA + GHB | Liechti 2006 (already cited in the GHB+stimulant entries) | |
| cocaine + poppers | Cheitlin 1999 (already in CITE for PDE5) — vasodilation + vasoconstriction | |
| stimulant stacking | Mittleman 1999 (already in CITE) for cardiac risk | |

**Pattern for adding citations to existing MECH text:** Append `(Author Year)` at the end or after the specific claim, matching the style of the already-cited entries. Example:

```js
// BEFORE:
"alcohol+ghb": "Both enhance GABA. Combined sedation causes respiratory arrest. Even one drink with G can knock you out.",

// AFTER:
"alcohol+ghb": "Both enhance GABA-A and GABA-B receptors. Combined sedation causes respiratory arrest — GHB's steep dose-response curve makes this especially unpredictable (Busardò & Jones 2015). Even one drink with G can knock you out.",
```

**Effort estimate:** Small-medium. Most citations are already in the CITE table. ~15-20 MECH entries need updates. Maybe 3-5 new CITE keys needed.

### 3. Add MECH entries for "synergy" and key "decrease" ratings

Users see "synergy" as a green badge that feels safe, but psychedelic + dissociative combos at high doses can cause dangerous psychological crises, and some synergistic combinations have real physiological risks worth noting.

**Priority synergy entries to add:**

```js
"lsd+ketamine": "Both alter perception through different mechanisms — LSD via serotonin 5-HT2A agonism, ketamine via NMDA antagonism. The combination is more immersive than either alone. Physical risk is low, but the psychological intensity is extreme and dose-dependent. Start with half your normal dose of each.",

"mushrooms+nitrous": "N₂O dramatically intensifies the psychedelic peak for 30-60 seconds. The experience can be overwhelming and disorienting. Physical risk is low — the main danger is falling or losing awareness of surroundings during the brief but intense dissociation.",

"lsd+mushrooms": "Combining classical serotonergic psychedelics produces cross-potentiation at 5-HT2A receptors. The result is more intense than higher doses of either alone. Not physically dangerous, but psychological overwhelm risk is high.",

"dmt+cannabis": "Cannabis extends and intensifies DMT's effects, likely via cannabinoid modulation of serotonergic signaling. THC can increase anxiety during the experience.",

"mushrooms+ketamine": "Serotonergic + NMDA antagonism. Deeply immersive combination. No significant physiological interaction, but the combined dissociation makes navigation and communication very difficult.",
```

**Priority decrease entries to add:**

```js
"ssri+lsd": "SSRIs dampen or block LSD's effects by occupying 5-HT2A receptor sites. This often leads to re-dosing, which is risky if the SSRI is discontinued later — full psychedelic effects return at what was previously a 'non-working' dose (Bonson & Murphy 1996).",

"ssri+mushrooms": "Same mechanism as SSRIs + LSD — serotonin reuptake inhibition reduces psilocin's ability to activate 5-HT2A. Dose escalation while on SSRIs is common but creates risk if SSRIs are stopped.",

"alcohol+lsd": "Alcohol dulls psychedelic effects, which can lead to drinking more than intended. The combination isn't physically dangerous, but alcohol impairs judgment in an already judgment-altering state.",

"benzodiazepine+lsd": "Benzodiazepines are commonly used to 'abort' difficult psychedelic experiences — they reduce intensity and anxiety. This is a known harm reduction technique, not a recreational combination.",
```

**Effort estimate:** Small. These are brief editorial entries based on well-established pharmacology. Mark them as `conf: "editorial"` in CO_SRC.

### 4. Surface sourcing transparency in the UI

The data improvements above are only valuable if users can see them. Three tiers of UI changes, from simplest to most ambitious:

#### Tier 1: Badge on the combo result (minimal effort)

Add a small text badge below each mechanism explanation showing the source type. This uses the `getCoSrc()` helper.

```
✕ Dangerous
Can kill. Respiratory arrest, serotonin syndrome, seizures, or cardiac arrest.

WHY: Both suppress breathing. Combined effect is multiplicative, not additive...

📎 Source: DoseGuide correction from TripSit · CDC SUDORS 2023
```

vs.

```
⚠ Caution
Unpredictable interactions possible.

📎 Source: TripSit v4.0
```

Implementation: In `Combos.jsx`, `InteractionsMobile.jsx`, and `Matrix.jsx`, after the MECH text, render a small line from `getCoSrc()`. Style it in muted monospace to match the existing "WHY:" label.

#### Tier 2: Source summary on the Sources page

Add a paragraph to the Interactions section of `Sources.jsx` that breaks down the numbers:

> "DoseGuide tracks X combination ratings across Y substances. Z ratings come directly from TripSit v4.0 (community). N ratings have been corrected or added by DoseGuide using peer-reviewed literature. M mechanism explanations cite specific studies."

This is a static count you can compute at build time or hardcode.

#### Tier 3: Filterable transparency on the Matrix view

On the full interaction matrix (`Matrix.jsx`), add a toggle: "Highlight DoseGuide corrections." When on, cells that DoseGuide has corrected from TripSit get a subtle border or glow, and cells that are DoseGuide additions (medications, etc.) get a different indicator. This lets a pharmacology reviewer quickly scan for editorial decisions.

**Effort estimate for all three tiers:** Tier 1 is ~1-2 hours. Tier 2 is ~30 minutes. Tier 3 is ~2-3 hours.

### 5. Add new CITE keys for gap-filling citations

These are sources that would strengthen existing MECH entries but aren't yet in the CITE table:

```js
// New CITE keys to add to substances.js

jones2015:      "Jones & McAninch. Emergency department visits and overdose deaths from combined use of opioids and benzodiazepines. Am J Prev Med 49(4):493-501, 2015.",

white1999:      "White & Irvine. Mechanisms of fatal opioid overdose. Addiction 94(7):961-972, 1999.",

ryan2015:       "Ryan & Isbister. Tramadol overdose causes seizures and respiratory depression but serotonin toxicity appears unlikely. Clin Toxicol 53(6):545-550, 2015.",

schep2012:      "Schep et al. The clinical toxicology of ketamine. Clin Toxicol 50(4):225-236, 2012.",

bonson1996:     "Bonson & Murphy. Alterations in responses to LSD in humans associated with chronic administration of tricyclics, MAOIs, or lithium. Behav Brain Res 73:229-233, 1996.",

fda2016_benzo:  "FDA Drug Safety Communication: FDA warns about serious risks and death when combining opioid pain or cough medicines with benzodiazepines. August 2016.",
```

These must also be added to the Sources page and (for primary sources) the README, per the three-place rule in CLAUDE.md.

### 6. Update CLAUDE.md with combination sourcing rules

Add to the Critical Rules section:

```markdown
### Combination Data Sourcing
Every entry in the CO map has a corresponding entry in CO_SRC:
- `src` — "tripsit" | "dg_corrected" | "dg_added"
- `ref` — CITE key for supporting evidence (null only for unmodified TripSit)
- `note` — justification for corrections and additions

When adding or changing a combination rating:
1. Update the CO map entry
2. Add/update the CO_SRC entry with ref and note
3. Add/update the MECH entry with an inline citation
4. Add any new CITE keys to the CITE table, Sources page, and README

When adding a mechanism explanation:
- Every pharmacological claim must cite at least one source
- Use inline (Author Year) format, matching existing MECH style
- Well-established pharmacology can cite a review article
- Novel or surprising claims need a primary research citation
```

---

## Implementation order

| Priority | Task | Effort | Impact |
|---|---|---|---|
| 1 | Add citations to uncited MECH entries (#2) | Small-med | High — fixes the most visible credibility gap |
| 2 | Create CO_SRC with per-rating metadata (#1) | Medium | High — enables all downstream transparency |
| 3 | Add MECH entries for synergy/decrease combos (#3) | Small | Medium — fills user-facing information gaps |
| 4 | Tier 1 UI: source badges on combo results (#4) | Small | High — makes transparency visible to users |
| 5 | Add new CITE keys (#5) | Small | Medium — supports #2 |
| 6 | Update CLAUDE.md (#6) | Tiny | Medium — prevents future regressions |
| 7 | Tier 2 UI: source summary on Sources page (#4) | Tiny | Low-medium |
| 8 | Tier 3 UI: matrix highlighting (#4) | Medium | Low — reviewer-facing, not user-facing |

---

## Out of scope (but worth noting)

**TripSit v4.0 itself is not peer-reviewed.** The bulk of the CO map inherits from a community wiki. This is the reality of drug combination data — there simply aren't randomized controlled trials for most two-drug recreational combinations. TripSit is the best available community-curated dataset, it's widely used by harm reduction organizations, and it's conservative by default. The goal of this spec is not to replace TripSit but to be transparent about what comes from TripSit vs. what DoseGuide has independently verified.

**Missing combinations.** The CO map has `null` (no data) for some pairs. This is handled well in the UI with "Absence ≠ safety" messaging. No action needed.

**Poly-substance interactions (3+ drugs).** The `Combos.jsx` component already generates class-level warnings for multiple depressants, serotonergics, and stimulants. These are pharmacologically sound and well-written. Sourcing them individually would be ideal but is low priority — the pairwise data is the foundation.

---

## Success criteria

After implementation:

1. Every combination rating in the CO map can be traced to either TripSit v4.0 or a specific peer-reviewed source via CO_SRC.
2. Every MECH entry that makes a pharmacological claim includes at least one inline citation.
3. Users can see, directly in the combo results UI, whether a rating comes from TripSit or from DoseGuide's peer-reviewed corrections.
4. The "synergy" and "decrease" categories have mechanism notes for the most commonly checked pairs.
5. CLAUDE.md documents the sourcing rules so future contributions maintain the standard.
6. Every new CITE key appears in all three places (CITE table, Sources page, README).