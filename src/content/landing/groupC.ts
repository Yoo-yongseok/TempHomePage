// 랜딩 하단 C그룹(코치·비교·후기·소식) 임시 문구 — 실제 문구가 나오면 교체

export const COACH = {
  name: '김○환',
  role: '수석 커리어 코치',
  photoLabel: '코치 프로필 사진',
  // highlight 앞뒤로 문장을 나눠 강조 단어만 블루로 표시
  headline: {
    before: '대기업 인사팀 12년 차 출신\n채용 전문가가 ',
    highlight: '직접',
    after: ' 코칭합니다',
  },
  credentials: [
    { text: '대기업·공공기관 채용 실무 12년' },
    { text: '서류·면접 평가위원 300회 이상 참여' },
    { text: '직무 전환 코칭 누적 ', strong: '1,200명' },
    { text: '바로잡 코칭 수강생 만족도 ', strong: '4.8 / 5' },
    { text: '1:1 밀착 피드백 — 막히는 지점을 그 자리에서 해결' },
  ],
}

export const COMPARE = {
  title: '혼자 하는 취업 준비는 이제 그만',
  sub: '혼자서는 막히는 지점이, 바로잡에서는 코치와 함께 바로 풀립니다.',
  solo: {
    label: '혼자 하는 취업 준비',
    tag: 'ALONE',
    lines: [
      '공고 보고 혼자 지원하다 탈락',
      '피드백 없이 같은 실수 반복',
      '스펙만 쌓고 방향은 막막',
      '합격 후엔 혼자 적응',
    ],
  },
  baro: {
    label: '바로잡',
    tag: 'WITH COACH',
    rows: [
      { small: '막히면 바로', bold: '코치에게 질문·해결' },
      { small: '현직자 코치가', bold: '서류·면접 1:1 피드백' },
      { small: '스펙이 아니라', bold: '직무에 맞는 자격증 로드맵' },
      { small: '합격이 끝이 아니라', bold: '기업 채용관·온보딩까지' },
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
  title: '바로잡과 함께 한\n수강생분들의 이야기',
  metric: { prefix: '누적 수강생 5만 명 · 만족도 ', score: '4.8', suffix: ' / 5' },
  nav: { prev: '이전 후기', next: '다음 후기' },
}

export const REVIEWS: Review[] = [
  {
    rating: 5,
    org: '데이터 자격증 과정',
    name: '김○환',
    role: '사무직 재직자',
    body: '퇴근 후 하루 한 시간씩만 공부했는데 6주 만에 합격했어요. 모의고사 해설이 꼼꼼해서 혼자 공부할 때보다 훨씬 빨랐습니다.',
  },
  {
    rating: 5,
    org: '직무 코칭',
    name: '이○서',
    role: '마케팅 직무 전환',
    body: '경력이 애매해서 어떻게 써야 할지 몰랐는데, 코치님과 직무 경험을 다시 정리하니 서류 합격률이 확 올랐어요.',
  },
  {
    rating: 4,
    org: '취업 올인원',
    name: '정○지',
    role: '신입 구직자',
    body: '자격증부터 이력서, 면접까지 한 곳에서 관리하니 일정이 꼬이지 않았어요. 모의 면접 횟수가 조금 더 많았으면 좋겠습니다.',
  },
  {
    rating: 5,
    org: '기업 채용관',
    name: '박○욱',
    role: '스타트업 인사팀장',
    body: '검증된 자격과 과제 결과를 보고 지원자를 만날 수 있어 채용 기간이 절반으로 줄었습니다. 온보딩 지원도 만족스러워요.',
  },
  {
    rating: 5,
    org: '직무 코칭',
    name: '최○린',
    role: '개발 직무 신입',
    body: '포트폴리오를 결과 위주에서 과정 위주로 바꾸라는 피드백이 결정적이었어요. 면접에서 프로젝트 질문이 훨씬 편해졌습니다.',
  },
  {
    rating: 5,
    org: '클라우드 자격증 과정',
    name: '한○민',
    role: 'IT 운영 재직자',
    body: '실무에서 바로 쓰는 내용 위주라 시험 준비가 곧 업무 공부였어요. 합격 후 사내 프로젝트에도 참여하게 됐습니다.',
  },
  {
    rating: 4,
    org: '취업 올인원',
    name: '윤○아',
    role: '경력 단절 후 재취업',
    body: '공백 기간을 어떻게 설명할지 막막했는데 코치님 덕분에 자신감을 찾았어요. 맞춤 공고 추천도 큰 도움이 됐습니다.',
  },
  {
    rating: 5,
    org: '기업 채용관',
    name: '송○호',
    role: '중견기업 HR 매니저',
    body: '직무별로 준비된 인재를 추천받으니 서류 검토 부담이 크게 줄었어요. 담당 매니저의 응대도 빠르고 정확했습니다.',
  },
]

export const NEWS_SECTION = {
  title: '바로잡 소식',
  sub: '공지부터 합격 후기, 이벤트까지 바로잡의 새로운 이야기를 전해드려요.',
  count: 6,
  more: { label: '소식 전체보기', to: '/news/newsroom' },
}
