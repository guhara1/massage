import type { Metadata } from "next";
import "./globals.css";
import "./course-visibility.css";
import "./mobile-call.css";

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
        <a className="mobile-call-bar" href="tel:05082024683" aria-label="0508-202-4683 전화예약">
          <span>전화예약</span>
          <strong>0508-202-4683</strong>
        </a>
      </body>
    </html>
  );
}
