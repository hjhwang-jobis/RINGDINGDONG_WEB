import { Flex, Icon, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'

export default {
  Root: ({ children }: PropsWithChildren<{}>) => {
    return <StyledGridContainer>{children}</StyledGridContainer>
  },
  Image: ({
    id,
    src,
    onClick,
    selected,
    disabled = false,
  }: {
    id: string
    src: string
    onClick: (id: string) => void
    selected: boolean
    disabled?: boolean
  }) => {
    return (
      <StyledImageContainer>
        <StyledImageDescText typography="button10" weight="medium">
          {id}
        </StyledImageDescText>
        {selected && (
          <StyledIconChecked
            icon="ic_basic_fill_check"
            color={colors.light.scheme.$white}
          />
        )}
        {disabled && (
          <StyledDisabledTextBox
            justifyContent="center"
            alignItems="center"
            fullWidth
          >
            <Text
              typography="heading24"
              weight="bold"
              color={`${colors.light.scheme.$red100}`}
            >
              선택 불가
            </Text>
          </StyledDisabledTextBox>
        )}
        <StyledImage
          src={src}
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              onClick(id)
            }
          }}
        />
      </StyledImageContainer>
    )
  },
}

const StyledGridContainer = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

const StyledImageContainer = styled.div`
  position: relative;
`

const StyledImageDescText = styled(Text)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  background: ${colors.light.scheme.$gray70};
  color: ${colors.light.scheme.$white};
`

const StyledDisabledTextBox = styled(Flex)`
  position: absolute;
  height: 100%;
  background: ${`${colors.light.scheme.$gray70}80`};
`

const StyledIconChecked = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
  background: ${colors.light.scheme.$green60};
`

const StyledImage = styled.img<{ disabled?: boolean }>`
  border-radius: 4px;
  width: 180px;
  &:hover {
    border: ${({ disabled }) => (disabled ? 'none' : '5px dashed red')};
  }
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`
