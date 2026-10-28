// 서비스 상세 페이지 콘텐츠 (B2B, 임시 문구) — 원본 1번 사이트의 서비스 페이지 템플릿 구조를 따른다
// 사례 기업명은 시그마인 기업 소개서 기준

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
    slug: 'ai-education',
    name: '맞춤형 AI 교육',
    hero: {
      title: '우리 조직에 맞춘 AI 교육',
      subtitle: '사전 진단부터 실습, 성과 리포트까지 기업마다 다르게 설계합니다',
      secondaryCta: { label: '교육 사례 보기', to: '/news/cases' },
    },
    features: [
      {
        title: '부서마다 하는 일이 다르고\n필요한 AI도 다르니까요.',
        subtitle: '부서·직급별 AI 활용 수준을 진단하고 그에 맞는 커리큘럼을 조합합니다',
      },
      {
        title: '예제 따라하기로는\n다음 날 업무가 바뀌지 않죠.',
        subtitle: '교육생이 실제 업무 데이터와 문서로 실습해 바로 쓰는 결과물을 만듭니다',
      },
      {
        title: '교육 담당자에게는\n보고할 성과가 필요합니다.',
        subtitle: '교육 전후 비교와 실습 결과물을 담은 성과 리포트를 드립니다',
      },
    ],
    cases: {
      title: '맞춤형 AI 교육 대표 사례',
      items: [
        { brand: '삼성전자', title: '임직원 대상 파이썬 데이터 분석, 3일 만에 실무 데이터 다루기', date: '2026-07-22' },
        {
          brand: '삼성화재',
          title: '챗봇 기획부터 생성형 AI 도입까지, AI 비즈니스 전문가 양성 과정',
          date: '2026-07-19',
        },
        { brand: 'KNU Cosmetics', title: '경영진·관리자가 함께 만든 우리 조직 맞춤 GPTs', date: '2026-06-30' },
      ],
    },
    cta: { text: '우리 조직에 맞는 AI 교육을\n한국AX협회와 함께 설계하세요', showSecondary: true },
  },
  {
    slug: 'ax-consulting',
    name: 'AX 컨설팅',
    hero: {
      title: '반복 업무를 줄이는 AX 컨설팅',
      subtitle: '업무 진단부터 자동화 도입, 후속 관리까지 전문 컨설턴트가 함께합니다',
    },
    features: [
      {
        title: '어디부터 자동화해야 할지\n모르는 것이 가장 큰 고민이죠.',
        subtitle: '담당자 인터뷰로 반복 업무를 찾고 효과와 난이도로 우선순위를 정합니다',
      },
      {
        title: '콘텐츠, 데이터 분석, CS까지\n업무마다 맞는 방식이 있습니다.',
        subtitle: '업무 유형별로 검증된 AX 프로그램을 조직 상황에 맞춰 적용합니다',
      },
      {
        title: '도입하고 끝이 아니라\n성과가 이어져야 하니까요.',
        subtitle: '도입 이후 성과를 측정하고 고도화와 후속 관리까지 지원합니다',
      },
    ],
    cases: {
      title: 'AX 컨설팅 대표 사례',
      items: [
        {
          brand: 'Pharm Nutrition',
          title: '홈페이지 콘텐츠 업로드 자동화, 반복 입력·검수 업무 60% 이상 단축',
          date: '2026-07-22',
        },
        {
          brand: 'LOWORD',
          title: '블로그 가치 평가 모델 개발, 평가·리포트 작성 시간 45% 이상 절감',
          date: '2026-07-10',
        },
        {
          brand: '에스에스네트웍스',
          title: '스마트팜 CCTV 인식 기능 개발, 건강 이상 조기 대응률 34% 향상',
          date: '2026-05-31',
        },
      ],
    },
    cta: { text: '우리 회사의 반복 업무,\n어디부터 줄일 수 있을지 확인하세요', showSecondary: true },
  },
  {
    slug: 'ai-development',
    name: '맞춤형 AI 개발',
    hero: {
      title: '실무에 바로 쓰는 맞춤형 AI',
      subtitle: '산업과 기업의 특성에 맞춘 AI 자동화 서비스를 직접 개발합니다',
    },
    features: [
      {
        title: '“이 질문은 챗봇이 대신 답해줬으면”\n사내 메신저에서 바로 가능합니다.',
        subtitle: '규정·FAQ·IT 지원 답변을 실시간으로 제공하는 업무용 챗봇을 구축합니다',
      },
      {
        title: '매번 같은 양식의 문서를\n처음부터 쓰지 않도록.',
        subtitle: '기본 정보만 입력하면 공문서·보고서 초안을 자동으로 작성합니다',
      },
      {
        title: '필요한 정보만 골라\n먼저 알려주는 AI.',
        subtitle: '업무 분야에 맞춰 뉴스·데이터를 수집하고 핵심만 요약해 전달합니다',
      },
    ],
    cases: {
      title: '맞춤형 AI 개발 대표 사례',
      items: [
        {
          brand: '대한몰',
          title: '사내 메신저 업무용 챗봇, 반복 문의·행정 처리 시간 50% 이상 절감',
          date: '2026-07-22',
        },
        { brand: '한국청소년활동진흥원', title: '공문서 요약·작성 자동화로 반복 업무 70% 단축', date: '2026-07-21' },
        { brand: 'ScopeLabs', title: '맞춤형 AI 뉴스 큐레이션, 정보 탐색 시간 60% 단축', date: '2026-05-31' },
      ],
    },
    cta: { text: '우리 업무에 꼭 맞는 AI를\n한국AX협회와 함께 만드세요' },
  },
]

export const findService = (slug?: string) => SERVICES.find((s) => s.slug === slug)
