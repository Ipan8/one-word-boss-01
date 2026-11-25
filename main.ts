// One Word for the Boss — one word that sums up the boss, nothing more.
// The brief is brutally simple: a single word, no sentence, no pitch.
// So the word has to do all the work on its own — it must be instantly
// recognisable to anyone who has ever worked in an office with email.
import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "/output/entry.txt";

// Every boss archetype we considered, ranked by how fast a reader nods.
// "Reply-All" wins because it is not a trait, it is a behaviour everyone
// has suffered: the boss who CCs the entire company on everything, so a
// two-line update lands in forty-seven inboxes before lunch.
const CANDIDATES: readonly string[] = [
  "Reply-All",
  "Micromanager",
  "Ghoster",
];

// Pick the first candidate. The list order is the ranking, so picking
// index zero is the decision — no randomness, no coin flip, same word
// every run, which is what a judged entry needs.
function pickWord(): string {
  const word = CANDIDATES[0];
  if (word === undefined) {
    throw new Error("no candidate word configured");
  }
  return word;
}

// A one-word entry must be exactly one word: no spaces, no tabs, no
// newlines hiding inside it. A hyphen is fine — "Reply-All" reads as a
// single word, the way the button itself is labelled in every inbox.
function isSingleWord(word: string): boolean {
  if (word.length === 0) return false;
  return !/[\s]/.test(word);
}

// Fail loudly instead of submitting a broken entry. If the guard ever
// trips, the run crashes and nothing is written — better than a quiet
// disqualification for a two-word answer.
function guard(word: string): string {
  const trimmed = word.trim();
  if (!isSingleWord(trimmed)) {
    throw new Error(`entry must be one word, got: ${JSON.stringify(word)}`);
  }
  return trimmed;
}

// Sanity check on length: a one-word boss portrait should be short
// enough to read at a glance. Nine characters fits on a badge, a
// leaderboard row, and the subject line of the very email it mocks.
function checkLength(word: string): string {
  if (word.length > 20) {
    throw new Error(`entry word too long: ${word.length} characters`);
  }
  return word;
}

// The reply-all chain outlives the project itself: the thread keeps
// going long after the work is done, because every reply drags the whole
// company back in. That is why the word lands — it names the chain,
// not just the person who started it.
function deliver(word: string): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, `${word}\n`, "utf8");
}

function main(): void {
  const word = checkLength(guard(pickWord()));
  deliver(word);
  console.log(word);
}

main();
