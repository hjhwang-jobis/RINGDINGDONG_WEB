import { Icon } from '@3o3/ui'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { palette } from '@fe3o3/ui'
import React from 'react'

interface Props {
  direction: 'none' | 'asc' | 'desc'
}

function SortIcon({ direction }: Props) {
  return (
    <Container direction={direction}>
      <DirectionIcon icon="ic_basic_fill_chevron_up" />
      <DirectionIcon icon="ic_basic_fill_chevron_down" />
    </Container>
  )
}

const Container = styled.div<Pick<Props, 'direction'>>`
  position: relative;
  height: calc(0.75rem * 2);
  color: ${palette.gray[40]};

  svg {
    top: 0.375rem;
    position: absolute;

    :first-of-type {
      transform: translate(0, -0.25rem);

      ${({ direction }) =>
        direction === 'asc' &&
        css`
          color: ${palette.black};
        `}
    }

    :last-of-type {
      transform: translate(0, 0.25rem);

      ${({ direction }) =>
        direction === 'desc' &&
        css`
          color: ${palette.black};
        `}
    }
  }
`

const DirectionIcon = styled(Icon)`
  width: 0.75rem;
  height: 0.75rem;
  color: inherit;
`

export default SortIcon
