import { useState, useCallback, useMemo } from "react";

const CAT={psychedelic:{l:"Psychedelic",c:"#a855f7",b:"rgba(168,85,247,0.12)"},stimulant:{l:"Stimulant",c:"#f59e0b",b:"rgba(245,158,11,0.12)"},depressant:{l:"Depressant",c:"#3b82f6",b:"rgba(59,130,246,0.12)"},opioid:{l:"Opioid",c:"#ef4444",b:"rgba(239,68,68,0.12)"},dissociative:{l:"Dissociative",c:"#06b6d4",b:"rgba(6,182,212,0.12)"},empathogen:{l:"Empathogen",c:"#ec4899",b:"rgba(236,72,153,0.12)"},cannabinoid:{l:"Cannabinoid",c:"#22c55e",b:"rgba(34,197,94,0.12)"},benzodiazepine:{l:"Benzodiazepine",c:"#6366f1",b:"rgba(99,102,241,0.12)"},inhalant:{l:"Inhalant",c:"#78716c",b:"rgba(120,113,108,0.12)"}};
const RL={synergy:{l:"Low Risk · Synergistic",c:"#22c55e",i:"✦",d:"Effects complement each other. Use lower doses of each."},low_risk:{l:"Low Risk · No Synergy",c:"#60a5fa",i:"◉",d:"No significant interaction."},decrease:{l:"Low Risk · Decreased Effect",c:"#818cf8",i:"▽",d:"One reduces the other. May tempt re-dosing — don't."},caution:{l:"Caution",c:"#f59e0b",i:"⚠",d:"Unpredictable. Cut doses. Sober sitter."},unsafe:{l:"Unsafe",c:"#f97316",i:"⛔",d:"Significant harm risk. Strongly avoid."},dangerous:{l:"Dangerous",c:"#ef4444",i:"✕",d:"Can kill. Respiratory arrest, serotonin syndrome, seizures, or cardiac arrest."}};
const SRC_ICONS={"natural":"🌿","synthetic":"🧪","semi-synthetic":"🌿🧪","both":"🌿🧪"};
const SRC_LABELS={"natural":"Natural","synthetic":"Synthetic","semi-synthetic":"Semi-synthetic","both":"Natural & Synthetic"};
const ADDICT_COLORS=["#22c55e","#60a5fa","#f59e0b","#f97316","#ef4444"];

