import { Link } from 'react-router'
import { ArrowRight } from '../../components/ui/icons'
import { Placeholder } from '../../components/ui/Placeholder'
import type { NewsBoard } from '../../content/news'

export function FeaturedBanner({ featured }: { featured: NonNullable<NewsBoard['featured']> }) {
  return (
    <Link
      to="/documents"
      className="group flex flex-col overflow-hidden rounded-[12px] transition-shadow duration-300 hover:shadow-[0_12px_32px_-8px_rgba(22,23,27,0.18)] md:flex-row"
    >
      <div className="aspect-[16/7] w-full md:aspect-auto md:h-[213px] md:w-[320px] md:shrink-0">
        <Placeholder tone={0} label="배너 이미지" />
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-6 bg-gray-50 p-6 md:gap-10 md:p-8">
        <div className="flex min-w-0 flex-1 flex-col gap-3 md:gap-4">
          <span className="text-[18px] leading-[1.4] font-bold tracking-[-0.18px] text-primary">
            {featured.eyebrow}
          </span>
          <h2 className="text-[20px] leading-[1.3] font-bold text-gray-900 md:text-[26px]">{featured.title}</h2>
          <p className="text-[14px] leading-[1.6] text-gray-500 md:text-[16px]">{featured.description}</p>
        </div>
        <span className="hidden shrink-0 items-center gap-2 text-[16px] font-semibold text-gray-900 md:flex">
          {featured.action}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
        </span>
      </div>
    </Link>
  )
}
