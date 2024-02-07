import styled from '@emotion/styled'
import { Placement } from '@popperjs/core'
import { isEmpty } from 'lodash-es'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { usePopper } from 'react-popper'

export const PopperTrigger = { Hover: 'hover', Focus: 'focus' } as const

export type PopperTrigger = (typeof PopperTrigger)[keyof typeof PopperTrigger]

export type PopperPlacement = Placement

const ARROW_SIZE = '0.625rem'
const OFFSET_SIZE = '0.5rem'

/**
 * @interface Props
 * @prop {HTMLElement | null} reference - Popper 의 기준이 되는 Element
 * @prop {Placement} placement - Popper 위치. 여유공간에 따라 설정값의 반대 위치로 flip 될 수 있음)
 * @prop {React.ReactNode} children - Popper 에 렌더될 Node
 * @prop {PopperTrigger[]} trigger - Popper 렌더되는 액션 트리거. 빈 배열일 경우 항상 렌더됨
 * @prop {boolean | undefined} hasArrow - 화살표 유무
 * @prop {React.CSSProperties | undefined} arrowStyle - 화살표 스타일
 */
export interface PopperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  reference: HTMLElement | null
  placement: PopperPlacement
  trigger: PopperTrigger[]
  hasArrow?: boolean
  arrowStyle?: React.CSSProperties
  children: React.ReactNode
}

function Popper({
  reference,
  placement,
  trigger,
  hasArrow = false,
  arrowStyle: arrowStyleProps = {},
  children,
  ...rest
}: PopperProps) {
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const [arrow, setArrow] = useState<HTMLDivElement | null>(null)
  const [isShow, setShow] = useState(isEmpty(trigger))

  const { styles, attributes } = usePopper(reference, element, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'arrow',
        options: hasArrow ? { element: arrow } : undefined,
      },
    ],
  })

  const arrowStyle = useMemo(
    () => ({ ...styles.arrow, ...arrowStyleProps }),
    [arrowStyleProps, styles.arrow]
  )

  const show = useCallback(() => setShow(true), [])

  const hide = useCallback(() => setShow(false), [])

  const hasTrigger = useCallback(
    (value: PopperTrigger) => trigger?.includes(value),
    [trigger]
  )

  useEffect(() => {
    if (!reference || !hasTrigger(PopperTrigger.Hover)) return

    reference.addEventListener('mouseenter', show)
    reference.addEventListener('mouseleave', hide)

    return () => {
      reference.removeEventListener('mouseenter', show)
      reference.removeEventListener('mouseleave', hide)
    }
  }, [hasTrigger, hide, show, reference])

  useEffect(() => {
    if (!element || !hasTrigger(PopperTrigger.Hover)) return

    element.addEventListener('mouseenter', show)
    element.addEventListener('mouseleave', hide)

    return () => {
      element.removeEventListener('mouseenter', show)
      element.removeEventListener('mouseleave', hide)
    }
  }, [hasTrigger, hide, show, element])

  useEffect(() => {
    if (!reference || !hasTrigger(PopperTrigger.Focus)) return

    reference.addEventListener('focus', show)
    reference.addEventListener('blur', hide)

    return () => {
      reference.removeEventListener('focus', show)
      reference.removeEventListener('blur', hide)
    }
  }, [hasTrigger, hide, show, reference])

  if (!isShow) return null

  return (
    <Container
      ref={setElement}
      {...rest}
      style={styles.popper}
      {...attributes.popper}
    >
      {children}
      {hasArrow && (
        <Arrow ref={setArrow} style={arrowStyle} {...attributes.arrow} />
      )}
    </Container>
  )
}

const Arrow = styled.div`
  position: absolute;
  width: ${ARROW_SIZE};
  height: ${ARROW_SIZE};
  visibility: hidden;

  &::before {
    content: '';
    visibility: visible;
    position: absolute;
    top: 0;
    left: 0;
    width: ${ARROW_SIZE};
    height: ${ARROW_SIZE};
    background-color: inherit;
    box-shadow: inherit;
    transform: rotate(45deg);
  }
`

const Container = styled.div`
  z-index: 1000;

  &[data-popper-placement^='top'] {
    margin-bottom: -${OFFSET_SIZE};
    padding-bottom: ${OFFSET_SIZE};

    ${Arrow} {
      bottom: calc(-0.25rem + ${OFFSET_SIZE});
    }
  }

  &[data-popper-placement^='bottom'] {
    margin-top: -${OFFSET_SIZE};
    padding-top: ${OFFSET_SIZE};

    ${Arrow} {
      top: calc(-0.25rem + ${OFFSET_SIZE});
    }
  }

  &[data-popper-placement^='left'] {
    margin-right: -${OFFSET_SIZE};
    padding-right: ${OFFSET_SIZE};

    ${Arrow} {
      right: calc(-0.25rem + ${OFFSET_SIZE});
    }
  }

  &[data-popper-placement^='right'] {
    margin-left: -${OFFSET_SIZE};
    padding-left: ${OFFSET_SIZE};

    ${Arrow} {
      left: calc(-0.25rem + ${OFFSET_SIZE});
    }
  }
`

export default Popper
