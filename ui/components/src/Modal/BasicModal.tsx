import React from 'react'

import Modal, { ModalProps } from '~/Modal/Modal'

export type BasicModalProps = Omit<
  ModalProps,
  | 'closeOnBackdrop'
  | 'closeOnEsc'
  | 'hasCancel'
  | 'cancelTitle'
  | 'cancelVariant'
  | 'onCancelClick'
  | 'hideButtonContainer'
>

function BasicModal({ children, ...rest }: BasicModalProps) {
  return (
    <Modal {...rest} closeOnBackdrop={false} closeOnEsc={false}>
      {children}
    </Modal>
  )
}

export default BasicModal
