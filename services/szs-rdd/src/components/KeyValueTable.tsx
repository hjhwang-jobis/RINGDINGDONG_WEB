import { colors } from '@3o3/mystique-core'
import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'

export default {
  Root: ({ children }: PropsWithChildren<{}>) => {
    return <StyledGridContainer>{children}</StyledGridContainer>
  },
  KeyColumn: ({ children }: PropsWithChildren<{}>) => {
    return <StyledGridLabel>{children}</StyledGridLabel>
  },
  ValueColumn: ({ children }: PropsWithChildren<{}>) => {
    return <StyledGridItem>{children}</StyledGridItem>
  },
}

const background = colors.light.scheme.$gray10
const borderColor = colors.light.scheme.$gray20

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  margin-top: 20px;
`
const StyledGridLabel = styled.div`
  padding: 10px;
  background: ${background};
  border-right: solid 1px ${borderColor};
  border-bottom: solid 1px ${borderColor};
  &:nth-of-type(1) {
    border-top-left-radius: 8px;
  }
  &:nth-of-type(odd) {
    border-top: solid 1px ${borderColor};
    border-left: solid 1px ${borderColor};
    border-bottom: unset;
  }
  &:nth-last-of-type(-n + 2) {
    border-bottom: solid 1px ${borderColor};
  }
  &:nth-last-of-type(2) {
    border-bottom-left-radius: 8px;
  }
`
const StyledGridItem = styled.div`
  padding: 10px;
  background: ${colors.light.scheme.$white};
  border-right: solid 1px ${borderColor};
  border-bottom: solid 1px ${borderColor};
  &:nth-of-type(2) {
    border-top-right-radius: 8px;
  }
  &:nth-of-type(even) {
    border-top: solid 1px ${borderColor};
    border-bottom: unset;
  }
  &:nth-last-of-type(-n + 2) {
    border-bottom: solid 1px ${borderColor};
  }
  &:nth-last-of-type(1) {
    border-bottom-right-radius: 8px;
  }
`
