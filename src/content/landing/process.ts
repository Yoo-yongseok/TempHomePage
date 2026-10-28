// 도입 프로세스 — 4단계 로드맵(진단 → 실습 → 현업 적용 → 사후 컨설팅)과 단계별 데모 화면 (예시 수치는 임시값)

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
  title: '진단부터 현업 적용까지, 이렇게 진행합니다',
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
