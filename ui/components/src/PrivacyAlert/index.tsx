import { Flex } from '@3o3/ui'
import styled from '@emotion/styled'
import { Icon, Info, palette, shadow, Typo } from '@fe3o3/ui'
import React from 'react'

interface Props {
  onCloseClick?: () => void
}

export function PrivacyAlert({ onCloseClick }: Props) {
  return (
    <StyledInfo type="error">
      <Container>
        <Icon icon="ic_info_fill_information" color={palette.dark.red} />
        <Content>
          <Typo type="S2" color={palette.dark.red}>
            고객 정보 열람 이력이 기록되고 있습니다. 업무 외 목적으로 열람/이용
            할 경우 법적 처벌을 받을 수 있습니다.
          </Typo>
        </Content>
        <CloseIcon
          icon="ic_basic_medium_x"
          color={palette.gray[80]}
          onClick={onCloseClick}
        />
      </Container>
    </StyledInfo>
  )
}

const StyledInfo = styled(Info)`
  box-shadow: ${shadow[10]};
`

const Container = styled(Flex)`
  width: 100%;

  & > svg {
    flex-shrink: 0;
  }
`

const Content = styled.div`
  padding: 0 0.5rem;
  flex-grow: 1;
`

const CloseIcon = styled(Icon)`
  cursor: pointer;
`
