// 랜딩 하단 B그룹(혜택·플랫폼·커리큘럼·가치) 콘텐츠 — 목업 속 수치·이름은 예시

export type BenefitMock = 'chat' | 'app' | 'steps'

export type BenefitRow = {
  label: string
  title: string
  desc: string
  mock: BenefitMock
}

export const BENEFITS = {
  title: '한국AX협회 기업 교육 혜택',
  appImage: '교육 운영 리포트 화면',
  rows: [
    {
      label: '다시보기·실습 자료 제공',
      title: '교육 후\n다시보기·실습 자료 제공',
      desc: '교육이 끝나도 현업에서 다시 꺼내 볼 수 있도록\n강의 녹화본과 실습 예제를 함께 전달합니다.',
      mock: 'chat',
    },
    {
      label: '교육 운영 리포트',
      title: '출석·실습·만족도를\n리포트 하나로',
      desc: '교육 담당자가 따로 정리하지 않아도\n과정별 운영 결과를 리포트로 받아볼 수 있습니다.',
      mock: 'app',
    },
    {
      label: 'AX 컨설팅 연계',
      title: '교육 후에도\nAX 컨설팅까지',
      desc: '교육으로 끝나지 않습니다. 교육에서 나온 자동화 과제를 실제 도구로 만들어 현업에 적용합니다.',
      mock: 'steps',
    },
  ] as BenefitRow[],
}

/** 혜택 1 — 교육 운영 채널 채팅 카드 */
export const BENEFIT_CHAT = {
  lounge: '교육 운영 채널',
  room: '임직원 AI 실무과정 2기',
  members: '38명',
  status: '실시간',
  date: '6월 14일 금요일',
  manager: {
    avatar: '매',
    name: '한국AX협회 교육매니저',
    time: '오후 6:12',
    text: '오늘 실습한 GPTs 예제와 강의 녹화본 올려드려요. 업무에 적용하다 막히면 언제든 질문 남겨주세요!',
  },
  video: { title: '2회차 실습 다시보기', duration: '52:10' },
  reply: { text: '감사합니다! 팀 주간 보고서에 바로 써볼게요', time: '오후 6:15', read: '읽음' },
  input: '메시지를 입력하세요',
}

export type ConsultStepStatus = 'done' | 'current' | 'upcoming'

/** 혜택 3 — AX 컨설팅 진행 체크리스트 */
export const BENEFIT_STEPS = {
  label: 'AX 컨설팅 연계',
  chip: '맞춤',
  progressSuffix: '완료',
  steps: [
    { title: '현업 자동화 과제 발굴', meta: '6월 3일 완료', status: 'done' },
    { title: '도입 우선순위 설계', meta: '6월 10일 완료', status: 'done' },
    { title: '맞춤 AI 도구 개발', meta: '개발팀과 진행 중', status: 'current' },
    { title: '성과 점검·고도화', meta: '도입 후 예정', status: 'upcoming' },
  ] as { title: string; meta: string; status: ConsultStepStatus }[],
  note: '교육 수료 기업 대상',
}

export const PLATFORM = {
  title: '교육 설계부터 운영, 성과 확인까지 한곳에서 관리합니다',
  steps: [
    {
      title: '교육 설계',
      desc: '사전 진단 결과로 대상·시간·실습 과제를 정하고 과정안을 확정합니다.',
    },
    {
      title: '운영 관리',
      desc: '회차별 출석과 실습 진행 상황을 확인하고 교육생 질문에 바로 답합니다.',
    },
    {
      title: '성과 관리',
      desc: '만족도와 실습 결과물을 모아 다음 과정과 현업 적용 계획으로 이어갑니다.',
    },
  ],
  image: '교육 운영 대시보드 화면',
  chipName: '한국AX협회 교육 리포트',
  chipText: '설계·운영·성과를 한곳에서 관리하는 기업 교육 관리',
}

export type DemoKind = 'report' | 'resume' | 'interview'

export type CurriWeek = {
  badge: string
  /** 카드 상단 칩 */
  chip: string
  topic: string
  sum: string[]
  /** 탭 패널 보더·배너를 블루로 강조 (3단계) */
  climax?: boolean
  /** 탭 패널 (교육 후 카드는 클릭 불가라 없음) */
  panel?: {
    lead: string
    quote: string
    bullets: { title: string; desc: string }[]
    demo: DemoKind
    caption: string
    banner: string
  }
}

