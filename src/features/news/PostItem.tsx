import { ArrowUpRight } from '../../components/ui/icons'
import { Placeholder } from '../../components/ui/Placeholder'
import type { Post } from '../../content/news'

export function PostItem({ post, tone }: { post: Post; tone: number }) {
  const labeled = Boolean(post.category)

  return (
    <a href="#" className="group flex items-start gap-6 md:gap-20" onClick={(e) => e.preventDefault()}>
      <div className={`flex min-w-0 flex-1 flex-col ${labeled ? 'gap-3' : 'gap-4'}`}>
        {labeled && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] tracking-[-0.13px] md:text-[14px]">
            <span className="font-bold text-primary">{post.category}</span>
            {post.source && (
              <>
                <span className="text-[#d4d4d8]">·</span>
                <span className="font-semibold text-gray-500">{post.source}</span>
              </>
            )}
          </div>
        )}
        <h3 className="flex items-start gap-1.5 text-[16px] leading-[1.5] font-semibold tracking-[-0.16px] text-gray-900 transition-colors group-hover:text-primary md:text-[24px] md:leading-[1.2] md:tracking-normal">
          <span className="line-clamp-2">{post.title}</span>
          {post.source && (
            <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-gray-400 transition-colors group-hover:text-primary md:mt-1 md:size-6" />
          )}
        </h3>
        <p className="line-clamp-2 text-[14px] leading-[1.5] tracking-[-0.14px] text-gray-500 md:text-[16px]">
          {post.summary}
        </p>
        <span className="text-[14px] tracking-[-0.14px] text-gray-400 md:text-[18px] md:tracking-[-0.18px]">
          {post.date}
        </span>
      </div>
      <div className="h-[67px] w-[100px] shrink-0 overflow-hidden rounded-[8px] transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transform-none md:h-[150px] md:w-[225px]">
        <Placeholder tone={tone} label="썸네일" compact />
      </div>
    </a>
  )
}
