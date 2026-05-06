import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://massage-tawny-five.vercel.app";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "케어링크",
      url: siteUrl,
      logo: `${siteUrl}/favicon.svg`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "0508-202-4683",
        contactType: "customer support",
        areaServed: "KR",
        availableLanguage: "ko",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "케어링크",
      inLanguage: "ko-KR",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

const vipBannerScript = `
(function () {
  if (window.location.pathname !== "/") return;
  if (document.querySelector(".vip-top-banner")) return;
  var topbar = document.querySelector(".topbar");
  if (!topbar) return;
  var banner = document.createElement("a");
  banner.className = "vip-top-banner";
  banner.href = "tel:05082024683";
  banner.setAttribute("aria-label", "VIP 출장마사지 0508-202-4683 바로 전화");
  banner.style.cssText = "display:block;width:min(1180px,calc(100% - 32px));margin:8px auto 0;border-radius:8px;overflow:hidden;background:#050608;box-shadow:0 18px 45px rgba(31,41,51,.16);line-height:0";
  banner.innerHTML = '<img src="/vip-banner.svg" alt="분당 성남 용인 VIP 출장마사지 0508-202-4683" style="display:block;width:100%;height:auto;max-height:170px;object-fit:cover;object-position:center" />';
  topbar.insertAdjacentElement("afterend", banner);
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "케어링크",
  title: "케어링크 | 수원 용인 성남 출장마사지 제휴업체 지역 안내",
  description: "수원시, 용인시, 성남시 출장마사지 제휴업체를 행정구와 행정동 기준으로 확인하고 0508-202-4683으로 바로 전화 연결할 수 있는 지역 기반 방문마사지 안내 플랫폼입니다.",
  keywords: ["출장마사지", "수원 출장마사지", "용인 출장마사지", "성남 출장마사지", "방문마사지", "홈케어 마사지", "제휴업체"],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  verification: {
    google: "X93GGlzAy5MWuA-HXEijTHTQCYAIa3_j7FVZKL1k9pg",
    other: {
      "naver-site-verification": "d86bf53460b81e60e0ea3fdd9b6b3f28231d1d9f",
    },
  },
  openGraph: {
    title: "케어링크 | 수원 용인 성남 출장마사지 제휴업체",
    description: "시, 행정구, 행정동별 출장마사지 제휴업체와 전화 연결 정보를 확인하세요.",
    url: siteUrl,
    siteName: "케어링크",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
        <script dangerouslySetInnerHTML={{ __html: vipBannerScript }} />
      </body>
    </html>
  );
}
