// 홈 상단(히어로·고객사·서비스 소개·서비스별 레퍼런스·대표 교육 사례) 콘텐츠
// 기업명·교육 내용·성과 수치는 시그마인 기업 소개서(2·3·12~18p) 원문 기준.
// 실제 기업명이므로 소개서에 없는 수치나 후기는 붙이지 않는다.

export const HERO = {
  title: ['AI 전환의 시작,', '한국AX협회'],
  subtitle: '임직원 맞춤형 AI 교육부터 업무 자동화 도입까지\n함께하는 기업 AX 파트너입니다',
  primary: { label: '교육 문의하기', to: '/contact' },
  secondary: { label: '소개서 받기', to: '/documents' },
  /** CTA 아래 신뢰 문구 */
  trust: ['삼성전자 · 삼성화재 · 한국야쿠르트 교육 진행', 'AI 자동화 구축 사례 6건'],
}

/** 히어로 아래 고객사 띠 — 소개서 12~16p에 나온 기업·기관 (로고 대신 이름) */
export const CLIENTS = {
  label: '함께한 기업·기관',
  names: [
    '삼성전자',
    '삼성화재',
    '한국야쿠르트',
    'KNU Cosmetics',
    '연세대학교',
    'Gen.G',
    'AI Hub',
    '탭엔젤파트너스',
    '크리에이티브 디스패치',
    '한국청소년활동진흥원',
    'ScopeLabs',
    'Pharm Nutrition',
    '에스에스네트웍스',
    '대한몰',
    'LOWORD',
  ],
}

// ── 서비스 소개 (스크롤 고정 탭 + 사진 3장 아코디언) ─────────────

export type SolutionTab = { title: string; to: string; steps: string[] }

export const SOLUTION = {
  title: '교육부터 실무 도입까지',
  subtitle: 'AI 교육, AX 컨설팅, 맞춤형 AI 개발까지 한 팀이 끝까지 책임집니다',
  tabs: [
    {
      title: '맞춤형 AI 교육',
      to: '/service/ai-education',
      steps: [
        '데이터 분석, 생성형 AI, 업무 자동화까지 분야별 전문 교육을 제공합니다',
        '4시간 특강부터 3일 전문가 양성 과정까지 대상과 목적에 맞춰 설계합니다',
        'AI·데이터 현업 전문가가 실습 중심으로 직접 교육합니다',
      ],
    },
    {
      title: 'AX 컨설팅',
      to: '/service/ax-consulting',
      steps: [
        '반복 업무를 찾아내고 자동화 효과가 큰 과제부터 정리합니다',
        '콘텐츠 생산, 데이터 분석, CS 등 업무별 AX 프로그램을 설계합니다',
        '도입 이후 성과를 예측하고 고도화·후속 관리까지 지원합니다',
      ],
    },
    {
      title: '맞춤형 AI 개발',
      to: '/service/ai-development',
      steps: [
        '산업과 기업의 특성에 맞는 AI 자동화 서비스를 기획합니다',
        '사내 메신저 챗봇, 문서 자동화, AI 비전 등 실무에 바로 쓰는 도구를 만듭니다',
        '운영 데이터를 바탕으로 기능을 계속 개선합니다',
      ],
    },
  ] satisfies SolutionTab[],
}

// ── 서비스 트랙 (서비스별 레퍼런스) ─────────────────────────────

export type TrackRef = { client: string; title: string; tag: string; result?: string }

export type Track = {
  id: string
  name: string
  /** 레퍼런스 한 줄 요약 */
  summary: string
  to: string
  more: string
  refsLabel: string
  refs: TrackRef[]
  /** 바로 도입 가능한 프로그램 (AX 트랙) */
  programs?: { label: string; items: string[] }
}

