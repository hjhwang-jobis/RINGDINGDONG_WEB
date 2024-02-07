import React from 'react'

import Modal, { ModalProps } from '~/Modal/Modal'

export type ConfirmModalProps = Omit<
  ModalProps,
  'hasCancel' | 'hideButtonContainer'
>

function ConfirmModal({ children, ...rest }: ConfirmModalProps) {
  return (
    <Modal {...rest} hasCancel>
      {children}
    </Modal>
  )
}

export default ConfirmModal
