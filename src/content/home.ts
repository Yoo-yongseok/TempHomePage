// 홈 상단(히어로·고객사 로고·현장 갤러리·서비스 탭·교육 이력) 콘텐츠
// 기업명·교육 내용·성과 수치는 시그마인 기업 소개서(12~18p) 원문 기준.
// 실제 기업명이므로 소개서에 없는 수치나 후기는 붙이지 않는다.

export const HERO = {
  title: ['AX의 시작과 끝,', '한국AX협회'],
  subtitle: 'AX 전문가 양성부터 기업 AX 교육까지',
  primary: { label: '교육 문의하기', to: '/contact' },
  secondary: { label: '소개서 받기', to: '/documents' },
  /** CTA 아래 신뢰 문구 */
  trust: ['기업·기관 14곳과 함께', '4시간 특강부터 3일 과정까지'],
}

// ── 고객사 로고 띠 ─────────────────────────────────────────────

/** scale: 로고 높이 보정(1 = 띠 높이 전체). 정사각 엠블럼은 키우고 납작한 워드마크는 줄인다 */
export type ClientLogo = { name: string; src?: string; scale?: number }

/** 소개서 12~16p의 교육·구축 고객사 (로고를 확인한 곳만). src가 없으면 이름으로 표시 */
export const CLIENTS: ClientLogo[] = [
  { name: '삼성전자', src: '/logos/samsung-electronics.svg', scale: 0.6 },
  { name: '삼성화재', src: '/logos/samsung-fire.svg' },
  { name: '한국야쿠르트', src: '/logos/hy.png' },
  { name: 'KNU Cosmetics', src: '/logos/knu-cosmetics.png' },
  { name: '연세대학교', src: '/logos/yonsei.svg' },
  { name: 'Gen.G', src: '/logos/geng.svg', scale: 0.85 },
  { name: 'AI Hub', src: '/logos/aihub.png', scale: 0.7 },
  { name: '탭엔젤파트너스', src: '/logos/tabangel.png' },
  { name: '크리에이티브 디스패치', src: '/logos/creative-dispatch.png', scale: 0.75 },
  { name: '한국청소년활동진흥원', src: '/logos/kywa.png' },
  { name: 'ScopeLabs', src: '/logos/scopelabs.png', scale: 0.7 },
  { name: 'Pharm Nutrition', src: '/logos/pharm-nutrition.svg' },
  { name: '대한몰', src: '/logos/daehanmall.png' },
  { name: 'LOWORD', src: '/logos/loword.png', scale: 0.6 },
]

// ── 현장 갤러리 (카드 클릭 시 상세 모달) ───────────────────────

export type CaseItem = {
  tags: string[]
  title: string
  meta: string
  summary: string
  results: string[]
  /** 모달의 결과 블록 제목 (기본: 주요 성과) */
  resultsLabel?: string
  images: number
  tone: number
}

export const GALLERY = {
  title: ['한국AX협회가 함께한', 'AX 현장'],
  sub: '임직원 교육부터 업무 자동화 구축까지, 기업과 기관의 현장을 소개합니다',
  more: { label: '교육 사례 전체보기 →', to: '/news/cases' },
  modal: { summary: '프로그램 개요', results: '주요 성과', ask: '우리 조직에도 이런 프로그램이 필요하신가요?' },
}

