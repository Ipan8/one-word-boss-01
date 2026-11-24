import * as fs from "node:fs";

// One Word for the Boss — entry: exactly one word describing your boss.
// The word: "Reply-All" — the boss who CCs the entire company on everything,
// turns every thread into a group project, and never met a reply button he
// didn't press for all. Nine characters, one word, universally true.
// Why it lands: every office knows this boss — the one whose "quick update"
// hits 47 inboxes, and whose reply-all chains outlive the project itself.
const entry = "Reply-All";

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", entry + "\n");
console.log(entry);
