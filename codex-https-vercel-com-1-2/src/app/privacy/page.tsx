import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 케어링크",
  description: "케어링크 개인정보 처리 기준, 수집 항목, 이용 목적, 보관 및 파기 원칙 안내입니다.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="page">
      <section className="section area-hero"><p className="eyebrow">Privacy</p><h1>개인정보처리방침</h1><p className="hero-copy">케어링크는 서비스 이용에 필요한 최소한의 정보만 확인하며 불필요한 개인정보 제공을 권장하지 않습니다.</p></section>
      <section className="section check-list">
        <p><strong>수집 항목:</strong> 전화 문의 과정에서 사용자가 직접 제공하는 연락처, 지역, 희망 시간, 상담 내용이 포함될 수 있습니다.</p>
        <p><strong>이용 목적:</strong> 지역 업체 안내, 예약 가능 여부 확인, 정보 수정 및 신고 접수 처리에 사용합니다.</p>
        <p><strong>보관 원칙:</strong> 목적 달성 후 불필요한 정보는 보관하지 않는 것을 원칙으로 합니다.</p>
        <p><strong>주의사항:</strong> 주민등록번호, 계좌 비밀번호, 신분증 등 예약에 불필요한 민감정보는 제공하지 마세요.</p>
      </section>
    </main>
  );
}
