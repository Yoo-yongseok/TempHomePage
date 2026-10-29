// 랜딩 하단 C그룹(강사·비교·교육생 코멘트·소식) 콘텐츠
// 교육생 코멘트는 시그마인 기업 소개서(17~18p) 원문 그대로. 별점·이름을 지어 붙이지 않는다.

export const COACH = {
  name: '박○웅',
  role: '수석 AI 교육 강사',
  photoLabel: '강사 프로필 사진',
  // highlight 앞뒤로 문장을 나눠 강조 단어만 블루로 표시
  headline: {
    before: 'AI·데이터 현업 전문가가\n',
    highlight: '직접',
    after: ' 교육합니다',
  },
  credentials: [
    { text: '삼성전자·삼성화재 임직원 AI 교육 진행' },
    { text: 'AI 자동화 서비스 기획·개발 현업 경력' },
    { text: '기업·기관 맞춤 교육 ', strong: '9곳' },
    { text: '4시간 특강부터 3일 전문가 양성 과정까지 설계' },
    { text: '비전공자도 따라오는 실습 중심 수업' },
  ],
}

export const COMPARE = {
  title: '일회성 AI 특강은 이제 그만',
  sub: '듣고 끝나는 특강과 달리, 한국AX협회 교육은 현업 적용까지 이어집니다.',
  solo: {
    label: '일반 AI 특강',
    tag: 'ONE-OFF',
    lines: [
      '모든 회사에 같은 강의 내용',
      '듣기만 하고 끝나는 수업',
      '교육 후 업무는 그대로',
      '적용은 각자 알아서',
    ],
  },
  baro: {
    label: '한국AX협회',
    tag: 'WITH AX',
    rows: [
      { small: '우리 조직 진단 후', bold: '맞춤 커리큘럼 설계' },
      { small: '강의가 아니라', bold: '직접 만드는 실습' },
      { small: '우리 회사 데이터로', bold: '현업 프로젝트 진행' },
      { small: '교육이 끝이 아니라', bold: 'AX 컨설팅·개발까지' },
    ],
  },
}

export type Review = {
  /** 소개서에 별점이 없으므로 비워 둔다 */
  rating?: number
  org: string
  name: string
  role: string
  body: string
}

export const REVIEWS_HEAD = {
  title: '한국AX협회 교육에 참여한\n교육생들의 이야기',
  metric: { prefix: '실제 교육 과정의 ', score: '교육생 코멘트', suffix: '를 그대로 옮겼습니다' },
  nav: { prev: '이전 코멘트', next: '다음 코멘트' },
}

export const REVIEWS: Review[] = [
  {
    org: '파이썬 데이터 분석',
    name: '삼성전자',
    role: '교육생',
    body: '커리큘럼이 실무와 가깝게 설계되어 바로 적용 가능',
  },
  {
    org: 'AI 비즈니스 전문가 양성',
    name: '삼성화재',
    role: '교육생',
    body: '실제 챗봇 기획과 시연을 통해 업무 적용 가능성을 체감했습니다.',
  },
  {
    org: 'DX 교육',
    name: '한국야쿠르트',
    role: '교육생',
    body: '복잡한 AI 개념을 쉽게 설명해줘 비전공자도 따라갈 수 있었습니다.',
  },
  {
    org: 'GPT 활용 교육',
    name: 'KNU Cosmetics',
    role: '교육생',
    body: '교육 후 우리 조직에 맞춘 GPTs를 직접 만들 수 있게 되었습니다.',
  },
  {
    org: '파이썬 데이터 분석',
    name: '삼성전자',
    role: '교육생',
    body: '실제 데이터를 어떻게 다루고 활용할 수 있는지 도구를 확보함',
  },
  {
    org: 'AI 비즈니스 전문가 양성',
    name: '삼성화재',
    role: '교육생',
    body: '데이터 기반 프로젝트를 직접 수행해보며 자신감이 생겼습니다.',
  },
  {
    org: 'DX 교육',
    name: '한국야쿠르트',
    role: '교육생',
    body: '사내 업무에 바로 적용할 수 있는 자동화 아이디어가 많이 떠올랐습니다.',
  },
  {
    org: 'GPT 활용 교육',
    name: 'KNU Cosmetics',
    role: '교육생',
    body: '실무에 바로 적용할 수 있는 프롬프트 기획 역량이 생겼습니다.',
  },
]

export const NEWS_SECTION = {
  title: '한국AX협회 소식',
  sub: '교육 사례부터 세미나, AX 소식까지 한국AX협회의 새로운 이야기를 전해드려요.',
  count: 6,
  more: { label: '소식 전체보기', to: '/news/newsroom' },
}
