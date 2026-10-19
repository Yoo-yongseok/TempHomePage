# 사이트 2번 — AX아카데미 (https://axacademy.jocodingax.ai/) 디자인 역설계 스펙

> 출처: SSR HTML(`index.html`) + `/_next/static/chunks/0x8w4q520w07c.css`(Tailwind v4 빌드 + 커스텀 CSS) + `1clh2czn4eg8j.css`(폰트) + 클라이언트 JS 청크(`2-v1a75rlvblx.js`, `457u401_wcnoa.js`).
> 모든 값은 소스에서 그대로 복사함. 트래킹/분석 관련 내용은 제외.

---

## 1. 전체 개요

### 1.1 기술 스택 / 감지된 라이브러리
| 항목 | 내용 |
|---|---|
| 프레임워크 | Next.js (App Router, Turbopack 빌드 — `turbopack-*.js`, RSC payload) |
| CSS | **Tailwind CSS v4** (`@layer properties/theme/base/components/utilities`, `@property --tw-*`, `color-mix(in oklab, …)` 기반 opacity modifier) + 전역 커스텀 CSS(클래스 기반 컴포넌트: `.nav`, `.btn`, `.card`, `.section`, `.reveal` 등) |
| 애니메이션 라이브러리 | **없음.** framer-motion / gsap / lenis / embla / swiper 모두 미사용. 모든 애니메이션은 **순수 CSS transition/keyframes + IntersectionObserver(클래스 토글) + scroll 이벤트(rAF)** |
| 캐러셀 | 네이티브 `overflow-x-auto` + `scroll-snap` + 버튼 `scrollBy({behavior:'smooth'})` |
| 아코디언(FAQ) | 네이티브 `<details>/<summary>` + Tailwind `group-open:rotate-45` |
| 폰트 | Pretendard Variable(jsDelivr CDN, dynamic-subset) + IBM Plex Mono(next/font/google, self-host) |
| 다크모드 | 없음(라이트 단일 테마. 다크 섹션은 섹션 단위 배경색) |

### 1.2 페이지 구조 (위→아래)
| # | id / 요소 | 배경 | 역할 |
|---|---|---|---|
| 0 | `nav.nav` (sticky) | 반투명 흰색 + backdrop blur | GNB: 로고, "3기 신청" 드롭다운, CTA |
| 1 | `#hero` `.section.hero` | `#06070b` (거의 검정) + 그리드/글로우 | 메인 헤드라인 + CTA |
| 2 | (무id) 신뢰 스트립 | `#F7F9FD` + 상하 border | 만족도 4.7/5 · 47명 · 기업교육 |
| 3 | `#benefits` `.offer-pre` | 상단 블루 radial + `#eef2fb` | 교육 혜택 3개 (지그재그 2열, 목업 카드) |
| 4 | `#value` `.section-dark` | `#1a1d24` (ink) | "3주에 이만큼…" 체크 리스트 3열 |
| 5 | `#problem` `.cone-section` | `#060810` | 찢어진 종이 3장 + 점 트레일 |
| 6 | `#solution` `.cone-section` | `#060810` + 원뿔 글로우 + 그리드 + 하단 흰색 페이드 | 3단계 카드 |
| 7 | `#who` `.section` | 흰색 | 대상 3카드 |
| 8 | `#intro` `.intro-quote` | 사진(`/edu.jpeg`) + 어두운 오버레이, 스크롤 clip-path 확장 | 대표 후기 인용 |
| 9 | `#method` `.section` | 흰색 | 좌: 헤드+지표 / 우: 4카드 지그재그 |
| 10 | `#why` `.section-gray` | `#f6f7f9` | 고민 3카드(`.card`) |
| 11 | `#governance` `.offer-pre` (흰색 오버라이드) | `#fff` | 타임라인 3단계 + AXHub 스크린샷 |
| 12 | `#partners` `.section` | 흰색 | 파트너 로고 + 체크 3줄 + **로고 마퀴** |
| 13 | `#curriculum` `.section-gray` | `#f6f7f9` | 4주 카드 타임라인 + 노트북 데모 + 탭 패널 |
| 14 | `#prep` `.section-gray` | `#f6f7f9` | 준비물 2카드 |
| 15 | `#takehome` `.section-dark` | `#1a1d24` | 결과물 4카드 |
| 16 | `#instructor` `.section-dark` | `#1a1d24` | 강사 프로필 |
| 17 | `#nondev` `.offer-pre` | radial + `#eef2fb` | VOD vs AX아카데미 비교 |
| 18 | `#reviews` `.offer-pre` | radial + `#eef2fb` | 후기 가로 스크롤 캐러셀 |
| 19 | `#pricing` `.section` | 흰색 | 수강료 카드 |
| 20 | `#howtojoin` `.section-gray` | `#f6f7f9` | 신청 3단계 중앙선 타임라인 |
| 21 | `#final-cta` `.section-dark` | `#1a1d24` | 마지막 CTA |
| 22 | `#faq` `.section` | 흰색 | details 아코디언 8개 |
| 23 | `footer` | 흰색 + border-top | 사업자 정보 + 약관 링크 |
| + | FloatingBar (md+) | 흰색 pill | scrollY>900 시 하단 중앙 노출 |
| + | StickyCTA (모바일) | 흰색 바 | scrollY>600 시 하단 슬라이드업 |
| + | SurveyPopup (모달) | 검정 50% + blur | 최초 진입 시 설문 팝업 |

---

## 2. 디자인 토큰

### 2.1 CSS 변수 (`:root`, 원문)
```css
:root{
  --ink:#1a1d24; --paper:#fff; --signal:#2563eb; --signal-text:#1d4ed8;
  --rule:#e5e7eb; --mute:#6b7280;
  --nav-dark:var(--ink); --nav-ink:var(--paper);
  --font-display:"Pretendard Variable", "Pretendard", system-ui, sans-serif;
  --font-body:"Pretendard Variable", "Pretendard", system-ui, sans-serif;
  --font-mono:var(--font-ibm-plex-mono), ui-monospace, monospace;
  --maxw:1280px; --gutter:24px;
  --pad-x:clamp(1.25rem, 5vw, 5rem);
  --pad-y:clamp(7rem, 15vh, 13rem);
  --radius:14px; --radius-sm:10px;
  --dur:.6s; --ease:cubic-bezier(.16, 1, .3, 1);
}
```
Tailwind 유틸 매핑(빌드 결과로 확인): `.text-ink{color:var(--ink)}`, `.text-paper`, `.text-signal{color:var(--signal)}`, `.text-signal-text{color:var(--signal-text)}`, `.text-mute{color:var(--mute)}`, `.bg-rule{background-color:var(--rule)}`, `.border-rule`, `.font-sans{font-family:var(--font-display)}`, `.font-mono{font-family:var(--font-mono)}`. Opacity modifier는 `color-mix(in oklab, var(--paper) 45%, transparent)` 형태(예: `text-paper/45`, `bg-signal/10`, `text-signal/25`, `border-signal/20`, `bg-signal/[0.06]`).

### 2.2 컬러 팔레트 (역할별)
| 토큰/값 | 역할 |
|---|---|
| `--ink` `#1a1d24` | 본문 텍스트, 다크 섹션 배경(`.section-dark`), 배지 배경(`.cc-badge`, `.acc-badge`) |
| `--paper` `#fff` | 흰색, 다크 섹션 텍스트 |
| `--signal` `#2563eb` | 브랜드 블루 — 버튼, 아이콘, 강조, 점, 원형 번호 |
| `--signal-text` `#1d4ed8` | 흰 배경 위 블루 텍스트(대비용) |
| `--rule` `#e5e7eb` | 보더/디바이더 |
| `--mute` `#6b7280` | 보조 텍스트 |
| `#5b9bff` / `#5B9BFF` | 다크 배경 위 하이라이트 블루(`.hero-hl`, `.sig` in cone, 번호) |
| `#9dbdff` | `.hero-accent` (미사용 클래스) |
| `#06070b` | hero 배경 |
| `#060810` | cone-section 배경 |
| `#eef2fb` | `.offer-pre` 베이스 |
| `#f6f7f9` | `.section-gray` |
| `#F7F9FD` | 신뢰 스트립 배경, 컨설팅 단계 박스, 팝업 옵션 hover |
| `#eceef2` | `.card` 보더, 데모 보더 |
| `#F3F4F6` | 비교 섹션 VOD 패널 |
| `#16181d` | 비교 섹션 AX 패널(다크) |
| `#1A1D21`, `#ABABAD`, `#D1D2D3`, `#4A154B`, `#f2c744`, `#e8b339`, `#1d9bd1` | Slack 목업 전용 색 |
| `#2f6bff`, `#5b8bff`, `#f2647c`, `#e6f0ff`, `#e9f0ff`, `#f0f2f5`, `#fbfcfe`, `#14151a`, `#8b909b` | 노트북 데모(리포트) 전용 |
| `green-600` `#00a544` (lab 59.0978% -58.6621 41.2579) | "✓ 교육 수료 후 제공" |
| `slate-300` `#cad5e2` | 데모 채팅 타이핑 점 |

### 2.3 타이포그래피
- `body`: `font-family:var(--font-body); font-size:17px; font-weight:400; line-height:1.6; word-break:keep-all; overflow-wrap:break-word; color:var(--ink); background:#fff`
- 모든 `h1,h2,h3,p,li,span,div,a{word-break:keep-all}` (한국어 줄바꿈 핵심)
- Tailwind 텍스트 스케일(rem은 html 16px 기준): xs .75rem/1.333, sm .875rem/1.4286, base 1rem/1.5, lg 1.125rem/1.556, xl 1.25rem/1.4, 2xl 1.5rem/1.333, 3xl 1.875rem, 5xl 3rem/1
- 행간: `leading-tight 1.25`, `leading-snug 1.375`, `leading-relaxed 1.625`
- 자간: `tracking-tight -.025em`, `tracking-wide .025em`, `tracking-widest .1em`, 커스텀 `tracking-[-0.02em]`, `tracking-[-0.03em]`, `tracking-[-0.025em]`
- 웨이트: 400/500/600/700/800(extrabold)/900

| 용도 | 값 |
|---|---|
| H1 (hero) | `text-[clamp(1.6rem,8.5vw,2.4rem)] sm:text-[clamp(2.4rem,5.4vw,4rem)] font-bold leading-[1.25] tracking-[-0.02em]` |
| 섹션 H2 (`.section-head h2`) | `font-size:clamp(2rem,4.4vw,3.1rem); font-weight:700; line-height:1.28; letter-spacing:-.025em; text-wrap:balance` |
| 섹션 서브(`.section-sub`) | `clamp(1rem,1.5vw,1.2rem); line-height:1.6; color:var(--mute)` (다크: `#fff9`) |
| 혜택 H3 | `text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-[1.3] tracking-[-0.02em]` |
| 라벨(mono) | `font-mono text-sm font-semibold text-signal-text` + 6px 점 |
| 숫자 지표 | `text-[clamp(1.15rem,5.5vw,1.9rem)] font-bold leading-none text-signal-text` |

### 2.4 간격 / 레이아웃
- `.wrap{max-width:1280px; padding-inline:clamp(1.25rem,5vw,5rem); margin:0 auto}`
- `.section{padding-block:clamp(7rem,15vh,13rem); overflow-x:clip}` — 섹션 상하 여백이 매우 큼(112~208px)
- `.section-head{text-align:center; margin-bottom:clamp(2.5rem,6vh,4rem); display:flex; flex-direction:column; align-items:center; gap:1rem; max-width:820px; margin-inline:auto}`
- `.section-cta{display:flex; justify-content:center; margin-top:clamp(1.5rem,3vh,2.5rem)}`
- `html{scroll-behavior:smooth; scroll-padding-top:60px}`
- Tailwind spacing 단위 `--spacing:.25rem`

### 2.5 Radius
`--radius:14px`(.card, cc-body, cds-tab/panel), `--radius-sm:10px`(.btn, nav-menu-panel), Tailwind: `rounded-lg .5rem`, `rounded-xl .75rem`, `rounded-2xl 1rem`, `rounded-3xl 1.5rem`, `rounded-full`, `rounded-[8px]`, `rounded-md .375rem`.

### 2.6 Shadow (원문)
| 이름 | 값 |
|---|---|
| card | `0 1px 2px #1018280a, 0 16px 32px -20px #10182824` |
| card:hover | `0 1px 2px #1018280a, 0 22px 40px -22px #2563eb38` |
| 목업 카드(밝음) | `shadow-[0_24px_60px_-30px_rgba(16,24,40,0.3)]` |
| 목업 카드(Slack 다크) | `shadow-[0_24px_60px_-26px_rgba(16,24,40,0.55)]` |
| AXHub 이미지 | `shadow-[0_24px_60px_-30px_rgba(16,24,40,0.35)]` |
| who 카드 | `shadow-[0_16px_32px_-20px_rgba(16,24,40,0.14)]` |
| method 카드 | `shadow-[0_10px_34px_rgba(31,58,102,0.10)]` |
| 타임라인 번호 원 | `shadow-[0_6px_16px_-6px_rgba(37,99,235,0.6)]` |
| btn-primary:hover | `0 4px 12px color-mix(in srgb, var(--signal) 25%, transparent)` |
| nav-menu-panel | `0 8px 24px #0000001a` |
| floating bar | `shadow-[0_8px_30px_rgba(0,0,0,0.12)]` |
| 캐러셀 버튼 | `shadow-[0_8px_24px_-8px_rgba(16,24,40,0.4)]` |
| 비교 다크 패널 | `shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)]` |
| cc-body | `0 4px 16px #0000000d` / hover `0 10px 26px #2563eb24` / current `0 6px 20px #1a1a1a26` |
| cc-badge | `0 5px 14px #0003` |
| cds-tab.current | `0 10px 30px -18px #2563eb73` |
| laptop-screen | `0 26px 54px -22px #00000080, inset 0 0 0 1px #ffffff0f` |

