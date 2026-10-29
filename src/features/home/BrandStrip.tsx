import { CLIENTS } from '../../content/home'

/** 고객사 로고 띠 — 로고가 오른쪽→왼쪽으로 끝없이 흐름 (hover 시 멈춤) */
export function BrandStrip() {
  return (
    <section className="w-full bg-gray-50 px-6 py-6 md:px-[60px] md:py-10">
      <div
        role="img"
        aria-label={`고객사: ${CLIENTS.map((c) => c.name).join(', ')}`}
        className="group mx-auto w-full max-w-[1200px] overflow-hidden mask-[linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
      >
        {/* 같은 로고 묶음을 두 번 이어 붙이고 -50%만큼 이동 → 이음매 없이 반복 */}
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-8">
          {[0, 1].flatMap((set) =>
            CLIENTS.map((client) => (
              <div
                key={`${set}-${client.name}`}
                aria-hidden
                className={`mr-8 flex h-[26px] flex-none items-center sm:mr-[clamp(2.5rem,4.5vw,3.75rem)] sm:h-[38px] ${set === 1 ? 'motion-reduce:hidden' : ''}`}
              >
                {client.src ? (
                  <img
                    src={client.src}
                    alt=""
                    draggable={false}
                    className="h-full w-auto max-w-[104px] object-contain sm:max-w-[160px]"
                    style={client.scale ? { height: `${client.scale * 100}%` } : undefined}
                  />
                ) : (
                  <span className="text-[15px] font-bold whitespace-nowrap text-gray-400 sm:text-[19px]">{client.name}</span>
                )}
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  )
}
