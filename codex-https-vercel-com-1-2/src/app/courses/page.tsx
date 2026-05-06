import type { Metadata } from "next";
import { CheckCircle2, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";

const brand = "마사지매니아";
const phoneNumber = "0508-202-4683";
const telLink = "tel:05082024683";

const courses = [
  {
    title: "스웨디시 마사지",
    description:
      "스웨디시 마사지는 부드러운 오일 케어와 리듬감 있는 관리 흐름을 중심으로 안내되는 코스입니다. 강한 압보다 편안한 이완감, 피부 마찰 부담 감소, 차분한 분위기를 선호하는 이용자가 상담 시 자주 비교합니다. 업체마다 명칭과 실제 관리 범위가 다를 수 있으므로 예약 전 오일 사용 여부, 관리 시간, 관리 부위, 추가 요금 여부를 먼저 확인하는 것이 좋습니다.",
  },
  {
    title: "타이마사지",
    description:
      "타이마사지는 건식 스트레칭과 압 중심으로 설명되는 경우가 많은 기본 관리 코스입니다. 활동량이 많거나 몸이 뻐근한 이용자가 상담 시 자주 문의하지만, 개인의 컨디션에 따라 강한 압이 부담될 수 있습니다. 처음 이용한다면 압 조절 가능 여부와 스트레칭 강도, 복장, 코스 시간을 미리 확인해야 하며 무리한 자극은 피하는 것이 안전합니다.",
  },
  {
    title: "로미로미 마사지",
    description:
      "로미로미 마사지는 길고 부드러운 흐름의 케어로 설명되는 경우가 많습니다. 전신 이완감과 편안한 관리 분위기를 중시하는 이용자가 비교하는 코스이며, 업체마다 오일 사용 방식과 관리 리듬이 달라질 수 있습니다. 예약 전에는 실제 제공 범위, 관리 시간, 오일 종류, 샤워 가능 여부, 후불 조건을 함께 확인하는 것이 좋습니다.",
  },
  {
    title: "아로마 마사지",
    description:
      "아로마 마사지는 오일을 활용한 대표적인 방문 케어 코스입니다. 향, 피부 마찰 부담, 부드러운 압을 중요하게 보는 이용자가 많이 비교합니다. 다만 피부가 민감하거나 향에 예민한 경우 상담 단계에서 미리 알려야 하며, 오일 사용 범위와 추가 비용, 관리 후 정리 방식, 방문 장소의 출입 조건을 사전에 확인하는 것이 안전합니다.",
  },
  {
    title: "스포츠 마사지",
    description:
      "스포츠 마사지는 근육 피로, 운동 후 뻐근함, 특정 부위 집중 관리 문의에서 자주 언급되는 코스입니다. 비교적 압이 강하게 느껴질 수 있어 기존 통증, 부상 이력, 민감 부위를 상담 단계에서 전달하는 것이 중요합니다. 전문 의료 행위가 아니므로 치료 목적의 표현보다 컨디션 관리 범위로 이해해야 하며, 코스 시간과 집중 부위를 명확히 정한 뒤 예약하는 것이 좋습니다.",
  },
  {
    title: "발 마사지",
    description:
      "발 마사지는 발과 종아리 피로감, 장시간 이동 후 부담을 느끼는 이용자가 자주 찾는 코스입니다. 짧은 시간 코스로 문의하는 경우가 많지만 업체마다 발 관리만 제공하는지, 종아리나 하체 관리가 포함되는지 차이가 있습니다. 예약 전에는 관리 범위, 소요 시간, 위생 기준, 오일 또는 크림 사용 여부를 확인하고 상처나 민감 부위가 있다면 미리 알려야 합니다.",
  },
  {
    title: "커플 마사지",
    description:
      "커플 마사지는 두 명이 같은 시간대에 예약 가능 여부를 확인해야 하는 코스입니다. 관리사 2명 동시 배정이 필요한 경우가 많아 일반 코스보다 가능 시간과 비용 확인이 더 중요합니다. 숙소, 호텔, 자택 방문 시 출입 방식과 공간 조건을 먼저 확인해야 하며, 각각 원하는 압과 코스가 다를 수 있으므로 예약 전 두 사람의 관리 스타일을 따로 전달하는 것이 좋습니다.",
  },
];

export const metadata: Metadata = {
  title: "마사지코스 안내 | 스웨디시 타이 아로마 스포츠 마사지 - 마사지매니아",
  description:
    "마사지매니아 마사지코스 안내. 스웨디시 마사지, 타이마사지, 로미로미, 아로마 마사지, 스포츠 마사지, 발 마사지, 커플 마사지의 차이와 예약 전 확인사항을 정리했습니다.",
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    title: "마사지코스 안내 | 마사지매니아",
    description: "출장마사지 예약 전 확인할 스웨디시, 타이, 로미로미, 아로마, 스포츠, 발, 커플 마사지 코스 기준 안내.",
    url: "https://massage-tawny-five.vercel.app/courses",
    siteName: "마사지매니아",
    locale: "ko_KR",
    type: "article",
  },
};

