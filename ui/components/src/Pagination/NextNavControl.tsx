import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Button, Icon, palette } from '@fe3o3/ui'
import React from 'react'

const NavIcon = styled(Icon, {
  shouldForwardProp: (name: string) => !name.startsWith('$'),
})<{ $disabled: boolean }>`
  ${({ $disabled }) =>
    $disabled
      ? css`
          color: ${palette.gray['40']};
        `
      : css`
          color: ${palette.solid.blue};
        `};
`

const NavControl = styled(Button)`
  padding: 0.5rem 0.5rem 0.3rem 0.5rem !important;

  &:hover:not(:disabled) {
    ${NavIcon} {
      color: ${palette.white};
    }
  }
`

export interface Props {
  disabled: boolean
  onClick: () => void
}

function LeftNavControl({ disabled, onClick }: Props) {
  return (
    <NavControl
      size="small"
      variant="lineBlue"
      disabled={disabled}
      onClick={onClick}
    >
      <NavIcon icon="ic_basic_medium_chevron_right" $disabled={disabled} />
    </NavControl>
  )
}

export default LeftNavControl
