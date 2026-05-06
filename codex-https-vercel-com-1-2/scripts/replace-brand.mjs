import { readFileSync, writeFileSync, existsSync } from "node:fs";

const files = ["src/app/page.tsx", "src/app/layout.tsx"];
const from = "케어링크";
const to = "마사지매니아";

for (const file of files) {
  if (!existsSync(file)) continue;
  const before = readFileSync(file, "utf8");
  const after = before.split(from).join(to);
  if (after !== before) writeFileSync(file, after, "utf8");
}
