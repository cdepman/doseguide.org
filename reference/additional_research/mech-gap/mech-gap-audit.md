# MECH Gap Audit — 36 Missing Mechanism Explanations

Audit date: 2026-04-01
Method: Programmatic comparison of all CO entries rated "dangerous" or
"unsafe" against MECH keys. Both sorted and unsorted key variants checked.

Result: **5 dangerous + 31 unsafe = 36 total gaps.**

## How to apply

Add all entries below to the `MECH` object in `src/data/combinations.js`.
Keys are alphabetically sorted to match the `getMech()` lookup pattern.

---

## DANGEROUS — 5 missing

```js
"amphetamines+fentanyl": "Fentanyl contamination of Adderall/amphetamine pills has been documented. Stimulant effects mask opioid respiratory depression — when the amphetamine wears off (4-6 hrs), full respiratory depression hits without warning. This temporal mismatch kills.",

"fentanyl+methamphetamine": "The 'goofball' combo. Meth masks fentanyl's respiratory depression while active, but meth wears off (8-12 hrs) while fentanyl metabolites persist. The unmasking effect causes sudden respiratory failure. CDC: stimulant-involved OD deaths with co-involved synthetic opioids rose from ~5,000 (2015) to ~35,000 (2022).",

"fentanyl+nitrous": "Nitrous triggers endogenous opioid peptide release (enkephalins, dynorphins) in the brainstem — equivalent to ~10-15mg morphine. Adding this to fentanyl creates convergent opioid receptor activation in the preBötzinger complex (brainstem breathing center). Nitrous also suppresses the hypoxic ventilatory drive by 50% at just 0.1 MAC, eliminating the body's last-resort oxygen-sensing safety reflex.",

"ghb+pcp": "GHB causes dose-dependent respiratory depression and loss of consciousness. PCP causes dissociative anesthesia and behavioral unpredictability. Combined: the person cannot recognize or respond to overdose symptoms, aspiration risk is extreme (PCP-induced vomiting + GHB-induced unconsciousness), and bystanders may mistake PCP agitation for alertness while GHB is suppressing breathing.",

"pcp+tramadol": "PCP blocks NMDA receptors, which potentiates opioid effects on brainstem respiratory centers. Tramadol adds opioid respiratory depression plus serotonin reuptake inhibition. PCP's stimulant-like effects mask tramadol's sedation. Combined seizure risk from both tramadol's threshold-lowering and PCP's excitatory neurotoxicity.",
```

## UNSAFE — 31 missing

