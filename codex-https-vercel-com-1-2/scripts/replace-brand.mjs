import { readFileSync, writeFileSync, existsSync } from "node:fs";

const files = ["src/app/page.tsx", "src/app/layout.tsx", "src/app/courses/page.tsx"];
const from = "케어링크";
const to = "마사지매니아";

function addCourseNav(content) {
  if (content.includes('href="/courses"')) return content;
  return content.replace('<a href="#area">지역 선택</a>', '<a href="/courses">마사지코스</a><a href="#area">지역 선택</a>');
}

function improveMainTrustSection(content) {
  content = content.replace(/<section className="section eeat-section">[\s\S]*?<\/section>\n\n      <section className="section"><div className="notice">/, `<section className="section eeat-section"><div className="section-heading"><h2>운영 정보 공개</h2><p>마사지매니아는 이용자가 예약 전에 확인해야 할 지역 범위, 요금 기준, 상담 연결, 운영 원칙을 한 화면에서 확인할 수 있도록 정리했습니다.</p></div><div className="eeat-grid"><article><strong>지역 기준</strong><h3>행정동 단위 안내</h3><p>수원, 용인, 성남을 시·구·동 기준으로 나누어 현재 위치와 가까운 지역 정보를 빠르게 확인할 수 있게 구성했습니다.</p></article><article><strong>요금 기준</strong><h3>코스와 금액 확인</h3><p>예약 전 코스 시간, 기본 금액, 추가 이동비, 후불 조건을 전화 상담에서 먼저 확인하도록 안내합니다.</p></article><article><strong>페이지 기준</strong><h3>지역별 상세 페이지</h3><p>선택한 시·구·동에 맞는 상세 페이지로 이동해 지역별 가능 업체와 상담 정보를 확인할 수 있습니다.</p></article><article><strong>상담 원칙</strong><h3>전화 상담 기준</h3><p>모든 배너와 업체 카드에서 {phoneNumber} 바로 전화를 제공하며, 부적절한 요청은 상담 범위에서 제외합니다.</p></article></div></section>

      <section className="section"><div className="notice">`);

  return content
    .split('E-E-A-T 운영 기준').join('운영 정보 공개')
    .split('경험, 전문성, 권위성, 신뢰성을 강화하기 위해 지역 구조, 가격 기준, 전화 연결, 운영 정책을 명확하게 공개합니다.').join('이용자가 예약 전에 확인해야 할 지역 범위, 요금 기준, 상담 연결, 운영 원칙을 한 화면에서 확인할 수 있도록 정리했습니다.')
    .split('Experience').join('지역 기준')
    .split('Expertise').join('요금 기준')
    .split('Authoritativeness').join('페이지 기준')
    .split('Trust').join('상담 원칙')
    .split('지역별 실제 흐름').join('행정동 단위 안내')
    .split('수원, 용인, 성남을 시·구·동 기준으로 나누어 고객이 실제 검색하는 지역 단위와 맞춥니다.').join('수원, 용인, 성남을 시·구·동 기준으로 나누어 현재 위치와 가까운 지역 정보를 빠르게 확인할 수 있게 구성했습니다.')
    .split('가격과 코스 공개').join('코스와 금액 확인')
    .split('60분 9만원, 90분 12~15만원, 120분 VIP·스페셜 18만원 기준으로 비교가 쉽도록 구성했습니다.').join('예약 전 코스 시간, 기본 금액, 추가 이동비, 후불 조건을 전화 상담에서 먼저 확인하도록 안내합니다.')
    .split('고유 지역 페이지').join('지역별 상세 페이지')
    .split('정자동, 인계동, 기흥, 판교 등 주요 지역은 고유 타이틀과 설명을 가진 상세 페이지로 연결됩니다.').join('선택한 시·구·동에 맞는 상세 페이지로 이동해 지역별 가능 업체와 상담 정보를 확인할 수 있습니다.')
    .split('전화와 정책 공개').join('전화 상담 기준')
    .split('모든 배너와 업체 카드에서 {phoneNumber} 바로 전화를 제공하고 합법 운영 정책을 반복 안내합니다.').join('모든 배너와 업체 카드에서 {phoneNumber} 바로 전화를 제공하며, 부적절한 요청은 상담 범위에서 제외합니다.');
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
  if (file === "src/app/page.tsx") after = improveMainTrustSection(addCourseNav(after));
  if (file === "src/app/courses/page.tsx") after = improveCourseTrustSection(after);
  if (after !== before) writeFileSync(file, after, "utf8");
}
