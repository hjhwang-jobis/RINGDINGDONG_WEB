import { Button } from '@fe3o3/ui'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import KeyValueTable from '~/components/KeyValueTable'
import { DEFAULT_PAGE_SIZE, SortDirection } from '~/constants'
import { validators } from '~/utils'

export default function FriendtalkTemplateFormSearch() {
  const [searchParams, setSearchParams] = useSearchParams()

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      templateCode: searchParams.get('templateCode') ?? '',
    },
  })

  return (
    <FormProvider {...methods}>
      <KeyValueTable.Root>
        <KeyValueTable.KeyColumn>템플릿 코드</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowBasicInputField
            name={'templateCode'}
            placeholder="템플릿 코드를 입력해주세요."
            validateInRules={(v) =>
              validators.run([
                validators.validateInRulesStrMinMaxAllowEmpty(v, 1, 40),
              ])
            }
          />
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>검색</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <Button
            type="submit"
            size="small"
            onClick={methods.handleSubmit((data) => {
              setSearchParams({
                page: '1',
                size: `${DEFAULT_PAGE_SIZE}`,
                direction: SortDirection.DESC,
                templateCode: data.templateCode,
              })
            })}
            disabled={!methods.formState.isValid}
          >
            검색
          </Button>
        </KeyValueTable.ValueColumn>
      </KeyValueTable.Root>
    </FormProvider>
  )
}
