const CHAR_DELAY = 45

/** 글자가 하나씩 아래에서 떠오르는 텍스트 (원본 서비스 히어로 제목, eduRiseIn) */
export function RiseText({ text }: { text: string }) {
  let index = 0
  const words = text.split(' ')

  return (
    <>
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => {
        const chars = [...word].map((ch) => {
          const delay = index++ * CHAR_DELAY
          return (
            <span
              key={delay}
              aria-hidden
              className="inline-block animate-rise-in"
              style={{ animationDelay: `${delay}ms` }}
            >
              {ch}
            </span>
          )
        })
        index++ // 띄어쓰기도 한 글자만큼 지연
        return (
          <span key={wi}>
            <span className="inline-block whitespace-nowrap">{chars}</span>
            {wi < words.length - 1 && ' '}
          </span>
        )
      })}
    </>
  )
}
