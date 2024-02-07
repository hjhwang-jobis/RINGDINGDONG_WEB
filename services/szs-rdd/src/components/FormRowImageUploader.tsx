import { Flex, Icon, Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import RemovableThumbnail from '~/components/RemovableThumbnail'
import { ImageUploaderConfig } from '~/types'
import { FileDescription } from '~/types'

import ImageUploader, { getLimitationGuide } from './imageUploader'

interface Props {
  imageUploaderName: string
  thumbnailListName: string
  imageUploaderConfig: ImageUploaderConfig
  onChange?: (fileDescriptoin: FileDescription) => void
  onDelete: (index: number) => void
  disabled?: boolean
}

export default function FormRowImageUploader({
  imageUploaderName,
  thumbnailListName,
  imageUploaderConfig,
  onChange,
  onDelete,
  disabled = false,
}: Props) {
  const { control } = useFormContext()
  const { fields, remove } = useFieldArray({
    control,
    name: thumbnailListName,
  })

  const [
    사용자가_업로드한_이미지_규칙위반목록,
    사용자가_업로드한_이미지_규칙위반목록_설정하기,
  ] = useState<string[]>([])

  return (
    <>
      <Flex justifyContent="start">
        <Controller
          name={imageUploaderName}
          control={control}
          rules={{
            required: '이미지가 등록되어 있지 않습니다.',
          }}
          render={({ field, fieldState: { invalid } }) => {
            return (
              <>
                <Flex alignItems="center" justifyContent="start">
                  <ImageUploader
                    imageUploaderConfig={imageUploaderConfig}
                    onChange={(files: File[]) => {
                      if (invalid) return

                      field.onChange(files[0])

                      onChange?.({
                        name: files[0].name,
                        url: URL.createObjectURL(files[0]),
                      })

                      사용자가_업로드한_이미지_규칙위반목록_설정하기([])
                    }}
                    onError={(errors: string[]) => {
                      if (errors.length > 0) {
                        사용자가_업로드한_이미지_규칙위반목록_설정하기(errors)
                      }
                    }}
                    disabled={disabled || !!field.value}
                  />
                </Flex>
              </>
            )
          }}
        />
        {fields.map((field, index) => {
          return (
            <Controller
              key={field.id}
              name={`${thumbnailListName}.${index}`}
              control={control}
              render={({ field: { value } }) => {
                return (
                  <ThumbnailContainer>
                    <RemovableThumbnail
                      fileDescription={value}
                      onDelete={() => {
                        remove(index)
                        onDelete(index)
                      }}
                      onClick={() => window.open(value.url, '_blank')}
                      disabled={disabled}
                    />
                  </ThumbnailContainer>
                )
              }}
            />
          )
        })}
      </Flex>
      <Spacing px={10} />
      <Flex alignItems="center" justifyContent="start">
        <Icon
          color={colors.light.scheme.$gray40}
          icon="ic_basic_fill_info"
          size={20}
        />
        <Text
          typography="body14"
          weight="medium"
          color={colors.light.scheme.$gray40}
        >
          {getLimitationGuide(
            imageUploaderConfig.fileByteSize,
            imageUploaderConfig.imageDimensions
          )}
        </Text>
      </Flex>
      {사용자가_업로드한_이미지_규칙위반목록 &&
        사용자가_업로드한_이미지_규칙위반목록.map((v, idx) => (
          <div key={idx}>
            <Text
              typography="body14"
              weight="medium"
              color={colors.light.scheme.$red50}
            >
              {v}
            </Text>
          </div>
        ))}
    </>
  )
}

const ThumbnailContainer = styled.div`
  padding-left: 10px;
`