export const CURRICULUM = {
  title: '3단계로 완성하는 기업 AX 교육 (AX 컨설팅 연계)',
  /** 브라우저 프레임 주소창 — 뒤에 /{demo} */
  host: 'koreaax.app',
  tabsLabel: '단계별 커리큘럼',
  weeks: [
    {
      badge: '1단계',
      chip: '1단계',
      topic: 'AI 리터러시 & 조직 진단',
      sum: ['조직 AI 활용 진단', '생성형 AI 이해', '진단 리포트'],
      panel: {
        lead: '우리 조직의 AI 활용 수준을 확인하고, 교육 목표를 잡습니다',
        quote: '무작정 교육하기 전에 진단부터 — 부서별 AI 활용 수준을 숫자로 확인합니다.',
        bullets: [
          { title: '조직 AI 활용 진단', desc: '부서별 업무와 생성형 AI·데이터 활용 수준을 측정' },
          { title: '생성형 AI 이해', desc: 'AI가 잘하는 일과 못하는 일, 업무 적용 원칙을 정리' },
          { title: '진단 리포트', desc: '보완할 역량과 추천 실습이 담긴 리포트를 전달' },
        ],
        demo: 'report',
        caption: '사전 진단으로 만든 조직 AI 활용 리포트',
        banner: '진단 결과는 이후 실습 과제와 AX 컨설팅의 출발점이 됩니다.',
      },
    },
    {
      badge: '2단계',
      chip: '2단계',
      topic: '직무별 생성형 AI 실습',
      sum: ['나만의 GPTs 만들기', '프롬프트 엔지니어링', '자동화 기획서 작성'],
      panel: {
        lead: '직무에 맞는 AI 도구를 직접 만들고, 자동화할 업무를 정리합니다',
        quote: '듣기만 하지 않고 만들어 봅니다 — 내 업무에 쓸 GPTs와 자동화 기획서를 완성합니다.',
        bullets: [
          { title: '나만의 GPTs 만들기', desc: '반복 업무에 맞춘 GPTs를 교육 시간 안에 직접 제작' },
          { title: '프롬프트 엔지니어링', desc: '업무 문서·보고서에 바로 쓰는 프롬프트 설계법 실습' },
          { title: '자동화 기획서 작성', desc: '자동화할 업무와 기대 효과를 정리하고 강사 피드백' },
        ],
        demo: 'resume',
        caption: '강사 피드백으로 다듬은 업무 자동화 기획서',
        banner: '완성한 기획서는 3단계 현업 프로젝트에서 그대로 실행합니다.',
      },
    },
    {
      badge: '3단계',
      chip: '3단계',
      topic: '현업 적용 프로젝트',
      sum: ['우리 회사 데이터 실습', '프로젝트 발표·평가', '현업 적용 계획'],
      climax: true,
      panel: {
        lead: '"이제 진짜 업무에 쓴다" — 우리 회사 데이터로 프로젝트를 완성합니다',
        quote: '실제 업무 데이터로 자동화를 만들고, 발표와 피드백으로 현업 적용 계획까지 세웁니다.',
        bullets: [
          { title: '우리 회사 데이터 실습', desc: '실제 업무 데이터로 분석·자동화 프로젝트 진행' },
          { title: '프로젝트 발표·평가', desc: '업무 적합도·완성도를 항목별 점수와 코멘트로 확인' },
          { title: '현업 적용 계획', desc: '팀별로 도입 순서와 담당자를 정해 실행 계획 수립' },
        ],
        demo: 'interview',
        caption: '현업 프로젝트 발표를 평가한 피드백 리포트',
        banner: '교육 결과물이 연습으로 끝나지 않고, 실제 업무 도구로 남습니다.',
      },
    },
    {
      badge: '교육 후',
      chip: '교육 후',
      topic: 'AX 컨설팅 · 맞춤 AI 개발',
      sum: ['교육 수료 후 신청하여 진행', '현업 과제에 맞춘 자동화 구축'],
      climax: true,
    },
  ] as CurriWeek[],
}

