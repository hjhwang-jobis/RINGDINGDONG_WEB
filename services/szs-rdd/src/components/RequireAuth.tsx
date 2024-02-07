import { ErrorModal, useModal } from '@3o3-internal/components'
import { useEffect } from 'react'

import service from '~/api/service'
import useKeyCloak from '~/hooks/useKeyCloak'
import { ApiError } from '~/types/api'

function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuthenticated = useKeyCloak()
  const { showModal } = useModal()

  useEffect(() => {
    async function postAuthUser() {
      if (isAuthenticated) {
        try {
          await service.postAuthUser()
        } catch (error) {
          const { message, code } = error as ApiError
          if (message && code) {
            showModal(ErrorModal, {
              title: '사용자 인증 오류',
              errorMessage: message,
              errorCode: code ?? -1,
            })
          }
        }
      }
    }
    postAuthUser()
  }, [isAuthenticated, showModal])

  return isAuthenticated ? children : null
}

export default RequireAuth
