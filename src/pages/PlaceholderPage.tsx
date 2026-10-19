/** 아직 기획되지 않은 페이지 */
export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-[calc(100svh-60px)] flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-[28px] leading-[1.2] font-bold text-gray-900 md:text-[40px]">{title}</h1>
      <p className="text-[16px] text-gray-500 md:text-[18px]">준비 중인 페이지입니다</p>
    </div>
  )
}
