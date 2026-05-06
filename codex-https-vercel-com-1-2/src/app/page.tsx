"use client";

import {
  BadgeCheck,
  CalendarClock,
  ChevronRight,
  ClipboardCheck,
  MapPin,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

type RegionData = Record<string, Record<string, string[]>>;

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

const providers = [
  {
    name: "릴랙스 밸런스",
    score: "4.9",
    copy: "피로 회복, 근막 케어, 사무직 맞춤 프로그램을 운영하는 검증 파트너",
    tags: ["여성 관리사 선택", "영수증 가능", "심야 예약"],
  },
  {
    name: "홈케어 스튜디오",
    score: "4.8",
    copy: "방문 전 상담과 컨디션 체크를 기반으로 코스를 제안하는 생활 케어 팀",
    tags: ["커플 코스", "호텔 방문", "예약금 보호"],
  },
  {
    name: "바디온 케어",
    score: "4.7",
    copy: "스포츠 마사지와 아로마 테라피를 지역별 배정 시스템으로 연결",
    tags: ["스포츠 케어", "아로마", "후기 인증"],
  },
];

export default function Home() {
  const [city, setCity] = useState("수원시");
  const districts = useMemo(() => Object.keys(regions[city]), [city]);
  const [district, setDistrict] = useState("영통구");
  const neighborhoods = regions[city][district] ?? regions[city][districts[0]];
  const [neighborhood, setNeighborhood] = useState("광교1동");

  const totalNeighborhoods = useMemo(
    () =>
      Object.values(regions[city]).reduce(
        (total, items) => total + items.length,
        0,
      ),
    [city],
  );

  function handleCity(nextCity: string) {
    const nextDistrict = Object.keys(regions[nextCity])[0];
    setCity(nextCity);
    setDistrict(nextDistrict);
    setNeighborhood(regions[nextCity][nextDistrict][0]);
  }

  function handleDistrict(nextDistrict: string) {
    setDistrict(nextDistrict);
    setNeighborhood(regions[city][nextDistrict][0]);
  }

  return (
    <main className="page">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top" aria-label="케어링크 홈">
            <span className="brand-mark">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            케어링크
          </a>
          <nav className="nav" aria-label="주요 메뉴">
            <a href="#area">지역 선택</a>
            <a href="#providers">파트너</a>
            <a href="#process">예약 흐름</a>
            <a className="nav-cta" href="#area">
              <Search size={16} aria-hidden="true" />
              매칭 시작
            </a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div>
          <p className="eyebrow">수원 · 용인 · 성남 3단계 지역 매칭</p>
          <h1>동네까지 정확하게 연결하는 출장마사지 중개 플랫폼</h1>
          <p className="hero-copy">
            시, 행정구, 행정동을 선택하면 가능한 방문 케어 파트너와 예상 도착
            시간, 예약 가능 코스를 한 화면에서 확인할 수 있습니다.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#area">
              <MapPin size={18} aria-hidden="true" />
              지역 선택하기
            </a>
            <a className="secondary-button" href="#providers">
              검증 파트너 보기
              <ChevronRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="trust-row" aria-label="서비스 핵심 지표">
            <div className="trust-item">
              <strong>3개 도시</strong>
              <span>수원시, 용인시, 성남시 우선 운영</span>
            </div>
            <div className="trust-item">
              <strong>전 구역 동 단위</strong>
              <span>구와 행정동을 필수로 선택하는 매칭 구조</span>
            </div>
            <div className="trust-item">
              <strong>예약 보호</strong>
              <span>파트너 인증, 후기, 상담 이력을 기준으로 연결</span>
            </div>
          </div>
        </div>
        <div className="hero-visual" aria-label="경기 남부 서비스 지역 지도" />
      </section>

      <section className="section" id="area">
        <div className="section-heading">
          <h2>3단계 지역 선택</h2>
          <p>
            용인시와 성남시도 반드시 행정구와 행정동까지 선택하도록 구성했습니다.
          </p>
        </div>

        <div className="selector-shell">
          <form className="selector-panel">
            <div className="field">
              <label htmlFor="city">1단계 · 시</label>
              <select
                id="city"
                value={city}
                onChange={(event) => handleCity(event.target.value)}
              >
                {Object.keys(regions).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="district">2단계 · 행정구</label>
              <select
                id="district"
                value={district}
                onChange={(event) => handleDistrict(event.target.value)}
              >
                {districts.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="neighborhood">3단계 · 행정동</label>
              <select
                id="neighborhood"
                value={neighborhood}
                onChange={(event) => setNeighborhood(event.target.value)}
              >
                {neighborhoods.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="request">요청 메모</label>
              <textarea
                id="request"
                placeholder="희망 시간, 코스, 주차 가능 여부 등을 입력하세요."
              />
            </div>
            <button className="primary-button" type="button">
              <PhoneCall size={18} aria-hidden="true" />
              상담 요청
            </button>
          </form>

          <div className="summary-panel">
            <div className="selected-area">
              <div>
                <h3>
                  {city} {district} {neighborhood}
                </h3>
                <p>현재 선택 지역에 맞는 방문 케어 파트너를 우선 노출합니다.</p>
              </div>
              <span className="status-pill">
                <BadgeCheck size={16} aria-hidden="true" />
                서비스 가능
              </span>
            </div>

            <div className="detail-grid">
              <div className="metric">
                <span>선택 도시 행정동</span>
                <strong>{totalNeighborhoods}개</strong>
              </div>
              <div className="metric">
                <span>예상 도착</span>
                <strong>35분</strong>
              </div>
              <div className="metric">
                <span>오늘 가능</span>
                <strong>12팀</strong>
              </div>
            </div>

            <div className="notice">
              <h2>합법적인 웰니스 방문 케어만 중개합니다.</h2>
              <p>
                케어링크는 치료 행위, 불법 성매매, 유사 성행위, 미성년자 대상
                서비스를 허용하지 않습니다. 모든 파트너는 신원 확인과 서비스
                정책 동의를 거친 뒤 노출됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="providers">
        <div className="section-heading">
          <h2>추천 파트너</h2>
          <p>후기, 응답 속도, 예약 이행률을 기준으로 지역별 노출 순서를 정합니다.</p>
        </div>
        <div className="provider-grid">
          {providers.map((provider) => (
            <article className="provider-card" key={provider.name}>
              <div className="provider-top">
                <span className="provider-avatar">
                  <Users size={22} aria-hidden="true" />
                </span>
                <span className="status-pill">
                  <Star size={15} aria-hidden="true" />
                  {provider.score}
                </span>
              </div>
              <h3>{provider.name}</h3>
              <p>{provider.copy}</p>
              <div className="tag-row">
                {provider.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="process">
        <div className="section-heading">
          <h2>예약 흐름</h2>
          <p>고객과 파트너 모두에게 필요한 확인 절차를 간단하게 정리했습니다.</p>
        </div>
        <div className="steps">
          <div className="step">
            <strong>지역 선택</strong>
            <p>시, 행정구, 행정동을 선택해 매칭 범위를 확정합니다.</p>
          </div>
          <div className="step">
            <strong>파트너 비교</strong>
            <p>후기, 가능 시간, 코스, 방문 조건을 비교합니다.</p>
          </div>
          <div className="step">
            <strong>예약 확인</strong>
            <p>상담 후 예약금, 주소, 주의사항을 안전하게 확인합니다.</p>
          </div>
          <div className="step">
            <strong>이용 완료</strong>
            <p>서비스 후 후기와 신고 기능으로 품질을 관리합니다.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="notice">
          <h2>운영자 관리 기능 확장 예정</h2>
          <p>
            다음 단계에서는 업체 입점 신청, 지역별 수수료, 예약 상태 관리,
            관리자 승인 화면, 문자 알림, 결제 연동까지 붙일 수 있습니다.
          </p>
        </div>
      </section>

      <footer className="footer">
        <ClipboardCheck size={16} aria-hidden="true" /> 케어링크는 안전하고
        투명한 출장 웰니스 중개를 지향합니다. <ShieldCheck size={16} aria-hidden="true" />
        <CalendarClock size={16} aria-hidden="true" />
      </footer>
    </main>
  );
}
