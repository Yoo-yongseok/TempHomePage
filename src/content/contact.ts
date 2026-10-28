// 기업 교육 문의 폼 문구 — 기획 시연용 UI (전송 연동 없음)

export const CONTACT_PAGE = {
  title: '기업 교육 문의',
  subtitle: '교육 대상과 희망 분야를 남겨 주시면\n담당 컨설턴트가 맞춤 제안서를 보내드립니다.',
}

export const CONTACT_FORM = {
  title: '교육 문의 남기기',
  types: ['AI 교육 문의', 'AX 컨설팅·개발 문의', '기타 문의'],
  headcounts: ['10명 미만', '10~30명', '30~100명', '100~300명', '300명 이상', '미정'],
  interests: [
    '생성형 AI·GPTs 활용',
    '파이썬 데이터 분석',
    '데이터 시각화',
    '업무 자동화',
    'AI 리터러시 특강',
    '맞춤형 AI 개발',
  ],
  fields: {
    type: '문의 유형',
    company: { label: '회사명', placeholder: '한국AX주식회사' },
    name: { label: '담당자명', placeholder: '홍길동' },
    position: { label: '부서 · 직책', placeholder: '인사팀 · 매니저' },
    phone: { label: '연락처', placeholder: '010-0000-0000' },
    email: { label: '회사 이메일', placeholder: 'name@company.com' },
    headcount: { label: '교육 대상 인원', placeholder: '선택해 주세요' },
    interests: '관심 분야 (복수 선택)',
    message: {
      label: '문의 내용',
      placeholder: '교육 대상, 희망 일정, 해결하고 싶은 업무 고민 등을 자유롭게 적어 주세요.',
    },
  },
  required: '필수',
  consent: '개인정보 수집·이용에 동의합니다',
  submit: '문의 등록하기',
  note: '영업일 기준 1일 이내 담당 컨설턴트가 연락드립니다.',
  success: {
    title: '문의가 접수되었습니다',
    desc: '영업일 기준 1일 이내 담당 컨설턴트가 남겨 주신 연락처로 연락드립니다.',
    reset: '새 문의 작성하기',
  },
}
