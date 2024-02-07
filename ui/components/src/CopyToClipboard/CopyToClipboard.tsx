import styled from '@emotion/styled'
import { Icon, palette, Spacing } from '@fe3o3/ui'
import React, { useCallback } from 'react'

import { useCopyToClipboard } from '~/CopyToClipboard/useCopyToClipboard'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  text: string | undefined
  hideCopyIcon?: boolean
  inline?: boolean
  children: React.ReactNode
  iconColor?: string
  onTextCopy?: (result: boolean, text?: string) => void
  copyDisabled?: boolean
}

function CopyToClipboard({
  text,
  hideCopyIcon,
  inline = false,
  children,
  iconColor = palette.solid.blue,
  copyDisabled,
  onTextCopy,
  ...props
}: Props) {
  const copy = useCopyToClipboard()

  const handleClick = useCallback(() => {
    if (!text) {
      return
    }

    copy(text).then(({ result, text }) => onTextCopy?.(result, text))
  }, [copy, text, onTextCopy])

  return (
    <Container
      inline={inline}
      onClick={copyDisabled ? undefined : handleClick}
      copyDisabled={copyDisabled}
      {...props}
    >
      {children}
      {!copyDisabled && !hideCopyIcon && (
        <>
          <Spacing rem={0.25} inline />
          <StyledIcon icon="ic_basic_medium_copy" color={iconColor} />
        </>
      )}
    </Container>
  )
}

const Container = styled.div<{ inline: boolean; copyDisabled?: boolean }>`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  align-items: center;

  &:hover {
    cursor: ${({ copyDisabled }) => (copyDisabled ? 'auto' : 'pointer')};
  }
`

const StyledIcon = styled(Icon)`
  width: 0.875rem;
  height: 0.875rem;
`

export default CopyToClipboard
