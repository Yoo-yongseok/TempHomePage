# 사이트 1번 — 조코딩AX파트너스 (https://jocodingax.ai/) 디자인 역설계 명세

> 출처: 2026-10-19 기준 정적 HTML(프리렌더 스냅샷) + 번들 `/assets/index-CwRCj2B1.css`(750KB) + `/assets/index-DgXA7jMG.js`(2.9MB)를 읽어 추출.
> 모든 값은 소스에서 그대로 복사한 값이다. "추정"이라고 표시한 부분만 정적 코드로 확정이 안 되는 부분이다.
> 로컬 사본: `C:/Users/hpsyo/AppData/Local/Temp/claude/c--Dev-TempHomePage/93fbfc43-44ae-4963-909f-83c1af1fcc33/scratchpad/sites/s1/` (`index.html`, `pretty.txt` = 들여쓰기한 DOM, `home.js` = 홈 컴포넌트 소스 구간, `gnb.js` = GNB 구간, `assets/`)

---

## 0. 전체 개요

### 0.1 기술 스택 (번들에서 검출)

| 항목 | 값 / 근거 |
|---|---|
| 프레임워크 | **React 19.2.5** (`version:\`19.2.5\``), Vite 빌드 (`/assets/index-[hash].js`, `modulepreload`) |
| 라우팅 | react-router 계열 (`<Link to>` → `data-discover="true"` 속성, `useLocation` 사용) |
| CSS | **Tailwind CSS v4** (`@layer properties`, `--spacing:.25rem`, `oklch` 팔레트, `width>=48rem` 미디어쿼리 문법) + HeroUI v3 테마 변수(`--field-border`, `--surface-shadow` 등. 홈 화면 UI에는 거의 쓰이지 않음) |
| 스무스 스크롤 | **Lenis 1.3.25** (`<html class="lenis lenis-smooth">`) |
| 애니메이션 | **GSAP 3.15.0 + ScrollTrigger** — 홈에서는 Lenis를 `gsap.ticker`로 구동하고 `ScrollTrigger.update`만 연결. 홈 섹션 애니메이션 자체는 **CSS transition + requestAnimationFrame + IntersectionObserver + Web Animations API(`el.animate`)** 로 직접 구현됨 (motion/framer-motion·Swiper·Embla 없음) |
| 데이터 | @tanstack/react-query 계열 `useQuery`(블로그 RSS `/blog-rss`), `fetch('/api/edu-cases')` |
| 아이콘 | lucide (`lucide lucide-search` 클래스), Phosphor 아이콘(AXLake 데모 내부), 다수의 자체 SVG(`/icons/*.svg`) |
| 기타 | Cloudflare 이메일 난독화(정적 HTML의 `[email protected]`), reduced-motion 대응이 매우 꼼꼼함 |

### 0.2 홈 페이지 섹션 순서 (위→아래)

`gle()` 컴포넌트가 다음 순서로 렌더링한다.

| # | data-section | 이름 | 배경 |
|---|---|---|---|
| — | `<nav>` (fixed) | GNB | 홈 최상단에서는 투명, 스크롤/메뉴 열림 시 `#ffffff` |
| 1 | `S1` (`data-gnb-theme="dark"`) | 히어로 (5장 이미지 크로스페이드) | 사진 + `rgba(24,24,27,0.48)` 오버레이 |
| 2 | `S2-brands` | 브랜드 신뢰(고객사 로고 21개) | `#f6f7f9` |
| 3 | `S3b` | 레퍼런스 갤러리 (자동 흐르는 메이슨리 마퀴 + 드래그 + 상세 모달) | `#ffffff` |
| 4 | `S4` | 솔루션 (스크롤 고정 sticky 460vh, 3탭×3스텝) | `#ffffff` ↔ 3번째 탭에서 `#25272d` |
| 5 | `S5` | 제품 소개 (AXHub / AXLake 자동재생 UI 데모 + 진행바) | `#ffffff` |
| 6 | `S8` | 교육 갤러리 / 블로그 (원형 회전 캐러셀) | `#ffffff` |
| 7 | `S9` (`id="s9"`) | 역량 진단 CTA 카드 2개 | `#25272d` |
| 8 | `S14` (`<footer id="s14">`) | 푸터 | `#f6f7f9` |
| — | 고정 FAB | AI 상담 버튼(확장형) | 그라데이션 `#2d64fa→#5985fb` |

전체 래퍼: `<div class="flex w-full flex-col bg-white">`.

---

## 1. 디자인 토큰

### 1.1 컬러 팔레트

커스텀 `@theme` 값 (CSS에서 추출):

```css
--color-primary:#2d64fa;
--color-primary-soft:#eaf0fe;
--color-primary-cyan:#44cdff;
--color-ax-text:#fff;             /* body 기본 글자색이 흰색! 모든 요소가 색을 명시함 */
--color-gray-50:#f6f7f9;
--color-gray-100:#eff1f4;
--color-gray-200:#e4e5e8;
--color-gray-300:#d1d3d8;
--color-gray-400:#9ca0ab;
--color-gray-500:#6d717e;
--color-gray-600:#4f535d;
--color-gray-700:#3c3f47;
--color-gray-800:#25272d;
--color-gray-900:#16171b;
```

역할별 정리:

| 역할 | 값 | 사용처 |
|---|---|---|
| Primary (브랜드 블루) | `#2d64fa` | 주 CTA 버튼, 진행바, 링크 텍스트, 커서 클릭 리플, 툴팁 |
| Primary hover | `#1f54d6` | GNB `문의하기` hover, 모달 CTA hover |
| Primary soft | `#eaf0fe` | 데모 콘솔 활성 nav 배경, 칩 배경 |
| Primary 10% | `bg-primary/10` | 모바일 메뉴 "약 12분" 칩 배경 (`text-primary`) |
| 그라데이션 텍스트 | `from-[#44cdff] to-[#4b7bff]` (to-r) | S4/S5 활성 탭 제목 |
| 그라데이션 카드 | `from-[#2d64fa] to-[#4b7bff]` (to-r) | S9 기업 카드 |
| 데모 스테이지 BG | `linear-gradient(121.7deg, #2d64fa 0.37%, #2dd1f1 99.63%)` | S5 제품 데모 배경 |
| 전송 버튼 그라데이션 | `linear-gradient(134.71deg,#2d64fa 7.55%,#2dd1f1 94.6%)` | AXLake 데모 |
| FAB 그라데이션 | `bg-gradient-to-b from-[#2d64fa] to-[#5985fb]` | 채팅 FAB |
| 로고 보조색 | `#F6C205`(gnb-logo-full), `#FBB03B`(아이콘 로고) | 로고 SVG |
| 텍스트 기본(진함) | `#16171b` | 제목, 본문 강조 |
| 텍스트 보조 | `#6d717e` | 섹션 서브카피 |
| 텍스트 본문 | `#4f535d` | S4/S5 설명 |
| 텍스트 약함 | `#9ca0ab` | 푸터 헤더/정보, S9 서브 |
| 텍스트 nav(라이트) | `#3c3f47` | GNB 메뉴 글자(흰 배경 시) |
| 비활성 탭 글자 | `#e4e5e8` (라이트) / `#3c3f47` (다크) | S4/S5 탭 |
| 보더 | `#e4e5e8`, `rgba(82,82,91,0.08)` (푸터 구분선, 드롭다운 하단선) | |
| 배경 회색 | `#f6f7f9` | 브랜드 띠, 푸터, 모바일 서브메뉴, 버튼 |
| 배경 다크 | `#25272d` | S9, S4 다크 모드 |
| 카드 다크 | `#3c3f47` (hover `#484c55`) | S9 개인 카드, S4 다크 모드 버튼 |
| 이미지 placeholder | `#d9d9d9`, `#eff1f4` | |
| 히어로 오버레이 | `rgba(24,24,27,0.48)` | |
| 갤러리 hover 그라데이션 | `from-[rgba(10,12,18,0.88)] via-[rgba(10,12,18,0.35)] to-transparent` (to-t) | |
| 모달 dim | `rgba(17,24,39,0.55)` | 사례 모달 |
| 메가메뉴 dim | `rgba(0,0,0,0.5)` | GNB 드롭다운 열림 시 |
| 액센트(데모) | `#f5a623` (버스트 파티클), `#1fa24e`(활성/체크), `#f0a726`(VOL 폴더) | |

### 1.2 타이포그래피 스케일

폰트는 전부 **Pretendard Variable** (body). `word-break: keep-all; overflow-wrap: break-word; letter-spacing: -.01em; -webkit-font-smoothing: antialiased`.

| 토큰(용도) | mobile | md(≥768) | 3xl(≥1920) | weight | line-height | letter-spacing |
|---|---|---|---|---|---|---|
| Hero H1 | 32px | 56px | **67px** (`!important`) | 700 | 1.2 | -0.5px → md `normal` |
| Hero 서브 | 16px | 18px | — | 400 | 1.5 → md 1.4 | -0.16px → md -0.18px |
| 섹션 H2 | 28px | 40px | — | 700 | 1.2 | 없음(body -0.01em) |
| 섹션 서브카피 | 16px | 18px | — | 400 | 1.4 | -0.18px |
| S9 서브카피 | 16px | 22px | — | 500 | 1.4 → md 1.3 | -0.16px → md -0.22px |
| S4 탭 제목 | 40px (lg) | xl(≥1280) 48px | — | 700 | 1.2 | — |
| S5 제품명 | 32px | 48px | — | 700 | 1.2 | — |
| S4 스텝 설명 | 20px | | | 500 | 1.3 | -0.2px |
| S5 설명 | 18px | | | 500 | 1.3 | -0.2px |
| 주요 버튼(Hero) | 16px | 18px | 22px | 700 | 1.4 | -0.18px |
| GNB 메뉴 | 16px | | | 400 | 1.5 | -0.16px |
| GNB 버튼 | 14px | | | 600 | — | — |
| 푸터 링크/헤더 | 14px | | | 500 | 1.5 | -0.14px |
| 푸터 정보 | 12px | | | 400 | 1.6 | -0.12px |
| S9 카드 제목 | 24px | 32px | | 700 | 1.2 | — |
| 갤러리 카드 제목 | 15px (작은 카드 13px, line-clamp-2) | | | 700 | 1.35 | — |
| 태그 칩 | 11.5px | | | 600 | — | — |

