import React, { Component, ReactNode } from 'react'

import ErrorPage from './ErrorPage'

interface Props {
  children: ReactNode
}

interface State {
  error?: Error
}

class ErrorBoundaryInner extends Component<Props, State> {
  public state: State = { error: undefined }

  public static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  public render() {
    const { error } = this.state

    if (error) return <ErrorPage error={error} />

    return this.props.children
  }
}

export default ErrorBoundaryInner
