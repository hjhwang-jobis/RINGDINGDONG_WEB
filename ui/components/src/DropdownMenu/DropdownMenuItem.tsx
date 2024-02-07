import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { memo, useCallback } from 'react'

import { DropdownMenuContext } from './DropdownMenuProvider'

export interface DropdownMenuItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  disabled?: boolean
}

function DropdownMenuItem({
  disabled,
  onClick,
  children,
  ...rest
}: DropdownMenuItemProps) {
  const handleClick = useCallback(
    (onClose: () => void) => (e: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) return

      onClick?.(e)
      onClose()
    },
    [disabled, onClick]
  )

  return (
    <DropdownMenuContext.Consumer>
      {({ onClose }) => (
        <Item {...rest} disabled={disabled} onClick={handleClick(onClose)}>
          {children}
        </Item>
      )}
    </DropdownMenuContext.Consumer>
  )
}

const Item = styled.li<Pick<DropdownMenuItemProps, 'disabled'>>`
  padding: 1rem 1.75rem;

  ${({ disabled }) =>
    disabled
      ? css`
          cursor: not-allowed;
          opacity: 0.3;
        `
      : css`
          &:hover {
            cursor: pointer;
            opacity: 0.5;
          }
        `}
`

export default memo(DropdownMenuItem)