### 1.3 Breakpoints (Tailwind v4 기본 + 커스텀)

| 이름 | 값 |
|---|---|
| sm | `40rem` (640px) |
| md | `48rem` (768px) — 모바일/데스크톱 GNB 분기 |
| lg | `64rem` (1024px) — S4 sticky / S5 2열 / S8 원형 캐러셀 분기 (JS `matchMedia('(min-width: 1024px)')`) |
| xl | `80rem` (1280px) — S4 탭 48px, 이미지 갭 20px |
| 2xl | `96rem` (1536px) |
| **3xl** | **`1920px`** (커스텀: `--breakpoint-3xl:1920px`) — Hero 확대 |
| 임의 | `[@media(min-width:1920px)]` max-w-[1720px], `[@media(min-width:2000px)]` max-w-[1720px] |

### 1.4 간격·레이아웃 상수

- 컨테이너 max-width: **1200px** (GNB, 브랜드, S8, 푸터), S9 1080px, S4/S5 초광폭에서 1720px.
- 섹션 세로 패딩 패턴: `py-[60px] md:py-[100px]` (S5, S8, S9), S3b `py-[80px] md:py-[100px]`, 푸터 `py-[60px]`.
- 섹션 가로 패딩: `px-6 md:px-10 lg:px-[100px]` / `xl:px-[100px]` / 푸터 `px-6 md:px-10 xl:px-0`.
- GNB 높이 **60px** (sticky 오프셋, `scroll-mt-[60px]`, 해시 스크롤 오프셋 `loe=60`).

### 1.5 Radius

| 값 | 사용처 |
|---|---|
| `rounded-full` | GNB 버튼/메뉴, 칩, 소셜 버튼, 진행바 |
| `40px` (3xl `48px`) | Hero/섹션 CTA 버튼 (pill) |
| `8px` | 갤러리 카드, S4/S5 이미지·스테이지 (1920+ 에서 12px) |
| `12px` | S9 카드, FAB, 모바일 블로그 카드 |
| `16px` | 데모 콘솔(840×472), S8 원형 카드 |
| `20px` | 사례 모달 |
| `14px` | 모달 내부 박스 |

### 1.6 Shadow

```css
--shadow-overlay: 0px 2px 8px 0px #0000000f, 0px -6px 12px 0px #00000008, 0px 14px 28px 0px #0000000a;
/* FAB 동일: shadow-[0px_2px_8px_rgba(0,0,0,0.06),0px_-6px_12px_rgba(0,0,0,0.03),0px_14px_28px_rgba(0,0,0,0.04)] */
GNB 스크롤 시: box-shadow: 0 2px 12px rgba(22,23,27,0.06);
S8 hover 카드: 0 12px 40px rgba(0,0,0,0.18);
데모 툴팁: shadow-[0_6px_16px_rgba(45,100,250,0.3)], 콜아웃: shadow-[0_8px_24px_rgba(45,100,250,0.3)];
AXLake 입력창: 0 10px 34px rgba(16,24,40,0.10); 파일카드: 0 6px 18px rgba(16,24,40,0.07)
```

### 1.7 Easing / Duration 상수

| 이름 | 값 | 사용처 |
|---|---|---|
| expo-out (Lenis) | `t => Math.min(1, 1.001 - 2**(-10*t))`, duration **1.1s** | 스무스 스크롤 |
| back-out (bouncy) | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 갤러리 카드 등장, cardPop, FAB 등장 |
| quint-out | `cubic-bezier(0.22, 1, 0.36, 1)` | S4 이미지 폭/그레이스케일, 데모 줌, 커서 이동 |
| expo-ish | `cubic-bezier(0.16, 1, 0.3, 1)` | FAB 확장 0.42s |
| FLIP | `cubic-bezier(0.33, 1, 0.68, 1)` 680ms | 데모 카드 재정렬 |
| Tailwind ease-out | `cubic-bezier(0, 0, .2, 1)` | GNB, 드롭다운, 모바일 아코디언 |
| Tailwind ease-in-out | `cubic-bezier(.4, 0, .2, 1)` | 히어로 크로스페이드 |
| Tailwind 기본 transition | `.15s cubic-bezier(.4,0,.2,1)` | `transition-colors/opacity` |
| 기타 정의 | `--ease-out-fluid:cubic-bezier(.32,.72,0,1)`, `--ease-out-quart:cubic-bezier(.165,.84,.44,1)`, `--ease-out-quad:cubic-bezier(.25,.46,.45,.94)` | (홈에선 미사용) |

---

## 2. 폰트

| 패밀리 | 로딩 | 비고 |
|---|---|---|
| **Pretendard Variable** | `<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet">` + `<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>` | 실제 본문 폰트. `--font-pretendard:"Pretendard Variable","Pretendard",-apple-system,BlinkMacSystemFont,system-ui,sans-serif` |
| Montserrat | `https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;700&display=swap` | `--font-montserrat:"Montserrat",sans-serif`, 홈 화면에서는 사용처 없음(다른 페이지용) |
| mono | Tailwind 기본 `ui-monospace, SFMono-Regular, Menlo, ...` | AXLake 데모의 테이블명/코드 |

---

## 3. 섹션별 상세

### 3.0 GNB (`<nav>` fixed)

**동작 규칙(코드 `Kne`)**
- `w = pathname === "/" && !scrolled && !dropdownOpen && !mobileMenuOpen` → **투명 모드**.
  - `scrolled = window.scrollY > 8` (rAF 스로틀, passive scroll).
- 투명 모드: `background-color: transparent`, 글자 `#ffffff`, 로고 `/icons/gnb-logo-full-white.svg`, `소개자료 받기` 버튼 `border-white/40 text-white hover:bg-white/10`.
- 솔리드 모드: `background-color:#ffffff` + `backdrop-blur-md`(12px), 글자 `#3c3f47`, 로고 `/icons/gnb-logo-full.svg`, 버튼 `border-[#e4e5e8] text-[#3c3f47] hover:bg-[#f6f7f9]`.
- 스크롤 시 shadow: `0 2px 12px rgba(22,23,27,0.06)` (투명 여부와 무관하게 scrolled면 적용).
- 전환: `transition-[background-color,box-shadow] duration-200 ease-out`.
- 숨김/표시(hide on scroll down) **없음** — 항상 고정.

**스켈레톤**
```html
<nav class="fixed top-0 right-0 left-0 z-50 transition-[background-color,box-shadow] duration-200 ease-out [backdrop-blur-md]">
  <div class="relative mx-auto flex h-[60px] w-full items-center justify-between px-5 md:px-4 lg:px-10 xl:px-0" style="max-width:1200px">
    <div class="flex min-w-0 items-center gap-2 lg:gap-8 xl:gap-[100px]">
      <a href="/"><img class="h-7 w-auto" src="/icons/gnb-logo-full(-white).svg"></a>   <!-- viewBox 370×56 → 높이 28px, 폭 185px -->
      <div class="hidden items-center gap-1 md:flex xl:gap-5">
        <button class="flex items-center gap-1 whitespace-nowrap rounded-full px-1.5 py-1 text-[16px] leading-[1.5] tracking-[-0.16px] transition-colors xl:px-3"
                style="color:#fff|#3c3f47; background-color: open ? #f6f7f9 : transparent">서비스</button>
        <!-- 제품 / 프로그램 / 무료진단 / 자료실 / 소식 -->
      </div>
    </div>
    <div class="flex shrink-0 items-center gap-2">
      <a class="hidden h-10 items-center justify-center rounded-full border px-2.5 text-[14px] font-semibold transition-colors md:flex xl:px-5 ...">소개자료 받기</a>
      <a class="hidden h-10 items-center justify-center rounded-full px-4 text-[14px] font-semibold text-white transition-colors md:flex xl:px-5"
         style="background-color:var(--color-primary)"  onmouseenter→#1f54d6>문의하기</a>
      <button class="flex size-11 items-center justify-center md:hidden"><!-- 햄버거 --></button>
    </div>
  </div>
  <!-- 데스크톱 드롭다운 패널 -->
</nav>
```

**메뉴 데이터 (`PS`)**
- 서비스: AX올인원(/consulting-v1), 집체교육(/group-training), 퍼실리테이팅(/edu/facilitating), 해커톤(/program/hackathon)
- 제품: AXHub ↗, AXLake ↗ (외부링크 아이콘 `/icons/external-link.svg` 8×14, `h-3.5 w-2`)
- 프로그램: AX 인재전쟁 ↗, AX 아카데미 ↗
- 무료진단: 기업 성숙도 검사 [칩 "약 12분"], 개인 역량 검사 [칩 "약 8분"] — 칩: `rounded-full bg-primary/10 px-1.5 py-1 text-[10px] font-semibold leading-[1.2] text-primary`
- 자료실: 리포트, 웨비나, AX사례
- 소식: 회사소개, 뉴스룸, 블로그 ↗, 채용 ↗

