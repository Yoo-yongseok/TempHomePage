# 사이트 1번 — 하위 페이지 템플릿 명세

> 2026-10-19 실브라우저(Playwright)로 원본 DOM을 추출해 정리. 메인 페이지 명세는 [site1-jocodingax.md](site1-jocodingax.md) 참고.
> 원본의 하위 페이지는 두 가지 템플릿으로 나뉜다.

| 원본 경로 | 템플릿 | 우리 사이트 |
|---|---|---|
| `/consulting-v1`, `/group-training`, `/edu/facilitating`, `/program/hackathon` | 서비스 상세 | `/service/:slug` → `src/pages/ServicePage.tsx` |
| `/newsroom` | 게시판 리스트 | `/news/:slug` → `src/pages/NewsPage.tsx` |
| `/company` | 회사소개 (대표 배너 + 구성원 카드) | 아직 미구현 (`/about` 후보) |

모든 하위 페이지: 헤더는 처음부터 흰색(솔리드), 본문은 `pt-[60px]`, 하단에 공통 푸터.

---

## 1. 서비스 상세 템플릿

### 1.1 히어로
```html
<section class="flex h-[calc(100dvh-60px)] items-start justify-center bg-white bg-[length:175%_auto] bg-right-bottom bg-no-repeat px-5 pt-[100px] md:h-[800px] md:bg-[length:100%_auto] md:px-10"
         style="background-image:url(/images/edu-group-hero-bg.webp)">  <!-- 이미지 상단에 흰색 페이드가 포함됨 -->
  <div class="mx-auto flex max-w-[1120px] flex-col items-center gap-10 text-center md:gap-20">
    <div class="flex flex-col items-center gap-5">
      <div class="flex items-center gap-3">
        <img style="width:34.29px;height:24.6px">  <!-- 심볼 로고 -->
        <span class="text-[20px] font-bold leading-[1.2] text-[#2d64fa] md:text-[28px]">집체교육</span>
      </div>
      <h1 class="text-[30px] font-bold leading-[1.2] text-[#16171b] text-balance md:text-[48px]">(글자 단위 등장)</h1>
      <p class="text-[16px] leading-[1.3] text-[#6d717e] md:text-[20px] md:leading-[1.2]">서브카피</p>
    </div>
    <div class="flex w-fit flex-col gap-3 md:w-auto md:flex-row md:flex-wrap md:items-center md:justify-center">
      <a class="... rounded-[40px] px-6 py-4 text-[18px] font-semibold leading-[1.4] tracking-[-0.18px] bg-primary hover:bg-[#1f54d6] text-white">문의하기</a>
      <a class="... bg-white/60 hover:bg-white/80 text-[#16171b]">교육사례집 보기</a>  <!-- 페이지에 따라 없음 -->
    </div>
  </div>
</section>
```
**제목 애니메이션 (eduRiseIn)**: 글자마다 `<span class="inline-block">`, 단어는 `inline-block whitespace-nowrap`으로 묶음.
`animation: eduRiseIn .55s cubic-bezier(0.22,1,0.36,1) {i*45}ms both` — 띄어쓰기도 1글자로 카운트.
```css
@keyframes eduRiseIn{from{opacity:0;transform:translateY(0.5em)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){.edu-rise-char{animation:none!important;opacity:1!important;transform:none!important}}
```

