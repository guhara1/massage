#!/usr/bin/env python3
"""Google Indexing API 통보 (선택 사항).

구글은 IndexNow에 참여하지 않으므로, 즉시 통보가 필요하면 Indexing API를 씁니다.

주의(중요)
---------
Google Indexing API는 공식적으로 JobPosting / BroadcastEvent 구조화 데이터 페이지만
대상으로 합니다. 일반 페이지에도 흔히 쓰이지만, 일반 색인의 1차 수단은
"사이트맵 + Search Console URL 검사"입니다. 본 스크립트는 보조 수단입니다.

사전 준비
--------
1. Google Cloud 프로젝트에서 "Indexing API" 활성화
2. 서비스 계정 생성 → JSON 키 발급
3. Search Console 속성에 그 서비스 계정 이메일을 "소유자"로 추가
4. 의존성 설치:
       pip install google-auth requests

사용법
------
    GOOGLE_APPLICATION_CREDENTIALS=service-account.json \
        python tools/google_indexing.py            # 사이트맵 전체
    GOOGLE_APPLICATION_CREDENTIALS=service-account.json \
        python tools/google_indexing.py https://.../area/수원시/영통구/광교1동
"""

import os
import sys
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from xml.etree import ElementTree as ET

SITE_URL = os.environ.get("SITE_URL", "https://massage1-tawny-five.vercel.app").rstrip("/")
SCOPES = ["https://www.googleapis.com/auth/indexing"]
ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
SITEMAP_NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def urls_from_sitemap():
    req = Request(f"{SITE_URL}/sitemap.xml", headers={"User-Agent": "GoogleIndexing/1.0"})
    with urlopen(req, timeout=30) as resp:
        root = ET.fromstring(resp.read())
    return [loc.text.strip() for loc in root.findall(".//sm:url/sm:loc", SITEMAP_NS) if loc.text]


def normalize(arg):
    if arg.startswith("http"):
        return arg
    return f"{SITE_URL}/{arg.lstrip('/')}"


def main():
    try:
        from google.oauth2 import service_account
        from google.auth.transport.requests import AuthorizedSession
    except ImportError:
        sys.exit("의존성이 없습니다.  pip install google-auth requests  후 다시 실행하세요.")

    creds_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    if not creds_path or not os.path.exists(creds_path):
        sys.exit("GOOGLE_APPLICATION_CREDENTIALS 에 서비스 계정 JSON 경로를 지정하세요.")

    credentials = service_account.Credentials.from_service_account_file(creds_path, scopes=SCOPES)
    session = AuthorizedSession(credentials)

    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    urls = [normalize(a) for a in args] if args else urls_from_sitemap()
    print(f"Google Indexing API: {len(urls)}개 URL 통보")

    ok = 0
    for u in urls:
        resp = session.post(ENDPOINT, json={"url": u, "type": "URL_UPDATED"}, timeout=30)
        mark = "✓" if resp.status_code == 200 else "✗"
        if resp.status_code == 200:
            ok += 1
        print(f"  {mark} {resp.status_code} {u}")
    print(f"\n완료: {ok}/{len(urls)} 성공")
    sys.exit(0 if ok == len(urls) else 1)


if __name__ == "__main__":
    main()
