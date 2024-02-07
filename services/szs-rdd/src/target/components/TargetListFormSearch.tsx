import { Button } from '@fe3o3/ui'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import KeyValueTable from '~/components/KeyValueTable'
import { DEFAULT_PAGE_SIZE } from '~/constants'
import { validators } from '~/utils'

export default function TargetListFormSearch() {
  const [searchParams, setSearchParams] = useSearchParams()

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      targetId: searchParams.get('targetId') ?? '',
      title: searchParams.get('title') ?? '',
    },
  })

  return (
    <FormProvider {...methods}>
      <KeyValueTable.Root>
        <KeyValueTable.KeyColumn>타겟 id</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowBasicInputField
            name={'targetId'}
            placeholder="targetId를 입력해주세요"
            validateInRules={(v) =>
              validators.run([
                validators.validateInRulesStrMinMaxAllowEmpty(v, 1, 10),
              ])
            }
          />
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>title</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowBasicInputField
            name={'title'}
            placeholder="title을 입력해주세요"
            validateInRules={(v) =>
              validators.run([
                validators.validateInRulesStrMinMaxAllowEmpty(v, 2, 10),
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
                  targetId: data.targetId,
                  title: data.title,
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
