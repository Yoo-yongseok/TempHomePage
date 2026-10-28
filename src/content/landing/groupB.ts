// 랜딩 하단 B그룹(운영 지원·운영 관리·교육 로드맵·가치) — B2B 기업교육 흐름 (수치는 임시값)

export type BenefitMock = 'chat' | 'app' | 'steps'

export type BenefitRow = {
  label: string
  title: string
  desc: string
  mock: BenefitMock
}

export const BENEFITS = {
  title: '교육 담당자를 위한 운영 지원',
  /** app 목업 자리 표시 문구 */
  appLabel: '교육 운영 대시보드 화면',
  rows: [
    {
      label: '교육 전용 Q&A 채널',
      title: '교육 중에도, 끝난 뒤에도\n전용 채널에서 질문',
      desc: '실습 녹화본과 예제 데이터를 교육 전용 채널로 전달하고,\n현업에 적용하다 막히는 부분은 바로 질문할 수 있습니다.',
      mock: 'chat',
    },
    {
      label: '교육 운영 대시보드',
      title: '출결·과제·만족도를\n담당자 화면 하나로',
      desc: '교육 담당자는 출결과 과제 제출, 만족도 결과를\n대시보드에서 한눈에 확인하고 보고 자료로 내려받습니다.',
      mock: 'app',
    },
    {
      label: '사후 AX 컨설팅',
      title: '교육 후에도\nAX 도입 컨설팅까지',
      desc: '교육으로 끝나지 않습니다. 교육 중 도출한 자동화 과제를 실제 업무에 도입할 수 있도록 컨설팅으로 이어갑니다.',
      mock: 'steps',
    },
  ] as BenefitRow[],
}

/** 운영 지원 1 — 교육 전용 Q&A 채널 채팅 카드 */
export const BENEFIT_CHAT = {
  lounge: '교육 Q&A 채널',
  room: 'S사 데이터 분석 과정',
  members: '38명',
  status: '실시간',
  date: '6월 14일 토요일',
  manager: {
    avatar: '매',
    name: '한국AX협회 교육매니저',
    time: '오후 7:12',
    text: '2일차 실습 녹화본과 예제 데이터 올려드려요. 팀 데이터로 적용하다 막히면 언제든 질문 남겨주세요!',
  },
  video: { title: '2일차 실습 다시보기', duration: '52:10' },
  reply: { text: '감사합니다! 우리 팀 매출 데이터로 다시 해볼게요', time: '오후 7:15', read: '읽음' },
  input: '메시지를 입력하세요',
}

export type ConsultStepStatus = 'done' | 'current' | 'upcoming'

/** 운영 지원 3 — 사후 AX 컨설팅 진행 체크리스트 */
export const BENEFIT_STEPS = {
  label: '사후 AX 컨설팅',
  chip: '맞춤',
  progressSuffix: '완료',
  steps: [
    { title: '교육 성과 리포트 전달', meta: '6월 20일 완료', status: 'done' },
    { title: '자동화 과제 우선순위 정리', meta: '6월 27일 완료', status: 'done' },
    { title: 'AX 프로그램 시범 도입', meta: '담당 컨설턴트와 진행 중', status: 'current' },
    { title: '도입 효과 측정·고도화', meta: '도입 후 예정', status: 'upcoming' },
  ] as { title: string; meta: string; status: ConsultStepStatus }[],
  note: '교육 수료 후 제공',
}

export const PLATFORM = {
  title: '교육 운영부터 성과 측정까지, 담당자 화면 하나로 관리합니다',
  steps: [
    {
      title: '운영 관리',
      desc: '차수별 일정과 출결, 교육생 명단을 한 화면에서 관리하고 변경 사항을 바로 공유합니다.',
    },
    {
      title: '과제 관리',
      desc: '교육생이 제출한 실습 과제와 강사 피드백을 모아, 현업 적용 과제로 이어질 후보를 고릅니다.',
    },
    {
      title: '성과 관리',
      desc: '사전 진단 대비 교육 후 변화와 만족도를 리포트로 정리해 내부 보고에 그대로 씁니다.',
    },
  ],
  image: '교육 운영 대시보드 화면',
  chipName: '한국AX협회 교육 대시보드',
  chipText: '출결·과제·만족도·성과를 한곳에서 확인하는 담당자 전용 화면',
}

export type DemoKind = 'report' | 'resume' | 'interview'

