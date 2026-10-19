// 랜딩 하단 B그룹(혜택·플랫폼·커리큘럼·가치) 임시 콘텐츠 — 실제 문구가 나오면 교체

export type BenefitMock = 'chat' | 'app' | 'steps'

export type BenefitRow = {
  label: string
  title: string
  desc: string
  mock: BenefitMock
}

export const BENEFITS = {
  title: '바로잡 수강 혜택',
  rows: [
    {
      label: '강의 다시보기 제공',
      title: '강의 후\n다시보기 영상 제공',
      desc: '놓친 부분도, 시험 직전 복습도 걱정 없이.\n강의 녹화본을 전달해 언제든 다시 볼 수 있습니다.',
      mock: 'chat',
    },
    {
      label: '바로잡 학습 앱',
      title: '진도·과제·지원 현황을\n학습 앱 하나로',
      desc: '강의 진도와 과제, 모의고사 점수, 기업 지원 현황을\n바로잡 학습 앱에서 한눈에 확인합니다.',
      mock: 'app',
    },
    {
      label: '1:1 커리어 컨설팅',
      title: '수료 후에도\n1:1 커리어 컨설팅까지',
      desc: '교육으로 끝나지 않습니다. 내 경력과 목표 직무에 맞춘 1:1 컨설팅으로 실제 합격까지 함께합니다.',
      mock: 'steps',
    },
  ] as BenefitRow[],
}

/** 혜택 1 — 앱 내 스터디 라운지 채팅 카드 */
export const BENEFIT_CHAT = {
  lounge: '스터디 라운지',
  room: '정보처리기사 3기',
  members: '52명',
  status: '실시간',
  date: '6월 14일 토요일',
  manager: {
    avatar: '매',
    name: '바로잡 학습매니저',
    time: '오후 7:12',
    text: '오늘 3주차 강의 녹화본 올려드려요. 헷갈리는 부분은 언제든 질문 남겨주세요!',
  },
  video: { title: '3주차 강의 다시보기', duration: '52:10' },
  reply: { text: '감사합니다! 정규화 파트 다시 보고 올게요', time: '오후 7:15', read: '읽음' },
  input: '메시지를 입력하세요',
}

export type ConsultStepStatus = 'done' | 'current' | 'upcoming'

/** 혜택 3 — 컨설팅 진행 체크리스트 */
export const BENEFIT_STEPS = {
  label: '1:1 커리어 컨설팅',
  chip: '맞춤',
  progressSuffix: '완료',
  steps: [
    { title: '현재 역량·경력 진단', meta: '6월 3일 완료', status: 'done' },
    { title: '목표 직무 맞춤 지원 전략', meta: '6월 10일 완료', status: 'done' },
    { title: '서류·면접 합격까지 동행', meta: '코치와 진행 중', status: 'current' },
    { title: '입사 후 온보딩 점검', meta: '합격 후 예정', status: 'upcoming' },
  ] as { title: string; meta: string; status: ConsultStepStatus }[],
  note: '과정 수료 후 제공',
}

export const PLATFORM = {
  title: '바로잡 앱 하나로 학습부터 지원, 합격 결과까지 한곳에서 관리합니다',
  steps: [
    {
      title: '학습 관리',
      desc: '자격증 강의 진도와 과제, 모의고사 점수를 매일 기록하고 부족한 과목을 바로 확인합니다.',
    },
    {
      title: '지원 관리',
      desc: '기업 채용관 공고에 바로 지원하고, 서류·면접 일정과 진행 상태를 한 화면에서 챙깁니다.',
    },
    {
      title: '결과 관리',
      desc: '합격·불합격 결과와 면접 피드백을 쌓아 다음 지원 전략으로 이어갑니다.',
    },
  ],
  image: '바로잡 앱 대시보드 화면',
  chipName: '바로잡 앱',
  chipText: '학습·지원·결과를 한곳에서 관리하는 커리어 플랫폼',
}

export type DemoKind = 'report' | 'resume' | 'interview'

