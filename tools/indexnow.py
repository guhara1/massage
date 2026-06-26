#!/usr/bin/env python3
"""IndexNow submitter — 빙·네이버(및 IndexNow 파트너)에 URL 색인을 즉시 통보.

Python 표준 라이브러리만 사용합니다(설치 불필요).

사용법
------
1) 전체 일괄 통보 (사이트맵의 모든 URL):
       python tools/indexnow.py

2) 글 1~N개만 즉시 통보 (글 올릴 때마다):
       python tools/indexnow.py https://massage1-tawny-five.vercel.app/area/수원시/영통구/광교1동
       python tools/indexnow.py /area/수원시/영통구/광교1동      # 경로만 줘도 됨

환경변수
--------
  SITE_URL        기본 https://massage1-tawny-five.vercel.app
  INDEXNOW_KEY    기본 979b28a2b9f84727a34e73a44db9fa16
  INDEXNOW_DRYRUN 1 이면 실제 전송 없이 전송할 내용만 출력

동작
----
IndexNow 프로토콜상 한 엔드포인트에 보내면 모든 파트너 검색엔진에 공유되지만,
전달 확실성을 위해 IndexNow 공용 + Bing + Naver 엔드포인트에 모두 전송합니다.
"""

import json
import os
import sys
import time
import urllib.error
import urllib.request
from urllib.parse import urlparse
from xml.etree import ElementTree as ET

SITE_URL = os.environ.get("SITE_URL", "https://massage1-tawny-five.vercel.app").rstrip("/")
KEY = os.environ.get("INDEXNOW_KEY", "979b28a2b9f84727a34e73a44db9fa16")
DRYRUN = os.environ.get("INDEXNOW_DRYRUN") == "1"

HOST = urlparse(SITE_URL).netloc
KEY_LOCATION = f"{SITE_URL}/{KEY}.txt"

# IndexNow 참여 엔드포인트. api.indexnow.org 는 모든 파트너로 전파되며,
# Bing/Naver 엔드포인트는 직접 전달을 보장하기 위해 함께 호출합니다.
ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://searchadvisor.naver.com/indexnow",
]

UA = "Mozilla/5.0 (compatible; IndexNowSubmitter/1.0)"
SITEMAP_NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
BATCH_SIZE = 10000  # IndexNow 1회 최대 URL 수


def fetch(url, retries=3):
    last = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read()
        except (urllib.error.URLError, urllib.error.HTTPError) as exc:
            last = exc
            wait = 2 ** attempt
            print(f"  ! {url} 가져오기 실패({exc}), {wait}s 후 재시도", file=sys.stderr)
            time.sleep(wait)
    raise SystemExit(f"사이트맵을 가져오지 못했습니다: {url} ({last})")


def urls_from_sitemap():
    """라이브 sitemap.xml 을 파싱해 모든 URL을 반환(소스 중복 없이 항상 최신)."""
    data = fetch(f"{SITE_URL}/sitemap.xml")
    root = ET.fromstring(data)
    urls = [loc.text.strip() for loc in root.findall(".//sm:url/sm:loc", SITEMAP_NS) if loc.text]
    # 네임스페이스가 없는 사이트맵 대비 fallback
    if not urls:
        urls = [loc.text.strip() for loc in root.iter() if loc.tag.endswith("loc") and loc.text]
    return urls


def normalize(arg):
    """경로만 들어와도 절대 URL로 변환."""
    if arg.startswith("http://") or arg.startswith("https://"):
        return arg
    return f"{SITE_URL}/{arg.lstrip('/')}"


def submit(urls):
    payload_base = {"host": HOST, "key": KEY, "keyLocation": KEY_LOCATION}
    ok = True
    for start in range(0, len(urls), BATCH_SIZE):
        chunk = urls[start:start + BATCH_SIZE]
        body = json.dumps({**payload_base, "urlList": chunk}).encode("utf-8")
        for endpoint in ENDPOINTS:
            if DRYRUN:
                print(f"  [dry-run] POST {endpoint}  ({len(chunk)} urls)")
                continue
            req = urllib.request.Request(
                endpoint,
                data=body,
                headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": UA},
                method="POST",
            )
            try:
                with urllib.request.urlopen(req, timeout=30) as resp:
                    print(f"  ✓ {endpoint} -> HTTP {resp.status} ({len(chunk)} urls)")
            except urllib.error.HTTPError as exc:
                # 200/202 외에도 일부 엔드포인트는 비표준 코드를 반환할 수 있음
                detail = exc.read().decode("utf-8", "ignore")[:200]
                level = "✓" if exc.code in (200, 202) else "✗"
                if exc.code not in (200, 202):
                    ok = False
                print(f"  {level} {endpoint} -> HTTP {exc.code} {detail}")
            except urllib.error.URLError as exc:
                ok = False
                print(f"  ✗ {endpoint} -> 연결 실패: {exc}")
    return ok


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    if args:
        urls = [normalize(a) for a in args]
        print(f"단건/지정 통보: {len(urls)}개 URL")
    else:
        urls = urls_from_sitemap()
        print(f"일괄 통보: 사이트맵에서 {len(urls)}개 URL 수집")

    for u in urls:
        print(f"  · {u}")

    print(f"\nhost={HOST}  key={KEY}  keyLocation={KEY_LOCATION}")
    ok = submit(urls)
    print("\n완료" if ok else "\n일부 엔드포인트 실패(위 로그 확인)")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
