// 소식 게시판 콘텐츠 (B2B, 임시 문구) — 원본 1번 사이트의 뉴스룸 템플릿 구조를 따른다
// 사례 기업명은 시그마인 기업 소개서 기준, 수치는 임시값

export type Post = {
  title: string
  summary: string
  date: string
  /** 있으면 "카테고리 · 출처" 라벨과 외부 링크 아이콘 표시 */
  category?: string
  source?: string
}

export type NewsBoard = {
  slug: string
  name: string
  chip?: string
  featured?: { eyebrow: string; title: string; description: string; action: string }
  posts: Post[]
}

export const NEWS_BOARDS: NewsBoard[] = [
  {
    slug: 'notice',
    name: '공지사항',
    posts: [
      {
        title: '2027년 상반기 기업 교육 일정 사전 접수 안내',
        summary: '내년 상반기 교육 일정을 미리 확보하실 수 있도록 사전 접수를 시작합니다.',
        date: '2026.10.14',
      },
      {
        title: '기업 교육 소개서 2026 하반기 개정판 배포',
        summary: '신규 과정과 최신 교육 사례를 반영한 소개서를 새로 배포합니다.',
        date: '2026.10.01',
      },
      {
        title: 'AX 프로젝트 과정 신규 오픈 안내',
        summary: '관리자·핵심 인재 대상 팀별 자동화 프로젝트 과정이 새롭게 열렸습니다.',
        date: '2026.09.24',
      },
      {
        title: '개인정보 처리방침 변경 안내',
        summary: '10월 1일부터 적용되는 개인정보 처리방침 주요 변경 사항을 안내드립니다.',
        date: '2026.09.10',
      },
      {
        title: '교육 운영 대시보드 업데이트 안내',
        summary: '교육 담당자 화면에 차수별 만족도 리포트 내려받기 기능이 추가되었습니다.',
        date: '2026.08.21',
      },
    ],
  },
  {
    slug: 'newsroom',
    name: '뉴스룸',
    featured: {
      eyebrow: 'AX 리포트 · 무료 배포',
      title: '2026 기업 AI 도입 현황 리포트',
      description: '기업 교육 담당자 300명 설문으로 정리한 AI 교육·도입 현황 리포트를 무료로 보내드려요.',
      action: '받아보기',
    },
    posts: [
      {
        title: '한국AX협회, 삼성화재 AI 비즈니스 전문가 양성 과정 성료',
        summary:
          '관리자 대상 3일(24시간) 과정에서 GPTs 제작, 데이터 분석 프로젝트, 생성형 AI 도입 실습을 진행했습니다.',
        date: '2026.10.14',
      },
      {
        category: '언론보도',
        source: '오늘경제',
        title: '“특강으로는 부족하다” 실습형 기업 AI 교육이 늘어난다',
        summary: '업무 데이터로 실습하는 기업 맞춤형 AI 교육 사례로 한국AX협회가 소개되었습니다.',
        date: '2026.10.10',
      },
      {
        category: '언론보도',
        source: '데일리테크',
        title: '한국AX협회, 공공기관 대상 AI 업무 활용 교육 협력 확대',
        summary: '공공기관 임직원의 생성형 AI 활용 역량을 높이기 위한 교육 협력을 확대합니다.',
        date: '2026.10.07',
      },
      {
        category: '언론보도',
        source: '중앙타임즈',
        title: '교육에서 도입까지, AX 파트너를 찾는 기업들',
        summary: '교육과 자동화 개발을 한 팀에서 맡는 AX 파트너가 주목받고 있습니다.',
        date: '2026.09.24',
      },
      {
        title: '“AI를 아는 것보다 AI로 일하는 법이 중요합니다” 한국AX협회 대표 인터뷰',
        summary: '기업 AI 교육이 현업 적용까지 이어지려면 무엇이 필요한지 이야기를 나눴습니다.',
        date: '2026.09.24',
      },
      {
        title: '한국AX협회, 교육부터 자동화 구축까지 맡는 기업 AX 파트너로 출범',
        summary: '대기업·공공기관·대학의 임직원 교육과 맞춤형 AI 자동화 구축을 한 팀에서 진행합니다.',
        date: '2026.09.02',
      },
    ],
  },
  {
    slug: 'cases',
    name: '교육 사례',
    posts: [
      {
        title: '삼성전자 임직원 파이썬 데이터 분석, 3일 만에 실무 데이터 다루기',
        summary: '경영진과 관리자가 Pandas로 데이터를 정제·요약·병합하며 데이터 기반 의사결정을 실습했습니다.',
        date: '2026.10.12',
      },
      {
        title: '삼성화재 관리자, 나만의 GPTs로 업무 도입 방법을 배우다',
        summary: '챗봇 기획과 시연, 데이터 분석 프로젝트로 생성형 AI의 비즈니스 도입 방법을 익혔습니다.',
        date: '2026.10.02',
      },
      {
        title: '한국야쿠르트 DX 교육, 비전공자도 따라오는 AI & 자동화 프로젝트',
        summary: '비전공 관리자도 따라올 수 있도록 업무 적용 중심의 AI 실습과 프로젝트 멘토링을 진행했습니다.',
        date: '2026.09.21',
      },
      {
        title: 'KNU Cosmetics 경영진·관리자, 조직 맞춤 GPTs를 직접 만들다',
        summary: 'AI/GPT 비즈니스 활용 전략과 프롬프트 엔지니어링을 배우고 바로 쓰는 도구를 완성했습니다.',
        date: '2026.09.08',
      },
      {
        title: '연세대학교 교직원 GPTs 고급 활용 교육',
        summary: 'GPTs의 고급 기능을 업무에 활용하는 방법을 다뤘습니다.',
        date: '2026.08.29',
      },
      {
        title: 'AI Hub Stable Diffusion 업무 활용 교육',
        summary: '이미지 생성 AI인 Stable Diffusion을 업무에 활용하는 방법을 다뤘습니다.',
        date: '2026.08.11',
      },
    ],
  },
  {
    slug: 'seminar',
    name: '세미나',
    chip: 'NEW',
    featured: {
      eyebrow: '모집 중인 세미나',
      title: 'HRD 담당자를 위한 AI 교육 설계 세미나',
      description: '임직원 AI 교육을 기획하는 담당자를 위해 진단부터 성과 측정까지 설계 노하우를 나눕니다.',
      action: '신청하기',
    },
    posts: [
      {
        title: 'HRD 담당자를 위한 AI 교육 설계 세미나 (11월)',
        summary: '사전 진단, 커리큘럼 설계, 성과 리포트 작성법을 사례와 함께 소개합니다.',
        date: '2026.10.01',
      },
      {
        title: '팀장을 위한 업무 자동화 첫걸음 웨비나',
        summary: '우리 팀 반복 업무를 찾고 자동화 우선순위를 정하는 방법을 다룹니다.',
        date: '2026.09.15',
      },
      {
        title: '생성형 AI 사내 도입 체크리스트 웨비나',
        summary: '보안, 비용, 교육 순서까지 사내 도입 전 확인할 항목을 정리했습니다.',
        date: '2026.08.20',
      },
      {
        title: '경영진을 위한 AX 전략 조찬 세미나',
        summary: 'AI 도입 방향과 투자 우선순위를 정한 기업들의 사례를 공유했습니다.',
        date: '2026.06.30',
      },
    ],
  },
]

export const findBoard = (slug?: string) => NEWS_BOARDS.find((b) => b.slug === slug)