**데스크톱 드롭다운 (메가 패널)**
- 열기: `(hover: hover)` 기기에서 `mouseenter`/`focus`, 그 외 클릭 토글. nav의 `mouseleave` 시 닫힘. 리사이즈 시 닫힘.
- 패널: `absolute top-full right-0 left-0 hidden overflow-hidden bg-white transition-[height,opacity] duration-300 ease-out md:block`, `height: open ? 내용높이 : 0`, `opacity 0→1`, `border-bottom:1px solid rgba(82,82,91,0.08)`. 열림은 다음 rAF에 `open=true`, 닫힐 때 300ms 후 언마운트.
- 내용: `py-5`, `padding-left = 버튼.getBoundingClientRect().left + 12` (해당 메뉴 버튼 아래 정렬). 한 열 `flex w-[180px] flex-col items-start gap-2`.
- 항목: `flex items-center py-2 transition-opacity hover:opacity-70`, 텍스트 `text-[16px] font-medium leading-[1.5] tracking-[-0.16px] text-[#16171b]`.
- 동시에 전체화면 dim: `fixed inset-0 z-40 transition-opacity duration-300 ease-out`, `background-color: rgba(0,0,0,0.5)`, mouseenter 시 닫힘.

**모바일 (<768)**
- 햄버거: `span.relative.block.size-6` 안에 막대 2개 `absolute left-[3.5px] right-[3.5px] rounded-full bg-current transition-transform duration-200 ease-out`, height 1.5px, top = 7.5−0.75 = **6.75px**, 16.5−0.75 = **15.75px**.
  - 열림 transform: 위 `translateY(4.5px) rotate(45deg)`, 아래 `translateY(-4.5px) rotate(-45deg)` → X.
  - 색: 투명모드 `#ffffff`, 그 외 `#16171b`.
