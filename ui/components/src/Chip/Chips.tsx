import styled from '@emotion/styled'
import React from 'react'

import { ChipOption } from '~/Chip/Chip'

export interface ChipsProps<T> {
  chips: ChipOption<T>[]
  gap?: string
  padding?: string
  style?: React.CSSProperties
  children?: (option: ChipOption<T>, index: number) => React.ReactNode
}

const DEFAULT_GAP = '0.5rem'

const Container = styled.div<Pick<ChipsProps<unknown>, 'gap'>>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: -0.5rem;
  *:not(:last-child) {
    margin-right: ${({ gap }) => gap};
  }
`

function Chips<T>(props: ChipsProps<T>) {
  return (
    <Container gap={props.gap || DEFAULT_GAP} style={props.style}>
      {props.children && props.chips.map(props.children)}
    </Container>
  )
}

export default Chips
