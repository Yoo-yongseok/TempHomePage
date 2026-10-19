import { ImageIcon } from '../../components/ui/icons'
import { MultiLine } from '../../components/ui/MultiLine'

type Props = { title: string; subtitle: string; index: number }

/** 제목 + 설명 + 인터랙션 데모 영역 (원본은 1080×450 스테이지에 자동재생 UI 데모) */
export function FeatureSection({ title, subtitle, index }: Props) {
  return (
    <div className="flex flex-col gap-6 py-[52px] md:gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-[28px] leading-[1.2] font-bold text-balance text-gray-900 md:text-[40px]">
          <MultiLine text={title} desktopOnly />
        </h2>
        <p className="text-[16px] leading-[1.3] tracking-[-0.22px] text-gray-500 md:text-[22px]">{subtitle}</p>
      </div>
      <div className="flex aspect-[1080/450] w-full flex-col items-center justify-center gap-3 rounded-[12px] bg-gray-50 text-gray-400">
        <ImageIcon className="size-10" />
        <span className="text-[14px] font-semibold md:text-[16px]">
          인터랙션 데모 영역 {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
