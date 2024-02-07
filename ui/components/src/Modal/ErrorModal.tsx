import { Icon, palette, Spacing, Typo } from '@fe3o3/ui'
import React from 'react'

import { BasicModal } from '~/Modal'
import { BaseModal } from '~/Modal/hooks/useModal'

export interface ErrorModalProps extends BaseModal {
  title: string
  errorCode?: string | number
  errorMessage: React.ReactNode
}

function ErrorModal({
  modalKey,
  title,
  errorCode,
  errorMessage,
}: ErrorModalProps) {
  return (
    <BasicModal
      modalKey={modalKey}
      size="sm"
      title={
        <>
          <Icon icon="ic_basic_large_alert_circle" color={palette.solid.red} />
          <Spacing rem={0.5} inline />
          <Typo type="H6" color={palette.solid.red}>
            {title}
          </Typo>
        </>
      }
      okTitle="확인"
      okVariant="danger"
      content={
        errorCode ? (
          <>
            [{errorCode}] {errorMessage}
          </>
        ) : (
          errorMessage
        )
      }
    />
  )
}

export default ErrorModal
