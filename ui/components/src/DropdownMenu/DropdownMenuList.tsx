import styled from '@emotion/styled'
import { palette, shadow } from '@fe3o3/ui'
import React, { forwardRef, memo } from 'react'

type Props = React.HTMLAttributes<HTMLUListElement>

function DropdownMenuList(props: Props, ref: React.Ref<HTMLUListElement>) {
  return <Container ref={ref} {...props} />
}

const Container = styled.ul`
  background-color: ${palette.white};
  box-shadow: ${shadow[10]};
  border-radius: 0.5rem;
`

export default memo(forwardRef(DropdownMenuList))
