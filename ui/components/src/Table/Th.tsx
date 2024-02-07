import styled from '@emotion/styled'
import { palette, typoStyle } from '@fe3o3/ui'
import React, { PropsWithChildren, ThHTMLAttributes } from 'react'

import Cell, { CellProps } from '~/Table/Cell'

type Props = Omit<CellProps, 'as'> & ThHTMLAttributes<HTMLTableCellElement>

function Th(props: PropsWithChildren<Props>) {
  return <StyledCell {...props} as="th" />
}

const StyledCell = styled(Cell)`
  ${typoStyle['BT3']};

  background-color: inherit;
  color: ${({ color }) => color || palette.gray[80]};
`

export default Th