```js
"2cx+cocaine": "2C-x compounds are potent 5-HT2A agonists with significant cardiovascular effects (vasoconstriction, tachycardia). Cocaine adds dopamine/norepinephrine reuptake inhibition on top. Combined sympathomimetic load creates severe hypertension, arrhythmia, and hyperthermia risk. 2C-B's steep dose-response curve makes any interaction that alters its metabolism unpredictable.",

"2cx+methamphetamine": "Both produce strong sympathomimetic stimulation. Methamphetamine's dopamine/norepinephrine flood combined with 2C-x serotonergic effects creates a multi-neurotransmitter storm — risk of serotonin syndrome, severe hypertension, cardiac arrhythmia, and psychosis. Meth's long duration (8-12+ hrs) means sustained cardiovascular strain alongside the psychedelic effects.",

"alcohol+amphetamines": "Amphetamines mask alcohol's sedative warning signs — you feel sober while your BAC keeps climbing. Studies show the combination increases heart rate beyond what amphetamines cause alone. When the stimulant wears off, full alcohol intoxication and poisoning hit without warning. No unique toxic metabolite forms (unlike cocaine+alcohol), but the masked-overdose mechanism is the same.",

"alcohol+dxm": "Both are CNS depressants, but through different mechanisms: alcohol potentiates GABA-A receptors while DXM blocks NMDA receptors and inhibits serotonin reuptake. Combined: additive sedation, impaired motor control, and respiratory depression. DXM's serotonergic effects plus alcohol's GABA effects create unpredictable sedation depth. High aspiration risk from vomiting while sedated.",

"alcohol+mdma": "MDMA causes dehydration and hyperthermia. Alcohol is a diuretic that worsens dehydration. Combined: amplified overheating risk, especially in hot environments. Alcohol also impairs judgment about redosing and water intake. Additionally, both are hepatotoxic — MDMA's reactive metabolites plus alcohol's acetaldehyde stress the liver through parallel pathways.",

"alcohol+methamphetamine": "Same masked-intoxication mechanism as alcohol+amphetamines, but worse: meth lasts 8-12+ hours. Human studies (Mendelson 1995) showed meth reduced subjective alcohol effects while not reducing blood alcohol levels. Heart rate increased 24 bpm beyond meth alone. Prolonged cardiovascular strain from opposing autonomic effects.",

"alcohol+nitrous": "Both enhance GABA-A receptor function and both block NMDA receptors — dual suppression of excitatory neurotransmission. Alcohol causes vomiting; nitrous suppresses protective airway reflexes (gag, cough). Combined sedation prevents clearing the airway. Critical aspiration risk. Acute hypoxia from N₂O displacement of oxygen is worsened by alcohol's respiratory depression.",

"alcohol+poppers": "Both cause vasodilation and blood pressure drops through different mechanisms: alcohol via CNS depression and peripheral vasodilation, poppers via nitric oxide release. Combined: severe hypotension, dizziness, fainting, risk of head injury from falls. Both impair judgment. Poppers + alcohol can trigger reflex tachycardia that stresses the heart.",

"amphetamines+dxm": "DXM inhibits serotonin reuptake; amphetamines release serotonin, dopamine, and norepinephrine. Combined serotonergic load creates serotonin syndrome risk. Both raise blood pressure and heart rate through different mechanisms. DXM's NMDA antagonism can produce unpredictable dissociative effects on top of stimulant activation — psychological crisis plus cardiovascular emergency.",

"amphetamines+methamphetamine": "Stacking the same drug class. Both release dopamine, norepinephrine, and serotonin through monoamine transporter reversal. Additive cardiovascular strain — severe tachycardia, hypertension, and risk of stroke, heart attack, or aortic dissection. Neurotoxicity risk is amplified. No pharmacological reason to combine; one will always be in excess.",

"amphetamines+pcp": "Both increase catecholamine levels: amphetamines via transporter reversal, PCP via dopamine reuptake inhibition. Combined: extreme sympathomimetic activation, psychosis, hyperthermia, seizures. PCP's dissociative anesthesia means pain signals are absent, so you can't feel cardiovascular distress or overheating. Behavioral unpredictability makes the situation dangerous for everyone nearby.",

"benzodiazepine+dxm": "Both are CNS depressants through different pathways: benzodiazepines enhance GABA-A, DXM blocks NMDA and inhibits serotonin reuptake. Combined sedation and respiratory depression. DXM's dissociative effects at high doses plus benzo sedation can produce prolonged unconsciousness with suppressed airway reflexes. Aspiration risk is high.",

"benzodiazepine+nitrous": "Nitrous acts directly through the benzodiazepine binding site on GABA-A receptors — its anxiolytic effects are blocked by flumazenil. Combining nitrous with an actual benzodiazepine produces maximal GABA-A receptor potentiation. Profound sedation, respiratory depression, loss of protective airway reflexes. Cross-tolerance exists between the two, but combining them overwhelms it.",

"benzodiazepine+pcp": "PCP causes dissociative anesthesia, agitation, and psychosis. Benzodiazepines are often used to manage PCP agitation — but recreational co-use is different from clinical management. Excessive benzo doses on top of PCP can cause deep sedation and respiratory depression that PCP's stimulant-like effects initially mask. When PCP wears off first, unmasked benzo sedation can stop breathing.",

"cocaine+dxm": "Cocaine blocks dopamine, norepinephrine, and serotonin reuptake. DXM also inhibits serotonin reuptake and blocks NMDA receptors. Combined serotonergic load creates serotonin syndrome risk. Opposing cardiovascular effects (cocaine vasoconstriction vs. DXM's potential hypotension at high doses) create unpredictable hemodynamic instability. Seizure risk from both drugs.",

"cocaine+ghb": "Cocaine masks GHB's sedation, making it impossible to gauge how deep the GHB depression is. When cocaine's short action (20-90 min) wears off, GHB's full sedation hits suddenly. GHB has one of the steepest dose-response curves of any drug — the difference between recreational dose and fatal dose is small. Adding cocaine-induced timing uncertainty to GHB's narrow margin is extremely dangerous.",

"cocaine+pcp": "Both increase catecholamine levels: cocaine via reuptake inhibition, PCP via dopamine reuptake inhibition and NMDA antagonism. Combined: extreme cardiovascular strain (severe hypertension, tachycardia, arrhythmia), high risk of stroke. PCP's dissociative anesthesia eliminates awareness of chest pain or cardiac distress. Psychosis risk compounds. Behavioral volatility from both drugs together.",

"cocaine+tramadol": "Cocaine blocks serotonin reuptake; tramadol is also a serotonin reuptake inhibitor and weak opioid agonist. Combined serotonergic load creates serotonin syndrome risk. Both lower seizure threshold independently — combined seizure risk is significant. Cocaine's cardiovascular effects (vasoconstriction, tachycardia) are additive with tramadol's cardiac effects.",

"dmt+pcp": "Both produce profound alterations of consciousness through different mechanisms: DMT via 5-HT2A agonism, PCP via NMDA antagonism and dopamine reuptake inhibition. Combined: complete dissociation from reality with no ability to self-assess safety. PCP's stimulant effects can drive dangerous behavior while DMT's hallucinatory state prevents reality-testing. Cardiovascular strain from combined sympathomimetic activation.",

"dxm+ghb": "Both are CNS depressants: DXM blocks NMDA and inhibits serotonin reuptake, GHB agonizes GABA-B and GHB receptors. Combined sedation and respiratory depression. GHB's steep dose-response curve is made even more dangerous by DXM's additive CNS depression. Both cause vomiting — combined aspiration risk during unconsciousness is extreme.",

"dxm+kratom": "Both have opioid activity: DXM and its metabolite dextrorphan act on sigma and mu-opioid receptors, kratom's mitragynine and 7-hydroxymitragynine are mu-opioid agonists. Additive respiratory depression. DXM also inhibits serotonin reuptake, and kratom has serotonergic activity — combined serotonin syndrome risk. Both are metabolized by CYP2D6 and CYP3A4, creating pharmacokinetic competition that elevates blood levels unpredictably.",

"dxm+methamphetamine": "DXM inhibits serotonin reuptake; meth releases serotonin, dopamine, and norepinephrine. High serotonin syndrome risk — potentially fatal. Both raise body temperature independently. Meth's long duration (8-12+ hrs) means sustained serotonergic load. DXM's NMDA antagonism can amplify meth-induced psychosis. Cardiovascular strain from combined sympathomimetic effects.",

"dxm+opioids": "DXM interacts with opioids via three distinct pathways. First: serotonin syndrome — DXM is a potent serotonin reuptake inhibitor (Ki = 40 nM), and serotonergic opioids (tramadol, fentanyl) also increase synaptic serotonin. Second: CYP2D6 competition — DXM, codeine, oxycodone, and hydrocodone compete for the same enzyme, elevating blood levels of both. Third: DXM's NMDA antagonism potentiates opioid respiratory depression in the brainstem.",

"ghb+nitrous": "Both are CNS depressants through different mechanisms: GHB via GABA-B/GHB receptors, nitrous via GABA-A potentiation and NMDA antagonism. GHB already has an extremely steep dose-response curve. Nitrous adds acute respiratory depression and hypoxia on top. Both cause loss of consciousness — combined aspiration risk is severe. Nitrous's short duration means multiple re-dosing, each time adding to GHB's cumulative effect.",

"ghb+poppers": "GHB causes dose-dependent sedation and vasodilation. Poppers cause extreme vasodilation via nitric oxide release. Combined: severe hypotension and potential cardiovascular collapse. GHB's narrow safety margin is further compressed by poppers' hemodynamic effects. Both impair consciousness — the person may lose the ability to self-rescue from a blood pressure crisis.",

"kratom+pcp": "Both affect opioid systems: kratom via mu-opioid partial agonism, PCP via kappa-opioid agonism and NMDA antagonism. PCP's dissociative anesthesia masks kratom's sedative effects, making it impossible to gauge CNS depression depth. PCP's behavioral unpredictability combined with kratom's opioid effects creates risk of respiratory depression hidden behind apparent stimulation.",

"mdma+pcp": "Both increase serotonin levels: MDMA via transporter reversal, PCP via reuptake inhibition. Serotonin syndrome risk. Both cause hyperthermia through different mechanisms. PCP's dissociative anesthesia prevents recognition of overheating or cardiac distress. MDMA's empathogenic effects combined with PCP's psychosis-inducing properties creates an extremely unpredictable psychological state. Cardiovascular strain from combined sympathomimetic activation.",

"nitrous+opioids": "Nitrous triggers endogenous opioid peptide release (enkephalins, dynorphins) in the brainstem periaqueductal gray — the analgesic effect of 30% N₂O equals approximately 10-15 mg morphine, and is blocked by naloxone. Co-administering exogenous opioids means both endogenous and exogenous opioids converge on μ-opioid receptors in the preBötzinger complex (brainstem breathing center), producing synergistic respiratory depression. Additionally, nitrous suppresses the hypoxic ventilatory drive by 50%, eliminating the body's oxygen-sensing safety reflex.",

"nitrous+pcp": "Both are NMDA antagonists (dissociatives). Combined: extreme dissociation with total loss of environmental awareness and motor control. PCP's stimulant effects may drive movement while nitrous causes acute cognitive impairment — high risk of physical injury. Both affect GABA systems. PCP's long duration means nitrous re-dosing during a PCP experience repeatedly stacks dissociative depth.",

"nitrous+poppers": "Both cause acute cardiovascular changes: nitrous displaces oxygen and affects cardiac rhythm, poppers cause severe vasodilation and methemoglobinemia. Combined: acute hypoxia (nitrous displacing O₂) plus impaired oxygen-carrying capacity (poppers creating methemoglobin) plus vasodilation (poppers) creates a triple threat to tissue oxygenation. Risk of syncope, cardiac arrhythmia, and cerebral hypoxia.",

"nitrous+tramadol": "Nitrous releases endogenous opioids in the brainstem, adding to tramadol's mu-opioid agonism. Combined respiratory depression through convergent opioid pathways. Tramadol is also a serotonin reuptake inhibitor — while nitrous's serotonergic effects are minimal, the combined sedation and respiratory depression is the primary danger. Tramadol's seizure-threshold lowering adds another risk layer.",
```