### 2.7 그라디언트 / 배경 (원문)
```css
.offer-pre{background:radial-gradient(120% 80% at 50% 0%, color-mix(in srgb, var(--signal) 10%, transparent) 0%, transparent 55%), #eef2fb}
#governance.offer-pre{background:#fff}
.section-gray{background:#f6f7f9}
.section-dark{background:var(--ink);color:var(--paper);border-top:0}
.hero{background:#06070b}
.hero:before{background:radial-gradient(42% 44% at 96% 108%,#1124524d 0%,#0000 60%),radial-gradient(48% 44% at 85% 10%,#1e3a8259 0%,#0000 60%)}
.hero:after{background-image:linear-gradient(#ffffff09 1px,#0000 1px),linear-gradient(90deg,#ffffff09 1px,#0000 1px);background-size:54px 54px;mask-image:radial-gradient(75% 65% at 45% 55%,#000 0%,#0000 80%)}
```

### 2.8 Breakpoints
Tailwind 기본: `sm` = `min-width:40rem`(640px), `md` = 48rem(768px), `lg` = 64rem(1024px). 커스텀 CSS: `max-width:639px`, `max-width:640px`(마퀴), `max-width:900px`(커리큘럼 데모 1열), `max-width:1023px`(커리큘럼 2열, intro clip-path 해제).

### 2.9 Easing / Duration
- `--ease: cubic-bezier(.16, 1, .3, 1)` (expo-out 계열) — 거의 모든 전환에 사용
- `--dur: .6s` (reveal)
- Tailwind 기본 transition: `.15s cubic-bezier(.4,0,.2,1)`; `duration-300`
- `--ease-out: cubic-bezier(0,0,.2,1)`

---

## 3. 폰트
1. **Pretendard Variable** — `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css">` (+ `preconnect https://cdn.jsdelivr.net`, preload as style). 본문/디스플레이 모두 Pretendard. 폴백 `"Pretendard", system-ui, sans-serif`.
2. **IBM Plex Mono** 400/500/600 — `next/font/google`로 self-host(woff2, `font-display:swap`, 라틴/확장 subset). html에 `class="ibm_plex_mono_..._variable"` → `--font-ibm-plex-mono:"IBM Plex Mono","IBM Plex Mono Fallback"`. 폴백 `@font-face{font-family:IBM Plex Mono Fallback;src:local(Arial);ascent-override:76.16%;descent-override:20.43%;line-gap-override:0.0%;size-adjust:134.59%}`. 용도: 번호(01,02…), 라벨, 가격 취소선, "AXHub" 칩.
3. 후기 따옴표만 `font-serif` (`ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`).

Vite 재현: `index.html`에 Pretendard CDN link 추가 + `@fontsource/ibm-plex-mono`(400/500/600) 또는 Google Fonts link.

---

## 4. 공통 컴포넌트 (원문 CSS)

### 4.1 버튼
```css
.btn{font-family:var(--font-body);border:1.5px solid var(--ink);min-height:44px;transition:transform .15s var(--ease), background .15s var(--ease), box-shadow .15s var(--ease);cursor:pointer;border-radius:var(--radius-sm);background:0 0;align-items:center;gap:.5rem;padding:.95rem 1.6rem;font-size:1rem;font-weight:600;text-decoration:none;display:inline-flex}
.btn-primary{background:var(--signal);border-color:var(--signal);color:#fff}
.btn-primary:hover{box-shadow:0 4px 12px color-mix(in srgb, var(--signal) 25%, transparent);transform:translateY(-2px)}
.btn-primary:disabled{opacity:.6;cursor:not-allowed;box-shadow:none;transform:none}
.btn-secondary{color:var(--ink);background:0 0}
.btn-secondary:hover{background:var(--ink);color:#fff}
.btn-secondary-dark{/* .btn과 동일 + */color:#fff;border:1.5px solid #fff}
.btn-secondary-dark:hover{color:var(--ink);background:#fff}
.btn-lg{padding:1.1rem 2.2rem;font-size:1.15rem}
.btn:active,.btn-secondary-dark:active{transition-duration:.1s;transform:scale(.97)}
.btn[data-cta-location=floating-bar]{border-radius:999px}
:focus-visible{outline:2px solid var(--signal);outline-offset:2px}
```
CTA 라벨은 전부 **"사전예약 신청"** → `/apply`.

### 4.2 카드 `.card`
```css
.card{border-radius:var(--radius);transition:box-shadow .2s var(--ease), transform .2s var(--ease), border-color .2s var(--ease);background:#fff;border:1px solid #eceef2;padding:clamp(1.5rem,2.8vw,2rem);box-shadow:0 1px 2px #1018280a,0 16px 32px -20px #10182824}
.card:hover{border-color:color-mix(in srgb, var(--signal) 30%, #eceef2);transform:translateY(-2px);box-shadow:0 1px 2px #1018280a,0 22px 40px -22px #2563eb38}
```

### 4.3 섹션 헤드
```html
<div class="section-head"><h2>…</h2><p class="section-sub">…</p></div>
```
다크 섹션: `.section-dark .section-head h2{color:var(--paper)}`, `.sig{color:var(--signal)}`, `.section-sub{color:#fff9}`. cone 섹션: `.sig{color:#5b9bff}`, sub `#fff9`.

---

## 5. 섹션별 상세

### 5.0 GNB `nav.nav`
**목적**: 상단 고정 내비. **레이아웃**: 좌(로고 + 드롭다운) / 우(CTA) space-between.
```html
<nav class="nav">
  <div class="wrap nav-inner">
    <div class="nav-left">
      <a class="nav-logo" href="/"><img class="nav-logo-img" src="/axacademy-logo-transparent.png" alt="조코딩AX 아카데미"/></a>
      <div class="nav-menu">
        <button class="nav-menu-trigger" aria-haspopup="true">3기 신청
          <svg class="nav-menu-caret" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="nav-menu-panel" role="menu">
          <a class="nav-menu-item" href="/"><span>사업자반</span><span class="nav-menu-badge">모집중</span></a>
          <a class="nav-menu-item" href="/pre-apply?track=marketer"><span>마케터반</span><span class="nav-menu-badge">사전신청</span></a>
          <!-- 디자이너반, 커머스반 : 사전신청 -->
        </div>
      </div>
    </div>
    <div class="nav-actions"><a href="/apply" class="btn btn-primary">사전예약 신청</a></div>
  </div>
</nav>
```
**스타일(최종 적용값, 뒤에서 덮어쓴 값 반영)**:
```css
.nav{z-index:100;position:sticky;top:0;color:var(--ink);background:#ffffffb8;
  border-bottom:1px solid color-mix(in srgb, var(--rule) 55%, transparent);
  backdrop-filter:blur(16px) saturate(180%)}
@media (prefers-reduced-transparency:reduce){.nav{backdrop-filter:none;background:#fff}}
.nav-inner{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding-block:.7rem}
.nav-left{display:flex;align-items:center;gap:1rem}
.nav-logo-img{width:auto;height:32px;display:block}
.nav-menu{position:relative}
.nav-menu-trigger{font-family:var(--font-body);color:var(--ink);background:0 0;border:0;display:inline-flex;align-items:center;gap:.3em;min-height:44px;padding:.5rem .2rem;font-size:.9rem;font-weight:600;line-height:1}
.nav-menu-caret{transition:transform .18s var(--ease)}
.nav-menu:hover .nav-menu-caret,.nav-menu:focus-within .nav-menu-caret{transform:rotate(180deg)}
.nav-menu-panel{z-index:120;position:absolute;top:100%;left:0;margin-top:.25rem;min-width:160px;padding:.35rem;display:flex;flex-direction:column;background:#fff;border:1px solid var(--rule);border-radius:var(--radius-sm);box-shadow:0 8px 24px #0000001a;
  opacity:0;visibility:hidden;transform:translateY(-4px);transition:opacity .16s var(--ease), transform .16s var(--ease), visibility .16s var(--ease)}
.nav-menu:hover .nav-menu-panel,.nav-menu:focus-within .nav-menu-panel{opacity:1;visibility:visible;transform:translateY(0)}
.nav-menu-item{display:flex;justify-content:space-between;align-items:center;gap:.6rem;width:100%;min-height:40px;padding:.55rem .7rem;border-radius:calc(var(--radius-sm) - 2px);font-size:.88rem;font-weight:500;color:var(--ink);transition:background .12s var(--ease)}
.nav-menu-item:hover{background:color-mix(in srgb, var(--signal) 10%, transparent)}
.nav-menu-badge{color:var(--signal);background:color-mix(in srgb, var(--signal) 12%, transparent);font-size:.68rem;font-weight:600;white-space:nowrap;border-radius:999px;padding:.12rem .4rem}
.nav .btn-primary{white-space:nowrap}
@media (max-width:639px){
  .nav-left{gap:.8rem}
  .nav-logo-img{height:.85rem}   /* 같은 미디어쿼리에 40px 규칙도 있으나 뒤쪽 .85rem(13.6px)이 최종 */
  .nav .btn-primary{padding:.5rem .9rem;font-size:.85rem}
}
```
**인터랙션**: 드롭다운은 순수 CSS hover/focus-within. 모바일 햄버거 메뉴 **없음**(동일 레이아웃 축소). 스크롤 시 헤더 변화 **없음**(항상 sticky + blur).

### 5.1 Hero `#hero`
**목적**: 메인 메시지. 다크 배경, **좌측 정렬**, 이미지 없음(CSS 그리드 + 블루 글로우만).
```html
<section id="hero" class="section hero">
  <div class="wrap">
    <div class="reveal max-w-[880px] text-left">
      <h1 class="font-sans text-[clamp(1.6rem,8.5vw,2.4rem)] font-bold leading-[1.25] tracking-[-0.02em] sm:text-[clamp(2.4rem,5.4vw,4rem)]">
        <span class="block">사내 <span class="hero-hl">데이터 보안</span> 걱정 없이</span>
        <span class="block"><span class="hero-hl">AI</span> 자동화 시작하세요</span>
      </h1>
      <p class="mt-10 text-[clamp(1.05rem,1.9vw,1.4rem)] font-medium leading-relaxed text-paper/85">
        국내 대표 엑셀러레이터 <span class="hero-hl">Primer</span>가 검증한 '스타트업을 위한 AX 교육'</p>
      <div class="mt-14 flex justify-start">
        <a href="/apply" class="btn btn-primary btn-lg">사전예약 신청</a>
      </div>
    </div>
  </div>
</section>
```
```css
.hero{min-height:74vh;color:var(--paper);background:#06070b;display:flex;align-items:center;
  padding-top:clamp(1.5rem,5vh,3.5rem);padding-bottom:clamp(1.5rem,5vh,3.5rem);position:relative;overflow:clip}
.hero:before{content:"";pointer-events:none;position:absolute;inset:0;
  background:radial-gradient(42% 44% at 96% 108%,#1124524d 0%,#0000 60%),radial-gradient(48% 44% at 85% 10%,#1e3a8259 0%,#0000 60%)}
.hero:after{content:"";pointer-events:none;position:absolute;inset:0;
  background-image:linear-gradient(#ffffff09 1px,#0000 1px),linear-gradient(90deg,#ffffff09 1px,#0000 1px);background-size:54px 54px;
  -webkit-mask-image:radial-gradient(75% 65% at 45% 55%,#000 0%,#0000 80%);mask-image:radial-gradient(75% 65% at 45% 55%,#000 0%,#0000 80%)}
.hero>*{z-index:1;position:relative}
.hero .wrap{width:100%}
.hero-hl{color:#5b9bff}
```
**애니메이션**: `.reveal` 페이드업(아래 6장). 우상단/우하단에 은은한 네이비 글로우, 중앙에 54px 격자(마스크로 가장자리 소멸).
**반응형**: H1 모바일 `clamp(1.6rem,8.5vw,2.4rem)` → sm 이상 최대 4rem(64px).

### 5.2 신뢰 스트립 (hero 직후)
```html
<div class="border-y border-rule bg-[#F7F9FD]">
  <div class="wrap flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 py-3.5 text-center text-sm">
    <span class="font-bold text-signal-text">수강생 만족도 4.7 / 5</span>
    <span class="hidden h-3 w-px bg-rule sm:inline-block" aria-hidden="true"></span>
    <span class="text-mute">AX아카데미 1·2기 47명 수강</span>
    <span class="hidden h-3 w-px bg-rule sm:inline-block" aria-hidden="true"></span>
    <span class="text-ink">농협·현대차·슈피겐 임원 AX 교육 진행</span>
  </div>
</div>
```
모바일에서는 구분선 숨김 + 줄바꿈.

