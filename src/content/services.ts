// 서비스 상세 페이지 콘텐츠 (임시 문구) — 원본 1번 사이트의 서비스 페이지 템플릿 구조를 따른다

export type ServiceCase = { brand: string; title: string; date: string }

export type Service = {
  slug: string
  name: string
  hero: {
    /** 글자가 하나씩 떠오르는 제목 */
    title: string
    subtitle: string
    secondaryCta?: { label: string; to: string }
  }
  /** 제목의 \n 은 데스크톱에서만 줄바꿈 */
  features: { title: string; subtitle: string }[]
  cases?: { title: string; items: ServiceCase[] }
  cta: { text: string; showSecondary?: boolean }
}

export const SERVICES: Service[] = [
  {
    slug: 'all-in-one',
    name: '취업 올인원',
    hero: {
      title: '합격까지 책임지는 취업 관리',
      subtitle: '지원 전략부터 합격 이후 온보딩까지 전담 매니저가 함께합니다',
    },
    features: [
      {
        title: '사람마다 경력이 다르고\n필요한 준비도 다르니까요.',
        subtitle: '전담 매니저가 이력과 목표를 분석해 나만의 지원 전략을 세웁니다',
      },
      {
        title: '같은 공고라도\n누가 지원하느냐에 따라 전략이 달라야 하죠.',
        subtitle: '직무·기업별 합격 데이터를 바탕으로 서류와 면접을 맞춤 준비합니다',
      },
      {
        title: '‘이번 주 지원할 공고만 골라줘’\n한 마디면 충분하세요.',
        subtitle: '검증된 기업 채용관에서 조건에 맞는 공고만 추천해 드립니다',
      },
      {
        title: '합격하고 끝이 아니라\n커리어는 계속 쌓여야 해요.',
        subtitle: '입사 후 3개월 온보딩 코칭으로 빠른 안착을 돕습니다',
      },
    ],
    cta: { text: '취업 준비의 모든 과정을\n바로잡과 함께 시작하세요' },
  },
  {
    slug: 'certificate-edu',
    name: '자격증 교육',
    hero: {
      title: '한 번에 붙는 자격증 공부',
      subtitle: '실력 진단부터 실전 모의고사까지 합격에 필요한 것만 공부합니다',
      secondaryCta: { label: '합격 후기 보기', to: '/news/blog' },
    },
    features: [
      {
        title: '전공자와 비전공자는\n출발선이 너무 다르니까요.',
        subtitle: '실력 진단 테스트로 현재 수준을 파악하고 맞춤 커리큘럼을 설계합니다',
      },
      {
        title: '바쁜 직장인에게\n공부가 또 하나의 일이 되지 않도록.',
        subtitle: '전용 학습 앱에서 출퇴근 10분도 학습 시간으로 만듭니다',
      },
      {
        title: '결국 합격 가능성을\n미리 확인할 수 있어야 하죠.',
        subtitle: '실전 모의고사와 성적 리포트로 취약 영역을 정확히 짚어줍니다',
      },
    ],
    cases: {
      title: '자격증 교육 대표 사례',
      items: [
        { brand: '파트너 기업 A', title: '사내 데이터 자격증 단체 취득, 합격률 89% 달성', date: '2026-07-22' },
        { brand: '파트너 기관 B', title: '비전공 재직자 120명, 6주 만에 클라우드 자격증 취득', date: '2026-07-19' },
        {
          brand: '파트너 대학 C',
          title: '졸업 예정자 자격증 집중 과정, 취업 연계까지 이어진 이유',
          date: '2026-07-30',
        },
      ],
    },
    cta: { text: '목표 자격증 합격을\n가장 빠른 길로 준비하세요', showSecondary: true },
  },
  {
    slug: 'coaching',
    name: '직무 코칭',
    hero: {
      title: '현직자가 직접 알려주는 실무',
      subtitle: '희망 직무의 현직자 코치와 함께 바로 쓰는 역량을 만듭니다',
      secondaryCta: { label: '코치 소개 보기', to: '/about' },
    },
    features: [
      {
        title: '60분 동안 오로지\n한 명에게만 집중합니다.',
        subtitle: '일대일 · 소그룹 밀착 코칭으로 수준에 맞는 과제를 진행합니다',
      },
      {
        title: '배우고 끝나는 게 아니라\n진짜 할 수 있어야 하니까요.',
        subtitle: '수강생 모두 포트폴리오로 쓸 수 있는 결과물을 완성합니다',
      },
      {
        title: '이제 면접에서\n내 경험으로 말할 수 있습니다.',
        subtitle: '프로젝트 경험을 면접 답변으로 정리하는 과정까지 함께합니다',
      },
    ],
    cta: { text: '희망 직무에 필요한 역량을\n현직자와 함께 완성하세요', showSecondary: true },
  },
  {
    slug: 'hiring',
    name: '기업 채용관',
    hero: {
      title: '검증된 인재를 바로 만나는 곳',
      subtitle: '교육과 코칭을 거친 인재풀에서 우리 회사에 맞는 사람을 찾습니다',
    },
    features: [
      {
        title: '지원자들의 역량을\n같은 기준으로 비교할 수 있도록.',
        subtitle: '자격증·과제·코칭 기록을 하나의 프로필로 정리해 보여드립니다',
      },
      {
        title: '채용 성공은\n직무에 꼭 맞는 사람에서 시작됩니다.',
        subtitle: '직무 요건을 입력하면 조건에 맞는 후보를 자동으로 추천합니다',
      },
      {
        title: '채용이 끝나도\n인재풀은 계속 쌓여야 해요.',
        subtitle: '지원 이력을 인재풀로 관리해 다음 채용에 바로 활용합니다',
      },
    ],
    cases: {
      title: '기업 채용관 소식 보러가기',
      items: [
        { brand: '파트너 기업 D', title: '경력직 채용 소요 기간 38% 단축, 상시 채용관 운영기', date: '2026-07-22' },
        { brand: '바로잡', title: '스타트업 20개사가 함께한 연합 채용 박람회 현장', date: '2026-07-21' },
        { brand: '바로잡', title: '서류 탈락률 절반으로, 기업 채용관이 바꾼 채용 방식', date: '2026-05-31' },
      ],
    },
    cta: { text: '우리 회사에 꼭 맞는 인재를\n기업 채용관에서 만나보세요' },
  },
]

export const findService = (slug?: string) => SERVICES.find((s) => s.slug === slug)
