import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowCheckbox from '~/components/FormRowCheckbox'
import KeyValueTable from '~/components/KeyValueTable'
import { FriendtalkButtonTarget } from '~/friendtalk/constants'
import { formTypeMapNameTree } from '~/friendtalk/utils'
import { validators } from '~/utils'

interface Props {
  idx: number
  disabled?: boolean
}

export default function FormTypeWideListRowFriendtalkButton({
  idx,
  disabled = false,
}: Props) {
  const { watch, setValue } = useFormContext()

  const isOutlink = watch(
    formTypeMapNameTree.contentTypeWideList.buttons.isOutlink.getName(idx)
  )

  useEffect(() => {
    setValue(
      formTypeMapNameTree.contentTypeWideList.buttons.target.getName(idx),
      isOutlink ? FriendtalkButtonTarget.OUT : FriendtalkButtonTarget.IN
    )
  }, [isOutlink, setValue, idx])

  return (
    <KeyValueTable.Root>
      {/* TODO (조태호님) 이준호님의 기획 내용 확인으로는 고정타입을 사용한다고 확인했습니다. 어떤 타입값이 들어가야 할지 확인 부탁드리겠습니다. */}
      <KeyValueTable.KeyColumn>이름</KeyValueTable.KeyColumn>
      <KeyValueTable.ValueColumn>
        <FormRowBasicInputField
          name={formTypeMapNameTree.contentTypeWideList.buttons.name.getName(
            idx
          )}
          placeholder="버튼 이름을 입력해주세요"
          validateInRules={(v) =>
            validators.run([validators.validateInRulesStrMinMax(v, 5, 10)])
          }
          disabled={disabled}
        />
      </KeyValueTable.ValueColumn>
      <KeyValueTable.KeyColumn>PC 웹 url</KeyValueTable.KeyColumn>
      <KeyValueTable.ValueColumn>
        <FormRowBasicInputField
          name={formTypeMapNameTree.contentTypeWideList.buttons.linkPc.getName(
            idx
          )}
          placeholder="PC웹 url을 입력해주세요"
          validateInRules={(v) =>
            validators.run([validators.validateInRulesFormatUrl(v)])
          }
          disabled={disabled}
        />
      </KeyValueTable.ValueColumn>
      <KeyValueTable.KeyColumn>모바일 웹 url</KeyValueTable.KeyColumn>
      <KeyValueTable.ValueColumn>
        <FormRowBasicInputField
          name={formTypeMapNameTree.contentTypeWideList.buttons.linkMobile.getName(
            idx
          )}
          placeholder="모바일웹 url을 입력해주세요"
          validateInRules={(v) =>
            validators.run([validators.validateInRulesFormatUrl(v)])
          }
          disabled={disabled}
        />
      </KeyValueTable.ValueColumn>
      <KeyValueTable.KeyColumn>outlink</KeyValueTable.KeyColumn>
      <KeyValueTable.ValueColumn>
        <FormRowCheckbox
          name={formTypeMapNameTree.contentTypeWideList.buttons.isOutlink.getName(
            idx
          )}
          label="Outlink 사용 여부"
          disabled={disabled}
        />
      </KeyValueTable.ValueColumn>
    </KeyValueTable.Root>
  )
}