### 5.3 교육 혜택 `#benefits` (`.section.offer-pre`)
**레이아웃**: `max-w-[980px]` 세로 스택(`gap-16 md:gap-24`), 각 행 `grid md:grid-cols-2 gap-8 md:gap-12 items-center`, **2번째 행은 좌우 반전**(`md:order-2` / `md:order-1`). 모바일: 텍스트 중앙정렬 → 목업.
```html
<section id="benefits" class="section offer-pre">
 <div class="wrap">
  <div class="section-head"><h2>AX 아카데미 교육 혜택</h2></div>
  <div class="mx-auto mt-8 flex max-w-[980px] flex-col gap-16 md:mt-12 md:gap-24">
   <!-- 행 -->
   <div class="reveal grid items-center gap-8 md:grid-cols-2 md:gap-12">
     <div class=""><!-- 2행은 class="md:order-2" -->
       <div class="text-center md:text-left md:max-w-[440px] "><!-- 2행: + md:ml-auto -->
         <span class="inline-flex items-center gap-2 font-mono text-sm font-semibold text-signal-text">
           <span class="h-1.5 w-1.5 rounded-full bg-signal"></span>강의 다시보기 제공</span>
         <h3 class="font-sans mt-4 whitespace-pre-line text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-[1.3] tracking-[-0.02em]">강의 후\n다시보기 영상 제공</h3>
         <p class="mt-4 whitespace-pre-line leading-relaxed text-mute">놓친 부분도, 복습도 걱정 없이.\n강의 녹화본을 전달해 언제든 다시 볼 수 있습니다.</p>
       </div>
     </div>
     <div class="flex justify-center md:justify-end"><!-- 2행: md:order-1 md:justify-start --> [목업] </div>
   </div>
  </div>
 </div>
</section>
```
**행 데이터**
1. 라벨 "강의 다시보기 제공" / H3 "강의 후\n다시보기 영상 제공" / 목업 = **Slack 채널 메시지 카드(다크)**
2. 라벨 "AXHub 사용 권한" / H3 "앱 배포·관리 플랫폼\nAXHub 사용 권한" / 본문 "교육에서 만든 앱을 보안·거버넌스 환경이\n갖춰진 플랫폼 AXHub에 배포합니다." / 목업 = `/axhub-ui.png`(1276×794) in `w-full max-w-[440px] overflow-hidden rounded-2xl border border-rule bg-white shadow-[0_24px_60px_-30px_rgba(16,24,40,0.3)]`
3. 라벨 "AX 맞춤 컨설팅" / H3 "교육 후에도\nAX 맞춤 컨설팅까지" / 본문 "교육으로 끝나지 않습니다. 우리 회사 상황에 맞춘 AX 도입 컨설팅으로 실제 적용까지 함께합니다." / 목업 = 3단계 체크카드

**목업 1 — Slack 카드 (전체 원문 클래스)**
```html
<div class="w-full max-w-[440px] overflow-hidden rounded-2xl bg-[#1A1D21] shadow-[0_24px_60px_-26px_rgba(16,24,40,0.55)] ring-1 ring-white/5">
  <div class="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
    <div class="flex min-w-0 items-center gap-2">
      <span class="text-sm text-[#ABABAD]">☆</span>
      <span class="flex min-w-0 items-center gap-1 text-[15px] font-bold text-white">
        <span class="text-[13px] text-[#ABABAD]">🔒</span><span class="truncate">ax아카데미-1기</span><span class="text-[#ABABAD]">⌄</span></span>
    </div>
    <span class="flex shrink-0 items-center gap-1 rounded-md bg-white/[0.05] px-2 py-1 text-xs text-[#D1D2D3]"><span>👤</span> 44</span>
  </div>
  <div class="px-4 py-3.5">
    <div class="relative my-1 flex items-center justify-center">
      <span class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10"></span>
      <span class="relative rounded-full border border-white/15 bg-[#1A1D21] px-3 py-0.5 text-xs font-bold text-[#D1D2D3]">5월 16일 토요일</span>
    </div>
    <div class="mt-3 flex gap-3">
      <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#4A154B] text-sm font-bold text-white">AX</span>
      <div class="min-w-0 flex-1">
        <div class="flex items-baseline gap-2"><span class="text-[15px] font-extrabold text-white">조코딩AX파트너스</span><span class="text-xs text-[#ABABAD]">오후 6:23</span></div>
        <p class="mt-0.5 text-[15px] leading-[1.5] text-[#D1D2D3]"><span class="rounded bg-[#f2c744]/15 px-1 font-medium text-[#e8b339]">@channel</span> [강의 녹화본 전달]</p>
        <p class="text-[15px] leading-[1.5] text-[#D1D2D3]">안녕하세요!</p>
        <p class="text-[15px] leading-[1.5] text-[#D1D2D3]"><span class="cursor-pointer text-[#1d9bd1] hover:underline">녹화본</span> 전달드립니다 🙂</p>
        <p class="text-[15px] leading-[1.5] text-[#D1D2D3]">질문사항이 있다면 언제든 연락주세요!</p>
        <div class="mt-2 flex items-center gap-1.5">
          <span class="inline-flex items-center gap-1.5 rounded-md border border-[#1d9bd1]/60 bg-[#1d9bd1]/15 px-2 py-0.5 text-xs font-semibold text-[#1d9bd1]"><span>❤️</span> 4</span>
          <span class="… 동일 …"><span>👍</span> 4</span>
          <span class="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-1 text-[#ABABAD]"><span class="text-sm leading-none">☺</span><span class="text-[10px] font-bold leading-none">+</span></span>
        </div>
      </div>
    </div>
  </div>
</div>
```
**목업 3 — 컨설팅 카드**
```html
<div class="w-full max-w-[440px] rounded-2xl border border-rule bg-white p-6 shadow-[0_24px_60px_-30px_rgba(16,24,40,0.3)]">
  <div class="flex items-center justify-between">
    <span class="font-mono text-sm font-semibold text-signal-text">AX 1:1 컨설팅</span>
    <span class="rounded-full bg-signal/10 px-2.5 py-1 text-xs font-semibold text-signal-text">맞춤</span>
  </div>
  <div class="mt-4 space-y-2.5">
    <div class="flex items-center gap-3 rounded-xl border border-rule bg-[#F7F9FD] px-4 py-3">
      <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-signal text-xs font-bold text-white">01</span>
      <span class="text-sm font-semibold text-ink">우리 회사 현황 진단</span></div>
    <!-- 02 맞춤 AX 도입 로드맵 / 03 실제 적용까지 실행 지원 -->
  </div>
  <div class="mt-3 flex items-center gap-1.5 text-xs font-semibold text-green-600"><span>✓</span> 교육 수료 후 제공</div>
</div>
```

### 5.4 가치 요약 `#value` (`.section.section-dark !py-12 md:!py-16`)
패딩을 `!py-12`(48px) / `md:!py-16`(64px)으로 축소한 다크 밴드. 헤드 `!mb-8 md:!mb-10`.
```html
<section id="value" class="section section-dark !py-12 md:!py-16">
 <div class="wrap">
  <div class="section-head !mb-8 md:!mb-10"><h2 class="whitespace-pre-line">3주에 이만큼 배우고,\n이만큼 남깁니다</h2></div>
  <div class="mx-auto grid max-w-[1160px] gap-5 md:grid-cols-3">
   <ul class="grid content-start gap-3.5">
    <li class="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
      <svg viewBox="0 0 24 24" fill="none" class="mt-0.5 h-5 w-5 flex-none text-signal"><circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15"/><path d="m8 12 2.5 2.5L16 9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="min-w-0">
        <div class="font-sans text-base font-bold leading-snug text-paper/90 md:text-lg">Claude Code 기초</div>
        <div class="mt-1 text-sm leading-snug text-paper/60">이론 · CLAUDE.md · MCP를 직접 실습</div>
      </div>
    </li> …
```
3개 `<ul>` 열 × 5개 항목: (1열) Claude Code 기초 / Skills · Sub-agents · Hook 활용 / 하네스 엔지니어링 / 회사 전용 AI 워크플로우 설계 / 우리 회사 Agent 구축 — (2열) 내 업무용 AI 워크플로우 / 사내 AI 에이전트 / 재현 가능한 나만의 셋업 / 스스로 도구를 만드는 힘 — (3열) AXHub 사용 권한 / AX 1:1 맞춤 컨설팅 / 강의 다시보기 영상 / 단톡방 Q&A 지원 / 데이터 거버넌스 구축. (이 섹션엔 reveal 없음)

### 5.5 문제 인식 `#problem` (`.section.cone-section`) — 찢어진 종이
```css
.cone-section{color:var(--paper);background:#060810;position:relative;overflow:hidden}
.torn-paper{padding:1.45rem 2.15rem;position:relative}
.torn-paper__sheet{position:absolute;inset:0;
  filter:url(#paper-torn) drop-shadow(0 22px 30px #00000080) drop-shadow(0 2px 5px #0000008c);
  background-color:#f4f3ed;
  background-image:linear-gradient(118deg,#0000000e 0%,#0000 15% 56%,#0000000d 75%,#0000 88%),
    linear-gradient(252deg,#0000000b 0%,#0000 22%),
    radial-gradient(130% 120% at 22% -12%,#0000000f,#0000 50%),
    radial-gradient(90% 70% at 82% 112%,#0000000e,#0000 58%)}
.torn-paper__text{z-index:1;position:relative}
.torn-paper__hl{color:var(--ink);font-weight:800}
.dot-trail{display:flex;flex-direction:column;align-items:center;gap:8px}
.dot-trail span{background:#fff6;border-radius:999px;width:7px;height:7px}
```
SVG 필터(섹션 내 인라인, 0×0):
```html
<svg class="absolute h-0 w-0" aria-hidden="true" focusable="false"><defs>
  <filter id="paper-torn" x="-6%" y="-25%" width="112%" height="150%">
    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.022" numOctaves="4" seed="7" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="13" xChannelSelector="R" yChannelSelector="G"/>
  </filter></defs></svg>
```
구조:
```html
<div class="wrap relative z-[1]">
  <div class="section-head">
    <h2>ChatGPT·Claude·Gemini</h2>
    <p class="mt-1 text-[clamp(1.35rem,2.6vw,1.9rem)] font-bold text-paper/95">AI를 업무에 어떻게 사용하고 계신가요?</p>
  </div>
  <div class="reveal mx-auto mt-2 flex max-w-[720px] flex-col items-center gap-0">
    <div class="torn-paper relative z-[3] -rotate-2 -translate-x-4 sm:-translate-x-16">
      <div class="torn-paper__sheet"></div>
      <p class="torn-paper__text whitespace-nowrap text-[13px] font-bold text-ink sm:text-[clamp(1.05rem,1.9vw,1.3rem)]"><span class="torn-paper__hl">필요할 때마다</span> 물어보는 용도로 쓴다</p>
    </div>
    <div class="torn-paper relative z-[2] -mt-2 rotate-[1.5deg] translate-x-5 sm:-mt-2 sm:translate-x-24"> … <span class="torn-paper__hl">복붙으로 끝?</span> 내 업무에 녹아들지 않는다</div>
    <div class="torn-paper relative z-[1] -mt-2 -rotate-1 -translate-x-1 sm:-mt-2 sm:-translate-x-2"> … <span class="torn-paper__hl">나만 쓰고</span>, 팀에는 전파되지 않는다</div>
    <div class="dot-trail mt-7"><span></span><span></span><span></span></div>
    <div class="reveal mt-10 text-center sm:mt-14">
      <p class="text-[clamp(1.2rem,2.6vw,1.6rem)] text-paper/45">AI, 분명 쓰고는 있는데…</p>
      <p class="mt-2 text-[clamp(1.3rem,3vw,2rem)] font-bold text-paper">왜 늘 '이 정도'에서 멈출까요?</p>
    </div>
  </div>
</div>
```
종이 3장이 서로 -8px 겹치며(-mt-2) 회전(-2deg / 1.5deg / -1deg), 좌우 오프셋(sm: -64px / +96px / -8px)으로 엇갈림. 텍스트 13px(모바일) → clamp(1.05rem,1.9vw,1.3rem).

### 5.6 해결책 `#solution` (`.section.cone-section`) — 원뿔 빛
```html
<section id="solution" class="section cone-section">
  <div class="cone-horizon"></div><div class="cone-glow"></div><div class="cone-grid"></div>
  <div class="wrap relative z-[1]">
    <div class="section-head">
      <h2>단순 도구가 아니라<br/><span class="sig">'쓰는 법'</span>을 익혀야합니다</h2>
      <p class="section-sub">기초 개념 → 핵심 기능 활용 → 하네스 기반 바이브코딩까지, 3주에 걸쳐 단계별로.</p>
    </div>
    <div class="reveal reveal-stagger mx-auto grid max-w-[880px] grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-5">
      <div class="rounded-xl border border-white/12 bg-white/[0.05] p-3.5 backdrop-blur-sm sm:rounded-2xl sm:p-6">
        <div class="font-mono text-xs font-semibold text-[#5B9BFF] sm:text-sm">01</div>
        <h3 class="font-sans mt-2 text-sm font-bold leading-snug text-white sm:mt-3 sm:text-xl">Claude Code 기초</h3>
        <p class="mt-1.5 text-xs leading-relaxed text-white/65 sm:mt-3 sm:text-base">이론, CLAUDE.md, MCP를 이해하고 직접 실습합니다.</p>
      </div>
      <!-- 02 Claude Code 활용 / Skills · Sub-agents · Hook 기반 활용을 실습으로 익힙니다. -->
      <!-- 03 실전 하네스 엔지니어링 / 개념부터 개발 환경 세팅, 고도화까지 직접 만들어봅니다. -->
    </div>
  </div>
  <div class="cone-fade"></div>
</section>
```
```css
.cone-glow{clip-path:polygon(8% 0,92% 0,50% 100%);pointer-events:none;
  background:radial-gradient(56% 78% at 50% 100%,#2563eb80 0%,#2563eb29 42%,#0000 72%);
  width:150%;height:92%;position:absolute;bottom:-8%;left:50%;transform:translate(-50%)}
.cone-grid{pointer-events:none;position:absolute;inset:0;
  background-image:linear-gradient(#7da0ff14 1px,#0000 1px),linear-gradient(90deg,#7da0ff14 1px,#0000 1px);background-size:44px 44px;
  mask-image:radial-gradient(54% 70% at 50% 100%,#000 0%,#0000 74%)}
.cone-fade{pointer-events:none;z-index:2;position:absolute;bottom:0;left:0;right:0;height:56%;
  background:linear-gradient(#0000 0%,#5b9bff0a 16%,#74a8ff1f 34%,#a0c3ff42 52%,#c8dbf980 68%,#e4eefcc7 82%,#f4f8fdf2 93%,#fff 100%)}
.cone-horizon{pointer-events:none;z-index:0;position:absolute;top:0;left:0;right:0;height:220px;
  background:radial-gradient(60% 100% at 50% 0,#5b9bff1a 0%,#0000 70%),linear-gradient(#ffffff06 0%,#0000 100%)}
.cone-horizon:before{content:"";position:absolute;top:0;left:50%;transform:translate(-50%);width:min(880px,84%);height:1px;
  background:linear-gradient(90deg,#0000,#5b9bff80,#0000);box-shadow:0 0 18px 1px #5b9bff59}
```
효과: 상단에 빛나는 수평선, 아래쪽에서 위로 퍼지는 역삼각형(원뿔) 블루 빛 + 격자, 섹션 하단 56%가 흰색으로 페이드 → 다음 흰 섹션(`#who`)과 이음매 없이 연결. 주의: `.cone-fade`가 z-index:2라 카드 하단 위에도 덮임(카드는 wrap z-[1]) — 카드가 은은히 밝아지는 효과.

