import { Spacing } from '@3o3/mystique-components'
import { Button } from '@fe3o3/ui'
import React, { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowTextArea from '~/components/FormRowTextArea'
import ImagePreview from '~/components/ImagePreview'
import KeyValueTable from '~/components/KeyValueTable'
import {
  CAROUSEL_MAX_CNT,
  CAROUSEL_MIN_CNT,
  FriendtalkTemplateType,
} from '~/friendtalk/constants'
import { ContentTypeCarouselItem } from '~/friendtalk/types'
import { formTypeMapNameTree, getEmptyCarouselItem } from '~/friendtalk/utils'
import { validators } from '~/utils'

import FormRowFriendtalkTemplateImageSearch from './FormRowFriendtalkTemplateImageSearch'
import FormTypeCarouselRowFriendtalkButton from './FormTypeCarouselRowFriendtalkButton'

interface Props {
  disabled?: boolean
}

export default function FormTypeCarouselRowItemList({
  disabled = false,
}: Props) {
  const { control, getValues, watch } = useFormContext()
  const name = formTypeMapNameTree.contentTypeCarousel.items.getName()
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  const isDisabledBtnCreate = fields.length >= CAROUSEL_MAX_CNT
  const isDisabledBtnDelete = fields.length <= CAROUSEL_MIN_CNT

  const items: ContentTypeCarouselItem[] = watch(name)
  const selectedImageIds: number[] = items
    .filter((v) => v.imageId !== undefined)
    .map((v) => v.imageId)

  return (
    <>
      {!disabled && (
        <>
          <Button
            size="small"
            variant="lineBlue"
            onClick={() => append(getEmptyCarouselItem())}
            disabled={isDisabledBtnCreate || disabled}
          >
            추가하기
          </Button>
          <Spacing px={10} />
        </>
      )}
      <>
        {fields.map((item, idx) => {
          const nameImageId =
            formTypeMapNameTree.contentTypeCarousel.items.imageId.getName(idx)
          const nameImageUrl =
            formTypeMapNameTree.contentTypeCarousel.items.imageUrl.getName(idx)
          const imageUrl = getValues(nameImageUrl)
          const humanReadableOrder = idx + 1

          return (
            <Fragment key={item.id}>
              {idx > 0 && <Spacing px={10} />}
              <KeyValueTable.Root>
                <KeyValueTable.KeyColumn>순서</KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>{`${humanReadableOrder}번째 캐러셀 아이템`}</KeyValueTable.ValueColumn>
                {!disabled && (
                  <>
                    <KeyValueTable.KeyColumn>삭제하기</KeyValueTable.KeyColumn>
                    <KeyValueTable.ValueColumn>
                      <Button
                        size="small"
                        variant="lineRed"
                        onClick={() => remove(idx)}
                        disabled={isDisabledBtnDelete || disabled}
                      >
                        {`${humanReadableOrder}번째 캐러셀 아이템 삭제하기`}
                      </Button>
                    </KeyValueTable.ValueColumn>
                  </>
                )}
                <KeyValueTable.KeyColumn>이미지</KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>
                  {disabled ? (
                    <ImagePreview src={imageUrl} />
                  ) : (
                    <FormRowFriendtalkTemplateImageSearch
                      name={nameImageId}
                      templateType={FriendtalkTemplateType.CAROUSEL}
                      imageUrl={imageUrl}
                      unselectableImageIds={selectedImageIds.map((v) => `${v}`)}
                      required
                    />
                  )}
                </KeyValueTable.ValueColumn>
                <KeyValueTable.KeyColumn>이미지 링크</KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>
                  <FormRowBasicInputField
                    name={formTypeMapNameTree.contentTypeCarousel.items.imageLink.getName(
                      idx
                    )}
                    validateInRules={(v) =>
                      validators.run([validators.validateInRulesFormatUrl(v)])
                    }
                    disabled={disabled}
                  />
                </KeyValueTable.ValueColumn>
                <KeyValueTable.KeyColumn>타이틀</KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>
                  <FormRowBasicInputField
                    name={formTypeMapNameTree.contentTypeCarousel.items.header.getName(
                      idx
                    )}
                    validateInRules={(v) =>
                      validators.run([
                        validators.validateInRulesStrMinMax(v, 5, 20),
                      ])
                    }
                    disabled={disabled}
                  />
                </KeyValueTable.ValueColumn>
                <KeyValueTable.KeyColumn>홍보문구</KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>
                  <FormRowTextArea
                    name={formTypeMapNameTree.contentTypeCarousel.items.message.getName(
                      idx
                    )}
                    min={5}
                    max={180}
                    disabled={disabled}
                  />
                </KeyValueTable.ValueColumn>
                <KeyValueTable.KeyColumn>버튼</KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>
                  <FormTypeCarouselRowFriendtalkButton
                    idx={idx}
                    disabled={disabled}
                  />
                </KeyValueTable.ValueColumn>
              </KeyValueTable.Root>
            </Fragment>
          )
        })}
      </>
    </>
  )
}
