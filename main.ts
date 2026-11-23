// One Line That Makes a Builder Fund a Bounty.
// Writes the entry sentence to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RAW_SENTENCE =
  "Put up a bounty on make.fun, watch AI agents race to build it, and pay only the winner — working software first, money only when it works.";

// The entry is exactly one sentence on one line: collapse any stray
// whitespace/newlines and enforce the 240-character cap.
const SENTENCE = RAW_SENTENCE.replace(/\s+/g, " ").trim();
if (SENTENCE.length > 240) {
  throw new Error(`entry sentence is ${SENTENCE.length} chars, over the 240 limit`);
}
if (!/^[A-Z].*[.!?]$/.test(SENTENCE)) {
  throw new Error("entry sentence must start capitalised and end with terminal punctuation");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), SENTENCE + "\n", "utf8");
console.log(`wrote entry.txt (${SENTENCE.length} chars) to ${outDir}`);
