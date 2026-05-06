import { readFileSync, writeFileSync, existsSync } from "node:fs";

const files = [
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/app/courses/page.tsx",
  "src/app/area/[city]/[district]/[neighborhood]/page.tsx",
];

const from = "케어링크";
const to = "마사지매니아";

function addCourseNav(content) {
  if (content.includes('href="/courses"')) return content;
  return content.replace('<a href="#area">지역 선택</a>', '<a href="/courses">마사지코스</a><a href="#area">지역 선택</a>');
}

function normalizeBrandMark(content) {
  return content
    .replace(/<span className="brand-mark">K<\/span>/g, '<span className="brand-mark">M</span>')
    .replace(/<span className="brand-mark">C<\/span>/g, '<span className="brand-mark">M</span>');
}

function improveMainTrustSection(content) {
  content = content.replace(/<section className="section eeat-section">[\s\S]*?<\/section>\n\n      <section className="section"><div className="notice">/, `<section className="section eeat-section"><div className="section-heading"><h2>운영 정보 공개</h2><p>마사지매니아는 이용자가 예약 전에 확인해야 할 지역 범위, 요금 기준, 상담 연결, 운영 원칙을 한 화면에서 확인할 수 있도록 정리했습니다.</p></div><div className="eeat-grid"><article><strong>지역 기준</strong><h3>행정동 단위 안내</h3><p>수원, 용인, 성남을 시·구·동 기준으로 나누어 현재 위치와 가까운 지역 정보를 빠르게 확인할 수 있게 구성했습니다.</p></article><article><strong>요금 기준</strong><h3>코스와 금액 확인</h3><p>예약 전 코스 시간, 기본 금액, 추가 이동비, 후불 조건을 전화 상담에서 먼저 확인하도록 안내합니다.</p></article><article><strong>페이지 기준</strong><h3>지역별 상세 페이지</h3><p>선택한 시·구·동에 맞는 상세 페이지로 이동해 지역별 가능 업체와 상담 정보를 확인할 수 있습니다.</p></article><article><strong>상담 원칙</strong><h3>전화 상담 기준</h3><p>모든 배너와 업체 카드에서 {phoneNumber} 바로 전화를 제공하며, 부적절한 요청은 상담 범위에서 제외합니다.</p></article></div></section>

      <section className="section"><div className="notice">`);

  return content
    .split("E-E-A-T 운영 기준").join("운영 정보 공개")
    .split("Experience").join("지역 기준")
    .split("Expertise").join("요금 기준")
    .split("Authoritativeness").join("페이지 기준")
    .split("Trust").join("상담 원칙");
}

function improveCourseTrustSection(content) {
  return content
    .split("E-E-A-T 기준 안내").join("예약 전 확인 기준")
    .split("상담 경험 기준").join("상담 기준")
    .split("명확한 예약 기준").join("요금 확인")
    .split("주의사항 공개").join("운영 원칙");
}

for (const file of files) {
  if (!existsSync(file)) continue;
  const before = readFileSync(file, "utf8");
  let after = normalizeBrandMark(before.split(from).join(to));
  if (file === "src/app/page.tsx") after = improveMainTrustSection(addCourseNav(after));
  if (file === "src/app/courses/page.tsx") after = improveCourseTrustSection(after);
  if (after !== before) writeFileSync(file, after, "utf8");
}