export default function CoursesPage() {
  return (
    <main className="page course-page">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="/">
            <span className="brand-mark"><Sparkles size={18} /></span>{brand}
          </a>
          <nav className="nav">
            <a href="/courses">마사지코스</a>
            <a href="/#area">지역 선택</a>
            <a href="/#partners">제휴업체</a>
            <a href="/#shops">업체 목록</a>
            <a className="nav-cta" href={telLink}><PhoneCall size={16} />바로 전화</a>
          </nav>
        </div>
      </header>

      <section className="section area-seo-page">
        <p className="eyebrow">공식 코스 안내</p>
        <h1>마사지코스 선택 전 확인해야 할 기준</h1>
        <p className="hero-copy">
          {brand}는 코스명을 단순 나열하기보다 예약 전 실제로 확인해야 할 관리 범위, 시간, 비용, 방문 조건, 주의사항을 기준으로 안내합니다. 같은 이름의 마사지라도 업체마다 제공 범위와 운영 기준이 다를 수 있으므로 상담 단계에서 세부 조건을 확인하는 것이 가장 안전합니다.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href={telLink}><PhoneCall size={18} />{phoneNumber} 전화예약</a>
          <a className="secondary-button" href="/">메인으로 이동</a>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>마사지 종류별 안내</h2>
          <p>아래 설명은 예약 전 비교를 돕기 위한 기준입니다. 최종 가능 여부와 금액은 지역, 시간, 업체 배정 상황에 따라 달라질 수 있습니다.</p>
        </div>
        <div className="course-grid">
          {courses.map((course) => (
            <article className="course-card" key={course.title}>
              <span><CheckCircle2 size={16} /> 코스 안내</span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section eeat-section">
        <div className="section-heading">
          <h2>E-E-A-T 기준 안내</h2>
          <p>과장된 효과 표현보다 이용 전 확인해야 할 실제 기준을 우선합니다.</p>
        </div>
        <div className="eeat-grid">
          <article><strong>Experience</strong><h3>상담 경험 기준</h3><p>이용자가 실제로 묻는 코스 시간, 관리 범위, 압 조절, 방문 조건을 중심으로 정리했습니다.</p></article>
          <article><strong>Expertise</strong><h3>코스 차이 설명</h3><p>마사지 이름별 특징을 구분하되, 업체마다 운영 기준이 다를 수 있음을 함께 안내합니다.</p></article>
          <article><strong>Authoritativeness</strong><h3>명확한 예약 기준</h3><p>총 금액, 후불 조건, 추가 이동비, 관리사 배정 가능 시간을 상담 전 확인하도록 안내합니다.</p></article>
          <article><strong>Trust</strong><h3>주의사항 공개</h3><p>불법 또는 부적절한 요청은 상담 범위에서 제외하며 건전한 방문 케어 기준만 안내합니다.</p></article>
        </div>
      </section>

      <section className="section">
        <div className="notice">
          <h2>예약 전 주의사항</h2>
          <p>마사지 코스명만 보고 결정하기보다 실제 관리 범위, 시간, 총 금액, 후불 조건, 방문 주소, 출입 방식, 취소 기준을 전화 상담에서 확인해 주세요. 특정 질환이나 통증 치료를 목적으로 한 의료 행위가 아니며, 컨디션 관리 범위 안에서 안내됩니다.</p>
          <p className="course-call"><a className="primary-button" href={telLink}><ShieldCheck size={18} />상담 후 예약하기</a></p>
        </div>
      </section>
    </main>
  );
}
