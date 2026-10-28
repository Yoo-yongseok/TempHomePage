import { useEffect, useState } from 'react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { CloseIcon } from '../../components/ui/icons'
import { CASE_GALLERY, type CaseItem } from '../../content/home'
import { lockScroll } from '../../lib/lenis'
import { Placeholder } from '../../components/ui/Placeholder'

// '수료율 97%' → 숫자가 든 단어는 값, 나머지는 라벨
function splitStat(text: string) {
  const words = text.split(' ')
  const i = words.findIndex((w) => /\d/.test(w))
  if (i < 0) return { value: text, label: '' }
  return { value: words[i], label: words.filter((_, j) => j !== i).join(' ') }
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h4 className="flex items-center gap-2 text-[15px] font-bold text-gray-900">
      <span aria-hidden className="size-1.5 rounded-full bg-primary" />
      {children}
    </h4>
  )
}

export function CaseModal({ item, onClose }: { item: CaseItem; onClose: () => void }) {
  const [index, setIndex] = useState(0)
  const count = item.images

  useEffect(() => {
    lockScroll(true)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % count)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
    }
  }, [count, onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex animate-fade-in items-start justify-center overflow-auto overscroll-contain bg-[rgba(17,24,39,0.55)] p-4 md:p-10"
      data-lenis-prevent
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="relative w-full max-w-[820px] overflow-hidden rounded-[20px] bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="닫기"
          className="absolute top-4 right-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-[0_4px_14px_-6px_rgba(16,24,40,0.35)] transition-[background-color,transform] duration-200 hover:bg-gray-50 active:scale-95 motion-reduce:active:scale-100"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        {/* 이미지 뷰어 */}
        <div className="bg-[#111318]">
          <div className="relative aspect-[16/9]">
            {Array.from({ length: count }, (_, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-300 ease-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
              >
                <Placeholder palette="dark" tone={item.tone + i} label={`현장 사진 ${i + 1}`} />
              </div>
            ))}
            <span className="absolute right-3 bottom-3 rounded-full bg-black/55 px-2.5 py-1 text-[11.5px] font-semibold text-white">
              {index + 1} / {count}
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto p-3">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`사진 ${i + 1}`}
                className={`h-[54px] w-[72px] shrink-0 overflow-hidden rounded-[8px] border-2 transition-opacity md:h-[62px] md:w-[84px] ${
                  i === index ? 'border-white' : 'border-transparent opacity-55 hover:opacity-90'
                }`}
                onClick={() => setIndex(i)}
              >
                <Placeholder palette="dark" tone={item.tone + i} label="" compact />
              </button>
            ))}
          </div>
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-6 p-7 md:p-8">
          <div>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-primary-soft px-2 py-1 text-[12px] font-semibold text-primary">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-[22px] leading-[1.3] font-bold text-gray-900 md:text-[24px]">{item.title}</h3>
            <p className="mt-2 text-[13.5px] text-gray-500">{item.meta}</p>
          </div>

          <div>
            <SectionLabel>교육 개요</SectionLabel>
            <p className="mt-3 text-[14.5px] leading-[1.72] text-gray-600">{item.summary}</p>
          </div>

          {(item.goals || item.curriculum) && (
            <div className="grid gap-6 md:grid-cols-2">
              {item.goals && (
                <div>
                  <SectionLabel>교육 목표</SectionLabel>
                  <ul className="mt-3 flex flex-col gap-2">
                    {item.goals.map((g) => (
                      <li key={g} className="flex items-start gap-2 text-[14px] leading-[1.6] text-gray-600">
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden
                          className="mt-0.75 size-4 shrink-0 text-primary"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m5 12.5 4.5 4.5L19 7.5" />
                        </svg>
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {item.curriculum && (
                <div>
                  <SectionLabel>교육 커리큘럼</SectionLabel>
                  <ol className="mt-3 flex flex-col divide-y divide-gray-100 rounded-xl border border-gray-100">
                    {item.curriculum.map((c, i) => (
                      <li key={c} className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-gray-700">
                        <span className="text-[12px] font-bold text-primary tabular-nums">{i + 1}</span>
                        {c}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          <div>
            <SectionLabel>주요 성과</SectionLabel>
            <ul className="mt-3 grid grid-cols-2 gap-2.5 md:grid-cols-3">
              {item.results.map((r) => {
                const { value, label } = splitStat(r)
                return (
                  <li key={r} className="flex flex-col gap-1 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5">
                    <span className="text-[20px] leading-[1.2] font-bold tracking-[-0.02em] text-primary tabular-nums md:text-[22px]">
                      {value}
                    </span>
                    {label && <span className="text-[13px] leading-[1.45] font-medium text-gray-500">{label}</span>}
                  </li>
                )
              })}
            </ul>
          </div>

          {item.comments && (
            <div>
              <SectionLabel>교육생 코멘트</SectionLabel>
              <ul className="mt-3 flex flex-col gap-2">
                {item.comments.map((c) => (
                  <li key={c} className="rounded-xl bg-gray-50 px-4 py-3 text-[14px] leading-[1.6] text-gray-700">
                    “{c}”
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col items-start gap-3 rounded-[14px] bg-[#f3f6ff] p-5 md:flex-row md:items-center md:justify-between">
            <p className="text-[15px] font-semibold text-gray-900">{CASE_GALLERY.modalCta.text}</p>
            <ButtonLink to={CASE_GALLERY.modalCta.to} size="sm">
              {CASE_GALLERY.modalCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  )
}