### 5.7 대상 `#who` (`.section`, 흰색)
```html
<div class="section-head"><h2>이런 분들을 위해 저희가 준비했습니다</h2></div>
<div class="reveal reveal-stagger grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-6">
  <div class="rounded-xl border border-rule bg-white p-3.5 shadow-[0_16px_32px_-20px_rgba(16,24,40,0.14)] sm:rounded-2xl sm:p-7">
    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-signal/10 text-signal sm:h-16 sm:w-16 sm:rounded-2xl">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 sm:h-9 sm:w-9">…</svg></div>
    <h3 class="font-sans mt-3 text-sm font-bold leading-snug sm:mt-6 sm:text-lg">반복 업무를 자동화하고 싶은 대표·사업자</h3>
    <p class="mt-1.5 text-xs leading-relaxed text-mute sm:mt-3 sm:text-base">영업·발주·고객관리 등 반복 업무를 AI로 자동화하고 싶은 대표·사업자.</p>
  </div>
  <!-- 2: 사람 아이콘(circle cx12 cy8 r3.6 + path M5 20a7 7 0 0 1 14 0) "우리 회사 데이터로 AI 비서를 만들고 싶은 분" -->
  <!-- 3: 반짝임 아이콘(path M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3Z) "직접 만들어 팀에 확산하고 싶은 분" -->
</div>
```
아이콘1 SVG: `<rect x="4" y="3" width="10" height="18" rx="1.2"/><path d="M14 8h5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-5"/><path d="M7.5 7h3M7.5 11h3M7.5 15h3M17 12h0M17 16h0"/>` (빌딩).

### 5.8 인용 `#intro` (`.intro-quote`) — 스크롤 clip-path 확장
```html
<section id="intro" class="intro-quote">
  <div class="intro-quote-frame"><div class="intro-quote-bg"></div><div class="intro-quote-overlay"></div></div>
  <div class="intro-quote-content reveal">
    <h2 class="font-sans whitespace-pre-line text-[clamp(1.5rem,3.4vw,2.4rem)] font-bold leading-[1.4] tracking-[-0.02em] text-white">"교육을 통해 사내 직원만 볼 수 있는\n회사 대시보드를 만들었습니다."</h2>
    <p class="mt-5 text-[clamp(0.92rem,1.4vw,1.1rem)] font-semibold text-white/85">1기를 수강하신 프라이머 클럽팀 이○주 대표님의 후기입니다.</p>
  </div>
</section>
```
```css
.intro-quote{display:flex;justify-content:center;align-items:center;height:clamp(440px,72vh,760px);position:relative;overflow:hidden}
.intro-quote-frame{--side:calc(20% * (1 - var(--reveal,0)));--r:calc(26px * (1 - var(--reveal,0)));
  clip-path:inset(0 var(--side) round var(--r));will-change:clip-path;position:absolute;inset:0}
.intro-quote-bg{background:url(/edu.jpeg) 50%/cover no-repeat,#0b1220;position:absolute;inset:0}
.intro-quote-overlay{background:linear-gradient(#06080e80 0%,#06080ead 100%);position:absolute;inset:0}
.intro-quote-content{z-index:2;text-align:center;max-width:600px;margin-inline:auto;padding-inline:1.5rem;position:relative}
@media (max-width:1023px){.intro-quote-frame{clip-path:none}}
@media (prefers-reduced-motion:reduce){.intro-quote-frame{clip-path:none}}
```
JS (원문 `Intro` 컴포넌트):
```js
useEffect(()=>{const t=ref.current, s=t?.querySelector(".intro-quote-frame"); if(!t||!s)return;
 if(matchMedia("(prefers-reduced-motion: reduce)").matches) return void s.style.setProperty("--reveal","1");
 let a=0; const n=()=>{a=0; const e=t.getBoundingClientRect(), vh=innerHeight||1;
   const r=Math.min(Math.max((vh-e.top)/(.7*vh),0),1); s.style.setProperty("--reveal",r.toFixed(3))};
 const r=()=>{a||(a=requestAnimationFrame(n))};
 n(); addEventListener("scroll",r,{passive:true}); addEventListener("resize",r);
 return ()=>{removeEventListener("scroll",r);removeEventListener("resize",r);cancelAnimationFrame(a)}},[]);
```
동작: 섹션 top이 뷰포트 하단에 닿을 때 reveal=0(좌우 각 20% 잘리고 모서리 26px 둥근 카드 형태) → 섹션 top이 뷰포트 30% 지점에 오면 reveal=1(풀블리드, radius 0). lg 미만에서는 항상 풀블리드. 배경 사진 `/edu.jpeg`(교육 현장 사진, 크기 미확인).

### 5.9 교육 방식 `#method` (`.section`, 흰색)
```html
<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
  <div class="reveal">
    <h2 class="font-sans whitespace-pre-line text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold leading-[1.22] tracking-[-0.03em] text-ink">검증 받은 AX 아카데미 교육을 제공해드립니다</h2>
    <div class="mt-9 flex flex-nowrap gap-x-4 sm:gap-x-8">
      <div class=""><div class="font-sans whitespace-nowrap text-[clamp(1.15rem,5.5vw,1.9rem)] font-bold leading-none text-signal-text">47명</div>
        <div class="mt-1.5 text-[11px] leading-snug text-mute sm:text-sm">1·2기 수강</div></div>
      <div class="border-l border-rule pl-4 sm:pl-8"> 4.7 / 5 · 수강생 만족도 </div>
      <div class="border-l border-rule pl-4 sm:pl-8"> 20곳+ · 농협·현대차·슈피겐 등 기업 AX 교육 </div>
    </div>
  </div>
  <div class="relative">
    <div class="reveal reveal-stagger grid gap-6 [grid-auto-rows:1fr]">
      <div class="flex h-full min-h-[140px] items-center rounded-3xl bg-white p-7 shadow-[0_10px_34px_rgba(31,58,102,0.10)] lg:w-[92%] lg:mr-auto"><!-- 짝수: lg:ml-auto -->
        <div class="flex items-start gap-5">
          <div class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-signal/10 text-signal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7">…</svg></div>
          <div>
            <h3 class="font-sans whitespace-pre-line text-[1.15rem] font-bold leading-snug tracking-[-0.01em] text-ink">AXHub로 교육과정부터\n사내 데이터를 안전하게</h3>
            <p class="mt-2 whitespace-pre-line text-[0.95rem] leading-relaxed text-mute">링크만 알면 누구나 들어오는 개인 배포와 달리,\n보안·거버넌스 환경이 갖춰진 앱을 통해 사내 구성원에게만 열립니다.</p>
          </div></div></div>
      …
```
4카드(lg에서 92% 폭, 좌/우/좌/우 지그재그): ①방패체크 "AXHub로 교육과정부터 사내 데이터를 안전하게" ②코드 `<>` "보는 강의 X, 하는 실습" ③순환화살표 "회사 전용 AI 워크플로우" ④과녁 "내 상황에 맞춘 교육방식".

### 5.10 고민 `#why` (`.section.section-gray`)
```html
<div class="section-head"><h2>AI 도입, 이런 고민때문에 멈춰 계셨나요?</h2></div>
<div class="reveal reveal-stagger grid gap-6 md:grid-cols-3">
  <div class="card">
    <h3 class="font-sans text-lg font-bold leading-snug"><span class="text-signal">"</span>회사 데이터, 외부 AI에 넣어도 될까<span class="text-signal">"</span></h3>
    <p class="mt-3 leading-relaxed text-mute">직원들이 검증 안 된 AI 툴에 사내 자료를 올리는 게 늘 불안합니다.</p>
  </div>
  <!-- "도입은 해야 하는데, 어디서부터" / "나만 쓰고, 팀엔 안 퍼져요" -->
</div>
```
hover: `.card:hover` (보더 블루 30%, -2px, 블루 그림자).

### 5.11 거버넌스 `#governance` (`.section.offer-pre` → 배경 `#fff`)
```html
<div class="section-head"><h2>AXHub와 함께 교육에서 만든 AI 앱을 사내에 쉽고 안전하게 배포·운영합니다</h2></div>
<div class="mx-auto grid max-w-[1080px] items-center gap-10 md:grid-cols-2">
  <ol class="reveal reveal-stagger">
    <li class="relative flex gap-5 pb-9 last:pb-0">
      <span class="absolute bottom-0 left-[23px] top-12 w-px bg-rule"></span><!-- 마지막 li에는 없음 -->
      <div class="relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-signal font-mono text-base font-bold text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.6)]">1</div>
      <div class="pt-1.5">
        <div class="font-mono text-sm font-semibold tracking-wide text-signal">01</div>
        <h3 class="font-sans mt-1 text-xl font-bold leading-snug">교육에서 앱 제작</h3>
        <p class="mt-2 text-base leading-relaxed text-mute">실무에 바로 쓰는 회사 전용 AI 앱을 직접 만들며 익힙니다.</p>
      </div>
    </li>
    <!-- 2 AXHub로 쉽게 배포 / 3 사내 전용 운영·거버넌스 -->
  </ol>
  <div class="reveal">
    <img src="/axhub-ui.png" width="1276" height="794" class="w-full rounded-2xl border border-rule shadow-[0_24px_60px_-30px_rgba(16,24,40,0.35)]"/>
    <div class="mx-auto mt-5 flex max-w-fit flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-signal/20 bg-signal/[0.06] px-4 py-2">
      <span class="font-mono text-[13px] font-bold text-signal-text sm:text-base">AXHub</span>
      <span class="whitespace-nowrap text-[13px] text-mute sm:text-base">사내에 앱을 쉽게 배포하는 보안·거버넌스 플랫폼</span>
    </div>
  </div>
</div>
```

### 5.12 파트너 `#partners` (`.section`) — 로고 마퀴
```html
<div class="reveal mx-auto max-w-[620px] text-center">
  <a href="https://jocodingax.ai" target="_blank" class="inline-block transition-opacity hover:opacity-80">
    <img src="/logos/jocodingaxpartners_logo.png" class="mx-auto h-11 w-auto sm:h-16"/></a>
  <h2 class="font-sans mt-12 text-[clamp(1.7rem,3.6vw,2.5rem)] font-bold leading-tight tracking-[-0.025em] text-balance">대기업이 선택한 AI 파트너</h2>
  <ul class="mx-auto mt-12 flex max-w-[480px] flex-col gap-3 text-left">
    <li class="flex items-start gap-3">
      <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/10 text-xs font-bold text-signal-text">✓</span>
      <span class="text-[17px] leading-relaxed text-ink">AX아카데미 1·2기 수강생 만족도 4.7 / 5</span></li>
    <!-- 1:1 수강생 관리 세션으로 결과물 도출 / 농협·현대차·슈피겐 임원진 등 기업 AX 교육 진행 -->
  </ul>
</div>
<div class="mt-14">
  <div class="marquee reveal" role="img" aria-label="…">
    <div class="marquee-track">
      <img src="/brand-logos/google.png" class="marquee-logo"/> … (20개) … + 동일 20개 복제(aria-hidden)
    </div>
  </div>
</div>
```
```css
.marquee{width:100%;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,#0000,#000 6% 94%,#0000);mask-image:linear-gradient(90deg,#0000,#000 6% 94%,#0000)}
.marquee-track{display:flex;align-items:center;width:max-content;animation:36s linear infinite marqueeScroll}
.marquee:hover .marquee-track{animation-play-state:paused}
.marquee-logo{object-fit:contain;flex:none;width:auto;max-width:7.5rem;height:2.4rem;margin-right:clamp(2rem,4vw,3rem)}
@media (max-width:640px){.marquee-logo{max-width:5.5rem;height:1.6rem;margin-right:1.5rem}}
@keyframes marqueeScroll{0%{transform:translate(0)}to{transform:translate(-50%)}}
@media (prefers-reduced-motion:reduce){.marquee-track{flex-wrap:wrap;justify-content:center;row-gap:2rem;animation:none}}
```
로고 순서(경로): google.png, openai.png, kakaopay-securities.png, musinsa.png, myrealtrip.png, meditherapy.png, channeltalk.png, pwc.png, celltrion.png, nh-its-plain.webp, hoban.png, nia.png, primer.png, spigen.png, seon.png, eland-plain.svg, strong-ventures.png, likelion-plain.webp, fastcampus-plain.webp, groupby.webp (모두 `/brand-logos/`). 컬러 로고 그대로(그레이스케일 필터 없음).

