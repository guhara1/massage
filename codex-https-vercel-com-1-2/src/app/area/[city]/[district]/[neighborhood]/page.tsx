import type { Metadata } from "next";
import { notFound } from "next/navigation";

type RegionData = Record<string, Record<string, string[]>>;

const phoneNumber = "0508-202-4683";

const regions: RegionData = {
  수원시: {
    장안구: ["파장동", "율천동", "정자1동", "정자2동", "정자3동", "영화동", "송죽동", "조원1동", "조원2동", "연무동"],
    권선구: ["세류1동", "세류2동", "세류3동", "평동", "서둔동", "구운동", "금곡동", "호매실동", "권선1동", "권선2동", "곡선동", "입북동"],
    팔달구: ["행궁동", "매교동", "매산동", "고등동", "화서1동", "화서2동", "지동", "우만1동", "우만2동", "인계동"],
    영통구: ["매탄1동", "매탄2동", "매탄3동", "매탄4동", "원천동", "광교1동", "광교2동", "영통1동", "영통2동", "영통3동", "망포1동", "망포2동"],
  },
  용인시: {
    처인구: ["포곡읍", "모현읍", "이동읍", "남사읍", "원삼면", "백암면", "양지면", "중앙동", "역북동", "삼가동", "유림동", "동부동"],
    기흥구: ["신갈동", "영덕1동", "영덕2동", "구갈동", "상갈동", "보라동", "기흥동", "서농동", "구성동", "마북동", "동백1동", "동백2동", "동백3동", "상하동", "보정동"],
    수지구: ["풍덕천1동", "풍덕천2동", "신봉동", "죽전1동", "죽전2동", "죽전3동", "동천동", "상현1동", "상현2동", "상현3동", "성복동"],
  },
  성남시: {
    수정구: ["신흥1동", "신흥2동", "신흥3동", "태평1동", "태평2동", "태평3동", "태평4동", "수진1동", "수진2동", "단대동", "산성동", "양지동", "복정동", "위례동"],
    중원구: ["성남동", "중앙동", "금광1동", "금광2동", "은행1동", "은행2동", "상대원1동", "상대원2동", "상대원3동", "하대원동", "도촌동"],
    분당구: ["분당동", "수내1동", "수내2동", "수내3동", "정자동", "정자1동", "정자2동", "정자3동", "서현1동", "서현2동", "이매1동", "이매2동", "야탑1동", "야탑2동", "야탑3동", "금곡동", "구미동", "구미1동", "판교동", "삼평동", "백현동", "운중동"],
  },
};

type Area = { city: string; district: string; neighborhood: string };
type PageProps = { params: Promise<Area> };

const courseRows = [
  ["60분 기본 코스", "90,000원", "짧은 휴식과 컨디션 회복을 원하는 고객에게 적합"],
  ["90분 집중 코스", "120,000원~150,000원", "목, 어깨, 허리 등 피로 부위 중심 상담 가능"],
  ["120분 VIP 코스", "120,000원", "여유 있는 방문 케어와 상세 상담이 필요한 경우"],
  ["스페셜 코스", "180,000원", "업체별 제공 범위와 가능 시간을 전화로 확인"],
];

