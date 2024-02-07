import styled from '@emotion/styled'
import { palette, shadow, Typo } from '@fe3o3/ui'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

import type { PopperProps } from '~/Popper'
import Popper, { PopperTrigger } from '~/Popper'

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  targetElement: HTMLElement | null
  placement: PopperProps['placement']
  trigger?: PopperTrigger[]
}

function Tooltip({
  targetElement,
  placement,
  trigger = [PopperTrigger.Hover, PopperTrigger.Focus],
  children,
  ...rest
}: PropsWithChildren<TooltipProps>) {
  return (
    <Popper
      reference={targetElement}
      placement={placement}
      trigger={trigger}
      hasArrow
      arrowStyle={arrowStyle}
    >
      <Container {...rest}>
        <Typo type="LB2" color={palette.white}>
          {children}
        </Typo>
      </Container>
    </Popper>
  )
}

const Container = styled.div`
  max-width: 30rem;
  padding: 0.75rem;
  background-color: ${palette.gray[90]};
  border-radius: 0.375rem;
  box-shadow: ${shadow[10]};
  white-space: pre-wrap;
`

const arrowStyle: React.CSSProperties = {
  backgroundColor: palette.gray[90],
  boxShadow: shadow[10],
}

export default Tooltip