### 5.13 커리큘럼 `#curriculum` (`.section.section-gray`) — 가장 복잡
**구성**: (A) 4열 카드 타임라인 → (B) 2열: 좌 노트북 목업(sticky) / 우 탭 + 패널.
```html
<div class="section-head reveal"><h2>3주만에 사내 AI도구 구축하기(AX 1:1 컨설팅 포함)</h2></div>
<ul class="curri-grid reveal">
  <li class="curri-card clickable current" role="button" tabindex="0">
    <div class="cc-body">
      <ul class="cc-sum" role="list"><li>바이브코딩·STICC 기초</li><li>AXHub 세팅</li><li>첫 실무 리포트 제작</li></ul>
      <h3 class="cc-topic">Claude Code 기초 &amp; 나의 첫 실무 앱</h3>
    </div>
    <div class="cc-node"><span class="cc-badge">1주차</span></div>
  </li>
  <li class="curri-card clickable"> 불편함 발굴 / STICC로 PRD·skill / 와이어프레임 확정 — "내 자동화 도구 기획·설계" — 2주차</li>
  <li class="curri-card clickable"> goal 자율 구현 / AXHub에 내 도구 배포 / 내 도구 고도화 — "AI 자율 구현 & AXHub 사내 배포" — 3주차</li>
  <li class="curri-card climax"> 교육 완료 후 신청하여 진행 · 완성한 도구와 우리 회사 상황에 맞춘 AX 도입 컨설팅 — "AX 1:1 컨설팅" — 교육 후 (클릭 불가, 배지 블루)</li>
</ul>
<div class="curri-demo reveal">
  <figure class="laptop cds-stage">
    <div class="laptop-screen">
      <span class="laptop-notch"></span>
      <div class="laptop-viewport"> [데모 컴포넌트 — 730×456.25 고정 캔버스를 scale] </div>
    </div>
    <div class="laptop-base"></div>
    <figcaption class="laptop-caption">STICC 지시로 만든 첫 실무 리포트 — skill로 저장해 재사용</figcaption>
  </figure>
  <div class="cds-accordion">
    <div class="cds-tabs" role="tablist">
      <button role="tab" aria-selected="true" class="cds-tab current">1주차</button>
      <button role="tab" class="cds-tab">2주차</button>
      <button role="tab" class="cds-tab climax">3주차</button>
    </div>
    <div class="cds-panel" role="region">
      <div class="cds-panel-head"><span class="acc-badge">1주차</span><span class="acc-title">Claude Code 기초 &amp; 나의 첫 실무 앱</span></div>
      <p class="acc-lead">바이브코딩·STICC부터 첫 실무 리포트까지, 기초를 잡습니다</p>
      <p class="acc-quote">AI에게 일을 맡기는 기본기 — 바이브코딩 개념과 STICC 컨텍스트 전달부터.</p>
      <ul class="acc-bullets" role="list">
        <li class="acc-bullet"><span class="cd-n">01</span><span>바이브코딩·STICC 기초 — …</span></li> …
      </ul>
      <p class="acc-banner"><span class="acc-banner-pip">!</span>실습 환경을 본인 계정에 동일하게 세팅합니다. …</p>
    </div>
  </div>
</div>
```
**CSS (원문)**
```css
.curri-grid{grid-template-columns:repeat(4,1fr);gap:clamp(.6rem,1.5vw,1.2rem);padding:0;list-style:none;display:grid;position:relative}
.curri-card{z-index:1;box-shadow:none;background:0 0;border:0;flex-direction:column;padding:0;display:flex;position:relative}
.cc-body{text-align:center;border:1px solid var(--rule);transition:border-color .2s var(--ease), box-shadow .2s var(--ease), transform .2s var(--ease);background:#fff;border-radius:14px;flex-direction:column;flex:1;gap:.55rem;padding:clamp(1rem,2vw,1.5rem);display:flex;box-shadow:0 4px 16px #0000000d}
.curri-card.clickable{cursor:pointer}
.curri-card.clickable:hover .cc-body{border-color:var(--signal);transform:translateY(-3px);box-shadow:0 10px 26px #2563eb24}
.curri-card.current .cc-body{border-color:var(--ink);box-shadow:0 6px 20px #1a1a1a26}
.cc-node{justify-content:center;align-items:center;height:64px;display:flex;position:relative}
.cc-badge{z-index:1;background:var(--ink);color:#fff;font-family:var(--font-display);letter-spacing:.02em;border-radius:999px;display:inline-flex;justify-content:center;align-items:center;padding:.45rem 1.1rem;font-size:clamp(.82rem,1.3vw,1rem);font-weight:700;position:relative;box-shadow:0 5px 14px #0003}
.curri-card.free .cc-badge,.curri-card.climax .cc-badge{background:var(--signal)}
.curri-grid:after{content:"";background:var(--rule);z-index:0;opacity:0;height:2px;transition:opacity .4s var(--ease) .25s;position:absolute;bottom:32px;left:10%;right:10%}  /* 배지들을 잇는 가로선 */
.curri-grid.in:after{opacity:1}
.curri-grid.reveal{opacity:1;transition:none;transform:none}
.curri-grid .curri-card{opacity:0}
@keyframes curriCardIn{0%{opacity:0}to{opacity:1}}
.curri-grid.in .curri-card{opacity:1;animation:curriCardIn .5s var(--ease) backwards}
.curri-grid.in .curri-card:nth-child(2){animation-delay:.12s}  /* 1:0s, 3:.24s, 4:.36s */
.cc-sum{color:var(--mute);display:flex;flex-direction:column;gap:.3rem;margin:0;padding:0;font-size:clamp(.82rem,1.05vw,.95rem);font-weight:700;line-height:1.45;list-style:none}
.cc-topic{border-top:1px solid var(--rule);font-family:var(--font-display);color:var(--ink);margin-top:auto;padding-top:.85rem;font-size:clamp(1.02rem,1.6vw,1.3rem);font-weight:700;line-height:1.25}
.curri-demo{display:grid;grid-template-columns:minmax(0,2.1fr) minmax(0,1fr);align-items:start;gap:clamp(1.4rem,3vw,2.4rem);margin-top:clamp(4rem,9vh,7rem)}
.cds-stage{width:100%;margin:0;position:sticky;top:84px}
.cds-accordion{display:flex;flex-direction:column;gap:.7rem;min-width:0}
.cds-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:.7rem;margin-bottom:.3rem}
.cds-tab{border:1px solid var(--rule);cursor:pointer;font-family:var(--font-display);color:var(--ink);transition:border-color .25s var(--ease), box-shadow .25s var(--ease), color .25s var(--ease);background:#fff;border-radius:14px;padding:clamp(.7rem,1.2vw,.9rem) .4rem;font-size:clamp(.88rem,1.2vw,1rem);font-weight:700}
.cds-tab:hover{border-color:var(--ink)}
.cds-tab.current{border-color:var(--signal);color:var(--signal);box-shadow:0 10px 30px -18px #2563eb73}
.cds-panel{border:1px solid var(--rule);animation:cdsPanelIn .28s var(--ease);background:#fff;border-radius:14px;padding:clamp(1.1rem,2vw,1.5rem) clamp(1rem,1.8vw,1.4rem)}
.cds-panel.climax{border-color:var(--signal)}
.cds-panel-head{display:flex;align-items:center;gap:.8rem;margin-bottom:.9rem}
@keyframes cdsPanelIn{0%{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.acc-badge{background:var(--ink);color:#fff;letter-spacing:.02em;border-radius:999px;flex:none;display:inline-flex;justify-content:center;align-items:center;min-width:3.4rem;padding:.35rem .7rem;font-size:.82rem;font-weight:700}
.acc-title{color:var(--ink);flex:1;font-size:clamp(1.05rem,1.6vw,1.28rem);font-weight:700;line-height:1.25}
.acc-lead{font-family:var(--font-display);color:var(--ink);margin:0 0 .5rem;font-size:clamp(.98rem,1.4vw,1.15rem);font-weight:700;line-height:1.35}
.acc-quote{color:var(--mute);border-left:2px solid var(--signal);margin:0 0 .9rem;padding-left:.8rem;font-size:clamp(.85rem,1.1vw,.95rem);line-height:1.5}
.acc-bullets{display:flex;flex-direction:column;margin:0;padding:0;list-style:none}
.acc-bullet{border-bottom:1px solid var(--rule);color:var(--ink);display:grid;grid-template-columns:2rem 1fr;gap:.8rem;padding:.7rem 0;font-size:clamp(.85rem,1.1vw,.95rem);line-height:1.5}
.acc-bullet:first-child{border-top:1px solid var(--rule)}
.cd-n{font-family:var(--font-body);color:var(--mute);letter-spacing:.02em;font-size:.82rem;font-weight:700}
.acc-banner{color:var(--ink);background:#2563eb0f;border:1px solid #2563eb2e;border-radius:10px;display:flex;align-items:flex-start;gap:.55rem;margin-top:.9rem;padding:.7rem .95rem;font-size:clamp(.8rem,1vw,.88rem);line-height:1.5}
.acc-banner.climax{background:#2563eb1a;border-color:#2563eb4d}
.acc-banner-pip{background:var(--signal);color:#fff;border-radius:50%;flex:none;display:inline-flex;justify-content:center;align-items:center;width:1.2rem;height:1.2rem;font-size:.7rem;font-weight:700}
/* Laptop */
.laptop{margin:0;display:flex;flex-direction:column;align-items:center;width:100%;max-width:1480px;margin-inline:auto}
.laptop-screen{background:#0b0b0d;border-radius:16px 16px 6px 6px;width:100%;padding:12px 12px 14px;position:relative;box-shadow:0 26px 54px -22px #00000080,inset 0 0 0 1px #ffffff0f}
.laptop-notch{z-index:2;background:#0b0b0d;border-radius:0 0 7px 7px;width:88px;height:7px;position:absolute;top:3px;left:50%;transform:translate(-50%)}
.laptop-notch:after{content:"";background:#20242b;border-radius:50%;width:5px;height:5px;position:absolute;top:1px;left:50%;transform:translate(-50%);box-shadow:inset 0 0 0 1px #ffffff14}
.laptop-viewport{aspect-ratio:16/10;background:#1c1b1a;border-radius:4px;width:100%;position:relative;overflow:hidden}
.laptop-viewport>*{transform-origin:0 0;width:730px;height:456.25px;position:absolute;top:0;left:0;transform:scale(var(--demo-scale,1))!important}
.laptop-base{background:linear-gradient(#e3e5e9 0%,#cccfd4 45%,#b3b6bc 100%);border-radius:3px 3px 11px 11px;width:106%;height:15px;margin-top:-1px;position:relative;box-shadow:0 16px 26px -14px #00000080,inset 0 1px #ffffffb3,inset 0 -2px 3px #00000029}
.laptop-base:before{content:"";background:#9a9ca1;border-radius:0 0 7px 7px;width:16%;height:5px;position:absolute;top:0;left:50%;transform:translate(-50%)}
.laptop-caption{font-family:var(--font-body);letter-spacing:.02em;color:var(--signal);text-align:center;margin-top:1.4rem;font-size:15px;font-weight:700}
@media (max-width:900px){.curri-demo{grid-template-columns:minmax(0,1fr);gap:1.6rem}.cds-stage{min-width:0;position:static}}
@media (max-width:1023px){.curri-grid{grid-template-columns:repeat(2,1fr)}.curri-grid:after{display:none}.cc-node{height:56px}}
@media (max-width:639px){  /* 모바일: 세로 타임라인 */
  .curri-grid{grid-template-columns:1fr;gap:0}
  .curri-card{flex-direction:column;align-items:stretch;padding-bottom:1.7rem;padding-left:1.9rem;position:relative}
  .curri-card:before{content:"";background:var(--rule);z-index:0;width:2px;position:absolute;top:.55rem;bottom:0;left:6px}
  .curri-card:last-child:before{display:none}
  .curri-card:after{content:"";background:var(--ink);width:15px;height:15px;box-shadow:0 0 0 1.5px var(--rule);z-index:1;border:3px solid #fff;border-radius:50%;position:absolute;top:.4rem;left:0}
  .curri-card.free:after,.curri-card.climax:after{background:var(--signal)}
  .cc-node{flex-direction:row;order:-1;justify-content:flex-start;align-items:center;gap:.6rem;height:auto;margin-bottom:.65rem}  /* 배지가 카드 위로 */
  .laptop-viewport{aspect-ratio:16/10;height:auto}
  .laptop-base{width:100%}
}
```
**인터랙션 / JS**
- `useState(0)` 선택 인덱스. 상단 카드(clickable, Enter/Space 키 지원) 또는 탭 클릭 시 변경. 패널과 figure에 `key=badge` → 바뀔 때마다 리마운트되어 `cdsPanelIn .28s` 재생.
- `--demo-scale` = `viewport.clientWidth / 730` (ResizeObserver로 갱신) → 730×456.25 고정 데모를 노트북 화면에 맞춰 축소.
- 3주차(`bannerVariant:"climax"`): 패널 보더 블루, 배너 진하게, pip 문자 `★`(기본 `!`).