export function generateStaticParams() {
  return Object.entries(regions).flatMap(([city, districts]) =>
    Object.entries(districts).flatMap(([district, neighborhoods]) =>
      neighborhoods.map((neighborhood) => ({ city, district, neighborhood })),
    ),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const area = await getArea(params);
  if (!area) return { title: "지역을 찾을 수 없습니다" };

  return {
    title: getTitle(area),
    description: getDescription(area),
    keywords: [
      `${area.neighborhood} 출장마사지`,
      `${area.district} 출장마사지`,
      `${area.city} 출장마사지`,
      `${area.neighborhood} 방문마사지`,
      `${area.neighborhood} 마사지 업체`,
    ],
    openGraph: {
      title: getTitle(area),
      description: getDescription(area),
      type: "website",
      locale: "ko_KR",
    },
  };
}

export default async function AreaPage({ params }: PageProps) {
  const area = await getArea(params);
  if (!area) notFound();

  const title = getTitle(area);
  const description = getDescription(area);
  const shops = createAreaShops(area);
  const faqs = createFaqs(area);
  const nearbyLinks = createNearbyLinks(area);
  const jsonLd = createStructuredData(area, faqs);

  return (
    <main className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="/"><span className="brand-mark">K</span>케어링크</a>
          <a className="nav-cta" href={`tel:${phoneNumber.replaceAll("-", "")}`}>{phoneNumber} 바로 전화</a>
        </div>
      </header>

      <section className="section area-hero">
        <p className="eyebrow">{area.city} · {area.district} · {area.neighborhood}</p>
        <h1>{title}</h1>
        <p className="hero-copy">{description}</p>
        <div className="area-hero-actions">
          <a className="primary-button" href={`tel:${phoneNumber.replaceAll("-", "")}`}>{phoneNumber} 전화 연결</a>
          <a className="secondary-button" href="#shops">{area.neighborhood} 업체 보기</a>
        </div>
      </section>

      <section className="section area-overview">
        <article className="overview-card"><span>지역</span><strong>{area.neighborhood}</strong><p>{area.city} {area.district} 기준 방문 가능 여부 확인</p></article>
        <article className="overview-card"><span>전화</span><strong>{phoneNumber}</strong><p>상담요청 폼 없이 고객이 직접 전화 연결</p></article>
        <article className="overview-card"><span>가격</span><strong>90,000원~180,000원</strong><p>60분, 90분, 120분 VIP, 스페셜 코스 기준</p></article>
      </section>

      <section className="section area-content-grid">
        <article className="area-info-card lead-card"><h2>{area.neighborhood} 출장마사지란?</h2><p>{area.neighborhood} 출장마사지는 고객이 있는 숙소, 자택, 업무 공간 등 방문 가능 장소를 기준으로 제휴 업체와 전화 연결을 돕는 지역형 방문 케어 서비스입니다. 케어링크는 {area.city} {area.district} 행정동 단위로 정보를 나누어 검색자가 실제로 찾는 지역과 가까운 업체 정보를 먼저 확인할 수 있도록 구성합니다.</p></article>
        <article className="area-info-card"><h2>{area.neighborhood} 지역정보</h2><p>{area.neighborhood}은 {area.district} 생활권 안에서 이동 동선, 주거지, 상업시설, 숙박시설 위치에 따라 방문 가능 시간이 달라질 수 있습니다. 예약 전 정확한 주소, 주차 가능 여부, 입실 가능 시간, 관리 희망 코스를 전화로 확인하는 것이 좋습니다.</p></article>
      </section>

      <section className="section" id="shops">
        <div className="section-heading"><h2>{area.neighborhood} 관련 업체소개</h2><p>후기, 응답 속도, 예약 이행률, 운영 정책 확인 여부를 기준으로 지역별 노출 순서를 구성합니다.</p></div>
        <div className="shop-list">
          {shops.map((shop) => <article className="shop-card" key={shop.name}><div className="shop-main"><div><span className="status-pill">서비스 가능</span><h3>{shop.name}</h3><p>{area.city} {area.district} {area.neighborhood}</p></div><div className="rating">{shop.rating}</div></div><div className="shop-meta"><span>{shop.available}</span><span>{shop.course}</span><strong>{shop.price}</strong></div><div className="tag-row">{shop.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><a className="primary-button" href={`tel:${phoneNumber.replaceAll("-", "")}`}>{phoneNumber} 바로 전화</a></article>)}
        </div>
      </section>

      <section className="section area-content-grid">
        <article className="area-info-card"><h2>관리사 정보 확인 기준</h2><p>관리사 성별 선택 가능 여부, 경력 안내, 후기 확인 여부, 방문 가능 시간, 제공 코스 범위는 업체마다 다릅니다. 케어링크는 과장된 표현보다 예약 전 확인해야 할 기준을 먼저 안내하며, 실제 배정 정보는 전화 연결 후 업체를 통해 확인하는 방식으로 운영합니다.</p></article>
        <article className="area-info-card"><h2>기타 확인사항</h2><p>{area.neighborhood} 방문 전에는 정확한 주소, 희망 시간, 주차 가능 여부, 엘리베이터 이용 가능 여부, 결제 방식, 추가 비용 발생 여부를 미리 확인해 주세요. 특히 심야 시간대는 이동 거리와 업체 상황에 따라 가능 시간이 달라질 수 있습니다.</p></article>
      </section>

      <section className="section"><div className="section-heading"><h2>{area.neighborhood} 출장마사지 가격 안내</h2><p>아래 금액은 사이트 기준 안내이며, 실제 예약 가능 여부와 상세 코스는 전화로 확인해야 합니다.</p></div><div className="price-table" aria-label={`${area.neighborhood} 출장마사지 가격표`}>{courseRows.map(([course, price, note]) => <div className="price-row" key={course}><strong>{course}</strong><span>{price}</span><p>{note}</p></div>)}</div></section>

      <section className="section eeat-section"><div className="section-heading"><h2>E-E-A-T 기준으로 보는 {area.neighborhood} 페이지</h2><p>지역 검색자가 신뢰할 수 있도록 경험, 전문성, 권위성, 신뢰성 기준을 분리해 보여줍니다.</p></div><div className="eeat-grid"><article><strong>Experience</strong><h3>지역 선택 흐름 반영</h3><p>{area.city}에서 {area.district}, {area.neighborhood}까지 실제 검색 흐름에 맞춰 정보를 정리합니다.</p></article><article><strong>Expertise</strong><h3>코스와 비용 기준 안내</h3><p>60분, 90분, 120분 VIP, 스페셜 코스의 가격 범위를 명확히 보여줍니다.</p></article><article><strong>Authoritativeness</strong><h3>행정동 기반 페이지</h3><p>모든 지역 페이지를 시, 행정구, 행정동 기준으로 구성해 지역성을 강화합니다.</p></article><article><strong>Trust</strong><h3>운영 정책 명시</h3><p>합법적인 웰니스 방문 케어 중개만 안내하며 부적절한 서비스는 등록하지 않습니다.</p></article></div></section>

      <section className="section caution-section"><h2>주의사항</h2><div className="check-list"><p><strong>합법 서비스 확인:</strong> 케어링크는 불법 성매매, 유사 성행위, 미성년자 대상 서비스를 허용하지 않습니다.</p><p><strong>가격 확인:</strong> 표시된 가격 외 추가 이동비, 심야 비용, 코스 변경 비용이 있는지 전화로 확인하세요.</p><p><strong>장소 확인:</strong> 숙소나 자택 방문 시 주소, 주차, 입실 가능 시간, 출입 안내를 정확히 전달해야 합니다.</p><p><strong>개인정보 보호:</strong> 예약에 필요한 최소 정보만 제공하고 불필요한 개인정보 전달은 피하는 것이 좋습니다.</p></div></section>

      <section className="section faq-section"><div className="section-heading"><h2>{area.neighborhood} 출장마사지 자주 묻는 질문</h2><p>검색자가 예약 전 가장 많이 확인하는 질문 5개를 정리했습니다.</p></div>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>

      <section className="section"><div className="section-heading"><h2>가까운 주요 지역 링크</h2><p>{area.district} 안의 다른 행정동 페이지도 함께 확인할 수 있습니다.</p></div><nav className="nearby-links" aria-label="가까운 지역 링크">{nearbyLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}</nav></section>
    </main>
  );
}

async function getArea(params: PageProps["params"]) {
  const { city, district, neighborhood } = await params;
  const decoded = { city: decodeURIComponent(city), district: decodeURIComponent(district), neighborhood: decodeURIComponent(neighborhood) };
  if (!regions[decoded.city]?.[decoded.district]?.includes(decoded.neighborhood)) return null;
  return decoded;
}
function getTitle(area: Area) { return `${area.city} ${area.district} ${area.neighborhood} 출장마사지 | ${area.neighborhood} 방문마사지 업체 안내`; }
function getDescription(area: Area) { return `${area.city} ${area.district} ${area.neighborhood} 출장마사지 제휴업체, 관리사 정보 확인 기준, 가격, 주의사항, 자주 묻는 질문과 지역정보를 한 번에 확인하세요.`; }
function createAreaShops(area: Area) { return [{ name: `${area.neighborhood} 프리미엄 출장마사지`, course: "60분 기본 코스", price: "90,000원", available: "오늘 전화 예약 가능", rating: "4.8", tags: ["지역 제휴", "전화 예약", "방문 가능"] }, { name: `${area.district} 홈케어 마사지`, course: "90분 집중 코스", price: "120,000원~150,000원", available: "심야 가능 여부 확인", rating: "4.7", tags: ["후기 확인", "코스 안내", "응답 빠름"] }, { name: `${area.neighborhood} VIP 방문 케어`, course: "120분 VIP / 스페셜", price: "120,000원~180,000원", available: "예약 시간 협의", rating: "4.9", tags: ["VIP 코스", "스페셜 코스", "상세 상담"] }]; }
function createFaqs(area: Area) { return [{ question: `${area.neighborhood} 출장마사지는 바로 예약할 수 있나요?`, answer: `${area.neighborhood} 지역의 업체 상황에 따라 다르며, 0508-202-4683으로 전화하면 가능 시간과 코스를 바로 확인할 수 있습니다.` }, { question: `${area.neighborhood} 출장마사지 가격은 얼마인가요?`, answer: "기준 가격은 60분 9만원, 90분 12만~15만원, 120분 VIP 12만원, 스페셜 코스 18만원입니다. 업체별 추가 비용은 전화로 확인해야 합니다." }, { question: "관리사 정보는 어떻게 확인하나요?", answer: "관리사 경력, 성별 선택 가능 여부, 후기, 방문 가능 시간은 업체마다 다르므로 전화 연결 후 직접 확인하는 방식으로 안내합니다." }, { question: "호텔이나 숙소 방문도 가능한가요?", answer: "방문 가능 여부는 숙소 위치, 입실 시간, 주차 및 출입 안내에 따라 달라질 수 있습니다. 예약 전 정확한 장소 정보를 전달해야 합니다." }, { question: "케어링크는 어떤 서비스를 허용하나요?", answer: "케어링크는 합법적인 웰니스 방문 케어 중개를 기준으로 하며, 불법 성매매, 유사 성행위, 미성년자 대상 서비스는 등록과 노출이 불가합니다." }]; }
function createNearbyLinks(area: Area) { return regions[area.city][area.district].filter((name) => name !== area.neighborhood).slice(0, 8).map((name) => ({ label: `${name} 출장마사지`, href: `/area/${area.city}/${area.district}/${name}` })); }
function createStructuredData(area: Area, faqs: ReturnType<typeof createFaqs>) { return { "@context": "https://schema.org", "@graph": [{ "@type": "LocalBusiness", name: getTitle(area), description: getDescription(area), areaServed: `${area.city} ${area.district} ${area.neighborhood}`, telephone: phoneNumber, priceRange: "90,000원~180,000원" }, { "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }] }; }