export type CurriWeek = {
  badge: string
  /** 카드 상단 모노 칩 */
  chip: string
  topic: string
  sum: string[]
  /** 탭 패널 보더·배너를 블루로 강조 (3주차) */
  climax?: boolean
  /** 탭 패널 (취업 후 카드는 클릭 불가라 없음) */
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
  title: '3주 만에 취업 준비 끝내기(1:1 커리어 컨설팅 포함)',
  /** 브라우저 프레임 주소창 — 뒤에 /{demo} */
  host: 'barojob.app',
  tabsLabel: '주차별 커리큘럼',
  weeks: [
    {
      badge: '1주차',
      chip: 'WEEK 1',
      topic: '실력 진단 & 나의 학습 로드맵',
      sum: ['직무 역량 진단', '자격증 로드맵 설계', '첫 진단 리포트'],
      panel: {
        lead: '지금 내 위치를 정확히 알고, 합격까지의 학습 경로를 잡습니다',
        quote: '무작정 공부하기 전에 진단부터 — 직무 역량과 자격증 준비도를 숫자로 확인합니다.',
        bullets: [
          { title: '직무 역량 진단', desc: '목표 직무 기준으로 지식·실무·소프트스킬 수준을 측정' },
          { title: '자격증 로드맵 설계', desc: '시험 일정과 내 진단 결과에 맞춘 주차별 학습 계획 수립' },
          { title: '첫 진단 리포트', desc: '강점·보완점과 추천 과목이 담긴 리포트를 앱에 저장' },
        ],
        demo: 'report',
        caption: '진단 결과로 만든 첫 실력 리포트 — 앱에서 매주 업데이트',
        banner: '진단 결과는 바로잡 앱에 그대로 저장됩니다. 과정이 끝난 뒤에도 내 성장 기록으로 남습니다.',
      },
    },
    {
      badge: '2주차',
      chip: 'WEEK 2',
      topic: '직무 맞춤 이력서·자기소개서',
      sum: ['경험 정리·직무 매칭', '이력서 초안 작성', '1:1 첨삭 피드백'],
      panel: {
        lead: '흩어진 경험을 정리해, 직무에 맞는 이력서로 완성합니다',
        quote: '쓰기 전에 정리부터 — 경험을 직무 역량 단위로 쪼개고 문장으로 옮깁니다.',
        bullets: [
          { title: '경험 정리', desc: '프로젝트·아르바이트·활동 경험을 직무 역량 키워드로 분류' },
          { title: '이력서 초안 작성', desc: '목표 기업 채용 공고에 맞춘 이력서·자기소개서 초안 완성' },
          { title: '1:1 첨삭 피드백', desc: '현직자 코치의 문장 단위 첨삭과 수정본 비교' },
        ],
        demo: 'resume',
        caption: '코치 첨삭으로 다듬은 직무 맞춤 이력서',
        banner: '완성한 이력서·자기소개서는 그대로 기업 채용관 지원에 사용할 수 있습니다.',
      },
    },
    {
      badge: '3주차',
      chip: 'WEEK 3',
      topic: '모의 면접 & 기업 채용관 지원',
      sum: ['직무별 모의 면접', '답변 피드백 리포트', '채용관 실전 지원'],
      climax: true,
      panel: {
        lead: '"이제 진짜 지원한다" — 모의 면접으로 다듬고 실제 기업에 지원합니다',
        quote: '실전과 같은 질문으로 연습하고, 피드백을 반영해 기업 채용관에서 바로 지원합니다.',
        bullets: [
          { title: '직무별 모의 면접', desc: '기업·직무별 예상 질문으로 실전처럼 답변을 연습' },
          { title: '답변 피드백 리포트', desc: '논리·전달력·직무 적합도를 항목별 점수와 코멘트로 확인' },
          { title: '채용관 실전 지원', desc: '바로잡 기업 채용관 공고에 지원하고 진행 상태를 앱에서 관리' },
        ],
        demo: 'interview',
        caption: '모의 면접 답변을 분석한 피드백 리포트',
        banner: '3주간 준비한 결과물이 연습으로 끝나지 않고, 실제 지원서와 면접 답변으로 남습니다.',
      },
    },
    {
      badge: '취업 후',
      chip: '취업 후',
      topic: '1:1 커리어 컨설팅',
      sum: ['과정 수료 후 신청하여 진행', '지원 결과와 목표에 맞춘 커리어 상담'],
      climax: true,
    },
  ] as CurriWeek[],
}

