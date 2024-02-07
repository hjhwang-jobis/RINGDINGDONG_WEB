import React from 'react'

import Modal, { ModalProps } from '~/Modal/Modal'

export type SimpleModalProps = Omit<
  ModalProps,
  'hasCancel' | 'hideButtonContainer'
>

function SimpleModal({ children, ...rest }: SimpleModalProps) {
  return <Modal {...rest}>{children}</Modal>
}

export default SimpleModal
