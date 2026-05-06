import type { Metadata } from "next";

const phoneNumber = "0508-202-4683";

export const metadata: Metadata = {
  title: "문의하기 | 케어링크",
  description: "케어링크 고객 문의, 업체 제휴 문의, 정보 수정 및 신고 접수 안내입니다.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="page">
      <section className="section area-hero">
        <p className="eyebrow">Contact</p>
        <h1>문의하기</h1>
        <p className="hero-copy">서비스 이용 문의, 업체 제휴 문의, 정보 수정 요청, 부적절한 업체 신고는 대표번호로 접수할 수 있습니다.</p>
        <div className="area-hero-actions"><a className="primary-button" href={`tel:${phoneNumber.replaceAll("-", "")}`}>{phoneNumber} 전화 연결</a></div>
      </section>
      <section className="section area-content-grid">
        <article className="area-info-card"><h2>고객 문의</h2><p>지역별 업체 확인, 가격 범위, 방문 가능 시간, 예약 전 확인사항에 대한 문의를 받을 수 있습니다.</p></article>
        <article className="area-info-card"><h2>업체 제휴 문의</h2><p>합법 웰니스 방문 케어 기준에 맞는 업체만 등록 검토 대상이며, 운영 정책에 맞지 않는 업체는 노출하지 않습니다.</p></article>
        <article className="area-info-card"><h2>정보 수정 요청</h2><p>가격, 코스, 가능 지역, 연락 정보가 변경된 경우 수정 요청을 접수해 확인 후 반영합니다.</p></article>
      </section>
    </main>
  );
}
