// 랜딩 하단 C그룹(강사·비교·후기·소식) — B2B 기업교육 흐름 (인물·수치는 임시값)

export const COACH = {
  name: '박○웅',
  role: '수석 AX 컨설턴트 · 대표 강사',
  photoLabel: '강사 프로필 사진',
  // highlight 앞뒤로 문장을 나눠 강조 단어만 블루로 표시
  headline: {
    before: '현업에서 AI 자동화를 만들어 온\n전문가가 ',
    highlight: '직접',
    after: ' 교육합니다',
  },
  credentials: [
    { text: 'AI·데이터 서비스 개발 및 운영 10년' },
    { text: '대기업·공공기관 임직원 AI 교육 다수 진행' },
    { text: '기업 AX 프로젝트 컨설팅 누적 ', strong: '80건+' },
    { text: '기업 교육 평균 만족도 ', strong: '4.8 / 5' },
    { text: '교육 후에도 실무 적용까지 함께하는 사후 컨설팅' },
  ],
}

export const COMPARE = {
  title: '특강 한 번으로 끝나는 AI 교육은 이제 그만',
  sub: '일반 AI 교육에서 멈추는 지점을, 한국AX협회는 현업 적용까지 이어갑니다.',
  solo: {
    label: '일반 AI 교육',
    tag: 'LECTURE',
    lines: [
      '이론 중심 강의, 실습은 예제 따라하기',
      '직무·수준과 상관없이 같은 커리큘럼',
      '교육 후 성과를 확인할 방법이 없음',
      '수료하면 끝, 현업 적용은 각자 알아서',
    ],
  },
  baro: {
    label: '한국AX협회',
    tag: 'AX PARTNER',
    rows: [
      { small: '예제가 아니라', bold: '우리 업무 데이터로 실습' },
      { small: '사전 진단으로', bold: '직무·직급별 맞춤 설계' },
      { small: '교육 전후를 비교하는', bold: '성과 리포트 제공' },
      { small: '교육이 끝이 아니라', bold: 'AX 도입 컨설팅까지' },
    ],
  },
}

export type Review = {
  rating: number
  org: string
  name: string
  role: string
  body: string
}

export const REVIEWS_HEAD = {
  title: '한국AX협회와 함께 한\n교육생·담당자의 이야기',
  metric: { prefix: '교육 고객사 120곳+ · 만족도 ', score: '4.8', suffix: ' / 5' },
  nav: { prev: '이전 후기', next: '다음 후기' },
}

// 교육 소개서 16~18p 교육생 코멘트 기반, 기업명은 익명 처리
export const REVIEWS: Review[] = [
  {
    rating: 5,
    org: '파이썬 데이터 분석',
    name: '전자 S사',
    role: '관리자 교육생',
    body: '커리큘럼이 실무와 가깝게 설계되어 바로 적용할 수 있었습니다. 실제 데이터를 어떻게 다루고 활용할 수 있는지 도구를 확보했습니다.',
  },
  {
    rating: 5,
    org: 'AI 비즈니스 전문가 양성',
    name: '금융 S사',
    role: '관리자 교육생',
    body: '생성형 AI를 단순히 체험하는 것을 넘어서, 비즈니스 도입 방법을 배울 수 있어 유익했습니다. 직접 프로젝트를 수행해보며 자신감이 생겼습니다.',
  },
  {
    rating: 5,
    org: 'DX 교육 / AI & 자동화 프로젝트',
    name: '식품·유통 H사',
    role: '관리자 교육생',
    body: '복잡한 AI 개념을 쉽게 설명해줘 비전공자도 따라갈 수 있었습니다. 사내 업무에 바로 적용할 수 있는 자동화 아이디어가 많이 떠올랐습니다.',
  },
  {
    rating: 5,
    org: 'GPT 활용 교육',
    name: '뷰티 K사',
    role: '경영진 교육생',
    body: '실무에 바로 적용할 수 있는 프롬프트 기획 역량이 생겼습니다. 교육 후 우리 조직에 맞춘 GPTs를 직접 만들 수 있게 되었습니다.',
  },
  {
    rating: 5,
    org: '데이터 분석 및 시각화',
    name: 'e스포츠 G사',
    role: 'HRD 담당자',
    body: '사전 진단부터 성과 리포트까지 정리해 주셔서 내부 보고가 수월했습니다. 다음 차수 교육도 같은 방식으로 이어가기로 했습니다.',
  },
  {
    rating: 4,
    org: 'AI 업무 활용 교육',
    name: '미디어 C사',
    role: '팀장 교육생',
    body: '우리 팀 업무를 그대로 실습 과제로 써서 교육 다음 날부터 바로 써먹었습니다. 실습 시간이 조금 더 길었으면 좋겠습니다.',
  },
  {
    rating: 5,
    org: 'AI 업무 자동화 도입',
    name: '투자사 T사',
    role: '대표',
    body: '교육에서 나온 자동화 과제를 실제로 도입하기까지 컨설팅이 이어져서 좋았습니다. 반복 업무가 눈에 띄게 줄었습니다.',
  },
  {
    rating: 5,
    org: 'GPTs 고급 활용',
    name: 'Y대학교',
    role: '교육 담당 교직원',
    body: '행정 업무에 맞춘 예시가 많아 교직원 만족도가 높았습니다. 교육 운영과 공지까지 꼼꼼하게 챙겨 주셨습니다.',
  },
]

export const NEWS_SECTION = {
  title: '한국AX협회 소식',
  sub: '기업 AI 교육 사례부터 세미나, AX 인사이트까지 새로운 소식을 전해드려요.',
  count: 6,
  more: { label: '소식 전체보기', to: '/news/newsroom' },
}