// ── SUBSTANCES ──
// src: natural/synthetic/semi-synthetic/both
// addict: 1-5 (1=minimal, 5=extreme)
// feels: short-term subjective effects
// odRisk: what happens in overdose
// longTerm: chronic/repeated use consequences
const S=[
{id:"lsd",n:"LSD",cat:"psychedelic",aka:["Acid","Lucy","Tabs","Blotter"],src:"semi-synthetic",
  desc:"Classical psychedelic. One of the safest substances by every measure.",
  atDose:1,atDoseLabel:"Very safe at normal doses",margin:1000,marginLabel:"Very hard to take too much",marginExplain:"Over 1,000× a normal dose before danger. No confirmed lethal dose.",
  supplyRisk:2,supplyLabel:"Usually what it claims",supplyExplain:"Blotter limits what fits. Occasionally NBOMes sold as LSD — USE EHRLICH REAGENT TEST.",
  addict:1,addictLabel:"Not addictive",
  feels:["Euphoria","Visual patterns","Deep introspection","Synesthesia","Awe","Giggles"],
  odRisk:["Extreme psychological distress","No physical overdose death recorded"],
  longTerm:["HPPD (rare — persistent visual disturbances)","Can surface latent psychosis","No organ damage","No physical dependence"],
  harm:7,routes:[{nm:"Oral / Sublingual",onset:"30–90 min",dur:"8–14 hr"}],
  dose:{threshold:"15 µg",light:"25–75 µg",common:"75–150 µg",strong:"150–300 µg",heavy:"300+ µg"},
  lethal:{headline:"Nobody has ever died from taking too much LSD.",note:"No confirmed death from LSD toxicity alone. Even massive accidental doses have been survived.",cmp:"bag",sz:60,realworld:"There is no realistic amount you could fit on blotter paper that would kill you. People have accidentally taken thousands of doses and survived."}},

{id:"mushrooms",n:"Psilocybin Mushrooms",cat:"psychedelic",aka:["Shrooms","Magic Mushrooms","Caps"],src:"natural",
  desc:"Among the safest psychoactives known. Identifiable whole mushrooms.",
  atDose:1,atDoseLabel:"Very safe",margin:1000,marginLabel:"Very hard to take too much",marginExplain:"~1.7 kg dried to approach toxicity. Impossible.",
  supplyRisk:1,supplyLabel:"Almost always real",supplyExplain:"Whole mushrooms identifiable by species. Very rarely adulterated.",
  addict:1,addictLabel:"Not addictive",
  feels:["Visual hallucinations","Emotional waves","Euphoria","Spiritual experiences","Connection to nature","Giggles"],
  odRisk:["Extreme psychological distress","No physical overdose death recorded"],
  longTerm:["No organ damage","No dependence","May improve depression (clinical research)","Can surface latent psychosis"],
  harm:5,routes:[{nm:"Eaten",onset:"20–60 min",dur:"4–6 hr"},{nm:"Tea",onset:"10–30 min",dur:"3–5 hr"}],
  dose:{threshold:"0.25 g",light:"0.5–1 g",common:"1–2.5 g",strong:"2.5–5 g",heavy:"5+ g"},
  lethal:{headline:"You'd have to eat nearly 4 pounds of dried mushrooms. That's physically impossible.",note:"Lethal dose estimated at ~1.7 kg dried — roughly 4 grocery bags stuffed full. Your body would reject them long before you got close.",cmp:"bag",sz:60,realworld:"Imagine eating 4 pounds of dried mushrooms in one sitting. You'd vomit long before reaching a dangerous amount. It simply cannot happen."}},

{id:"dmt",n:"DMT",cat:"psychedelic",aka:["Dimitri","Spirit Molecule","Ayahuasca"],src:"natural",
  desc:"Extremely potent, very short when smoked. Overwhelming but physically safe.",
  atDose:1,atDoseLabel:"Safe",margin:50,marginLabel:"Room for error",marginExplain:"~50× margin. Short duration limits exposure.",
  supplyRisk:2,supplyLabel:"Usually what it claims",supplyExplain:"Distinctive look/smell. Some fentanyl reports in powder — use fentanyl strips.",
  addict:1,addictLabel:"Not addictive",
  feels:["Intense hallucinations","Entity encounters","Ego dissolution","Time distortion","Profound awe"],
  odRisk:["Overwhelming psychological experience","No physical overdose death recorded"],
  longTerm:["No organ damage","No dependence","Can be psychologically destabilizing if used frequently"],
  harm:6,routes:[{nm:"Smoked / Vaped",onset:"Seconds",dur:"5–20 min"},{nm:"Oral (Ayahuasca)",onset:"30–60 min",dur:"3–6 hr"}],
  dose:{threshold:"5 mg",light:"10–20 mg",common:"20–40 mg",strong:"40–60 mg",heavy:"60+ mg"},
  lethal:{headline:"No one has died from smoking too much DMT.",note:"No documented death from smoked DMT toxicity. The experience becomes overwhelming long before any physical danger.",cmp:"pill",sz:22,realworld:"The experience becomes so intense that taking more is essentially impossible. Your body's self-limiting."}},

{id:"mescaline",n:"Mescaline",cat:"psychedelic",aka:["Peyote","San Pedro"],src:"natural",
  desc:"Natural cactus psychedelic. Long duration, wide safety margin.",
  atDose:1,atDoseLabel:"Safe",margin:24,marginLabel:"Room for error",marginExplain:"~24× margin.",
  supplyRisk:2,supplyLabel:"Usually what it claims",supplyExplain:"Cactus is identifiable. Synthetic mescaline very rare.",
  addict:1,addictLabel:"Not addictive",
  feels:["Color enhancement","Euphoria","Body warmth","Nature connection","Introspection"],
  odRisk:["Severe nausea","Psychological distress"],
  longTerm:["No organ damage","No dependence","Sacred use in indigenous cultures for millennia"],
  harm:6,routes:[{nm:"Oral",onset:"45–120 min",dur:"8–12 hr"}],
  dose:{threshold:"50 mg",light:"100–150 mg",common:"200–300 mg",strong:"300–500 mg",heavy:"500+ mg"},
  lethal:{headline:"You'd need to eat over 2 ounces of pure mescaline — roughly a full shot glass of powder.",note:"Very high safety margin. The severe nausea from cactus material makes overconsumption extremely unlikely.",cmp:"cup",sz:40,realworld:"Picture a full shot glass of pure powder, or eating several feet of cactus. You'd be vomiting long before reaching danger."}},

{id:"2cx",n:"2C-x (2C-B, 2C-E, 2C-I)",cat:"psychedelic",aka:["Nexus","Bees","Tusi","Pink cocaine"],src:"synthetic",
  desc:"Phenethylamine psychedelic family. Very dose-sensitive — small increases cause big jumps. 'Tusi/pink cocaine' sold as 2C-B usually isn't.",
  atDose:2,atDoseLabel:"Safe if dosed carefully",margin:15,marginLabel:"Some room for error",marginExplain:"~15× margin, but effects jump sharply. The diff between 20mg and 30mg is enormous.",
  supplyRisk:4,supplyLabel:"Often not what it claims",supplyExplain:"'Tusi'/'pink cocaine' often contains ketamine, MDMA, caffeine, or no 2C-B at all. Reagent test essential.",
  addict:1,addictLabel:"Not addictive",
  feels:["Vivid colors","Body euphoria","Enhanced touch","Mild empathy","Giggles","Music enhancement"],
  odRisk:["Severe nausea","Vasoconstriction","Hypertension at high doses"],
  longTerm:["Limited research","No known organ damage","No dependence"],
  harm:8,routes:[{nm:"Oral",onset:"45–90 min",dur:"4–6 hr"},{nm:"Insufflated",onset:"5–15 min",dur:"2–4 hr"}],
  dose:{threshold:"5 mg",light:"8–15 mg",common:"15–25 mg",strong:"25–35 mg",heavy:"35+ mg"},
  lethal:{headline:"No established lethal dose — but effects jump dramatically with small increases.",note:"Steep dose-response curve. The difference between a comfortable experience and an overwhelming one can be just 5-10mg.",cmp:"pill",sz:22,realworld:"Going from 20mg to 30mg doesn't feel like 50% more — it can feel like a completely different drug. Always weigh precisely with a milligram scale."}},

{id:"mdma",n:"MDMA",cat:"empathogen",aka:["Ecstasy","Molly","E","X","Mandy"],src:"synthetic",
  desc:"The drug itself is moderately safe. Real dangers: overheating, water intoxication, and what's actually in the pill.",
  atDose:2,atDoseLabel:"Moderately safe",margin:16,marginLabel:"Some room for error",marginExplain:"~16× margin. Deaths from overheating/hyponatremia, not just toxicity.",
  supplyRisk:4,supplyLabel:"Often fake or cut — TEST IT",supplyExplain:"Only ~74% of 'MDMA' contains only MDMA (DrugsData 2023). Often meth, cathinones, or nothing. ALWAYS test.",
  addict:2,addictLabel:"Low addiction potential",
  feels:["Intense euphoria","Deep empathy","Love for everyone","Enhanced touch","Music is incredible","Jaw clenching"],
  odRisk:["Hyperthermia (overheating → organ failure)","Hyponatremia (water intoxication)","Serotonin syndrome","Seizures"],
  longTerm:["Neurotoxicity from repeated use","Depression during comedowns","Memory impairment","Serotonin depletion — wait 3 months between uses"],
  harm:9,routes:[{nm:"Oral",onset:"30–60 min",dur:"3–5 hr"},{nm:"Insufflated",onset:"5–15 min",dur:"2–4 hr"}],
  dose:{threshold:"30 mg",light:"40–75 mg",common:"75–125 mg",strong:"125–175 mg",heavy:"175+ mg"},
  lethal:{headline:"People have died from as little as 1-2 pills — but usually from overheating, not the drug itself.",note:"Most MDMA deaths are from hyperthermia (overheating in hot environments) or hyponatremia (drinking too much water). Take breaks, sip water slowly, don't re-dose.",cmp:"pill",sz:22,realworld:"1-2 pills (150-300mg) in a hot club without water breaks has killed otherwise healthy people. It's not about how much — it's about the environment."}},

{id:"cocaine",n:"Cocaine",cat:"stimulant",aka:["Coke","Snow","Blow","Crack"],src:"natural",
  desc:"Short duration drives compulsive re-dosing. Street supply heavily cut and increasingly fentanyl-contaminated.",
  atDose:3,atDoseLabel:"Cardiac risk at any dose",margin:15,marginLabel:"Some room for error",marginExplain:"~15× margin — but heart sensitivity varies wildly between people.",
  supplyRisk:5,supplyLabel:"Very often contaminated — TEST",supplyExplain:"~70% US cocaine contains levamisole. Fentanyl contamination rising (>10% in NE states). Use fentanyl strips EVERY TIME.",
  addict:4,addictLabel:"Highly addictive",
  feels:["Euphoria & confidence","Extreme alertness","Numbness","Talkativeness","Feeling invincible"],
  odRisk:["Heart attack","Stroke","Seizures","Sudden death (cardiac arrhythmia)"],
  longTerm:["Nasal septum damage","Cardiovascular disease","Addiction","Paranoia","Financial ruin"],
  harm:27,routes:[{nm:"Insufflated",onset:"1–5 min",dur:"15–45 min"},{nm:"Smoked (crack)",onset:"Seconds",dur:"5–15 min"},{nm:"Intravenous",onset:"Seconds",dur:"10–20 min"}],
  dose:{threshold:"10 mg",light:"20–50 mg",common:"50–100 mg",strong:"100–150 mg",heavy:"150+ mg"},
  lethal:{headline:"Your heart decides — some people have died from a single line.",note:"Heart sensitivity varies wildly between individuals. There is no way to predict who will have a cardiac event.",cmp:"line",sz:[50,8],realworld:"A person with an undiagnosed heart condition can die from the same amount their friend does every weekend. There's no 'safe' test dose."}},

{id:"amphetamines",n:"Amphetamine",cat:"stimulant",aka:["Speed","Adderall","Dexedrine","Vyvanse"],src:"synthetic",
  desc:"Medical ADHD stimulant. Pharmaceutical versions consistent; street speed is not.",
  atDose:2,atDoseLabel:"Safe at prescribed doses",margin:20,marginLabel:"Some room for error",marginExplain:"~20× margin. Tolerance builds. Cardiovascular strain persists.",
  supplyRisk:3,supplyLabel:"Sometimes not what it claims",supplyExplain:"Pharmacy Adderall: safe. Street speed or pressed pills: may be meth or fentanyl. Counterfeit Adderall increasing.",
  addict:3,addictLabel:"Moderately addictive",
  feels:["Laser focus","Endless energy","Euphoria","Confidence","Appetite gone","Talkativeness"],
  odRisk:["Heart attack","Stroke","Hyperthermia","Psychosis"],
  longTerm:["Cardiovascular damage","Stimulant psychosis","Insomnia","Weight loss","Dependence","Dental issues"],
  harm:23,routes:[{nm:"Oral",onset:"15–45 min",dur:"4–8 hr"},{nm:"Insufflated",onset:"5–15 min",dur:"3–6 hr"}],
  dose:{threshold:"5 mg",light:"10–20 mg",common:"20–40 mg",strong:"40–70 mg",heavy:"70+ mg"},
  lethal:{headline:"Lethal dose varies hugely — but heart strain is always there.",note:"Even tolerant users carry cardiovascular risk. The lethal dose depends on your heart, not just the amount.",cmp:"pill",sz:22,realworld:"A handful of pills could be fatal for one person and barely noticeable for another. It depends on your heart, not your tolerance."}},

{id:"methamphetamine",n:"Methamphetamine",cat:"stimulant",aka:["Meth","Crystal","Ice","Tina","Glass"],src:"synthetic",
  desc:"Extremely potent, long-acting, addictive, neurotoxic. Duration can exceed 24 hours.",
  atDose:4,atDoseLabel:"Harmful even at typical doses",margin:10,marginLabel:"Easy to take too much",marginExplain:"Only ~10×. Duration is punishing — 24+ hours without sleep or food.",
  supplyRisk:2,supplyLabel:"Usually pure",supplyExplain:"Street meth ~88% pure (LA 2024). The danger IS the drug. Some fentanyl cross-contamination.",
  addict:5,addictLabel:"Extremely addictive",
  feels:["Extreme euphoria","Superhuman energy","Invincibility","Hypersexuality","Extreme focus"],
  odRisk:["Hyperthermia","Heart failure","Stroke","Psychosis","Seizures","Rhabdomyolysis"],
  longTerm:["Severe brain damage","Psychosis (common)","Devastating addiction","Tooth decay ('meth mouth')","Premature aging","Cardiovascular disease"],
  harm:33,routes:[{nm:"Smoked",onset:"Seconds",dur:"8–24 hr"},{nm:"Insufflated",onset:"3–5 min",dur:"8–24 hr"},{nm:"Oral",onset:"15–30 min",dur:"10–24 hr"}],
  dose:{threshold:"5 mg",light:"5–15 mg",common:"15–30 mg",strong:"30–60 mg",heavy:"60+ mg"},
  lethal:{headline:"100mg — about a tenth of a gram — can kill someone without tolerance.",note:"The extreme duration (up to 24 hours) means your body has no chance to recover. Effects stack as you stay awake.",cmp:"pill",sz:22,realworld:"A tenth of a gram is a small pinch of powder. And unlike most drugs, the effects last so long that your body can't recover between doses."}},

{id:"nicotine",n:"Nicotine",cat:"stimulant",aka:["Cigarettes","Vape","Tobacco","Snus","Juul","Zyn"],src:"natural",
  desc:"The most addictive commonly used substance. The drug itself is less harmful than the delivery method — smoking kills, nicotine pouches don't (much).",
  atDose:2,atDoseLabel:"Low acute toxicity",margin:20,marginLabel:"Some room for error",marginExplain:"~20× from a cigarette to danger. But liquid nicotine (vape juice) is highly toxic if ingested — keep away from children.",
  supplyRisk:1,supplyLabel:"Always real",supplyExplain:"Commercial products are standardized and regulated.",
  addict:5,addictLabel:"EXTREMELY addictive",
  feels:["Alertness","Calm focus","Stress relief","Appetite suppression","Buzz (non-tolerant)"],
  odRisk:["Nausea & vomiting","Rapid heartbeat","Seizures (rare, liquid nicotine ingestion)","Death from liquid ingestion (children)"],
  longTerm:["Powerful dependence (harder to quit than heroin for many)","Cancer & lung disease (SMOKING, not nicotine itself)","Cardiovascular strain","Gum disease (chewing tobacco)","Vaping: unknown long-term effects"],
  harm:26,routes:[{nm:"Smoked (cigarette)",onset:"Seconds",dur:"30–60 min"},{nm:"Vaped",onset:"Seconds",dur:"30–60 min"},{nm:"Oral (pouch/gum)",onset:"5–15 min",dur:"30–60 min"},{nm:"Transdermal (patch)",onset:"1–2 hr",dur:"16–24 hr"}],
  dose:{threshold:"0.5 mg",light:"1–2 mg",common:"2–4 mg",strong:"4–8 mg",heavy:"8+ mg"},
  lethal:{headline:"A teaspoon of vape juice can kill a child. Keep ALL nicotine liquid locked away.",note:"The drug in cigarettes won't kill you from a single overdose. But concentrated liquid nicotine (vape refills) is extremely toxic if swallowed.",cmp:"spoon",sz:34,realworld:"One teaspoon of high-strength vape juice (36mg/ml) swallowed by a toddler can be fatal. This is the #1 poison control call for nicotine."}},

{id:"cannabis",n:"Cannabis",cat:"cannabinoid",aka:["Marijuana","Weed","THC","Pot","Edibles"],src:"natural",
  desc:"No human has ever died from cannabis toxicity. Edibles need extra patience — onset is slow.",
  atDose:1,atDoseLabel:"Very safe",margin:1000,marginLabel:"Very hard to take too much",marginExplain:"Over 1,000×. No confirmed death from THC toxicity ever.",
  supplyRisk:1,supplyLabel:"Almost always real",supplyExplain:"Flower is identifiable. Black market vape carts can contain vitamin E acetate. Dispensary products safest.",
  addict:2,addictLabel:"Low addiction potential",
  feels:["Relaxation","Euphoria","Appetite boost","Time feels slow","Music sounds amazing","Giggles"],
  odRisk:["Severe anxiety/paranoia (edibles)","Psychotic episode (rare, high doses)","No physical danger"],
  longTerm:["Mild psychological dependence","Memory impairment (reversible)","Respiratory issues (smoking only)","May affect brain development under age 25"],
  harm:20,routes:[{nm:"Smoked / Vaped",onset:"Seconds",dur:"1–4 hr"},{nm:"Edibles",onset:"30 min – 2 hr",dur:"4–10 hr"}],
  dose:{threshold:"1 mg THC",light:"2–5 mg",common:"5–15 mg",strong:"15–30 mg",heavy:"30+ mg"},
  lethal:{headline:"No human has ever died from a cannabis overdose. It is physically impossible.",note:"Even the most terrifying edible experience is not physically dangerous. You will not die. Lie down and wait it out.",cmp:"bag",sz:60,realworld:"You would need to consume roughly 1,500 pounds of cannabis in 15 minutes. That's not a typo — fifteen hundred pounds."}},

{id:"ketamine",n:"Ketamine",cat:"dissociative",aka:["K","Special K","Ket","Vitamin K"],src:"synthetic",
  desc:"Safe margin alone, but lethal mixed with downers. Regular use destroys your bladder.",
  atDose:2,atDoseLabel:"Safe at normal doses",margin:38,marginLabel:"Room for error",marginExplain:"~38× alone. Deaths from choking on vomit or mixing with depressants.",
  supplyRisk:3,supplyLabel:"Sometimes not what it claims",supplyExplain:"Some fentanyl contamination. Sometimes cut. Test with fentanyl strips.",
  addict:3,addictLabel:"Moderately addictive",
  feels:["Floating/disconnection","Pain relief","Euphoria","K-hole (high dose)","Wonky movement","Music distortion"],
  odRisk:["Aspiration (choking on vomit)","Respiratory depression (with other downers)","Loss of consciousness"],
  longTerm:["BLADDER DAMAGE (chronic use — severe, irreversible)","Kidney damage","Psychological dependence","Cognitive impairment","Urinary tract issues — pain, frequency, blood"],
  harm:15,routes:[{nm:"Insufflated",onset:"5–15 min",dur:"45–90 min"},{nm:"IM injection",onset:"2–5 min",dur:"45–90 min"},{nm:"Oral",onset:"15–30 min",dur:"1–2 hr"}],
  dose:{threshold:"10 mg",light:"15–30 mg",common:"30–75 mg",strong:"75–150 mg",heavy:"150+ mg"},
  lethal:{headline:"Very rarely lethal alone — almost every death involves choking on vomit or mixing with downers.",note:"Ketamine itself has a wide safety margin. The danger is becoming unconscious and choking, or combining with alcohol/opioids/GHB.",cmp:"line",sz:[50,8],realworld:"Dying from ketamine alone would require a very large amount. But a moderate dose of K mixed with a few drinks has killed people."}},

{id:"pcp",n:"PCP",cat:"dissociative",aka:["Angel Dust","Wet","Sherm","Dust"],src:"synthetic",
  desc:"Powerful dissociative that can cause extreme agitation, violence, and psychosis. Unpredictable reactions.",
  atDose:4,atDoseLabel:"Dangerous — unpredictable",margin:10,marginLabel:"Easy to take too much",marginExplain:"~10× margin. Effects are highly unpredictable. Can cause violent behavior and psychosis at any dose.",
  supplyRisk:3,supplyLabel:"Sometimes not what it claims",supplyExplain:"Sometimes sold as LSD or THC. PCP-dipped cigarettes/joints may have wildly variable dosing.",
  addict:3,addictLabel:"Moderately addictive",
  feels:["Dissociation","Numbness","Invincibility feeling","Distorted perception","Agitation"],
  odRisk:["Psychosis","Extreme agitation/violence","Seizures","Hyperthermia","Rhabdomyolysis","Death"],
  longTerm:["Psychosis (can persist)","Memory loss","Speech difficulties","Depression","Flashbacks"],
  harm:20,routes:[{nm:"Smoked (dipped)",onset:"2–5 min",dur:"4–8 hr"},{nm:"Insufflated",onset:"5–15 min",dur:"4–8 hr"},{nm:"Oral",onset:"15–60 min",dur:"6–24 hr"}],
  dose:{threshold:"1 mg",light:"2–3 mg",common:"3–5 mg",strong:"5–10 mg",heavy:"10+ mg (psychosis likely)"},
  lethal:{headline:"People have died at almost any dose — PCP is genuinely unpredictable.",note:"Deaths from extreme body temperature, muscle breakdown, or injuries from erratic violent behavior. The drug can make you unaware you're hurting yourself.",cmp:"pill",sz:22,realworld:"People on PCP have died from running into traffic, breaking through windows, or from their body overheating without them noticing."}},

{id:"dxm",n:"DXM",cat:"dissociative",aka:["Dextromethorphan","Robo","Robotripping"],src:"synthetic",
  desc:"Biggest danger: OTHER ingredients in the cough medicine. NEVER use products with acetaminophen.",
  atDose:2,atDoseLabel:"Safe if pure DXM only",margin:10,marginLabel:"Easy to take too much",marginExplain:"~10× for DXM. Co-formulated ingredients kill at recreational DXM doses.",
  supplyRisk:3,supplyLabel:"Check the other ingredients!",supplyExplain:"Check EVERY ingredient. Acetaminophen in cough syrup = liver death at recreational DXM doses. DXM-only products only.",
  addict:2,addictLabel:"Low addiction potential",
  feels:["Dissociation","Euphoria","Music sounds incredible","Plateau-dependent effects","Robowalk"],
  odRisk:["Serotonin syndrome (with SSRIs)","Liver failure (acetaminophen in combo products)","Respiratory depression"],
  longTerm:["Psychological dependence possible","Cognitive effects with heavy use","Olney's lesions debated"],
  harm:10,routes:[{nm:"Oral",onset:"30–60 min",dur:"4–8 hr"}],
  dose:{threshold:"75 mg",light:"100–200 mg",common:"200–400 mg",strong:"400–700 mg",heavy:"700+ mg"},
  lethal:{headline:"The DXM won't kill you — the Tylenol in the cough syrup will destroy your liver.",note:"Deaths are from acetaminophen (Tylenol) or antihistamines in the cough medicine, NOT from DXM itself. Only use products where DXM is the ONLY active ingredient.",cmp:"bottle",sz:[28,50],realworld:"A recreational dose of cough syrup that contains Tylenol can put you in liver failure. Read. Every. Ingredient. On. The. Label."}},

{id:"nitrous",n:"Nitrous Oxide",cat:"dissociative",aka:["Laughing Gas","N2O","Whippets","Nangs"],src:"synthetic",
  desc:"Safe drug, dangerous delivery. Deaths from suffocation, not the substance itself.",
  atDose:1,atDoseLabel:"Very safe",margin:150,marginLabel:"Hard to take too much",marginExplain:"Drug itself has wide margin. Deaths from suffocation or chronic B12 depletion.",
  supplyRisk:1,supplyLabel:"Almost always real",supplyExplain:"Food-grade N2O chargers are standardized. No adulteration.",
  addict:2,addictLabel:"Low-moderate (binge pattern)",
  feels:["Brief euphoria","Dissociation","Wah-wah sounds","Tingling","Uncontrollable laughter"],
  odRisk:["Suffocation (bags/masks — NEVER)","Falls","Loss of consciousness"],
  longTerm:["B12 depletion → NERVE DAMAGE (chronic use — tingling, numbness, paralysis)","Anemia","Cognitive impairment"],
  harm:8,routes:[{nm:"Inhaled (balloon)",onset:"Seconds",dur:"1–5 min"}],
  dose:{threshold:"1 charger",light:"1",common:"1–2",strong:"2–3",heavy:"3+"},
  lethal:{headline:"The gas won't kill you — but a bag over your head will. ALWAYS use a balloon.",note:"N2O itself has a very wide safety margin. Every death is from cutting off oxygen supply (bags, masks) or from chronic B12 depletion.",cmp:"canister",sz:30,realworld:"Never breathe from a bag, mask, or directly from a tank. Always fill a balloon first. Falls while standing are the other main danger."}},

{id:"poppers",n:"Poppers (Alkyl Nitrites)",cat:"inhalant",aka:["Amyl Nitrite","Rush","Jungle Juice","Room Odorizer"],src:"synthetic",
  desc:"Vasodilator inhalant. Brief rush and muscle relaxation. LETHAL combined with Viagra/Cialis or any PDE5 inhibitor — fatal blood pressure drop.",
  atDose:2,atDoseLabel:"Safe at normal use",margin:30,marginLabel:"Room for error",marginExplain:"Wide margin for inhalation. BUT: swallowing poppers liquid is a medical emergency. And combining with Viagra/Cialis can kill.",
  supplyRisk:2,supplyLabel:"Usually what it claims",supplyExplain:"Commercial products standardized. Some contain more harmful isomers (isopropyl nitrite). Amyl and butyl nitrite preferred.",
  addict:1,addictLabel:"Not addictive",
  feels:["Head rush","Warmth","Muscle relaxation","Heightened sensation","Dizziness","Brief euphoria"],
  odRisk:["Fatal with Viagra/Cialis (blood pressure crash)","Chemical burns if swallowed","Methemoglobinemia (rare)"],
  longTerm:["Eye damage (maculopathy) with heavy use","Skin irritation","Headaches","No significant dependence"],
  harm:6,routes:[{nm:"Inhaled",onset:"Seconds",dur:"2–5 min"}],
  dose:{threshold:"1 sniff",light:"1–2 sniffs",common:"2–4 sniffs",strong:"4+",heavy:"—"},
  lethal:{headline:"Safe to inhale — but NEVER swallow, and NEVER use with Viagra or Cialis. That combination can kill.",note:"Swallowing poppers liquid is a medical emergency. Combining with ED medication (Viagra, Cialis, Levitra) causes a fatal blood pressure crash.",cmp:"canister",sz:30,realworld:"Inhaling from the bottle: fine. Swallowing the liquid: call poison control immediately. Taking with Viagra: your blood pressure can drop so low your heart stops."}},

{id:"alcohol",n:"Alcohol",cat:"depressant",aka:["Ethanol","Booze","Beer","Wine","Liquor"],src:"natural",
  desc:"Highest overall harm score of ANY substance. Legal status ≠ safety.",
  atDose:3,atDoseLabel:"Harmful even moderately",margin:10,marginLabel:"Easy to take too much",marginExplain:"Only ~10× between drunk and dead. Choking on vomit while passed out is a leading killer.",
  supplyRisk:1,supplyLabel:"Almost always real",supplyExplain:"Commercial alcohol regulated. Moonshine can contain methanol.",
  addict:4,addictLabel:"Highly addictive",
  feels:["Disinhibition","Relaxation","Confidence","Warmth","Slurred speech","Emotional amplification"],
  odRisk:["Choking on vomit (aspiration)","Respiratory depression","Alcohol poisoning","Loss of consciousness"],
  longTerm:["Liver cirrhosis","Brain damage","Cancer","Heart disease","Severe addiction","Withdrawal CAN KILL (seizures, DTs)"],
  harm:72,routes:[{nm:"Oral",onset:"15–45 min",dur:"1–5 hr"}],
  dose:{threshold:"1 drink",light:"1–2",common:"2–4",strong:"4–8",heavy:"8+"},
  lethal:{headline:"15-20 drinks in a few hours can kill you. But choking on vomit kills at much less.",note:"Alcohol poisoning is lethal above ~0.35% BAC. But the most common cause of death is choking on vomit while passed out — and that can happen at much lower levels.",cmp:"bottle",sz:[28,50],realworld:"That's roughly a bottle of liquor chugged in an evening. But people die at half that amount if they pass out face-up and vomit. ALWAYS put passed-out people on their side."}},

{id:"ghb",n:"GHB",cat:"depressant",aka:["G","Liquid Ecstasy","GBL","1,4-BD","Fantasy"],src:"synthetic",
  desc:"Great at right dose, deadly 0.5g later. Narrowest dosing window of any recreational drug.",
  atDose:2,atDoseLabel:"Safe IF precisely dosed",margin:8,marginLabel:"VERY easy to take too much",marginExplain:"Only ~8×. Jump from 'perfect' to 'unconscious' < 0.5g. ALWAYS measure with syringe.",
  supplyRisk:2,supplyLabel:"Usually pure",supplyExplain:"Liquid hard to cut. But GBL is ~2× more potent than GHB — know which you have.",
  addict:4,addictLabel:"Highly addictive",
  feels:["Euphoria","Extreme sociability","Disinhibition","Muscle relaxation","Horniness","Music enhancement"],
  odRisk:["Sudden unconsciousness","Choking on vomit","Respiratory arrest","INSTANT DEATH with alcohol"],
  longTerm:["Severe physical dependence","Withdrawal WORSE than heroin (seizures, psychosis, death)","Sleep disruption","Memory issues"],
  harm:18,routes:[{nm:"Oral (measured liquid)",onset:"15–30 min",dur:"1.5–3 hr"}],
  dose:{threshold:"0.3 g",light:"0.5–1 g",common:"1–2.5 g",strong:"2.5–4 g",heavy:"4+ g (unconsciousness)"},
  lethal:{headline:"The difference between a great time and unconsciousness is less than half a teaspoon.",note:"GHB has the narrowest dosing window of any recreational drug. Adding ANY alcohol makes it potentially fatal.",cmp:"spoon",sz:34,realworld:"4-5ml alone can knock you out (that's less than a teaspoon). Add just one drink of alcohol and 1-2ml can kill you. ALWAYS measure with a syringe — never pour."}},

{id:"benzodiazepine",n:"Benzodiazepines",cat:"benzodiazepine",aka:["Benzos","Xanax","Valium","Klonopin","Ativan"],src:"synthetic",
  desc:"Safe alone. Combined with opioids or alcohol: one of the deadliest drug combos in existence.",
  atDose:2,atDoseLabel:"Safe alone",margin:100,marginLabel:"Hard to OD alone",marginExplain:"~100× alone. Margin DISAPPEARS with opioids or alcohol.",
  supplyRisk:5,supplyLabel:"Street pills often contain fentanyl",supplyExplain:"Pharmacy benzos: safe. Street 'Xanax bars': EXTREME fentanyl risk. Counterfeit pressed pills are a #1 fentanyl vector.",
  addict:4,addictLabel:"Highly addictive",
  feels:["Anxiety gone","Calm","Sedation","Muscle relaxation","Disinhibition","Memory gaps"],
  odRisk:["Respiratory depression (with opioids/alcohol)","Aspiration"],
  longTerm:["Severe dependence","Withdrawal SEIZURES (can kill — never stop cold turkey)","Cognitive impairment","Rebound anxiety worse than original"],
  harm:15,routes:[{nm:"Oral",onset:"15–60 min",dur:"4–12 hr"},{nm:"Sublingual",onset:"5–15 min",dur:"4–8 hr"}],
  dose:{threshold:"Varies",light:"0.25 mg alp eq",common:"0.5–1 mg",strong:"1–2 mg",heavy:"2+ mg"},
  lethal:{headline:"Very hard to die from benzos alone. Mix with opioids or alcohol: one of the deadliest combos.",note:"Benzodiazepines alone have a wide safety margin. The danger is combinations — benzos + opioids is the #1 cause of poly-drug death in the US.",cmp:"pill",sz:22,realworld:"Taking 10 Xanax might just knock you out for a day. Taking 2 Xanax with a few drinks or any opioid can stop your breathing permanently."}},

{id:"opioids",n:"Opioids (Heroin)",cat:"opioid",aka:["Heroin","Morphine","H","Smack","Dope","Codeine"],src:"both",
  desc:"Narrowest safety margin of common drugs. #1 overdose killer. In most US markets, 'heroin' IS fentanyl now.",
  atDose:4,atDoseLabel:"Dangerous",margin:5,marginLabel:"Almost NO room for error",marginExplain:"Only ~5× between a high and death. Street supply potency unknown.",
  supplyRisk:5,supplyLabel:"Assume it's fentanyl until tested",supplyExplain:"In most US markets, 'heroin' = fentanyl. You cannot tell by look/smell/taste. ALWAYS fentanyl strips. CARRY NARCAN.",
  addict:5,addictLabel:"EXTREMELY addictive",
  feels:["Euphoria ('warm blanket')","Total pain relief","Deep sedation","Warmth","Nausea","Itching"],
  odRisk:["YOU STOP BREATHING","Aspiration","Cardiac arrest","Death — #1 cause of drug overdose death"],
  longTerm:["Severe addiction (often within days)","Tolerance escalation","Vein damage/infections (IV)","Constipation","Social destruction","Withdrawal (excruciating but not fatal)"],
  harm:55,routes:[{nm:"Intravenous",onset:"Seconds",dur:"3–5 hr"},{nm:"Smoked",onset:"Seconds",dur:"3–5 hr"},{nm:"Insufflated",onset:"5–15 min",dur:"3–6 hr"},{nm:"Oral",onset:"15–45 min",dur:"4–6 hr"}],
  dose:{threshold:"~5 mg morph eq",light:"5–15 mg",common:"15–30 mg",strong:"30–60 mg",heavy:"60+ mg"},
  lethal:{headline:"30mg of morphine — about two pills — can kill someone who doesn't use regularly.",note:"The gap between 'high' and 'stopped breathing' is terrifyingly small. If someone stops breathing: CALL 911 and give NARCAN immediately.",cmp:"pill",sz:22,realworld:"Two prescription morphine pills, or a single bag of street heroin, can be fatal if you don't have tolerance. And you can never be sure of street heroin potency."}},

{id:"fentanyl",n:"Fentanyl",cat:"opioid",aka:["Fent","Blues","Pressed pills","China White"],src:"synthetic",
  desc:"50-100× morphine potency. Lethal dose invisible to naked eye. Primary overdose crisis driver. Found in pills, powder, cocaine, meth, and counterfeit prescriptions.",
  atDose:5,atDoseLabel:"LETHAL at street doses",margin:3,marginLabel:"ANY mistake can kill",marginExplain:"~3× margin. 2 milligrams = a few grains of salt = death.",
  supplyRisk:5,supplyLabel:"THIS is what contaminates other drugs",supplyExplain:"Fentanyl IS the contamination problem. Now also adulterated with xylazine ('tranq') and medetomidine.",
  addict:5,addictLabel:"EXTREMELY addictive",
  feels:["Brief intense euphoria","Total pain elimination","Extreme sedation"],
  odRisk:["DEATH FROM INVISIBLE AMOUNT","Respiratory arrest in seconds","Cardiac arrest"],
  longTerm:["Severe addiction","Tolerance escalation","xylazine contamination → skin necrosis ('tranq wounds')"],
  harm:60,routes:[{nm:"Any route",onset:"Seconds (IV/smoked)",dur:"30–90 min"}],
  dose:{threshold:"12 µg",light:"25 µg",common:"25–50 µg",strong:"DO NOT",heavy:"DO NOT"},
  lethal:{headline:"2 milligrams will kill you. That's a few grains of salt. You can't even see it.",note:"ALWAYS test with fentanyl strips. ALWAYS carry Narcan. If someone stops breathing: CALL 911 and give Narcan IMMEDIATELY.",cmp:"grain",sz:6,realworld:"This dot is roughly the size of a lethal dose. It would disappear on your fingertip. You cannot see it, taste it, or smell it in a pressed pill or powder."}},

{id:"tramadol",n:"Tramadol",cat:"opioid",aka:["Ultram","Tramal"],src:"synthetic",
  desc:"Atypical opioid. Uniquely causes seizures AND serotonin syndrome — double danger most opioids don't have.",
  atDose:2,atDoseLabel:"Safe at low Rx doses",margin:8,marginLabel:"Easy to take too much",marginExplain:"~8× plus seizures above 400mg. Serotonin activity makes combos uniquely dangerous.",
  supplyRisk:2,supplyLabel:"Usually what it claims",supplyExplain:"Usually pharmaceutical.",
  addict:3,addictLabel:"Moderately addictive",
  feels:["Mild euphoria","Pain relief","Warmth","Mood lift"],
  odRisk:["Seizures (dose-dependent)","Serotonin syndrome","Respiratory depression"],
  longTerm:["Dependence","Withdrawal (seizure risk)","Serotonin depletion"],
  harm:18,routes:[{nm:"Oral",onset:"30–60 min",dur:"4–6 hr"}],
  dose:{threshold:"25 mg",light:"50–100 mg",common:"100–200 mg",strong:"200–300 mg",heavy:"300+ mg"},
  lethal:{headline:"Above 400mg: seizures. With SSRIs or MDMA: potentially fatal serotonin syndrome.",note:"Tramadol is unique among opioids — it also affects serotonin, creating two separate danger pathways.",cmp:"pill",sz:22,realworld:"Eight 50mg pills can trigger seizures. Taking tramadol the same week as MDMA or while on antidepressants can cause serotonin syndrome — a medical emergency."}},

{id:"kratom",n:"Kratom",cat:"opioid",aka:["Mitragynine","Ketum","Biak"],src:"natural",
  desc:"Plant-based. Low doses stimulating, high doses sedating. Under-researched but increasingly popular.",
  atDose:2,atDoseLabel:"Likely safe at low doses",margin:20,marginLabel:"Some room for error",marginExplain:"~20× estimated. Limited data. Deaths usually involve other substances.",
  supplyRisk:3,supplyLabel:"Sometimes not what it claims",supplyExplain:"Unregulated. Products vary in potency. Some contaminated with heavy metals or salmonella.",
  addict:3,addictLabel:"Moderately addictive",
  feels:["Energy (low dose)","Pain relief (high dose)","Mood lift","Sedation (high dose)","Sociability"],
  odRisk:["Respiratory depression (with other opioids)","Seizures (rare)","Liver injury (rare)"],
  longTerm:["Physical dependence","Withdrawal (opioid-like)","Liver damage (rare)","Weight loss","Constipation"],
  harm:12,routes:[{nm:"Oral (powder/capsules)",onset:"15–30 min",dur:"3–6 hr"}],
  dose:{threshold:"1 g",light:"1–3 g",common:"3–5 g",strong:"5–8 g",heavy:"8+ g"},
  lethal:{headline:"Deaths from kratom alone are very rare — almost always other substances were involved.",note:"Kratom has a relatively wide margin compared to pharmaceutical opioids. However, it can cause dependence and withdrawal.",cmp:"spoon",sz:34,realworld:"You would need to consume a very large amount of kratom powder to be in physical danger. The bigger risk is becoming dependent with daily use."}},

{id:"caffeine",n:"Caffeine",cat:"stimulant",aka:["Coffee","Tea","Energy drinks","Pre-workout"],src:"natural",
  desc:"Safe from beverages. Pure caffeine powder is surprisingly deadly — a tablespoon can kill.",
  atDose:1,atDoseLabel:"Very safe (beverages)",margin:50,marginLabel:"Room for error",marginExplain:"~50× from coffee. Pure powder: a tablespoon (~10g) lethal.",
  supplyRisk:1,supplyLabel:"Always real",supplyExplain:"Commercial products standardized.",
  addict:2,addictLabel:"Mildly addictive",
  feels:["Alertness","Focus","Energy","Reduced tiredness","Mild anxiety at high dose"],
  odRisk:["Cardiac arrhythmia","Seizures (pure powder)","Vomiting"],
  longTerm:["Mild dependence","Withdrawal headaches","Sleep disruption","Anxiety"],
  harm:3,routes:[{nm:"Oral",onset:"15–45 min",dur:"3–5 hr"}],
  dose:{threshold:"20 mg",light:"50–100 mg",common:"100–200 mg",strong:"200–400 mg",heavy:"400+ mg"},
  lethal:{headline:"A single tablespoon of pure caffeine powder can kill you. You can't overdose on coffee.",note:"You'd need ~75-100 cups of coffee to reach a lethal dose. But pure caffeine powder is shockingly dangerous — deaths have occurred from a single scoop.",cmp:"spoon",sz:34,realworld:"One tablespoon of pure caffeine powder = roughly 75 espressos all at once. Several teenagers have died this way. Never buy bulk caffeine powder."}},

{id:"ssri",n:"SSRIs",cat:"depressant",aka:["Prozac","Zoloft","Lexapro","Sertraline"],src:"synthetic",
  desc:"Not recreational. Here because SSRIs dramatically change how other drugs work. Critical interaction profile.",
  atDose:1,atDoseLabel:"Safe as prescribed",margin:null,marginLabel:"N/A",marginExplain:"Here for interactions. SSRIs + tramadol/DXM/MAOIs = serotonin syndrome.",
  supplyRisk:1,supplyLabel:"Always real",supplyExplain:"Pharmaceutical.",
  addict:1,addictLabel:"Not addictive (but discontinuation syndrome)",
  feels:["Antidepressant (weeks)","Blocks MDMA","Reduces psychedelics"],
  odRisk:["Serotonin syndrome (with serotonergic drugs)"],
  longTerm:["Sexual dysfunction","Emotional blunting","Discontinuation syndrome (taper slowly)"],
  harm:null,routes:[{nm:"Oral (daily)",onset:"Weeks",dur:"Continuous"}],
  dose:{threshold:"Rx",light:"—",common:"Varies",strong:"—",heavy:"—"},
  lethal:{headline:"Not dangerous alone — but critical to know about for drug interactions.",note:"SSRIs block MDMA from working and reduce psychedelic effects. Combining SSRIs with tramadol, DXM, or MAOIs can cause fatal serotonin syndrome.",cmp:null,sz:0,realworld:null}},

{id:"maoi",n:"MAOIs",cat:"depressant",aka:["Nardil","Parnate","Harmaline","Syrian Rue"],src:"both",
  desc:"Most interaction-dangerous drug class. MAOIs make dozens of substances AND certain foods lethal.",
  atDose:2,atDoseLabel:"Safe as Rx (with dietary restrictions)",margin:null,marginLabel:"N/A",marginExplain:"Danger is combinations + food. Aged cheese, cured meats, soy sauce = hypertensive crisis on MAOIs.",
  supplyRisk:1,supplyLabel:"Always real",supplyExplain:"Pharmaceutical or identifiable plant (Syrian Rue).",
  addict:1,addictLabel:"Not addictive",
  feels:["Antidepressant","Potentiates substances dramatically"],
  odRisk:["Hypertensive crisis (fatal)","Serotonin syndrome (fatal)","Tyramine crisis from FOODS"],
  longTerm:["Weight gain","Insomnia","Requires strict dietary adherence"],
  harm:null,routes:[{nm:"Oral",onset:"Varies",dur:"Hours to permanent"}],
  dose:{threshold:"Rx",light:"—",common:"Varies",strong:"—",heavy:"—"},
  lethal:{headline:"MAOIs make dozens of other substances — and even some foods — potentially lethal.",note:"Aged cheese, cured meats, soy sauce, red wine — all can cause a fatal blood pressure spike on MAOIs. Plus nearly every stimulant and serotonergic drug.",cmp:null,sz:0,realworld:null}},
];

