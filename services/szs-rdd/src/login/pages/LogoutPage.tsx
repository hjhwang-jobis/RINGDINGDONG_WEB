import { useContext } from 'react'

import { AuthContext } from '~/components/AuthProvider'

function LogoutPage() {
  const redirectUrl = `${window.location.origin}`
  const auth = useContext(AuthContext)
  auth.logout(redirectUrl)

  return null
}

export default LogoutPage
