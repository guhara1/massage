import type { NextConfig } from "next";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const brandFiles = [
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/app/courses/page.tsx",
  "src/app/area/[city]/[district]/[neighborhood]/page.tsx",
];

function addCourseNav(content: string) {
  if (content.includes('href="/courses"')) return content;
  return content.replace('<a href="#area">지역 선택</a>', '<a href="/courses">마사지코스</a><a href="#area">지역 선택</a>');
}

function normalizeBrand(content: string) {
  return content
    .split("케어링크").join("마사지매니아")
    .replace(/<span className="brand-mark">K<\/span>/g, '<span className="brand-mark">M</span>')
    .replace(/<span className="brand-mark">C<\/span>/g, '<span className="brand-mark">M</span>');
}

function fixMainTrustSection(content: string) {
  content = content.replace(
    /<section className="section eeat-section">[\s\S]*?<\/section>\n\n      <section className="section"><div className="notice">/,
    `<section className="section trust-section"><div className="section-heading"><h2>운영 정보 공개</h2><p>마사지매니아는 이용자가 예약 전에 확인해야 할 지역 범위, 요금 기준, 상담 연결, 운영 원칙을 한 화면에서 확인할 수 있도록 정리했습니다.</p></div><div className="eeat-grid"><article><strong>지역 기준</strong><h3>행정동 단위 안내</h3><p>수원, 용인, 성남을 시·구·동 기준으로 나누어 가까운 지역 정보를 빠르게 확인할 수 있게 구성했습니다.</p></article><article><strong>요금 기준</strong><h3>코스와 금액 확인</h3><p>예약 전 코스 시간, 기본 금액, 추가 이동비, 후불 조건을 전화 상담에서 먼저 확인하도록 안내합니다.</p></article><article><strong>페이지 기준</strong><h3>지역별 상세 페이지</h3><p>선택한 지역 상세 페이지에서 가능 업체와 상담 정보를 확인할 수 있습니다.</p></article><article><strong>상담 원칙</strong><h3>전화 상담 기준</h3><p>바로 전화 연결을 제공하며, 부적절한 요청은 상담 범위에서 제외합니다.</p></article></div></section>

      <section className="section"><div className="notice">`,
  );

  return content
    .split("E-E-A-T 운영 기준").join("운영 정보 공개")
    .split("E-E-A-T 기준 안내").join("예약 전 확인 기준")
    .split("Experience").join("지역 기준")
    .split("Expertise").join("요금 기준")
    .split("Authoritativeness").join("페이지 기준")
    .split("Trust").join("상담 원칙")
    .split("지역별 실제 흐름").join("행정동 단위 안내")
    .split("가격과 코스 공개").join("코스와 금액 확인")
    .split("고유 지역 페이지").join("지역별 상세 페이지")
    .split("전화와 정책 공개").join("전화 상담 기준");
}

function applyContentFixes() {
  for (const file of brandFiles) {
    if (!existsSync(file)) continue;
    const before = readFileSync(file, "utf8");
    let after = normalizeBrand(before);
    if (file === "src/app/page.tsx") after = fixMainTrustSection(addCourseNav(after));
    if (file === "src/app/courses/page.tsx") after = fixMainTrustSection(after);
    if (after !== before) writeFileSync(file, after, "utf8");
  }
}

applyContentFixes();

const nextConfig: NextConfig = {};

export default nextConfig;
