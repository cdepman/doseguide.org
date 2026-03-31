const SOURCES = [
  { name: "TripSit", url: "https://tripsit.me", type: "Community", desc: "The drug combination chart and interaction data used in the Combination Checker and Matrix are derived from TripSit's research. Their combo chart (v4.0) is the most comprehensive publicly available drug interaction reference, maintained by volunteers and reviewed by pharmacologists.", link2: "https://wiki.tripsit.me/wiki/Drug_combinations", link2label: "Drug Combinations Wiki" },
  { name: "Nutt, King & Phillips — \"Drug harms in the UK\" (The Lancet, 2010)", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(10)61462-6/fulltext", type: "Peer-reviewed", desc: "The harm scores throughout this tool come from this landmark multicriteria decision analysis. An expert panel scored 20 substances on 16 criteria covering harm to users and harm to others. This is the study that demonstrated alcohol causes more total harm than any other drug." },
  { name: "DrugsData (formerly EcstasyData)", url: "https://drugsdata.org", type: "Lab analysis", desc: "Adulteration and purity data, especially for MDMA, is informed by DrugsData's 25+ year database of anonymously submitted drug samples analyzed by DEA-licensed laboratories. Their finding that only ~74% of 'MDMA' samples contain only MDMA (as of 2023) is referenced in our supply risk ratings." },
  { name: "DanceSafe", url: "https://dancesafe.org", type: "Nonprofit", desc: "The oldest drug checking kit manufacturer in the US. Their #TestIt alerts and on-site drug checking data inform our adulteration warnings. DanceSafe provides reagent test kits and fentanyl test strips.", link2: "https://dancesafe.org/drug-checking/", link2label: "Drug Checking Services" },
  { name: "NHTSA — Drugs and Human Performance Fact Sheets", url: "https://www.nhtsa.gov/sites/nhtsa.gov/files/809725-drugshumanperformancefs.pdf", type: "Government", desc: "Detailed pharmacological profiles for 16 substances including dosage ranges, pharmacokinetics, metabolism, and drug interactions." },
  { name: "PsychonautWiki", url: "https://psychonautwiki.org", type: "Community", desc: "Dosage ranges, onset times, duration, and subjective effect profiles. One of the most detailed and regularly updated substance databases.", link2: "https://psychonautwiki.org/wiki/Dosage_classification", link2label: "Dosage Classification" },
  { name: "Erowid", url: "https://erowid.org", type: "Nonprofit", desc: "Effect descriptions, experience reports, and pharmacological reference data. The foundational online drug information resource since 1995.", link2: "https://erowid.org/experiences/", link2label: "Experience Vaults" },
  { name: "Gable — \"The Toxicity of Recreational Drugs\" (American Scientist, 2006)", url: "https://www.americanscientist.org/article/the-toxicity-of-recreational-drugs", type: "Peer-reviewed", desc: "The safety margin data — the ratio of a lethal dose to an effective dose — showing cannabis, LSD, and psilocybin have ratios exceeding 1,000:1." },
  { name: "National Treatment Agency — Overdose Preventability Study (UK, 2007)", url: "https://www.drugsandalcohol.ie/6223/", type: "Government", desc: "Analysis of 151 overdose deaths in London. Informed our understanding of polydrug fatality patterns and tolerance-related overdose risk." },
  { name: "SAMHSA — National Survey on Drug Use and Health", url: "https://www.samhsa.gov/data/nsduh", type: "Government", desc: "Prevalence data and national trends in substance use. The most comprehensive annual survey of drug use in the United States." },
  { name: "DEA / NFLIS", url: "https://www.nflis.deadiversion.usdoj.gov/", type: "Government", desc: "Fentanyl co-occurrence rates in other drug supplies from forensic laboratory analysis of law enforcement seizures across the US." },
  { name: "Fentanyl Contamination Research (The Lancet, 2024)", url: "https://www.thelancet.com/journals/lanam/article/PIIS2667-193X(24)00225-4/fulltext", type: "Peer-reviewed", desc: "Found fentanyl co-occurs in over 10% of cocaine and methamphetamine samples in several Northeast US states." },
];

const TYPE_COLORS = {
  "Peer-reviewed": { bg: "rgba(168,85,247,0.12)", c: "#a855f7" },
  "Government": { bg: "rgba(59,130,246,0.12)", c: "#60a5fa" },
  "Lab analysis": { bg: "rgba(6,182,212,0.12)", c: "#06b6d4" },
};
const DEFAULT_TYPE_COLOR = { bg: "rgba(34,197,94,0.12)", c: "#22c55e" };

export default function Sources() {
  return <div style={{ maxWidth: 760 }}>
    <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 22, color: "#e8e6e3", fontWeight: 400, marginBottom: 4 }}>Data Sources</h2>
    <p style={{ fontSize: 13, color: "#8a8780", lineHeight: 1.6, marginBottom: 20 }}>SafeDose synthesizes data from peer-reviewed research, government agencies, and community harm reduction organizations. Every piece of data in this tool can be traced to one or more of these sources.</p>
    {SOURCES.map((src, i) => {
      const tc = TYPE_COLORS[src.type] || DEFAULT_TYPE_COLOR;
      return <div key={i} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", padding: 16, marginBottom: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
          <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 17, color: "#e8e6e3", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.15)", fontWeight: 400 }}>{src.name}</a>
          <span style={{ fontSize: 9.5, padding: "2px 8px", borderRadius: 12, background: tc.bg, color: tc.c, fontFamily: "'DM Mono',monospace", flexShrink: 0 }}>{src.type}</span>
        </div>
        <p style={{ margin: "0 0 6px", fontSize: 12.5, color: "#8a8780", lineHeight: 1.6 }}>{src.desc}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#6b9080", fontFamily: "'DM Mono',monospace", textDecoration: "none" }}>↗ Visit site</a>
          {src.link2 && <a href={src.link2} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#6b9080", fontFamily: "'DM Mono',monospace", textDecoration: "none" }}>↗ {src.link2label}</a>}
        </div>
      </div>;
    })}
    <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 8, padding: 14, marginTop: 16 }}>
      <h3 style={{ margin: "0 0 6px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 16, color: "#c4a050", fontWeight: 400 }}>A note on data quality</h3>
      <p style={{ margin: 0, fontSize: 12.5, color: "#a09070", lineHeight: 1.6 }}>No single source is perfect. We cross-reference multiple sources and err on the side of caution — when sources disagree, we use the more conservative estimate. If you find an error, please let us know.</p>
    </div>
  </div>;
}