// ── COMBINATIONS ── (TripSit v4.0 + poppers/pcp/nicotine)
const CO={"lsd+mushrooms":"synergy","lsd+dmt":"synergy","lsd+mescaline":"synergy","lsd+2cx":"synergy","lsd+mdma":"caution","lsd+cocaine":"caution","lsd+amphetamines":"caution","lsd+methamphetamine":"caution","lsd+cannabis":"caution","lsd+ketamine":"synergy","lsd+pcp":"caution","lsd+dxm":"caution","lsd+nitrous":"synergy","lsd+alcohol":"decrease","lsd+ghb":"decrease","lsd+opioids":"decrease","lsd+fentanyl":"decrease","lsd+benzodiazepine":"decrease","lsd+tramadol":"caution","lsd+kratom":"low_risk","lsd+maoi":"caution","lsd+ssri":"decrease","lsd+caffeine":"caution","lsd+nicotine":"low_risk","lsd+poppers":"low_risk","mushrooms+dmt":"synergy","mushrooms+mescaline":"synergy","mushrooms+2cx":"synergy","mushrooms+mdma":"caution","mushrooms+cocaine":"caution","mushrooms+amphetamines":"caution","mushrooms+methamphetamine":"caution","mushrooms+cannabis":"caution","mushrooms+ketamine":"synergy","mushrooms+pcp":"caution","mushrooms+dxm":"caution","mushrooms+nitrous":"synergy","mushrooms+alcohol":"decrease","mushrooms+ghb":"decrease","mushrooms+opioids":"decrease","mushrooms+fentanyl":"decrease","mushrooms+benzodiazepine":"decrease","mushrooms+tramadol":"caution","mushrooms+kratom":"low_risk","mushrooms+maoi":"caution","mushrooms+ssri":"decrease","mushrooms+caffeine":"low_risk","mushrooms+nicotine":"low_risk","mushrooms+poppers":"low_risk","dmt+mescaline":"synergy","dmt+2cx":"synergy","dmt+mdma":"caution","dmt+cocaine":"caution","dmt+amphetamines":"caution","dmt+methamphetamine":"caution","dmt+cannabis":"synergy","dmt+ketamine":"caution","dmt+pcp":"unsafe","dmt+dxm":"caution","dmt+nitrous":"synergy","dmt+alcohol":"decrease","dmt+ghb":"decrease","dmt+opioids":"decrease","dmt+fentanyl":"decrease","dmt+benzodiazepine":"decrease","dmt+tramadol":"caution","dmt+kratom":"low_risk","dmt+maoi":"caution","dmt+ssri":"decrease","dmt+caffeine":"caution","dmt+nicotine":"low_risk","dmt+poppers":"low_risk","mescaline+2cx":"synergy","mescaline+mdma":"caution","mescaline+cocaine":"caution","mescaline+amphetamines":"caution","mescaline+methamphetamine":"caution","mescaline+cannabis":"synergy","mescaline+ketamine":"synergy","mescaline+dxm":"caution","mescaline+nitrous":"synergy","mescaline+alcohol":"decrease","mescaline+ghb":"decrease","mescaline+opioids":"decrease","mescaline+fentanyl":"decrease","mescaline+benzodiazepine":"decrease","mescaline+tramadol":"caution","mescaline+kratom":"low_risk","mescaline+maoi":"caution","mescaline+ssri":"decrease","mescaline+caffeine":"caution","mescaline+nicotine":"low_risk","mescaline+poppers":"caution","2cx+mdma":"caution","2cx+cocaine":"unsafe","2cx+amphetamines":"caution","2cx+methamphetamine":"unsafe","2cx+cannabis":"caution","2cx+ketamine":"synergy","2cx+dxm":"caution","2cx+nitrous":"synergy","2cx+alcohol":"decrease","2cx+ghb":"decrease","2cx+opioids":"decrease","2cx+fentanyl":"decrease","2cx+benzodiazepine":"decrease","2cx+tramadol":"caution","2cx+kratom":"low_risk","2cx+maoi":"caution","2cx+ssri":"decrease","2cx+caffeine":"caution","2cx+nicotine":"low_risk","2cx+poppers":"caution","mdma+cocaine":"unsafe","mdma+amphetamines":"dangerous","mdma+methamphetamine":"dangerous","mdma+cannabis":"low_risk","mdma+ketamine":"caution","mdma+pcp":"unsafe","mdma+dxm":"dangerous","mdma+nitrous":"low_risk","mdma+alcohol":"unsafe","mdma+ghb":"dangerous","mdma+opioids":"caution","mdma+fentanyl":"dangerous","mdma+benzodiazepine":"low_risk","mdma+tramadol":"dangerous","mdma+kratom":"caution","mdma+maoi":"dangerous","mdma+ssri":"caution","mdma+caffeine":"caution","mdma+nicotine":"low_risk","mdma+poppers":"unsafe","cocaine+amphetamines":"unsafe","cocaine+methamphetamine":"unsafe","cocaine+cannabis":"caution","cocaine+ketamine":"caution","cocaine+pcp":"unsafe","cocaine+dxm":"unsafe","cocaine+nitrous":"caution","cocaine+alcohol":"unsafe","cocaine+ghb":"unsafe","cocaine+opioids":"caution","cocaine+fentanyl":"dangerous","cocaine+benzodiazepine":"caution","cocaine+tramadol":"unsafe","cocaine+kratom":"caution","cocaine+maoi":"dangerous","cocaine+ssri":"caution","cocaine+caffeine":"caution","cocaine+nicotine":"caution","cocaine+poppers":"dangerous","amphetamines+methamphetamine":"unsafe","amphetamines+cannabis":"caution","amphetamines+ketamine":"low_risk","amphetamines+pcp":"unsafe","amphetamines+dxm":"unsafe","amphetamines+nitrous":"low_risk","amphetamines+alcohol":"unsafe","amphetamines+ghb":"caution","amphetamines+opioids":"caution","amphetamines+fentanyl":"dangerous","amphetamines+benzodiazepine":"low_risk","amphetamines+tramadol":"caution","amphetamines+kratom":"caution","amphetamines+maoi":"dangerous","amphetamines+ssri":"caution","amphetamines+caffeine":"caution","amphetamines+nicotine":"caution","amphetamines+poppers":"unsafe","methamphetamine+cannabis":"caution","methamphetamine+ketamine":"low_risk","methamphetamine+pcp":"dangerous","methamphetamine+dxm":"unsafe","methamphetamine+nitrous":"low_risk","methamphetamine+alcohol":"unsafe","methamphetamine+ghb":"caution","methamphetamine+opioids":"caution","methamphetamine+fentanyl":"dangerous","methamphetamine+benzodiazepine":"low_risk","methamphetamine+tramadol":"dangerous","methamphetamine+kratom":"caution","methamphetamine+maoi":"dangerous","methamphetamine+ssri":"caution","methamphetamine+caffeine":"caution","methamphetamine+nicotine":"caution","methamphetamine+poppers":"dangerous","nicotine+cannabis":"low_risk","nicotine+ketamine":"low_risk","nicotine+dxm":"low_risk","nicotine+nitrous":"low_risk","nicotine+alcohol":"low_risk","nicotine+ghb":"low_risk","nicotine+opioids":"low_risk","nicotine+fentanyl":"low_risk","nicotine+benzodiazepine":"low_risk","nicotine+tramadol":"low_risk","nicotine+kratom":"low_risk","nicotine+caffeine":"low_risk","nicotine+ssri":"low_risk","nicotine+maoi":"caution","nicotine+poppers":"low_risk","nicotine+pcp":"low_risk","cannabis+ketamine":"synergy","cannabis+pcp":"caution","cannabis+dxm":"low_risk","cannabis+nitrous":"low_risk","cannabis+alcohol":"caution","cannabis+ghb":"caution","cannabis+opioids":"low_risk","cannabis+fentanyl":"caution","cannabis+benzodiazepine":"low_risk","cannabis+tramadol":"low_risk","cannabis+kratom":"low_risk","cannabis+maoi":"low_risk","cannabis+ssri":"low_risk","cannabis+caffeine":"low_risk","cannabis+poppers":"low_risk","ketamine+pcp":"dangerous","ketamine+dxm":"caution","ketamine+nitrous":"caution","ketamine+alcohol":"dangerous","ketamine+ghb":"dangerous","ketamine+opioids":"dangerous","ketamine+fentanyl":"dangerous","ketamine+benzodiazepine":"caution","ketamine+tramadol":"caution","ketamine+kratom":"caution","ketamine+maoi":"low_risk","ketamine+ssri":"low_risk","ketamine+caffeine":"low_risk","ketamine+poppers":"caution","pcp+dxm":"dangerous","pcp+nitrous":"unsafe","pcp+alcohol":"dangerous","pcp+ghb":"dangerous","pcp+opioids":"dangerous","pcp+fentanyl":"dangerous","pcp+benzodiazepine":"unsafe","pcp+tramadol":"dangerous","pcp+kratom":"unsafe","pcp+maoi":"dangerous","pcp+ssri":"caution","pcp+caffeine":"caution","pcp+poppers":"unsafe","dxm+nitrous":"caution","dxm+alcohol":"unsafe","dxm+ghb":"unsafe","dxm+opioids":"unsafe","dxm+fentanyl":"dangerous","dxm+benzodiazepine":"unsafe","dxm+tramadol":"dangerous","dxm+kratom":"unsafe","dxm+maoi":"dangerous","dxm+ssri":"dangerous","dxm+caffeine":"low_risk","dxm+poppers":"caution","nitrous+alcohol":"unsafe","nitrous+ghb":"unsafe","nitrous+opioids":"unsafe","nitrous+fentanyl":"dangerous","nitrous+benzodiazepine":"unsafe","nitrous+tramadol":"unsafe","nitrous+kratom":"low_risk","nitrous+maoi":"low_risk","nitrous+ssri":"low_risk","nitrous+caffeine":"low_risk","nitrous+poppers":"unsafe","alcohol+ghb":"dangerous","alcohol+opioids":"dangerous","alcohol+fentanyl":"dangerous","alcohol+benzodiazepine":"dangerous","alcohol+tramadol":"dangerous","alcohol+kratom":"unsafe","alcohol+maoi":"caution","alcohol+ssri":"caution","alcohol+caffeine":"unsafe","alcohol+poppers":"unsafe","ghb+opioids":"dangerous","ghb+fentanyl":"dangerous","ghb+benzodiazepine":"dangerous","ghb+tramadol":"dangerous","ghb+kratom":"dangerous","ghb+maoi":"caution","ghb+ssri":"low_risk","ghb+caffeine":"low_risk","ghb+poppers":"unsafe","opioids+fentanyl":"dangerous","opioids+benzodiazepine":"dangerous","opioids+tramadol":"dangerous","opioids+kratom":"dangerous","opioids+maoi":"dangerous","opioids+ssri":"low_risk","opioids+caffeine":"low_risk","opioids+poppers":"caution","fentanyl+benzodiazepine":"dangerous","fentanyl+tramadol":"dangerous","fentanyl+kratom":"dangerous","fentanyl+maoi":"dangerous","fentanyl+ssri":"low_risk","fentanyl+caffeine":"low_risk","fentanyl+poppers":"caution","benzodiazepine+tramadol":"dangerous","benzodiazepine+kratom":"unsafe","benzodiazepine+maoi":"low_risk","benzodiazepine+ssri":"low_risk","benzodiazepine+caffeine":"low_risk","benzodiazepine+poppers":"caution","tramadol+kratom":"dangerous","tramadol+maoi":"dangerous","tramadol+ssri":"dangerous","tramadol+caffeine":"low_risk","tramadol+poppers":"caution","kratom+maoi":"caution","kratom+ssri":"low_risk","kratom+caffeine":"low_risk","kratom+poppers":"low_risk","maoi+ssri":"dangerous","maoi+caffeine":"caution","maoi+poppers":"caution","ssri+caffeine":"low_risk","ssri+poppers":"low_risk","caffeine+poppers":"low_risk"};
function cr(a,b){if(a===b)return null;return CO[[a,b].sort().join("+")]||null;}

