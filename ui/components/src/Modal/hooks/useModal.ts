import { last, uniqueId } from 'lodash-es'
import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

import {
  BasicModal,
  BasicModalProps,
  ConfirmModal,
  ConfirmModalProps,
  ErrorModal,
  ErrorModalProps,
  SimpleModal,
  SimpleModalProps,
} from '~/Modal'

/**
 * 커스텀 Modal 컴포넌트를 만들어야 할 때 커스텀 컴포넌트의 Props 는 해당 interface 를 상속해야만 합니다.
 * ex) interface CustomModalProps extends BaseModal { ... }
 *
 * 상속받은 interface 의 modalKey 를 Modal 컴포넌트에 전달해줘야만 합니다.
 * ex) function CustomModal({ modalKey, ...rest }: CustomModalProps) {
 *   return (
 *     <BasicModal
 *       modalKey={modalKey}
 *       {...rest}
 *     />
 *   )
 * }
 */
export interface BaseModal {
  // useModal hook 에서 자동으로 부여되는 고유키이므로 별도로 설정하지 않아도 됩니다.
  modalKey: string
}

export interface GlobalModalComponent<T extends BaseModal> {
  component: (props: T) => JSX.Element
  props: T
}

export const modalAtom = atom<GlobalModalComponent<any>[]>({
  key: 'modalAtom',
  default: [],
})

export default function useModal() {
  const [modals, setModals] = useRecoilState(modalAtom)

  const showModal = useCallback(
    <T extends BaseModal>(
      modalComponent: (props: T) => JSX.Element,
      modalProps: Omit<T, 'modalKey'>
    ) => {
      setModals((prev) => {
        const newModals = [...prev]

        const baseModal: BaseModal = { modalKey: uniqueId('modal-') }
        const props = { ...modalProps, ...baseModal }

        const modal: GlobalModalComponent<T> = {
          component: modalComponent,
          props: props as T,
        }

        newModals.push(modal)

        return newModals
      })
    },
    [setModals]
  )

  const showBasicModal = useCallback(
    (basicModalProps: Omit<BasicModalProps, 'modalKey'>) =>
      showModal(BasicModal, basicModalProps),
    [showModal]
  )

  const showConfirmModal = useCallback(
    (confirmModalProps: Omit<ConfirmModalProps, 'modalKey'>) =>
      showModal(ConfirmModal, confirmModalProps),
    [showModal]
  )

  const showSimpleModal = useCallback(
    (simpleModalProps: Omit<SimpleModalProps, 'modalKey'>) =>
      showModal(SimpleModal, simpleModalProps),
    [showModal]
  )

  const showErrorModal = useCallback(
    (errorModalProps: Omit<ErrorModalProps, 'modalKey'>) => {
      showModal(ErrorModal, errorModalProps)
    },
    [showModal]
  )

  const closeModal = useCallback(
    (modalKey?: string) => {
      if (modalKey) {
        setModals((prev) =>
          [...prev].filter(
            (modal) => (modal.props as BaseModal).modalKey !== modalKey
          )
        )

        return
      }

      setModals((prev) => {
        const newModals = [...prev]

        newModals.pop()

        return newModals
      })
    },
    [setModals]
  )

  const isTopModal = useCallback(
    (modalKey: string) => {
      const topModal = last(modals)

      if (!topModal) {
        return false
      }

      return (
        (topModal as GlobalModalComponent<BaseModal>).props.modalKey ===
        modalKey
      )
    },
    [modals]
  )

  return {
    showModal,
    showBasicModal,
    showConfirmModal,
    showSimpleModal,
    showErrorModal,
    closeModal,
    isTopModal,
  }
}