export const TRACKS = {
  title: '서비스별로 확인하는\n한국AX협회의 레퍼런스',
  sub: '분야별 교육 이력과 맞춤형 자동화 구축 성과를 그대로 공개합니다.',
  items: [
    {
      id: 'education',
      name: '맞춤형 AI 교육',
      summary: '대기업부터 공공기관·대학까지 9곳에서 분야별 맞춤 교육을 진행했습니다.',
      to: '/service/ai-education',
      more: '맞춤형 AI 교육 자세히 보기',
      refsLabel: '분야별 맞춤 교육 이력',
      refs: [
        { client: '삼성전자', title: '임직원 대상 파이썬 데이터 분석', tag: '데이터 분석' },
        { client: '삼성화재', title: '임직원 대상 AI 비즈니스 전문가 양성과정 프로젝트 실습', tag: 'AI 비즈니스' },
        { client: '한국야쿠르트', title: 'DX 교육, AI & 자동화 프로젝트 멘토링', tag: 'DX / AI' },
        { client: 'KNU Cosmetics', title: 'ChatGPT 업무 활용 교육', tag: '생성형 AI' },
        { client: '연세대학교', title: 'GPTs 고급 활용 교육', tag: '생성형 AI' },
        { client: 'Gen.G', title: '데이터 분석 및 시각화 교육', tag: '데이터 분석' },
        { client: 'AI Hub', title: 'Stable Diffusion 업무 활용 교육', tag: '이미지 생성 AI' },
        { client: '탭엔젤파트너스', title: 'AI 업무 자동화 도입과 성공 사례', tag: '업무 자동화' },
        { client: '크리에이티브 디스패치', title: 'AI 업무 활용 교육', tag: '업무 활용' },
      ],
    },
    {
      id: 'ax',
      name: 'AX 컨설팅 · 맞춤형 AI 개발',
      summary: '6개 기업·기관의 반복 업무를 AI로 자동화한 사례와 성과입니다.',
      to: '/service/ax-consulting',
      more: 'AX 컨설팅 자세히 보기',
      programs: {
        label: '바로 도입 가능한 AX 프로그램',
        items: [
          '블로그 / 스레드 콘텐츠 작성 AI',
          '리뷰 수집 및 계정 인사이트 분석 자동화',
          '산업 데이터 수집 및 콘텐츠 발송',
          '맞춤형 CS 챗봇 도입',
          '사내 메신저 도입',
        ],
      },
      refsLabel: '맞춤형 자동화 구축 사례',
      refs: [
        {
          client: '한국청소년활동진흥원',
          title: '공문서 요약 및 작성 자동화',
          tag: '문서 자동화',
          result: '반복 업무 70% 이상 시간 단축',
        },
        {
          client: 'ScopeLabs',
          title: '맞춤형 AI 뉴스 큐레이션',
          tag: '뉴스 큐레이션',
          result: '뉴스 탐색·정리 시간 60% 단축',
        },
        {
          client: 'Pharm Nutrition',
          title: '홈페이지 콘텐츠 업로드 자동화',
          tag: '홈페이지 관리',
          result: '반복 입력·검수 업무 60% 이상 단축',
        },
        {
          client: '에스에스네트웍스',
          title: '스마트팜 CCTV 자세·행동 인식',
          tag: 'AI 비전',
          result: '건강 이상 조기 대응률 34% 향상',
        },
        {
          client: '대한몰',
          title: '사내 메신저 업무용 챗봇 구축',
          tag: '챗봇',
          result: '반복 문의·행정 처리 50% 이상 절감',
        },
        {
          client: 'LOWORD',
          title: '블로그 가치 평가 모델 개발',
          tag: '모델 개발',
          result: '평가·리포트 작성 시간 45% 이상 절감',
        },
      ],
    },
  ] satisfies Track[],
}

// ── 대표 교육 사례 (소개서 17~18p) ─────────────────────────────

export type CaseItem = {
  client: string
  title: string
  /** 소개서의 분야·대상 태그 */
  tags: string[]
  /** 교육 형태 · 시간 */
  meta: string
  summary: string
  goals: string[]
  curriculum: string[]
  comments: string[]
  /** 사진 자리 색 */
  tone: number
}

export const FEATURED_CASES = {
  title: '대표 교육 사례',
  sub: '교육 목표부터 커리큘럼, 교육생 반응까지 그대로 보여드립니다',
  labels: { format: '교육 형태', goals: '교육 목표', curriculum: '교육 커리큘럼', comments: '교육생 코멘트' },
  tabsLabel: '대표 교육 사례 선택',
  more: { label: '교육 사례 전체보기 →', to: '/news/cases' },
}