// ── UI COMPONENTS ──
function SafetyDots({s,compact}){
  const mc=s.margin>=100?"#22c55e":s.margin>=20?"#f59e0b":s.margin&&s.margin<=10?"#ef4444":"#f97316";
  const dc=s.atDose<=1?"#22c55e":s.atDose<=2?"#60a5fa":s.atDose<=3?"#f59e0b":s.atDose<=4?"#f97316":"#ef4444";
  const sc=s.supplyRisk<=1?"#22c55e":s.supplyRisk<=2?"#60a5fa":s.supplyRisk<=3?"#f59e0b":s.supplyRisk<=4?"#f97316":"#ef4444";
  const D=({c,t})=><div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:7,height:7,borderRadius:"50%",background:c,boxShadow:`0 0 4px ${c}55`,flexShrink:0}}/><span style={{fontSize:compact?9.5:11,color:c,fontFamily:"'DM Mono',monospace"}}>{t}</span></div>;
  return <div style={{display:"flex",flexDirection:"column",gap:1}}>
    <D c={dc} t={s.atDoseLabel}/>{s.margin&&<D c={mc} t={`Easy to take too much? ${s.marginLabel}`}/>}<D c={sc} t={`What's really in it: ${s.supplyLabel}`}/>
  </div>;
}