**탭별 데이터**
| 탭 | lead | quote | bullets | demo | caption | banner |
|---|---|---|---|---|---|---|
| 1주차 | 바이브코딩·STICC부터 첫 실무 리포트까지, 기초를 잡습니다 | AI에게 일을 맡기는 기본기 — 바이브코딩 개념과 STICC 컨텍스트 전달부터. | 01 바이브코딩·STICC 기초 — Claude Code 작동 원리 + STICC(상황·작업·의도·우려·조정)로 정확히 지시 / 02 AXHub 세팅 — 실습 환경을 내 계정에 그대로 구성 / 03 첫 실무 리포트 제작 — 고객 리뷰·설문 응답 → 인사이트 리포트, skill로 저장해 재사용 | basics(리포트) | STICC 지시로 만든 첫 실무 리포트 — skill로 저장해 재사용 | 실습 환경을 본인 계정에 동일하게 세팅합니다. 수업이 끝나면 그대로 내 작업 환경으로 남습니다. |
| 2주차 | 내 불편함을 개선할 도구를, 직접 통제하며 설계합니다 | 만들기 전에 기획부터 — STICC로 PRD를 쓰고 그 절차를 skill로 재사용화. | 01 불편함 발굴 → 만들 사내 툴 선정 / 02 STICC로 PRD 작성 → PRD 생성 skill ①로 자산화 / 03 계획모드 → 아스키 와이어프레임 확정 | usage(와이어프레임+PRD) | STICC PRD · 계획모드로 확정한 사내 AI 비서 설계도 | 수업에서 만든 PRD·skill은 그대로 내 자산으로 쌓입니다. |
| 3주차 (climax) | "이게 내 도구다" — AI가 자율로 구현하고 AXHub에 배포합니다 | 검증가능한 goal을 주면 AI가 스스로 구현하고, AXHub에 배포한 뒤 고도화합니다. | 01 goal 자율 구현 — goal 설계 → goal-builder skill ② → /goal(auto-accept)로 스스로 구현 / 02 AXHub에 내 도구 배포 — 만든 도구를 사내에 배포(라이브 URL·공개 범위 관리) / 03 내 도구 고도화 — 디자인 다듬기 + MCP·Hooks·Git 안전망(위험 명령 차단·자동 검증·롤백) | capstone(인터랙티브 챗봇) | AXHub에 배포한 내 도구 — 사내 AI 비서 | 3주간 만든 결과물이 강의 자료가 아니라, 회사에서 매일 쓰는 도구로 남습니다. |

