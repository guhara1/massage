import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "케어링크 | 경기 남부 출장마사지 중개",
  description: "수원시, 용인시, 성남시의 시-구-동 3단계 지역 기반 출장마사지 예약 중개 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