- 패널: `fixed inset-x-0 bottom-0 top-[60px] z-40 flex-col bg-white md:hidden` (열리면 `flex`), `body overflow:hidden`.
  - 1단계 행: `flex w-full items-center gap-[10px] px-6 py-5` + 텍스트 `text-[16px] font-semibold leading-[1.5] tracking-[-0.16px] text-[#16171b]` + caret `/icons/caret-down.svg` 18×18 (`rotate-180` when open, duration-200).
  - 아코디언: `grid transition-[grid-template-rows] duration-300 ease-out grid-rows-[0fr] → grid-rows-[1fr]`, 내부 `overflow-hidden` → `flex flex-col bg-[#f6f7f9] px-6 py-2` → 항목 `flex h-12 items-center py-3` 텍스트 `#3c3f47` 16px.
  - 하단 버튼 영역 `flex flex-col gap-3 p-5`: `소개자료 받기`(h-12 rounded-full border border-[#e4e5e8] 16px semibold #3c3f47), `문의하기`(h-12 rounded-full bg primary text-white).

---

### 3.1 S1 히어로

**목적**: 브랜드 메시지 + 2개 CTA, 현장 사진 5장 자동 크로스페이드.

**레이아웃**: `section.relative.flex.aspect-[1280/700].max-h-[100dvh].min-h-[560px].w-full.flex-col.items-center.justify-center.overflow-hidden` — 폭 기준 1280:700 비율, 최대 화면 높이, 최소 560px. 콘텐츠 정중앙.

```html
<section data-gnb-theme="dark" data-section="S1" class="relative flex aspect-[1280/700] max-h-[100dvh] min-h-[560px] w-full flex-col items-center justify-center overflow-hidden">
  <div aria-hidden class="absolute inset-0 isolate">
    <img src="/images/hero-0N.webp" class="absolute inset-0 size-full object-cover object-center transition-opacity duration-[2000ms] ease-in-out {상태클래스}">  ×5
    <div class="absolute inset-0 z-[3] bg-[rgba(24,24,27,0.48)]"></div>
  </div>
  <div class="relative z-10 flex flex-col items-center gap-10 px-5 md:gap-[60px] md:px-10">
    <div class="flex flex-col items-center gap-4 text-center md:gap-5">
      <h1 class="text-[32px] font-bold leading-[1.2] tracking-[-0.5px] text-white md:text-[56px] md:tracking-normal 3xl:text-[67px]!">AX 고민의 끝,<br>조코딩AX파트너스</h1>
      <p class="text-[16px] font-normal leading-[1.5] tracking-[-0.16px] text-white/90 md:text-[18px] md:leading-[1.4] md:tracking-[-0.18px]">직원들이 실제 업무 자동화를 만드는 <br class="md:hidden">AX 종합 솔루션을 제공합니다</p>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-3 3xl:gap-[14px]">
      <a href="/contact" class="flex items-center justify-center rounded-[40px] bg-[#2d64fa] px-6 py-4 text-[16px] font-bold leading-[1.4] tracking-[-0.18px] text-white transition-opacity hover:opacity-90 md:text-[18px] 3xl:rounded-[48px] 3xl:px-[29px] 3xl:py-[19px] 3xl:text-[22px]!">문의하기</a>
      <a href="/documents" class="flex items-center justify-center rounded-[40px] border border-white/[0.48] bg-white/[0.08] px-6 py-4 text-[16px] font-bold leading-[1.4] tracking-[-0.18px] text-white transition-colors hover:bg-white/[0.16] md:text-[18px] 3xl:...">소개자료 받기</a>
    </div>
  </div>
</section>
```

**이미지**: `/images/hero-01.webp` ~ `/images/hero-05.webp` — 각각 **2560×1440 (16:9)** webp.

**크로스페이드 로직 (정확한 재현 필수)**
```js
const rE = ['/images/hero-01.webp', ... '/images/hero-05.webp'], doe = 3000;
const [e, t] = useState(0);
useEffect(() => { const id = setInterval(() => t(i => (i + 1) % rE.length), doe); return () => clearInterval(id); }, []);
const prev = (e + rE.length - 1) % rE.length;
// className: r===e ? 'z-[2] opacity-100' : r===prev ? 'z-[1] opacity-100' : 'z-0 opacity-0'
```
→ 3초마다 다음 장이 z-2로 올라오며 opacity 0→1 (2000ms ease-in-out), 이전 장은 z-1에서 opacity 1 유지 → 검은 틈 없는 크로스페이드. 텍스트 등장 애니메이션은 없음(정적).

---

### 3.2 S2 브랜드 신뢰 (로고 띠)

```html
<section data-section="S2-brands" class="w-full bg-[#f6f7f9] px-[24px] py-[24px] [--logo-scale:0.347] md:px-[60px] md:py-[40px] md:[--logo-scale:0.72]">
  <div class="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-[4px] md:gap-x-2 md:gap-y-3">
    <div class="flex h-[24.255px] items-center justify-center px-[6.6px] md:h-[53px] md:px-2">
      <img class="select-none object-contain" style="width:calc(95.4px * var(--logo-scale)); height:calc(32.4px * var(--logo-scale))" loading="lazy" draggable="false">
    </div> ×21
  </div>
</section>
```
- 정적 flex-wrap(마퀴 아님). 로고 기준 크기(w×h, px) — 경로 `/home_image/brand-logos/`:
  google.png 95.4×32.4, openai.png 99×27, kakaopay-securities.png 126×27.9, musinsa.png 126×23.3, myrealtrip.png 126×28.4, meditherapy.png 126×15.1, channeltalk.png 87.6×32.3, pwc.png 69.1×33.4, celltrion.png 108×27.6, nh-its-plain.webp 126×36.3, hoban.png 126×18.9, nia.png 63×63, primer.png 74.2×21.6, spigen.png 92.2×20.5, seon.png 126×17.9, eland-plain.svg 103.5×38.8, strong-ventures.png 126×33.9, likelion-plain.webp 126×14, fastcampus-plain.webp 126×24.3, **워크모어**(mask: workmore-mask.png 126×23.6, `bg-[#16171b]` + `mask-image/size:contain/no-repeat/center`), groupby.webp 150×49.
- hover 효과 없음.

---

### 3.3 S3b 레퍼런스 갤러리 (메이슨리 마퀴)

**목적**: 교육·해커톤 현장 사진 카드가 무한히 왼쪽으로 흐르고, 드래그·클릭으로 상세 모달.

```html
<section data-section="S3b" class="w-full overflow-hidden bg-white py-[80px] md:py-[100px]">
  <h2 class="px-6 text-center text-[28px] font-bold leading-[1.2] text-[#16171b] md:text-[40px]">조코딩AX파트너스가 <br class="md:hidden">함께하는 완전한 AX</h2>
  <p class="mt-3 px-6 text-center text-[16px] font-normal leading-[1.4] tracking-[-0.18px] text-[#6d717e] md:text-[18px]">교육부터 해커톤, 웨비나까지, 대기업과 공공기관의 AX 현장을 소개합니다</p>
  <div class="mt-8 text-center">
    <a href="/edu/cases" class="inline-flex items-center justify-center gap-1 rounded-[40px] bg-[#2d64fa] px-6 py-3.5 text-[16px] font-bold leading-[1.4] tracking-[-0.18px] text-white transition-opacity hover:opacity-90 md:text-[18px]">AX 사례 전체보기 →</a>
  </div>
  <div class="relative mt-[48px] w-full cursor-grab overflow-hidden active:cursor-grabbing md:mt-[64px]" style="touch-action:pan-y">
    <div class="flex w-max items-start will-change-transform" style="gap:{k}px; transform:translate3d(x,0,0)">
      <div class="flex shrink-0 flex-col" style="width:{colW}px; gap:{k}px">  <!-- 컬럼 ×7, 2회 반복(총 14) -->
        <div data-case="..." class="group relative w-full cursor-pointer overflow-hidden rounded-[8px] bg-white" style="height:{A or j}px; ...등장 transition">
          <img class="pointer-events-none size-full select-none object-cover" style="object-position:x% y%">
          <div class="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[rgba(10,12,18,0.88)] via-[rgba(10,12,18,0.35)] to-transparent p-4 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            <div class="mb-2 flex flex-wrap gap-1.5"><span class="rounded-full bg-white/15 px-2 py-0.5 text-[11.5px] font-semibold text-white backdrop-blur-sm">대기업</span>…</div> <!-- 높이<260이면 태그 생략 -->
            <p class="font-bold leading-[1.35] text-white text-[15px]">제목</p>   <!-- 작은 카드: line-clamp-2 text-[13px] -->
            <p class="mt-1 text-[12.5px] font-semibold text-white/85">자세히 보기 →</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**컬럼 레이아웃 상수 (`lE`)** — 기준폭(px), single=카드1개, stack=카드2개 위아래:
`[{single,942},{single,300},{stack,450},{single,300},{single,600},{stack,450},{single,676}]`
- 스케일 `c = Coe(innerWidth)`:
  ```js
  const yE=.75, Soe=.9, bE=.55;
  function Coe(w){ if(w<1280){ const t=clamp((w-360)/920,0,1); return bE+(yE-bE)*t; }
                   const t=clamp((w-1280)/640,0,1); return yE+(Soe-yE)*t; }
  // 360px→0.55, 1280px→0.75, 1920px→0.9
  ```
- 컬럼폭 `O(w) = (innerWidth<1024 ? min(w,600) : w) * c`, gap `k = 20*c`, single 높이 `A = 450*c`, stack 각 높이 `j = 215*c`.
  - 예: 1280px에서 942→706.5px, gap 15px, single 높이 337.5px, stack 161.25px (스냅샷 값과 일치).
- 슬롯(`uE`, 9개) 순서와 이미지: axwar(`/images/gallery-09.webp` 1352×900), spigen(focal 23%/52%), ulsan, nonghyup, eland, amersports, autoever, nia, ulsan … (실제 렌더 이미지 경로는 HTML 스냅샷 `pretty.txt` 226–453행 참고. API `/api/edu-cases`가 있으면 그 데이터로 대체).

**애니메이션**
1. **등장(scroll-in)**: `IntersectionObserver(threshold:0.15)` 1회. 카드 `transform: scale(0.4)→scale(1)`, `opacity 0→1`, `transition-property: transform, opacity; transition-duration: 650ms; transition-timing-function: cubic-bezier(0.34,1.56,0.64,1); transition-delay: (컬럼index % 7) * 90ms`. (등장 후 상태 변화 시 duration 260ms)
2. **무한 마퀴**: 등장 후 `SE = (7-1)*90 + 700 = 1240ms` 지나면 시작. rAF마다 `x -= (innerWidth<1024 ? 0.5 : 1)` px (**프레임 기반**, 60Hz면 60px/s). `x <= -M`이면 `+= M` (M = 전체 1세트 폭 = Σ컬럼폭 + k*7). 컬럼 배열 2배 복제로 이음매 없음. `transform: translate3d(${x}px,0,0)`.
3. **일시정지**: 트랙 `mouseenter`에서 멈춤, `mouseleave`에서 재개, 드래그 중 정지, 모달 열림 중 정지.
4. **드래그**: pointerdown→capture, `x = startX + (clientX - downX)`, 4px 이상 움직이면 drag로 판정(클릭 무시). 드래그 아닌 pointerup이면 `data-case`로 모달 오픈.
5. **hover**: 오버레이 opacity 0→1 (200ms). 모바일(<1024)은 라벨 항상 표시.

**상세 모달 (`mE`)**
- `fixed inset-0 z-[100] flex items-start justify-center overflow-auto overscroll-contain bg-[rgba(17,24,39,0.55)] p-4 md:p-10` + `data-lenis-prevent`, html overflow hidden, ESC 닫기.
- 패널 `relative w-full max-w-[820px] overflow-hidden rounded-[20px] bg-white`; 닫기 `absolute right-4 top-4 size-9 rounded-full bg-[#16171b] text-white`.
- 이미지 뷰어 `bg-[#111318]` + `aspect-[16/9]` object-contain 크로스페이드(300ms ease-out) + 카운터 `absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-[11.5px]` + 썸네일 `h-[54px] w-[72px] md:h-[62px] md:w-[84px] rounded-[8px] border-2` (활성 `border-white`, 비활성 `opacity-55 hover:opacity-90`). ←/→ 키 지원.
- 본문 `p-7 md:p-8`: 태그 `rounded-full bg-[#eef2ff] px-2.5 py-1 text-[12px] font-semibold text-[#3557c7]`, h3 `text-[22px] md:text-[24px] font-bold leading-[1.3]`, meta `text-[13.5px] text-[#6b7280]`, 소제목 `border-l-[3px] border-[#2d64fa] pl-2.5 text-[15px] font-bold`, 본문 `text-[14.5px] leading-[1.72] text-[#374151]`, 성과 박스 `rounded-[14px] bg-[#f9fafb] p-4`, CTA 박스 `rounded-[14px] bg-[#f3f6ff] p-5` + 버튼 `rounded-[40px] bg-primary px-5 py-3 text-[15px] font-semibold hover:bg-[#1f54d6]`.

---

### 3.4 S4 솔루션 (스크롤 고정 스텝퍼) — 가장 중요한 인터랙션

**데이터 (`wE`)**
| 탭 | 스텝 1 / 2 / 3 | 이미지 | 상세 |
|---|---|---|---|
| 집체교육 | 부서별 업무와 구성원 AI 숙련도를 파악하여 맞춤 커리큘럼을 구축합니다 / 교육 전용툴 AXEdu를 제공하여 번거로운 설치, 사전 준비가 필요없습니다 / 성과 대시보드로 구성원 개별 성적과 종합적인 결과를 측정합니다 | `/images/solution1-0{1,2,3}.webp` (1599×900) | /group-training |
| 퍼실리테이팅 | 잠재력있는 인재를 발굴하고, 밀착 교육으로 AI 숙련도를 끌어올립니다 / 일대일 또는 소그룹으로 업무와 이해도 수준에 맞추어 지도합니다 / 수강생 전원, 실무에 바로 적용할 수 있는 완성물을 보장합니다 | `/images/solution2-0{1,2,3}.webp` | /edu/facilitating |
| AX올인원 | 전문개발자 FDE가 상주하며 실무에 필요한 AI 시스템을 직접 구축합니다 / 데이터 거버넌스를 구축하여 모든 사내 데이터를 중앙 집중 제어합니다 / 기업 맞춤 운영체제 AXHub에서 구성원들의 AX를 자산화합니다 | `/images/solution3-0{1,2,3}.webp` | /consulting-v1 |

총 스텝 `EE = 9`.

**데스크톱(≥1024) 구조**
```html
<section data-section="S4" class="relative w-full transition-colors duration-500 bg-white|bg-[#25272d]" style="height: {100 + 9*40}vh /* = 460vh */">
  <style>@keyframes s4fade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}</style>
  <div class="sticky top-[60px] flex h-[calc(100vh-60px)] flex-col items-center justify-center gap-[60px] overflow-hidden px-[100px] py-[60px]">
    <div class="flex flex-col items-center gap-3 text-center">
      <h2 class="text-[28px] font-bold leading-[1.2] transition-colors duration-500 md:text-[40px] text-[#16171b]|text-white">AI교육과 AX구축</h2>
      <p class="text-[16px] font-normal leading-[1.4] tracking-[-0.18px] transition-colors duration-500 md:text-[18px] text-[#6d717e]|text-[#e4e5e8]">시티즌 디벨로퍼를 육성하고, 지속가능한 AX 환경을 구축합니다</p>
    </div>
    <div class="flex w-full items-center gap-[120px] [@media(min-width:1920px)]:mx-auto [@media(min-width:1920px)]:max-w-[1720px]">
      <!-- 좌측 탭 -->
      <div class="flex w-[340px] shrink-0 flex-col gap-[40px] self-start xl:w-[400px]">
        <div class="flex flex-col gap-4">
          <button class="relative w-fit cursor-pointer whitespace-nowrap text-left text-[40px] font-bold leading-[1.2] xl:text-[48px]">
            <span class="transition-colors duration-500 text-[#e4e5e8]|text-[#3c3f47]">집체교육</span>
            <span aria-hidden class="absolute inset-0 transition-opacity duration-500 ease-out bg-gradient-to-r from-[#44cdff] to-[#4b7bff] bg-clip-text text-transparent opacity-100|opacity-0">집체교육</span>
          </button>
          <!-- 활성 탭만: -->
          <a class="inline-flex w-fit items-center gap-1 rounded-[40px] px-4 py-2 text-[16px] font-medium leading-[1.5] tracking-[-0.16px] transition-colors duration-500 bg-[#f6f7f9] text-[#6d717e] hover:bg-[#eef0f3]">자세히 보기 <svg chevron-right 18px/></a>
          <!-- 다크일 때: bg-[#3c3f47] text-[#d1d3d8] hover:bg-[#484c55] -->
        </div> ×3
      </div>
      <!-- 우측 이미지 아코디언 -->
      <div class="flex min-w-0 max-w-[1200px] flex-1 flex-col gap-[28px] pb-[40px]">
        <div class="flex w-full items-stretch justify-center gap-4 xl:gap-5">
          <button class="shrink-0 cursor-pointer overflow-hidden rounded-[8px] bg-[#d9d9d9] [@media(min-width:1920px)]:rounded-[12px]"
                  style="width:{active?E:x}px; height:{D}px; transition: width 550ms cubic-bezier(0.22,1,0.36,1)">
            <img class="size-full object-cover" style="filter:grayscale(active?0:1); transition: filter 550ms cubic-bezier(0.22,1,0.36,1)">
          </button> ×3
        </div>
        <div class="px-3 text-center" style="animation: s4fade 400ms ease-out" key="desc-{step}">
          <p class="text-[20px] font-medium leading-[1.3] tracking-[-0.2px] transition-colors duration-500 text-[#4f535d]|text-[#e4e5e8]">{현재 스텝 설명}</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

**스크롤 → 스텝 계산**
```js
const rect = section.getBoundingClientRect();
const range = rect.height - window.innerHeight;
const p = range > 0 ? clamp(-rect.top, 0, range) / range : 0;
const step = clamp(Math.floor(p * 9), 0, 8);   // {mi: 탭, si: 스텝}
```
- 다크 모드: `mi === 2` (AX올인원)일 때 섹션 `bg-[#25272d]`, 모든 텍스트 색이 `duration-500`으로 전환.
- 이미지 크기: 비활성 폭 `x = xl?48:40`, 갭 `b = xl?20:16`, 활성 폭 `E = min(rowWidth - 2*(x+b), round(availH*533/300), 1000)`, 높이 `D = round(E*300/533)` (533:300 ≈ 16:9). `availH = stickyH - 120 - 헤더높이 - 60 - 설명높이 - 28 - 40`.
- 클릭(탭/이미지) → `window.scrollTo({top: sectionTop + ((index+0.5)/9) * range, behavior:'smooth'})`, 800ms간 스크롤 핸들러 잠금.

**모바일(<1024)**: sticky 없음. `section.flex.w-full.flex-col.items-center.gap-[60px].bg-white.px-6.py-[60px]` → 탭별 블록 `max-w-[560px]`; 탭 h3 `text-[28px] font-bold` 그라데이션 텍스트; 각 스텝: `aspect-video rounded-[8px] bg-[#d9d9d9]` 이미지 + `flex items-baseline gap-2 px-1` [번호 `01` `text-[20px] font-bold text-[#2d64fa]`] [설명 `text-[16px] font-medium leading-[1.4] tracking-[-0.2px] text-[#4f535d]`].

---

### 3.5 S5 제품 소개 (AXHub / AXLake 자동재생 데모)

**레이아웃**
```html
<section data-section="S5" class="w-full bg-white px-6 py-[60px] md:px-10 md:py-[100px] lg:px-[100px]">
  <style>@keyframes s5fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}</style>
  <div class="flex flex-col gap-10 md:gap-[60px]">
    <div class="flex flex-col items-center gap-3 text-center">
      <h2 class="text-[28px] font-bold leading-[1.2] text-[#16171b] md:text-[40px]">프로덕트</h2>
      <p class="text-[16px] ... text-[#6d717e] md:text-[18px]">다양한 AI 에이전트와<br class="md:hidden">이를 운용하는 플랫폼을 제공합니다.</p>
    </div>
    <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[120px] [@media(min-width:2000px)]:mx-auto [@media(min-width:2000px)]:max-w-[1720px]">
      <div class="flex w-full flex-col gap-[52px] lg:w-[400px] lg:shrink-0">
        <div class="flex flex-col gap-10">
          <div class="flex flex-col gap-5">
            <button class="relative w-fit ... text-[32px] font-bold leading-[1.2] md:text-[48px]"><span class="text-[#e4e5e8]">AXHub</span><span class="absolute inset-0 transition-opacity duration-500 ease-out bg-gradient-to-r from-[#44cdff] to-[#4b7bff] bg-clip-text text-transparent">AXHub</span></button>
            <!-- 활성일 때: 모바일 전용 데모(lg:hidden) / 설명(s5fade 400ms) -->
            <div class="text-[18px] font-medium leading-[1.3] tracking-[-0.2px] text-[#4f535d]"><p>…</p><p>…</p><p>…</p></div>
          </div>
          <div role="progressbar" class="w-full overflow-hidden rounded-full bg-[#f6f7f9]"><div class="h-[6px] rounded-full bg-[#2d64fa]" style="width:0→100%"></div></div>
          <div class="flex w-full justify-center lg:hidden"><a class="자세히 보기 버튼"/></div>
        </div>
        <!-- AXLake 동일 -->
      </div>
      <div class="hidden w-full min-w-0 flex-col items-center gap-6 lg:flex lg:max-w-[1200px] lg:flex-1">
        {데모 스테이지}
        <a class="inline-flex items-center gap-1 whitespace-nowrap rounded-[40px] border border-[#e4e5e8] px-5 py-3 text-[16px] font-medium leading-[1.5] tracking-[-0.16px] text-[#4f535d] transition-colors hover:bg-[#f6f7f9]">자세히 보기 <svg arrow-up-right 18px/></a>
      </div>
    </div>
  </div>
</section>
```

**제품 데이터**
- AXHub (duration **9700ms**): "사내 내부에서만 사용하는 AI 플랫폼으로, / 복잡한 도메인 지식을 요구하지 않아 모든 직무가 / 업무 자동화를 직접 개발하고 공유합니다." → https://axhub.ai/
- AXLake (duration **15000ms**): "사내 업무 데이터가 연결된 대화형 AI 도구로, / 질문으로 보고서를 만들고 반복 업무를 자동화합니다. / 생성된 결과물을 조직과 함께 활용합니다." → https://axlake.jocodingax.ai/

**진행바/자동전환**: 섹션이 `IntersectionObserver(threshold:0.3)`로 보일 때만 rAF 루프. `progress = min((now - start)/duration, 1)` → 바 `style.width = progress*100%`. 1 도달 시 다음 제품. 탭 클릭 시 해당 제품으로 즉시 전환 + 바 0%.

**데모 스테이지(`uD`) 스케일링**
```js
const oD = 1080, sD = 616;                     // 스테이지 고정 크기
const cse = 'linear-gradient(121.7deg, #2d64fa 0.37%, #2dd1f1 99.63%)';
const cD = 56, lD = (oD - cD*2) / 840;          // = 1.15238 (콘솔 840×472 확대율)
const lse = Math.round((sD - 472*lD) / 2);      // = 36
// 바깥: <div class="aspect-[533/300] w-full overflow-hidden rounded-[8px]">
//   안: <div class="relative origin-top-left overflow-hidden rounded-[8px]" style="width:1080px;height:616px;transform:scale(container.clientWidth/1080);background-image:cse">
//     <div class="absolute origin-top-left" style="left:56px;top:36px;width:840px;height:472px;transform:scale(1.15238)"> 콘솔 </div>
```
(ResizeObserver로 scale 갱신 — 즉 **1080px 디자인을 통째로 축소**하는 방식.)

**AXHub 데모 콘솔 (840×472, `rounded-[16px] bg-white shadow-overlay`)**: 검색창(`rounded-[7.875px] bg-[#f6f7f9] p-[10.5px]`, 포커스 시 border primary + bg white), 카테고리 탭(전체 38 / 백엔드 12 / 디자인 12 / 자동화 3 / 개발도구 4; 활성 `border-b-[1.313px] border-primary`, 카운트 칩 `bg-primary-soft text-primary`), 정렬 "최신순", 3열 앱 카드(`w-[calc((100%_-_21px)/3)] rounded-[6.432px] p-[10.5px] bg-[#f9f9f9]`, 아이콘 28.875px, 이름 10.5px semibold, 카테고리 7.875px #9ca0ab, 설명 9.188px, 좋아요/사용자 수, `열기` 버튼 bg-primary). 수치가 모두 0.656… 배율의 소수 px(디자인을 1280→840으로 축소한 값)이므로 그대로 복사하면 된다(`pretty.txt` 547–765행).
- 스텝 1 (`ZE`, 4200ms): 새 앱 카드 3개(`데이터 찾기 봇`, `마케팅 콘텐츠 AI`, `고객 VOC 분석`)가 `1000 + i*950ms`마다 맨 앞에 삽입 → 신규 카드 `cardPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both` + 주황 버스트(`burstRing`, `burstParticle` 10개, 반지름 52px), 나머지 카드는 **FLIP** (`transform: translate(dx,dy)` → `transition: transform 680ms cubic-bezier(0.33,1,0.68,1)`).
- 스텝 2 (`rse`, 5500ms): 가상 커서가 검색창으로 이동(150ms/230ms) → 클릭(680ms) → "고객 VOC 분석" 타이핑(840ms부터 90ms/글자) → 결과 카드 `열기`로 이동(2150ms) → 클릭(2650ms) → 앱 화면(2710ms) → 캡션 "회사 계정 하나로 모든 앱을 이용해요"(3150ms).
- 스텝 엔진(`zoe`): 화면이 IO(threshold .2)로 보일 때 시작, `pointerdown`시 타이머 일시정지/`pointerup` 재개. 줌 `translate(px,py) scale(zoom)` `transition: transform 380ms cubic-bezier(0.22,1,0.36,1)`(기본 zoom 1.15). 커서 SVG: `path d="M5 2.5 L18.5 13 L12 13.6 L15.2 20.2 L12.3 21.5 L9.2 14.9 L5 19.2 Z" fill="#16171b" stroke="#ffffff" stroke-width="1.6"`, 크기 19px, 이동 `left/top 260ms cubic-bezier(0.22,1,0.36,1)`, 클릭 리플 `bg-primary/45 cursorClick 0.55s`, 누름 `cursorPress 0.28s`. 툴팁 `rounded-[8px] bg-primary px-2.5 py-2 text-[13px] font-semibold text-white shadow-[0_6px_16px_rgba(45,100,250,0.3)] animate-[demoStepIn_0.35s_ease-out]`.

**AXLake 데모**: 1080×616 내부에 800px 목업을 `scale(840/(800*1.11111))`, `translate(-140px,-57px)`로 배치. 3개 화면(data → chat → flow)을 Web Animations API로 순차 재생:
- data: 트리 행이 `opacity 0, translateY(8px)→none` 240ms, 행마다 72ms(스키마 헤더 130ms) 누적 딜레이, `cubic-bezier(0.22,1,0.36,1)`; 스키마 카드 `translateY(10px)` 275ms; 커서가 이동(370ms, `cubic-bezier(0.4,0,0.2,1)`) → hover(`#f2f4f7`) → 선택(`#eaf0fe`, 글자 `#2d64fa`) → overview 페이드아웃(150ms)/detail 페이드인.
- chat: "오늘은 어떤 도움을 드릴까요?"(32px medium) + 입력창(`rounded-[16px] border border-[#d1d3d8] bg-white/90`, 20px) 타이핑 + 캐럿(`axCaretBlink 1s step-end infinite`) → 버블(`rounded-[18px] rounded-tr-[6px] bg-[#2d64fa] px-6 py-4 text-[22px] text-white`) → "워크플로우 만드는 중..." → 파일 카드 `일자별_매출_상세표.xlsx`.
- flow: 점 격자 배경(`#fbfcfd` + `radial-gradient(circle,#dfe3e9 1.2px,transparent 1.2px)` / `22px 22px`), 노드 3개(CRON `#fff9e5` / GENERATE_REPORT `#eef8fd` / SEND_EMAIL `#e7e5ff`, `rounded-[16px] border-2 border-[#d6e2fd]`, 체크 `#1fa24e`), 연결선 `h-[3px] bg-[#c9d6f5]` scaleX 성장.
> 세부 타임라인은 매우 길다(`home.js`에서 `function oce(` 이후). 재현 시 **녹화 영상을 보고 단순화**하는 것을 권장.

---

### 3.6 S8 교육 갤러리 (원형 회전 블로그 캐러셀)

```html
<section data-section="S8" class="relative w-full bg-white">
  <div class="px-6 py-[60px] md:px-10 md:py-[100px] xl:px-[100px]">
    <div class="mx-auto flex w-full max-w-[1200px] flex-col gap-10 lg:flex-row lg:items-center lg:gap-[100px]">
      <div class="flex flex-col items-start gap-8 lg:shrink-0">
        <h2 class="whitespace-nowrap text-left text-[28px] font-bold leading-[1.2] text-[#16171b] md:text-[40px]">AX고민을 해결한<br>기업 사례를 확인하세요</h2>
        <a class="hidden w-full max-w-[320px] items-center justify-center gap-1.5 rounded-[40px] bg-[#2d64fa] px-6 py-3.5 text-[18px] font-bold leading-[1.4] tracking-[-0.18px] text-white transition-opacity hover:opacity-90 lg:inline-flex">블로그 더보기 <svg arrow-right 18/></a>
      </div>
      <div class="w-full lg:flex-1">
        <div class="relative w-full cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing" style="height: 820*s px">
          <div class="absolute left-0 top-0 origin-top-left" style="width:700px;height:820px;transform:scale(s)">
            <a class="absolute block aspect-video overflow-hidden rounded-[16px] bg-[#eff1f4] will-change-transform" style="width:340px;left;top;transform:translate(-50%,-50%) rotate(θ) scale(1);z-index;box-shadow">
              <img class="pointer-events-none size-full select-none object-cover">
              <span data-veil class="pointer-events-none absolute inset-0 bg-white" style="opacity:0"></span>
            </a> ×16
          </div>
          <div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-[20%] bg-gradient-to-b from-white to-transparent"></div>
          <div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[20%] bg-gradient-to-t from-white to-transparent"></div>
          <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-[12%] bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </div>
      <a class="inline-flex self-center ... text-[16px] font-bold text-[#2d64fa] lg:hidden">블로그 더보기 →</a>
    </div>
  </div>
</section>
```

**원형 배치 수식 (그대로 복사)**
```js
const _O=700, vO=820, Xce=340, yO=940, bO=vO/2 /*410*/, xO=500, Zce=.9;
const nle = (22.5*Math.PI/180)/6000;      // 회전 속도: 6초에 22.5° (= 3.75°/s)
const SO = 44;                              // hover 시 바깥으로 밀어내는 거리(px)
function CO(i, phi, n){
  let r = i*(2*Math.PI/n) + phi;
  r = ((r+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI) - Math.PI;   // [-π, π)
  const top = bO + xO*Math.sin(r);
  return { left: yO - xO*Math.cos(r), top, rotate: -(r*180/Math.PI)*Zce, scale:1, opacity:1, z: Math.round(top) };
}
```
- 원 중심이 (940, 410), 반지름 500 → 스테이지(700폭) 기준 **오른쪽 바깥에 중심**이 있어 왼쪽 호만 보이는 "바퀴" 형태. 카드가 접선 방향으로 회전(0.9배).
- 카드 수: 게시물 g개(RSS 최대 8, fallback 6) × `max(2, ceil(16/g))` 반복 → 16장.
- 스케일 `s = min(container.clientWidth/700, 1.35)`.
- rAF로 `phi += dt * nle` (드래그/hover 중엔 정지). 매 프레임 left/top/transform/zIndex 직접 대입.
- hover: 대상 카드를 반경 방향으로 `44px * t` 밀고(`t`는 프레임마다 `t += (target - t)*0.18`로 이징), `z-index:1000`, `box-shadow: 0 12px 40px rgba(0,0,0,0.18)`.
- 드래그(세로): `phi = phi0 + dy / (500*s)`. 4px 미만 이동이면 클릭으로 간주 → 새 탭 열기.
- 섹션이 화면에 있을 때만(IO threshold 0) 회전.
- **모바일(<1024)**: `grid snap-x auto-cols-[76%] grid-flow-col grid-rows-2 gap-3 overflow-x-auto pb-2 md:auto-cols-[42%]`, 카드 `snap-start rounded-[12px] bg-[#eff1f4]` + `aspect-video` 이미지.
- Fallback 데이터 이미지: `/images/home-s8-1.png` ~ `home-s8-6.png` (1200×686).

---

### 3.7 S9 역량 진단

```html
<section id="s9" data-section="S9" class="w-full scroll-mt-[60px] bg-[#25272d] px-6 py-[60px] md:px-10 md:py-[100px]">
  <div class="mx-auto flex max-w-[1080px] flex-col items-center gap-10 md:gap-[60px]">
    <div class="flex flex-col items-center gap-2 md:gap-3">
      <h2 class="text-center text-[28px] font-bold leading-[1.2] text-white md:text-[40px]">우리 회사 AI 성숙도는<br class="md:hidden"> 몇 점일까요?</h2>
      <p class="text-center text-[16px] font-medium leading-[1.4] tracking-[-0.16px] text-[#9ca0ab] md:text-[22px] md:leading-[1.3] md:tracking-[-0.22px]">무료로 테스트하고 분석 리포트를 받아보세요.</p>
    </div>
    <div class="flex w-full flex-col gap-5 md:flex-row">
      <a class="group relative flex h-[180px] flex-1 flex-col items-center justify-center gap-3 overflow-hidden rounded-[12px] p-8 transition-transform duration-300 ease-out will-change-transform hover:scale-[1.02] bg-gradient-to-r from-[#2d64fa] to-[#4b7bff]">
        <img src="/images/s9-corp-bg.png" class="pointer-events-none absolute inset-0 size-full object-cover object-top">  <!-- 1024×577 -->
        <svg arrow-up-right class="absolute right-4 top-4 z-10 size-6 text-white opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 md:size-8"/>
        <p class="relative z-10 text-[16px] font-normal leading-[1.4] tracking-[-0.18px] md:text-[18px] text-white/70">기업 단체용</p>
        <p class="relative z-10 text-[24px] font-bold leading-[1.2] text-white md:text-[32px]">기업 AX 성숙도 검사</p>
      </a>
      <a class="... bg-[#3c3f47]"> <p class="... text-[#9ca0ab]">직원 개인용</p><p>개인 AX 역량 검사</p></a>
    </div>
  </div>
</section>
```
hover: 카드 `scale(1.02)` 300ms ease-out + 우상단 ↗ 아이콘 페이드인.

---

### 3.8 S14 푸터

```html
<footer id="s14" class="w-full bg-[#f6f7f9] px-6 py-[60px] md:px-10 xl:px-0">
  <div class="mx-auto flex w-full max-w-[1200px] flex-col gap-[60px] md:gap-[100px]">
    <div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
      <div class="flex items-center gap-2.5">
        <img src="/icons/gnb-logo.svg" style="width:40px;height:28.5px">
        <span class="text-[26px] font-bold leading-[1.2] text-[#16171b] md:text-[31px]">조코딩AX파트너스</span>
      </div>
      <nav class="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:flex lg:gap-[12px]">
        <div class="flex flex-col gap-4 md:w-[100px]">   <!-- 열 폭: 서비스100/제품80/프로그램100/무료진단110/자료실80/소식60 -->
          <span class="text-[14px] font-medium leading-[1.5] tracking-[-0.14px] text-[#9ca0ab]">서비스</span>
          <a class="whitespace-nowrap text-[14px] font-medium leading-[1.5] tracking-[-0.14px] text-[#16171b]">AX올인원</a> …
        </div>
      </nav>
    </div>
    <div class="flex flex-col gap-6 border-t border-[rgba(82,82,91,0.08)] py-6 md:flex-row md:items-start md:justify-between">
      <div class="flex flex-col gap-1.5 text-[12px] leading-[1.6] tracking-[-0.12px] text-[#9ca0ab]">
        <p>© 2026 주식회사 조코딩에이엑스파트너스. All rights reserved.</p>
        <div class="flex flex-wrap gap-x-5 gap-y-1"><p>대표자 : 조동근, 문경원</p><p>사업자등록번호 : …</p><p>통신판매업신고번호 : …</p></div>
        <div …><p>주소 : 서울 서초구 서초대로 397, B동 1401호 (서초동, 부띠크 모나코)</p></div>
        <div …><p>전화 : 070-4280-6588</p><p>이메일 : contact@jocodingax.ai</p><p>호스팅서비스 제공 : Amazon Web Services, Inc.</p></div>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
          <a class="w-fit text-[#3c3f47] underline-offset-2 hover:underline">이용약관</a>
          <a class="w-fit font-semibold text-[#3c3f47] underline-offset-2 hover:underline">개인정보처리방침</a>
        </div>
      </div>
      <div class="flex items-center gap-5">
        <!-- 원형 버튼: flex size-11 items-center justify-center rounded-full bg-[#e4e5e8] text-[#3c3f47] transition-colors hover:bg-[#d1d3d8], 아이콘 24px -->
        메일(복사) / 주소(복사) / 유튜브 / 인스타그램 / 링크드인  — /icons/footer/{mail,pin,youtube,instagram,linkedin}.svg
      </div>
    </div>
  </div>
</footer>
```
- 복사 버튼 툴팁: `pointer-events-none absolute bottom-full left-1/2 mb-2 w-max max-w-[260px] -translate-x-1/2 rounded-lg bg-[#16171b] px-3 py-2 text-center text-[13px] font-medium leading-[1.4] text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100` + 꼬리 `border-[5px] border-transparent border-t-[#16171b]`. 클릭 시 클립보드 복사 → 1.5초간 "복사되었습니다".

---

### 3.9 채팅 FAB (전역)

```html
<div class="chat-fab-in group fixed right-3 top-[calc(100dvh-80px-clamp(0px,(100dvh-100svh)*1000,24px))] z-[60] origin-center overflow-hidden rounded-[12px] shadow-[0px_2px_8px_rgba(0,0,0,0.06),0px_-6px_12px_rgba(0,0,0,0.03),0px_14px_28px_rgba(0,0,0,0.04)] md:top-auto md:bottom-10 md:right-10 hover:scale-[1.06]"
     style="width:68px;height:68px; transition: width 0.42s cubic-bezier(0.16,1,0.3,1), height 0.42s cubic-bezier(0.16,1,0.3,1), scale 0.18s ease-out">
  <button class="flex size-full flex-col text-left transition-transform active:scale-[0.98]">
    <div class="relative w-full shrink-0 overflow-hidden" style="height:68px">
      <div class="absolute inset-0 bg-gradient-to-b from-[#2d64fa] to-[#5985fb]"></div>
      <img src="/images/fab-consultant.png" class="absolute left-1/2 top-0 h-[168%] w-auto max-w-none -translate-x-1/2">  <!-- 919×1024 -->
    </div>
    <div class="flex flex-1 items-start overflow-hidden bg-white" style="height:0;opacity:0">
      <p class="px-3 py-3 text-[14px] font-semibold leading-[1.5] tracking-[-0.14px] text-[#16171b]">우리 회사 AX를<br>고민하고 계신가요?</p>
    </div>
  </button>
</div>
```
- 등장: `@keyframes chatFabIn{0%{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}` `.26s cubic-bezier(.34,1.56,.64,1)`.
- **자동 확장(≥768px)**: `[data-gnb-theme="dark"]`(히어로)의 `bottom < innerHeight*0.5`가 되는 순간 → 200×266으로 확장(상단 이미지 200px `object-contain object-top`, 하단 텍스트 66px opacity 1 (0.28s ease-out)). 우상단 접기 버튼 `size-6 rounded-full bg-black/25 backdrop-blur-sm hover:bg-black/40` → 접으면 다시 68×68. 확장 상태에선 hover scale 없음.

---

## 4. 애니메이션 / 인터랙션 총정리

| # | 대상 | 트리거 | from → to | duration / easing / delay |
|---|---|---|---|---|
| 1 | Lenis 스무스 스크롤 | wheel | — | `duration:1.1`, `easing:t=>Math.min(1,1.001-2**(-10*t))`, `smoothWheel:true`, 나머지 기본(lerp 무시됨, syncTouch false → 터치는 네이티브). `prefers-reduced-motion`이면 미적용 |
| 2 | GNB 배경/그림자 | scrollY>8, 메뉴 열림 | transparent → #fff (+blur 12px, shadow) | 200ms ease-out |
| 3 | 메가메뉴 | hover/click | height 0→내용, opacity 0→1; dim 0→rgba(0,0,0,.5) | 300ms ease-out |
| 4 | 햄버거 → X | click | 2 bar translateY(±4.5px) rotate(±45deg) | 200ms ease-out |
| 5 | 모바일 아코디언 | click | grid-rows 0fr→1fr, caret rotate 180 | 300ms / 200ms |
| 6 | Hero 배경 | interval 3000ms | 다음 이미지 opacity 0→1 | 2000ms ease-in-out |
| 7 | CTA hover | hover | opacity 1→.9 (primary) / bg white 8%→16% (outline) | 150ms |
| 8 | 갤러리 등장 | IO 0.15 | scale .4→1, opacity 0→1 | 650ms `cubic-bezier(0.34,1.56,0.64,1)`, stagger 90ms/컬럼 |
| 9 | 갤러리 마퀴 | 등장+1240ms | translateX 감소 | 1px/frame (모바일 .5px/frame), 무한 |
| 10 | 갤러리 hover 라벨 | hover | opacity 0→1 | 200ms |
| 11 | S4 스텝 전환 | 스크롤 진행률 | 이미지 width 48→E, grayscale 1→0 | 550ms `cubic-bezier(0.22,1,0.36,1)` |
| 12 | S4 설명 | 스텝 변경(key) | `s4fade` opacity 0/translateY(10px) → 1/none | 400ms ease-out |
| 13 | S4 다크모드 | 3번째 탭 | bg #fff→#25272d, 텍스트 색 | 500ms |
| 14 | S4/S5 탭 그라데이션 | 활성 변경 | 그라데이션 레이어 opacity 0↔1 | 500ms ease-out |
| 15 | S5 진행바 | IO 0.3 + rAF | width 0→100% | 9700ms / 15000ms linear |
| 16 | S5 설명 | 탭 변경 | `s5fade` translateY(8px) | 400ms ease-out |
| 17 | AXHub 카드 팝 | 데모 타임라인 | `cardPop` scale .55→1.05(65%)→1 | .5s `cubic-bezier(0.34,1.56,0.64,1)` |
| 18 | 버스트 | 위와 동시 | `burstRing` scale .2→1.9, opacity .55→0 / `burstParticle` 이동 ±52px | .55s/.6s ease-out |
| 19 | FLIP 재정렬 | 카드 삽입 | translate(dx,dy)→0 | 680ms `cubic-bezier(0.33,1,0.68,1)` |
| 20 | 데모 줌/커서 | 스텝 타이머 | scale 1→1.15, 커서 left/top | 380ms / 260ms `cubic-bezier(0.22,1,0.36,1)` |
| 21 | S8 원형 회전 | IO 노출 + rAF | phi += 3.75°/s | 연속 |
| 22 | S8 hover | pointerenter | 반경방향 +44px, shadow | 프레임당 18% 보간 |
| 23 | S9 카드 hover | hover | scale 1→1.02, ↗ opacity 0→1 | 300ms ease-out |
| 24 | FAB 등장/확장 | mount / 히어로 50% 통과 | scale .6→1 / 68→200×266 | .26s back-out / .42s `cubic-bezier(0.16,1,0.3,1)` |
| 25 | 푸터 툴팁 | hover | opacity 0→1 | 150ms |

**Keyframes 원문 (CSS 번들)**
```css
@keyframes cardPop{0%{opacity:0;transform:scale(.55)}65%{opacity:1;transform:scale(1.05)}to{opacity:1;transform:scale(1)}}
@keyframes burstRing{0%{opacity:.55;transform:translate(-50%,-50%)scale(.2)}to{opacity:0;transform:translate(-50%,-50%)scale(1.9)}}
@keyframes burstParticle{0%{opacity:1;transform:translate(-50%,-50%)scale(1)}to{opacity:0;transform:translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(.4)}}
@keyframes cursorClick{0%{opacity:.5;transform:scale(.35)}to{opacity:0;transform:scale(1.6)}}
@keyframes cursorPress{0%,to{transform:scale(1)}40%{transform:scale(.82)}}
@keyframes demoStepIn{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
@keyframes axCaretBlink{0%,45%{opacity:1}55%,to{opacity:0}}   .ax-caret-blink{animation:1s step-end infinite axCaretBlink}
@keyframes chatFabIn{0%{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}
@keyframes s4fade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}   /* 인라인 <style> */
@keyframes s5fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}    /* 인라인 <style> */
```

**Lenis 설정 원문**
```js
const lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)), smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
const tick = t => lenis.raf(t * 1000);
gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
// 라우트 변경 시 lenis.scrollTo(0,{immediate:true}); ScrollTrigger.refresh()
// 해시(#s9 등) 진입 시 top - 60 으로 immediate 스크롤, 150/400/900ms에 재보정
```
CSS: `.lenis,html.lenis body{height:auto}` `.lenis.lenis-smooth{scroll-behavior:auto!important}` `.lenis.lenis-smooth [data-lenis-prevent]{overscroll-behavior:contain}` `.lenis.lenis-stopped{overflow:hidden}` `.lenis.lenis-smooth iframe{pointer-events:none}`. 전역 `html,body{overflow-x:clip}`.

**없는 것**: 커스텀 커서, 숫자 카운터, 타이핑 히어로, 페이지 로드 인트로, 헤더 hide-on-scroll, 패럴랙스, ScrollTrigger pin(sticky는 순수 CSS `position:sticky`).

---

## 5. React 19 + Tailwind v4 재현 가이드

### 5.1 권장 라이브러리
- `lenis` (^1.3) — `lenis/react`의 `ReactLenis` 또는 직접 인스턴스. GSAP 없이도 `autoRaf:true`로 충분(원본은 gsap ticker 사용; S4를 ScrollTrigger로 바꾸고 싶을 때만 `gsap` 추가).
- 그 외 애니메이션은 **CSS transition + rAF + IntersectionObserver** 로 원본과 동일하게 구현하는 것이 가장 정확하다. (원한다면 S5 데모만 `motion` 사용 가능)
- `index.html`에 Pretendard CDN `<link>` 추가.

### 5.2 `@theme` 블록 (src/index.css 에 붙여넣기)

```css
@import "tailwindcss";

@theme {
  --font-sans: "Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --font-pretendard: "Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

  --breakpoint-3xl: 1920px;

  --color-primary: #2d64fa;
  --color-primary-hover: #1f54d6;
  --color-primary-soft: #eaf0fe;
  --color-primary-cyan: #44cdff;
  --color-primary-end: #4b7bff;

  --color-gray-50: #f6f7f9;
  --color-gray-100: #eff1f4;
  --color-gray-200: #e4e5e8;
  --color-gray-300: #d1d3d8;
  --color-gray-400: #9ca0ab;
  --color-gray-500: #6d717e;
  --color-gray-600: #4f535d;
  --color-gray-700: #3c3f47;
  --color-gray-800: #25272d;
  --color-gray-900: #16171b;

  --shadow-overlay: 0px 2px 8px 0px #0000000f, 0px -6px 12px 0px #00000008, 0px 14px 28px 0px #0000000a;
  --shadow-gnb: 0 2px 12px rgba(22,23,27,0.06);

  --ease-back-out: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-quint-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-fab: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-flip: cubic-bezier(0.33, 1, 0.68, 1);

  --animate-card-pop: cardPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  --animate-fab-in: chatFabIn 0.26s cubic-bezier(0.34,1.56,0.64,1);
  --animate-s4fade: s4fade 400ms ease-out;
  --animate-s5fade: s5fade 400ms ease-out;
  --animate-demo-step-in: demoStepIn 0.35s ease-out;

  @keyframes cardPop { 0%{opacity:0;transform:scale(.55)} 65%{opacity:1;transform:scale(1.05)} to{opacity:1;transform:scale(1)} }
  @keyframes burstRing { 0%{opacity:.55;transform:translate(-50%,-50%) scale(.2)} to{opacity:0;transform:translate(-50%,-50%) scale(1.9)} }
  @keyframes burstParticle { 0%{opacity:1;transform:translate(-50%,-50%) scale(1)} to{opacity:0;transform:translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(.4)} }
  @keyframes cursorClick { 0%{opacity:.5;transform:scale(.35)} to{opacity:0;transform:scale(1.6)} }
  @keyframes cursorPress { 0%,to{transform:scale(1)} 40%{transform:scale(.82)} }
  @keyframes demoStepIn { 0%{opacity:0;transform:translateY(4px)} to{opacity:1;transform:none} }
  @keyframes chatFabIn { 0%{opacity:0;transform:scale(.6)} to{opacity:1;transform:none} }
  @keyframes s4fade { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
  @keyframes s5fade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  @keyframes axCaretBlink { 0%,45%{opacity:1} 55%,to{opacity:0} }
}

@layer base {
  html, body { overflow-x: clip; }
  body {
    font-family: var(--font-pretendard);
    color: #16171b;                 /* 원본은 #fff(--color-ax-text)지만 재현 프로젝트에선 진한색 권장 */
    background-color: #fff;
    word-break: keep-all; overflow-wrap: break-word;
    letter-spacing: -.01em;
    -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
  }
}

/* Lenis 필수 CSS */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
.lenis.lenis-smooth iframe { pointer-events: none; }
```
> Tailwind 기본 회색(`gray-*`)을 위 값으로 덮어쓰면 원본의 `text-[#6d717e]` 등을 `text-gray-500`으로 써도 동일하다. 원본은 임의값(`text-[#16171b]`)을 주로 사용했으므로 그대로 복사해도 무방.

### 5.3 컴포넌트별 구현 메모

| 컴포넌트 | 핵심 구현 |
|---|---|
| `SmoothScroll` | `useEffect`에서 Lenis 생성(reduced-motion이면 skip), 라우트 변경 시 `scrollTo(0,{immediate:true})`. 모달에 `data-lenis-prevent`. |
| `Gnb` | `useScrolledPast(8)` 훅(rAF 스로틀). `isTransparent = pathname==='/' && !scrolled && !openMenu && !mobileOpen`. 드롭다운 높이는 `useLayoutEffect`로 `offsetHeight` 측정 후 inline height 트랜지션. `(hover:hover)` matchMedia로 hover-open 여부 결정. |
| `Hero` | 위 3.1 코드 그대로(인터벌 3000, prev 인덱스 z-1 유지). `aspect-[1280/700] max-h-[100dvh] min-h-[560px]`. |
| `BrandStrip` | 로고 배열 + `[--logo-scale:0.347] md:[--logo-scale:0.72]` CSS 변수 계산. |
| `CaseMarquee` | `useRef` 위치 x + rAF 루프, 배열 2배, `Coe()` 스케일 resize 리스너. 등장은 IO로 `entered` state → 각 카드 inline transition(delay `colIdx*90`). pointer capture 드래그. 원본처럼 프레임 기반 속도를 쓰면 120Hz 모니터에서 2배 빨라지므로, 원하면 `dt*0.06`으로 시간 기반 보정(원본 동작과는 다름). |
| `SolutionSticky` | `section style={{height:'460vh'}}` + 내부 `sticky top-[60px] h-[calc(100vh-60px)]`. scroll 리스너로 step 계산(Lenis 사용 시에도 window scroll 이벤트 발생). ResizeObserver로 행 폭/가용 높이 측정 → 활성 폭 E. 설명 `<div key={step} className="animate-s4fade">`. <1024는 별도 마크업. |
| `ProductShowcase` | IO 0.3 + rAF 진행바(ref로 width 직접 대입, 리렌더 없음). 데모는 1080×616 고정 박스를 `scale(containerW/1080)`. AXHub 데모는 setTimeout 타임라인 + FLIP. AXLake는 `el.animate()` 체인. |
| `BlogWheel` | 16개 `<a>` ref 배열, rAF에서 `CO()`로 style 직접 쓰기(React state 사용 금지 — 성능). 상하/우측 흰색 그라데이션 마스크 3개. <1024는 2행 가로 스냅 그리드. |
| `DiagnosisCta` | 정적 + hover scale. |
| `Footer` | 정적 + 클립보드 복사 툴팁. |
| `ChatFab` | `[data-gnb-theme="dark"]` 요소 bottom을 scroll에서 체크해 확장 state. width/height inline transition. |

---

## 6. 에셋 URL 목록 (모두 `https://jocodingax.ai` 기준)

| 경로 | 크기 | 비고 |
|---|---|---|
| `/images/hero-01.webp` … `hero-05.webp` | 2560×1440 | 히어로 |
| `/icons/gnb-logo-full-white.svg`, `/icons/gnb-logo-full.svg` | viewBox 370×56 | 텍스트 포함 로고(흰/검), 컬러 #2D64FA·#F6C205 |
| `/icons/gnb-logo.svg` | viewBox 24.89×17.86 | 심볼 로고(#2D64FA, #FBB03B), 푸터 40×28.5 |
| `/icons/caret-down.svg` (18×18), `/icons/external-link.svg` (8×14) | | |
| `/home_image/brand-logos/*` | 3.2절 표 | 21개 |
| `/images/gallery-09.webp` | 1352×900 | 갤러리 |
| `/images/edu/uploads/*.webp`, `/images/edu/gallery/*.webp`, `/images/showcase-0N-*.webp`(예: 1800×860) | 다양 | 갤러리/모달 |
| `/images/solution{1,2,3}-0{1,2,3}.webp` | 1599×900 | S4 |
| `/_landing/images/hero-console/*` (app-1~4.png, card-1~3.png, hub-tax.png, hub-*.svg, nav-*.svg, caret-down.svg, top-search.svg, top-bell.svg), `/_landing/icons/logo-icon-large-white.svg`, `/_landing/icons/s05-arrow-up.svg`, `/_landing/images/avatars/p01~p11.png` | | S5 데모 |
| `https://image.inblog.dev?url=…` | 16:9 | S8 블로그 썸네일(RSS) |
| `/images/home-s8-1.png` … `-6.png` | 1200×686 | S8 fallback |
| `/images/s9-corp-bg.png` | 1024×577 | S9 기업 카드 배경 |
| `/images/fab-consultant.png` | 919×1024 | FAB |
| `/icons/footer/{mail,pin,youtube,instagram,linkedin}.svg` | 24×24 | 푸터 |
| `/og-image.png` | 1200×630 | OG |

---

## 7. 정적 분석으로 확정하지 못한 부분 (실브라우저 확인 필요)

1. **S5 데모의 실제 체감 타이밍/연출** — AXHub 스텝2 이후 앱 화면, AXLake의 data→chat→flow 전체 타임라인은 코드가 매우 길어 요약만 함. 영상 녹화로 확인 후 단순화 권장.
2. **S4 sticky 구간의 실제 체감** — 스텝 경계(40vh/스텝)와 Lenis 관성의 조합 느낌, 다크 전환 타이밍.
3. **마퀴 속도** — 프레임 기반(1px/frame)이라 모니터 주사율에 따라 달라짐.
4. **`/api/edu-cases` 응답** — 갤러리 슬롯 이미지가 서버 데이터로 바뀔 수 있음(정적 fallback은 문서화함). 블로그 RSS 썸네일도 런타임 데이터.
5. **이미지 실제 시각 톤**(히어로 사진 내용, 로고 PNG 렌더) — 이미지 다운로드는 하지 않았음.
6. HeroUI 테마 변수(다크 모드 `prefers-color-scheme`)는 홈 UI에 영향 없는 것으로 판단했으나, 폼/모달 등 다른 페이지에서는 쓰일 수 있음.
