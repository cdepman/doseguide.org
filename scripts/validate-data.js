#!/usr/bin/env node
/**
 * Data validation for OpenSubstance.org
 * Run: node scripts/validate-data.js
 * Checks for duplicate CO keys, missing _src fields, orphaned CITE refs,
 * and basic data integrity.
 */

import { S, CAT, CITE } from "../src/data/substances.js";
import { CO, CO_SRC } from "../src/data/combinations.js";

let errors = 0;
let warnings = 0;

function error(msg) { console.error(`  ❌ ${msg}`); errors++; }
function warn(msg) { console.warn(`  ⚠  ${msg}`); warnings++; }
function ok(msg) { console.log(`  ✅ ${msg}`); }

console.log("\n🔍 OpenSubstance Data Validation\n");

// 1. Check for duplicate CO keys
console.log("── Combination map (CO) ──");
const seen = new Set();
let dupes = 0;
for (const key of Object.keys(CO)) {
  const sorted = key.split("+").sort().join("+");
  if (seen.has(sorted)) { error(`Duplicate CO key: ${key} (normalized: ${sorted})`); dupes++; }
  seen.add(sorted);
}
if (!dupes) ok(`${Object.keys(CO).length} entries, no duplicates`);

// 2. Check all substances have required fields
console.log("\n── Substance data (S) ──");
const required = ["id", "n", "cat", "aka", "desc", "harm", "routes", "dose", "lethal"];
const requiredNonMed = ["blurb", "chem"];
for (const s of S) {
  if (!s.isMedication) {
    for (const f of [...required, ...requiredNonMed]) {
      if (s[f] === undefined && f !== "harm") error(`${s.id}: missing field '${f}'`);
    }
    if (!s._src) warn(`${s.id}: missing _src object`);
    else {
      if (!s._src.harm && s.harm != null) warn(`${s.id}: has harm score but no _src.harm`);
    }
  }
  if (!CAT[s.cat]) error(`${s.id}: unknown category '${s.cat}'`);
}
ok(`${S.length} substances checked`);

// 3. Check CITE keys referenced in _src exist
console.log("\n── Citation references ──");
let orphanedRefs = 0;
for (const s of S) {
  if (!s._src) continue;
  for (const [field, src] of Object.entries(s._src)) {
    const refs = src.ref ? (Array.isArray(src.ref) ? src.ref : [src.ref]) : [];
    for (const ref of refs) {
      if (ref && !CITE[ref]) { error(`${s.id}._src.${field} references unknown CITE key: ${ref}`); orphanedRefs++; }
    }
  }
}
// Check CO_SRC refs
for (const [key, src] of Object.entries(CO_SRC)) {
  if (src.ref && src.ref !== "tripsit" && !CITE[src.ref]) {
    error(`CO_SRC[${key}] references unknown CITE key: ${src.ref}`);
    orphanedRefs++;
  }
}
if (!orphanedRefs) ok(`All CITE references resolve (${Object.keys(CITE).length} keys)`);

// 4. Check substance IDs in CO map exist
console.log("\n── CO substance references ──");
const sIds = new Set(S.map(s => s.id));
let badRefs = 0;
for (const key of Object.keys(CO)) {
  for (const id of key.split("+")) {
    if (!sIds.has(id)) { error(`CO key '${key}' references unknown substance: ${id}`); badRefs++; }
  }
}
if (!badRefs) ok("All CO substance IDs valid");

// 5. Check chem.relatives point to valid substances
console.log("\n── Chemistry relatives ──");
let badRelatives = 0;
for (const s of S) {
  if (s.chem?.relatives) {
    for (const rid of s.chem.relatives) {
      if (!sIds.has(rid)) { error(`${s.id}.chem.relatives references unknown substance: ${rid}`); badRelatives++; }
    }
  }
}
if (!badRelatives) ok("All chem.relatives valid");

// Summary
console.log(`\n${"─".repeat(40)}`);
if (errors) console.error(`❌ ${errors} error(s), ${warnings} warning(s)`);
else console.log(`✅ All checks passed. ${warnings} warning(s).`);
process.exit(errors ? 1 : 0);
