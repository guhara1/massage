"use client";

import { BadgeCheck, Building2, Clock, MapPin, PhoneCall, Plus, Search, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";

type RegionData = Record<string, Record<string, string[]>>;
type Shop = { id: number; name: string; city: string; district: string; neighborhood: string; course: string; price: string; available: string; rating: string; tags: string[] };

const phoneNumber = "0508-202-4683";
const telLink = `tel:${phoneNumber.replaceAll("-", "")}`;

const regions: RegionData = {
  수원시: { 장안구: ["파장동", "율천동", "정자1동", "정자2동", "정자3동", "영화동", "송죽동", "조원1동", "조원2동", "연무동"], 권선구: ["세류1동", "세류2동", "세류3동", "평동", "서둔동", "구운동", "금곡동", "호매실동", "권선1동", "권선2동", "곡선동", "입북동"], 팔달구: ["행궁동", "매교동", "매산동", "고등동", "화서1동", "화서2동", "지동", "우만1동", "우만2동", "인계동"], 영통구: ["매탄1동", "매탄2동", "매탄3동", "매탄4동", "원천동", "광교1동", "광교2동", "영통1동", "영통2동", "영통3동", "망포1동", "망포2동"] },
  용인시: { 처인구: ["포곡읍", "모현읍", "이동읍", "남사읍", "원삼면", "백암면", "양지면", "중앙동", "역북동", "삼가동", "유림동", "동부동"], 기흥구: ["신갈동", "영덕1동", "영덕2동", "구갈동", "상갈동", "보라동", "기흥동", "서농동", "구성동", "마북동", "동백1동", "동백2동", "동백3동", "상하동", "보정동"], 수지구: ["풍덕천1동", "풍덕천2동", "신봉동", "죽전1동", "죽전2동", "죽전3동", "동천동", "상현1동", "상현2동", "상현3동", "성복동"] },
  성남시: { 수정구: ["신흥1동", "신흥2동", "신흥3동", "태평1동", "태평2동", "태평3동", "태평4동", "수진1동", "수진2동", "단대동", "산성동", "양지동", "복정동", "위례동"], 중원구: ["성남동", "중앙동", "금광1동", "금광2동", "은행1동", "은행2동", "상대원1동", "상대원2동", "상대원3동", "하대원동", "도촌동"], 분당구: ["분당동", "수내1동", "수내2동", "수내3동", "정자동", "정자1동", "정자2동", "정자3동", "서현1동", "서현2동", "이매1동", "이매2동", "야탑1동", "야탑2동", "야탑3동", "금곡동", "구미동", "구미1동", "판교동", "삼평동", "백현동", "운중동"] },
};

const starterShops: Shop[] = [
  { id: 1, name: "광교 힐링케어", city: "수원시", district: "영통구", neighborhood: "광교1동", course: "60분 기본 코스", price: "90,000원", available: "오늘 21:00", rating: "4.9", tags: ["여성 관리사 선택", "카드 가능", "심야 예약"] },
  { id: 2, name: "인계 비타민 케어", city: "수원시", district: "팔달구", neighborhood: "인계동", course: "90분 집중 코스", price: "120,000원~150,000원", available: "오늘 22:30", rating: "4.8", tags: ["후기 인증", "호텔 방문", "주차 안내"] },
  { id: 3, name: "동백 홈테라피", city: "용인시", district: "기흥구", neighborhood: "동백1동", course: "120분 VIP 코스", price: "180,000원", available: "오늘 전화 예약", rating: "4.7", tags: ["커플 코스", "예약금 보호", "전화 응답 빠름"] },
  { id: 4, name: "분당 프리미엄 케어", city: "성남시", district: "분당구", neighborhood: "정자동", course: "스페셜 코스", price: "180,000원", available: "오늘 23:00", rating: "4.9", tags: ["프리미엄", "후기 인증", "영수증 가능"] },
];

const partnerBanners = [
  { title: "수원 1타 출장마사지", area: "수원시 전체", image: "/partner-suwon.svg" },
  { title: "인계동 비타민 출장마사지", area: "수원시 팔달구 인계동", image: "/partner-ingye.svg" },
  { title: "용인 미인 출장마사지", area: "용인시 처인구·기흥구·수지구", image: "/partner-yongin.svg" },
  { title: "성남 미인 출장마사지", area: "성남시 분당구·수정구·중원구", image: "/partner-seongnam.svg" },
];

const footerLinks = [["수원 출장마사지", "/area/수원시/영통구/광교1동"], ["수원 인계동 출장마사지", "/area/수원시/팔달구/인계동"], ["분당 출장마사지", "/area/성남시/분당구/정자동"], ["성남 판교 출장마사지", "/area/성남시/분당구/판교동"], ["용인 기흥 출장마사지", "/area/용인시/기흥구/신갈동"], ["용인 수지 출장마사지", "/area/용인시/수지구/죽전1동"]];

export default function Home() {
  const [city, setCity] = useState("수원시");
  const [district, setDistrict] = useState("영통구");
  const [neighborhood, setNeighborhood] = useState("광교1동");
  const [shops, setShops] = useState<Shop[]>(starterShops);
  const [shopName, setShopName] = useState("");
  const [shopCourse, setShopCourse] = useState("60분 기본 코스");
  const [shopPrice, setShopPrice] = useState("90,000원");
  const districts = Object.keys(regions[city]);
  const neighborhoods = regions[city][district] ?? [];
  const visibleShops = shops.filter((shop) => shop.city === city && shop.district === district && shop.neighborhood === neighborhood);
  const affiliateShops = visibleShops.length ? visibleShops : createLocalAffiliates(city, district, neighborhood);
  const seoTitle = `${city} ${district} ${neighborhood} 출장마사지 제휴업체`;
  const seoDescription = `${city} ${district} ${neighborhood} 출장마사지 가능 업체, 가격, 코스, 방문 가능 시간, 전화 연결 정보를 한 화면에서 확인하세요.`;
  const areaPagePath = `/area/${city}/${district}/${neighborhood}`;

  useEffect(() => {
    document.title = `${seoTitle} | 케어링크`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", seoDescription);
  }, [seoTitle, seoDescription]);

  function selectCity(nextCity: string) { const firstDistrict = Object.keys(regions[nextCity])[0]; setCity(nextCity); setDistrict(firstDistrict); setNeighborhood(regions[nextCity][firstDistrict][0]); }
  function selectDistrict(nextDistrict: string) { setDistrict(nextDistrict); setNeighborhood(regions[city][nextDistrict][0]); }
  function addShop() { if (!shopName.trim()) return; setShops((current) => [{ id: Date.now(), name: shopName.trim(), city, district, neighborhood, course: shopCourse, price: shopPrice, available: "오늘 전화 예약 가능", rating: "신규", tags: ["신규 등록", "관리자 확인 필요", "지역 노출"] }, ...current]); setShopName(""); }

  return (
    <main className="page">
      <header className="topbar"><div className="topbar-inner"><a className="brand" href="#top"><span className="brand-mark"><Sparkles size={18} /></span>케어링크</a><nav className="nav"><a href="#area">지역 선택</a><a href="#partners">제휴업체</a><a href="#shops">업체 목록</a><a href="#admin">업체 등록</a><a className="nav-cta" href={telLink}><PhoneCall size={16} />바로 전화</a></nav></div></header>

      <section className="hero platform-hero" id="top"><div><p className="eyebrow">수원 · 용인 · 성남 출장마사지 지역 중개</p><h1>시·구·동을 선택하면 가까운 제휴업체를 바로 확인합니다</h1><p className="hero-copy">케어링크는 수원시, 용인시, 성남시 출장마사지 제휴업체를 행정구와 행정동 기준으로 정리하고 0508 대표번호로 바로 전화 연결을 제공합니다.</p><div className="hero-actions"><a className="primary-button" href="#area"><MapPin size={18} />지역 선택하기</a><a className="secondary-button" href="#partners"><BadgeCheck size={18} />제휴업체 보기</a><a className="secondary-button" href={telLink}><PhoneCall size={18} />{phoneNumber}</a></div></div><div className="quick-panel"><span className="panel-label">빠른 도시 선택</span><div className="city-buttons">{Object.keys(regions).map((item) => <button className={item === city ? "city-button active" : "city-button"} key={item} onClick={() => selectCity(item)} type="button"><Building2 size={19} />{item}</button>)}</div><div className="quick-result"><strong>{city}</strong><span>{district} · {neighborhood}</span><small>{affiliateShops.length}개 제휴 업체 노출 중</small></div></div></section>

      <section className="section" id="area"><div className="section-heading"><h2>3단계 지역 선택</h2><p>도시, 행정구, 행정동 순서로 누르면 해당 지역 출장마사지 업체 페이지와 전화 연결을 확인할 수 있습니다.</p></div><div className="region-board"><div className="region-column"><h3>1단계 · 시</h3>{Object.keys(regions).map((item) => <button className={item === city ? "region-button active" : "region-button"} key={item} onClick={() => selectCity(item)} type="button">{item}</button>)}</div><div className="region-column"><h3>2단계 · 행정구</h3>{districts.map((item) => <button className={item === district ? "region-button active" : "region-button"} key={item} onClick={() => selectDistrict(item)} type="button">{item}</button>)}</div><div className="region-column wide"><h3>3단계 · 행정동</h3><div className="dong-grid">{neighborhoods.map((item) => <button className={item === neighborhood ? "dong-button active" : "dong-button"} key={item} onClick={() => setNeighborhood(item)} type="button">{item}</button>)}</div></div></div><div className="area-action-panel"><div><strong>{seoTitle}</strong><span>{seoDescription}</span></div><a className="primary-button" href={areaPagePath}>{neighborhood} 업체 페이지</a></div></section>

      <section className="section" id="partners"><div className="section-heading"><h2>제휴업체 카테고리</h2><p>배너를 누르면 상담요청 없이 {phoneNumber} 번호로 바로 전화 연결됩니다.</p></div><div className="partner-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 14 }}>{partnerBanners.map((banner) => <a href={telLink} key={banner.title} aria-label={`${banner.title} 바로 전화`} style={{ display: "grid", gap: 10, border: "1px solid var(--line)", borderRadius: 8, background: "#fff", overflow: "hidden", paddingBottom: 14 }}><img src={banner.image} alt={banner.title} style={{ width: "100%", aspectRatio: "900 / 520", objectFit: "contain", background: "#f8fafc", display: "block" }} /><strong style={{ padding: "0 14px", fontSize: 17 }}>{banner.title}</strong><span style={{ padding: "0 14px", color: "#667085", fontSize: 14 }}>{banner.area} · 바로 전화</span></a>)}</div><div className="content-grid" style={{ marginTop: 16 }}><article><h3>선정 경험</h3><p>지역별 실제 이용 흐름을 기준으로 응답 속도, 방문 가능 시간, 지역 적합성을 확인한 업체를 우선 노출합니다.</p></article><article><h3>전문성 기준</h3><p>60분 9만원, 90분 12~15만원, 120분 VIP·스페셜 18만원 기준으로 코스와 가격을 명확히 표시합니다.</p></article><article><h3>신뢰 정책</h3><p>합법적인 웰니스 방문 케어만 중개하며 불법 성매매, 유사 성행위, 미성년자 대상 서비스는 등록하지 않습니다.</p></article></div></section>

      <section className="section" id="shops"><div className="section-heading"><h2>{seoTitle}</h2><p>{seoDescription}</p></div><div className="shop-list">{affiliateShops.map((shop) => <article className="shop-card" key={shop.id}><div className="shop-main"><div><span className="status-pill"><BadgeCheck size={15} />서비스 가능</span><h3>{shop.name}</h3><p>{shop.city} {shop.district} {shop.neighborhood}</p></div><div className="rating"><Star size={17} />{shop.rating}</div></div><div className="shop-meta"><span><Clock size={16} />{shop.available}</span><span>{shop.course}</span><strong>{shop.price}</strong></div><div className="tag-row">{shop.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><a className="primary-button" href={telLink}><PhoneCall size={18} />{phoneNumber} 바로 전화</a></article>)}</div></section>

      <section className="section" id="admin"><div className="section-heading"><h2>출장마사지샵 업데이트</h2><p>현재 선택된 지역에 새 제휴업체를 추가하는 운영자용 화면입니다. 정식 관리자 기능은 이후 저장소와 로그인 기능을 붙이면 완성됩니다.</p></div><div className="admin-panel"><div className="admin-current"><MapPin size={22} /><div><strong>{city} {district} {neighborhood}</strong><span>이 지역에 새 제휴업체가 등록됩니다.</span></div></div><div className="admin-form"><label>샵 이름<input value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="예: 광교 프리미엄 홈케어" /></label><label>대표 코스<input value={shopCourse} onChange={(e) => setShopCourse(e.target.value)} /></label><label>가격<input value={shopPrice} onChange={(e) => setShopPrice(e.target.value)} /></label><button className="primary-button" onClick={addShop} type="button"><Plus size={18} />선택 지역에 추가</button></div></div></section>

      <section className="section eeat-section"><div className="section-heading"><h2>E-E-A-T 운영 기준</h2><p>경험, 전문성, 권위성, 신뢰성을 강화하기 위해 지역 구조, 가격 기준, 전화 연결, 운영 정책을 명확하게 공개합니다.</p></div><div className="eeat-grid"><article><strong>Experience</strong><h3>지역별 실제 흐름</h3><p>수원, 용인, 성남을 시·구·동 기준으로 나누어 고객이 실제 검색하는 지역 단위와 맞춥니다.</p></article><article><strong>Expertise</strong><h3>가격과 코스 공개</h3><p>60분 9만원, 90분 12~15만원, 120분 VIP·스페셜 18만원 기준으로 비교가 쉽도록 구성했습니다.</p></article><article><strong>Authoritativeness</strong><h3>고유 지역 페이지</h3><p>정자동, 인계동, 기흥, 판교 등 주요 지역은 고유 타이틀과 설명을 가진 상세 페이지로 연결됩니다.</p></article><article><strong>Trust</strong><h3>전화와 정책 공개</h3><p>모든 배너와 업체 카드에서 {phoneNumber} 바로 전화를 제공하고 합법 운영 정책을 반복 안내합니다.</p></article></div></section>

      <section className="section"><div className="notice"><h2>운영 정책</h2><p>케어링크는 합법적인 웰니스 방문 케어 중개를 기준으로 합니다. 불법 성매매, 유사 성행위, 미성년자 대상 서비스는 등록과 노출이 불가합니다.</p></div></section>
      <footer className="site-footer"><div className="footer-inner"><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark"><Sparkles size={18} /></span>케어링크</a><p>수원, 용인, 성남 출장마사지 제휴업체를 시·구·동 기준으로 안내하고 전화 연결을 제공합니다.</p><a className="footer-call" href={telLink}><PhoneCall size={17} />{phoneNumber} 바로 전화</a></div><div className="footer-links"><h2>주요 지역 링크</h2><div>{footerLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div></div><div className="footer-policy"><p>합법적인 웰니스 방문 케어 기준으로 운영하며, 불법 성매매·유사 성행위·미성년자 대상 서비스는 등록하지 않습니다.</p><span><ShieldCheck size={16} />지역 선택형 출장마사지 중개 플랫폼</span></div></div></footer>
    </main>
  );
}

function createLocalAffiliates(city: string, district: string, neighborhood: string): Shop[] {
  return [
    { id: `${city}-${district}-${neighborhood}-1`.length, name: `${neighborhood} 프리미엄 출장마사지`, city, district, neighborhood, course: "60분 기본 코스", price: "90,000원", available: "오늘 바로 가능", rating: "4.8", tags: ["지역 제휴", "전화 예약", "방문 가능"] },
    { id: `${city}-${district}-${neighborhood}-2`.length + 1000, name: `${district} 홈케어 마사지`, city, district, neighborhood, course: "90분 집중 코스", price: "120,000원~150,000원", available: "심야 가능", rating: "4.7", tags: ["후기 확인", "코스 안내", "예약 연결"] },
  ];
}
