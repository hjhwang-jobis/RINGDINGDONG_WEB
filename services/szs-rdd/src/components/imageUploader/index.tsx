import styled from '@emotion/styled'
import React, { useCallback, useRef } from 'react'

import { FileByteSizeMessage } from '~/constants'
import { ImageUploaderConfig } from '~/types'
import { ImageDimensions, ImageRatioRange } from '~/types'

import HiddenFileInput from './HiddenFileInput'
import UploadButton from './UploadButton'

const getImageSizeMessage = (min: number, max: number, unit = '가로') => {
  if (min !== Infinity && max === Infinity)
    return `${unit} ${min}px부터 최대 사이즈 제한없음`
  if (min === Infinity && max === Infinity)
    return `${unit} 최대 사이즈 제한없음`
  if (max === min) return `${unit} ${max}px`

  return `${unit} ${min}px부터 ${max}px까지`
}
const getImageRatioMessage = (imageRatioRange: ImageRatioRange) =>
  `너비 비율은 ${imageRatioRange.min.width}:${imageRatioRange.min.height}부터 ${imageRatioRange.max.width}:${imageRatioRange.max.height}까지`

export const getLimitationGuide = (
  fileSize: number,
  imageDimensions: ImageDimensions,
  imageRatioRange?: ImageRatioRange
) => {
  const imageFileSizeMessage = `업로드 가능한 이미지의 크기는 ${FileByteSizeMessage[fileSize]} 이하`
  const imageWidthMessage = getImageSizeMessage(
    imageDimensions.min.width,
    imageDimensions.max.width,
    '가로'
  )
  const imageHeightMessage = getImageSizeMessage(
    imageDimensions.min.height,
    imageDimensions.max.height,
    '세로'
  )
  const imageRatioMessage = imageRatioRange
    ? getImageRatioMessage(imageRatioRange)
    : ''

  if (imageRatioMessage) {
    return `${imageFileSizeMessage}, ${imageWidthMessage}, ${imageHeightMessage}, ${imageRatioMessage}`
  }

  return `${imageFileSizeMessage}, ${imageWidthMessage}, ${imageHeightMessage}`
}

interface Props {
  imageUploaderConfig: ImageUploaderConfig
  onChange: (files: File[]) => void
  onError: (error: any) => void
  disabled?: boolean
}

export default function ({
  imageUploaderConfig,
  onChange,
  onError,
  disabled = false,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadButtonClick = useCallback(() => {
    if (!fileInputRef.current) return
    fileInputRef.current.click()
  }, [fileInputRef])

  const { fileTypes, fileByteSize, imageDimensions, imageRatioRange } =
    imageUploaderConfig

  return (
    <Container>
      <UploadButton
        onClickUploadBtn={handleUploadButtonClick}
        disabled={disabled}
      />
      <HiddenFileInput
        ref={fileInputRef}
        fileTypes={fileTypes}
        maxSize={fileByteSize}
        imageDimensions={imageDimensions}
        imageRatioRange={imageRatioRange}
        onChange={onChange}
        onError={onError}
        disabled={disabled}
      />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: column;
`
