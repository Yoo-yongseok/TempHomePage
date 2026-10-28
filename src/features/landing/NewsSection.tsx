import { Link } from 'react-router'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { Placeholder } from '../../components/ui/Placeholder'
import { NEWS_SECTION } from '../../content/landing/proof'
import { newsPath } from '../../content/menu'
import { NEWS_BOARDS } from '../../content/news'
import { MonoLabel, Reveal, Section, SectionHead, cardClass } from './primitives'

// 모든 게시판의 글을 합쳐 최신순으로 (날짜가 YYYY.MM.DD라 문자열 비교로 정렬)
const LATEST = NEWS_BOARDS.flatMap((board) => board.posts.map((post) => ({ board, post })))
  .sort((a, b) => b.post.date.localeCompare(a.post.date))
  .slice(0, NEWS_SECTION.count)

/** 1번 사이트 블로그 갤러리 내용을 2번 사이트 카드 그리드로 */
export function NewsSection() {
  const { title, sub, more } = NEWS_SECTION
  return (
    <Section id="news" tone="white">
      <SectionHead title={title} sub={sub} />
      <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {LATEST.map(({ board, post }, i) => (
          <Link
            key={`${board.slug}-${post.title}`}
            to={newsPath(board.slug)}
            className={`${cardClass} group flex flex-col gap-4`}
          >
            <div className="aspect-video overflow-hidden rounded-[10px]">
              <Placeholder label={board.name} tone={i} compact />
            </div>
            <MonoLabel dot>{post.category ?? board.name}</MonoLabel>
            <h3 className="line-clamp-2 text-lg leading-snug font-bold tracking-[-0.02em] text-ink">{post.title}</h3>
            <time className="mt-auto text-sm text-mute tabular-nums" dateTime={post.date.replaceAll('.', '-')}>
              {post.date}
            </time>
          </Link>
        ))}
      </Reveal>
      <div className="mt-[clamp(1.5rem,3vh,2.5rem)] flex justify-center">
        <ButtonLink to={more.to} variant="outlineInk" size="box">
          {more.label}
        </ButtonLink>
      </div>
    </Section>
  )
}
