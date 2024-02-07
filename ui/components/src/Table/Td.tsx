import styled from '@emotion/styled'
import { palette, typoStyle } from '@fe3o3/ui'
import React, { PropsWithChildren, TdHTMLAttributes } from 'react'

import Cell, { CellProps } from '~/Table/Cell'

type Props = Omit<CellProps, 'as'> & TdHTMLAttributes<HTMLTableCellElement>

function Td(props: PropsWithChildren<Props>) {
  return <StyledCell {...props} as="td" />
}

const StyledCell = styled(Cell)<Pick<Props, 'color'>>`
  ${typoStyle['LB3']};

  background-color: inherit;
  color: ${({ color }) => color || palette.gray[70]};
`

export default Td
