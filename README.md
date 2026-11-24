# 연경쌤의 업무 도구함

업무용 도구 웹앱을 한 저장소에 모아 둔 곳입니다. 도구마다 하위 폴더 하나를 쓰고, 루트 `index.html`은 도구 목록(허브) 페이지입니다.

모든 도구는 파일을 **브라우저 안에서만** 처리합니다. 외부 서버로 보내지 않습니다.

## 폴더 구조

```
index.html      도구 목록 페이지 (도구 카드, 약속 세 가지, 푸터)
icon.svg        메인 아이콘(망치). 브라우저 탭과 목록 페이지 제목에 씀
CLAUDE.md       Claude Code 작업 규칙 (변경 후 항상 main까지 머지, 머지 전 확인, 지켜야 할 것)
vercel.json     Vercel 배포 설정 (/pdf 와 /pdf/ 둘 다 열리게 함, /gif 에 멀티스레드용 헤더)
pdf/            PDF 업무 도구
gif/            움짤 메이커
video/          동영상 편집기
photo/          사진 도구
hwpx/           한글 문서 변환
qr/             QR 코드 만들기
```

## 도구 목록

| 폴더 | 도구 | 설명 |
| --- | --- | --- |
| [`/pdf`](pdf/) | PDF 업무 도구 | PDF 합치기·페이지 삭제·순서·회전, 개인정보 가명 처리, Markdown 변환. 자세한 내용은 [`pdf/README.md`](pdf/README.md) |
| [`/gif`](gif/) | 움짤 메이커 | 웹앱 화면을 녹화해 기능별 GIF로 자르고, 목표 용량에 맞춰 저장. 자세한 내용은 [`gif/README.md`](gif/README.md) |
| [`/video`](video/) | 동영상 편집기 | 긴 영상 자르기·이어 붙이기, 자막, 배속, 화면 자르기, 용량 줄여 mp4로 저장. 자세한 내용은 [`video/README.md`](video/README.md) |
| [`/photo`](photo/) | 사진 도구 | 얼굴·이름표 가리기(모자이크), 여러 장 용량 줄이기, 아이폰 사진(HEIC) 변환, 촬영 위치 지우기. 자세한 내용은 [`photo/README.md`](photo/README.md) |
| [`/hwpx`](hwpx/) | 한글 문서 변환 | 한글 문서(hwpx)를 Markdown으로 변환, 개인정보 가명 처리와 되돌리기. 자세한 내용은 [`hwpx/README.md`](hwpx/README.md) |
| [`/qr`](qr/) | QR 코드 만들기 | 주소 여러 개를 이름 붙은 QR로 한 장에 모아 인쇄, 하트 모양 QR, 읽기 확인. 자세한 내용은 [`qr/README.md`](qr/README.md) |

## 배포와 실행

빌드 과정이 없는 정적 사이트입니다. Vercel에 그대로 배포합니다.

내 컴퓨터에서 볼 때는 저장소 루트에서 정적 서버를 띄웁니다.

```bash
npx serve
```

## 도구를 추가할 때

- 도구는 하위 폴더 하나에 넣고, 폴더 안의 파일은 **상대 경로**(`lib/...`, `./style.css`)로만 불러옵니다. `/`로 시작하는 경로는 하위 폴더에서 깨집니다.
- 도구 폴더에 `icon.svg`를 하나 넣습니다. 목록 페이지의 카드에 이 아이콘이 나옵니다.
- 루트 `index.html`에 카드 하나를 넣고(카드의 `--c`는 그 도구 아이콘의 바탕색), 이 README의 표에 한 줄 추가합니다.
- 도구 화면 맨 위 왼쪽에 이 목록 페이지로 돌아가는 "도구함" 링크(`<a class="hub" href="../">`)를 넣습니다. 다른 도구의 머리글에서 그대로 가져오면 됩니다.
- 탭이 여러 개인 도구는 제목을 누르면 첫 탭으로 돌아가게 합니다(`pdf/`의 `goHome` 참고). 작업 내용은 지우지 않고 화면만 옮깁니다.

## 라이선스

`pdf/`는 MuPDF(AGPL-3.0)를 포함하므로 GNU AGPL-3.0 조건을 따릅니다([`pdf/LICENSE`](pdf/LICENSE)). 이 저장소가 그 소스입니다.

`gif/`는 ffmpeg.wasm core(GPL-2.0-or-later)를 포함하므로 GNU GPL 조건을 따릅니다([`gif/LICENSE`](gif/LICENSE)).

`video/`는 Mediabunny(MPL-2.0)를 고치지 않고 포함합니다([`video/lib/mediabunny-1.66.3/LICENSE`](video/lib/mediabunny-1.66.3/LICENSE)).

`photo/`는 libheif-js(LGPL-3.0)를 고치지 않고 포함합니다([`photo/lib/libheif-1.23.5/LICENSE`](photo/lib/libheif-1.23.5/LICENSE)).

`hwpx/`는 외부 라이브러리를 쓰지 않습니다.

`qr/`는 qrcode-generator(MIT)와 jsQR(Apache-2.0)을 고치지 않고 포함합니다(각 `qr/lib/` 폴더의 `LICENSE`).
