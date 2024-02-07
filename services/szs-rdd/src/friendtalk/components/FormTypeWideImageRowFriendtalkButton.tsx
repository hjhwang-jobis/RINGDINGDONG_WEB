import { Spacing } from '@3o3/mystique-components'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowCheckbox from '~/components/FormRowCheckbox'
import FormRowToggle from '~/components/FormRowToggle'
import KeyValueTable from '~/components/KeyValueTable'
import { FriendtalkButtonTarget } from '~/friendtalk/constants'
import { formTypeMapNameTree } from '~/friendtalk/utils'
import { validators } from '~/utils'

interface Props {
  idx: number
  disabled?: boolean
  onBlurButtonName?: () => void
}

export default function FormTypeWideImageRowFriendtalkButton({
  idx,
  disabled = false,
  onBlurButtonName,
}: Props) {
  const { watch, setValue } = useFormContext()

  const isShow = watch(
    formTypeMapNameTree.contentTypeWideImage.buttons.isShow.getName(idx)
  )

  const isOutlink = watch(
    formTypeMapNameTree.contentTypeWideImage.buttons.isOutlink.getName(idx)
  )

  useEffect(() => {
    setValue(
      formTypeMapNameTree.contentTypeWideImage.buttons.target.getName(idx),
      isOutlink ? FriendtalkButtonTarget.OUT : FriendtalkButtonTarget.IN
    )
  }, [isOutlink, setValue, idx])

  return (
    <>
      <FormRowToggle
        name={formTypeMapNameTree.contentTypeWideImage.buttons.isShow.getName(
          idx
        )}
        labelOn="버튼을 사용합니다"
        labelOff="버튼을 사용하지 않습니다"
        disabled={disabled}
      />
      <Spacing px={16} />
      <KeyValueTable.Root>
        <KeyValueTable.KeyColumn>이름</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowBasicInputField
            name={formTypeMapNameTree.contentTypeWideImage.buttons.name.getName(
              idx
            )}
            placeholder="버튼 이름을 입력해주세요"
            validateInRules={(v) =>
              validators.run([validators.validateInRulesStrMinMax(v, 2, 14)])
            }
            disabled={!isShow || disabled}
            onBlur={() => onBlurButtonName?.()}
          />
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>PC 웹 url</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowBasicInputField
            name={formTypeMapNameTree.contentTypeWideImage.buttons.linkPc.getName(
              idx
            )}
            placeholder="PC웹 url을 입력해주세요"
            validateInRules={(v) =>
              validators.run([validators.validateInRulesFormatUrl(v)])
            }
            disabled={!isShow || disabled}
          />
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>모바일 웹 url</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowBasicInputField
            name={formTypeMapNameTree.contentTypeWideImage.buttons.linkMobile.getName(
              idx
            )}
            placeholder="모바일웹 url을 입력해주세요"
            validateInRules={(v) =>
              validators.run([validators.validateInRulesFormatUrl(v)])
            }
            disabled={!isShow || disabled}
          />
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>outlink</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowCheckbox
            name={formTypeMapNameTree.contentTypeWideImage.buttons.isOutlink.getName(
              idx
            )}
            label="Outlink 사용 여부"
            disabled={!isShow || disabled}
          />
        </KeyValueTable.ValueColumn>
      </KeyValueTable.Root>
    </>
  )
}
