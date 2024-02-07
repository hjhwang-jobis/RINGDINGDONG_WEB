import React from 'react'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import KeyValueTable from '~/components/KeyValueTable'
import { formTypeMapNameTree } from '~/friendtalk/utils'
import { validators } from '~/utils'

interface Props {
  disabled?: boolean
}

export default function FormTypeCarouselRowTail({ disabled = false }: Props) {
  return (
    <KeyValueTable.Root>
      <KeyValueTable.KeyColumn>Mobile</KeyValueTable.KeyColumn>
      <KeyValueTable.ValueColumn>
        <FormRowBasicInputField
          name={formTypeMapNameTree.contentTypeCarousel.carouselTail.linkMobile.getName()}
          placeholder="모바일웹 url을 입력해주세요"
          validateInRules={(v) =>
            validators.run([validators.validateInRulesFormatUrl(v)])
          }
          disabled={disabled}
        />
      </KeyValueTable.ValueColumn>
      <KeyValueTable.KeyColumn>PC</KeyValueTable.KeyColumn>
      <KeyValueTable.ValueColumn>
        <FormRowBasicInputField
          name={formTypeMapNameTree.contentTypeCarousel.carouselTail.linkPc.getName()}
          placeholder="PC웹 url을 입력해주세요"
          validateInRules={(v) =>
            validators.run([validators.validateInRulesFormatUrl(v)])
          }
          disabled={disabled}
        />
      </KeyValueTable.ValueColumn>
      {/* TODO 필수값이 아닌 선택적인 값. 그런데 입력한다면, 입력값 검사를 해야함. 이런 경우는 어떻게 처리하면 될까? */}
      <KeyValueTable.KeyColumn>Android</KeyValueTable.KeyColumn>
      <KeyValueTable.ValueColumn>
        <FormRowBasicInputField
          name={formTypeMapNameTree.contentTypeCarousel.carouselTail.schemeAndroid.getName()}
          placeholder="모바일 안드로이드 url을 입력해주세요"
          validateInRules={(v) =>
            validators.run([validators.validateInRulesFormatUrlOrEmpty(v)])
          }
          disabled={disabled}
        />
      </KeyValueTable.ValueColumn>
      <KeyValueTable.KeyColumn>iOS</KeyValueTable.KeyColumn>
      <KeyValueTable.ValueColumn>
        <FormRowBasicInputField
          name={formTypeMapNameTree.contentTypeCarousel.carouselTail.schemeIos.getName()}
          placeholder="모바일 iOS url을 입력해주세요"
          validateInRules={(v) =>
            validators.run([validators.validateInRulesFormatUrlOrEmpty(v)])
          }
          disabled={disabled}
        />
      </KeyValueTable.ValueColumn>
    </KeyValueTable.Root>
  )
}
