import { colors } from '@3o3/mystique-core'
import styled from '@emotion/styled'

interface Props {
  src: string
}

export default function ImagePreview({ src }: Props) {
  return (
    <StyledImagePreview src={src} onClick={() => window.open(src, '_blank')} />
  )
}

const StyledImagePreview = styled.img`
  height: 320px;
  border: 1px solid ${colors.light.scheme.$gray70};
  &:hover {
    cursor: pointer;
  }
`
