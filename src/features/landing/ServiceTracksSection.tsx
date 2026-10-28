import { Link } from 'react-router'
import { MultiLine } from '../../components/ui/MultiLine'
import { ChevronRight } from '../../components/ui/icons'
import { TRACKS, type Track, type TrackRef } from '../../content/home'
import { Reveal, Section, SectionHead } from './primitives'

const tagClass = 'w-fit rounded-md bg-signal/10 px-2 py-0.5 text-[12px] font-semibold text-signal-text'

/** 교육 이력 — 기업명 + 과정명 */
function EducationRef({ r }: { r: TrackRef }) {
  return (
    <li className="flex flex-col gap-1.5 rounded-2xl bg-gray-50 px-5 py-4">
      <span className={tagClass}>{r.tag}</span>
      <span className="mt-1 text-[16px] font-bold text-ink">{r.client}</span>
      <span className="text-[14.5px] leading-snug text-mute">{r.title}</span>
    </li>
  )
}

/** 자동화 구축 사례 — 성과 수치를 강조 */
function AxRef({ r }: { r: TrackRef }) {
  return (
    <li className="flex flex-col gap-1.5 rounded-2xl bg-gray-50 px-5 py-4">
      <span className={tagClass}>{r.tag}</span>
      <span className="mt-1 text-[16px] font-bold text-ink">{r.client}</span>
      <span className="text-[14.5px] leading-snug text-mute">{r.title}</span>
      {r.result && (
        <span className="mt-2 flex items-center gap-1.5 border-t border-rule pt-3 text-[15px] font-bold text-signal-text">
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="size-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
          >
            <path d="M5 17 10 12l3 3 6-6M14 9h5v5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {r.result}
        </span>
      )}
    </li>
  )
}

function TrackPanel({ track }: { track: Track }) {
  const Ref = track.programs ? AxRef : EducationRef
  return (
    <Reveal
      as="article"
      className="rounded-[28px] border border-[#eceef2] bg-white p-[clamp(1.5rem,4vw,3.25rem)] shadow-[0_1px_2px_#1018280a,0_24px_48px_-32px_#10182833]"
    >
      {/* 서비스 설명은 위 스크롤 탭 섹션에 있으므로 여기선 이름·요약·레퍼런스만 */}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-[clamp(1.5rem,2.8vw,2rem)] leading-tight font-bold tracking-[-0.025em] text-ink">
            {track.name}
          </h3>
          <p className="mt-2 leading-relaxed text-mute">{track.summary}</p>
        </div>
        <Link
          to={track.to}
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gray-50 px-4 py-2 text-[15px] font-semibold text-gray-600 transition-colors hover:bg-gray-100"
        >
          {track.more} <ChevronRight />
        </Link>
      </div>

      {track.programs && (
        <div className="mt-8">
          <p className="text-sm font-semibold text-mute">{track.programs.label}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {track.programs.items.map((p) => (
              <li key={p} className="rounded-full border border-rule px-3.5 py-2 text-[14.5px] font-semibold text-ink">
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 border-t border-rule pt-8">
        <p className="text-sm font-semibold text-mute">{track.refsLabel}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {track.refs.map((r) => (
            <Ref key={r.client + r.title} r={r} />
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

/** #tracks — 서비스별 레퍼런스 (교육 이력 / 자동화 구축 사례·성과) */
export function ServiceTracksSection() {
  return (
    <Section id="tracks" tone="gray">
      <SectionHead title={<MultiLine text={TRACKS.title} desktopOnly />} sub={TRACKS.sub} />
      <div className="flex flex-col gap-6 md:gap-8">
        {TRACKS.items.map((t) => (
          <TrackPanel key={t.id} track={t} />
        ))}
      </div>
    </Section>
  )
}
