import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { CardTitle, Info, palette, shadow, Spacing, Typo } from '@fe3o3/ui'
import React from 'react'

const StickyPosition = { Top: 'top', Bottom: 'bottom' } as const

type StickyPosition = (typeof StickyPosition)[keyof typeof StickyPosition]

export interface Props {
  title?: string
  message?: React.ReactNode
  sticky?: boolean
  stickyPosition?: StickyPosition
  hasAnimation?: boolean
  className?: string
}

function ErrorInfo({
  title,
  message,
  sticky = false,
  stickyPosition = StickyPosition.Top,
  hasAnimation = false,
  className,
}: Props) {
  return (
    <StyledInfo
      type="error"
      className={className}
      sticky={sticky}
      stickyPosition={stickyPosition}
      hasAnimation={hasAnimation}
    >
      <CardTitle
        type="S1"
        color={palette.dark.red}
        prefixIconName="alert_circle_large"
        prefixIconColor={palette.dark.red}
      >
        {title || '오류가 발생했습니다'}
      </CardTitle>
      <Spacing rem={1} />
      <ErrorMessage type="S1">{message}</ErrorMessage>
    </StyledInfo>
  )
}

const StyledInfo = styled(Info)<
  Pick<Props, 'sticky' | 'stickyPosition' | 'hasAnimation'>
>`
  ${({ sticky, stickyPosition, hasAnimation }) =>
    sticky &&
    css`
      position: sticky;
      box-shadow: ${shadow[5]};
      z-index: 5;

      ${stickyPosition === StickyPosition.Top &&
      css`
        top: 0;
        margin-bottom: 1.5rem;
      `}

      ${stickyPosition === StickyPosition.Bottom &&
      css`
        bottom: 0;
        margin-top: 1.5rem;
      `}
      
      ${hasAnimation &&
      css`
        animation: ${bounce} 1s ease-in-out;
      `}
    `}
`

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0, 0, 0);
  }

  40%, 43% {
    transform: translate3d(0, -2rem, 0);
  }

  70% {
    transform: translate3d(0, -1rem, 0);
  }

  90% {
    transform: translate3d(0, -0.25rem, 0);
  }
`

const ErrorMessage = styled(Typo)`
  color: ${palette.solid.red};
  word-break: break-all;
`

export default ErrorInfo
