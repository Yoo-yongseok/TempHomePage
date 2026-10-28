// 왜 한국AX협회인가 — 대상(Who) · 대표 인용(Intro) · 강점(Method)
// 강점·수치는 시그마인 기업 소개서 2·12~18p 기준

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
      desc: 'AI 도입 방향과 우선순위를 정할 수 있도록 전사 AI 리터러시와 실행 로드맵을 함께 만듭니다.',
    },
  ] satisfies WhoCard[],
}

export const INTRO = {
  // 교육생 코멘트는 대표 사례 섹션에 있으므로, 여기는 교육 철학 한 문장
  quote: '교육이 끝나는 날이 아니라,\n일하는 방식이 바뀌는 날을 목표로 합니다.',
  author: { name: '박○웅', role: '수석 AX 컨설턴트 · 대표 강사', initial: '박' },
  photoLabel: '기업 교육 현장 사진',
}

export type MethodIcon = 'shield' | 'pen' | 'cycle' | 'target'
export type MethodCard = { icon: MethodIcon; title: string; desc: string }

export const METHOD = {
  title: '교육에서 끝나지 않는\n한국AX협회의 기업 AI 교육',
  /** 소개서에 나온 실제 수치 */
  metrics: [
    { value: '15곳', label: '함께한 기업·기관' },
    { value: '6건', label: '맞춤형 AI 자동화 구축' },
    { value: '최대 70%', label: '반복 업무 시간 단축' },
  ],
  metricsSuffix: '. 교육부터 실무 도입까지 같은 팀이 책임집니다.',
  cards: [
    {
      icon: 'shield',
      title: 'AI·Data·AX\n현업 전문 인력',
      desc: '최적화된 교육을 위해 AI 및 자동화 관련\n현업 전문가 인력이 직접 설계하고 진행합니다.',
    },
    {
      icon: 'pen',
      title: '교육 지속력이 높은\n실습 중심 맞춤형 커리큘럼',
      desc: '분야별 전문 교육과 맞춤형 특화 교육을 조합해\n교육 다음 날부터 업무에 바로 씁니다.',
    },
    {
      icon: 'cycle',
      title: '기술 변화 및 트렌드\n실시간 반영',
      desc: '빠르게 바뀌는 AI 도구와 사례를\n교육 시점에 맞춰 커리큘럼에 반영합니다.',
    },
    {
      icon: 'target',
      title: '손쉬운 AX 도입과\n도입 이후 성과 예측',
      desc: '단순 반복 작업의 시간과 비용을 줄이는\n맞춤형 AX 프로그램으로 실무 도입까지 이어갑니다.',
    },
  ] satisfies MethodCard[],
}
