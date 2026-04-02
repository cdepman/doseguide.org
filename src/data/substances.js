// ─────────────────────────────────────────────────────────────────────────────
// DoseGuide.org — Substance Data
// Every number should be traceable. Fields marked [E] are estimates.
// See CITE keys below and _src per substance for per-field attribution.
// ─────────────────────────────────────────────────────────────────────────────

// ── CITATION REFERENCE TABLE ─────────────────────────────────────────────────
// Short keys used in _src fields → full references on Sources page
export const CITE = {
  nutt2010:       "Nutt, King & Phillips. Drug harms in the UK: a multicriteria decision analysis. Lancet 376:1558-1565, 2010.",
  lopez2011:      "Lopez-Quintero et al. Probability and predictors of transition from first use to dependence. Drug Alcohol Depend 115(1-2):120-130, 2011. NESARC n=43,093.",
  anthony1994:    "Anthony, Warner & Kessler. Comparative epidemiology of dependence. Exp Clin Psychopharmacol 2:244-268, 1994. NCS n=8,098.",
  wagner2002:     "Wagner & Anthony. From first drug use to drug dependence. Neuropsychopharmacology 26:479-488, 2002.",
  schlag2020:     "Schlag. Percentages of problem drug use and their implications for policy making. Drug Science, Policy and Law 6, 2020.",
  gable2004:      "Gable RS. Comparison of acute lethal toxicity of commonly abused psychoactive substances. Addiction 99(6):686-696, 2004. DOI: 10.1111/j.1360-0443.2004.00744.x. Safety ratios for 20 substances.",
  gable2006:      "Gable. The toxicity of recreational drugs. American Scientist 94(3):206-208, 2006.",
  tripsit:        "TripSit Drug Combination Chart v4.0. tripsit.me.",
  drugsdata:      "DrugsData (formerly EcstasyData). drugsdata.org. Sevigny & Thyssen, Misrepresentation of MDMA in the US 1999-2023, Drug Alcohol Depend 2024.",
  maryland_rad:   "Maryland Rapid Analysis of Drugs (RAD). MDH + NIST. Statewide drug checking 2021-2024.",
  italy_gcms:     "Fregonese et al. Drug checking in recreational settings (Italy). Frontiers in Psychiatry 12:596895, 2021. GC/MS confirmed.",
  nz_drug:        "NZ Drug Foundation. Drug Checking Report 2024. 3,200+ samples.",
  uvic:           "Substance Drug Checking (UVic, Canada). Monthly reports 2023-2024. FTIR + DART-MS.",
  gds2020:        "Global Drug Survey 2020. Psychedelics self-treatment study, n=3,364.",
  gds2019:        "Global Drug Survey 2019. n=85,000+ respondents.",
  lancet_fent:    "Krawczyk et al. Fentanyl co-occurrence in stimulant samples. Lancet Regional Health Americas, 2024.",
  maps:           "MAPS Phase 2/3 MDMA-assisted therapy trials. 120mg + 60mg booster protocol.",
  psychonautwiki: "PsychonautWiki. Dosage and duration data. psychonautwiki.org.",
  nhtsa:          "NHTSA. Drugs and Human Performance Fact Sheets.",
  erowid:         "Erowid. Effect and pharmacology reference. erowid.org.",
  nta2007:        "National Treatment Agency. Overdose Preventability Study (UK, 2007). 151 overdose deaths.",
  samhsa:         "SAMHSA. National Survey on Drug Use and Health (NSDUH).",
  dea_nflis:      "DEA / NFLIS. Forensic laboratory analysis of law enforcement seizures.",
  broman2025:     "Broman et al. US drug policy does not align with experts' rankings of drug harms: a multi-criteria decision analysis. Harm Reduction J 23:17, 2025. DOI: 10.1186/s12954-025-01390-x. 19 drugs, 18 criteria, 17 US experts incl. Lawrence Phillips.",
  lachenmeier2015:"Lachenmeier & Rehm. Comparative risk assessment of alcohol, tobacco, cannabis and other illicit drugs using the margin of exposure approach. Sci Rep 5:8126, 2015.",
  stone2007:      "Stone et al. Who is becoming hallucinogen dependent soon after hallucinogen use starts? Drug Alcohol Depend 87(2-3):153-163, 2007. NHSDA 2000-2001, n=114,241.",
  sweeney2020:    "Sweeney et al. Prevalence and correlates of caffeine use disorder symptoms among a US sample. J Caffeine Adenosine Res 10(1):4-11, 2020. n=1,006.",
  bradford2002:   "Bradford LD. CYP2D6 allele frequency in European Caucasians, Asians, Africans and their descendants. Pharmacogenomics 3(2):229-243, 2002.",
  blanco2018:     "Blanco et al. Prevalence and correlates of benzodiazepine use, misuse, and use disorders among adults in the US. J Clin Psychiatry 79(6):18m12174, 2018. NSDUH n=102,000.",
  jones2015:      "Jones & McAninch. Emergency department visits and overdose deaths from combined use of opioids and benzodiazepines. Am J Prev Med 49(4):493-501, 2015.",
  barbaro2024:    "Barbaro & Bouchard. What is pink cocaine? J Medicinal Chemistry 67(23):20733-20736, 2024. 68 DrugsData samples 2016-2024.",
  dea_cocaine2024:"DEA CY2024 Annual Cocaine Report (PRB# 2025-42). Levamisole in ~5% of exhibits (down from 87% in 2017). Average purity 88%.",
  bonomo2019:     "Bonomo et al. The Australian drug harms ranking study. J Psychopharmacol 33(7):759-768, 2019. 22 drugs, MCDA.",
  ferreira2022:   "Ferreira et al. A comparative study of the harms of nitrous oxide and poppers using the MCDA approach. Drug Science, Policy and Law 8, 2022.",
  singh2014:      "Singh et al. Kratom dependence, withdrawal symptoms and craving in regular users. Drug Alcohol Depend 139:132-137, 2014. n=293 Malaysian users.",
  han2021:        "Han et al. Methamphetamine use, methamphetamine use disorder, and associated overdose deaths. JAMA Psychiatry 78(12):1329-1342, 2021. NSDUH 2015-2019.",
  mittleman1999:  "Mittleman et al. Triggering of myocardial infarction by cocaine. Circulation 99(21):2737-2741, 1999.",
  barrios2025:    "Barrios et al. Ketamine use in a large global sample. J Psychopharmacol 39(1), 2025. GDS 2018 n=130,761.",
  dijkstra2021:   "Dijkstra et al. GHB use disorder: a systematic review. Int J Drug Policy 94:103230, 2021.",
  lim2024:        "Lim et al. Fentanyl co-occurrence in stimulant samples. Lancet Regional Health Americas, 2024. 11.9M NFLIS samples.",
  delatorre2004:  "de la Torre et al. MDMA pharmacokinetics: non-linear, mechanism-based inhibition of CYP2D6. Clin Pharmacokinet 43(3):157-169, 2004.",
  nayak2021:      "Nayak et al. Classic psychedelic coadministration with lithium: retrospective analysis. J Psychopharmacol 35(4):398-401, 2021. 80 online reports: 47% seizures with lithium.",
  // ── INTERACTION/COMBINATION SOURCES ──
  liechti2000:    "Liechti et al. Acute psychological effects of MDMA after pretreatment with citalopram. Neuropsychopharmacology 22:513-521, 2000.",
  liechti2006:    "Liechti et al. GHB and MDMA co-use. Pharmacology 77(1):9-15, 2006.",
  boyer2005:      "Boyer & Shannon. The serotonin syndrome. NEJM 352(11):1112-1120, 2005.",
  olsen2019:      "Olsen et al. Notes from the field: unintentional drug overdose deaths with kratom. MMWR 68(14):326-327, 2019. 152 kratom-positive deaths.",
  eudaley2023:    "Eudaley et al. Kratom and serotonin syndrome. J Pharmacy Practice, 2023. DOI: 10.1177/08971900221116009.",
  spencer2023:    "Spencer et al. Drug overdose deaths involving stimulants. NCHS Data Brief No. 474, 2023.",
  kariisa2023:    "Kariisa et al. Xylazine-involved overdose deaths. MMWR 72(26):721-727, 2023.",
  friedman2023:   "Friedman & Shover. Charting the fourth wave: stimulant co-involvement. Addiction 118(12):2477-2485, 2023.",
  vanamsterdam2024:"van Amsterdam et al. Cocaethylene: formation, toxicology, and clinical implications. J Clin Med 13(5):1475, 2024.",
  lukas2001:      "Lukas & Orozco. Ethanol increases plasma THC levels. Drug Alcohol Depend 64(2):143-149, 2001.",
  emmanouil2007:  "Emmanouil & Quock. Advances in understanding the actions of nitrous oxide. Anesth Prog 54(1):9-18, 2007.",
  // ── MEDICATION SOURCES ──
  gomes2017:       "Gomes et al. Gabapentin, opioids, and the risk of opioid-related death: a population-based nested case-control study. PLOS Medicine 14:e1002396, 2017.",
  henry1998:       "Henry & Hill. Fatal interaction between ritonavir and MDMA. Lancet 352:1751-1752, 1998.",
  bracchi2015:     "Bracchi et al. Increasing use of party drugs in people living with HIV on antiretrovirals. AIDS 29:1585-1592, 2015.",
  cohen2021:       "Cohen et al. Concomitant drugs associated with increased mortality for MDMA users reported in a drug safety surveillance database. Sci Rep 11:5997, 2021.",
  schmid2015:      "Schmid et al. Interactions between bupropion and MDMA in healthy subjects. J Pharmacol Exp Ther 353(1):102-111, 2015.",
  cheitlin1999:    "Cheitlin et al. AHA/ACC expert consensus: use of sildenafil in patients with cardiovascular disease. Circulation 99:168-177, 1999.",
  fda2019_gaba:    "FDA Drug Safety Communication: Serious breathing problems with gabapentin and pregabalin when used with CNS depressants. December 2019.",
  // ── MECHANISM SOURCES ──
  busardo2015:    "Busardò & Jones. GHB pharmacology, clinical, forensic, and analytical toxicology. Curr Neuropharmacol 13(1):47-70, 2015.",
  finck1995:      "Finck et al. Nitrous oxide selectively releases Met5-enkephalin into canine CSF. Anesth Analg 80(4):747-752, 1995.",
  quock1993:      "Czech & Quock. N₂O anxiolytic effect mediated by benzodiazepine receptors. Psychopharmacology 113(2):211-216, 1993.",
  suen2022:       "Suen et al. Opioid-methamphetamine neurochemistry and clinical implications. Front Pharmacol 13:859563, 2022.",
  mendelson1995:  "Mendelson et al. Methamphetamine and ethanol interactions in humans. Clin Pharmacol Ther 57(5):559-568, 1995.",
  rickli2018:     "Rickli et al. Opioid-induced inhibition of the human 5-HT and noradrenaline transporters in vitro. Br J Pharmacol 175(3):532-543, 2018.",
  codd1995:       "Codd et al. Serotonin and norepinephrine uptake inhibiting activity of centrally acting analgesics. JPET 274(3):1263-1270, 1995.",
  papaseit2018:   "Papaseit et al. Human pharmacology of 2C-B: lack of serotonergic toxicity. Sci Rep 8:5378, 2018.",
  kruegel2016:    "Kruegel et al. Synthetic and receptor signaling explorations of the mitragyna alkaloids. J Am Chem Soc 138(21):6754-6764, 2016.",
  nsduh2023_halluc:"Elsey et al. Associations between individual hallucinogens and hallucinogen misuse among US adults. J Psychopharmacol 37(9):918-928, 2023. PMC10462802.",
  johnson2018:    "Johnson et al. The abuse potential of medical psilocybin according to the 8 factors of the CSA. Neuropharmacology 142:143-166, 2018.",
  zanger2013:     "Zanger & Schwab. Cytochrome P450 enzymes in drug metabolism. Pharmacol Ther 138(1):103-141, 2013.",
  bailey2013:     "Bailey et al. Grapefruit-medication interactions: forbidden fruit or avoidable consequences? CMAJ 185(4):309-316, 2013.",
  peltoniemi2016: "Peltoniemi et al. Ketamine: a review of clinical pharmacokinetics. Basic Clin Pharmacol Toxicol 118(3):238-248, 2016.",
  greenblatt2006: "Greenblatt et al. Clinical pharmacokinetics of alprazolam. Clin Pharmacokinet 80(1):33-41, 2006.",
  olkkola1999:    "Olkkola et al. Ritonavir's role in reducing fentanyl clearance. Anesthesiology 91(3):681-685, 1999.",
  dinisoliveira2017:"Dinis-Oliveira. Metabolism of psilocybin and psilocin. Drug Metab Rev 49(1):84-91, 2017.",
  manevski2010:   "Manevski et al. Glucuronidation of psilocin by human UDP-glucuronosyltransferases. Drug Metab Dispos 38(3):386-395, 2010.",
  thomann2024:    "Thomann et al. In vitro and in vivo metabolism of psilocin. Front Pharmacol 15:1391689, 2024.",
  luethi2020:     "Luethi & Liechti. Designer drugs: mechanism of action and adverse effects. Pharmacol Rev 72(4):714-769, 2020.",
  grond2004:      "Grond & Sablotzki. Clinical pharmacology of tramadol. Clin Pharmacokin 43(13):879-923, 2004.",
  antoniou2005:   "Antoniou & Tseng. Interactions between antiretrovirals and antineoplastic drug therapy. Clin Pharmacokinet 44(2):111-145, 2005.",
  harrington1999: "Harrington et al. Life-threatening interactions between HIV-1 protease inhibitors and illicit drugs. Arch Intern Med 159:2221-2224, 1999.",
  riba2003:       "Riba et al. Metabolism of N,N-dimethyltryptamine in humans. Drug Metab Dispos 31(8):1024-1031, 2003.",
};

// Confidence levels for estimated values
// "measured"  = directly from a cited study with this specific number
// "derived"   = calculated/extracted from a cited study (e.g. survival curve reading)
// "estimated" = extrapolated from related data, clinical consensus, or pharmacological reasoning
// "editorial" = reasonable but essentially expert opinion

export const CAT = {
  psychedelic:    { l: "Psychedelic",     c: "#a855f7", b: "rgba(168,85,247,0.12)" },
  stimulant:      { l: "Stimulant",       c: "#f59e0b", b: "rgba(245,158,11,0.12)" },
  depressant:     { l: "Depressant",      c: "#3b82f6", b: "rgba(59,130,246,0.12)" },
  opioid:         { l: "Opioid",          c: "#ef4444", b: "rgba(239,68,68,0.12)" },
  dissociative:   { l: "Dissociative",    c: "#06b6d4", b: "rgba(6,182,212,0.12)" },
  empathogen:     { l: "Empathogen",      c: "#ec4899", b: "rgba(236,72,153,0.12)" },
  cannabinoid:    { l: "Cannabinoid",     c: "#22c55e", b: "rgba(34,197,94,0.12)" },
  benzodiazepine: { l: "Benzodiazepine",  c: "#6366f1", b: "rgba(99,102,241,0.12)" },
  inhalant:       { l: "Inhalant",        c: "#78716c", b: "rgba(120,113,108,0.12)" },
  medication:     { l: "Medication",     c: "#94a3b8", b: "rgba(148,163,184,0.12)" },
};

export const RL = {
  synergy:  { l: "Low Risk · Synergistic",      c: "#22c55e", i: "✦", d: "Effects complement each other and are amplified." },
  low_risk: { l: "Low Risk · No Synergy",        c: "#60a5fa", i: "◉", d: "No significant interaction." },
  decrease: { l: "Low Risk · Decreased Effect",   c: "#818cf8", i: "▽", d: "One reduces the other's effects. This can lead to unintentional re-dosing." },
  caution:  { l: "Caution",                       c: "#f59e0b", i: "⚠", d: "Unpredictable interactions possible." },
  unsafe:   { l: "Unsafe",                        c: "#f97316", i: "⛔", d: "Significant risk of serious physical harm." },
  dangerous:{ l: "Dangerous",                     c: "#ef4444", i: "✕", d: "Can kill. Respiratory arrest, serotonin syndrome, seizures, or cardiac arrest." },
};

