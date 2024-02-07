import React from 'react'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import KeyValueTable from '~/components/KeyValueTable'
import { formTypeMapNameTree } from '~/friendtalk/utils'
import { validators } from '~/utils'

interface Props {
  idx: number
  disabled?: boolean
}

export default function FormTypeCarouselRowFriendtalkButton({
  idx,
  disabled = false,
}: Props) {
  return (
    <>
      <KeyValueTable.Root>
        <KeyValueTable.KeyColumn>이름</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowBasicInputField
            name={formTypeMapNameTree.contentTypeCarousel.items.buttons.name.getName(
              idx,
              0
            )}
            placeholder="버튼 이름을 입력해주세요"
            validateInRules={(v) =>
              validators.run([validators.validateInRulesStrMinMax(v, 5, 14)])
            }
            disabled={disabled}
          />
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>PC 웹 url</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowBasicInputField
            name={formTypeMapNameTree.contentTypeCarousel.items.buttons.linkPc.getName(
              idx,
              0
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
            name={formTypeMapNameTree.contentTypeCarousel.items.buttons.linkMobile.getName(
              idx,
              0
            )}
            placeholder="모바일웹 url을 입력해주세요"
            validateInRules={(v) =>
              validators.run([validators.validateInRulesFormatUrl(v)])
            }
            disabled={disabled}
          />
        </KeyValueTable.ValueColumn>
      </KeyValueTable.Root>
    </>
  )
}
