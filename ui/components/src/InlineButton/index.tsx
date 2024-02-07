import styled from '@emotion/styled'
import { Button, ButtonProps } from '@fe3o3/ui'
import React from 'react'

export interface InlineButtonProps extends ButtonProps {
  display?: 'inline' | 'inline-block'
}

function InlineButton({
  display = 'inline',
  children,
  ...rest
}: InlineButtonProps) {
  return (
    <StyledButton display={display} {...rest}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled(Button)<Pick<InlineButtonProps, 'display'>>`
  &&& {
    display: ${({ display }) => display};
  }
`

export default InlineButton