/** 커리큘럼 데모 화면용 수치 (예시) */
export const DEMO_REPORT = {
  title: '조직 AI 활용 진단 리포트',
  meta: '사전 진단 · 2026.06',
  labels: { score: '종합 활용도', skills: '분야별 점수', ready: '활용 중', gap: '보완 필요' },
  score: 62,
  skills: [
    { name: '생성형 AI 활용', value: 58 },
    { name: '데이터 분석', value: 66 },
    { name: '업무 자동화', value: 41 },
  ],
  actions: ['GPTs 실습 우선 배치', '데이터 분석 기초 보강', '부서별 과제 선정'],
  chips: ['교육 전 사전 진단', '한국AX협회 교육 리포트'],
}

export const DEMO_RESUME = {
  labels: { doc: '업무 자동화 기획서 · 수정본', comments: '강사 피드백' },
  initial: '영',
  name: '주간 매출 리포트 자동화',
  role: '영업기획팀 · 실습 과제',
  badge: '피드백 완료',
  sections: [
    { head: '문제 정의', body: '매주 3시간씩 걸리는 매출 데이터 취합과 보고서 정리' },
    { head: '해결 방법', body: 'GPTs와 파이썬으로 데이터 정리와 요약 문장을 자동 생성' },
    { head: '기대 효과', body: '리포트 작성 시간 단축, 수치 입력 오류 감소' },
  ],
  comments: [
    { tag: '범위', text: '첫 단계는 데이터 취합만 자동화해도 충분합니다.' },
    { tag: '데이터', text: '원본 엑셀 양식을 먼저 통일하면 오류가 줄어듭니다.' },
    { tag: '확장', text: '같은 구조를 다른 팀 리포트에도 쓸 수 있습니다.' },
  ],
  next: '→ 3단계: 이 기획서로 현업 프로젝트 진행',
}

export const DEMO_INTERVIEW = {
  tab: '한국AX협회 프로젝트 리뷰',
  labels: { feedback: '강사 피드백', score: '프로젝트 평가' },
  question: 'Q. 만든 자동화 도구를 어떤 업무에 적용했나요?',
  answer: '매주 반복되던 고객 문의 분류를 GPTs로 자동화해, 담당자 배정까지 한 번에 처리하도록 만들었습니다...',
  total: 86,
  scores: [
    { name: '업무 적합도', value: 90 },
    { name: '완성도', value: 82 },
    { name: '확장 가능성', value: 85 },
  ],
  feedback: ['적용 업무를 구체적으로 정의한 점이 좋습니다.', '도입 전후 소요 시간을 함께 기록하세요.'],
}

export const VALUE = {
  title: '교육으로 이만큼 배우고,\n이만큼 남깁니다',
  /** 각 열의 제목 — columns와 같은 순서 */
  headings: ['배우는 것', '손에 남는 것', '함께 받는 지원'],
  columns: [
    [
      { title: '생성형 AI 이해', desc: '업무에 쓰는 AI의 원리와 한계' },
      { title: '프롬프트 엔지니어링', desc: '보고서·문서에 바로 쓰는 설계법' },
      { title: '나만의 GPTs 만들기', desc: '반복 업무에 맞춘 도구 제작' },
      { title: '데이터 분석 · 시각화', desc: '파이썬으로 업무 데이터 다루기' },
      { title: '업무 자동화 기획', desc: '자동화할 업무와 효과 정리' },
    ],
    [
      { title: '조직 진단 리포트', desc: '부서별 AI 활용 수준 기록' },
      { title: '직접 만든 GPTs', desc: '교육 후 바로 쓰는 업무 도구' },
      { title: '자동화 기획서', desc: '현업 프로젝트로 이어지는 설계안' },
      { title: '스스로 적용하는 힘', desc: '다음 업무도 직접 자동화하는 방법' },
    ],
    [
      { title: '교육 운영 리포트', desc: '출석·실습·만족도 결과 정리' },
      { title: 'AX 컨설팅 연계', desc: '교육 후 자동화 구축까지' },
      { title: '강의 다시보기 영상', desc: '현업에서 반복 복습' },
      { title: '실습 예제·자료', desc: '교육에 쓴 예제 그대로 제공' },
      { title: '교육 후 Q&A', desc: '업무 적용 중 질문 응대' },
    ],
  ],
}