export const CASES: CaseItem[] = [
  {
    tags: ['기업 교육', '파이썬 데이터 분석'],
    title: '삼성전자 임직원 대상 파이썬 데이터 분석',
    meta: '온라인 · 총 24시간 (3일) · 경영진 + 관리자',
    summary: '데이터를 효과적으로 처리·분석하는 기술을 익혀 데이터 기반 의사결정 능력을 높이는 과정입니다.',
    resultsLabel: '교육 구성',
    results: ['24시간 총 교육', '3일 과정', 'Pandas 실습 중심'],
    images: 3,
    tone: 0,
  },
  {
    tags: ['AX 구축', '문서 자동화'],
    title: '한국청소년활동진흥원 공문서 요약·작성 자동화',
    meta: 'AX 컨설팅 · 맞춤형 AI 개발',
    summary: '공문서가 내려오면 핵심 정보를 요약하고, 기본 정보만 입력하면 공문서 양식에 맞춰 작성해 주는 서비스를 만들었습니다.',
    results: ['반복 업무 시간 70%↑ 단축'],
    images: 3,
    tone: 1,
  },
  {
    tags: ['AX 구축', '뉴스 큐레이션'],
    title: 'ScopeLabs 맞춤형 AI 뉴스 큐레이션',
    meta: 'AX 컨설팅 · 맞춤형 AI 개발',
    summary: '관심 키워드와 업무 분야에 맞춰 AI가 기사를 실시간으로 수집·평가하고, 핵심만 알림으로 전달합니다.',
    results: ['뉴스 탐색·정리 시간 60% 단축'],
    images: 3,
    tone: 2,
  },
  {
    tags: ['기업 교육', 'AI 비즈니스'],
    title: '삼성화재 임직원 대상 AI 비즈니스 전문가 양성',
    meta: '오프라인 · 총 24시간 (3일) · 관리자',
    summary: 'AI 기초부터 생성형 AI 실습, 데이터 분석 프로젝트까지 실무 적용 능력을 기르는 전문가 양성 과정입니다.',
    resultsLabel: '교육 구성',
    results: ['24시간 총 교육', '3일 과정', 'GPTs·데이터 프로젝트 실습'],
    images: 3,
    tone: 3,
  },
  {
    tags: ['AX 구축', '홈페이지 관리'],
    title: 'Pharm Nutrition 홈페이지 콘텐츠 업로드 자동화',
    meta: 'AX 컨설팅 · 맞춤형 AI 개발',
    summary: '제품 정보를 일괄 업로드하고, 키워드만 넣으면 SEO에 맞춘 문구와 메타데이터를 자동으로 작성합니다.',
    results: ['반복 입력·검수 업무 60%↑ 단축'],
    images: 3,
    tone: 4,
  },
  {
    tags: ['기업 교육', '생성형 AI'],
    title: 'KNU Cosmetics GPT 활용 교육',
    meta: '오프라인 · 총 8시간 · 경영진 + 관리자',
    summary: 'AI/GPT를 활용한 업무 혁신 전략을 배우고, 조직에 맞는 GPT 도구를 직접 만드는 과정입니다.',
    resultsLabel: '교육 구성',
    results: ['8시간 총 교육', '프롬프트 엔지니어링', '맞춤형 GPTs 만들기'],
    images: 3,
    tone: 5,
  },
  {
    tags: ['기업 교육', 'DX / AI'],
    title: '한국야쿠르트 DX 교육 / AI & 자동화 프로젝트',
    meta: '오프라인 · 총 4시간 · 관리자',
    summary: 'DX 전환을 위한 AI 실무 역량을 강화하고, 업무에 바로 적용하는 AI 실습과 자동화 프로젝트를 다뤘습니다.',
    resultsLabel: '교육 구성',
    results: ['4시간 집중 과정', 'GPTs 만들기 실습', '자동화 프로젝트 멘토링'],
    images: 3,
    tone: 0,
  },
  {
    tags: ['AX 구축', '챗봇'],
    title: '대한몰 사내 메신저 업무용 챗봇 구축',
    meta: 'AX 컨설팅 · 맞춤형 AI 개발',
    summary: '메신저에서 FAQ·규정·IT 지원 답변을 바로 받고, 정책이 바뀌면 지식 베이스도 자동으로 갱신됩니다.',
    results: ['반복 문의·행정 처리 50%↑ 절감'],
    images: 3,
    tone: 1,
  },
  {
    tags: ['AX 구축', '모델 개발'],
    title: 'LOWORD 블로그 가치 평가 모델 개발',
    meta: 'AX 컨설팅 · 맞춤형 AI 개발',
    summary: '조회수·체류 시간 등을 분석해 블로그 가치를 점수로 산출하고, 예상 ROI를 대시보드로 보여줍니다.',
    results: ['평가·리포트 작성 시간 45%↑ 절감'],
    images: 3,
    tone: 2,
  },
]

// ── 서비스 소개 (스크롤 고정 탭 + 사진 3장 아코디언) ─────────────

export type SolutionTab = { title: string; to: string; steps: string[] }

export const SOLUTION = {
  title: '교육부터 실무 도입까지',
  subtitle: 'AI 교육, AX 컨설팅, 맞춤형 AI 개발까지 한 팀이 끝까지 책임집니다',
  tabs: [
    {
      title: '기업 AX 교육',
      to: '/service/ai-education',
      steps: [
        '생성형 AI, 데이터 분석, 업무 자동화까지 분야별 전문 교육을 제공합니다',
        '4시간 특강부터 3일 전문가 양성 과정까지 대상에 맞춰 설계합니다',
        'AI·데이터 현업 전문가가 실습 중심으로 직접 교육합니다',
      ],
    },
    {
      title: 'AX 컨설팅',
      to: '/service/ax-consulting',
      steps: [
        '반복 업무를 찾아 자동화 효과가 큰 과제부터 정리합니다',
        '콘텐츠, 데이터 분석, CS 등 업무별 AX 프로그램을 설계합니다',
        '도입 이후 성과를 점검하고 고도화까지 지원합니다',
      ],
    },
    {
      title: '맞춤형 AI 개발',
      to: '/service/ai-development',
      steps: [
        '산업과 기업 특성에 맞는 AI 자동화 서비스를 기획합니다',
        '사내 챗봇, 문서 자동화, AI 비전 등 바로 쓰는 도구를 만듭니다',
        '운영 데이터를 바탕으로 기능을 계속 개선합니다',
      ],
    },
  ] satisfies SolutionTab[],
}

// ── 분야별 맞춤 교육 이력 (소개서 16p: 현장 사진 + 교육 목록) ─────

export const EDU_HISTORY = {
  title: '분야별 맞춤 교육 이력',
  sub: '분야별 전문 교육과 맞춤형 특화 교육을 조합해 단계별 과정으로 설계합니다',
  photos: [
    { src: '/photos/edu-1.jpg', alt: '임직원들이 노트북으로 AI 실습을 하는 교육 현장' },
    { src: '/photos/edu-2.jpg', alt: '강사가 생성형 AI 활용 예시를 설명하는 교육 현장' },
  ],
  items: [
    { client: '삼성전자', title: '임직원 대상 파이썬 데이터 분석' },
    { client: '삼성화재', title: '임직원 대상 AI 비즈니스 전문가 양성과정 프로젝트 실습' },
    { client: '한국야쿠르트', title: 'DX 교육, AI & 자동화 프로젝트 멘토링' },
    { client: 'KNU Cosmetics', title: 'ChatGPT 업무 활용 교육' },
    { client: '연세대학교', title: 'GPTs 고급 활용 교육' },
    { client: 'Gen.G', title: '데이터 분석 및 시각화 교육' },
    { client: 'AI Hub', title: 'Stable Diffusion 업무 활용 교육' },
    { client: '탭엔젤파트너스', title: 'AI 업무 자동화 도입과 성공 사례' },
    { client: '크리에이티브 디스패치', title: 'AI 업무 활용 교육' },
  ],
}