function Card({s,sel,onToggle}){
  const c=CAT[s.cat];const ac=ADDICT_COLORS[s.addict-1];
  return <div onClick={()=>onToggle(s.id)} style={{padding:"11px 13px",borderRadius:10,cursor:"pointer",background:sel?c.b:"rgba(255,255,255,0.03)",border:`1.5px solid ${sel?c.c:"rgba(255,255,255,0.06)"}`,transition:"all 0.2s",marginBottom:7}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:15.5,color:"#e8e6e3"}}>{s.n}</span>
        {sel&&<span style={{color:c.c,fontSize:12}}>✓</span>}
      </div>
      <div style={{display:"flex",gap:4,alignItems:"center"}}>
        <span title={SRC_LABELS[s.src]} style={{fontSize:11}}>{SRC_ICONS[s.src]}</span>
        <span style={{fontSize:9.5,padding:"1px 6px",borderRadius:16,background:c.b,color:c.c,fontFamily:"'DM Mono',monospace"}}>{c.l}</span>
      </div>
    </div>
    {/* Routes */}
    <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:4}}>
      {s.routes.slice(0,2).map(r=><span key={r.nm} style={{fontSize:9,padding:"2px 5px",borderRadius:4,background:"rgba(255,255,255,0.04)",color:"#7a7670",fontFamily:"'DM Mono',monospace"}}>{r.nm} · <span style={{color:"#5a8a70"}}>🚀{r.onset}</span> · <span style={{color:"#6878a0"}}>⏳{r.dur}</span></span>)}
    </div>
    {/* Top feels + risks */}
    <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:4}}>
      {s.feels.slice(0,3).map(f=><span key={f} style={{fontSize:9,padding:"1px 5px",borderRadius:3,background:"rgba(34,197,94,0.08)",color:"#5ab87a"}}>{f}</span>)}
      {s.odRisk.slice(0,1).map(r=><span key={r} style={{fontSize:9,padding:"1px 5px",borderRadius:3,background:"rgba(239,68,68,0.08)",color:"#e07070"}}>{r.substring(0,30)}{r.length>30?"…":""}</span>)}
    </div>
    {/* Safety + addiction */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
      <SafetyDots s={s} compact={true}/>
      <div style={{display:"flex",alignItems:"center",gap:3}} title={`Addiction: ${s.addictLabel}`}>
        {[1,2,3,4,5].map(i=><div key={i} style={{width:4,height:10,borderRadius:2,background:i<=s.addict?ac:"rgba(255,255,255,0.06)"}}/>)}
        <span style={{fontSize:8,color:"#6b6860",fontFamily:"'DM Mono',monospace",marginLeft:2}}>addiction</span>
      </div>
    </div>
  </div>;
}

