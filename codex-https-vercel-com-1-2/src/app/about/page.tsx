import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "케어링크 소개 | 지역 기반 출장마사지 제휴업체 안내",
  description: "케어링크의 운영 목적, 지역 정보 구성 방식, 합법 웰니스 방문 케어 안내 기준을 설명합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="page">
      <section className="section area-hero">
        <p className="eyebrow">About Carelink</p>
        <h1>케어링크 소개</h1>
        <p className="hero-copy">케어링크는 수원, 용인, 성남 지역의 출장마사지 제휴업체 정보를 행정구와 행정동 기준으로 정리해 사용자가 가까운 지역 정보를 빠르게 확인하도록 돕는 지역 안내 플랫폼입니다.</p>
      </section>
      <section className="section area-content-grid">
        <article className="area-info-card"><h2>운영 목적</h2><p>지역명, 코스, 가격 기준, 방문 가능 시간, 전화 연결 정보를 한 화면에서 비교할 수 있도록 구성합니다. 과장된 표현보다 예약 전 확인해야 할 항목을 명확히 안내하는 것을 우선합니다.</p></article>
        <article className="area-info-card"><h2>정보 구성 기준</h2><p>시, 행정구, 행정동 단위로 페이지를 나누고 주요 지역별 검색 의도에 맞춰 가격표, 주의사항, FAQ, 가까운 지역 링크를 제공합니다.</p></article>
        <article className="area-info-card"><h2>운영 원칙</h2><p>합법적인 웰니스 방문 케어 안내만을 기준으로 하며 불법 성매매, 유사 성행위, 미성년자 대상 서비스는 등록과 노출을 허용하지 않습니다.</p></article>
      </section>
    </main>
  );
}
