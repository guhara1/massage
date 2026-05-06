import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 | 케어링크",
  description: "케어링크 서비스 이용 조건, 정보 제공 범위, 사용자 책임, 제한 행위 안내입니다.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="page">
      <section className="section area-hero"><p className="eyebrow">Terms</p><h1>이용약관</h1><p className="hero-copy">케어링크는 지역 기반 업체 정보를 안내하는 플랫폼이며, 실제 예약 조건은 전화 연결 후 업체와 직접 확인해야 합니다.</p></section>
      <section className="section check-list">
        <p><strong>서비스 범위:</strong> 지역별 업체 정보, 가격 기준, 주의사항, 전화 연결 정보를 제공합니다.</p>
        <p><strong>정보 확인:</strong> 가격, 가능 시간, 코스, 추가 비용은 업체 상황에 따라 달라질 수 있어 예약 전 직접 확인해야 합니다.</p>
        <p><strong>제한 행위:</strong> 불법 서비스 요청, 허위 정보 등록, 타인 개인정보 제공, 미성년자 관련 부적절한 요청은 금지됩니다.</p>
        <p><strong>면책:</strong> 이용자는 실제 서비스 이용 전 조건과 정책을 직접 확인해야 하며, 케어링크는 확인된 정보의 정확성을 높이기 위해 지속적으로 수정합니다.</p>
      </section>
    </main>
  );
}