export type CurriWeek = {
  badge: string
  /** 카드 상단 모노 칩 */
  chip: string
  topic: string
  sum: string[]
  /** 탭 패널 보더·배너를 블루로 강조 */
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
  title: '진단부터 현업 적용까지, 기업 맞춤 교육 로드맵',
  /** 브라우저 프레임 주소창 — 뒤에 /{demo} */
  host: 'koreaax.app',
  tabsLabel: '단계별 교육 과정',
  weeks: [
    {
      badge: '1단계',
      chip: '진단',
      topic: 'AI 활용 수준 진단 & 교육 설계',
      sum: ['부서별 AI 활용도 진단', '반복 업무 분석', '맞춤 커리큘럼 설계'],
      panel: {
        lead: '우리 조직의 현재 위치를 확인하고, 교육 목표를 정합니다',
        quote: '강의부터 하기 전에 진단부터 — 부서별 AI 활용 수준과 자동화 가능 업무를 숫자로 확인합니다.',
        bullets: [
          { title: 'AI 활용도 진단', desc: '부서·직급별 생성형 AI, 데이터 분석, 자동화 활용 수준을 측정' },
          { title: '반복 업무 분석', desc: '담당자 인터뷰로 시간이 많이 드는 반복 업무를 찾아 정리' },
          { title: '맞춤 커리큘럼 설계', desc: '진단 결과에 맞춰 분야별 전문 교육과 특화 교육을 조합' },
        ],
        demo: 'report',
        caption: '사전 진단으로 만든 조직 AI 활용도 리포트',
        banner: '진단 결과는 교육 설계의 기준이 되고, 교육이 끝난 뒤 성과를 비교하는 출발점이 됩니다.',
      },
    },
    {
      badge: '2단계',
      chip: '실습',
      topic: '직무별 맞춤 실습 교육',
      sum: ['우리 업무 데이터로 실습', '나만의 GPTs 만들기', '강사 1:1 피드백'],
      panel: {
        lead: '예제가 아니라 우리 업무로, 바로 쓰는 결과물을 만듭니다',
        quote: '듣는 강의 대신 만드는 실습 — 실제 업무를 자동화하는 기획서와 GPTs를 직접 완성합니다.',
        bullets: [
          { title: '업무 데이터 실습', desc: '교육생이 실제로 다루는 문서·데이터로 분석과 자동화를 실습' },
          { title: '나만의 GPTs 만들기', desc: '반복 업무 하나를 골라 맞춤형 GPTs로 직접 구현' },
          { title: '강사 1:1 피드백', desc: '현업 전문가 강사가 결과물을 검토하고 개선 방향을 제시' },
        ],
        demo: 'resume',
        caption: '강사 피드백으로 다듬은 업무 자동화 기획서',
        banner: '실습 결과물은 교육 후 현업 적용 프로젝트의 출발점으로 그대로 이어집니다.',
      },
    },
    {
      badge: '3단계',
      chip: '적용',
      topic: '현업 적용 프로젝트 & 성과 발표',
      sum: ['팀별 자동화 프로젝트', '결과 발표·평가', '교육 성과 리포트'],
      climax: true,
      panel: {
        lead: '"이제 진짜 우리 업무에 쓴다" — 팀별 프로젝트로 현업 적용까지 확인합니다',
        quote: '팀마다 자동화 과제를 하나씩 완성하고, 발표와 평가로 실제 도입 가능성을 검증합니다.',
        bullets: [
          { title: '팀별 자동화 프로젝트', desc: '부서 업무 중 효과가 큰 과제를 골라 팀 단위로 구현' },
          { title: '결과 발표·평가', desc: '업무 적합도·실행 가능성·기대 효과를 항목별로 평가' },
          { title: '교육 성과 리포트', desc: '사전 진단 대비 변화와 프로젝트 결과를 담당자에게 전달' },
        ],
        demo: 'interview',
        caption: '팀 프로젝트 발표를 평가한 피드백 리포트',
        banner: '교육이 연습으로 끝나지 않고, 실제 업무에 쓰는 자동화 결과물로 남습니다.',
      },
    },
    {
      badge: '교육 후',
      chip: '교육 후',
      topic: '사후 AX 컨설팅',
      sum: ['교육 수료 후 신청하여 진행', '자동화 과제 도입과 성과 관리'],
      climax: true,
    },
  ] as CurriWeek[],
}

