import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Button,
  ButtonProps,
  palette,
  shadow,
  Spacing,
  Typo,
  useDropdown,
} from '@fe3o3/ui'
import { head, last } from 'lodash-es'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useEscKeyEvent } from '~/Modal/hooks/useEvent'
import useModal, { BaseModal } from '~/Modal/hooks/useModal'

const FOCUSABLE_ELEMENTS =
  'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"]):not([data-focus-trap])'

export interface ModalProps extends BaseModal {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  dimmed?: boolean
  title?: React.ReactNode
  titleColor?: string
  content?: React.ReactNode
  children?: React.ReactNode
  autoFocus?: boolean
  closeOnBackdrop?: boolean
  closeOnEsc?: boolean
  hideButtonContainer?: boolean
  hasCancel?: boolean
  cancelTitle?: string
  okTitle?: string
  okDisabled?: boolean
  cancelVariant?: ButtonProps['variant']
  okVariant?: ButtonProps['variant']
  onCancelClick?: () => void
  onOkClick?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<unknown>
}

function Modal({
  modalKey,
  size = 'md',
  dimmed = true,
  title,
  titleColor,
  content,
  children,
  autoFocus,
  closeOnBackdrop = true,
  closeOnEsc = true,
  hideButtonContainer,
  hasCancel,
  cancelTitle = '취소',
  okTitle = '확인',
  okDisabled,
  cancelVariant = 'link',
  okVariant = 'primary',
  onCancelClick,
  onOkClick,
}: ModalProps) {
  const { clear, hide } = useDropdown()
  const { closeModal, isTopModal } = useModal()
  const backdropRef = useRef<HTMLDivElement>(null)
  const modalDialogRef = useRef<HTMLDivElement>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const focusTrapRef = useRef<HTMLDivElement>(null)
  const [registerEscKeyEvent, removeEscKeyEvent] = useEscKeyEvent()
  const [previousFocusedNode, setPreviousFocusedNode] =
    useState<HTMLElement | null>()
  const [isDisabledFocusTrap, setIsDisabledFocusTrap] = useState(!autoFocus)
  const [isLoading, setIsLoading] = useState(false)

  const handleCancelClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onCancelClick?.()

      if (e.isDefaultPrevented()) return

      closeModal(modalKey)
    },
    [onCancelClick, closeModal, modalKey]
  )

  const handleOkClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onOkClick) {
        setIsLoading(true)

        try {
          await onOkClick(e)
        } catch {
          setIsLoading(false)

          return
        }

        setIsLoading(false)
      }

      if (e.isDefaultPrevented()) return

      closeModal(modalKey)
    },
    [onOkClick, closeModal, modalKey]
  )

  const focusElement = useCallback((first: boolean) => {
    if (!backdropRef.current) {
      return
    }

    const focusableElements =
      backdropRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)
    const newFocused = first ? head(focusableElements) : last(focusableElements)

    if (!newFocused) {
      modalContentRef.current?.focus()

      return
    }

    newFocused.focus()
  }, [])

  const focusFirst = useCallback(() => focusElement(true), [focusElement])

  const focusLast = useCallback(() => focusElement(false), [focusElement])

  const handleTrapFocus = useCallback(() => {
    if (isDisabledFocusTrap) {
      return
    }

    focusLast()
  }, [isDisabledFocusTrap, focusLast])

  const handleTrapBlur = useCallback(() => {
    if (!isDisabledFocusTrap) {
      return
    }

    setIsDisabledFocusTrap(false)
  }, [isDisabledFocusTrap])

  const handleEscKeydown = useCallback(
    (e: React.KeyboardEvent) => {
      e.stopPropagation()

      if (!closeOnEsc || isLoading) {
        return
      }

      closeModal()
    },
    [closeOnEsc, isLoading, closeModal]
  )

  const handleTabKeydown = useCallback(
    (e: KeyboardEvent) => {
      e.stopPropagation()

      if (e.shiftKey && e.key === 'Tab' && e.target === focusTrapRef.current) {
        e.preventDefault()

        focusLast()
      }
    },
    [focusLast]
  )

  const windowKeydownListener = useCallback(
    (e: KeyboardEvent) => {
      handleTabKeydown(e)
    },
    [handleTabKeydown]
  )

  const windowClickListener = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()

      if (!closeOnBackdrop || isLoading) {
        return
      }

      if ((e.target as HTMLElement) === backdropRef.current) {
        closeModal()
      }
    },
    [closeOnBackdrop, isLoading, closeModal]
  )

  const addEventListeners = useCallback(() => {
    window.addEventListener('keydown', windowKeydownListener)
    window.addEventListener('click', windowClickListener)
  }, [windowKeydownListener, windowClickListener])

  const clearEventListeners = useCallback(() => {
    window.removeEventListener('keydown', windowKeydownListener)
    window.removeEventListener('click', windowClickListener)
  }, [windowKeydownListener, windowClickListener])

  const handleAutoFocus = useCallback(() => {
    // if autoFocus is set to true, focus first focusable element in ModalContent(includes Header, Body, ButtonContainer)
    if (autoFocus) {
      focusFirst()

      return
    }

    // just focus focusTrap element for trapping tab event
    focusTrapRef.current?.focus()
  }, [autoFocus, focusFirst])

  const restoreFocus = useCallback(() => {
    previousFocusedNode?.focus({ preventScroll: true })
  }, [previousFocusedNode])

  // save previous focused node for restore focus state when modal is closed
  useEffect(() => {
    if (!previousFocusedNode) {
      setPreviousFocusedNode(document.activeElement as HTMLElement)
    }

    return () => {
      if (previousFocusedNode) {
        restoreFocus()
      }
    }
  }, [modalKey, previousFocusedNode, restoreFocus])

  useEffect(() => {
    handleAutoFocus()
  }, [handleAutoFocus])

  // init KeydownListener and ClickListener for modal closing and trapping tap event
  useEffect(() => {
    if (!modalKey || !isTopModal(modalKey)) {
      clearEventListeners()

      return
    }

    const escKeyEvent = registerEscKeyEvent(handleEscKeydown)

    addEventListeners()

    return () => {
      removeEscKeyEvent(escKeyEvent)

      clearEventListeners()
    }
  }, [
    modalKey,
    isTopModal,
    addEventListeners,
    clearEventListeners,
    registerEscKeyEvent,
    handleEscKeydown,
    removeEscKeyEvent,
  ])

  // document.body scroll hidden while modal showing
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [isTopModal])

  // clear Dropdown
  useEffect(() => {
    if (!modalKey || !isTopModal(modalKey)) {
      return
    }

    clear()
    hide()
  }, [isTopModal, modalKey, clear, hide])

  return (
    <Backdrop ref={backdropRef} dimmed={dimmed}>
      <ModalDialog ref={modalDialogRef} size={size}>
        <div
          ref={focusTrapRef}
          tabIndex={0}
          onFocus={handleTrapFocus}
          onBlur={handleTrapBlur}
          data-focus-trap={true}
        />

        <ModalContent ref={modalContentRef} tabIndex={-1}>
          {title && (
            <Header>
              {typeof title === 'string' ? (
                <Typo type="H6" style={{ color: titleColor }}>
                  {title}
                </Typo>
              ) : (
                title
              )}
            </Header>
          )}
          <BodyWrapper hideButtonContainer={hideButtonContainer}>
            <Body>
              {content && (
                <Typo type="S1" style={{ color: palette.gray['60'] }}>
                  {content}
                </Typo>
              )}
              {children}
            </Body>
          </BodyWrapper>
          {!hideButtonContainer && (
            <ButtonContainer>
              {hasCancel && (
                <>
                  <Button
                    size="medium"
                    variant={cancelVariant}
                    onClick={handleCancelClick}
                    disabled={isLoading}
                  >
                    {cancelTitle}
                  </Button>
                  <Spacing size={8} inline />
                </>
              )}
              <Button
                size="medium"
                variant={okVariant}
                onClick={handleOkClick}
                hasSpinner={isLoading}
                disabled={okDisabled || isLoading}
              >
                {okTitle}
              </Button>
            </ButtonContainer>
          )}
        </ModalContent>

        <div tabIndex={0} onFocus={focusFirst} data-focus-trap={true} />
      </ModalDialog>
    </Backdrop>
  )
}

const Backdrop = styled.div<{ dimmed: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;

  ${({ dimmed }) =>
    dimmed &&
    css`
      background-color: rgba(0, 0, 0, 0.5);
    `}
`

const ModalDialog = styled.div<Pick<ModalProps, 'size'>>`
  margin: 3rem auto;
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem 0;
  box-shadow: ${shadow[20]};
  width: auto;
  max-height: calc(100vh - 6rem);
  box-sizing: border-box;
  display: flex;

  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return css`
          max-width: 18.75rem;
        `
      case 'md':
        return css`
          max-width: 31.25rem;
        `
      case 'lg':
        return css`
          max-width: 50rem;
        `
      case 'xl':
        return css`
          max-width: 71.25rem;
        `
    }
  }}
`

const ModalContent = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem 1.5rem;
`

const Body = styled.div`
  padding: 0 1.5rem;
  overflow: hidden;
`

const BodyWrapper = styled.div<{ hideButtonContainer?: boolean }>`
  max-height: ${({ hideButtonContainer }) =>
    hideButtonContainer ? '100%' : 'calc(100% - 3rem)'};
  overflow-y: auto;
  word-break: break-all;
  flex: 1;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem 1.5rem 0;
`

export default Modal
