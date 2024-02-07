import styled from '@emotion/styled'
import { palette } from '@fe3o3/ui'
import React from 'react'

type Props = React.HTMLAttributes<HTMLTableSectionElement>

function THead({ children, ...rest }: Props) {
  return <StyledTHead {...rest}>{children}</StyledTHead>
}

const StyledTHead = styled.thead`
  background-color: ${palette.bg};
`

export default THead
