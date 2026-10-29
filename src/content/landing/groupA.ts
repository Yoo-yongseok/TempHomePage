// 랜딩 하단 A그룹(Problem → Solution → Who → Intro → Method) 콘텐츠
// 인용·수치는 시그마인 기업 소개서 원문 기준. 실제 기업명에 지어낸 후기를 붙이지 않는다.

export type ProblemNote = { hl: string; rest: string }

export const PROBLEM = {
  topics: ['AI 교육', '업무 자동화', 'AX 전환'],
  title: '우리 회사 AI 도입, 어떻게 하고 계신가요?',
  notes: [
    { hl: 'ChatGPT 계정만', rest: ' 나눠주고 끝났다' },
    { hl: '외부 특강은', rest: ' 그날 하루로 끝났다' },
    { hl: '자동화할 업무는', rest: ' 많은데 손을 못 댄다' },
  ] satisfies ProblemNote[],
  lead: '교육은 분명 했는데…',
  question: '왜 현업에서는 AI가 쓰이지 않을까요?',
}

export type StepCard = { no: string; title: string; desc: string }

export const SOLUTION = {
  titleBefore: '단순 특강이 아니라',
  titleSig: "'업무에 쓰는 AI'",
  titleAfter: '를 익혀야 합니다',
  sub: '진단 → 맞춤 교육 → 현업 적용까지, 한국AX협회가 단계별로 함께합니다.',
  steps: [
    { no: '01', title: '조직 진단', desc: '부서별 업무와 AI 활용 수준을 분석해 교육 목표를 정합니다.' },
    { no: '02', title: '맞춤 교육', desc: '대상과 업무에 맞춘 실습으로 바로 쓰는 AI 역량을 기릅니다.' },
    { no: '03', title: '현업 적용', desc: '교육에서 만든 결과물을 업무 자동화와 AX 프로젝트로 잇습니다.' },
  ] satisfies StepCard[],
}

export type WhoIcon = 'student' | 'switch' | 'building'
export type WhoCard = { icon: WhoIcon; title: string; desc: string }

export const WHO = {
  title: '이런 조직을 위해 저희가 준비했습니다',
  cards: [
    {
      icon: 'building',
      title: 'AI 전략이 필요한 경영진·관리자',
      desc: '우리 산업에 AI를 어떻게 도입할지, 비즈니스 관점의 활용 전략부터 잡아드립니다.',
    },
    {
      icon: 'switch',
      title: '반복 업무를 줄이고 싶은 실무 부서',
      desc: '문서·데이터·콘텐츠 업무를 직접 자동화할 수 있도록 실습 중심으로 교육합니다.',
    },
    {
      icon: 'student',
      title: '사내 AI 교육을 기획하는 HR 담당자',
      desc: '직급과 직무에 맞춘 단계별 과정으로 우리 회사만의 AI 교육 체계를 만듭니다.',
    },
  ] satisfies WhoCard[],
}

export const INTRO = {
  quote: '생성형 AI를 단순히 체험하는 것을\n넘어서, 비즈니스 도입 방법을\n배울 수 있어 유익했습니다.',
  author: { name: '삼성화재 교육생', role: 'AI 비즈니스 전문가 양성과정', initial: '삼' },
  photoLabel: '교육 현장 사진',
  photo: '/photos/edu-1.jpg',
}

export type MethodIcon = 'shield' | 'pen' | 'cycle' | 'target'
export type MethodCard = { icon: MethodIcon; title: string; desc: string }

export const METHOD = {
  title: '검증된 한국AX협회\n기업 AX 교육을 제공해드립니다',
  metrics: [
    { value: '9곳', label: '맞춤 교육 진행 기업·기관' },
    { value: '5건', label: 'AI 자동화 구축 사례' },
    { value: '4h~3일', label: '목적별 교육 과정' },
  ],
  cards: [
    {
      icon: 'shield',
      title: '대상과 목적에 맞춘\n맞춤형 커리큘럼',
      desc: '경영진·관리자·실무자별로\n필요한 내용만 골라 설계합니다.',
    },
    {
      icon: 'pen',
      title: '듣는 강의 X,\n직접 만드는 실습',
      desc: '나만의 GPTs와 자동화 도구를\n교육 시간 안에 직접 완성합니다.',
    },
    {
      icon: 'cycle',
      title: '우리 회사 데이터로\n프로젝트 실습',
      desc: '실제 업무 데이터를 다루며\n현업 적용 가능성을 확인합니다.',
    },
    {
      icon: 'target',
      title: '교육 후\n현업 적용까지',
      desc: '교육에서 나온 아이디어를\nAX 컨설팅·개발로 이어갑니다.',
    },
  ] satisfies MethodCard[],
}
