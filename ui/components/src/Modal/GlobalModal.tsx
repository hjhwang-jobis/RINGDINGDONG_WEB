import React from 'react'
import { useRecoilValue } from 'recoil'

import {
  BaseModal,
  GlobalModalComponent,
  modalAtom,
} from '~/Modal/hooks/useModal'

function GlobalModal() {
  const modals = useRecoilValue(modalAtom)

  if (modals.length === 0) {
    return null
  }

  return (
    <>
      {modals.map(({ component, props }: GlobalModalComponent<BaseModal>) => {
        const ModalComponent = component

        return <ModalComponent key={props.modalKey} {...props} />
      })}
    </>
  )
}

export default GlobalModal
