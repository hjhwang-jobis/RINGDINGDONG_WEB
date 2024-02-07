import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { palette, typoStyle } from '@fe3o3/ui'
import React from 'react'

export interface ChipOption<T = unknown> {
  value: T
  label: string
  desc?: string
}

export const ChipShape = {
  round: 'round',
  square: 'square',
} as const

export type ChipShape = (typeof ChipShape)[keyof typeof ChipShape]

export interface ChipProps {
  shape?: ChipShape
  bgColor?: string
  fontColor?: string
  borderColor?: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const Container = styled.span<Partial<ChipProps>>`
  ${typoStyle['BT3']};

  display: inline-flex;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor};
  padding: 0.5rem;
  margin-top: 0.5rem;

  ${({ borderColor }) =>
    borderColor &&
    css`
      border: 1px solid ${borderColor};
    `}

  ${({ shape }) =>
    shape === ChipShape.round &&
    css`
      border-radius: 1.25rem;
    `}

  ${({ shape }) =>
    shape === ChipShape.square &&
    css`
      border-radius: 0.375rem;
    `}
`

function Chip({
  shape = ChipShape.square,
  bgColor = palette.solid.blue,
  fontColor = palette.white,
  borderColor = palette.solid.blue,
  ...rest
}: ChipProps) {
  return (
    <Container
      shape={shape}
      bgColor={bgColor}
      fontColor={fontColor}
      borderColor={borderColor}
      {...rest}
    />
  )
}

export default React.memo(Chip)
