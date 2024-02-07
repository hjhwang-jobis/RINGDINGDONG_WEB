import { Button } from '@fe3o3/ui'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import KeyValueTable from '~/components/KeyValueTable'
import { DEFAULT_PAGE_SIZE } from '~/constants'
import { validators } from '~/utils'

export default function ActionListFormSearch() {
  const [searchParams, setSearchParams] = useSearchParams()

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      name: searchParams.get('name') ?? '',
    },
  })

  return (
    <FormProvider {...methods}>
      <KeyValueTable.Root>
        <KeyValueTable.KeyColumn>액션 이름</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowBasicInputField
            name={'name'}
            placeholder="액션 이름을 입력해주세요"
            validateInRules={(v) =>
              validators.run([
                validators.validateInRulesStrMinMaxAllowEmpty(v, 1, 20),
              ])
            }
          />
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>검색</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <Button
            type="submit"
            size="small"
            onClick={() => {
              methods.handleSubmit((data) =>
                setSearchParams({
                  page: '1',
                  size: `${DEFAULT_PAGE_SIZE}`,
                  name: data.name,
                })
              )()
            }}
            disabled={!methods.formState.isValid}
          >
            검색
          </Button>
        </KeyValueTable.ValueColumn>
      </KeyValueTable.Root>
    </FormProvider>
  )
}
