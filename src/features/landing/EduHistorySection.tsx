import { EDU_HISTORY } from '../../content/home'
import { Reveal, Section, SectionHead } from './primitives'

/** #edu-history — 교육 현장 사진 + 분야별 맞춤 교육 이력 목록 (소개서 16p 구성) */
export function EduHistorySection() {
  const { title, sub, photos, items } = EDU_HISTORY

  return (
    <Section id="edu-history" tone="white">
      <SectionHead title={title} sub={sub} />

      <Reveal className="mx-auto grid max-w-[1080px] items-start gap-6 md:grid-cols-[1fr_1.1fr] md:gap-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:gap-4">
          {photos.map((p) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="aspect-[16/9] w-full rounded-[18px] border border-[#eceef2] object-cover md:aspect-[2.26/1]"
            />
          ))}
        </div>

        <ul className="divide-y divide-[#eceef2] rounded-[18px] border border-[#eceef2] bg-white px-5 shadow-[0_1px_2px_#1018280a,0_16px_32px_-20px_#10182824] md:px-7">
          {items.map((item) => (
            <li
              key={item.client}
              className="flex flex-col gap-0.5 py-3.5 sm:flex-row sm:items-baseline sm:gap-4 md:py-[15px]"
            >
              <span className="shrink-0 text-[15px] font-bold text-ink sm:w-[150px]">{item.client}</span>
              <span className="text-[14.5px] leading-[1.5] text-mute">{item.title}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
