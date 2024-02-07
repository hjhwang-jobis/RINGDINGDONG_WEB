import { jwtDecode } from 'jwt-decode'

import { getAccessToken } from './keyCloak'

interface Decoded {
  realm_access: {
    roles: string[]
  }
}

const getRoles = (): string[] => {
  const token = getAccessToken()
  if (!token) {
    return []
  }
  const decoded: Decoded = jwtDecode(token)
  if (decoded.realm_access?.roles) return decoded.realm_access?.roles

  return []
}

const getRoleSet = (): Set<string> =>
  getRoles().reduce((acc, v) => {
    acc.add(v.toLowerCase())

    return acc
  }, new Set<string>())

export const hasRole = (roles: string[]): boolean => {
  const roleSet = getRoleSet()

  return roles.some((v) => roleSet.has(v.toLowerCase()))
}
