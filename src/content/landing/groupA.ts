// 랜딩 하단 A그룹(Problem → Solution → Who → Intro → Method) — B2B 기업교육 흐름 (수치는 임시값)

export type ProblemNote = { hl: string; rest: string }

export const PROBLEM = {
  topics: ['AI 교육', 'AX 도입'],
  title: '지금 어떻게 하고 계신가요?',
  notes: [
    { hl: '외부 특강 한 번으로', rest: ' 교육을 끝낸다' },
    { hl: '모두에게 같은 강의를', rest: ' 직무·수준과 상관없이 듣게 한다' },
    { hl: '교육은 했지만', rest: ' 현업에서 쓰는 사람이 없다' },
  ] satisfies ProblemNote[],
  lead: '교육은 분명 하고 있는데…',
  question: '왜 일하는 방식은 그대로일까요?',
}

export type StepCard = { no: string; title: string; desc: string }

export const SOLUTION = {
  titleBefore: 'AI를 아는 것이 아니라',
  titleSig: "'AI로 일하는 법'",
  titleAfter: '을 익혀야 합니다',
  sub: '사전 진단 → 맞춤 교육 → 현업 적용까지, 한국AX협회가 단계별로 함께합니다.',
  steps: [
    { no: '01', title: '사전 진단', desc: '조직의 AI 활용 수준과 반복 업무를 분석해 교육 목표를 정합니다.' },
    { no: '02', title: '맞춤 교육', desc: '직무·직급별로 분야 전문 교육과 특화 교육을 조합해 설계합니다.' },
    { no: '03', title: '현업 적용', desc: '실제 업무 과제로 실습하고, 자동화 도입과 성과 측정까지 이어갑니다.' },
  ] satisfies StepCard[],
}

export type WhoIcon = 'hr' | 'team' | 'exec'
export type WhoCard = { icon: WhoIcon; title: string; desc: string }

export const WHO = {
  title: '이런 조직을 위해 준비했습니다',
  cards: [
    {
      icon: 'hr',
      title: '임직원 AI 교육을 기획하는 HRD 담당자',
      desc: '진단부터 커리큘럼 설계, 운영, 성과 리포트까지 교육 담당자의 일을 덜어드립니다.',
    },
    {
      icon: 'team',
      title: '반복 업무를 줄이고 싶은 팀장·실무 리더',
      desc: '우리 팀 업무를 그대로 실습 과제로 삼아 교육이 끝나면 바로 쓰는 자동화를 남깁니다.',
    },
    {
      icon: 'exec',
      title: 'AX 전략을 세우는 경영진',
      desc: 'AI 도입 방향과 투자 우선순위를 정할 수 있도록 전사 AI 리터러시와 실행 로드맵을 함께 만듭니다.',
    },
  ] satisfies WhoCard[],
}

export const INTRO = {
  quote: '실제 챗봇 기획과 시연을 통해\n업무 적용 가능성을 체감했습니다.',
  author: { name: '금융사 S사 관리자', role: 'AI 비즈니스 전문가 양성 과정 수료', initial: 'S' },
  photoLabel: '기업 교육 현장 사진',
}

export type MethodIcon = 'shield' | 'pen' | 'cycle' | 'target'
export type MethodCard = { icon: MethodIcon; title: string; desc: string }

export const METHOD = {
  title: '검증된 한국AX협회\n기업 AI 교육을 제공해드립니다',
  /** 임시 수치 */
  metrics: [
    { value: '120곳+', label: '교육 고객사' },
    { value: '1만+', label: '누적 교육 임직원' },
    { value: '4.8 / 5', label: '교육 만족도' },
  ],
  metricsSuffix: '. 숫자로 증명된 방식으로 함께합니다.',
  cards: [
    {
      icon: 'shield',
      title: 'AI·데이터·AX\n현업 전문가가 직접 교육',
      desc: 'AI 및 자동화 실무 경험이 풍부한 전문가가\n기업에 맞는 교육을 체계적으로 설계합니다.',
    },
    {
      icon: 'pen',
      title: '듣는 강의 X,\n우리 업무로 하는 실습',
      desc: '교육생이 실제 업무 데이터와 문서로 실습해\n교육 다음 날부터 바로 적용합니다.',
    },
    {
      icon: 'cycle',
      title: '기술 변화와 트렌드를\n실시간으로 반영',
      desc: '빠르게 바뀌는 AI 도구와 사례를\n교육 시점에 맞춰 커리큘럼에 반영합니다.',
    },
    {
      icon: 'target',
      title: '교육에서 끝나지 않는\nAX 도입과 성과 예측',
      desc: '교육 중 도출한 과제를 자동화 서비스로 만들고\n도입 이후 성과까지 함께 관리합니다.',
    },
  ] satisfies MethodCard[],
}
