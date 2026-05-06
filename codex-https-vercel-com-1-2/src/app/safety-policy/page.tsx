import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "안전 및 운영정책 | 케어링크",
  description: "케어링크의 합법 운영 기준, 신고 접수, 부적절한 서비스 제외 정책 안내입니다.",
  alternates: { canonical: "/safety-policy" },
};

export default function SafetyPolicyPage() {
  return (
    <main className="page">
      <section className="section area-hero"><p className="eyebrow">Safety Policy</p><h1>안전 및 운영정책</h1><p className="hero-copy">케어링크는 합법적인 웰니스 방문 케어 안내를 기준으로 운영하며, 부적절하거나 불법적인 서비스는 허용하지 않습니다.</p></section>
      <section className="section check-list">
        <p><strong>합법 운영 원칙:</strong> 웰니스 방문 케어와 지역 업체 안내를 기준으로 하며 성매매 또는 유사 성행위 관련 요청은 허용하지 않습니다.</p>
        <p><strong>미성년자 보호:</strong> 미성년자 대상 서비스 또는 미성년자 관련 부적절한 요청은 즉시 제외 대상입니다.</p>
        <p><strong>신고 접수:</strong> 허위 정보, 불법 서비스 유도, 부적절한 표현, 개인정보 오남용이 의심되는 경우 문의 채널로 신고할 수 있습니다.</p>
        <p><strong>정보 수정:</strong> 업체 정보가 사실과 다르거나 가격, 지역, 연락처가 변경된 경우 확인 후 수정합니다.</p>
      </section>
    </main>
  );
}
