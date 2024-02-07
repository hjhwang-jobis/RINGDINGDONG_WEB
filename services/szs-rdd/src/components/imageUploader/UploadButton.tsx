import { Flex, Icon, Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

interface Props {
  onClickUploadBtn: () => void
  disabled?: boolean
}

const UploadButton = ({ onClickUploadBtn, disabled = false }: Props) => {
  return (
    <Container
      disabled={disabled}
      onClick={() => {
        if (disabled) return
        onClickUploadBtn()
      }}
    >
      <InnerContainer>
        <Icon
          icon="ic_basic_outline_plus"
          color={colors.light.scheme.$gray40}
        />
        <Spacing px={4} />
        <Text
          typography="subtitle14"
          weight="medium"
          color={colors.light.scheme.$gray40}
        >
          이미지 업로드
        </Text>
      </InnerContainer>
    </Container>
  )
}

export default UploadButton

const Container = styled(Flex.Center)<{ disabled?: boolean }>`
  border-radius: 8px;
  border: 1px dashed ${colors.light.scheme.$gray30};
  width: 103px;
  height: 103px;
  ${({ disabled = false }) =>
    disabled
      ? css`
          opacity: 0.3;
          cursor: not-allowed;
          background-color: ${colors.light.scheme.$gray10};
        `
      : css`
          cursor: pointer;
          background-color: ${colors.light.scheme.$gray5};
        `}
  user-select: none;
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