/** 커리큘럼 데모 화면용 수치 */
export const DEMO_REPORT = {
  title: '직무 역량 진단 리포트',
  meta: '사무·데이터 직무 · 2026.06',
  score: 72,
  skills: [
    { name: '데이터 분석', value: 64 },
    { name: '문서 작성', value: 81 },
    { name: '커뮤니케이션', value: 58 },
  ],
  actions: ['컴퓨터활용능력 1급 준비', 'SQL 기초 보강', '발표 연습 2회'],
  chips: ['매주 자동 업데이트', '바로잡 학습 앱'],
}

export const DEMO_RESUME = {
  name: '김○환',
  role: '데이터 분석 직무 지원',
  sections: [
    { head: '핵심 역량', body: '엑셀·SQL을 활용한 매출 데이터 정리 및 주간 리포트 자동화' },
    { head: '프로젝트', body: '교내 카페 매출 분석으로 메뉴 구성 개선, 월 매출 12% 증가' },
    { head: '자격증', body: '컴퓨터활용능력 1급 · SQLD (취득 예정)' },
  ],
  comments: [
    { tag: '구체화', text: '“열심히 했다” 대신 결과 수치를 앞에 배치하세요.' },
    { tag: '직무 매칭', text: '공고의 “리포트 자동화” 키워드와 잘 맞습니다.' },
    { tag: '분량', text: '프로젝트 설명을 2줄 이내로 줄이면 가독성이 좋아집니다.' },
  ],
}

export const DEMO_INTERVIEW = {
  question: 'Q. 데이터를 활용해 문제를 해결한 경험을 말씀해 주세요.',
  answer: '교내 카페의 메뉴별 매출을 3개월간 정리해 비인기 메뉴를 줄이고 세트 구성을 바꿨습니다...',
  total: 84,
  scores: [
    { name: '논리 구조', value: 88 },
    { name: '전달력', value: 76 },
    { name: '직무 적합도', value: 90 },
  ],
  feedback: ['결론을 먼저 말한 점이 좋습니다.', '수치 근거를 한 번 더 강조하세요.'],
}

export const VALUE = {
  title: '3주에 이만큼 배우고,\n이만큼 남깁니다',
  /** 각 열의 제목 — columns와 같은 순서 */
  headings: ['배우는 것', '손에 남는 것', '함께 받는 지원'],
  columns: [
    [
      { title: '직무 역량 진단', desc: '목표 직무 기준 실력을 숫자로 확인' },
      { title: '자격증 학습 로드맵', desc: '시험 일정에 맞춘 주차별 학습 계획' },
      { title: '경험 정리 · 직무 매칭', desc: '흩어진 경험을 역량 키워드로 정리' },
      { title: '이력서 · 자기소개서 작성', desc: '채용 공고에 맞춘 문장 작성법 실습' },
      { title: '직무별 모의 면접', desc: '실전 질문으로 답변 구조를 연습' },
    ],
    [
      { title: '나만의 진단 리포트', desc: '강점·보완점이 담긴 성장 기록' },
      { title: '첨삭 완료 이력서', desc: '바로 지원에 쓰는 완성본' },
      { title: '면접 답변 노트', desc: '피드백을 반영한 예상 질문 답변집' },
      { title: '스스로 준비하는 힘', desc: '다음 지원도 혼자 설계하는 방법' },
    ],
    [
      { title: '바로잡 학습 앱 이용권', desc: '학습·지원·결과를 한곳에서 관리' },
      { title: '1:1 커리어 컨설팅', desc: '수료 후 맞춤 상담으로 합격까지' },
      { title: '강의 다시보기 영상', desc: '시험 직전까지 반복 복습' },
      { title: '스터디 단톡방 Q&A', desc: '매니저·동기와 실시간 질문' },
      { title: '기업 채용관 지원 혜택', desc: '수료생 전용 공고 우선 안내' },
    ],
  ],
}
