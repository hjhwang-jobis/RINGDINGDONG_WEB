import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

export type TextAlign =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'match-parent'

export interface CellProps extends HTMLAttributes<HTMLTableCellElement> {
  as: 'th' | 'td'
  textAlign?: TextAlign
}

type CellStyleOption = Pick<CellProps, 'textAlign'>

function Cell({
  as,
  textAlign = 'center',
  ...rest
}: PropsWithChildren<CellProps>) {
  if (as === 'th') return <Th textAlign={textAlign} {...rest} />
  if (as === 'td') return <Td textAlign={textAlign} {...rest} />

  return null
}

const style = ({ textAlign }: CellStyleOption) => css`
  padding: 0.75rem;
  text-align: ${textAlign};
  vertical-align: middle;
  border-top: 1px solid #dfe2e6;
`

const Th = styled.th<CellStyleOption>`
  ${(option) => style(option)};
`

const Td = styled.td<CellStyleOption>`
  ${(option) => style(option)};
`

export default Cell