function LethalViz({s}){
  if(!s.lethal.cmp)return null;
  const bad=s.margin&&s.margin<=10;const med=s.margin&&s.margin<=20;
  const col=bad?"#ef4444":med?"#f97316":"#f59e0b";
  const safe=s.margin&&s.margin>=100;
  const sz=typeof s.lethal.sz==="number"?{w:s.lethal.sz,h:s.lethal.sz}:{w:s.lethal.sz[0],h:s.lethal.sz[1]};
  return <div style={{background:bad?"rgba(239,68,68,0.07)":safe?"rgba(34,197,94,0.05)":"rgba(0,0,0,0.2)",borderRadius:10,padding:14,border:`1px solid ${bad?"rgba(239,68,68,0.25)":safe?"rgba(34,197,94,0.15)":"rgba(255,255,255,0.06)"}`,marginBottom:12}}>
    {/* THE HEADLINE — this is what people need to see first */}
    <p style={{margin:"0 0 10px",fontSize:16,fontFamily:"'Instrument Serif',Georgia,serif",color:bad?"#ef4444":safe?"#4ade80":"#e8e6e3",fontWeight:400,lineHeight:1.4}}>{s.lethal.headline}</p>
    {/* Visual dot + relatable comparison */}
    <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:10}}>
      <div style={{width:64,height:64,borderRadius:6,background:"rgba(255,255,255,0.02)",display:"flex",alignItems:"center",justifyContent:"center",border:"1px dashed rgba(255,255,255,0.08)",flexShrink:0,position:"relative"}}>
        <div style={{width:sz.w,height:sz.h,borderRadius:s.lethal.cmp==="grain"?"50%":3,background:safe?"#22c55e":col,opacity:0.85,boxShadow:bad?`0 0 12px ${col}88`:"none"}}/>
        {s.lethal.cmp==="grain"&&<div style={{position:"absolute",bottom:1,fontSize:7,color:"#888",fontFamily:"'DM Mono',monospace"}}>← actual size</div>}
      </div>
      <p style={{margin:0,fontSize:13,color:"#a09d97",lineHeight:1.5,fontFamily:"'Source Serif 4',Georgia,serif"}}>{s.lethal.realworld}</p>
    </div>
    {/* Extra context */}
    <p style={{margin:0,fontSize:11.5,color:"#6b6860",lineHeight:1.5,borderTop:"1px solid rgba(255,255,255,0.04)",paddingTop:8}}>{s.lethal.note}</p>
  </div>;
}

