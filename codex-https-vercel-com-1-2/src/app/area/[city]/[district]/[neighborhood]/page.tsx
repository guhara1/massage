import type { Metadata } from "next";
import { notFound } from "next/navigation";

type RegionData = Record<string, Record<string, string[]>>;
const phoneNumber = "0508-202-4683";
const regions: RegionData = {
  수원시: { 장안구: ["파장동", "율천동", "정자1동", "정자2동", "정자3동", "영화동", "송죽동", "조원1동", "조원2동", "연무동"], 권선구: ["세류1동", "세류2동", "세류3동", "평동", "서둔동", "구운동", "금곡동", "호매실동", "권선1동", "권선2동", "곡선동", "입북동"], 팔달구: ["행궁동", "매교동", "매산동", "고등동", "화서1동", "화서2동", "지동", "우만1동", "우만2동", "인계동"], 영통구: ["매탄1동", "매탄2동", "매탄3동", "매탄4동", "원천동", "광교1동", "광교2동", "영통1동", "영통2동", "영통3동", "망포1동", "망포2동"] },
  용인시: { 처인구: ["포곡읍", "모현읍", "이동읍", "남사읍", "원삼면", "백암면", "양지면", "중앙동", "역북동", "삼가동", "유림동", "동부동"], 기흥구: ["신갈동", "영덕1동", "영덕2동", "구갈동", "상갈동", "보라동", "기흥동", "서농동", "구성동", "마북동", "동백1동", "동백2동", "동백3동", "상하동", "보정동"], 수지구: ["풍덕천1동", "풍덕천2동", "신봉동", "죽전1동", "죽전2동", "죽전3동", "동천동", "상현1동", "상현2동", "상현3동", "성복동"] },
  성남시: { 수정구: ["신흥1동", "신흥2동", "신흥3동", "태평1동", "태평2동", "태평3동", "태평4동", "수진1동", "수진2동", "단대동", "산성동", "양지동", "복정동", "위례동"], 중원구: ["성남동", "중앙동", "금광1동", "금광2동", "은행1동", "은행2동", "상대원1동", "상대원2동", "상대원3동", "하대원동", "도촌동"], 분당구: ["분당동", "수내1동", "수내2동", "수내3동", "정자동", "정자1동", "정자2동", "정자3동", "서현1동", "서현2동", "이매1동", "이매2동", "야탑1동", "야탑2동", "야탑3동", "금곡동", "구미동", "구미1동", "판교동", "삼평동", "백현동", "운중동"] },
};
type PageProps = { params: Promise<{ city: string; district: string; neighborhood: string }> };
export function generateStaticParams() { return Object.entries(regions).flatMap(([city, districts]) => Object.entries(districts).flatMap(([district, neighborhoods]) => neighborhoods.map((neighborhood) => ({ city, district, neighborhood })))); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const area = await getArea(params); if (!area) return { title: "지역을 찾을 수 없습니다" }; return { title: getTitle(area.city, area.district, area.neighborhood), description: getDescription(area.city, area.district, area.neighborhood) }; }
export default async function AreaPage({ params }: PageProps) {
  const area = await getArea(params); if (!area) notFound();
  const title = getTitle(area.city, area.district, area.neighborhood); const description = getDescription(area.city, area.district, area.neighborhood);
  const shops = [`${area.neighborhood} 프리미엄 출장마사지`, `${area.district} 홈케어 마사지`, `${area.city} 방문마사지 제휴센터`];
  return <main className="page"><header className="topbar"><div className="topbar-inner"><a className="brand" href="/"><span className="brand-mark">K</span>케어링크</a><a className="nav-cta" href={`tel:${phoneNumber.replaceAll("-", "")}`}>{phoneNumber} 전화하기</a></div></header><section className="section area-seo-page"><p className="eyebrow">{area.city} · {area.district} · {area.neighborhood}</p><h1>{title}</h1><p className="hero-copy">{description}</p><a className="primary-button" href={`tel:${phoneNumber.replaceAll("-", "")}`}>{phoneNumber} 바로 전화</a></section><section className="section"><div className="section-heading"><h2>{area.neighborhood} 제휴 업체</h2><p>지역별 출장마사지 제휴 업체와 방문 가능 정보를 확인하세요.</p></div><div className="shop-list">{shops.map((shop) => <article className="shop-card" key={shop}><div className="shop-main"><div><span className="status-pill">서비스 가능</span><h3>{shop}</h3><p>{area.city} {area.district} {area.neighborhood}</p></div><div className="rating">4.8</div></div><div className="shop-meta"><span>오늘 전화 예약 가능</span><span>60분 · 90분 · VIP · 스페셜</span><strong>90,000원~180,000원</strong></div><a className="primary-button" href={`tel:${phoneNumber.replaceAll("-", "")}`}>{phoneNumber} 전화 연결</a></article>)}</div></section></main>;
}
async function getArea(params: PageProps["params"]) { const { city, district, neighborhood } = await params; const decoded = { city: decodeURIComponent(city), district: decodeURIComponent(district), neighborhood: decodeURIComponent(neighborhood) }; if (!regions[decoded.city]?.[decoded.district]?.includes(decoded.neighborhood)) return null; return decoded; }
function getTitle(city: string, district: string, neighborhood: string) { return `${city} ${district} ${neighborhood} 출장마사지 | ${neighborhood} 방문마사지 제휴업체`; }
function getDescription(city: string, district: string, neighborhood: string) { return `${city} ${district} ${neighborhood} 출장마사지 제휴업체를 확인하세요. ${neighborhood} 방문마사지 가능 시간, 코스, 가격, 전화 연결 정보를 지역별로 비교할 수 있습니다.`; }
