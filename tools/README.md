# 색인 자동 통보 (IndexNow / Google)

빙·네이버·구글에 새 글/변경을 **즉시** 알려 색인 속도를 끌어올리는 도구 모음입니다.

## 구성 요소

| 항목 | 위치 | 역할 |
|------|------|------|
| IndexNow 키 파일 | `codex-https-vercel-com-1-2/public/979b28a2b9f84727a34e73a44db9fa16.txt` | 도메인 소유 증명 (배포 시 사이트 루트로 서빙됨) |
| IndexNow 전송기 | `tools/indexnow.py` | 빙·네이버 등 IndexNow 파트너에 즉시 통보 |
| Google 전송기 | `tools/google_indexing.py` | (선택) 구글 Indexing API 통보 |
| 자동화 | `.github/workflows/indexnow.yml` | main 푸시(=글 등록)마다 자동 통보 |
| 사이트맵/robots | `src/app/sitemap.ts`, `src/app/robots.ts` | 구글·네이버 크롤러용 (Next.js 자동 생성) |

## 1) 첫 일괄 통보 (로컬, 1회)

배포가 끝난 뒤 한 번 실행하면 사이트맵의 **모든 URL**을 빙·네이버에 즉시 통보합니다.
표준 라이브러리만 쓰므로 설치 불필요합니다.

```bash
python tools/indexnow.py
```

전송 전 확인만 하려면: `INDEXNOW_DRYRUN=1 python tools/indexnow.py`

## 2) 글 올릴 때마다 (단건 통보)

```bash
python tools/indexnow.py /area/수원시/영통구/광교1동
# 또는 전체 URL
python tools/indexnow.py https://massage1-tawny-five.vercel.app/area/수원시/영통구/광교1동
```

## 3) 완전 자동 (권장)

`.github/workflows/indexnow.yml` 가 main 브랜치에 푸시될 때마다(=콘텐츠 변경 시)
자동으로 사이트맵 전체를 빙·네이버에 통보합니다. 별도 시크릿 설정이 필요 없습니다.
(GitHub Actions만 켜져 있으면 동작)

수동 실행: Actions 탭 → "IndexNow ping" → Run workflow (특정 URL 입력 가능)

## 4) 구글 (선택)

구글은 IndexNow에 참여하지 않습니다. 구글 색인의 1차 수단은 **사이트맵 + Search Console**이며,
즉시 통보가 필요하면 Indexing API를 보조로 씁니다.

```bash
pip install google-auth requests
GOOGLE_APPLICATION_CREDENTIALS=service-account.json python tools/google_indexing.py
```

준비: GCP에서 Indexing API 활성화 → 서비스 계정 JSON 발급 → Search Console 속성에
해당 서비스 계정 이메일을 **소유자**로 추가. 자세한 안내는 `tools/google_indexing.py` 주석 참고.

> 참고: 구글·빙의 옛 "sitemap ping" 엔드포인트는 모두 폐기되었습니다(2023). 현재는
> IndexNow(빙·네이버)와 Search Console/사이트맵(구글)이 표준입니다.

## 환경변수

| 변수 | 기본값 |
|------|--------|
| `SITE_URL` | `https://massage1-tawny-five.vercel.app` |
| `INDEXNOW_KEY` | `979b28a2b9f84727a34e73a44db9fa16` |
| `INDEXNOW_DRYRUN` | (미설정) `1`이면 미전송 미리보기 |

## 검색엔진 등록 (최초 1회, 수동)

- **구글 Search Console**: 사이트 등록 → 사이트맵 `https://massage1-tawny-five.vercel.app/sitemap.xml` 제출
- **네이버 서치어드바이저**: 사이트 등록 → 사이트맵 제출 + RSS `…/rss.xml` 제출
- **빙 Webmaster Tools**: 사이트 등록 → 사이트맵 제출 (IndexNow 키 자동 인식)
