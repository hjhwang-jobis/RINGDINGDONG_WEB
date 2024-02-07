import styled from '@emotion/styled'
import React from 'react'

type Props = React.HTMLAttributes<HTMLTableRowElement>

function Tr({ children, ...rest }: Props) {
  return <StyledTr {...rest}>{children}</StyledTr>
}

const StyledTr = styled.tr`
  background-color: inherit;
`

export default Tr
