import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "제휴업체 등록 기준 | 케어링크",
  description: "케어링크 제휴업체 등록 검토 기준, 정보 확인 항목, 노출 제외 기준 안내입니다.",
  alternates: { canonical: "/partner-guidelines" },
};

export default function PartnerGuidelinesPage() {
  return (
    <main className="page">
      <section className="section area-hero"><p className="eyebrow">Partner Guidelines</p><h1>제휴업체 등록 기준</h1><p className="hero-copy">케어링크는 지역별 이용자가 비교하기 쉬운 정보를 제공하기 위해 업체 등록 전 기본 운영 기준을 확인합니다.</p></section>
      <section className="section area-content-grid">
        <article className="area-info-card"><h2>필수 확인 항목</h2><p>서비스 가능 지역, 대표 연락처, 코스와 가격 범위, 방문 가능 시간, 추가 비용 발생 여부, 운영 정책을 확인합니다.</p></article>
        <article className="area-info-card"><h2>정보 표시 기준</h2><p>이용자가 예약 전 확인해야 할 내용을 우선 표시하며, 과도한 홍보 문구보다 가격, 가능 시간, 주의사항을 명확히 안내합니다.</p></article>
        <article className="area-info-card"><h2>노출 제외 기준</h2><p>불법 성매매, 유사 성행위, 미성년자 대상 서비스, 허위 가격 표시, 개인정보 오남용이 확인되면 등록과 노출을 제한합니다.</p></article>
      </section>
    </main>
  );
}
