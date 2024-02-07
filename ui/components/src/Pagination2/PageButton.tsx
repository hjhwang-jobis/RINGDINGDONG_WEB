import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { palette, typoStyle } from '@fe3o3/ui'
import React, { useCallback } from 'react'

interface Props {
  page: number
  active: boolean
  onClick: (page: number) => void
}

function PageButton({ page, active, onClick }: Props) {
  const handleClick = useCallback(() => {
    if (active) return

    onClick(page)
  }, [active, onClick, page])

  return (
    <Button active={active} onClick={handleClick}>
      {page + 1}
    </Button>
  )
}

const Button = styled.button<Pick<Props, 'active'>>`
  ${typoStyle['BT3']};

  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.375rem;
  height: 2rem;
  box-sizing: border-box;
  border: none;
  color: ${palette.gray[50]};
  background-color: ${palette.bg};
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  cursor: pointer;

  ${({ active }) =>
    active
      ? css`
          background-color: #dedede;
        `
      : css`
          &:hover {
            background-color: #ededed;
          }
        `}
`

export default PageButton