/** 1단계 데모 — 조직 AI 활용도 진단 리포트 */
export const DEMO_REPORT = {
  title: '조직 AI 활용도 진단 리포트',
  meta: '영업·마케팅본부 · 2026.06',
  score: 58,
  labels: { overall: '종합 AI 활용도', done: '활용 중', gap: '개선 필요', skills: '영역별 점수', unit: '점' },
  skills: [
    { name: '생성형 AI 활용', value: 64 },
    { name: '데이터 분석', value: 52 },
    { name: '업무 자동화', value: 41 },
  ],
  actions: ['GPTs 실습 우선 배치', '데이터 정제 기초 보강', '자동화 후보 업무 12건'],
  chips: ['교육 전후 비교 제공', '한국AX협회 교육 대시보드'],
}

/** 2단계 데모 — 업무 자동화 기획서 + 강사 피드백 */
export const DEMO_RESUME = {
  docLabel: '업무 자동화 기획서 · 실습 결과물',
  avatar: '박',
  name: '영업지원팀 박○웅',
  role: '주간 매출 보고서 자동화 GPTs',
  badge: '피드백 완료',
  sections: [
    { head: '자동화 대상 업무', body: '매주 3시간이 걸리던 지역별 매출 주간 보고서 작성' },
    { head: '설계한 GPTs', body: '매출 데이터 업로드 → 요약·이상치 표시 → 보고서 초안 자동 생성' },
    { head: '기대 효과', body: '보고서 작성 시간 3시간 → 20분 (예상)' },
  ],
  commentsLabel: '강사 피드백',
  comments: [
    { tag: '구체화', text: '입력 데이터 양식을 고정하면 결과가 더 안정적입니다.' },
    { tag: '확장', text: '같은 구조로 월간 보고서에도 바로 적용할 수 있습니다.' },
    { tag: '보안', text: '고객 정보는 마스킹 후 업로드하도록 가이드를 추가하세요.' },
  ],
  next: '→ 3단계: 이 기획서로 현업 적용 프로젝트',
}

/** 3단계 데모 — 팀 프로젝트 발표 평가 */
export const DEMO_INTERVIEW = {
  tab: '한국AX협회 프로젝트 평가',
  question: 'Q. 팀 프로젝트: 고객 문의 1차 응대 자동화 챗봇',
  answer:
    '자주 묻는 질문 120건을 유형별로 분류해 사내 메신저 챗봇으로 1차 응대를 자동화했습니다. 담당자 확인이 필요한 문의만 넘기도록...',
  feedbackLabel: '강사 피드백',
  scoreLabel: '프로젝트 평가',
  total: 88,
  scores: [
    { name: '업무 적합도', value: 92 },
    { name: '실행 가능성', value: 85 },
    { name: '기대 효과', value: 88 },
  ],
  feedback: ['실제 문의 데이터로 검증한 점이 좋습니다.', '도입 전후 처리 시간을 함께 측정해 보세요.'],
  next: '다음 단계: AX 프로그램 시범 도입',
}

export const VALUE = {
  title: '교육 한 번으로\n조직에 이만큼 남깁니다',
  /** 각 열의 제목 — columns와 같은 순서 */
  headings: ['배우는 것', '조직에 남는 것', '함께 받는 지원'],
  columns: [
    [
      { title: '생성형 AI 업무 활용', desc: '프롬프트 설계부터 GPTs 제작까지' },
      { title: '파이썬 데이터 분석', desc: 'Pandas로 데이터 정제·요약·병합' },
      { title: '업무 자동화 설계', desc: '반복 업무를 찾아 자동화 흐름으로 정리' },
      { title: 'AI 비즈니스 활용 전략', desc: '부서별 도입 우선순위와 기대 효과 산정' },
      { title: '데이터 시각화', desc: '분석 결과를 보고서·대시보드로 전달' },
    ],
    [
      { title: '조직 AI 활용도 리포트', desc: '교육 전후를 비교하는 진단 기록' },
      { title: '부서별 맞춤 GPTs', desc: '교육생이 직접 만든 업무 도구' },
      { title: '자동화 과제 목록', desc: '효과·난이도를 평가한 도입 후보' },
      { title: '사내 AI 활용 가이드', desc: '다음 교육과 확산에 쓰는 기준 문서' },
    ],
    [
      { title: '교육 운영 대시보드', desc: '출결·과제·만족도를 한곳에서 관리' },
      { title: '사후 AX 컨설팅', desc: '도출한 과제를 실제 업무에 도입' },
      { title: '실습 녹화본 제공', desc: '교육 후에도 반복 학습' },
      { title: '교육 전용 Q&A 채널', desc: '강사·매니저에게 실시간 질문' },
      { title: '성과 리포트 작성 지원', desc: '내부 보고용 자료로 바로 활용' },
    ],
  ],
}
