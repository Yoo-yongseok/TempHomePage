import { SearchIcon } from '../../components/ui/icons'

export function SearchBox({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex h-[56px] w-full items-center gap-4 rounded-[10px] bg-gray-50 px-4 md:w-[400px]">
      <SearchIcon className="size-5 shrink-0 text-gray-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="검색"
        className="min-w-0 flex-1 bg-transparent text-[16px] tracking-[-0.16px] text-gray-900 outline-none placeholder:text-gray-400"
      />
    </label>
  )
}
