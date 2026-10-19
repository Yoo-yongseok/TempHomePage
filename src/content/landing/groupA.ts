// 랜딩 하단 A그룹(Problem → Solution → Who → Intro → Method) 임시 콘텐츠 — 실제 문구가 나오면 교체

export type ProblemNote = { hl: string; rest: string }

export const PROBLEM = {
  topics: ['자격증', '이력서', '면접'],
  title: '지금 어떻게 준비하고 계신가요?',
  notes: [
    { hl: '유튜브 강의만', rest: ' 틀어놓고 혼자 공부한다' },
    { hl: '합격 자소서 복붙?', rest: ' 내 경험이 드러나지 않는다' },
    { hl: '면접 연습은', rest: ' 머릿속으로만 해본다' },
  ] satisfies ProblemNote[],
  lead: '준비는 분명 하고 있는데…',
  question: "왜 늘 '서류 탈락'에서 멈출까요?",
}

export type StepCard = { no: string; title: string; desc: string }

export const SOLUTION = {
  titleBefore: '단순 정보가 아니라',
  titleSig: "'합격하는 법'",
  titleAfter: '을 익혀야 합니다',
  sub: '진단 → 맞춤 학습 → 취업 연결까지, 한국AX협회가 단계별로 함께합니다.',
  steps: [
    { no: '01', title: '역량 진단', desc: '희망 직무와 현재 이력을 분석해 부족한 역량을 짚어드립니다.' },
    { no: '02', title: '맞춤 학습', desc: '자격증 교육과 1:1 직무 코칭으로 필요한 부분만 채웁니다.' },
    { no: '03', title: '취업 연결', desc: '서류·면접 첨삭 후 기업 채용관의 협력 기업과 바로 연결합니다.' },
  ] satisfies StepCard[],
}

export type WhoIcon = 'student' | 'switch' | 'building'
export type WhoCard = { icon: WhoIcon; title: string; desc: string }

export const WHO = {
  title: '이런 분들을 위해 저희가 준비했습니다',
  cards: [
    {
      icon: 'student',
      title: '첫 취업을 준비하는 취업 준비생',
      desc: '무엇부터 해야 할지 막막한 분께 자격증부터 서류·면접까지 순서를 잡아드립니다.',
    },
    {
      icon: 'switch',
      title: '더 나은 자리로 이직을 준비하는 직장인',
      desc: '퇴근 후 짧은 시간으로도 경력을 정리하고 원하는 직무로 옮길 수 있도록 돕습니다.',
    },
    {
      icon: 'building',
      title: '좋은 인재를 찾는 기업 인사담당자',
      desc: '검증된 수료생 풀과 채용관을 통해 직무에 맞는 인재를 빠르게 만나보세요.',
    },
  ] satisfies WhoCard[],
}

export const INTRO = {
  quote: '혼자 1년 동안 못 넘던 서류 전형을\n코칭 3주 만에 통과했습니다.',
  author: { name: '김○환 님', role: '직무 코칭 수료 · IT 기업 입사', initial: '김' },
  photoLabel: '교육 현장 사진',
}

export type MethodIcon = 'shield' | 'pen' | 'cycle' | 'target'
export type MethodCard = { icon: MethodIcon; title: string; desc: string }

export const METHOD = {
  title: '검증된 한국AX협회 커리어\n프로그램을 제공해드립니다',
  metrics: [
    { value: '5만+', label: '누적 수강생' },
    { value: '4.8 / 5', label: '수강생 만족도' },
    { value: '300곳+', label: '협력 기업' },
  ],
  cards: [
    {
      icon: 'shield',
      title: '공인 자격증 대비부터\n합격까지 책임지는 커리큘럼',
      desc: '시험 일정에 맞춘 학습 플랜과 모의고사로\n준비 과정 전체를 관리해드립니다.',
    },
    {
      icon: 'pen',
      title: '듣는 강의 X,\n직접 써보는 실습',
      desc: '이력서·자기소개서를 직접 작성하고\n현직자 코치에게 바로 피드백을 받습니다.',
    },
    {
      icon: 'cycle',
      title: '모의 면접을 반복하며\n실전 감각 완성',
      desc: '직무별 예상 질문으로 반복 연습하고\n녹화 영상으로 답변을 다듬습니다.',
    },
    {
      icon: 'target',
      title: '내 상황에 맞춘\n1:1 취업 전략',
      desc: '경력·전공·희망 직무에 맞춰\n지원 기업과 준비 순서를 함께 정합니다.',
    },
  ] satisfies MethodCard[],
}
