import styled from '@emotion/styled'
import { palette } from '@fe3o3/ui'
import React from 'react'

type Props = React.HTMLAttributes<HTMLTableSectionElement>

function TBody({ children, ...rest }: Props) {
  return <StyledTBody {...rest}>{children}</StyledTBody>
}

const StyledTBody = styled.tbody`
  background-color: ${palette.white};
`

export default TBody
