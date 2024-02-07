import { createContext } from 'react'

import { init, isAuthenticated, logout } from '~/utils/keyCloak'

interface AuthContextType {
  isAuthenticated: () => boolean
  init: () => Promise<boolean>
  logout: (redirectUrl: string) => void
}

const value = {
  isAuthenticated: () => !!isAuthenticated(),
  init: () => init(),
  logout: (redirectUrl: string) => logout(redirectUrl),
}

export const AuthContext = createContext<AuthContextType>(value)

function AuthProvider({ children }: { children: JSX.Element }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
