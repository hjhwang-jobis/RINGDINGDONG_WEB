import { useContext, useEffect, useState } from 'react'

import { AuthContext } from '~/components/AuthProvider'

export default function useKeyCloak() {
  const auth = useContext(AuthContext)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(false)
    auth.init().then(() => {
      setIsAuthenticated(auth.isAuthenticated())
    })
  }, [auth])

  return isAuthenticated
}