function Detail({s}){
  const c=CAT[s.cat];const ac=ADDICT_COLORS[s.addict-1];
  const lvls=[{l:"Threshold",v:s.dose.threshold,c:"#4ade80"},{l:"Light",v:s.dose.light,c:"#86efac"},{l:"Common",v:s.dose.common,c:"#fbbf24"},{l:"Strong",v:s.dose.strong,c:"#f97316"},{l:"Heavy",v:s.dose.heavy,c:"#ef4444"}];
  const Sec=({title,children})=><div style={{marginBottom:12}}><h4 style={{margin:"0 0 5px",fontSize:10,color:"#6b6860",fontFamily:"'DM Mono',monospace",textTransform:"uppercase",letterSpacing:"0.08em"}}>{title}</h4>{children}</div>;
  return <div style={{background:"rgba(255,255,255,0.02)",borderRadius:12,border:"1px solid rgba(255,255,255,0.06)",padding:18,marginBottom:14}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
      <div><h3 style={{margin:0,fontFamily:"'Instrument Serif',Georgia,serif",fontSize:19,color:c.c,fontWeight:400}}>{s.n}</h3>
        <span style={{fontSize:10.5,color:"#6b6860",fontFamily:"'DM Mono',monospace"}}>{SRC_ICONS[s.src]} {SRC_LABELS[s.src]}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:4,padding:"4px 8px",borderRadius:6,background:"rgba(255,255,255,0.03)"}}>
        {[1,2,3,4,5].map(i=><div key={i} style={{width:5,height:12,borderRadius:2,background:i<=s.addict?ac:"rgba(255,255,255,0.06)"}}/>)}
        <span style={{fontSize:9,color:ac,fontFamily:"'DM Mono',monospace",marginLeft:3}}>{s.addictLabel}</span>
      </div>
    </div>
    <p style={{margin:"4px 0 12px",fontSize:12.5,color:"#8a8780",lineHeight:1.5}}>{s.desc}</p>
    {/* Safety box */}
    <div style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:10,marginBottom:12,border:"1px solid rgba(255,255,255,0.05)"}}>
      <SafetyDots s={s} compact={false}/>{s.marginExplain&&<p style={{margin:"6px 0 0",fontSize:11.5,color:"#7a7670",lineHeight:1.5}}>{s.marginExplain}</p>}
      {s.supplyRisk>=3&&<p style={{margin:"5px 0 0",fontSize:11.5,color:"#d4a040",background:"rgba(245,158,11,0.06)",padding:"5px 7px",borderRadius:4}}>⚠ {s.supplyExplain}</p>}
    </div>
    {/* Routes */}
    <Sec title="How you take it · How fast · How long">{s.routes.map(r=><div key={r.nm} style={{display:"flex",gap:8,alignItems:"center",padding:"4px 0",borderBottom:"1px solid rgba(255,255,255,0.03)",fontSize:11.5,fontFamily:"'DM Mono',monospace",flexWrap:"wrap"}}>
      <span style={{color:"#c7c4be",minWidth:110}}>{r.nm}</span><span style={{color:"#5a8a70"}}>🚀 {r.onset}</span><span style={{color:"#6878a0"}}>⏳ {r.dur}</span>
    </div>)}</Sec>
    {/* Dosage */}
    <Sec title="How much">{lvls.map((l,i)=><div key={l.l} style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
      <span style={{width:55,fontSize:10,color:l.c,fontFamily:"'DM Mono',monospace",textAlign:"right"}}>{l.l}</span>
      <div style={{flex:1,height:5,borderRadius:3,background:"rgba(255,255,255,0.04)",overflow:"hidden"}}><div style={{width:`${20+i*20}%`,height:"100%",borderRadius:3,background:`linear-gradient(90deg,${l.c}44,${l.c})`}}/></div>
      <span style={{fontSize:11,color:"#c7c4be",fontFamily:"'DM Mono',monospace",minWidth:75}}>{l.v}</span>
    </div>)}</Sec>
    <LethalViz s={s}/>
    {/* Feels + OD + Long-term in grid */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Sec title="What it feels like"><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{s.feels.map(f=><span key={f} style={{fontSize:10,padding:"2px 6px",borderRadius:4,background:"rgba(34,197,94,0.08)",color:"#5ab87a"}}>{f}</span>)}</div></Sec>
      <Sec title="What happens if you take too much"><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{s.odRisk.map(r=><span key={r} style={{fontSize:10,padding:"2px 6px",borderRadius:4,background:"rgba(239,68,68,0.1)",color:"#e07070"}}>{r}</span>)}</div></Sec>
    </div>
    <Sec title="What happens if you keep using it"><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{s.longTerm.map(l=><span key={l} style={{fontSize:10,padding:"2px 6px",borderRadius:4,background:"rgba(99,102,241,0.08)",color:"#8b8fd0"}}>{l}</span>)}</div></Sec>
  </div>;
}

function Combos({selected}){if(selected.length<2)return null;const pairs=[];for(let i=0;i<selected.length;i++)for(let j=i+1;j<selected.length;j++){const a=S.find(x=>x.id===selected[i]),b=S.find(x=>x.id===selected[j]);pairs.push({a,b,risk:cr(selected[i],selected[j])});}
  const ord=["synergy","low_risk","decrease","caution","unsafe","dangerous"];const worst=pairs.reduce((w,p)=>p.risk&&ord.indexOf(p.risk)>ord.indexOf(w)?p.risk:w,"synergy");const wl=RL[worst];
  return <div style={{marginBottom:18}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
      <h2 style={{margin:0,fontFamily:"'Instrument Serif',Georgia,serif",fontSize:20,color:"#e8e6e3",fontWeight:400}}>Combination Check</h2>
      <div style={{padding:"6px 12px",borderRadius:8,fontSize:12.5,background:wl.c+"18",border:`1.5px solid ${wl.c}40`,color:wl.c,fontFamily:"'DM Mono',monospace",display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:15}}>{wl.i}</span>{wl.l}</div>
    </div>
    {pairs.map(({a,b,risk})=>{const lv=risk?RL[risk]:null;return <div key={`${a.id}-${b.id}`} style={{padding:"10px 12px",borderRadius:8,marginBottom:5,background:"rgba(255,255,255,0.02)",borderLeft:`3px solid ${lv?.c||"#555"}`}}>
      <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4,fontFamily:"'Instrument Serif',Georgia,serif",fontSize:14}}><span style={{color:CAT[a.cat].c}}>{a.n}</span><span style={{color:"#444"}}>+</span><span style={{color:CAT[b.cat].c}}>{b.n}</span></div>
      <div style={{display:"flex",gap:6,alignItems:"flex-start"}}><span style={{fontSize:16,color:lv?.c||"#666"}}>{lv?.i||"?"}</span><div><div style={{fontSize:11.5,fontWeight:600,color:lv?.c||"#888",fontFamily:"'DM Mono',monospace"}}>{lv?.l||"Unknown"}</div><p style={{margin:"2px 0 0",fontSize:11.5,color:"#7a7670",lineHeight:1.4}}>{lv?.d||"No data. Absence ≠ safety."}</p></div></div>
    </div>;})}
  </div>;
}

function Matrix(){const[h,setH]=useState(null);return <div style={{background:"rgba(255,255,255,0.02)",borderRadius:12,border:"1px solid rgba(255,255,255,0.06)",padding:18}}>
  <h3 style={{margin:"0 0 12px",fontFamily:"'Instrument Serif',Georgia,serif",fontSize:19,color:"#e8e6e3",fontWeight:400}}>Full Combination Matrix</h3>
  <div style={{overflowX:"auto"}}><table style={{borderCollapse:"separate",borderSpacing:2,fontSize:9,fontFamily:"'DM Mono',monospace"}}>
    <thead><tr><th style={{width:50}}/>{S.map(s=><th key={s.id} style={{color:CAT[s.cat].c,padding:"2px 1px",writingMode:"vertical-rl",maxHeight:60,fontSize:8,fontWeight:500}}>{s.n.split(" ")[0].split("(")[0].substring(0,7)}</th>)}</tr></thead>
    <tbody>{S.map(row=><tr key={row.id}><td style={{color:CAT[row.cat].c,textAlign:"right",paddingRight:3,fontSize:8,fontWeight:500,whiteSpace:"nowrap"}}>{row.n.split("(")[0].trim().substring(0,9)}</td>
      {S.map(col=>{if(row.id===col.id)return <td key={col.id} style={{width:18,height:18,textAlign:"center",background:"rgba(255,255,255,0.02)",borderRadius:2,color:"#333",fontSize:8}}>–</td>;
        const risk=cr(row.id,col.id);const lv=risk?RL[risk]:null;
        return <td key={col.id} onMouseEnter={()=>setH(`${row.id}-${col.id}`)} onMouseLeave={()=>setH(null)} title={lv?`${row.n}+${col.n}: ${lv.l}`:"?"} style={{width:18,height:18,textAlign:"center",borderRadius:2,background:lv?lv.c+(h===`${row.id}-${col.id}`?"55":"28"):"#1e1e20",color:lv?.c||"#444",fontSize:9}}>{lv?.i||"?"}</td>;})}</tr>)}</tbody>
  </table></div>
  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>{Object.entries(RL).map(([k,v])=><span key={k} style={{fontSize:9.5,color:v.c,fontFamily:"'DM Mono',monospace"}}>{v.i} {v.l}</span>)}</div>
</div>;}

