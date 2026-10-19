import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import type { NewsBoard } from '../content/news'
import { findBoard } from '../content/news'
import { FeaturedBanner } from '../features/news/FeaturedBanner'
import { Pagination } from '../features/news/Pagination'
import { PostItem } from '../features/news/PostItem'
import { SearchBox } from '../features/news/SearchBox'
import { PlaceholderPage } from './PlaceholderPage'

const PAGE_SIZE = 5

export function NewsPage() {
  const board = findBoard(useParams().slug)
  if (!board) return <PlaceholderPage title="페이지를 찾을 수 없습니다" />
  // key: 게시판이 바뀌면 검색어·페이지 상태 초기화
  return <Board key={board.slug} board={board} />
}

function Board({ board }: { board: NewsBoard }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return board.posts
    return board.posts.filter((p) => `${p.title} ${p.summary}`.toLowerCase().includes(q))
  }, [board.posts, query])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-10 md:px-10 md:py-20">
      <div className="flex flex-col gap-10 md:gap-20">
        <div className="flex flex-col gap-10">
          <h1 className="text-[32px] leading-[1.2] font-bold text-gray-900 md:text-[48px]">{board.name}</h1>
          {board.featured && <FeaturedBanner featured={board.featured} />}
          <SearchBox
            value={query}
            onChange={(v) => {
              setQuery(v)
              setPage(1)
            }}
          />
        </div>

        {visible.length > 0 ? (
          <div className="flex flex-col gap-6 md:gap-[60px]">
            {visible.map((post, i) => (
              <PostItem key={post.title} post={post} tone={i} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-[16px] text-gray-500">검색 결과가 없습니다</p>
        )}

        <Pagination page={page} total={totalPages} onChange={setPage} />
      </div>
    </section>
  )
}
