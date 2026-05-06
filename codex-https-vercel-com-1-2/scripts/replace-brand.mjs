import { readFileSync, writeFileSync, existsSync } from "node:fs";

const files = ["src/app/page.tsx", "src/app/layout.tsx", "src/app/courses/page.tsx"];
const from = "케어링크";
const to = "마사지매니아";

function addCourseNav(content) {
  if (content.includes('href="/courses"')) return content;
  return content.replace('<a href="#area">지역 선택</a>', '<a href="/courses">마사지코스</a><a href="#area">지역 선택</a>');
}

for (const file of files) {
  if (!existsSync(file)) continue;
  const before = readFileSync(file, "utf8");
  let after = before.split(from).join(to);
  if (file === "src/app/page.tsx") after = addCourseNav(after);
  if (after !== before) writeFileSync(file, after, "utf8");
}
