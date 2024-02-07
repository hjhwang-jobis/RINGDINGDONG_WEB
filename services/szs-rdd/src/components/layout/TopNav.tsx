import { Flex } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Button } from '@fe3o3/ui'
import { useNavigate } from 'react-router-dom'

import { RoutePath } from '~/routes'

function TopNav() {
  const navigate = useNavigate()

  return (
    <Container>
      <Flex
        justifyContent="right"
        alignItems="center"
        css={css`
          height: 100%;
        `}
      >
        <Button
          variant="lightGray"
          size="small"
          css={css`
            margin-right: 15px;
          `}
          onClick={() => {
            navigate(RoutePath.Logout)
          }}
        >
          로그아웃
        </Button>
      </Flex>
    </Container>
  )
}

export default TopNav

const Container = styled.div`
  width: 100vw;
  height: 50px;
  background: ${colors.light.scheme.$blue90};
`
