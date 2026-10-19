import { Fragment } from 'react'

/** 문자열의 \n 을 줄바꿈으로 렌더링. desktopOnly면 md 이상에서만 줄바꿈 */
export function MultiLine({ text, desktopOnly = false }: { text: string; desktopOnly?: boolean }) {
  const lines = text.split('\n')
  return lines.map((line, i) => (
    <Fragment key={i}>
      {line}
      {i < lines.length - 1 &&
        (desktopOnly ? (
          <>
            {' '}
            <br className="hidden md:block" />
          </>
        ) : (
          <br />
        ))}
    </Fragment>
  ))
}
