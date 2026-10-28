import { CLIENTS } from '../../content/home'

/** 고객사 띠 — 함께한 기업·기관 이름이 오른쪽→왼쪽으로 끝없이 흐름 (hover 시 멈춤) */
export function ClientStrip() {
  return (
    <section className="w-full border-b border-gray-100 bg-gray-50 px-6 py-7 md:px-[60px] md:py-9">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-4 md:flex-row md:gap-10">
        <h2 className="shrink-0 text-[14px] font-semibold text-gray-500 md:text-[15px]">{CLIENTS.label}</h2>
        <div className="group w-full min-w-0 overflow-hidden mask-[linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          {/* 같은 묶음을 두 번 이어 붙이고 -50%만큼 이동 → 이음매 없이 반복 */}
          <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3">
            {[0, 1].flatMap((set) =>
              CLIENTS.names.map((name) => (
                <li
                  key={`${set}-${name}`}
                  aria-hidden={set === 1}
                  className={`mr-10 flex-none text-[17px] font-bold tracking-[-0.01em] whitespace-nowrap text-gray-400 md:mr-14 md:text-[20px] ${set === 1 ? 'motion-reduce:hidden' : ''}`}
                >
                  {name}
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