export const CASES: CaseItem[] = [
  {
    client: '삼성전자',
    title: '임직원 대상 파이썬 데이터 분석',
    tags: ['파이썬 데이터 분석', '경영진 + 관리자'],
    meta: '온라인 · 총 24시간 (3일)',
    summary: '데이터를 효과적으로 처리하고 분석하는 기술을 익혀, 데이터 기반 의사결정 능력을 높이는 과정입니다.',
    goals: [
      '데이터를 효과적으로 처리하고 분석하는 기술 습득',
      '데이터 기반 의사결정 능력 향상',
      'AI와 머신러닝에 필요한 데이터 분석 기초 다지기',
    ],
    curriculum: ['Pandas 라이브러리 알아보기', '데이터 변환하고 요약하기', '데이터 정제하고 병합하기'],
    comments: [
      '커리큘럼이 실무와 가깝게 설계되어 바로 적용 가능',
      '다양한 적용 예시와 응용법이 유익했음',
      '실제 데이터를 어떻게 다루고 활용할 수 있는지 도구를 확보함',
    ],
    tone: 0,
  },
  {
    client: '삼성화재',
    title: '임직원 대상 AI 비즈니스 전문가 양성',
    tags: ['AI', '관리자'],
    meta: '오프라인 · 총 24시간 (3일)',
    summary: 'AI 기초부터 생성형 AI 실습, 데이터 분석 프로젝트까지 실무 적용 능력을 기르는 전문가 양성 과정입니다.',
    goals: ['AI 기초 학습 및 실무 적용 능력 배양', '생성형 AI에 대한 이해 및 실습', 'AI 리터러시 향상'],
    curriculum: ['나만의 GPTs 만들기', '데이터 분석 프로젝트', '업무에 생성형 AI 도입 (파이썬)'],
    comments: [
      '실제 챗봇 기획과 시연을 통해 업무 적용 가능성을 체감했습니다',
      '생성형 AI를 단순히 체험하는 것을 넘어서, 비즈니스 도입 방법을 배울 수 있어 유익했습니다',
      '데이터 기반 프로젝트를 직접 수행해보며 자신감이 생겼습니다',
    ],
    tone: 1,
  },
  {
    client: '한국야쿠르트',
    title: 'DX 교육 / AI & 자동화 프로젝트',
    tags: ['DX / AI', '관리자'],
    meta: '오프라인 · 총 4시간',
    summary: 'DX 전환을 위한 AI 실무 역량을 강화하고, 업무에 적용하는 AI 실습과 자동화 프로젝트를 다룬 과정입니다.',
    goals: ['DX 전환을 위한 AI 실무 역량 강화', '생성형 AI와 데이터 분석 기반 자동화 이해', '업무 적용 중심의 AI 실습'],
    curriculum: ['나만의 GPTs 만들기', '데이터 분석 프로젝트', '업무에 생성형 AI 도입 (파이썬)'],
    comments: [
      '복잡한 AI 개념을 쉽게 설명해줘 비전공자도 따라갈 수 있었습니다',
      '사내 업무에 바로 적용할 수 있는 자동화 아이디어가 많이 떠올랐습니다',
    ],
    tone: 2,
  },
  {
    client: 'KNU Cosmetics',
    title: 'GPT 활용 교육',
    tags: ['AI', '경영진 + 관리자'],
    meta: '오프라인 · 총 8시간',
    summary: 'AI/GPT를 활용한 업무 혁신 전략을 배우고, 조직에 맞는 GPT 도구를 직접 만드는 과정입니다.',
    goals: ['AI/GPT를 활용한 업무 혁신 전략 학습', '개인 맞춤형 GPT 도구 제작', 'AI를 통한 업무 자동화 기반 마련'],
    curriculum: ['AI/GPT 비즈니스 활용 전략', '챗GPT 프롬프트 엔지니어링', '나만의 맞춤형 GPTs 만들기'],
    comments: [
      '실무에 바로 적용할 수 있는 프롬프트 기획 역량이 생겼습니다',
      '일상 업무를 자동화할 수 있다는 점에서 큰 기대를 갖게 되었습니다',
      '교육 후 우리 조직에 맞춘 GPTs를 직접 만들 수 있게 되었습니다',
    ],
    tone: 3,
  },
]
