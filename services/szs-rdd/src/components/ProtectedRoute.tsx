import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { roleUtils } from '~/utils'

interface Props {
  roles: string[]
  children: ReactNode
}

function ProtectedRoute({ roles, children }: Props) {
  const isAuthorized = roleUtils.hasRole(roles)

  if (!isAuthorized) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

export default ProtectedRoute
