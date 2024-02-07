import styled from '@emotion/styled'
import React from 'react'

export const Size = {
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
} as const
const SizeMap = {
  [Size.SMALL]: '32px',
  [Size.MEDIUM]: '64px',
  [Size.LARGE]: '128px',
}

export type Size = (typeof Size)[keyof typeof Size]

interface Props {
  imgUrl: string | null
  size: Size
}

const Thumbnail = ({ imgUrl, size = Size.MEDIUM }: Props) => {
  const px = SizeMap[size]

  if (!imgUrl) {
    // TODO fallback 이미지 또는 대체 이미지로 처리해야 함
    return <div>이미지 없음</div>
  }

  return (
    <Img src={imgUrl} px={px} onClick={() => window.open(imgUrl, '_blank')} />
  )
}

export default Thumbnail

const Img = styled.div<{ src: string; px: string }>`
  border-radius: 4px;
  width: ${({ px }) => px};
  height: ${({ px }) => px};
  object-fit: cover;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)),
    url(${({ src }) => src}), #ffffff;
  background-blend-mode: normal;
  background-size: cover;
  &:hover {
    cursor: pointer;
  }
`
