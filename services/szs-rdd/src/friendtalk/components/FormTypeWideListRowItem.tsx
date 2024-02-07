import React, { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import ImagePreview from '~/components/ImagePreview'
import KeyValueTable from '~/components/KeyValueTable'
import { FriendtalkTemplateType } from '~/friendtalk/constants'
import { formTypeMapNameTree } from '~/friendtalk/utils'
import { validators } from '~/utils'

import FormRowFriendtalkTemplateImageSearch from './FormRowFriendtalkTemplateImageSearch'

interface Props {
  idx: number
  disabled?: boolean
  imageIds: number[]
}

export default function FormTypeWideListRowItem({
  idx,
  disabled = false,
  imageIds,
}: Props) {
  const { watch } = useFormContext()
  const validateUrlInRules = useCallback((v) => {
    return validators.isUrl(v) || '유효한 url 형식으로 입력해주세요'
  }, [])

  const nameImageUrl =
    formTypeMapNameTree.contentTypeWideList.items.imageUrl.getName(idx)
  const imageUrl = watch(nameImageUrl)

  return (
    <>
      <KeyValueTable.Root>
        <KeyValueTable.KeyColumn>타이틀</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowBasicInputField
            name={formTypeMapNameTree.contentTypeWideList.items.title.getName(
              idx
            )}
            placeholder="타이틀을 입력해주세요"
            validateInRules={(v) =>
              validators.run([validators.validateInRulesStrMinMax(v, 5, 25)])
            }
            disabled={disabled}
          />
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>소재영역</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {disabled ? (
            <ImagePreview src={imageUrl} />
          ) : (
            <FormRowFriendtalkTemplateImageSearch
              name={formTypeMapNameTree.contentTypeWideList.items.imageId.getName(
                idx
              )}
              imageUrl={imageUrl}
              templateType={FriendtalkTemplateType.WIDE_LIST}
              unselectableImageIds={imageIds.map((v) => `${v}`)}
              required
            />
          )}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>Mobile</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowBasicInputField
            name={formTypeMapNameTree.contentTypeWideList.items.linkMobile.getName(
              idx
            )}
            placeholder="쿠폰 모바일 웹 url을 입력해주세요"
            validateInRules={validateUrlInRules}
            disabled={disabled}
          />
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>PC</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowBasicInputField
            name={formTypeMapNameTree.contentTypeWideList.items.linkPc.getName(
              idx
            )}
            placeholder="쿠폰 PC 웹 url을 입력해주세요"
            validateInRules={validateUrlInRules}
            disabled={disabled}
          />
        </KeyValueTable.ValueColumn>
      </KeyValueTable.Root>
    </>
  )
}
