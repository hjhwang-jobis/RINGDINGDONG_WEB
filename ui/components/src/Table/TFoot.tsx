import styled from '@emotion/styled'
import { palette } from '@fe3o3/ui'
import React from 'react'

type Props = React.HTMLAttributes<HTMLTableSectionElement>

function TFoot({ children, ...rest }: Props) {
  return <StyledTFoot {...rest}>{children}</StyledTFoot>
}

const StyledTFoot = styled.tfoot`
  background-color: ${palette.bg};
`

export default TFoot