function Charts(){
  const Bar=({items,max,getVal,getCol,title,sub,desc,log})=><div style={{background:"rgba(255,255,255,0.02)",borderRadius:12,border:"1px solid rgba(255,255,255,0.06)",padding:20,marginBottom:18}}>
    <h3 style={{margin:"0 0 2px",fontFamily:"'Instrument Serif',Georgia,serif",fontSize:18,color:"#e8e6e3",fontWeight:400}}>{title}<span style={{fontSize:12,color:"#6b6860",fontFamily:"'DM Mono',monospace"}}> {sub}</span></h3>
    <p style={{margin:"0 0 12px",fontSize:12,color:"#6b6860"}}>{desc}</p>
    {items.map(s=>{const v=getVal(s);const w=log?Math.min((Math.log10(Math.max(v,1))/Math.log10(max))*100,100):Math.min((v/max)*100,100);return <div key={s.id} style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
      <span style={{width:90,fontSize:10.5,color:CAT[s.cat].c,fontFamily:"'DM Mono',monospace",textAlign:"right",flexShrink:0}}>{s.n.split("(")[0].trim().substring(0,11)}</span>
      <div style={{flex:1,height:8,borderRadius:4,background:"rgba(255,255,255,0.04)",overflow:"hidden"}}><div style={{width:`${w}%`,height:"100%",borderRadius:4,background:`linear-gradient(90deg,${getCol(s)}44,${getCol(s)})`}}/></div>
      <span style={{fontSize:10.5,color:"#a09d97",fontFamily:"'DM Mono',monospace",minWidth:40,textAlign:"right"}}>{v>=1000?">1k":v}</span>
    </div>;})}
  </div>;
  return <div>
    <Bar log items={S.filter(x=>x.margin).sort((a,b)=>b.margin-a.margin)} max={1000} getVal={s=>s.margin} getCol={s=>s.margin>=100?"#22c55e":s.margin>=20?"#f59e0b":"#ef4444"} title="Room For Error" sub="(how many normal doses before danger)" desc="Higher = harder to accidentally take too much. Cannabis/LSD/mushrooms: huge margin. Fentanyl/opioids: almost none."/>
    <Bar items={S.filter(x=>x.harm).sort((a,b)=>b.harm-a.harm)} max={80} getVal={s=>s.harm} getCol={s=>s.harm>50?"#ef4444":s.harm>30?"#f97316":s.harm>15?"#f59e0b":"#22c55e"} title="Total Damage" sub="(to you + to society)" desc="Nutt et al. (Lancet 2010). Alcohol scores highest of any drug. Being legal doesn't make something safe."/>
    <Bar items={S.filter(x=>x.addict>=2).sort((a,b)=>b.addict-a.addict)} max={5} getVal={s=>s.addict} getCol={s=>ADDICT_COLORS[s.addict-1]} title="How Addictive?" sub="" desc="How likely you are to get hooked. Nicotine and meth are at the top. Psychedelics barely register."/>
    <Bar items={S.filter(x=>x.supplyRisk>1).sort((a,b)=>b.supplyRisk-a.supplyRisk)} max={5} getVal={s=>s.supplyRisk} getCol={s=>s.supplyRisk>=4?"#ef4444":s.supplyRisk>=3?"#f97316":"#f59e0b"} title="Is It What You Think?" sub="(contamination risk)" desc="How likely what you bought contains something else. Cocaine, street pills, and 'heroin' are very often not what they claim to be."/>
  </div>;
}

// ── APP ──
export default function App(){
  const[sel,setSel]=useState([]);const[view,setView]=useState("checker");const[search,setSearch]=useState("");const[catF,setCatF]=useState(null);
  const toggle=useCallback(id=>setSel(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]),[]);
  const filtered=useMemo(()=>S.filter(s=>{const ms=!search||s.n.toLowerCase().includes(search.toLowerCase())||s.aka.some(a=>a.toLowerCase().includes(search.toLowerCase()));return ms&&(!catF||s.cat===catF);}),[search,catF]);
  const selSubs=sel.map(id=>S.find(x=>x.id===id)).filter(Boolean);
  const nb=(v,l)=><button onClick={()=>setView(v)} style={{padding:"6px 12px",borderRadius:7,border:"none",cursor:"pointer",background:view===v?"rgba(255,255,255,0.1)":"transparent",color:view===v?"#e8e6e3":"#6b6860",fontFamily:"'DM Mono',monospace",fontSize:12}}>{l}</button>;

  return <div style={{minHeight:"100vh",background:"#111113",color:"#c7c4be",fontFamily:"'Source Serif 4',Georgia,serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Instrument+Serif&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet"/>
    <header style={{borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"10px 18px"}}><div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <svg width="24" height="24" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.8"/><path d="M14 6v16M8 10l6-4 6 4M8 18l6 4 6-4" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6"/></svg>
        <div><h1 style={{margin:0,fontFamily:"'Instrument Serif',Georgia,serif",fontSize:20,color:"#e8e6e3",fontWeight:400}}>SafeDose</h1><p style={{margin:0,fontSize:10,color:"#555",fontFamily:"'DM Mono',monospace"}}>Evidence-based harm reduction</p></div>
      </div>
      <nav style={{display:"flex",gap:2}}>{nb("checker","Checker")}{nb("charts","Data")}{nb("matrix","Matrix")}</nav>
    </div></header>
    <div style={{maxWidth:1200,margin:"0 auto",padding:"6px 18px"}}><div style={{background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.15)",borderRadius:7,padding:"7px 11px",fontSize:11,color:"#a09070",lineHeight:1.5}}>
      <strong style={{color:"#c4a050"}}>Harm reduction — not medical advice.</strong> Data: <a href="https://tripsit.me" style={{color:"#c4a050"}} target="_blank" rel="noopener">TripSit</a>, Nutt et al., NHTSA, DrugsData, DanceSafe. <strong>Always test your substances.</strong>
    </div></div>
    <main style={{maxWidth:1200,margin:"0 auto",padding:"12px 18px"}}>
      {view==="checker"&&<div style={{display:"grid",gridTemplateColumns:"minmax(250px,370px) 1fr",gap:16,alignItems:"start"}}>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><h2 style={{margin:0,fontFamily:"'Instrument Serif',Georgia,serif",fontSize:16,color:"#e8e6e3",fontWeight:400}}>Substances</h2><span style={{fontSize:10,color:"#555",fontFamily:"'DM Mono',monospace"}}>{sel.length} selected</span></div>
          <input type="text" placeholder="Search name or street name..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:"100%",padding:"8px 11px",borderRadius:7,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.03)",color:"#c7c4be",fontSize:12,fontFamily:"'Source Serif 4',Georgia,serif",outline:"none",marginBottom:7,boxSizing:"border-box"}}/>
          <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:8}}>
            <button onClick={()=>setCatF(null)} style={{padding:"2px 7px",borderRadius:4,border:"1px solid",cursor:"pointer",fontSize:9.5,fontFamily:"'DM Mono',monospace",background:!catF?"rgba(255,255,255,0.1)":"transparent",borderColor:!catF?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.06)",color:!catF?"#e8e6e3":"#555"}}>All</button>
            {Object.entries(CAT).map(([k,v])=><button key={k} onClick={()=>setCatF(catF===k?null:k)} style={{padding:"2px 7px",borderRadius:4,border:"1px solid",cursor:"pointer",fontSize:9.5,fontFamily:"'DM Mono',monospace",background:catF===k?v.b:"transparent",borderColor:catF===k?v.c+"40":"rgba(255,255,255,0.06)",color:catF===k?v.c:"#555"}}>{v.l}</button>)}
          </div>
          <div style={{maxHeight:"calc(100vh - 220px)",overflowY:"auto",paddingRight:3}}>{filtered.map(s=><Card key={s.id} s={s} sel={sel.includes(s.id)} onToggle={toggle}/>)}</div>
        </div>
        <div>
          {sel.length===0&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:380,textAlign:"center"}}>
            <svg width="50" height="50" viewBox="0 0 64 64" style={{marginBottom:12,opacity:0.3}}><circle cx="32" cy="32" r="28" fill="none" stroke="#444" strokeWidth="2" strokeDasharray="4 4"/><path d="M24 30l8 6 8-6" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"/></svg>
            <h3 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:18,fontWeight:400,color:"#666",margin:"0 0 5px"}}>Select substances</h3>
            <p style={{fontSize:12,color:"#555",maxWidth:320,lineHeight:1.5}}>Tap one for its full safety profile. Tap two+ to check combination safety.</p>
          </div>}
          {sel.length>=1&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
            {selSubs.map(s=><button key={s.id} onClick={()=>toggle(s.id)} style={{padding:"4px 9px",borderRadius:5,cursor:"pointer",fontSize:11,background:"transparent",border:`1px solid ${CAT[s.cat].c}40`,color:CAT[s.cat].c,fontFamily:"'DM Mono',monospace"}}>{s.n} ×</button>)}
            <button onClick={()=>setSel([])} style={{padding:"4px 9px",borderRadius:5,cursor:"pointer",fontSize:10,background:"transparent",border:"1px solid rgba(255,255,255,0.08)",color:"#666",fontFamily:"'DM Mono',monospace"}}>Clear</button>
          </div>}
          <Combos selected={sel}/>
          {selSubs.map(s=><Detail key={s.id} s={s}/>)}
        </div>
      </div>}
      {view==="charts"&&<Charts/>}
      {view==="matrix"&&<Matrix/>}
    </main>
    <footer style={{borderTop:"1px solid rgba(255,255,255,0.04)",padding:16,marginTop:24,textAlign:"center"}}>
      <p style={{fontSize:11.5,color:"#666",maxWidth:660,margin:"0 auto 5px",lineHeight:1.5}}>Overdose: <strong style={{color:"#aaa"}}>Call 911 + Narcan</strong> · Struggling: <strong style={{color:"#aaa"}}>SAMHSA 1-800-662-4357</strong></p>
      <p style={{fontSize:9.5,color:"#3a3a3a",fontFamily:"'DM Mono',monospace"}}>Data: TripSit · Nutt et al. 2010 · NHTSA · DrugsData · DanceSafe · PsychonautWiki</p>
    </footer>
  </div>;
}