import { Button } from '@fe3o3/ui'
import React, { Fragment } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowSelect from '~/components/FormRowSelect'
import KeyValueTable from '~/components/KeyValueTable'
import { createOption } from '~/components/SelectBox'
import { ParameterField, ParameterMap } from '~/types'
import { autoFillParameterUtils } from '~/utils'

interface Props {
  autoFillParameter: ParameterMap
}

export default function FormRowSendTestMessage({ autoFillParameter }: Props) {
  // TODO 테스트 메시지를 받을 대상자의 리스트를 조회하는 API가 필요하다.
  const options = [
    createOption('1', '1'),
    createOption('2', '2'),
    createOption('3', '3'),
  ]

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      receiverId: options[0].value,
      autoFillParameterFieldList: Object.keys(autoFillParameter).map((key) => ({
        key,
        value: autoFillParameter[key],
      })),
    },
  })

  const { fields } = useFieldArray({
    control: methods.control,
    name: 'autoFillParameterFieldList',
  })

  const onSubmit = (data: { autoFillParameterFieldList: ParameterField[] }) => {
    // eslint-disable-next-line
    const autoFillParameter = autoFillParameterUtils.convertToAutoFillParameter(
      data.autoFillParameterFieldList
    )
    // TODO 수정된 autoFillParameter를 테스트 발송의 인자로 전달하여한다.
    // TODO 테스트 발송은 치환자가 없더라도, 보낼수 있어야 한다.
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <KeyValueTable.Root>
          <KeyValueTable.KeyColumn>
            테스트 메시지를 받을 uid
          </KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowSelect name="receiverId" options={options} />
          </KeyValueTable.ValueColumn>
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <KeyValueTable.KeyColumn>
                {`#{${field.key}}`}
              </KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                <FormRowBasicInputField
                  name={`autoFillParameterFieldList.${index}.value`}
                  placeholder={`자동치환자 ${field.key}를 입력해주세요`}
                  validateInRules={(v) =>
                    !!v || '유효한 자동치환자를 입력해주세요'
                  }
                />
              </KeyValueTable.ValueColumn>
            </Fragment>
          ))}
          <KeyValueTable.KeyColumn>버튼</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <Button
              type="submit"
              size="small"
              onClick={methods.handleSubmit((data) => {
                // eslint-disable-next-line
                const autoFillParameter =
                  autoFillParameterUtils.convertToAutoFillParameter(
                    data.autoFillParameterFieldList
                  )
                // TODO 수정된 autoFillParameter를 테스트 발송의 인자로 전달하여한다.
                // TODO 테스트 발송은 치환자가 없더라도, 보낼수 있어야 한다.
              })}
              disabled={!methods.formState.isValid}
            >
              테스트 발송
            </Button>
          </KeyValueTable.ValueColumn>
        </KeyValueTable.Root>
      </form>
    </FormProvider>
  )
}