### 1.2 기능 섹션 (3~5개 반복)
```html
<section class="px-5 pt-[100px] md:px-10">
  <div class="mx-auto flex max-w-[1120px] flex-col gap-[80px] pb-[60px] md:gap-[100px] md:pb-[100px]">
    <div class="flex flex-col gap-6 py-[52px] md:gap-10">
      <div class="flex flex-col gap-3">
        <h2 class="text-[28px] font-bold leading-[1.2] text-[#16171b] break-keep text-balance md:text-[40px]">1줄<br class="hidden md:block">2줄</h2>
        <p class="text-[16px] leading-[1.3] tracking-[-0.22px] text-[#6d717e] md:text-[22px]">설명</p>
      </div>
      <div class="aspect-[1080/450] w-full">
        <!-- 1080×450 고정 스테이지를 scale(컨테이너폭/1080)로 축소·확대 -->
        <div class="relative origin-top-left overflow-hidden rounded-[12px] bg-[#f6f7f9]" style="width:1080px;height:450px;transform:scale(…)">
          자동재생 UI 데모 (가짜 커서, 타이핑, 카드 등장, 터미널, 산점도 등 — 페이지마다 다름)
        </div>
      </div>
    </div>
  </div>
</section>
```
> 현재 구현은 데모 대신 `bg-gray-50` 자리표시 박스. 데모가 기획되면 `FeatureSection`에 `demo` 슬롯을 추가해 교체.

### 1.3 대표 사례 리스트 (일부 페이지)
```html
<section class="bg-[#f6f7f9] px-10 py-[60px]">
  <div class="mx-auto flex max-w-[1120px] flex-col gap-10 md:gap-[60px]">
    <h2 class="text-[28px] font-bold leading-[1.2] md:text-[40px]">집체 교육 대표 사례</h2>
    <div class="flex flex-col gap-8 md:gap-10">
      <a class="group flex flex-col items-start gap-3 md:flex-row md:items-end md:gap-10">
        <div class="aspect-[157/90] w-full shrink-0 overflow-hidden rounded-[8px] bg-white transition-transform duration-300 group-hover:scale-105 md:aspect-auto md:h-[143px] md:w-[250px]"><img></div>
        <div class="flex min-w-0 flex-1 flex-col gap-1.5 md:gap-2">
          <img class="h-[16px] w-auto md:h-[18px]">  <!-- 고객사 로고 -->
          <h3 class="text-[16px] font-semibold leading-[1.2] md:text-[24px]">제목</h3>
          <p class="text-[13px] leading-[1.5] tracking-[-0.16px] text-[#6d717e] md:text-[16px]">2026-07-22</p>
        </div>
      </a>
    </div>
  </div>
</section>
```

### 1.4 CTA 배너
```html
<section class="flex h-[450px] items-center px-5 md:px-10">
  <div class="mx-auto w-full max-w-[1120px]">
    <div class="relative flex flex-col items-start gap-8 overflow-hidden rounded-[12px] p-8 md:flex-row md:items-center md:justify-between md:gap-10 md:p-[60px]">
      <img class="absolute inset-0 size-full -scale-x-100 object-cover" src="/images/edu-group-cta-bg.png">  <!-- 파랑→보라→검정 -->
      <p class="relative text-[22px] font-semibold leading-[1.2] text-white text-balance md:text-[28px]">2줄 카피</p>
      <div class="relative flex w-fit flex-col gap-3 md:w-auto md:shrink-0 md:flex-row">
        <a class="... bg-[#16171b] md:bg-primary md:hover:bg-[#1f54d6] text-white">문의하기</a>
        <a class="... bg-white hover:bg-[#f0f1f3] text-[#16171b]">교육사례집 보기</a>
      </div>
    </div>
  </div>
</section>
```

---

## 2. 게시판 리스트 템플릿 (뉴스룸)