---

## ALSO FIX: kratom+ssri duplicate key

The reviewer flagged that `kratom+ssri` appears in CO as `"low_risk"` in the
kratom block AND may be silently overwritten by a later entry. In JS object
literals, duplicate keys silently keep the last value.

**Action:** Search combinations.js for ALL duplicate CO keys before adding
any new entries. Run this check:

```js
// Build-time or test-time duplicate check
const keys = Object.keys(CO);
const seen = new Set();
for (const k of keys) {
  const sorted = k.split('+').sort().join('+');
  if (seen.has(sorted)) console.error(`DUPLICATE: ${k} (sorted: ${sorted})`);
  seen.add(sorted);
}
```

For `kratom+ssri` specifically: the correct rating based on our research is
**"low_risk"** — kratom has serotonergic activity but case reports of
serotonin syndrome involve multiple serotonergic agents, not just
kratom + one SSRI. However, if the medications spec adds `kratom+ssri` as
`unsafe` (based on CYP inhibition and case reports), that takes precedence
over the TripSit baseline. **Decision needed from Charlie: low_risk or
unsafe?** The pharmacological evidence supports **"caution"** as a
compromise — serotonin syndrome is possible but requires additional risk
factors.

---

## ALSO FIX: Charts.jsx addiction headline

The reviewer noted the chart headline says "dependence within 10 years" but
some values are 24-month estimates. Fix:

