import { Icon, Tooltip } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import { FileDescription } from '~/types'

interface Props {
  onDelete: () => void
  onClick: () => void
  fileDescription: FileDescription
  disabled?: boolean
}

const RemovableThumbnail = ({
  onDelete,
  onClick,
  fileDescription,
  disabled = false,
}: Props) => {
  return (
    <Tooltip.Root
      offset={10}
      placement="top"
      trigger={['hover']}
      useFlip
      useShift
    >
      <Tooltip.Trigger>
        <Container onClick={onClick}>
          <Icon
            icon="ic_basic_fill_x_circle"
            size={24}
            onClick={(e) => {
              e.stopPropagation()
              if (disabled) return

              onDelete()
            }}
            opacity={0.8}
            css={css`
              position: absolute;
              top: 4px;
              right: 4px;
            `}
          />
          <Img src={fileDescription.url} />
        </Container>
      </Tooltip.Trigger>
      <Tooltip.Contents>{fileDescription.name}</Tooltip.Contents>
    </Tooltip.Root>
  )
}

export default RemovableThumbnail

const Img = styled.div<{ src: string }>`
  border-radius: 4px;
  width: 102px;
  height: 102px;
  object-fit: cover;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)),
    url(${({ src }) => src}), ${colors.light.scheme.$white};
  background-blend-mode: normal;
  background-size: cover;
`

const Container = styled.div`
  position: relative;
  border-radius: 8px;
  width: 103px;
  height: 103px;
  object-fit: cover;
  max-width: 100%;
  overflow: hidden;
`