```html
<section class="mx-auto w-full max-w-[1200px] px-5 py-10 md:px-10 md:py-20">
  <div class="flex flex-col gap-10 md:gap-20">
    <div class="flex flex-col gap-10">
      <h1 class="text-[32px] font-bold leading-[1.2] md:text-[48px]">뉴스룸</h1>
      <!-- 대표 배너 -->
      <a class="group flex flex-col overflow-hidden rounded-[12px] transition-shadow duration-300 hover:shadow-[0_12px_32px_-8px_rgba(22,23,27,0.18)] md:flex-row">
        <img class="aspect-[16/7] w-full object-cover md:aspect-auto md:h-[213px] md:w-[320px] md:shrink-0">
        <div class="flex min-w-0 flex-1 items-center gap-6 bg-[#f6f7f9] p-6 md:gap-10 md:p-8">
          <div class="flex flex-col gap-3 md:gap-4">
            <span class="text-[18px] font-bold leading-[1.4] tracking-[-0.18px] text-primary">웨비나 리포트 · 녹화본</span>
            <h2 class="text-[20px] font-bold leading-[1.3] md:text-[26px]">제목</h2>
            <p class="text-[14px] leading-[1.6] text-[#6d717e] md:text-[16px]">설명</p>
          </div>
          <span class="hidden items-center gap-2 text-[16px] font-semibold md:flex">받아보기 <svg arrow-right class="size-4 group-hover:translate-x-1 duration-300"/></span>
        </div>
      </a>
      <!-- 검색 -->
      <div class="flex h-[56px] w-full items-center gap-4 rounded-[10px] bg-[#f6f7f9] px-4 md:w-[400px]"> <svg search size-5 #9ca0ab/> <input placeholder="검색"> </div>
    </div>
    <!-- 리스트 -->
    <div class="flex flex-col gap-6 md:gap-[60px]">
      <a class="group flex items-start gap-6 md:gap-20">
        <div class="flex min-w-0 flex-1 flex-col gap-3">
          <div class="flex items-center gap-x-2 text-[13px] md:text-[14px]"><span class="font-bold text-primary">언론보도</span><span class="text-[#d4d4d8]">·</span><span class="font-semibold text-[#6d717e]">조선일보</span></div>
          <h3 class="flex gap-1.5 text-[16px] font-semibold leading-[1.5] group-hover:text-primary md:text-[24px] md:leading-[1.2]"><span class="line-clamp-2">제목</span><svg arrow-up-right/></h3>
          <p class="line-clamp-2 text-[14px] leading-[1.5] text-[#6d717e] md:text-[16px]">요약</p>
          <span class="text-[14px] text-[#9ca0ab] md:text-[18px]">2026.10.10</span>
        </div>
        <div class="h-[67px] w-[100px] shrink-0 overflow-hidden rounded-[8px] transition-transform duration-300 ease-out group-hover:scale-105 md:h-[150px] md:w-[225px]"><img></div>
      </a>
    </div>
    <!-- 페이지네이션: 버튼 h-8 rounded-[8px] px-3.5 text-[14px], 활성 bg-[#1571f3] text-white, 이전/다음 chevron -->
  </div>
</section>
```

---

## 3. 공통 푸터
- `footer.w-full.bg-[#f6f7f9].px-6.py-[60px].md:px-10.xl:px-0` > `max-w-[1200px] flex-col gap-[60px] md:gap-[100px]`
- 상단: 로고(심볼 + 26/31px bold 텍스트) ↔ 메뉴 컬럼(`grid grid-cols-2 sm:grid-cols-3 lg:flex lg:gap-[12px]`, 컬럼 `flex-col gap-4 md:w-[80~110px]`, 헤더 14px `#9ca0ab`, 링크 14px medium `#16171b`)
- 하단: `border-t border-[rgba(82,82,91,0.08)] py-6` 회사 정보(12px, leading 1.6, `#9ca0ab`) + 이용약관/개인정보처리방침(`#3c3f47`, 후자 semibold) ↔ 원형 아이콘 버튼(`size-11 rounded-full bg-[#e4e5e8] hover:bg-[#d1d3d8]`, 메일·주소는 hover 툴팁 `bg-[#16171b] text-[13px] rounded-lg` + 아래 꼬리)

## 4. 회사소개 (`/company`, 미구현)
- 제목 "회사소개" 48px → 대형 라운드(약 16px) 사진 배너 위 흰색 3줄 카피(약 56px bold)
- "OOO 사람들" 섹션: 좌측 큰 인물 사진 카드 + 우측 직함(파랑)·이름(큰 bold)·소개 2줄 → 아래 인물 썸네일 11개 가로 나열(선택된 카드 파란 테두리, 나머지 회색 오버레이)
