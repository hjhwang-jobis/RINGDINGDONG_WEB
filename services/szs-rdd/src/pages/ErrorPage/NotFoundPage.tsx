import { ColumnFlex, Flex, Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import styled from '@emotion/styled'
import { Button } from '@fe3o3/ui'
import React, { useCallback } from 'react'

import ErrorImage from '~/assets/asset/img_error_404.png'
import { RoutePath } from '~/routes'

function NotFoundPage() {
  const handleReset = useCallback(() => {
    location.pathname = RoutePath.Root
  }, [])

  return (
    <Container as="main" alignItems="center" justifyContent="center">
      <Section>
        <Image src={ErrorImage} alt="페이지를 찾지 못했어요" />
        <Spacing px={20} />
        <Content>
          <Text>요청하신 페이지를 찾지 못했어요</Text>
          <Spacing px={8} />
          <Text color={colors.light.scheme.$gray60}>
            처음으로 돌아가서 다시 시도해보세요.
          </Text>
        </Content>
        <Spacing px={12} />
        <Flex justifyContent="center">
          <Button size="medium" onClick={handleReset}>
            처음으로 돌아가기
          </Button>
        </Flex>
      </Section>
      <LargeSection>
        <Image src={ErrorImage} alt="페이지를 찾지 못했어요" />
        <Spacing px={20} />
        <Content>
          <Text>요청하신 페이지를 찾지 못했어요</Text>
          <Spacing px={8} />
          <Text color={colors.light.scheme.$gray60}>
            처음으로 돌아가서 다시 시도해보세요.
          </Text>
        </Content>
        <Spacing px={12} />
        <Flex justifyContent="center">
          <Button onClick={handleReset}>처음으로 돌아가기</Button>
        </Flex>
      </LargeSection>
    </Container>
  )
}

const Container = styled(ColumnFlex)`
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
  margin: 0 auto;
  box-sizing: border-box;
`

const Section = styled.section`
  display: none;

  @media (max-width: 1920px) {
    display: block;

    & > img {
      max-width: 15rem;
    }
  }
`

const LargeSection = styled.section`
  display: none;

  @media (min-width: 1921px) {
    display: block;

    & > img {
      max-width: 27.875rem;
    }
  }
`

const Image = styled.img`
  width: 100%;
`

const Content = styled.section`
  padding: 1rem 1.5rem;
`

export default NotFoundPage