**데모 1 (basics) — 리포트** (SSR HTML 원문 그대로, 730×456 캔버스)
```html
<div class="flex h-full w-full flex-col bg-[#fbfcfe] px-[30px] py-[26px] text-[#14151a]">
  <div class="flex items-baseline justify-between border-b-[1.5px] border-[#eceef2] pb-3.5">
    <h3 class="text-[21px] font-extrabold tracking-[-.01em]">고객 리뷰 인사이트 리포트</h3>
    <span class="text-[12.5px] font-semibold text-[#8b909b]">리뷰 200건 · 2026.08</span></div>
  <div class="mt-5 grid flex-1 grid-cols-2 gap-x-[26px] gap-y-[22px]">
    <div><p class="mb-3 text-[12px] font-extrabold tracking-[.03em] text-[#6b7280]">감성 분석</p>
      <div class="flex items-center gap-[22px]">
        <div class="flex h-[104px] w-[104px] shrink-0 items-center justify-center rounded-full" style="background:conic-gradient(#2f6bff 0 68%, #f2647c 68% 100%)">
          <div class="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#fbfcfe] text-[20px] font-extrabold text-[#2f6bff]">68%</div></div>
        <div class="text-[13.5px] font-semibold">
          <div class="my-[7px] flex items-center gap-2"><span class="h-[11px] w-[11px] rounded-[3px] bg-[#2f6bff]"></span>긍정 68%</div>
          <div class="my-[7px] flex items-center gap-2"><span class="h-[11px] w-[11px] rounded-[3px] bg-[#f2647c]"></span>부정 32%</div></div></div></div>
    <div><p class="mb-3 text-[12px] font-extrabold tracking-[.03em] text-[#6b7280]">불만 Top 3</p>
      <!-- 각 행: -->
      <div class="my-[11px]"><div class="mb-1.5 flex justify-between text-[13px] font-semibold"><span><span class="mr-[7px] font-extrabold text-[#2f6bff]">1</span>배송 지연</span><span>42%</span></div>
        <div class="h-2 overflow-hidden rounded-[5px] bg-[#eceef2]"><div class="h-full rounded-[5px] bg-gradient-to-r from-[#2f6bff] to-[#5b8bff]" style="width:42%"></div></div></div>
      <!-- 2 사이즈 불일치 31%, 3 응대 지연 27% --></div>
    <div class="col-span-2 flex items-center gap-3.5 border-t-[1.5px] border-[#eceef2] pt-4">
      <div class="flex items-center gap-2 text-[13.5px] font-semibold"><span class="flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#e6f0ff] text-[12px] font-extrabold text-[#2f6bff]">✓</span>배송 SLA 재점검</div>
      <!-- 사이즈 표기 개선 / 응대 템플릿 정비 --></div></div>
  <div class="mt-4 flex gap-2.5">
    <span class="rounded-lg bg-[#e9f0ff] px-[11px] py-1.5 text-[12px] font-bold text-[#2f6bff]">🗂 skill로 저장 — 다음엔 리뷰만 붙이면 자동 생성</span>
    <span class="rounded-lg bg-[#f0f2f5] px-[11px] py-1.5 text-[12px] font-bold text-[#6b7280]">AXHub 실습환경</span></div>
</div>
```
**데모 2 (usage) — 와이어프레임 + PRD** (JS 원문에서 추출)
- 루트: `flex h-full w-full gap-[22px] bg-[#f4f6f9] px-[26px] py-6 text-[#3b414c]`, `style={{backgroundImage:"radial-gradient(#e2e6ee 1px, transparent 1px)",backgroundSize:"16px 16px"}}` (도트 그리드)
- 좌(`flex-[1.25]`): 라벨 `mb-[9px] text-[11px] font-extrabold tracking-[.04em] text-[#7a818e]` "계획모드 → 아스키 와이어프레임 확정" / 박스 `rounded-xl border-[1.5px] border-dashed border-[#b8c0cd] bg-white/70 p-[13px]`: 헤더 "사내 AI 비서" + pill "설계안"(`rounded-full border-[1.4px] border-[#9dbcff] bg-[#eaf1ff] px-[9px] py-0.5 text-[10.5px] font-extrabold text-[#2f6bff]`), 칩 4개 "📣 마케팅 🎨 브랜딩 👥 HR 🧾 세무"(`rounded-[7px] border-[1.3px] border-dashed border-[#c3cad6] bg-[#e9edf3] px-2.5 py-1 text-[11px] font-bold text-[#8992a0]`), 스켈레톤 바(`h-[9px] rounded-[5px] bg-[#dfe4ec]` width 70%/90%/55%), 입력창 + 파란 ↑ 버튼(`h-[22px] w-[22px] rounded-md bg-[#2f6bff]`), 하단 단계 칩 "① 질문 입력 / ② 담당 자동 분류 / ③ 담당별 답변"(`flex-1 rounded-[7px] bg-[#eaf1ff] px-2 py-1.5 text-center text-[10.5px] font-bold text-[#2f6bff]`)
- 우(`flex-1`): 라벨 "STICC PRD (skill ①로 자산화)" / 카드 `rounded-xl border-[1.5px] border-[#e6e9ef] bg-white px-4 py-[15px]`: "PRD · 사내 AI 비서"(14px extrabold), "불편함 → 만들 사내 툴 선정"(11px #9096a1), 리스트(목적: 흩어진 문의를 담당별 자동 응답 / 담당: 마케팅·브랜딩·HR·세무 / 흐름: 입력 → 분류 → 답변; 키 `font-extrabold text-[#2f6bff]`, 행 `py-[7px] text-[12.5px] font-semibold text-[#4b515c]`, 2번째부터 `border-t border-[#eef0f4]`), 칩 "STICC로 작성"/"skill ①로 저장", 하단 `rounded-lg bg-[#eaf1ff] px-[11px] py-[9px] text-center text-[11.5px] font-extrabold text-[#2f6bff]` "→ 3주차: 이 설계 그대로 AXHub 배포"

**데모 3 (capstone) — 인터랙티브 사내 챗봇 (브라우저 크롬 목업)**
- 루트 `flex h-full w-full flex-col overflow-hidden bg-white`
- 탭바: `flex items-end gap-2 bg-[#dee1e6] pl-4 pr-3 pt-2.5` + 신호등 점(`h-3 w-3 rounded-full` `#ff5f57` `#febc2e` `#28c840`) + 활성 탭 `max-w-[240px] rounded-t-[10px] bg-white px-3 py-2.5` (파비콘 `h-4 w-4 rounded-[4px] bg-[#2563EB] text-[7px] font-extrabold` "ax", 제목 "조코딩 AX 파트너스", ×)
- 주소창: `flex-1 rounded-full bg-[#f1f3f4] px-3.5 py-1.5` 자물쇠 + `text-[13px] text-ink/70` "company-bot.jocodingax.axhub.ai", 우측 별/아바타 `bg-[#7c6cf2]` "U"/더보기
- 앱 헤더: `flex items-center gap-3 border-b border-black/[0.06] px-5 py-3.5` 로고 `h-9 w-9 rounded-[10px] bg-[#2563EB]` "ax" + "조코딩 AX 파트너스" / "사내 직원 챗봇 · 마케팅·브랜딩·HR·세무" + (대화 시) "+ 새 대화" 버튼
- 본문 `min-h-0 flex-1 overflow-y-auto bg-[#fbfbfc] px-5 py-5`:
  - 빈 상태: 중앙 로고 `h-14 w-14 rounded-2xl bg-[#2563EB]`, "안녕하세요 👋", 설명, 2열 추천 질문 카드(`group flex items-start gap-3 rounded-xl border border-black/[0.07] bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-black/15 hover:shadow-md`), 하단 "카드를 누르거나 아래에 직접 입력해 체험해보세요"
  - 부서 테마: marketing 📣 `#E11D48`/`#FDE7ED`, branding 🎨 `#D97706`/`#FEF1D6`, hr 👥 `#2563EB`/`#DCE8FF`, tax 🧾 `#7C3AED`/`#EBE4FE`
  - 사용자 말풍선: `demo-pop max-w-[78%] rounded-2xl rounded-br-md bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white`
  - 봇 응답: `demo-fade flex items-start gap-2.5`, 아바타 `h-8 w-8 rounded-[9px]`(soft 배경+이모지), 부서 pill(soft/color), 버블 `space-y-2.5 rounded-2xl rounded-tl-md border border-black/[0.06] bg-white px-4 py-3.5 text-sm shadow-sm`
  - 타이핑 인디케이터: 3점 `h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300` delay 0/150/300ms + "담당을 찾아 답하는 중이에요…"
  - 응답 지연 `setTimeout 1300ms`; 키워드로 부서 자동 분류(광고/카피/캠페인/sns… → marketing 등); 새 메시지마다 `scrollTo({top:scrollHeight,behavior:'smooth'})`
- 입력폼: `border-t border-black/[0.06] bg-white px-4 py-3` > `rounded-xl border border-black/10 px-4 py-2 focus-within:border-[#2563EB]` + 전송 `h-8 w-8 rounded-lg bg-[#2563EB] text-white disabled:opacity-40` "↑", placeholder "무엇이든 물어보세요"
```css
@keyframes demo-pop{0%{opacity:0;transform:translateY(8px)scale(.97)}to{opacity:1;transform:none}}
@keyframes demo-fade{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.demo-pop{animation:demo-pop .4s var(--ease) both}
.demo-fade{animation:demo-fade .45s var(--ease) both}
```

### 5.14 준비물 `#prep` (`.section.section-gray`)
```html
<div class="section-head"><h2>준비물</h2><p class="section-sub">원활한 실습을 위해 아래를 미리 준비해 주세요.</p></div>
<div class="reveal reveal-stagger mx-auto grid max-w-[600px] grid-cols-2 gap-2.5 sm:gap-5">
  <div class="rounded-xl border border-rule bg-white p-3.5 sm:rounded-2xl sm:p-6">
    <div class="font-mono text-xs font-semibold text-signal-text sm:text-sm">01</div>
    <h3 class="font-sans mt-2 text-sm font-bold leading-snug sm:mt-3 sm:text-xl">개인 노트북</h3>
    <p class="mt-1.5 text-xs leading-relaxed text-mute sm:mt-2 sm:text-base">Mac 기반으로 실습 진행 예정, Windows 가능</p>
  </div>
  <div class="…">02 / Claude Code Max Plan (설명 없음)</div>
</div>
```
(curriculum과 prep 모두 gray라 시각적으로 한 덩어리로 이어짐.)

### 5.15 결과물 `#takehome` (`.section.section-dark`)
```html
<div class="section-head"><h2 class="whitespace-pre-line">들은 내용이 아니라,\n계속 쓰는 도구가 남습니다</h2>
  <p class="section-sub whitespace-pre-line">3주 뒤 손에 남는 건 '기억'이 아니라 '사내 에이전트'입니다.</p></div>
<div class="reveal reveal-stagger mx-auto grid max-w-[980px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
  <div class="rounded-2xl border border-white/12 bg-white/[0.04] p-7">
    <div class="font-mono text-sm font-semibold text-signal">01</div>
    <h3 class="font-sans mt-3 text-xl font-bold leading-snug text-paper/90">내 업무용 AI 워크플로우</h3>
    <p class="mt-3 whitespace-pre-line leading-relaxed text-paper/65">반복 업무를 하네스로 묶어, 매번 같은 품질로 자동 처리합니다.</p>
  </div>
  <!-- 02 사내 AI 도구 결과물 / 03 스스로 도구를 만드는 힘 / 04 재현 가능한 나만의 셋업 -->
</div>
```

### 5.16 강사 `#instructor` (`.section.section-dark`)
```html
<div class="reveal mx-auto flex max-w-[520px] flex-col items-center text-center">
  <div class="relative">
    <div aria-hidden="true" class="absolute -inset-8 -z-10 rounded-full bg-signal/15 blur-3xl"></div>  <!-- 64px blur 블루 후광 -->
    <div class="h-52 w-52 overflow-hidden rounded-3xl md:h-60 md:w-60">
      <img src="/liam-profile.png" alt="김형주" class="h-full w-full object-cover object-top"/></div>
  </div>
  <h2 class="font-sans mt-7 flex items-baseline gap-2.5">
    <span class="text-[clamp(1.7rem,4vw,2.3rem)] font-bold leading-none">김형주</span>
    <span class="text-lg font-medium text-paper/55">강사</span></h2>
  <p class="mt-5 whitespace-pre-line text-[clamp(1.25rem,2.6vw,1.6rem)] font-bold leading-snug text-paper">
    <span>글로벌 핀테크 서비스를 리딩한\nAI 네이티브 개발자가 </span><span class="text-signal">직접</span><span> 가르칩니다</span></p>
  <ul class="mt-9 w-full space-y-4 text-left">
    <li class="flex gap-3 text-paper/85"><span class="mt-0.5 shrink-0 text-signal">✓</span><span class="text-lg "><span>글로벌 핀테크 서비스 프로젝트 리딩</span></span></li>
    <!-- 영재고등학교 졸업 / 대기업 임직원 대상 AX 교육 다수 진행 / AX아카데미 1·2기 <strong class="font-bold text-paper">47명</strong> 수강 · 만족도 <strong>4.7 / 5</strong> / 현장 밀착 실습 — 막히는 지점을 그 자리에서 해결 -->
  </ul>
</div>
```
(takehome → instructor 연속 다크 섹션: `.section-dark+.section-dark{border-top:0}`.)

### 5.17 비교 `#nondev` (`.section.offer-pre`)
두 패널이 붙어 있는 비교표(좌 회색 VOD / 우 다크 AX). 모바일에서도 가로 2열 유지.
```html
<div class="section-head"><h2 class="whitespace-pre-line">보기만 하는 강의는 이제 그만</h2>
  <p class="section-sub">영상 강의로는 막히는 지점이, 오프라인 라이브에서는 그 자리에서 풀립니다.</p></div>
<div class="reveal mx-auto flex max-w-[920px] flex-row items-stretch gap-0">
  <div class="flex-1 rounded-2xl rounded-r-none bg-[#F3F4F6] px-3 py-6 sm:px-7 sm:py-10 sm:pr-12">
    <h3 class="text-center text-sm font-bold text-mute sm:text-lg">혼자 보는 VOD</h3>
    <ul class="mt-5 flex flex-col sm:mt-8">
      <li class="flex min-h-[64px] items-center justify-center text-center text-xs leading-relaxed text-mute sm:min-h-[68px] sm:text-[15px]">영상 보고 혼자 따라 하다 막힘</li>
      <!-- 질문해도 답변은 며칠 뒤 / 예제 데이터로만 실습 / 수료증 한 장으로 끝 -->
    </ul>
  </div>
  <div class="flex-1 rounded-2xl rounded-l-none bg-[#16181d] px-3 py-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)] sm:rounded-l-none sm:px-7 sm:py-10 sm:pl-12">
    <h3 class="text-center text-sm font-bold text-white sm:text-lg">AX 아카데미</h3>
    <ul class="mt-5 flex flex-col sm:mt-8">
      <li class="flex min-h-[64px] items-center gap-2 sm:min-h-[68px] sm:gap-4">
        <span class="hidden shrink-0 text-[#5B9BFF] sm:block"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" …>말풍선</svg></span>
        <span class="min-w-0">
          <span class="block text-[10px] leading-snug text-white/45 sm:text-[13px]">막히면 현장에서</span>
          <span class="mt-0.5 block text-xs font-bold leading-snug text-white sm:text-[15px]">즉시 질문·해결</span></span></li>
      <!-- 강사가 바로 옆에서/실시간 피드백(사람), 예제가 아니라/내 업무·내 환경으로 직접 실습(DB), 수료증이 아니라/사내에서 사용하는 운영 자산(큐브) -->
    </ul>
  </div>
</div>
```

### 5.18 후기 `#reviews` (`.section.offer-pre`) — 가로 스냅 캐러셀
```html
<div class="wrap"><div class="section-head">
  <h2 class="whitespace-pre-line">AX 아카데미와 함께 한\n수강생분들의 이야기</h2>
  <p class="section-sub">1·2기 수강생 47명 · 만족도 <span class="font-bold text-signal-text">4.7</span><span class="text-mute"> / 5</span></p></div></div>
<div class="wrap relative">
  <div class="reveal flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <blockquote class="flex min-w-[290px] max-w-[360px] flex-1 shrink-0 snap-start flex-col rounded-2xl border border-rule bg-white p-7 shadow-[0_24px_60px_-30px_rgba(16,24,40,0.3)]">
      <span aria-hidden="true" class="font-serif text-5xl leading-[0.6] text-signal/25">"</span>
      <div class="mt-3 flex items-start justify-between gap-3">
        <div class="text-sm tracking-widest"><span class="text-signal">★★★★★</span><span class="text-signal/25"></span></div>
        <div class="shrink-0 text-right text-xs leading-tight"><div class="font-semibold text-ink">프라이머 클럽팀</div><div class="text-mute">김○환 · CEO</div></div>
      </div>
      <p class="mt-3 leading-relaxed text-ink">실습 한정 도구에만 그치지않고 …</p>
    </blockquote> × 5
  </div>
  <button aria-label="이전 후기" class="absolute left-2 top-[calc(50%-0.5rem)] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-rule bg-white/95 text-ink shadow-[0_8px_24px_-8px_rgba(16,24,40,0.4)] backdrop-blur transition-colors hover:bg-white">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
  <button aria-label="다음 후기" class="absolute right-2 … 동일"><svg …><path d="m9 18 6-6-6-6"/></svg></button>
</div>
```
JS: `scrollBy({left: dir * (첫 blockquote 폭 + 20), behavior:"smooth"})` (폭 없으면 `0.8*clientWidth`). 자동재생 없음, 무한루프 없음. 별점: 5,5,4,5,5 (빈 별은 `text-signal/25`).
후기 데이터: 김○환·CEO / 구○서·CTO / 정○지·사원(4★) / 이○주·CEO / 박○욱·CEO — 모두 "프라이머 클럽팀".

### 5.19 수강료 `#pricing` (`.section`, 흰색)
```html
<div class="section-head"><h2>수강료</h2><p class="section-sub">정가 대비 특별 할인가로 모집합니다.</p></div>
<div class="reveal mx-auto max-w-[480px]">
  <div class="card text-center">
    <div class="font-mono text-mute line-through">1,000,000원</div>
    <div class="font-sans text-[clamp(2.2rem,6vw,3rem)] font-bold leading-none text-signal-text">400,000원
      <span class="ml-1.5 text-base font-semibold text-mute">(부가세 별도)</span></div>
    <div class="mt-2 flex flex-wrap items-center justify-center gap-1.5">
      <span class="rounded-full bg-signal/10 px-3 py-1 text-xs font-semibold text-signal-text">정가 대비 60% 할인</span></div>
    <div class="mt-4 text-sm font-semibold text-ink">실결제 440,000원 (부가세 포함)</div>
    <div class="mt-4 inline-flex items-center gap-1.5 rounded-full bg-signal/10 px-3.5 py-1.5 text-sm font-semibold text-signal-text"><span>🔒</span> AXHub 사내 배포 권한 포함</div>
    <div class="section-cta flex-col items-center">
      <a href="/apply" class="btn btn-primary btn-lg">사전예약 신청</a>
      <p class="mt-3 text-xs text-mute">지금은 사전예약 접수 중 · 개강일정 확정 후 결제 안내</p></div>
  </div>
</div>
```

### 5.20 신청 절차 `#howtojoin` (`.section.section-gray`) — 중앙선 지그재그 타임라인
```html
<div class="section-head"><h2>AX 아카데미 3기 신청부터 확정까지</h2></div>
<div class="reveal reveal-stagger relative mx-auto max-w-[820px]">
  <div aria-hidden="true" class="absolute left-6 top-0 h-full w-px bg-rule md:left-1/2 md:-translate-x-1/2"></div>
  <div class="flex flex-col gap-8 md:gap-10">
    <div class="relative pl-20 md:grid md:grid-cols-2 md:items-center md:gap-12 md:pl-0">
      <div class="absolute left-0 top-1/2 z-[1] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-signal font-mono font-bold text-white md:left-1/2 md:-translate-x-1/2">01</div>
      <div class="card md:col-start-2"><h3 class="font-sans text-lg font-bold">신청 정보 입력</h3><p class="mt-2 leading-relaxed text-mute">이름·연락처와 간단한 사전 설문을 작성합니다.</p></div>
    </div>
    <!-- 02: card md:col-start-1 md:text-right "신용카드·페이·계좌이체" / "카드·계좌이체로 결제합니다." -->
    <!-- 03: card md:col-start-2 "신청 확정" / "결제가 완료되면 확정 안내와 일정·위치를 안내드립니다." -->
  </div>
</div>
```
주의: `.reveal-stagger`의 직계 자식은 세로선 div와 flex 래퍼 2개뿐 → stagger는 이 2개에 적용(카드별 개별 stagger 아님).
모바일: 좌측 24px 위치에 세로선, 원 번호는 좌측, 카드는 `pl-20`. md+: 중앙선, 카드 좌우 교차.

### 5.21 최종 CTA `#final-cta` (`.section.section-dark`)
```html
<div class="reveal mx-auto max-w-[720px] text-center">
  <h2 class="font-sans text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-tight tracking-[-0.025em] text-balance">AX아카데미 3기, 지금 합류하세요</h2>
  <p class="mt-5 text-xl font-bold leading-relaxed text-white/85 md:text-2xl">3주 뒤, AI를 '구경하는 사람'이 아니라 '업무에 쓰는 사람'이 됩니다.</p>
  <div class="section-cta"><a href="/apply" class="btn btn-primary btn-lg">사전예약 신청</a></div>
</div>
```

### 5.22 FAQ `#faq` (`.section`, 흰색)
```html
<div class="section-head"><h2>궁금하신 점 답변드립니다</h2></div>
<div class="reveal mx-auto max-w-[760px] border-y border-rule">
  <details class="group border-b border-rule py-5 last:border-b-0">
    <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-lg font-semibold">개발을 잘 못해도 참여할 수 있나요?
      <span class="shrink-0 text-2xl leading-none text-signal transition-transform group-open:rotate-45">+</span></summary>
    <p class="mt-3 whitespace-pre-line leading-relaxed text-mute">네. 기초 개념·용어부터 시작하도록 설계했고, 1·2기에서 처음 접하는 분들이 따라왔습니다.</p>
  </details> × 8
</div>
```
동작: 네이티브 details, "+" 아이콘이 열리면 45° 회전("×"), transition-transform 기본 .15s. 높이 애니메이션 없음(즉시 펼침). 질문 8개: 개발을 잘 못해도 / 무엇을 준비 / 3회차 중 일부만 / 앱 배포·관리 / 회사 데이터 안전 / 장소(신논현역 스페이스쉐어 강남센터) / Claude Code 구독(월 약 $100) / 환불 규정.

### 5.23 Footer
```html
<footer class="border-t border-rule py-12">
  <div class="wrap flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
    <div class="text-sm text-mute">
      <div class="font-sans text-base font-bold text-ink">주식회사 조코딩에이엑스파트너스</div>
      <div class="mt-2 space-y-0.5 leading-relaxed">
        <div>대표 조동근, 문경원</div><div>사업자등록번호 497-81-04077</div><div>통신판매업 신고번호 제2026-서울서초-2193호</div>
        <div>서울특별시 서초구 서초대로 397, B동 1401호</div>
        <div><a href="mailto:contact@jocodingax.ai" class="hover:text-ink">contact@jocodingax.ai</a></div>
      </div>
    </div>
    <nav class="flex gap-5 text-sm text-mute">
      <a href="/terms" class="hover:text-ink">이용약관</a><a href="/privacy" class="hover:text-ink">개인정보처리방침</a><a href="/refund" class="hover:text-ink">환불정책</a></nav>
  </div>
</footer>
```

### 5.24 플로팅 요소
**FloatingBar (md 이상)** — `scrollY > 900`에서 노출
```html
<div class="fixed bottom-6 left-1/2 z-[80] hidden -translate-x-1/2 transition-all duration-300 md:block {visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}">
  <div class="rounded-full border border-rule bg-white/90 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur">
    <a href="/apply" data-cta-location="floating-bar" class="btn btn-primary">사전예약 신청</a>  <!-- pill: border-radius 999px -->
  </div>
</div>
```
**StickyCTA (md 미만)** — `scrollY > 600`에서 슬라이드업
```html
<div class="fixed inset-x-0 bottom-0 z-[90] border-t border-rule bg-white/95 p-3 backdrop-blur transition-transform duration-300 md:hidden {visible ? 'translate-y-0' : 'translate-y-full'}">
  <div class="wrap"><a href="/apply" class="btn btn-primary w-full justify-center">사전예약 신청</a></div>
</div>
```
**SurveyPopup (모달)** — 마운트 시 `localStorage['axSurveyPopupHideDate'] !== 오늘(YYYY-M-D)`이면 표시, 표시 중 `body overflow:hidden`. `/apply` 등 일부 경로 제외.
```html
<div class="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
  <button aria-label="닫기" class="absolute inset-0 bg-black/50 backdrop-blur-sm"></button>
  <div class="relative w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
    <button aria-label="닫기" class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-mute transition-colors hover:bg-black/5 hover:text-ink"><svg width="18" height="18" …><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    <span class="inline-block rounded-full bg-[#EEF3FE] px-3 py-1 text-xs font-semibold text-signal-text">사전 진단 설문</span>
    <h2 class="mt-3 text-[20px] font-bold leading-snug text-ink">강의 전, AX 성숙도 진단을 받아보세요</h2>
    <p class="mt-2 text-sm leading-relaxed text-mute">약 8~12분 설문에 응답하시면 현재 병목 진단과 맞춤 AX 로드맵이 담긴 진단 리포트를 보내드립니다.</p>
    <div class="mt-5 space-y-2.5">
      <a class="flex items-center justify-between rounded-xl border border-rule bg-white px-4 py-3.5 transition-colors hover:border-signal hover:bg-[#F7F9FD]">
        <span><span class="block text-[15px] font-semibold text-ink">기업 · 조직용</span><span class="block text-xs text-mute">팀/회사의 AX 성숙도 진단</span></span>
        <svg width="20" height="20" … class="flex-none text-signal"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
      <!-- 개인용 / 나의 AI 활용 수준 진단 -->
    </div>
    <label class="mt-5 flex cursor-pointer items-center gap-2 text-sm text-mute"><input type="checkbox" class="h-4 w-4 accent-signal"/>오늘 하루 보지 않기</label>
  </div>
</div>
```
(등장 애니메이션 없음 — 즉시 표시.)

---

## 6. 애니메이션 / 인터랙션 총정리

| # | 대상 | 트리거 | 변화 | 시간/이징/지연 |
|---|---|---|---|---|
| 1 | `.reveal` (hero 텍스트, 혜택 행, problem 종이 묶음, intro 텍스트, method 좌측, governance 이미지, partners, marquee, pricing, final-cta, FAQ, reviews 트랙, 섹션헤드(curriculum)) | IntersectionObserver `threshold:.12`, 1회(진입 후 unobserve) → `.in` 클래스 | `opacity 0→1`, `translateY(12px)→none` | `.6s cubic-bezier(.16,1,.3,1)` |
| 2 | `.reveal-stagger` 자식 (solution 3카드, who 3카드, method 4카드, why 3카드, governance li, prep, takehome, howtojoin) | 동일 IO → `.in` | `@keyframes staggerIn{0%{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}` | `.5s var(--ease) backwards`, delay 0 / 80ms / 160ms / 240ms / 320ms (nth-child 1~5) |
| 3 | `.curri-grid` 카드 | 동일 IO | `curriCardIn` opacity 0→1 (이동 없음) + 연결선 `:after` opacity 0→1 | 카드 `.5s` delay 0/.12/.24/.36s, 선 `.4s` delay `.25s` |
| 4 | intro 사진 프레임 | scroll(rAF) | `clip-path: inset(0 20%→0 round 26px→0)` | 진행도 `(vh - top)/(0.7vh)` clamp 0~1 (lg 이상만) |
| 5 | 로고 마퀴 | 상시 | `translateX(0 → -50%)` (트랙 2배 복제) | `36s linear infinite`, hover 시 일시정지, 좌우 6% 마스크 페이드 |
| 6 | 커리큘럼 탭/카드 | click/Enter/Space | 패널 `cdsPanelIn` (opacity 0→1, translateY 6px→0), 데모 교체 | `.28s var(--ease)` |
| 7 | 데모 챗 메시지 | 사용자 입력 | 사용자 `demo-pop`(Y 8px, scale .97 → 1) `.4s`; 봇 `demo-fade`(Y 10px) `.45s`; 응답 지연 1300ms; 타이핑 점 `animate-bounce` delay 0/150/300ms | `--ease` |
| 8 | 후기 캐러셀 | 버튼 클릭 | `scrollBy` smooth, `snap-x snap-mandatory`, `snap-start` | 브라우저 기본 smooth |
| 9 | FAQ | details toggle | "+" `rotate(45deg)` | `.15s cubic-bezier(.4,0,.2,1)` |
| 10 | 드롭다운 | hover/focus-within | 패널 opacity/visibility + `translateY(-4px→0)`, 캐럿 180° | `.16s` / `.18s` `--ease` |
| 11 | `.btn-primary` hover | hover | `translateY(-2px)` + 블루 25% 그림자; active `scale(.97)` (.1s) | `.15s --ease` |
| 12 | `.card` hover | hover | `translateY(-2px)`, 보더 블루 30%, 그림자 | `.2s --ease` |
| 13 | `.cc-body` hover | hover | `translateY(-3px)`, 보더 signal | `.2s --ease` |
| 14 | FloatingBar / StickyCTA | scrollY > 900 / > 600 | opacity+translateY(16px) / translateY(100%) | `duration-300` (Tailwind 기본 ease `cubic-bezier(.4,0,.2,1)`) |
| 15 | `html` | 앵커 | `scroll-behavior:smooth; scroll-padding-top:60px` | — |

**prefers-reduced-motion**: reveal/stagger/curri/marquee/demo/intro 모두 비활성 처리(원문 CSS 존재). `<noscript><style>.reveal,.reveal-stagger>*{opacity:1!important;transform:none!important}</style></noscript>`.

**없는 것**: 헤더 스크롤 변화, 모바일 햄버거, 숫자 카운터, 타이핑 효과(이 페이지), 패럴랙스, 스무스 스크롤 라이브러리. (CSS에 `pa-*` 타이핑/스캔 keyframes가 정의돼 있으나 이 페이지에선 미사용 — 다른 페이지용.)

---

## 7. React 19 + Tailwind v4 재현 가이드

### 7.1 권장 라이브러리
- **추가 라이브러리 불필요.** 원본과 동일하게 CSS + 작은 훅으로 구현하는 것이 가장 정확함.
- 선택: `clsx`(클래스 조합), `@fontsource/ibm-plex-mono`.
- framer-motion을 쓰더라도 값은 6장 표 그대로(duration .6/.5s, ease `[0.16,1,0.3,1]`, y 12/14px, stagger 0.08s).

### 7.2 `index.css` (붙여넣기용)
```css
@import "tailwindcss";

:root{
  --ink:#1a1d24; --paper:#fff; --signal:#2563eb; --signal-text:#1d4ed8;
  --rule:#e5e7eb; --mute:#6b7280;
  --font-display:"Pretendard Variable","Pretendard",system-ui,sans-serif;
  --font-body:"Pretendard Variable","Pretendard",system-ui,sans-serif;
  --font-plex:"IBM Plex Mono", ui-monospace, monospace;
  --maxw:1280px;
  --pad-x:clamp(1.25rem,5vw,5rem);
  --pad-y:clamp(7rem,15vh,13rem);
  --radius:14px; --radius-sm:10px;
  --dur:.6s; --ease:cubic-bezier(.16,1,.3,1);
}

@theme inline {
  --color-ink: var(--ink);
  --color-paper: var(--paper);
  --color-signal: var(--signal);
  --color-signal-text: var(--signal-text);
  --color-rule: var(--rule);
  --color-mute: var(--mute);
  --font-sans: var(--font-display);
  --font-mono: var(--font-plex);
  --default-font-family: var(--font-display);
  --ease-brand: cubic-bezier(.16,1,.3,1);
}

html{scroll-behavior:smooth;scroll-padding-top:60px}
body{color:var(--ink);font-family:var(--font-body);word-break:keep-all;overflow-wrap:break-word;background:#fff;font-size:17px;font-weight:400;line-height:1.6}
h1,h2,h3,p,li,span,div,a{word-break:keep-all}
:focus-visible{outline:2px solid var(--signal);outline-offset:2px}

/* 이후 4장(.btn/.card/.section-head), 5장 각 섹션의 원문 CSS 블록을 @layer components 없이 그대로 붙여 넣기
   (원본도 unlayered 전역 CSS이므로 Tailwind 유틸보다 우선순위가 높다는 점에 주의 — 
    `!py-12`처럼 원본이 `!`를 쓴 곳은 그대로 `!` 유지) */
.wrap{max-width:var(--maxw);padding-inline:var(--pad-x);margin:0 auto}
.section{padding-block:var(--pad-y);overflow-x:clip}
.section-gray{background:#f6f7f9}
.section-dark{background:var(--ink);color:var(--paper)}
.offer-pre{background:radial-gradient(120% 80% at 50% 0%, color-mix(in srgb, var(--signal) 10%, transparent) 0%, transparent 55%), #eef2fb}
.reveal{opacity:0;transform:translateY(12px);transition:opacity var(--dur) var(--ease), transform var(--dur) var(--ease)}
.reveal.in{opacity:1;transform:none}
.reveal-stagger.reveal{opacity:1;transition:none;transform:none}
.reveal-stagger>*{opacity:0}
@keyframes staggerIn{0%{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.reveal-stagger.in>*{opacity:1;animation:staggerIn .5s var(--ease) backwards}
.reveal-stagger.in>:nth-child(2){animation-delay:80ms}
.reveal-stagger.in>:nth-child(3){animation-delay:.16s}
.reveal-stagger.in>:nth-child(4){animation-delay:.24s}
.reveal-stagger.in>:nth-child(5){animation-delay:.32s}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.reveal{opacity:1;transition:none;transform:none}.reveal-stagger>*{opacity:1}.reveal-stagger.in>*{animation:none}}
```
> 참고: Tailwind v4의 `sm/md/lg` 기본 브레이크포인트(40/48/64rem)를 그대로 쓰면 됨. 원본은 `--font-mono:var(--font-mono)`처럼 next/font 변수를 거치지만, Vite에서는 위처럼 직접 지정.

`index.html` head:
```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap">
```

### 7.3 훅 (원본 로직 이식)
```tsx
// useRevealOnScroll.ts — App 최상단에서 1회 호출 (원본 RevealOnScroll과 동일)
export function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
}
// 주의: 탭 전환 등으로 새로 마운트되는 .reveal은 없음(원본도 최초 1회 스캔). 라우팅/지연 렌더 시 각 컴포넌트에서 ref 기반 IO로 바꾸는 편이 안전.

// useScrollY threshold — FloatingBar(900), StickyCTA(600)
const [show, setShow] = useState(false);
useEffect(() => { const f = () => setShow(window.scrollY > 900); f();
  addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f); }, []);
```
Intro clip-path 훅은 5.8의 JS를 그대로 `useEffect`에 이식. Curriculum 데모 스케일은 `ResizeObserver`로 `--demo-scale = el.clientWidth/730` 설정(callback ref).

### 7.4 컴포넌트별 구현 노트
- **Nav**: CSS hover 드롭다운 그대로(상태 불필요). 모바일도 동일 구조, 로고 높이 .85rem.
- **Hero**: 배경 효과는 `::before/::after` 의사요소 → 커스텀 CSS 클래스 `.hero` 유지가 가장 간단. `.hero-hl{color:#5b9bff}`.
- **Benefits**: `BenefitRow({reverse})` 컴포넌트로 `md:order-*` 처리. 목업 3종은 JSX 하드코딩(5.3 원문).
- **Problem**: SVG filter `#paper-torn`를 섹션에 1회 삽입. `filter:url(#paper-torn)`는 id 중복 금지.
- **Solution**: `.cone-horizon/.cone-glow/.cone-grid/.cone-fade` 4개 장식 div + 원문 CSS.
- **Intro**: `/edu.jpeg` 대체 이미지 필요(교육 현장 사진, 어두운 오버레이 `#06080e80→#06080ead`).
- **Marquee**: 로고 배열을 `[...logos, ...logos]`로 2배 렌더, 두 번째 세트 `aria-hidden`, `translate(-50%)` 36s linear.
- **Curriculum**: `useState(0)`; 패널/figure에 `key={badge}`로 재마운트하여 `cdsPanelIn` 재생. 모바일(≤639px) 세로 타임라인은 순수 CSS `:before/:after`. 3개 데모 컴포넌트는 730×456.25 고정 크기로 작성 후 scale.
- **Reviews**: ref + `scrollBy`. 스크롤바 숨김 유틸 `[scrollbar-width:none] [&::-webkit-scrollbar]:hidden` 그대로 사용 가능(v4 arbitrary variant).
- **FAQ**: `<details className="group">` + `group-open:rotate-45` (Tailwind v4 지원).
- **HowToJoin**: 번호 원 `absolute left-0 top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2`, 카드 `md:col-start-1/2` 교차.
- **색 opacity 유틸**(`text-paper/85`, `bg-signal/10` 등)은 `@theme inline`으로 등록하면 v4가 `color-mix`로 자동 생성.

---

## 8. 에셋 경로 (다운로드하지 않음)
| 경로 | 용도 | 크기 |
|---|---|---|
| `/axacademy-logo-transparent.png` | GNB 로고 (표시 높이 32px / 모바일 .85rem) | 미확인 |
| `/axhub-ui.png` | AXHub 스크린샷(혜택 2, 거버넌스) | 1276×794 (HTML width/height) |
| `/logos/jocodingaxpartners_logo.png` | 파트너 로고 (h-11 / sm:h-16) | 미확인 |
| `/brand-logos/*.png|webp|svg` (20개) | 마퀴 로고 (h 2.4rem, max-w 7.5rem) | 미확인 |
| `/liam-profile.png` | 강사 사진 (208px / md 240px 정사각, rounded-3xl) | 미확인 |
| `/edu.jpeg` | intro 배경 (cover) | 미확인 |
| `/og.png` | OG 이미지 | 1200×630 |
| favicon `/favicon.ico`(48), `/icon.png`(512), `/apple-icon.png`(180) | 아이콘 | — |

## 9. 정적 코드로 확인 불가한 부분
- 실제 이미지(로고/사진)의 픽셀 크기와 시각적 내용, `/edu.jpeg` 사진 톤.
- 실측 렌더 높이/브라우저별 미세 차이(정적 분석이라 스크린샷 비교 불가).
- `--pad-y`가 vh 기반이라 화면 높이에 따라 섹션 간격이 112~208px로 변함 — 의도된 동작.
- 원본 Tailwind 소스(`@theme` 원문)는 빌드 결과로부터 역추정한 것(7.2 블록은 동등 결과를 내도록 재구성).