export const SRC_ICONS  = { natural: "🌿", synthetic: "🧪", "semi-synthetic": "🌿🧪", both: "🌿🧪" };
export const SRC_LABELS = { natural: "Natural", synthetic: "Synthetic", "semi-synthetic": "Semi-synthetic", both: "Natural & Synthetic" };
export const ADDICT_COLORS = ["#22c55e", "#60a5fa", "#f59e0b", "#f97316", "#ef4444"];

// ── SUBSTANCE DATA ───────────────────────────────────────────────────────────
// _src: per-field citation keys + confidence
//   ref  = CITE key (see table above)
//   conf = "measured" | "derived" | "estimated" | "editorial"
//   note = brief justification for the number
//
// Fields without _src entries are qualitative descriptions (feels, odRisk,
// longTerm) that summarize known pharmacology without quantitative claims.
// ─────────────────────────────────────────────────────────────────────────────

export const S = [
  // ═══════════════════════════════════════════════════════════════════════════
  // LSD
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"lsd",n:"LSD",cat:"psychedelic",aka:["Acid","Lucy","Tabs","Blotter"],src:"semi-synthetic",
    desc:"Classical psychedelic. One of the safest substances by every measure.",
    blurb:"First synthesized by Albert Hofmann at Sandoz Laboratories in 1938; its psychoactive properties were discovered accidentally in 1943. Extremely potent — active in microgram doses, far below what's visible to the eye. Rarely adulterated on blotter; NBOMe compounds are the main substitution risk and are bitter-tasting, unlike LSD.",
    atDose:1,atDoseLabel:"Very safe at normal doses",
    dangerRank:99,marginBest:null,marginWorst:null,marginLabel:"No known physical danger at any dose",
    marginExplain:"There is no documented case of physical death from LSD alone. Clinical studies have administered massive accidental doses (thousands of µg) without physical harm. The only real risk is psychological overwhelm — a terrifying experience, not a medical one. At ~3-5x a normal dose, the experience becomes extremely intense but your body is fine.",
    supplyRisk:2,pctAsExpected:98,supplyLabel:"~98% is real LSD",
    supplyExplain:"NBOMe compounds (dangerous!) occasionally sold as LSD. An Ehrlich reagent test turns purple for real LSD — NBOMe does not react.",
    addict:1,addictLabel:"Not addictive",addictPct:3,addictPrefix:"\u2264",addictLife:4.9,
    addictNote:"The 2-3% is a grouped hallucinogen figure that includes PCP, MDMA, and ketamine. LSD-specific rate is likely lower. Rapid 5-HT2A tolerance makes daily use essentially impossible. NIDA classifies LSD as non-addictive.",
    overwhelm:4,overwhelmLabel:"8-14 hours with no off switch — challenging experiences common",
    feels:["Euphoria","Visual patterns","Deep introspection","Synesthesia","Awe","Giggles"],
    odRisk:["Extreme psychological distress","No lethal overdose death recorded"],
    longTerm:["HPPD (rare — persistent visual disturbances)","Can surface latent psychosis","No organ damage","No dependence"],
    harm:7,routes:[{nm:"Oral / Sublingual",onset:"30–90 min",dur:"8–14 hr"}],
    dose:{threshold:"15–25 µg",light:"25–75 µg",common:"75–150 µg",strong:"150–300 µg",heavy:"300+ µg",note:"Threshold varies by individual — some feel effects at 15 µg (PsychonautWiki), others not until 25 µg (Erowid). Sensitivity differences are real and meaningful for microdosing."},
    lethal:{headline:"Nobody has ever died from taking too much LSD.",note:"No confirmed death from LSD toxicity alone. Even massive accidental doses have been survived.",cmp:"bag",sz:60,realworld:"There is no realistic amount you could fit on blotter paper that would kill you. People have accidentally taken thousands of doses and survived.",gable:{ed:"100 µg",ld:"~100 mg",ratio:"1,000:1",note:"†animal extrapolation"}},
    // ── PER-FIELD SOURCING ──
    _src:{
      harm:          {ref:"nutt2010", conf:"measured", note:"Nutt 2010 Table: LSD overall harm score = 7"},
      addictPct:     {ref:["stone2007","anthony1994","nsduh2023_halluc"], conf:"derived", note:"Stone et al. 2007 (NHSDA n=114,241): 2-3% within 24 months. Anthony 1994: ~4.9% lifetime for 'hallucinogens' (includes PCP, possibly MDMA). Using 3% as best incidence-window estimate. Not LSD-specific."},
      addictLife:    {ref:"anthony1994", conf:"derived", note:"Anthony 1994: ~4.9% for hallucinogens category. Includes PCP and possibly MDMA."},
      margin:        {ref:"gable2006", conf:"derived", note:"Gable 2006 reports safety ratio >1000:1. No documented lethal dose in humans. No physical ceiling exists."},
      pctAsExpected: {ref:"italy_gcms", conf:"measured", note:"Italy GC/MS study: LSD 100% concordance. ~98% estimate accounts for NBOMe substitution reports in broader literature."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki dosage classification."},
      routes:        {ref:"psychonautwiki", conf:"measured", note:"Onset and duration from PsychonautWiki."},
      overwhelm:     {ref:"gds2020", conf:"derived", note:"GDS 2020 found 22.5% negative psychological effects among people self-treating with LSD or psilocybin (combined figure, not LSD-specific). Rating 4/5 reflects long duration and intensity."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // PSILOCYBIN MUSHROOMS
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"mushrooms",n:"Psilocybin Mushrooms",sn:"Mushrooms",cat:"psychedelic",aka:["Shrooms","Magic Mushrooms","Caps"],src:"natural",
    desc:"Among the safest psychoactives known. Identifiable whole mushrooms.",
    blurb:"Used ceremonially in Mesoamerica for at least 2,000 years; the active compound was isolated by Albert Hofmann in 1958. Among the safest psychoactives known — no lethal dose has been established in humans. Whole mushrooms are almost never adulterated, and tea preparation produces a faster onset with shorter effects than eating them.",
    atDose:1,atDoseLabel:"Very safe",
    dangerRank:99,marginBest:null,marginWorst:null,marginLabel:"No known physical danger at any dose",
    marginExplain:"No documented death from psilocybin toxicity. You'd need to eat roughly 4 pounds of dried mushrooms. Your stomach would reject them long before that. Like LSD, the risk is psychological intensity, not physical harm.",
    supplyRisk:1,pctAsExpected:99,supplyLabel:"~99% — whole mushrooms are identifiable",
    supplyExplain:"Very rarely adulterated. Main risk is misidentified species when foraging.",
    addict:1,addictLabel:"Not addictive",addictPct:1,addictPrefix:"<",addictLife:4.9,
    addictNote:"5-HT2A agonists produce rapid tolerance within 1-3 days, making compulsive daily use pharmacologically impossible. No dopaminergic reward pathway activation.",
    overwhelm:4,overwhelmLabel:"Intense altered state — challenging experiences common",
    feels:["Visual hallucinations","Emotional waves","Euphoria","Spiritual experiences","Connection to nature","Giggles"],
    odRisk:["Extreme psychological distress","No lethal overdose death recorded"],
    longTerm:["No organ damage","No dependence","May improve depression (clinical research)","Can surface latent psychosis"],
    harm:5,routes:[{nm:"Eaten",onset:"20–60 min",dur:"4–6 hr"},{nm:"Tea",onset:"10–30 min",dur:"3–5 hr"}],
    dose:{threshold:"0.25 g",light:"0.5–1 g",common:"1–2.5 g",strong:"2.5–5 g",heavy:"5+ g"},
    lethal:{headline:"You'd have to eat nearly 4 pounds of dried mushrooms. That's physically impossible.",note:"Lethal dose estimated at ~1.7 kg dried — roughly 4 grocery bags stuffed full. Your body would reject them long before you got close.",cmp:"bag",sz:60,realworld:"Imagine eating 4 pounds of dried mushrooms in one sitting. You'd vomit long before reaching a dangerous amount. It simply cannot happen.",gable:{ed:"6 mg psilocybin",ld:"~6 g",ratio:"1,000:1",note:"†animal extrapolation"}},
    _src:{
      harm:          {ref:"nutt2010", conf:"measured", note:"Nutt 2010: mushrooms overall harm = 5"},
      addictPct:     {ref:["nsduh2023_halluc","johnson2018"], conf:"estimated", note:"Same basis as LSD. No epidemiological data for psilocybin-specific dependence."},
      margin:        {ref:"gable2006", conf:"derived", note:"Gable 2006: safety ratio >1000:1. LD50 extrapolation ~1.7kg dried."},
      pctAsExpected: {ref:null, conf:"editorial", note:"Whole mushrooms are visually identifiable. 99% estimate based on low adulteration risk for recognizable plant material."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki dosage classification."},
      overwhelm:     {ref:"gds2020", conf:"derived", note:"GDS 2020: 22.5% negative effects for LSD/psilocybin self-treatment combined. Note: this is NOT mushroom-specific."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // DMT
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"dmt",n:"DMT",cat:"psychedelic",aka:["Dimitri","Spirit Molecule","Ayahuasca"],src:"natural",
    desc:"Extremely potent, very short when smoked. Overwhelming but physically safe.",
    blurb:"Found in hundreds of plant species and used for millennia in Amazonian ayahuasca traditions. The most intense psychedelic experience available — complete reality replacement when smoked. Produced endogenously in the human body in trace amounts, though its natural function is unknown.",
    atDose:1,atDoseLabel:"Safe",
    dangerRank:99,marginBest:null,marginWorst:null,marginLabel:"No known physical danger — self-limiting",
    marginExplain:"Smoked DMT is self-limiting — the experience becomes so intense that taking more is impossible. No documented death from DMT toxicity alone. Ayahuasca (oral + MAOI) carries additional interaction risks but the DMT itself has an enormous physical margin.",
    supplyRisk:2,pctAsExpected:90,supplyLabel:"~90% — distinctive appearance helps",
    supplyExplain:"Distinctive smell and appearance limits substitution. Fentanyl has been reported in some powder samples — fentanyl strips can detect contamination.",
    addict:1,addictLabel:"Not addictive",addictPct:1,addictPrefix:"<",addictLife:1,
    addictNote:"DMT's extremely short duration and intensity make compulsive use patterns rare. Ayahuasca is used ceremonially with no documented dependence syndrome.",
    overwhelm:5,overwhelmLabel:"The most intense psychedelic experience possible — total reality dissolution in seconds",
    feels:["Intense hallucinations","Entity encounters","Ego dissolution","Time distortion","Profound awe"],
    odRisk:["Overwhelming psychological experience","No lethal overdose death recorded"],
    longTerm:["No organ damage","No dependence","Can be psychologically destabilizing if used frequently"],
    harm:5,routes:[{nm:"Smoked / Vaped",onset:"Seconds",dur:"5–20 min"},{nm:"Oral (Ayahuasca)",onset:"30–60 min",dur:"3–6 hr"}],
    dose:{threshold:"5 mg",light:"10–20 mg",common:"20–40 mg",strong:"40–60 mg",heavy:"60+ mg"},
    lethal:{headline:"No one has died from smoking too much DMT.",note:"No documented death from smoked DMT toxicity. The experience becomes overwhelming long before any physical danger.",cmp:"pill",sz:22,realworld:"The experience becomes so intense that taking more is essentially impossible. Your body's self-limiting.",gable:{ed:"40 mg oral",ld:"extrapolated",ratio:"~50:1",note:"†animal extrapolation"}},
    _src:{
      harm:          {ref:"broman2025", conf:"measured", note:"Broman et al. 2025: DMT/ayahuasca scored 5/100 — fourth-least harmful of 19 drugs, between LSD (4) and mushrooms (3). Pure synthetic DMT not separately scored."},
      addictPct:     {ref:null, conf:"estimated", note:"No epidemiological data. Estimated from clinical consensus."},
      margin:        {ref:null, conf:"editorial", note:"No lethal dose established. Self-limiting via intensity. No Gable 2006 data for DMT specifically."},
      pctAsExpected: {ref:null, conf:"editorial", note:"90% estimate based on distinctive appearance/smell. No systematic drug checking data for DMT."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki dosage classification."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // MESCALINE
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"mescaline",n:"Mescaline",cat:"psychedelic",aka:["Peyote","San Pedro", "Wachuma"],src:"natural",
    desc:"Natural cactus psychedelic. Long duration, wide safety margin.",
    blurb:"Used by indigenous peoples of the Americas for at least 5,700 years, making it one of the oldest known psychedelics. Notably gentle, grounded character compared to LSD or mushrooms, but one of the longest-lasting psychedelics. Active doses are large (200-400mg), and nausea during onset is nearly universal.",
    atDose:1,atDoseLabel:"Safe",
    dangerRank:99,marginBest:null,marginWorst:null,marginLabel:"No known physical danger at realistic doses",
    marginExplain:"The severe nausea from cactus material prevents overconsumption. No documented deaths from mescaline alone. The experience becomes very intense at 2-3x a normal dose, but your body handles it fine.",
    supplyRisk:2,pctAsExpected:95,supplyLabel:"~95% — cactus is identifiable",
    supplyExplain:"Whole cactus is identifiable plant material. Synthetic mescaline is extremely rare.",
    addict:1,addictLabel:"Not addictive",addictPct:3,addictPrefix:"~",addictLife:4.9,
    addictNote:"Mescaline is the one classical psychedelic where Stone 2007 found an elevated signal. This may reflect peyote ceremonial use patterns rather than pharmacological dependence.",
    overwhelm:3,overwhelmLabel:"8-12 hours of psychedelic commitment you can't exit — nausea adds to challenge",
    feels:["Color enhancement","Euphoria","Body warmth","Nature connection","Introspection"],
    odRisk:["Severe nausea","Psychological distress"],
    longTerm:["No organ damage","No dependence","Sacred use in indigenous cultures for millennia"],
    harm:6,harmEstimated:true,routes:[{nm:"Oral",onset:"45–120 min",dur:"8–12 hr"}],
    dose:{threshold:"50 mg",light:"100–150 mg",common:"200–300 mg",strong:"300–500 mg",heavy:"500+ mg"},
    lethal:{headline:"You'd need to eat over 2 ounces of pure mescaline — roughly a full shot glass of powder.",note:"Very high safety margin. The severe nausea from cactus material makes overconsumption extremely unlikely.",cmp:"cup",sz:40,realworld:"Picture a full shot glass of pure powder, or eating several feet of cactus. You'd be vomiting long before reaching danger.",gable:{ed:"350 mg",ld:"~8.4 g",ratio:"24:1",note:"†animal extrapolation"}},
    _src:{
      harm:          {ref:null, conf:"estimated", note:"Mescaline not in Nutt 2010. Estimated at 6 based on classical psychedelic profile and millennia of traditional use without documented fatalities."},
      addictPct:     {ref:["stone2007","anthony1994"], conf:"estimated", note:"No epidemiological data. Same class estimate as LSD/psilocybin."},
      margin:        {ref:"gable2006", conf:"derived", note:"Gable 2006 includes mescaline safety ratio (>20:1). Nausea from cactus material is the practical limiter."},
      pctAsExpected: {ref:null, conf:"editorial", note:"Cactus is visually identifiable. Synthetic mescaline extremely rare. No systematic drug checking data."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki dosage classification for synthetic mescaline HCl."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // 2C-x
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"2cx",n:"2C-x (2C-B, 2C-E, 2C-I)",sn:"2C-x",cat:"psychedelic",aka:["Nexus","Bees","Tusi","Pink cocaine"],src:"synthetic",
    desc:"Phenethylamine psychedelic family. Very dose-sensitive — small increases cause big jumps. 'Tusi/pink cocaine' sold as 2C-B usually isn't.",
    blurb:"Synthesized by Alexander Shulgin in 1974 and documented in his book PiHKAL. Unusually steep dose-response curve — 2mg more can dramatically change the experience. Combines mild visual effects with tactile and empathogenic warmth at lower doses, shifting to intense psychedelia above 25mg.",
    atDose:2,atDoseLabel:"Safe if dosed carefully",
    dangerRank:10,marginBest:4,marginWorst:2,marginLabel:"Some room, but effects jump sharply with small increases",
    marginExplain:"2C-B is not particularly toxic at recreational doses, but the dose-response curve is unusually steep. The difference between 15mg and 30mg is not 'twice as strong' — it's a qualitatively different experience. Vasoconstriction becomes concerning above 40-50mg. The difference between a strong and dangerous dose can be 5mg — a milligram scale is the only way to measure accurately.",
    supplyRisk:4,pctAsExpected:50,supplyLabel:"~50% — 'Tusi/pink cocaine' is almost never 2C-B",
    supplyExplain:"'Tusi' frequently contains ketamine, MDMA, caffeine, or no 2C-B at all. Actual 2C-B is typically white. Reagent testing can identify what's actually present.",
    addict:1,addictLabel:"Not addictive",addictPct:1,addictPrefix:"<",addictLife:1,
    addictNote:"Phenethylamine psychedelic with 5-HT2A agonism. Same tachyphylaxis mechanism as other classical psychedelics. Insufficient prevalence for epidemiological study.",
    overwhelm:3,overwhelmLabel:"Steep dose curve — easy to accidentally go too deep",
    feels:["Vivid colors","Body euphoria","Enhanced touch","Mild empathy","Giggles","Music enhancement"],
    odRisk:["Severe nausea","Vasoconstriction","Hypertension at high doses"],
    longTerm:["Limited research","No known organ damage","No dependence"],
    harm:8,harmEstimated:true,routes:[{nm:"Oral",onset:"45–90 min",dur:"4–6 hr"},{nm:"Insufflated",onset:"5–15 min",dur:"2–4 hr"}],
    dose:{threshold:"5 mg",light:"8–15 mg",common:"15–25 mg",strong:"25–35 mg",heavy:"35+ mg"},
    lethal:{headline:"No established lethal dose — but effects jump dramatically with small increases.",note:"Steep dose-response curve. The difference between a comfortable experience and an overwhelming one can be just 5-10mg.",cmp:"pill",sz:22,realworld:"Going from 20mg to 30mg doesn't feel like 50% more — it can feel like a completely different drug. A milligram scale is the only reliable way to dose."},
    _src:{
      harm:          {ref:null, conf:"estimated", note:"2C-x not in Nutt 2010. Estimated at 8 based on phenethylamine pharmacology, steep dose-response, and limited clinical data."},
      addictPct:     {ref:null, conf:"estimated", note:"No epidemiological data. Same class estimate as other psychedelics."},
      margin:        {ref:null, conf:"editorial", note:"Worst-case 2x and best-case 4x are estimates based on dose-response reports from PsychonautWiki and Erowid experience reports. No peer-reviewed safety ratio data."},
      pctAsExpected: {ref:"nz_drug", conf:"derived", note:"NZ Drug Foundation 2024 reports low concordance for 'tusi' products. 50% estimate reflects widespread mislabeling globally."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki dosage classification for 2C-B."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // MDMA
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"mdma",n:"MDMA",cat:"empathogen",aka:["Ecstasy","Molly","E","X","Mandy"],src:"synthetic",
    desc:"The drug itself is moderately safe. Real dangers: overheating, water intoxication, and what's actually in the pill.",
    blurb:"First synthesized at Merck in 1912 as a pharmaceutical intermediate; its psychoactive properties went unnoticed until Alexander Shulgin resynthesized it in 1976. Works by reversing serotonin, dopamine, and norepinephrine transporters, and inactivates the liver enzyme (CYP2D6) that clears it, so redosing produces disproportionately higher blood levels. Serotonin depletion after use causes a characteristic low mood 2-4 days later.",
    atDose:2,atDoseLabel:"Moderately safe",
    dangerRank:5,marginBest:4,marginWorst:1.5,marginLabel:"Moderate room in good conditions, almost none in bad conditions",
    marginExplain:"Clinical trials (MAPS Phase 2/3) safely administer 120mg + 60mg booster (180mg total) to screened healthy adults. Most recreational use at 100-150mg is well-tolerated. But in a hot, crowded environment without water breaks, danger starts around 200mg. IMPORTANT: MDMA inactivates the liver enzyme (CYP2D6) that metabolizes it — so a second dose doesn't just add to the first, it hits harder because your body can't clear it as fast (de la Torre et al. 2004). This is why redosing is more dangerous than the initial dose. Risk multipliers: heat, dehydration, re-dosing, and pre-existing heart conditions.",
    supplyRisk:4,pctAsExpected:74,supplyLabel:"~74% contains only MDMA",
    supplyExplain:"26% contains something else: meth, cathinones, caffeine, or nothing. Pressed pills are higher risk than crystal. Reagent testing and fentanyl strips can identify what's actually in the sample.",
    addict:2,addictLabel:"Low addiction potential",addictPct:1,addictPrefix:"~",addictLife:5,
    addictNote:"MDMA has serotonergic reinforcing properties but the 3-month recovery period limits compulsive use. The Elsey 2023 null finding may reflect MDMA's self-limiting use pattern.",
    overwhelm:2,overwhelmLabel:"Usually deeply positive — anxiety during onset possible",
    feels:["Intense euphoria","Deep empathy","Love for everyone","Enhanced touch","Music is incredible","Jaw clenching"],
    odRisk:["Hyperthermia (overheating → organ failure)","Hyponatremia (water intoxication)","Serotonin syndrome","Seizures"],
    longTerm:["Neurotoxicity from repeated use","Depression during comedowns","Memory impairment","Serotonin depletion — neurotoxicity research suggests 3+ months between uses for recovery"],
    harm:9,routes:[{nm:"Oral",onset:"30–60 min",dur:"3–5 hr"},{nm:"Insufflated",onset:"5–15 min",dur:"2–4 hr"}],
    dose:{threshold:"30 mg",light:"40–75 mg",common:"75–125 mg",strong:"125–175 mg",heavy:"175+ mg"},
    lethal:{headline:"People have died from as little as 1-2 pills — but usually from overheating, not the drug itself.",note:"Most MDMA deaths are from hyperthermia (overheating in hot environments) or hyponatremia (drinking too much water). Heat, dehydration, and re-dosing are the primary risk multipliers.",cmp:"pill",sz:22,realworld:"1-2 pills (150-300mg) in a hot club without water breaks has killed otherwise healthy people. It's not about how much — it's about the environment.",gable:{ed:"125 mg",ld:"~2 g",ratio:"16:1"}},
    _src:{
      harm:          {ref:"nutt2010", conf:"measured", note:"Nutt 2010: ecstasy overall harm = 9"},
      addictPct:     {ref:["nsduh2023_halluc","stone2007"], conf:"estimated", note:"Schlag 2020 reviews capture rates across studies. No study directly reports MDMA 10-year dependence probability. 3% is an estimate consistent with the rank-ordering (below cannabis, above psychedelics)."},
      margin:        {ref:"maps", conf:"derived", note:"MAPS trials used 120+60mg safely. Worst-case 1.5x reflects hyperthermia risk in adverse conditions at ~200mg. Best-case 4x from clinical toxicology thresholds."},
      pctAsExpected: {ref:"drugsdata", conf:"measured", note:"Sevigny & Thyssen 2024: MDMA-only prevalence = 74.1% in 2023, from 4,719 samples over 25 years."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki dosage classification, consistent with MAPS clinical dosing."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // COCAINE
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"cocaine",n:"Cocaine",cat:"stimulant",aka:["Coke","Snow","Blow","Crack"],src:"natural",
    desc:"Short duration drives compulsive re-dosing. Street supply heavily cut and increasingly fentanyl-contaminated.",
    blurb:"Derived from coca leaves, which have been chewed in the Andes for at least 5,000 years; the alkaloid was first isolated in 1860. Blocks dopamine, serotonin, and norepinephrine reuptake. Combined with alcohol, the liver creates cocaethylene — a unique compound more cardiotoxic than either drug alone.",
    atDose:3,atDoseLabel:"Cardiac risk at any dose",
    dangerRank:7,marginBest:5,marginWorst:1,marginLabel:"Moderate for most people, but unpredictable heart risk for some",
    marginExplain:"Most people tolerate a few lines (100-300mg total) without incident. The honest risk: cocaine triggers a 24-fold increase in heart attack risk in the hour after use (Mittleman 1999, Circulation). The risk rises steeply with dose, re-dosing over hours, combining with alcohol (creates cocaethylene), and any pre-existing heart condition — even undiagnosed ones.",
    supplyRisk:4,pctAsExpected:88,supplyLabel:"~88% pure — but fentanyl contamination in some regions",
    supplyExplain:"Average purity now ~88% (DEA 2024), highest in a decade. Levamisole has dropped from 87% (2017) to ~5% (DEA 2024). Fentanyl contamination 2.7% nationally, >10% in NE states (Lim et al. 2024). Fentanyl strips can detect contamination.",
    addict:4,addictLabel:"Highly addictive",addictPct:21,addictPrefix:"~",addictLife:20.9,
    addictNote:"50% of dependent cases emerge within ~4 years of first use — fastest transition of the four substances studied by Lopez-Quintero.",
    overwhelm:2,overwhelmLabel:"Usually euphoric — paranoia possible at high doses",
    feels:["Euphoria & confidence","Extreme alertness","Numbness","Talkativeness","Feeling invincible"],
    odRisk:["Heart attack","Stroke","Seizures","Sudden death (cardiac arrhythmia)"],
    longTerm:["Nasal septum damage","Cardiovascular disease","Addiction","Paranoia","Financial ruin"],
    harm:27,routes:[{nm:"Insufflated",onset:"1–5 min",dur:"15–45 min"},{nm:"Smoked (crack)",onset:"Seconds",dur:"5–15 min"},{nm:"Intravenous",onset:"Seconds",dur:"10–20 min"}],
    dose:{threshold:"10 mg",light:"20–50 mg",common:"50–100 mg",strong:"100–150 mg",heavy:"150+ mg"},
    lethal:{headline:"Your heart decides — some people have died from a single line.",note:"Heart sensitivity varies wildly between individuals. There is no way to predict who will have a cardiac event.",cmp:"line",sz:[50,8],realworld:"A person with an undiagnosed heart condition can die from the same amount their friend does every weekend. There's no 'safe' test dose.",gable:{ed:"80 mg intranasal",ld:"~1.2 g",ratio:"15:1"}},
    _src:{
      harm:          {ref:"nutt2010", conf:"measured", note:"Nutt 2010: cocaine (powder) overall harm = 27. Note: crack cocaine scored 54 separately; this entry combines both forms under the lower score."},
      addictPct:     {ref:["lopez2011","wagner2002"], conf:"derived", note:"Lopez-Quintero 2011 Table 2: cocaine cumulative probability of dependence. 14.8% is approximately the 10-year estimate from their survival analysis. Lifetime = 20.9%."},
      addictLife:    {ref:"lopez2011", conf:"measured", note:"Lopez-Quintero 2011: lifetime cumulative probability = 20.9%."},
      margin:        {ref:null, conf:"editorial", note:"Best-case 5x and worst-case 1x are clinical estimates. Mittleman 1999: 23.7-fold MI risk increase within 60 min of use."},
      pctAsExpected: {ref:"dea_nflis", conf:"measured", note:"DEA CY2024 Annual Cocaine Report: 88% average purity, 97% of CSP samples uncut. Levamisole down to ~5% from 87% in 2017. Fentanyl co-occurrence 2.7% nationally (Lim et al. 2024, NFLIS 11.9M samples)."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki dosage classification."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // AMPHETAMINE
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"amphetamines",n:"Amphetamine",sn:"Amfeta",cat:"stimulant",aka:["Speed","Adderall","Dexedrine","Vyvanse"],src:"synthetic",
    desc:"Medical ADHD stimulant. Pharmaceutical versions consistent; street speed is not.",
    blurb:"First synthesized in 1887; marketed as Benzedrine inhalers in the 1930s and used extensively by all sides in World War II. Release dopamine and norepinephrine, with extended-release formulations lasting significantly longer than instant-release. Therapeutic doses are well-studied; cardiovascular risk scales with dose and frequency.",
    atDose:2,atDoseLabel:"Safe at prescribed doses",
    dangerRank:15,marginBest:5,marginWorst:3,marginLabel:"Moderate room with pharmaceutical pills",
    marginExplain:"Prescribed Adderall at 20-30mg is well-tolerated. Clinical toxicity typically appears around 100-150mg+ (3-5x a normal dose): racing heart, dangerously elevated blood pressure, risk of stroke. Street speed has unknown purity, so the effective margin is smaller. Tolerance builds but cardiovascular strain persists.",
    supplyRisk:3,pctAsExpected:91,supplyLabel:"~91% from pharmacy; street speed varies",
    supplyExplain:"Pharmacy Adderall: 100% safe. Street speed or pressed pills: may contain meth or fentanyl. Counterfeit Adderall increasing.",
    addict:3,addictLabel:"Moderately addictive",addictPct:8,addictLife:11.2,
    addictNote:"Prescription Adderall at therapeutic doses has lower dependence risk than recreational use.",
    overwhelm:2,overwhelmLabel:"Focused and energized — anxiety possible at high doses",
    feels:["Laser focus","Endless energy","Euphoria","Confidence","Appetite gone","Talkativeness"],
    odRisk:["Heart attack","Stroke","Hyperthermia","Psychosis"],
    longTerm:["Cardiovascular damage","Stimulant psychosis","Insomnia","Weight loss","Dependence","Dental issues"],
    harm:23,routes:[{nm:"Oral",onset:"15–45 min",dur:"4–8 hr"},{nm:"Insufflated",onset:"5–15 min",dur:"3–6 hr"}],
    dose:{threshold:"5 mg",light:"10–20 mg",common:"20–40 mg",strong:"40–70 mg",heavy:"70+ mg"},
    lethal:{headline:"Lethal dose varies hugely — but heart strain is always there.",note:"Even tolerant users carry cardiovascular risk. The lethal dose depends on your heart, not just the amount.",cmp:"pill",sz:22,realworld:"A handful of pills could be fatal for one person and barely noticeable for another. It depends on your heart, not your tolerance."},
    _src:{
      harm:          {ref:"nutt2010", conf:"measured", note:"Nutt 2010: amphetamine overall harm = 23"},
      addictPct:     {ref:"anthony1994", conf:"derived", note:"Anthony 1994 reports stimulants category. Wagner & Anthony 2002: ~8% within a decade. Exact figure conflates amphetamine subtypes."},
      addictLife:    {ref:"wagner2002", conf:"derived", note:"Wagner & Anthony 2002 survival analysis."},
      margin:        {ref:null, conf:"editorial", note:"Best-case 5x and worst-case 3x from clinical toxicology. Therapeutic index depends on formulation and individual cardiovascular health."},
      pctAsExpected: {ref:"italy_gcms", conf:"measured", note:"Italy GC/MS study: amphetamine 91% concordance."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki dosage classification."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // METHAMPHETAMINE
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"methamphetamine",n:"Methamphetamine",sn:"Meth",cat:"stimulant",aka:["Meth","Crystal","Ice","Tina","Glass"],src:"synthetic",
    desc:"Extremely potent, long-acting, addictive, neurotoxic. Duration can exceed 24 hours.",
    blurb:"First crystallized by Japanese chemist Akira Ogata in 1919; used extensively by Axis and Allied militaries in WWII under brand names like Pervitin. Produces intense dopamine release that is directly neurotoxic at high doses. Street purity is typically high (~88%), meaning the danger is the drug itself, not adulterants.",
    atDose:4,atDoseLabel:"Harmful even at typical doses",
    dangerRank:6,marginBest:4,marginWorst:2,marginLabel:"Some room for a single dose, but binge use erases it",
    marginExplain:"A single dose of 15-30mg in a non-tolerant person is intense but not typically dangerous. Physical danger (hyperthermia, cardiac events, psychosis) usually appears at 60-120mg+. BUT: meth's extreme duration (24+ hours) drives compulsive re-dosing, and cumulative dose over a binge is where most deaths occur.",
    supplyRisk:2,pctAsExpected:88,supplyLabel:"~88% pure — the danger IS the drug",
    supplyExplain:"Ironically among the purest illicit drugs. The danger is the substance itself, not contaminants.",
    addict:5,addictLabel:"Extremely addictive",addictPct:52,addictPrefix:"~",addictLife:52,
    addictNote:"Past-year dependence rate, not directly comparable to Lopez-Quintero lifetime rates. The true lifetime rate may differ. Meth has the highest past-year dependence rate of any common substance.",
    overwhelm:3,overwhelmLabel:"Psychosis risk with prolonged use or high doses",
    feels:["Extreme euphoria","Superhuman energy","Invincibility","Hypersexuality","Extreme focus"],
    odRisk:["Hyperthermia","Heart failure","Stroke","Psychosis","Seizures","Rhabdomyolysis"],
    longTerm:["Severe brain damage","Psychosis (common)","Devastating addiction","Tooth decay ('meth mouth')","Premature aging","Cardiovascular disease"],
    harm:33,routes:[{nm:"Smoked",onset:"Seconds",dur:"8–24 hr"},{nm:"Insufflated",onset:"3–5 min",dur:"8–24 hr"},{nm:"Oral",onset:"15–30 min",dur:"10–24 hr"}],
    dose:{threshold:"5 mg",light:"5–15 mg",common:"15–30 mg",strong:"30–60 mg",heavy:"60+ mg"},
    lethal:{headline:"100mg — about a tenth of a gram — can kill someone without tolerance.",note:"The extreme duration (up to 24 hours) means your body has no chance to recover. Effects stack as you stay awake.",cmp:"pill",sz:22,realworld:"A tenth of a gram is a small pinch of powder. And unlike most drugs, the effects last so long that your body can't recover between doses.",gable:{ed:"15 mg oral",ld:">150 mg",ratio:"10:1"}},
    _src:{
      harm:          {ref:"nutt2010", conf:"measured", note:"Nutt 2010: metamfetamine overall harm = 33"},
      addictPct:     {ref:["han2021","anthony1994"], conf:"estimated", note:"No survival analysis data. 15% estimated from SAMHSA 2016 treatment data and comparison to amphetamine rates. Schlag 2020 review supports meth > amphetamine."},
      addictLife:    {ref:null, conf:"estimated", note:"20% estimated. No direct measurement."},
      margin:        {ref:null, conf:"editorial", note:"Best-case 4x and worst-case 2x from clinical toxicology reports. Binge pattern is the primary risk factor rather than single-dose toxicity."},
      pctAsExpected: {ref:"italy_gcms", conf:"measured", note:"Italy GC/MS: heroin 88% concordance. Applied to meth based on similarly high street purity in US (DEA seizure data)."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki dosage classification."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // NICOTINE
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"nicotine",n:"Nicotine",cat:"stimulant",aka:["Cigarettes","Vape","Tobacco","Snus","Juul","Zyn"],src:"natural",
    desc:"The most addictive commonly used substance. The drug itself is less harmful than the delivery method — smoking kills, nicotine pouches don't (much).",
    blurb:"Tobacco has been used by indigenous peoples of the Americas for thousands of years in ceremonial and medicinal contexts. Acetylcholine receptor agonist and one of the most addictive substances known — approximately 68% of users eventually develop dependence. The harm score of 26 reflects smoked tobacco specifically; nicotine alone (patches, gum, vaping) is far less harmful than combustion.",
    atDose:2,atDoseLabel:"Low acute toxicity",
    dangerRank:16,marginBest:20,marginWorst:3,marginLabel:"Very wide from smoking, dangerous from concentrated liquid",
    marginExplain:"You'd need to smoke dozens of cigarettes back-to-back to approach nicotine toxicity — nausea stops you. But concentrated vape juice (36-50mg/ml) is a serious poison risk if swallowed, especially for children. A teaspoon of high-strength liquid can be fatal for a toddler.",
    supplyRisk:1,pctAsExpected:99,supplyLabel:"~99% — commercial products standardized",
    supplyExplain:"Commercial tobacco, vaping, and nicotine products are standardized and regulated.",
    addict:5,addictLabel:"EXTREMELY addictive",addictPct:68,addictPrefix:"~",addictLife:67.5,
    addictNote:"Highest transition rate of any substance. 50% of dependent cases emerge within ~27 years of first use.",
    overwhelm:0,overwhelmLabel:"No psychological risk",
    feels:["Alertness","Calm focus","Stress relief","Appetite suppression","Buzz (non-tolerant)"],
    odRisk:["Nausea & vomiting","Rapid heartbeat","Seizures (rare, liquid nicotine ingestion)","Death from liquid ingestion (children)"],
    longTerm:["Powerful dependence (harder to quit than heroin for many)","Cancer & lung disease (SMOKING, not nicotine itself)","Cardiovascular strain","Gum disease (chewing tobacco)","Vaping: unknown long-term effects"],
    harm:26,harmNote:"Scored as 'tobacco' in Nutt 2010 — includes smoking harms, not nicotine alone",routes:[{nm:"Smoked (cigarette)",onset:"Seconds",dur:"30–60 min"},{nm:"Vaped",onset:"Seconds",dur:"30–60 min"},{nm:"Oral (pouch/gum)",onset:"5–15 min",dur:"30–60 min"},{nm:"Transdermal (patch)",onset:"1–2 hr",dur:"16–24 hr"}],
    dose:{threshold:"0.5 mg",light:"1–2 mg",common:"2–4 mg",strong:"4–8 mg",heavy:"8+ mg"},
    lethal:{headline:"A teaspoon of vape juice can kill a child.",note:"The drug in cigarettes won't kill you from a single overdose. But concentrated liquid nicotine (vape refills) is extremely toxic if swallowed.",cmp:"spoon",sz:34,realworld:"One teaspoon of high-strength vape juice (36mg/ml) swallowed by a toddler can be fatal. This is the #1 poison control call for nicotine.",gable:{ed:"1 mg smoked",ld:"~50 mg",ratio:"50:1"}},
    _src:{
      harm:          {ref:"nutt2010", conf:"measured", note:"Nutt 2010: TOBACCO overall harm = 26. IMPORTANT: This score is for tobacco (including smoking harms), not nicotine alone. Nicotine-only products (pouches, patches) would score dramatically lower."},
      addictPct:     {ref:["lopez2011","wagner2002"], conf:"derived", note:"Lopez-Quintero 2011 (NESARC): lifetime cumulative probability of transition to dependence = 67.5%."},
      addictLife:    {ref:"lopez2011", conf:"measured", note:"Lopez-Quintero 2011: nicotine lifetime cumulative probability of dependence = 67.5%."},
      margin:        {ref:null, conf:"editorial", note:"Best-case 20x (smoking) and worst-case 3x (concentrated liquid) are clinical estimates. Nausea prevents overdose from smoking. Liquid nicotine toxicity well-documented in poison control data."},
      pctAsExpected: {ref:null, conf:"editorial", note:"Commercial products are regulated. 99% reflects standardized manufacturing, not drug checking data."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki dosage classification."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // CANNABIS
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"cannabis",n:"Cannabis",cat:"cannabinoid",aka:["Marijuana","Weed","THC","Pot","Edibles"],src:"natural",
    desc:"No human has ever died from cannabis toxicity. Edibles need extra patience — onset is slow.",
    blurb:"One of the oldest cultivated plants — evidence of use dates to at least 3000 BCE in Central Asia. Acts on the endocannabinoid system (CB1/CB2 receptors), producing relaxation, altered perception, and appetite stimulation. Alcohol increases THC blood levels by approximately 60%, explaining why the combination hits harder than either alone.",
    atDose:1,atDoseLabel:"Very safe",
    dangerRank:99,marginBest:null,marginWorst:null,marginLabel:"No known physical danger at any dose",
    marginExplain:"No human has ever died from cannabis toxicity. The ratio is over 1,000:1. Edibles can cause extreme anxiety and psychological distress that feels like an emergency — but the body is completely fine. The experience ends on its own.",
    supplyRisk:1,pctAsExpected:98,supplyLabel:"~98% — flower is obvious",
    supplyExplain:"Flower: essentially no adulteration risk. Black market vape carts: higher risk (vitamin E acetate). Dispensary products safest.",
    addict:2,addictLabel:"Low addiction potential",addictPct:9,addictPrefix:"~",addictLife:8.9,
    addictNote:"Lower than alcohol or cocaine. But because so many people use cannabis, it still creates a large number with problematic use patterns. Psychological dependence, not physical.",
    overwhelm:3,overwhelmLabel:"Anxiety and paranoia common, especially edibles",
    feels:["Relaxation","Euphoria","Appetite boost","Time feels slow","Music sounds amazing","Giggles"],
    odRisk:["Severe anxiety/paranoia (edibles)","Psychotic episode (rare, high doses)","No lethal danger"],
    longTerm:["Mild psychological dependence","Memory impairment (reversible)","Respiratory issues (smoking only)","May affect brain development under age 25"],
    harm:20,routes:[{nm:"Smoked / Vaped",onset:"Seconds",dur:"1–4 hr"},{nm:"Edibles",onset:"30 min – 2 hr",dur:"4–10 hr"}],
    dose:{threshold:"1 mg THC",light:"2–5 mg",common:"5–15 mg",strong:"15–30 mg",heavy:"30+ mg"},
    lethal:{headline:"No human has ever died from a cannabis overdose. It is physically impossible.",note:"Even the most terrifying edible experience is not physically dangerous. No one has ever died from cannabis toxicity.",cmp:"bag",sz:60,realworld:"You would need to consume roughly 1,500 pounds of cannabis in 15 minutes. That's not a typo — fifteen hundred pounds.",gable:{ed:"15 mg THC",ld:">15 g",ratio:">1,000:1",note:"†animal extrapolation"}},
    _src:{
      harm:          {ref:"nutt2010", conf:"measured", note:"Nutt 2010: cannabis overall harm = 20"},
      addictPct:     {ref:["lopez2011","wagner2002"], conf:"derived", note:"Lopez-Quintero 2011 (NESARC): lifetime cumulative probability = 8.9%."},
      addictLife:    {ref:"lopez2011", conf:"measured", note:"Lopez-Quintero 2011: cannabis lifetime cumulative probability of dependence = 8.9%."},
      margin:        {ref:"gable2006", conf:"measured", note:"Gable 2006: safety ratio >1000:1 for cannabis."},
      pctAsExpected: {ref:null, conf:"editorial", note:"Flower is visually identifiable. 98% estimate. Vape cart adulteration documented (vitamin E acetate) but separate from flower."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"THC dosages from PsychonautWiki, consistent with dispensary labeling standards."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // KETAMINE
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"ketamine",n:"Ketamine",cat:"dissociative",aka:["K","Special K","Ket","Vitamin K"],src:"synthetic",
    desc:"Safe margin alone, but lethal mixed with downers. Regular use destroys your bladder.",
    blurb:"Synthesized in 1962 at Parke-Davis as a safer alternative to PCP for anesthesia. Blocks NMDA receptors, producing a dose-dependent spectrum from mild dissociation to complete K-hole immersion. Now FDA-approved as esketamine (Spravato) for treatment-resistant depression; tolerance builds quickly and chronic heavy use causes bladder damage.",
    atDose:2,atDoseLabel:"Safe at normal doses",
    dangerRank:14,marginBest:8,marginWorst:2,marginLabel:"Good room alone, almost none mixed with alcohol or opioids",
    marginExplain:"Ketamine is used medically as an anesthetic at doses 5-10x a recreational bump — so the drug itself has a decent margin. The real danger alone is choking on vomit if you lose consciousness at high doses (~4-5x). But mixing with alcohol, opioids, or GHB drops the margin dramatically.",
    supplyRisk:3,pctAsExpected:78,supplyLabel:"~78% is real ketamine",
    supplyExplain:"Sometimes cut with MSG, creatine, or fillers. Occasionally substituted entirely. Reagent kits and fentanyl strips can identify what's present.",
    addict:3,addictLabel:"Moderately addictive",addictPct:8.5,addictLife:12,
    addictNote:"Psychological dependence develops with regular use. The bigger chronic risk is bladder damage — daily users can end up needing their bladder surgically removed.",
    overwhelm:3,overwhelmLabel:"K-hole is intensely disorienting — loss of body awareness",
    feels:["Floating/disconnection","Pain relief","Euphoria","K-hole (high dose)","Wonky movement","Music distortion"],
    odRisk:["Aspiration (choking on vomit)","Respiratory depression (with other downers)","Loss of consciousness"],
    longTerm:["BLADDER DAMAGE (chronic use — severe, irreversible)","Kidney damage","Psychological dependence","Cognitive impairment","Urinary tract issues — pain, frequency, blood"],
    harm:15,routes:[{nm:"Insufflated",onset:"5–15 min",dur:"45–90 min"},{nm:"IM injection",onset:"2–5 min",dur:"45–90 min"},{nm:"Oral",onset:"15–30 min",dur:"1–2 hr"}],
    dose:{threshold:"10 mg",light:"15–30 mg",common:"30–75 mg",strong:"75–150 mg",heavy:"150+ mg",note:"Doses above are for insufflated. IM is roughly 2/3 the insufflated dose (IM common: 25–50 mg, K-hole: 75–100 mg). Oral requires ~3x the insufflated dose due to low bioavailability."},
    lethal:{headline:"Very rarely lethal alone — almost every death involves choking on vomit or mixing with downers.",note:"Ketamine itself has a wide safety margin. The danger is becoming unconscious and choking, or combining with alcohol/opioids/GHB.",cmp:"line",sz:[50,8],realworld:"Dying from ketamine alone would require a very large amount. But a moderate dose of K mixed with a few drinks has killed people.",gable:{ed:"70 mg intranasal",ld:"~2.7 g",ratio:"38:1",note:"†animal extrapolation"}},
    _src:{
      harm:          {ref:"nutt2010", conf:"measured", note:"Nutt 2010: ketamine overall harm = 15"},
      addictPct:     {ref:null, conf:"estimated", note:"No large-scale epidemiological data. 6% estimated from UK clinical literature on ketamine dependence patterns."},
      margin:        {ref:null, conf:"derived", note:"Ketamine's anesthetic dose is 5-10x recreational dose (well-established in anesthesia literature). Best-case 8x, worst-case 2x based on clinical dosing vs. aspiration risk."},
      pctAsExpected: {ref:"italy_gcms", conf:"measured", note:"Italy GC/MS study: ketamine 78% concordance."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki dosage classification."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // PCP
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"pcp",n:"PCP",cat:"dissociative",aka:["Angel Dust","Wet","Sherm","Dust"],src:"synthetic",
    desc:"Powerful dissociative that can cause extreme agitation, violence, and psychosis. Unpredictable reactions.",
    blurb:"Developed as a surgical anesthetic in the 1950s and quickly withdrawn due to severe dissociative and psychotic side effects in patients. Unlike ketamine, PCP activates dopamine systems, contributing to both its addiction potential and psychosis risk. Effects are unpredictable and dose-dependent, ranging from euphoria to violent agitation to complete anesthesia.",
    atDose:4,atDoseLabel:"Dangerous — unpredictable",
    dangerRank:4,marginBest:3,marginWorst:1,marginLabel:"Unpredictable — some people have severe reactions at normal doses",
    marginExplain:"PCP's danger isn't primarily overdose toxicity — it's unpredictable behavioral effects. At 5-10mg (2-3x a normal dose), agitation, psychosis, and violent behavior become likely. Deaths are often from trauma during intoxication rather than direct toxicity. The margin depends heavily on the individual.",
    supplyRisk:3,pctAsExpected:70,supplyLabel:"~70% — sometimes sold as other things",
    supplyExplain:"Sometimes sold as LSD or THC. PCP-dipped cigarettes/joints have wildly variable dosing. Can appear as unexpected contaminant.",
    addict:3,addictLabel:"Moderately addictive",addictPct:5,addictPrefix:"~",addictLife:7,
    addictNote:"PCP has dopaminergic activity (DA reuptake inhibition) that classical psychedelics lack, explaining its higher dependence potential. May be understated at 5%.",
    overwhelm:4,overwhelmLabel:"Unpredictable — psychosis and agitation at any dose",
    feels:["Dissociation","Numbness","Invincibility feeling","Distorted perception","Agitation"],
    odRisk:["Psychosis","Extreme agitation/violence","Seizures","Hyperthermia","Rhabdomyolysis","Death"],
    longTerm:["Psychosis (can persist)","Memory loss","Speech difficulties","Depression","Flashbacks"],
    harm:20,harmEstimated:true,routes:[{nm:"Smoked (dipped)",onset:"2–5 min",dur:"4–8 hr"},{nm:"Insufflated",onset:"5–15 min",dur:"4–8 hr"},{nm:"Oral",onset:"15–60 min",dur:"6–24 hr"}],
    dose:{threshold:"1 mg",light:"2–3 mg",common:"3–5 mg",strong:"5–10 mg",heavy:"10+ mg (psychosis likely)"},
    lethal:{headline:"People have died at almost any dose — PCP is genuinely unpredictable.",note:"Deaths from extreme body temperature, muscle breakdown, or injuries from erratic violent behavior. The drug can make you unaware you're hurting yourself.",cmp:"pill",sz:22,realworld:"People on PCP have died from running into traffic, breaking through windows, or from their body overheating without them noticing."},
    _src:{
      harm:          {ref:null, conf:"estimated", note:"PCP not in Nutt 2010. Estimated at 20 based on behavioral unpredictability, psychosis risk, and trauma-related deaths. Comparable to cannabis in Nutt scale but for very different reasons."},
      addictPct:     {ref:["anthony1994","nsduh2023_halluc"], conf:"estimated", note:"Estimated from NIDA reports on PCP use patterns. No survival analysis."},
      margin:        {ref:null, conf:"editorial", note:"Best-case 3x and worst-case 1x reflect unpredictable individual responses. Not based on a specific safety ratio study."},
      pctAsExpected: {ref:null, conf:"estimated", note:"70% estimated. PCP sometimes sold as other substances. No systematic drug checking data."},
      dose:          {ref:"nhtsa", conf:"measured", note:"NHTSA Drug Fact Sheets: PCP dosage ranges."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // DXM
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"dxm",n:"DXM",cat:"dissociative",aka:["Dextromethorphan","Robo","Robotripping"],src:"synthetic",
    desc:"Biggest danger: OTHER ingredients in the cough medicine. Products with acetaminophen cause fatal liver failure at recreational DXM doses.",
    blurb:"Developed in the 1950s as a non-addictive replacement for codeine in cough suppressants. Effects are described in four dose-dependent plateaus, from mild stimulation to full dissociation. Many OTC formulations contain acetaminophen, guaifenesin, or antihistamines that are toxic at recreational DXM doses.",
    atDose:2,atDoseLabel:"Safe if pure DXM only",
    dangerRank:9,marginBest:5,marginWorst:1,marginLabel:"Decent for pure DXM, deadly if the product contains Tylenol",
    marginExplain:"DXM itself has a moderate margin. But many cough medicines contain acetaminophen (Tylenol), and a recreational DXM dose of that syrup delivers a liver-destroying dose of acetaminophen. Also: ~5-10% of European/Caucasian people are CYP2D6 poor metabolizers (~1% East Asian, ~2% African American) — for them, a normal dose hits 3-5x harder. Only DXM-only products avoid this risk.",
    supplyRisk:3,pctAsExpected:95,supplyLabel:"~95% — but CHECK THE OTHER INGREDIENTS",
    supplyExplain:"DXM itself is what it says. The danger is OTHER active ingredients in the product — acetaminophen causes liver failure at recreational DXM doses. DXM-only products are the only ones without this risk.",
    addict:2,addictLabel:"Low addiction potential",addictPct:3,addictPrefix:"~",addictLife:5,
    addictNote:"Some users develop compulsive patterns but clinical data is sparse. Primarily psychological.",
    overwhelm:3,overwhelmLabel:"Higher plateaus can be intensely dissociative",
    feels:["Dissociation","Euphoria","Music sounds incredible","Plateau-dependent effects","Robowalk"],
    odRisk:["Serotonin syndrome (with SSRIs)","Liver failure (acetaminophen in combo products)","Respiratory depression"],
    longTerm:["Psychological dependence possible","Cognitive effects with heavy use","Olney's lesions debated"],
    harm:10,harmEstimated:true,routes:[{nm:"Oral",onset:"30–60 min",dur:"4–8 hr"}],
    dose:{threshold:"75 mg",light:"100–200 mg",common:"200–400 mg",strong:"400–700 mg",heavy:"700+ mg"},
    lethal:{headline:"The DXM won't kill you — the Tylenol in the cough syrup will destroy your liver.",note:"Deaths are from acetaminophen (Tylenol) or antihistamines in the cough medicine, not from DXM itself. Products where DXM is the only active ingredient eliminate this risk.",cmp:"bottle",sz:[28,50],realworld:"A recreational dose of cough syrup that contains Tylenol can put you in liver failure. The label lists every active ingredient.",gable:{ed:"150 mg",ld:"~1.5 g",ratio:"10:1"}},
    _src:{
      harm:          {ref:null, conf:"estimated", note:"DXM not in Nutt 2010. Estimated at 10 based on moderate pharmacological risk profile and OTC availability. Butane scored 10 in Nutt for comparison."},
      addictPct:     {ref:null, conf:"estimated", note:"3% estimated from case report literature. No epidemiological data."},
      margin:        {ref:"gable2004", conf:"measured", note:"Gable 2004: DXM safety ratio = 10 (effective 150mg, lethal 1.5g). Best-case 5x for pure DXM. Worst-case 1x reflects acetaminophen co-formulation and CYP2D6 poor metabolizer risk (5-10% Caucasian, Bradford 2002)."},
      pctAsExpected: {ref:null, conf:"editorial", note:"OTC product; DXM content is standardized. 95% reflects pharmaceutical manufacturing."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki DXM plateau dosing."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // NITROUS OXIDE
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"nitrous",n:"Nitrous Oxide",sn:"Nitrous",cat:"dissociative",aka:["Laughing Gas","N2O","Whippets","Nangs"],src:"synthetic",
    desc:"Safe drug, dangerous delivery. Deaths from suffocation, not the substance itself.",
    blurb:"Discovered by Joseph Priestley in 1772; recreational laughing gas parties were popular in the early 1800s before its medical applications were recognized. The fastest onset and offset of any recreational substance. Triggers endogenous opioid peptide release in the brainstem, which is why it's synergistically dangerous with exogenous opioids.",
    atDose:1,atDoseLabel:"Very safe",
    dangerRank:17,marginBest:null,marginWorst:null,marginLabel:"Danger is the delivery method, not the amount",
    marginExplain:"Each individual balloon is self-limiting. The gas has an enormous safety margin per use. Deaths are from: suffocation (bags or masks trap the gas and cut off oxygen — balloons do not), falls while standing, and chronic B12 depletion from daily heavy use over weeks or months causing nerve damage.",
    supplyRisk:1,pctAsExpected:99,supplyLabel:"~99% — industrial product",
    supplyExplain:"Food-grade N2O chargers are standardized. Risk is method and chronic use, not purity.",
    addict:2,addictLabel:"Low-moderate (binge pattern)",addictPct:1,addictPrefix:"~",addictLife:3,
    addictNote:"Binge patterns develop in a small minority. The brief duration can drive compulsive re-dosing within a session, but between-session craving is uncommon.",
    overwhelm:2,overwhelmLabel:"Brief dissociation — disorienting but very short",
    feels:["Brief euphoria","Dissociation","Wah-wah sounds","Tingling","Uncontrollable laughter"],
    odRisk:["Suffocation (bags/masks cut off oxygen)","Falls","Loss of consciousness"],
    longTerm:["B12 depletion → NERVE DAMAGE (chronic use — tingling, numbness, paralysis)","Anemia","Cognitive impairment"],
    harm:6,routes:[{nm:"Inhaled (balloon)",onset:"Seconds",dur:"1–5 min"}],
    dose:{threshold:"1 charger",light:"1",common:"1–2",strong:"2–3",heavy:"3+"},
    lethal:{headline:"The gas won't kill you — but a bag over your head will.",note:"N2O itself has a very wide safety margin. Every death is from cutting off oxygen supply (bags, masks trap gas and displace air) or from chronic B12 depletion.",cmp:"canister",sz:30,realworld:"Bags and masks trap the gas and cut off oxygen — that's how every suffocation death happens. Balloons allow normal breathing between hits. Falls while standing are the other main danger.",gable:{ed:"3.5 L",ld:">525 L",ratio:">150:1"}},
    _src:{
      harm:          {ref:"ferreira2022", conf:"measured", note:"Ferreira et al. 2022 (Drug Science, Policy and Law): nitrous scored 6/100 in MCDA. Also rated least harmful drug overall in Crossin 2023 (NZ study)."},
      addictPct:     {ref:null, conf:"estimated", note:"2% estimated from clinical case reports. No epidemiological data."},
      margin:        {ref:null, conf:"editorial", note:"No simple ratio applies. Danger is oxygen displacement, not dose-dependent toxicity."},
      pctAsExpected: {ref:null, conf:"editorial", note:"Industrial product; standardized manufacturing. Not drug-checked."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // POPPERS
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"poppers",n:"Poppers (Alkyl Nitrites)",sn:"Poppers",cat:"inhalant",aka:["Amyl Nitrite","Rush","Jungle Juice","Room Odorizer"],src:"synthetic",
    desc:"Vasodilator inhalant. Brief rush and muscle relaxation. Combined with Viagra/Cialis or any PDE5 inhibitor, blood pressure drops to fatal levels.",
    blurb:"Amyl nitrite was first synthesized in 1844 and originally used medically for angina; recreational use became widespread in the 1970s. Inhaled alkyl nitrites that cause brief vasodilation, head rush, and smooth muscle relaxation. Combined with PDE5 inhibitors (Viagra/Cialis), both increase cyclic GMP, causing potentially fatal blood pressure collapse — an absolute pharmacological contraindication.",
    atDose:2,atDoseLabel:"Safe at normal use",
    dangerRank:18,marginBest:null,marginWorst:null,marginLabel:"Danger is swallowing or drug interactions, not inhaling",
    marginExplain:"Inhaling poppers has a wide margin — the effects are brief and self-limiting. The dangers: swallowing the liquid causes methemoglobinemia (a medical emergency), combining with Viagra/Cialis/Levitra causes a fatal blood pressure crash, and pre-existing heart conditions increase risk.",
    supplyRisk:2,pctAsExpected:90,supplyLabel:"~90% — but some isomers are worse",
    supplyExplain:"Amyl and butyl nitrite preferred. Isopropyl nitrite is harsher and linked to eye damage. Labels may not be accurate.",
    addict:1,addictLabel:"Not addictive",addictPct:1,addictPrefix:"<",addictLife:1,
    addictNote:"Poppers produce tolerance within minutes but no withdrawal or compulsive use pattern. Habitual use exists but does not meet clinical dependence criteria.",
    overwhelm:1,overwhelmLabel:"Brief head rush — too short to overwhelm",
    feels:["Head rush","Warmth","Muscle relaxation","Heightened sensation","Dizziness","Brief euphoria"],
    odRisk:["Fatal with Viagra/Cialis (blood pressure crash)","Chemical burns if swallowed","Methemoglobinemia (rare)"],
    longTerm:["Eye damage (maculopathy) with heavy use","Skin irritation","Headaches","No significant dependence"],
    harm:5,routes:[{nm:"Inhaled",onset:"Seconds",dur:"2–5 min"}],
    dose:{threshold:"1 sniff",light:"1–2 sniffs",common:"2–4 sniffs",strong:"4+",heavy:"—"},
    lethal:{headline:"Safe to inhale. Swallowing the liquid or combining with Viagra/Cialis can be fatal.",note:"Swallowing poppers liquid is a medical emergency. Combining with ED medication (Viagra, Cialis, Levitra) causes a fatal blood pressure crash.",cmp:"canister",sz:30,realworld:"Inhaling from the bottle: wide safety margin. Swallowing the liquid: causes methemoglobinemia, a medical emergency. Combined with Viagra/Cialis: blood pressure can drop low enough to stop the heart.",gable:{ed:"0.2 mL",ld:"~1.5 mL",ratio:"8:1"}},
    _src:{
      harm:          {ref:"ferreira2022", conf:"measured", note:"Ferreira et al. 2022: poppers scored 5/100 in MCDA (tied with mushrooms as least harmful)."},
      addictPct:     {ref:null, conf:"estimated", note:"Minimal addiction potential. Estimate based on pharmacology."},
      margin:        {ref:null, conf:"editorial", note:"Danger is interaction-based (PDE5 inhibitors) and ingestion, not dose-dependent inhalation toxicity."},
      pctAsExpected: {ref:null, conf:"editorial", note:"90% estimated. Isomer variation (isopropyl vs amyl) is the main quality concern."},
      dose:          {ref:"erowid", conf:"derived", note:"Dose ranges from Erowid and PsychonautWiki community consensus. Poppers are inhaled in variable amounts; 'dose' is approximated as number of inhalations rather than precise volume."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // ALCOHOL
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"alcohol",n:"Alcohol",cat:"depressant",aka:["Ethanol","Booze","Beer","Wine","Liquor"],src:"natural",
    desc:"Highest overall harm score of ANY substance. Legal status ≠ safety.",
    blurb:"The oldest known psychoactive substance — evidence of intentional fermentation dates to approximately 7000 BCE in China. The highest-harm substance in any multi-criteria analysis (Nutt 2010: 72/100), reflecting both individual and societal damage. Involved in more drug interaction deaths than any other substance because it potentiates nearly every depressant.",
    atDose:3,atDoseLabel:"Harmful even moderately",
    dangerRank:8,marginBest:5,marginWorst:2,marginLabel:"Moderate room for poisoning, but choking on vomit kills at lower amounts",
    marginExplain:"Acute alcohol poisoning (BAC >0.35%) requires roughly 15-20 drinks in a few hours for a 150lb person. But the most common alcohol death is aspiration — choking on vomit while unconscious — which can happen at 8-10 drinks. The recovery position (on the side) keeps the airway clear.",
    supplyRisk:1,pctAsExpected:99,supplyLabel:"~99% — commercial alcohol regulated",
    supplyExplain:"Commercial alcohol is regulated and standardized. Moonshine can contain methanol.",
    addict:4,addictLabel:"Moderately addictive",addictPct:23,addictPrefix:"~",addictLife:22.7,
    addictNote:"Risk persists for decades after first use — unlike most drugs where dependence risk peaks early. ~1 in 4-5 people who drink will develop dependence at some point.",
    overwhelm:2,overwhelmLabel:"Disinhibition — emotional but rarely 'overwhelming'",
    feels:["Disinhibition","Relaxation","Confidence","Warmth","Slurred speech","Emotional amplification"],
    odRisk:["Choking on vomit (aspiration)","Respiratory depression","Alcohol poisoning","Loss of consciousness"],
    longTerm:["Liver cirrhosis","Brain damage","Cancer","Heart disease","Severe addiction","Withdrawal CAN KILL (seizures, DTs)"],
    harm:72,routes:[{nm:"Oral",onset:"15–45 min",dur:"1–5 hr"}],
    dose:{threshold:"1 drink",light:"1–2",common:"2–4",strong:"4–8",heavy:"8+"},
    lethal:{headline:"15-20 drinks in a few hours can kill you. But choking on vomit kills at much less.",note:"Alcohol poisoning is lethal above ~0.35% BAC. But the most common cause of death is choking on vomit while passed out — and that can happen at much lower levels.",cmp:"bottle",sz:[28,50],realworld:"That's roughly a bottle of liquor chugged in an evening. But people die at half that amount if they pass out face-up and vomit. An unconscious person on their back who vomits will aspirate — on their side, they won't.",gable:{ed:"33 g (~2 drinks)",ld:"~330 g",ratio:"10:1"}},
    _src:{
      harm:          {ref:"nutt2010", conf:"measured", note:"Nutt 2010: alcohol overall harm = 72 (highest of all 20 substances scored)"},
      addictPct:     {ref:"lopez2011", conf:"derived", note:"Lopez-Quintero 2011: lifetime = 22.7%. Wagner & Anthony 2002: 12-13% within a decade. 11% is approximately the 10-year estimate from survival analysis."},
      addictLife:    {ref:"lopez2011", conf:"measured", note:"Lopez-Quintero 2011: alcohol lifetime cumulative probability of dependence = 22.7%."},
      margin:        {ref:"gable2006", conf:"derived", note:"Gable 2006: alcohol safety ratio ~10:1. Best-case 5x and worst-case 2x account for aspiration risk at lower doses."},
      pctAsExpected: {ref:null, conf:"editorial", note:"Regulated commercial product."},
      dose:          {ref:"nhtsa", conf:"measured", note:"NHTSA standard drink equivalents."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // GHB
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"ghb",n:"GHB",cat:"depressant",aka:["G","Liquid Ecstasy","GBL","1,4-BD","Fantasy"],src:"synthetic",
    desc:"Great at right dose, deadly 0.5g later. Narrowest dosing window of any recreational drug.",
    blurb:"Synthesized in 1960 by French researcher Henri Laborit during research on GABA neurotransmission. One of the steepest dose-response curves of any recreational substance — the difference between a recreational dose and a fatal dose can be less than 2x. Combined with any other depressant, individually survivable doses become lethal.",
    atDose:2,atDoseLabel:"Safe IF precisely dosed",
    dangerRank:2,marginBest:2.5,marginWorst:1.5,marginLabel:"Very narrow — less than a teaspoon between comfortable and unconscious",
    marginExplain:"A comfortable dose is 1-2.5g. At 4-5g most people lose consciousness. That's only 2-2.5x, and the difference is less than a teaspoon of liquid. With any alcohol, the margin shrinks to about 1.5x. Volumetric dosing with a syringe is the only reliable way to measure — pouring is how most GHB overdoses happen.",
    supplyRisk:2,pctAsExpected:85,supplyLabel:"~85% — liquid is hard to adulterate",
    supplyExplain:"GHB liquid is hard to cut. Main danger: confusion between GHB, GBL, and 1,4-BD — GBL is ~2x as potent. A syringe is the only reliable way to measure doses this small.",
    addict:4,addictLabel:"Highly addictive",addictPct:2,addictPrefix:"~",addictLife:15,
    addictNote:"GHB has a paradoxical profile: casual use rarely leads to dependence, but daily use can produce severe physical dependence within weeks. Withdrawal includes seizures, delirium, and can be fatal.",
    overwhelm:1,overwhelmLabel:"Euphoric and social at correct dose — danger is physical, not psychological",
    feels:["Euphoria","Extreme sociability","Disinhibition","Muscle relaxation","Horniness","Music enhancement"],
    odRisk:["Sudden unconsciousness","Choking on vomit","Respiratory arrest","INSTANT DEATH with alcohol"],
    longTerm:["Severe physical dependence","Withdrawal WORSE than heroin (seizures, psychosis, death)","Sleep disruption","Memory issues"],
    harm:18,routes:[{nm:"Oral (measured liquid)",onset:"15–30 min",dur:"1.5–3 hr"}],
    dose:{threshold:"0.3 g",light:"0.5–1 g",common:"1–2.5 g",strong:"2.5–4 g",heavy:"4+ g (unconsciousness)"},
    lethal:{headline:"The difference between a great time and unconsciousness is less than half a teaspoon.",note:"GHB has the narrowest dosing window of any recreational drug. Adding ANY alcohol makes it potentially fatal.",cmp:"spoon",sz:34,realworld:"4-5ml alone can knock you out (that's less than a teaspoon). Add just one drink of alcohol and 1-2ml can kill you. Pouring rather than measuring with a syringe is how most GHB overdoses happen.",gable:{ed:"1.4–3 g",ld:"~16 g",ratio:"8:1"}},
    _src:{
      harm:          {ref:"nutt2010", conf:"measured", note:"Nutt 2010: GHB overall harm = 18"},
      addictPct:     {ref:null, conf:"estimated", note:"12% estimated from European clinical case series. No population-level survival analysis."},
      margin:        {ref:"gable2004", conf:"measured", note:"Gable 2004: GHB safety ratio = 8 (effective 1.4-3g, lethal 16g). Best-case 2.5x and worst-case 1.5x account for alcohol co-ingestion."},
      pctAsExpected: {ref:null, conf:"editorial", note:"85% estimated. GHB liquid is difficult to adulterate. GBL/1,4-BD confusion is the main quality concern."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki GHB dosing."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // BENZODIAZEPINES
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"benzodiazepine",n:"Benzodiazepines",sn:"Benzos",cat:"benzodiazepine",aka:["Benzos","Xanax","Valium","Klonopin","Ativan"],src:"synthetic",
    desc:"Safe alone. Combined with opioids or alcohol: one of the deadliest drug combos in existence.",
    blurb:"The first benzodiazepine (chlordiazepoxide/Librium) was discovered accidentally by Leo Sternbach in 1955. GABA-A receptor modulators that are relatively safe alone but extremely dangerous combined with opioids, alcohol, or GHB. Physical dependence develops within 2-4 weeks of daily use, and withdrawal can cause seizures.",
    atDose:2,atDoseLabel:"Safe alone",
    dangerRank:13,marginBest:30,marginWorst:1,marginLabel:"Very wide ALONE — almost none with opioids or alcohol",
    marginExplain:"Benzos alone have a genuinely large safety margin — some clinical reports describe survival after 30x+ normal doses (e.g. flurazepam). BUT: add any opioid and the margin drops to ~1x. Benzos + opioids is one of the most dangerous poly-drug combinations — 92.7% of benzo-involved deaths also involve opioids (CDC 2020). Since ~2017, stimulant-opioid deaths have surged past benzo-opioid in absolute numbers.",
    supplyRisk:5,pctAsExpected:60,supplyLabel:"~60% from pharmacy; street pills extremely dangerous",
    supplyExplain:"Pharmacy benzos: 100% safe. Street 'Xanax bars': frequently contain fentanyl or novel benzos (bromazolam rose from 4% to 73% of novel benzos by 2023). Pressed pills have wildly unpredictable dosing — bromazolam content ranges from 0.09 mg to 5.4 mg in tested samples, a 60x variance. One of the primary vectors for fentanyl poisoning.",
    addict:4,addictLabel:"Highly addictive",addictPct:9,addictPrefix:"~",addictLife:9.2,
    addictNote:"Physical dependence can develop in 2-4 weeks of daily use. Prescribed users often don't realize they're dependent until they try to stop. Withdrawal can cause seizures and death. The 9.2% rate is from a broad 'sedatives' category; clinical dependence rates for daily users are far higher.",
    overwhelm:1,overwhelmLabel:"Literally anti-anxiety medication — calming, not distressing",
    feels:["Anxiety gone","Calm","Sedation","Muscle relaxation","Disinhibition","Memory gaps"],
    odRisk:["Respiratory depression (with opioids/alcohol)","Aspiration"],
    longTerm:["Severe dependence","Withdrawal seizures (can be fatal — abrupt cessation is life-threatening)","Cognitive impairment","Rebound anxiety worse than original"],
    harm:15,routes:[{nm:"Oral",onset:"15–60 min",dur:"4–12 hr"},{nm:"Sublingual",onset:"5–15 min",dur:"4–8 hr"}],
    dose:{threshold:"Varies",light:"0.25 mg alp eq",common:"0.5–1 mg",strong:"1–2 mg",heavy:"2+ mg"},
    lethal:{headline:"Very hard to die from benzos alone. Mix with opioids or alcohol: one of the deadliest combos.",note:"Benzodiazepines alone have a wide safety margin. The danger is combinations — benzos + opioids is one of the most dangerous poly-drug combinations in the US.",cmp:"pill",sz:22,realworld:"Taking 10 Xanax might just knock you out for a day. Taking 2 Xanax with a few drinks or any opioid can stop your breathing permanently."},
    _src:{
      harm:          {ref:"nutt2010", conf:"measured", note:"Nutt 2010: benzodiazepines overall harm = 15"},
      addictPct:     {ref:["anthony1994","blanco2018"], conf:"estimated", note:"14% estimated from clinical literature. Nutt 2007 development scale rated benzos high on dependence. No survival analysis data."},
      margin:        {ref:null, conf:"derived", note:"Best-case 30x documented in clinical toxicology (massive benzo overdoses survived with supportive care). Worst-case 1x reflects lethal synergy with opioids."},
      pctAsExpected: {ref:"dea_nflis", conf:"estimated", note:"60% estimated. Pharmacy benzos: 100%. Street market increasingly contaminated with fentanyl and novel benzodiazepines (DEA alerts)."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"Alprazolam equivalents from PsychonautWiki."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // OPIOIDS (HEROIN)
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"opioids",n:"Opioids (Heroin)",sn:"Opioids",cat:"opioid",aka:["Heroin","Morphine","H","Smack","Dope","Codeine"],src:"both",
    desc:"Narrowest safety margin of common drugs. #1 overdose killer. In most US markets, 'heroin' IS fentanyl now.",
    blurb:"Heroin was synthesized in 1874 and marketed by Bayer in 1898 as a non-addictive morphine substitute. Mu-opioid receptor agonist that produces profound pain relief and euphoria. In most US markets, samples sold as heroin now contain primarily fentanyl — only ~2% test as expected heroin.",
    atDose:4,atDoseLabel:"Dangerous",
    dangerRank:3,marginBest:3,marginWorst:1,marginLabel:"Small margin even with known doses, unknown with street supply",
    marginExplain:"With pharmaceutical opioids of known potency: respiratory depression typically starts at ~2-3x a standard dose. With street heroin — which in most US markets is actually fentanyl — the potency is completely unknown. The effective margin from street supply is essentially unknowable.",
    supplyRisk:5,pctAsExpected:2,supplyLabel:"~2% in US — 'heroin' is almost entirely fentanyl now",
    supplyExplain:"Maryland RAD (2021-2024): Only 1.9% of samples intended as heroin tested positive for heroin. European markets differ — Italy GC/MS found 88% heroin concordance. ASSUME IT'S FENTANYL in the US. Always carry Narcan.",
    addict:5,addictLabel:"EXTREMELY addictive",addictPct:23,addictPrefix:"~",addictLife:23.1,
    addictNote:"Nearly 1 in 4 people who try heroin become dependent. One of the highest capture rates of any substance. Tolerance builds rapidly.",
    overwhelm:1,overwhelmLabel:"Calming — feels like a warm blanket",
    feels:["Euphoria ('warm blanket')","Total pain relief","Deep sedation","Warmth","Nausea","Itching"],
    odRisk:["YOU STOP BREATHING","Aspiration","Cardiac arrest","Death — #1 cause of drug overdose death"],
    longTerm:["Severe addiction (often within days)","Tolerance escalation","Vein damage/infections (IV)","Constipation","Social destruction","Withdrawal (excruciating but not fatal)"],
    harm:55,routes:[{nm:"Intravenous",onset:"Seconds",dur:"3–5 hr"},{nm:"Smoked",onset:"Seconds",dur:"3–5 hr"},{nm:"Insufflated",onset:"5–15 min",dur:"3–6 hr"},{nm:"Oral",onset:"15–45 min",dur:"4–6 hr"}],
    dose:{threshold:"~5 mg morph eq",light:"5–15 mg",common:"15–30 mg",strong:"30–60 mg",heavy:"60+ mg"},
    lethal:{headline:"30mg of morphine — about two pills — can kill someone who doesn't use regularly.",note:"The gap between 'high' and 'stopped breathing' is terrifyingly small. If someone stops breathing: CALL 911 and give NARCAN immediately.",cmp:"pill",sz:22,realworld:"Two prescription morphine pills, or a single bag of street heroin, can be fatal if you don't have tolerance. And you can never be sure of street heroin potency.",gable:{ed:"8 mg IV",ld:"~50 mg",ratio:"6:1"}},
    _src:{
      harm:          {ref:"nutt2010", conf:"measured", note:"Nutt 2010: heroin overall harm = 55"},
      addictPct:     {ref:["anthony1994","wagner2002"], conf:"derived", note:"Anthony 1994: ~23% of heroin users develop dependence. 18% 10-year estimate."},
      addictLife:    {ref:"anthony1994", conf:"measured", note:"Anthony 1994: 23.1% lifetime dependence rate for heroin."},
      margin:        {ref:"gable2006", conf:"derived", note:"Gable 2006: heroin safety ratio ~6:1. Best-case 3x and worst-case 1x reflect street supply variability."},
      pctAsExpected: {ref:"maryland_rad", conf:"measured", note:"Maryland RAD 2021-2024: 1.9% heroin concordance. European markets significantly different (Italy GC/MS: 88%)."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"Morphine equivalents from PsychonautWiki."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // FENTANYL
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"fentanyl",n:"Fentanyl",cat:"opioid",aka:["Fent","Blues","Pressed pills","China White"],src:"synthetic",
    desc:"50-100x morphine potency. Lethal dose invisible to naked eye. Primary overdose crisis driver. Found in pills, powder, cocaine, meth, and counterfeit prescriptions.",
    blurb:"Synthesized in 1960 by Paul Janssen and originally used exclusively in surgical anesthesia. Approximately 50-100x more potent than morphine, with an active dose measured in micrograms. Now detected as a contaminant in cocaine, methamphetamine, pressed pills, and counterfeit prescriptions across most US drug markets.",
    atDose:5,atDoseLabel:"LETHAL at street doses",
    dangerRank:1,marginBest:20,marginWorst:1,marginLabel:"Wide in medical settings, essentially zero from street supply",
    marginExplain:"Pharmaceutical fentanyl (patches, lozenges) in medical settings has a known dose and is administered with monitoring — the margin is meaningful. But street fentanyl in pressed pills or powder has completely random distribution. Two pills from the same batch can contain 0.1mg and 5mg. From street supply, the effective margin is 1x — every dose is a guess.",
    supplyRisk:5,pctAsExpected:50,supplyLabel:"~50% is fentanyl + adulterants",
    supplyExplain:"~45-57% of street fentanyl contains additional active substances — benzos, xylazine ('tranq'), fluorofentanyl, medetomidine. You're not even getting 'just' fentanyl.",
    addict:5,addictLabel:"EXTREMELY addictive",addictPct:23,addictPrefix:"~",addictLife:25,
    addictNote:"Same mechanism as heroin but faster onset = stronger reinforcement. Most fentanyl exposure is unintentional. Dependence develops very rapidly.",
    overwhelm:1,overwhelmLabel:"You feel fine until you stop breathing — danger is physical, not psychological",
    feels:["Brief intense euphoria","Total pain elimination","Extreme sedation"],
    odRisk:["DEATH FROM INVISIBLE AMOUNT","Respiratory arrest in seconds","Cardiac arrest"],
    longTerm:["Severe addiction","Tolerance escalation","xylazine contamination → skin necrosis ('tranq wounds')"],
    harm:90,routes:[{nm:"Any route",onset:"Seconds (IV/smoked)",dur:"30–90 min"}],
    dose:{threshold:"12 µg",light:"25 µg",common:"25–50 µg",strong:"DO NOT",heavy:"DO NOT"},
    lethal:{headline:"2 milligrams will kill you. That's a few grains of salt. You can't even see it.",note:"ALWAYS test with fentanyl strips. ALWAYS carry Narcan. If someone stops breathing: CALL 911 and give Narcan IMMEDIATELY.",cmp:"grain",sz:6,realworld:"This dot is roughly the size of a lethal dose. It would disappear on your fingertip. You cannot see it, taste it, or smell it in a pressed pill or powder."},
    _src:{
      harm:          {ref:"broman2025", conf:"measured", note:"Broman et al. 2025 (Harm Reduction Journal): fentanyl scored 90/100 — highest of all 19 drugs assessed in US expert MCDA, exceeding meth (84), crack (83), and heroin (82). Also scored in van Amsterdam 2015 (54, UK opioid-specific) and Bonomo 2019 (50, Australian)."},
      addictPct:     {ref:null, conf:"estimated", note:"20% extrapolated from heroin rates. Same mu-opioid receptor, faster onset. No direct measurement."},
      margin:        {ref:null, conf:"derived", note:"Best-case 20x in medical settings (well-controlled pharmaceutical dosing). Worst-case 1x from street supply with random dosing."},
      pctAsExpected: {ref:"maryland_rad", conf:"derived", note:"Maryland RAD: xylazine in 57% of fentanyl samples (2022). 50% 'fentanyl only' estimate from RAD data."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"Fentanyl dosing from clinical pharmacology."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // TRAMADOL
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"tramadol",n:"Tramadol",cat:"opioid",aka:["Ultram","Tramal"],src:"synthetic",
    desc:"Atypical opioid. Uniquely causes seizures AND serotonin syndrome — double danger most opioids don't have.",
    blurb:"Developed in 1962 by the German pharmaceutical company Grünenthal. An atypical opioid that also inhibits serotonin and norepinephrine reuptake, creating interaction risks that pure opioids don't have. Lowers seizure threshold — seizures occur even at prescribed doses — and is uniquely dangerous with other serotonergic drugs due to serotonin syndrome risk.",
    atDose:2,atDoseLabel:"Safe at low Rx doses",
    dangerRank:11,marginBest:6,marginWorst:2,marginLabel:"Moderate alone, less with antidepressants",
    marginExplain:"From tramadol alone: seizure risk climbs above 400mg (~4-6x a 75-100mg dose). But tramadol also acts on serotonin, so combined with SSRIs, the margin for serotonin syndrome is much smaller — potentially 2x or less. The interaction between tramadol and antidepressants is a common source of emergency visits.",
    supplyRisk:2,pctAsExpected:90,supplyLabel:"~90% — usually pharmaceutical",
    supplyExplain:"Most tramadol is pharmaceutical. Counterfeit tramadol exists but is less targeted than higher-value opioids.",
    addict:3,addictLabel:"Moderately addictive",addictPct:10,addictPrefix:"~",addictLife:12,
    addictNote:"Lower than strong opioids. Dependence develops with regular use, and withdrawal includes both opioid symptoms and seizure risk.",
    overwhelm:1,overwhelmLabel:"Mild warmth and calm",
    feels:["Mild euphoria","Pain relief","Warmth","Mood lift"],
    odRisk:["Seizures (dose-dependent)","Serotonin syndrome","Respiratory depression"],
    longTerm:["Dependence","Withdrawal (seizure risk)","Serotonin depletion"],
    harm:18,harmEstimated:true,routes:[{nm:"Oral",onset:"30–60 min",dur:"4–6 hr"}],
    dose:{threshold:"25 mg",light:"50–100 mg",common:"100–200 mg",strong:"200–300 mg",heavy:"300+ mg"},
    lethal:{headline:"Above 400mg: seizures. With SSRIs or MDMA: potentially fatal serotonin syndrome.",note:"Tramadol is unique among opioids — it also affects serotonin, creating two separate danger pathways.",cmp:"pill",sz:22,realworld:"Eight 50mg pills can trigger seizures. Taking tramadol the same week as MDMA or while on antidepressants can cause serotonin syndrome — a medical emergency."},
    _src:{
      harm:          {ref:null, conf:"estimated", note:"Tramadol not in Nutt 2010. Estimated at 18 (same as GHB) based on seizure risk, serotonin syndrome potential, and opioid dependence. Editorial estimate."},
      addictPct:     {ref:null, conf:"estimated", note:"8% estimated. No epidemiological data. Based on weak opioid pharmacology."},
      margin:        {ref:null, conf:"derived", note:"Best-case 6x from seizure threshold (~400mg vs ~75mg dose). Worst-case 2x with SSRI co-administration."},
      pctAsExpected: {ref:null, conf:"editorial", note:"Mostly pharmaceutical. 90% estimated."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki tramadol dosing."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // KRATOM
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"kratom",n:"Kratom",cat:"opioid",aka:["Mitragynine","Ketum","Biak"],src:"natural",
    desc:"Plant-based. Low doses stimulating, high doses sedating. Under-researched but increasingly popular.",
    blurb:"Derived from the leaves of Mitragyna speciosa, used for centuries in Southeast Asia by laborers and in traditional medicine. Partial mu-opioid agonist with dose-dependent effects — stimulating at low doses, sedating at high doses. Only 5% of kratom-positive overdose deaths had kratom as the sole substance; fatality risk increases when combined with other depressants.",
    atDose:2,atDoseLabel:"Likely safe at low doses",
    dangerRank:12,marginBest:5,marginWorst:2,marginLabel:"Moderate alone, narrower with other opioids",
    marginExplain:"Kratom alone at 3-5g is generally well-tolerated. Serious nausea and sedation appear around 15-20g (3-5x). Deaths from kratom alone are very rare. But kratom acts on opioid receptors — combining with other opioids narrows the margin significantly.",
    supplyRisk:3,pctAsExpected:75,supplyLabel:"~75% — unregulated, variable quality",
    supplyExplain:"Not standardized. Potency varies enormously between products and batches. Some contaminated with heavy metals or salmonella. Vendors with third-party lab testing are more reliable.",
    addict:3,addictLabel:"Highly addictive (with regular use)",addictPct:50,addictPrefix:">",addictLife:50,
    addictNote:"This is among regular daily users in a Malaysian plantation worker population, not occasional users. The dependence rate among all people who try kratom is unknown and almost certainly much lower.",
    overwhelm:1,overwhelmLabel:"Mildly calming or stimulating",
    feels:["Energy (low dose)","Pain relief (high dose)","Mood lift","Sedation (high dose)","Sociability"],
    odRisk:["Respiratory depression (with other opioids)","Seizures (rare)","Liver injury (rare)"],
    longTerm:["Physical dependence","Withdrawal (opioid-like)","Liver damage (rare)","Weight loss","Constipation"],
    harm:12,harmEstimated:true,routes:[{nm:"Oral (powder/capsules)",onset:"15–30 min",dur:"3–6 hr"}],
    dose:{threshold:"1 g",light:"1–3 g",common:"3–5 g",strong:"5–8 g",heavy:"8+ g"},
    lethal:{headline:"Deaths from kratom alone are very rare — almost always other substances were involved.",note:"Kratom has a relatively wide margin compared to pharmaceutical opioids. However, it can cause dependence and withdrawal.",cmp:"spoon",sz:34,realworld:"You would need to consume a very large amount of kratom powder to be in physical danger. The bigger risk is becoming dependent with daily use."},
    _src:{
      harm:          {ref:null, conf:"estimated", note:"Kratom not in Nutt 2010. Estimated at 12 based on partial opioid agonist profile, low acute toxicity, and under-researched status."},
      addictPct:     {ref:null, conf:"estimated", note:"8% estimated from partial agonist pharmacology. No epidemiological data."},
      margin:        {ref:null, conf:"editorial", note:"Best-case 5x and worst-case 2x estimated from clinical reports. Nausea is self-limiting at high doses."},
      pctAsExpected: {ref:"uvic", conf:"estimated", note:"75% estimated. Unregulated supplement market with variable quality. UVic drug checking has tested some kratom products."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki kratom dosing."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // CAFFEINE
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"caffeine",n:"Caffeine",cat:"stimulant",aka:["Coffee","Tea","Energy drinks","Pre-workout"],src:"natural",
    desc:"Safe from beverages. Pure caffeine powder is surprisingly deadly — a tablespoon can kill.",
    blurb:"Consumed for over a millennium — coffee cultivation traces to 9th-century Ethiopia, tea to ancient China. The world's most widely consumed psychoactive substance, acting as an adenosine receptor antagonist. Physical dependence develops quickly, with withdrawal headaches beginning 12-24 hours after the last dose.",
    atDose:1,atDoseLabel:"Very safe (beverages)",
    dangerRank:20,marginBest:50,marginWorst:5,marginLabel:"Huge from drinks, surprisingly narrow from pure powder",
    marginExplain:"From coffee or energy drinks: you'd need 75-100 cups to reach a lethal dose. From caffeine pills (200mg): about 50 pills, still a very wide margin. But from pure caffeine powder: a tablespoon (~10,000mg) is lethal. Several teenagers have died from measuring errors with bulk caffeine powder.",
    supplyRisk:1,pctAsExpected:99,supplyLabel:"~99% — commercial products standardized",
    supplyExplain:"Commercial caffeine products are standardized and regulated.",
    addict:2,addictLabel:"Mildly addictive",addictPct:8,addictLife:12,
    addictNote:"Withdrawal (headaches, fatigue) is extremely common but mild and brief. Most people consider it a minor inconvenience rather than an addiction.",
    overwhelm:0,overwhelmLabel:"No psychological risk",
    feels:["Alertness","Focus","Energy","Reduced tiredness","Mild anxiety at high dose"],
    odRisk:["Cardiac arrhythmia","Seizures (pure powder)","Vomiting"],
    longTerm:["Mild dependence","Withdrawal headaches","Sleep disruption","Anxiety"],
    harm:3,harmEstimated:true,routes:[{nm:"Oral",onset:"15–45 min",dur:"3–5 hr"}],
    dose:{threshold:"20 mg",light:"50–100 mg",common:"100–200 mg",strong:"200–400 mg",heavy:"400+ mg"},
    lethal:{headline:"A single tablespoon of pure caffeine powder can kill you. You can't overdose on coffee.",note:"You'd need ~75-100 cups of coffee to reach a lethal dose. But pure caffeine powder is shockingly dangerous — deaths have occurred from a single scoop.",cmp:"spoon",sz:34,realworld:"One tablespoon of pure caffeine powder = roughly 75 espressos all at once. Several teenagers have died this way. Bulk caffeine powder is virtually impossible to dose safely without a milligram scale.",gable:{ed:"100 mg",ld:"~10 g",ratio:"100:1"}},
    _src:{
      harm:          {ref:null, conf:"estimated", note:"Caffeine not in Nutt 2010. Estimated at 3 based on very low harm profile from beverage consumption. Khat scored 9 in Nutt for rough reference."},
      addictPct:     {ref:null, conf:"estimated", note:"8% estimated from DSM-5 caffeine use disorder prevalence estimates. Not from survival analysis."},
      margin:        {ref:"gable2006", conf:"derived", note:"Gable 2006: caffeine safety ratio ~100:1 from beverages. Best-case 50x from beverages, worst-case 5x from pure powder."},
      pctAsExpected: {ref:null, conf:"editorial", note:"Regulated commercial products."},
      dose:          {ref:"psychonautwiki", conf:"measured", note:"PsychonautWiki caffeine dosing."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // SSRIs
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"ssri",n:"SSRIs",cat:"medication",aka:["Prozac","Zoloft","Lexapro","Sertraline"],src:"synthetic",
    desc:"Not recreational. Here because SSRIs dramatically change how other drugs work. Critical interaction profile.",
    blurb:"Fluoxetine (Prozac), the first widely prescribed SSRI, was approved in 1987 and transformed psychiatric treatment. The most prescribed antidepressant class, blocking serotonin reuptake. They block MDMA's primary mechanism, reducing its effects by 30-80%, which often leads to compensatory redosing at dangerous amounts.",
    isMedication:true,atDose:null,atDoseLabel:null,
    dangerRank:21,marginBest:null,marginWorst:null,marginLabel:"Not recreational — here for interaction awareness",
    marginExplain:"SSRIs themselves are not the danger. The danger is what they do to other drugs: they block MDMA from working (tempting people to dangerously re-dose), they reduce psychedelic effects, and they can cause fatal serotonin syndrome with tramadol, DXM, or MAOIs.",
    supplyRisk:1,pctAsExpected:100,supplyLabel:"100% — pharmaceutical",
    supplyExplain:"No supply risk from pharmacy-dispensed medication.",
    addict:1,addictLabel:"Not addictive (but discontinuation syndrome)",addictPct:0,addictLife:0,
    addictNote:"Not addictive. Discontinuation syndrome is physical dependence, not addiction — no craving, no reward-seeking. Taper slowly under medical guidance.",
    overwhelm:2,overwhelmLabel:"Can cause emotional blunting or agitation initially",
    feels:["Antidepressant (weeks)","Blocks MDMA","Reduces psychedelics"],
    odRisk:["Serotonin syndrome (with serotonergic drugs)"],
    longTerm:["Sexual dysfunction","Emotional blunting","Discontinuation syndrome (taper slowly)"],
    harm:null,routes:[{nm:"Oral (daily)",onset:"Weeks",dur:"Continuous"}],
    dose:{threshold:"Rx",light:"—",common:"Varies",strong:"—",heavy:"—"},
    lethal:{headline:"Not dangerous alone — but critical to know about for drug interactions.",note:"SSRIs block MDMA from working and reduce psychedelic effects. Combining SSRIs with tramadol, DXM, or MAOIs can cause fatal serotonin syndrome.",cmp:null,sz:0,realworld:null},
    _src:{
      harm:          {ref:null, conf:"editorial", note:"Not scored in Nutt 2010 (not a recreational drug). Harm set to null — included for interaction awareness only."},
      addictPct:     {ref:null, conf:"editorial", note:"Clinical consensus. Discontinuation syndrome ≠ addiction."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // MAOIs
  // ═══════════════════════════════════════════════════════════════════════════
  {id:"maoi",n:"MAOIs",cat:"medication",aka:["Nardil","Parnate","Harmaline","Syrian Rue"],src:"both",
    desc:"Most interaction-dangerous drug class. MAOIs make dozens of substances AND certain foods lethal.",
    blurb:"The first MAOI (iproniazid) was discovered in the 1950s when a tuberculosis drug was noticed to produce euphoria in patients. Monoamine oxidase inhibitors prevent the breakdown of serotonin, dopamine, and norepinephrine. Create the most dangerous drug interactions of any medication class — combining with serotonin releasers or tyramine-rich foods can cause fatal serotonin syndrome or hypertensive crisis.",
    isMedication:true,atDose:null,atDoseLabel:null,
    dangerRank:19,marginBest:null,marginWorst:null,marginLabel:"Not about dose — MAOIs make other things lethal",
    marginExplain:"The MAOI itself isn't what kills you. It's the interaction: MAOIs prevent your body from breaking down tyramine, serotonin, and various other substances. A normal dose of MDMA, a block of aged cheese, or a dose of cold medicine can become lethal.",
    supplyRisk:1,pctAsExpected:100,supplyLabel:"100% — pharmaceutical or identifiable plant",
    supplyExplain:"Pharmaceutical MAOIs or Syrian Rue (identifiable plant) — no supply concerns.",
    addict:1,addictLabel:"Not addictive",addictPct:0,addictLife:0,
    addictNote:"No addiction potential whatsoever.",
    overwhelm:3,overwhelmLabel:"Not overwhelming alone — but potentiates everything dramatically",
    feels:["Antidepressant","Potentiates substances dramatically"],
    odRisk:["Hypertensive crisis (fatal)","Serotonin syndrome (fatal)","Tyramine crisis from FOODS"],
    longTerm:["Weight gain","Insomnia","Requires strict dietary adherence"],
    harm:null,routes:[{nm:"Oral",onset:"Varies",dur:"Hours to permanent"}],
    dose:{threshold:"Rx",light:"—",common:"Varies",strong:"—",heavy:"—"},
    lethal:{headline:"MAOIs make dozens of other substances — and even some foods — potentially lethal.",note:"Aged cheese, cured meats, soy sauce, red wine — all can cause a fatal blood pressure spike on MAOIs. Plus nearly every stimulant and serotonergic drug.",cmp:null,sz:0,realworld:null},
    _src:{
      harm:          {ref:null, conf:"editorial", note:"Not scored in Nutt 2010 (not a recreational drug). Harm set to null — included for interaction awareness only."},
      addictPct:     {ref:null, conf:"editorial", note:"Clinical consensus."},
    }},

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDICATIONS — not recreational, but critical for interaction awareness
  // ═══════════════════════════════════════════════════════════════════════════

  {id:"gabapentin",n:"Gabapentin / Pregabalin",sn:"Gabapentin",cat:"medication",
    aka:["Neurontin","Lyrica","Pregabalin","Gralise"],src:"synthetic",
    desc:"Nerve pain and seizure medication. 7th most prescribed drug in the US. Combined with opioids, it increases overdose death risk by 50-98%. FDA issued a respiratory depression warning in 2019.",
    isMedication:true,
    atDose:null,atDoseLabel:null,dangerRank:null,
    marginBest:null,marginWorst:null,marginLabel:null,
    marginExplain:"Gabapentin potentiates opioid respiratory depression through a separate mechanism — it reduces CO2 responsiveness in the brainstem breathing center. Opioids also slow the gut, which increases gabapentin absorption, creating a pharmacokinetic feedback loop. 15-22% of people with opioid use disorder also misuse gabapentin.",
    supplyRisk:null,pctAsExpected:null,supplyLabel:null,supplyExplain:null,
    addict:null,addictLabel:null,addictPct:0,addictLife:0,addictNote:null,
    overwhelm:null,overwhelmLabel:null,
    feels:[],odRisk:["Respiratory depression (with opioids/alcohol/benzos)","Sedation","Loss of consciousness"],longTerm:[],
    harm:null,routes:[{nm:"Oral",onset:"1–2 hr",dur:"5–7 hr"}],
    dose:{threshold:"Rx",light:"—",common:"300–600 mg",strong:"—",heavy:"—"},
    lethal:{headline:"Gabapentin + opioids: FDA black box warning. 90% of gabapentin-involved overdose deaths also involved opioids.",note:"Gabapentin alone rarely kills. Combined with opioids, benzos, or alcohol, it dramatically increases respiratory depression risk. The FDA required a warning in 2019 after documenting cases of fatal respiratory depression.",cmp:null,sz:0,realworld:null},
    _src:{harm:{ref:null,conf:"editorial",note:"Not a recreational substance. No MCDA score. Included for interaction data only."},margin:{ref:"gomes2017",conf:"derived",note:"Gomes et al. 2017 (PLOS Medicine): 49% increased risk of opioid-related death with gabapentin co-prescription. FDA 2019 warning: 49 cases respiratory depression, 12 deaths, 92% had CNS depressant co-use."}}},

  {id:"antiretroviral",n:"HIV Antiretrovirals (ritonavir/cobicistat)",sn:"HIV ARVs",cat:"medication",
    aka:["Ritonavir","Norvir","Cobicistat","Tybost","Kaletra","Stribild","Genvoya","Paxlovid"],src:"synthetic",
    desc:"HIV protease inhibitor boosters. Also in Paxlovid (COVID treatment). Ritonavir and cobicistat are powerful CYP3A4/CYP2D6 inhibitors that can increase blood levels of MDMA, meth, and ketamine by 2-10x. There are documented deaths from normal recreational doses becoming lethal overdoses.",
    isMedication:true,
    atDose:null,atDoseLabel:null,dangerRank:null,
    marginBest:null,marginWorst:null,marginLabel:null,
    marginExplain:"Ritonavir blocks the liver enzymes (CYP3A4, CYP2D6) that break down many recreational drugs. A normal dose of MDMA or meth stays in your body 2-10x longer and reaches much higher blood levels. A 32-year-old man on ritonavir died after taking 2.5 MDMA pills — his blood levels matched someone who took 18 pills (Henry & Hill, Lancet 1998).",
    supplyRisk:null,pctAsExpected:null,supplyLabel:null,supplyExplain:null,
    addict:null,addictLabel:null,addictPct:0,addictLife:0,addictNote:null,
    overwhelm:null,overwhelmLabel:null,
    feels:[],odRisk:["Massively increased blood levels of recreational drugs","Prolonged/intensified effects","Fatal overdose from normal doses"],longTerm:[],
    harm:null,routes:[{nm:"Oral (daily)",onset:"N/A",dur:"Continuous"}],
    dose:{threshold:"Rx",light:"—",common:"Varies",strong:"—",heavy:"—"},
    lethal:{headline:"Normal recreational doses become lethal overdoses. Documented deaths with MDMA, meth, and GHB.",note:"If you take ritonavir or cobicistat (check your HIV meds), normal doses of MDMA, methamphetamine, ketamine, GHB, and benzodiazepines can kill you. Psilocybin may be a safer alternative as it uses different metabolic pathways.",cmp:null,sz:0,realworld:null},
    _src:{harm:{ref:null,conf:"editorial",note:"Not recreational. Included for CYP interaction data. Key citation: Henry & Hill 1998 (Lancet), Bracchi et al. 2015 (AIDS 29:1585-1592)."}}},

  {id:"bupropion",n:"Bupropion (Wellbutrin)",sn:"Wellbutrin",cat:"medication",
    aka:["Wellbutrin","Zyban","Bupropion","Aplenzin"],src:"synthetic",
    desc:"Antidepressant and smoking cessation aid. Unlike SSRIs, bupropion INTENSIFIES (not blunts) MDMA effects while also lowering seizure threshold and inhibiting CYP2D6. FAERS data: highest death rate of any antidepressant combined with MDMA.",
    isMedication:true,
    atDose:null,atDoseLabel:null,dangerRank:null,
    marginBest:null,marginWorst:null,marginLabel:null,
    marginExplain:"Bupropion is structurally related to cathinones (amphetamines). It inhibits dopamine and norepinephrine reuptake AND inhibits CYP2D6, which metabolizes MDMA. This means bupropion both adds its own stimulant effects AND prevents your body from clearing MDMA, producing higher blood levels of both drugs simultaneously. The seizure threshold is lowered by both drugs independently.",
    supplyRisk:null,pctAsExpected:null,supplyLabel:null,supplyExplain:null,
    addict:null,addictLabel:null,addictPct:0,addictLife:0,addictNote:null,
    overwhelm:null,overwhelmLabel:null,
    feels:[],odRisk:["Seizures (threshold lowered)","Intensified stimulant effects","Cardiac events"],longTerm:[],
    harm:null,routes:[{nm:"Oral (daily)",onset:"N/A",dur:"Continuous"}],
    dose:{threshold:"Rx",light:"—",common:"150–300 mg/day",strong:"—",heavy:"—"},
    lethal:{headline:"Highest death rate of any antidepressant combined with MDMA (OR 2.82 in FAERS data).",note:"If you switched from an SSRI to Wellbutrin, your recreational drug risk profile changed dramatically. SSRIs blunt MDMA. Wellbutrin intensifies it.",cmp:null,sz:0,realworld:null},
    _src:{harm:{ref:"cohen2021",conf:"measured",note:"Cohen et al. 2021 (Scientific Reports): bupropion OR 2.82 for death with MDMA. Schmid et al. 2015 (J Pharmacol Exp Ther): bupropion increased MDMA plasma concentrations in healthy volunteers."}}},

  {id:"pde5",n:"Viagra / Cialis (PDE5 Inhibitors)",sn:"Viagra/Cialis",cat:"medication",
    aka:["Viagra","Cialis","Levitra","Sildenafil","Tadalafil","Vardenafil","ED meds"],src:"synthetic",
    desc:"Erectile dysfunction medication. Combined with poppers (alkyl nitrites), blood pressure can drop to fatal levels. Both increase cyclic GMP — together they cause catastrophic vasodilation. Tadalafil (Cialis) has a 17.5-hour half-life.",
    isMedication:true,
    atDose:null,atDoseLabel:null,dangerRank:null,
    marginBest:null,marginWorst:null,marginLabel:null,
    marginExplain:"PDE5 inhibitors prevent the breakdown of cyclic GMP (cGMP). Poppers (NO donors) massively increase cGMP production. Together they create a cGMP flood that causes extreme vasodilation and fatal hypotension. This is an absolute pharmacological contraindication per Pfizer labeling and FDA guidance. Because tadalafil (Cialis) lasts 17+ hours, there is no safe window for popper use on the same day.",
    supplyRisk:null,pctAsExpected:null,supplyLabel:null,supplyExplain:null,
    addict:null,addictLabel:null,addictPct:0,addictLife:0,addictNote:null,
    overwhelm:null,overwhelmLabel:null,
    feels:[],odRisk:["Fatal hypotension (with poppers)","Cardiac arrest","Dangerous blood pressure drop"],longTerm:[],
    harm:null,routes:[{nm:"Oral",onset:"30–60 min",dur:"4–36 hr (varies)"}],
    dose:{threshold:"Rx",light:"—",common:"Varies",strong:"—",heavy:"—"},
    lethal:{headline:"Viagra/Cialis + poppers = potentially fatal blood pressure crash. Absolute contraindication.",note:"This is not a 'caution' — it is an absolute pharmacological contraindication documented by the AHA, FDA, and drug manufacturers. There have been deaths.",cmp:null,sz:0,realworld:null},
    _src:{harm:{ref:"cheitlin1999",conf:"measured",note:"Cheitlin et al. 1999 (Circulation 99:168-177): AHA scientific statement. Kloner 2010 (Circulation 122:88-95): synergistic cGMP mechanism review."}}},

  {id:"methadone_rx",n:"Methadone / Buprenorphine (MAT)",sn:"Methadone/Sub",cat:"medication",
    aka:["Methadone","Suboxone","Buprenorphine","Subutex","MAT","OAT","Dolophine"],src:"synthetic",
    desc:"Opioid maintenance/agonist therapy for addiction treatment. Combining with other opioids, benzos, alcohol, or sedatives is extremely dangerous. Methadone also prolongs QT interval, adding cardiac risk with stimulants.",
    isMedication:true,
    atDose:null,atDoseLabel:null,dangerRank:null,
    marginBest:null,marginWorst:null,marginLabel:null,
    marginExplain:"Methadone is a full opioid agonist with a very long half-life (24-36 hours) and QT-prolonging effects. Buprenorphine is a partial agonist with a ceiling effect on respiratory depression, making it safer but not risk-free. Both interact dangerously with other CNS depressants. Methadone + benzodiazepines account for a significant portion of methadone-related deaths.",
    supplyRisk:null,pctAsExpected:null,supplyLabel:null,supplyExplain:null,
    addict:null,addictLabel:null,addictPct:0,addictLife:0,addictNote:null,
    overwhelm:null,overwhelmLabel:null,
    feels:[],odRisk:["Respiratory depression (with benzos/alcohol/other opioids)","QT prolongation (methadone + stimulants)","Precipitated withdrawal (buprenorphine + full agonists)"],longTerm:[],
    harm:null,routes:[{nm:"Oral (daily)",onset:"Varies",dur:"24–36 hr (methadone)"}],
    dose:{threshold:"Rx",light:"—",common:"Varies",strong:"—",heavy:"—"},
    lethal:{headline:"On methadone: benzos, alcohol, and other opioids can stop your breathing. On Suboxone: using fentanyl on top risks respiratory depression.",note:"Methadone involved in ~23% of opioid deaths despite being only 1% of prescriptions. Buprenorphine has ceiling effect but is not risk-free with other depressants.",cmp:null,sz:0,realworld:null},
    _src:{harm:{ref:null,conf:"editorial",note:"CDC: methadone involved in ~23% of opioid deaths despite being only 1% of prescriptions. Buprenorphine has ceiling effect but is not risk-free with other depressants."}}},

  {id:"cyp_inhibitor",n:"CYP Inhibitor Meds (cancer, antifungal, antibiotic)",sn:"CYP Inhibitors",cat:"medication",
    aka:["Imatinib","Gleevec","Idelalisib","Zydelig","Ceritinib","Zykadia","Ribociclib","Kisqali","Voriconazole","Posaconazole","Ketoconazole","Itraconazole","Clarithromycin","Erythromycin","grapefruit warning","CYP3A4 inhibitor","CYP2D6 inhibitor"],
    src:"synthetic",
    blurb:"Many cancer drugs, antifungals, and some antibiotics block the same liver enzymes (CYP3A4, CYP2D6) that clear recreational substances from your body. The easiest way to know if your medication does this: if it has a grapefruit warning on the label, the same enzyme interaction applies to MDMA, methamphetamine, ketamine, and most benzodiazepines.",
    desc:"CYP3A4 and CYP2D6 are liver enzymes responsible for clearing most recreational drugs. Strong inhibitors — including targeted cancer therapies, azole antifungals, and macrolide antibiotics — slow clearance dramatically. A normal recreational dose stays in your blood 2-10x longer at higher concentrations.",
    isMedication:true,
    atDose:null,atDoseLabel:null,dangerRank:null,
    marginBest:null,marginWorst:null,marginLabel:null,
    marginExplain:"Your liver uses CYP enzymes like an assembly line to break down drugs. CYP3A4 alone handles roughly 50% of all medications. When a CYP inhibitor occupies the enzyme, other drugs queue up and accumulate in your blood. For recreational drugs with narrow safety margins (fentanyl, GHB, MDMA), even a 2x increase in blood levels can be the difference between a normal experience and a fatal overdose. Strong inhibitors (itraconazole, idelalisib) can increase substrate levels 5-10x, moderate inhibitors (imatinib, erythromycin) typically 2-4x.",
    supplyRisk:null,pctAsExpected:null,supplyLabel:null,supplyExplain:null,
    addict:null,addictLabel:null,addictPct:0,addictLife:0,addictNote:null,
    overwhelm:null,overwhelmLabel:null,
    feels:[],
    odRisk:["Massively increased blood levels of recreational drugs","Prolonged and intensified effects","Fatal overdose from previously tolerated doses"],
    longTerm:[],
    harm:null,
    routes:[{nm:"Oral (daily)",onset:"N/A",dur:"Continuous"}],
    dose:{threshold:"Rx",light:"—",common:"Varies by medication",strong:"—",heavy:"—"},
    lethal:{headline:"If your medication label says avoid grapefruit, it interacts with MDMA, meth, ketamine, GHB, and most benzos through the same mechanism.",note:"The grapefruit warning exists because grapefruit inhibits CYP3A4 via furanocoumarins (Bailey et al. 2013). Any drug with this warning is metabolized by CYP3A4 — and so are most recreational substances. Psilocybin mushrooms are a notable exception: they bypass CYP enzymes and are primarily cleared by glucuronidation.",cmp:null,sz:0,realworld:null},
    _src:{
      harm:{ref:null,conf:"editorial",note:"Not a recreational substance. Included for CYP interaction data."},
      desc:{ref:"zanger2013",conf:"measured",note:"CYP3A4 handles ~50% of medications: Zanger & Schwab 2013. Individual drug classifications from FDA prescribing information."},
    }},
];

// ── MEDICATION INTERACTION WARNINGS ──────────────────────────────────────────
// Medications that aren't recreational substances but have critical
// interactions with substances in our database. Shown as warnings on
// relevant substance detail pages.
export const MED_WARNINGS = [
  {
    id: "lithium",
    medication: "Lithium",
    aka: ["Lithobid", "Eskalith", "lithium carbonate"],
    affectedCats: ["psychedelic"],
    affectedIds: [],
    severity: "dangerous",
    color: "#ef4444",
    title: "LITHIUM + PSYCHEDELICS — SEIZURE RISK",
    text: "If you take lithium (for bipolar disorder or mood stabilization): LSD, psilocybin mushrooms, mescaline, and other classical psychedelics carry a severe seizure risk. A retrospective analysis found 47% of lithium + psychedelic reports involved seizures, and 39% required emergency medical attention. This is one of the most dangerous drug interactions known. Lamotrigine does not carry this risk.",
    source: "Nayak et al. 2021, J Psychopharmacol 35(4):398-401. Retrospective analysis of 80 online experience reports.",
  },
];

// ── HELPER ───────────────────────────────────────────────────────────────────
// Parse max duration hours from first route string like "4–6 hr" → 6
export function parseDur(s) {
  const r = s.routes[0]?.dur || "";
  const m = r.match(/(\d+)\s*hr/g);
  if (m && m.length) {
    const nums = m.map(x => parseInt(x));
    return Math.max(...nums);
  }
  const minM = r.match(/(\d+)\s*min/g);
  if (minM && minM.length) {
    const nums = minM.map(x => parseInt(x));
    return Math.max(...nums) / 60;
  }
  return 1;
}
