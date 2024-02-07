import React, { PropsWithChildren } from 'react'

// import { useLocation } from 'react-router-dom'
import ErrorBoundaryInner from './ErrorBoundaryInner'

function ErrorBoundary({ children }: PropsWithChildren<{}>) {
  // TODO location을 기준으로 key를 잡은 이유는?
  // const location = useLocation()
  // const key = location.key
  const key = 'ErrorBoundaryInner'

  return <ErrorBoundaryInner key={key}>{children}</ErrorBoundaryInner>
}

export default ErrorBoundary