```
OLD (Charts.jsx ~line 143):
"Chance of developing dependence within 10 years of first use"

NEW:
"Estimated likelihood of developing dependence"
```

And add a footnote below the chart:
```
"Timeframes vary by source: tobacco/alcohol/cocaine from Anthony 1994 (lifetime);
hallucinogens from Stone 2007 (24 months). See substance detail pages for per-field sourcing."
```

---

## ALSO FIX: Sources.jsx provenance claim

```
OLD (Sources.jsx ~line 71):
"Every piece of data in this tool can be traced to a specific study"

NEW:
"We cite primary sources wherever possible. Fields are annotated with
confidence tiers: measured (direct from peer-reviewed data), derived
(calculated from primary sources), estimated (informed approximation),
or editorial (team judgment). See each substance's detail page for
per-field sourcing."
```

---

## Summary of all changes in this audit

| File | Change | Priority |
|---|---|---|
| `src/data/combinations.js` | Add 36 MECH entries (5 dangerous, 31 unsafe) | **High** |
| `src/data/combinations.js` | Deduplicate kratom+ssri, decide on rating | **High** |
| `src/data/combinations.js` | Add build-time duplicate key check | **Medium** |
| `src/components/Charts.jsx` | Fix addiction chart headline + add footnote | **Medium** |
| `src/views/Sources.jsx` | Fix provenance claim language | **Medium** |