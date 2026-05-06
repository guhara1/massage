import { readFileSync, writeFileSync, existsSync } from "node:fs";

const files = ["src/app/page.tsx", "src/app/layout.tsx", "src/app/courses/page.tsx"];
const from = "케어링크";
const to = "마사지매니아";

function addCourseNav(content) {
  if (content.includes('href="/courses"')) return content;
  return content.replace('<a href="#area">지역 선택</a>', '<a href="/courses">마사지코스</a><a href="#area">지역 선택</a>');
}

function improveCourseTrustSection(content) {
  return content
    .split('E-E-A-T 기준 안내')
    .join('예약 전 확인 기준')
    .split('과장된 효과 표현보다 이용 전 확인해야 할 실제 기준을 우선합니다.')
    .join('마사지매니아는 이용자가 상담 전에 확인해야 할 요금, 가능 시간, 관리 범위, 방문 조건을 기준으로 정보를 정리합니다. 과장된 표현보다 실제 예약 과정에서 필요한 확인 사항을 우선 안내합니다.')
    .split('상담 경험 기준')
    .join('상담 기준')
    .split('이용자가 실제로 묻는 코스 시간, 관리 범위, 압 조절, 방문 조건을 중심으로 정리했습니다.')
    .join('코스 시간, 관리 범위, 압 조절, 방문 가능 장소처럼 실제 상담에서 자주 확인되는 내용을 기준으로 안내합니다.')
    .split('명확한 예약 기준')
    .join('요금 확인')
    .split('총 금액, 후불 조건, 추가 이동비, 관리사 배정 가능 시간을 상담 전 확인하도록 안내합니다.')
    .join('총 금액, 후불 여부, 추가 이동비, 야간 가능 시간은 예약 전 전화 상담에서 먼저 확인하는 것이 좋습니다.')
    .split('주의사항 공개')
    .join('운영 원칙')
    .split('불법 또는 부적절한 요청은 상담 범위에서 제외하며 건전한 방문 케어 기준만 안내합니다.')
    .join('부적절하거나 불법적인 요청은 안내하지 않으며, 건전한 방문 케어 기준 안에서 상담을 진행합니다.');
}

for (const file of files) {
  if (!existsSync(file)) continue;
  const before = readFileSync(file, "utf8");
  let after = before.split(from).join(to);
  if (file === "src/app/page.tsx") after = addCourseNav(after);
  if (file === "src/app/courses/page.tsx") after = improveCourseTrustSection(after);
  if (after !== before) writeFileSync(file, after, "utf8");
}
