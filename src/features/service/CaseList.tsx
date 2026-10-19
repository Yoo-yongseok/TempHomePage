import { Link } from 'react-router'
import { Placeholder } from '../../components/ui/Placeholder'
import type { ServiceCase } from '../../content/services'

export function CaseList({ title, items }: { title: string; items: ServiceCase[] }) {
  return (
    <section className="bg-gray-50 px-5 py-[60px] md:px-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-10 md:gap-[60px]">
        <h2 className="text-[28px] leading-[1.2] font-bold text-gray-900 md:text-[40px]">{title}</h2>
        <div className="flex flex-col gap-8 md:gap-10">
          {items.map((item, i) => (
            <Link
              key={item.title}
              to="/news/newsroom"
              className="group flex flex-col items-start gap-3 md:flex-row md:items-end md:gap-10"
            >
              <div className="aspect-[157/90] w-full shrink-0 overflow-hidden rounded-[8px] bg-white transition-transform duration-300 group-hover:scale-105 md:aspect-auto md:h-[143px] md:w-[250px]">
                <Placeholder tone={i} label="썸네일" compact />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5 md:gap-2">
                <span className="text-[12px] font-bold text-gray-500 md:text-[13px]">{item.brand}</span>
                <h3 className="text-[16px] leading-[1.2] font-semibold text-gray-900 md:text-[24px]">{item.title}</h3>
                <p className="text-[13px] leading-[1.5] tracking-[-0.16px] text-gray-500 md:text-[16px]">{item.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
