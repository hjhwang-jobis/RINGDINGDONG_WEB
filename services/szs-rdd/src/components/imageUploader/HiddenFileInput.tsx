import styled from '@emotion/styled'
import React, { forwardRef, useCallback, useRef } from 'react'

import { FileByteSize, FileType } from '~/constants'
import { getImageRatio } from '~/friendtalk/utils'
import { ImageDimensions, ImageRatioRange } from '~/types'

const InvisibleInput = styled.input`
  display: none;
`

interface Props {
  name?: string | undefined
  fileTypes: FileType[]
  maxSize: number
  imageDimensions: ImageDimensions
  imageRatioRange?: ImageRatioRange
  onChange: (files: File[]) => void
  onError: (error: unknown) => void
  disabled?: boolean
}

const HiddenFileInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      name = '',
      fileTypes,
      maxSize,
      imageDimensions,
      imageRatioRange,
      onChange,
      onError,
      disabled = false,
    }: Props,
    ref
  ) => {
    const refErrors = useRef<string[]>([])
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileTypeStrList = fileTypes.map((v) => v as string)
        const files = e.target.files

        const throwError = (errors: string[]) => {
          onError([...errors])
          e.target.value = ''
          refErrors.current = []
        }

        const handleFile = (
          file: File,
          callback: (errors: string[]) => void
        ) => {
          const errors: string[] = []

          // 1. 파일 타입 검사
          const hasFileTypeNotAllowed = !fileTypeStrList.includes(
            `.${file.name.split('.').pop()?.toLowerCase()}`
          )
          if (hasFileTypeNotAllowed) {
            errors.push(
              `${fileTypeStrList.join(', ')} 형식의 파일만 업로드 가능합니다`
            )
          }

          // 2. 파일 크기 검사
          if (file.size > maxSize) {
            const 파일크기최소단위 =
              maxSize < FileByteSize._1MB
                ? FileByteSize._1KB
                : FileByteSize._1MB
            const 업로드한파일크기 = Math.floor(file.size / 파일크기최소단위)
            const 최대업로드가능파일크기 = Math.floor(
              maxSize / 파일크기최소단위
            )
            const 파일크기표시단위 = maxSize < FileByteSize._1MB ? 'KB' : 'MB'
            errors.push(
              `파일의 크기가 ${업로드한파일크기}${파일크기표시단위} 입니다. 크기가 ${최대업로드가능파일크기}${파일크기표시단위} 이상인 사진은 첨부할 수 없습니다`
            )
          }

          // 3. 파일 가로, 세로 검사
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function (this, eventFromReader) {
            const img = new Image()
            if (
              !eventFromReader ||
              !eventFromReader.target ||
              typeof eventFromReader.target.result !== 'string'
            ) {
              errors.push('이미지 가로 또는 세로 확인이 실패했습니다.')
              callback(errors)

              return
            }
            img.src = eventFromReader.target.result
            img.onload = function () {
              // NOTE: 이미지 최소, 최대 가로, 세로 검사
              if (
                imageDimensions.min.width !== Infinity &&
                imageDimensions.min.width === imageDimensions.max.width &&
                imageDimensions.min.width !== img.width
              ) {
                errors.push(
                  `이미지 가로가 ${img.width}px 입니다. 정확히 가로 ${imageDimensions.min.width}px 이어야 합니다.`
                )
              } else if (imageDimensions.min.width !== Infinity) {
                if (img.width < imageDimensions.min.width) {
                  errors.push(
                    `이미지 가로가 ${img.width}px 입니다. 최소 가로 ${imageDimensions.min.width}px 이상이어야 합니다.`
                  )
                }
                if (imageDimensions.max.width < img.width) {
                  errors.push(
                    `이미지 가로가 ${img.width}px 입니다. 최대 가로 ${imageDimensions.max.width}px 이하여야 합니다.`
                  )
                }
              }

              if (
                imageDimensions.min.height !== Infinity &&
                imageDimensions.min.height === imageDimensions.max.height &&
                imageDimensions.min.height !== img.height
              ) {
                errors.push(
                  `이미지 세로가 ${img.height}px 입니다. 정확히 세로 ${imageDimensions.min.height}px 이어야 합니다.`
                )
              } else if (imageDimensions.min.height !== Infinity) {
                if (img.height < imageDimensions.min.height) {
                  errors.push(
                    `이미지 세로가 ${img.height}px 입니다. 최소 세로 ${imageDimensions.min.height}px 이상이어야 합니다.`
                  )
                }
                if (imageDimensions.max.height < img.height) {
                  errors.push(
                    `이미지 세로가 ${img.height}px 입니다. 최대 세로 ${imageDimensions.max.height}px 이하여야 합니다.`
                  )
                }
              }
              // NOTE: 이미지 최소, 최대 비율검사
              if (imageRatioRange) {
                const imageRatio = getImageRatio({
                  width: img.width,
                  height: img.height,
                })
                const maxImageRatio = getImageRatio({
                  width: imageRatioRange.max.width,
                  height: imageRatioRange.max.height,
                })
                const minImageRatio = getImageRatio({
                  width: imageRatioRange.min.width,
                  height: imageRatioRange.min.height,
                })
                const 최대_최소_이미지_비율같음_여부 =
                  minImageRatio === maxImageRatio
                if (
                  최대_최소_이미지_비율같음_여부 &&
                  imageRatio !== maxImageRatio
                ) {
                  errors.push(
                    `이미지 비율 ${imageRatioRange.max.width}:${imageRatioRange.max.height}(가로:세로)여야 합니다.`
                  )
                }
                const 최대_이미지_비율_이하_여부 = imageRatio <= maxImageRatio
                if (
                  !최대_최소_이미지_비율같음_여부 &&
                  !최대_이미지_비율_이하_여부
                ) {
                  errors.push(
                    `최대 이미지 비율 ${imageRatioRange.max.width}:${imageRatioRange.max.height}(가로:세로) 이하여야 합니다.`
                  )
                }

                const 최소_이미지_비율_이상_여부 = minImageRatio <= imageRatio
                if (
                  !최대_최소_이미지_비율같음_여부 &&
                  !최소_이미지_비율_이상_여부
                ) {
                  errors.push(
                    `최소 이미지 비율 ${imageRatioRange.min.width}:${imageRatioRange.min.height}(가로:세로) 이상이어야 합니다.`
                  )
                }
              }

              callback(errors)
            }
          }
        }

        if (!files) {
          throwError(['업로드할 이미지 파일이 유효하지 않습니다.'])

          return
        }

        const fileArray = Array.from(files)
        fileArray.forEach((file) => {
          handleFile(file, (errors: string[]) => {
            if (errors.length > 0) {
              throwError(errors)

              return
            }

            onChange(fileArray)
            e.target.value = ''
          })
        })
      },
      [onChange, onError, fileTypes, maxSize, imageDimensions, imageRatioRange]
    )

    return (
      <InvisibleInput
        ref={ref}
        type={'file'}
        onChange={handleChange}
        accept={fileTypes.join(', ')}
        name={name}
        disabled={disabled}
      />
    )
  }
)

export default HiddenFileInput
