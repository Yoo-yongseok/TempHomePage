// 신뢰 요소 — 대표 강사(Coach) · 일반 교육과 비교(Compare) · 소식 섹션 (강사 인물·이력은 임시값)

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
    { text: '삼성전자·삼성화재 등 ', strong: '임직원 AI 교육 진행' },
    { text: '공문서 자동화·사내 챗봇 등 ', strong: 'AX 프로젝트 구축' },
    { text: '파이썬 데이터 분석부터 생성형 AI 활용까지 강의' },
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

export const NEWS_SECTION = {
  title: '한국AX협회 소식',
  sub: '기업 AI 교육 사례부터 세미나, AX 인사이트까지 새로운 소식을 전해드려요.',
  count: 6,
  more: { label: '소식 전체보기', to: '/news/newsroom' },
}
