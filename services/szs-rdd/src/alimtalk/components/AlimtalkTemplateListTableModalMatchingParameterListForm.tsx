import { Spacing, Text } from '@3o3/mystique-components'
import { Column, Table } from '@3o3-internal/components'
import React, { Fragment, useMemo } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

import { ParameterType } from '~/alimtalk/constants'
import { AlimtalkMatchDetail } from '~/alimtalk/types'
import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowSelect from '~/components/FormRowSelect'
import KeyValueTable from '~/components/KeyValueTable'
import { createOption } from '~/components/SelectBox'
import { Parameter } from '~/types'
import { validators } from '~/utils'

interface Props {
  alimtalkParameters: string[]
  autoParameters: Parameter[]
  personalParameters: Parameter[]
  basicParameters: Parameter[]
  onBlur: (data: FormData) => void
}

interface FormData {
  alimtlakMatchParameters: AlimtalkMatchDetail[]
}

export default function AlimtalkTemplateListTableModalMatchingParameterListForm({
  alimtalkParameters,
  autoParameters,
  personalParameters,
  basicParameters,
  onBlur,
}: Props) {
  const methods = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      alimtlakMatchParameters: alimtalkParameters.map((v) => ({
        parameterType: ParameterType.BASIC,
        originParameter: v,
        matchedParameter: '',
        defaultValue: '',
      })),
    },
  })

  const { fields } = useFieldArray({
    control: methods.control,
    name: 'alimtlakMatchParameters',
  })

  const optionParameters = useMemo(() => {
    return [
      createOption('없음', ''),
      ...autoParameters.map((v) =>
        createOption(
          `[자동계산] ${v.parameter}`,
          JSON.stringify({
            parameterType: ParameterType.AUTO,
            matchedParameter: v.parameter,
          })
        )
      ),
      ...personalParameters.map((v) =>
        createOption(
          `[개인정보] ${v.parameter}`,
          JSON.stringify({
            parameterType: ParameterType.PERSONAL,
            matchedParameter: v.parameter,
          })
        )
      ),
      ...basicParameters.map((v) =>
        createOption(
          `[일반] ${v.parameter}`,
          JSON.stringify({
            parameterType: ParameterType.BASIC,
            matchedParameter: v.parameter,
          })
        )
      ),
    ]
  }, [autoParameters, personalParameters, basicParameters])

  return (
    <FormProvider {...methods}>
      <form>
        <Text typography="subtitle16">자동계산 파라미터</Text>
        <Spacing px={10} />
        <ParameterListTable data={autoParameters} />
        <Spacing px={10} />
        <Text typography="subtitle16">개인정보 파라미터</Text>
        <Spacing px={10} />
        <ParameterListTable data={personalParameters} />
        <Spacing px={10} />
        <Text typography="subtitle16">일반 파라미터</Text>
        <Spacing px={10} />
        <ParameterListTable data={basicParameters} />
        <Spacing px={10} />
        <Text typography="subtitle16">알림톡 파라미터</Text>
        <Spacing px={10} />
        <KeyValueTable.Root>
          {fields.map((field, index) => {
            const name = `alimtlakMatchParameters.${index}`

            return (
              <Fragment key={field.id}>
                <KeyValueTable.KeyColumn>
                  {field.originParameter}
                </KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>
                  <KeyValueTable.Root>
                    <KeyValueTable.KeyColumn>
                      매칭 파라미터
                    </KeyValueTable.KeyColumn>
                    <KeyValueTable.ValueColumn>
                      <FormRowSelect
                        name={`${name}.matchedParameter`}
                        options={optionParameters}
                        onBlur={() => onBlur(methods.getValues())}
                      />
                    </KeyValueTable.ValueColumn>
                    <KeyValueTable.KeyColumn>기본값</KeyValueTable.KeyColumn>
                    <KeyValueTable.ValueColumn>
                      <FormRowBasicInputField
                        name={`${name}.defaultValue`}
                        validateInRules={(v) =>
                          validators.run([
                            validators.validateInRulesStrMinMaxAllowEmpty(
                              v,
                              1,
                              40
                            ),
                          ])
                        }
                        onBlur={() => onBlur(methods.getValues())}
                      />
                    </KeyValueTable.ValueColumn>
                  </KeyValueTable.Root>
                </KeyValueTable.ValueColumn>
              </Fragment>
            )
          })}
        </KeyValueTable.Root>
      </form>
    </FormProvider>
  )
}

interface TableProps {
  data: Parameter[]
}

function ParameterListTable({ data }: TableProps) {
  const columns = useMemo<Column<Parameter>[]>(
    () => [
      {
        Header: '타이틀',
        accessor: 'title',
      },
      {
        Header: '파라미터값',
        accessor: 'parameter',
      },
      {
        Header: '쿼리 상세 설명',
        accessor: 'description',
      },
    ],
    []
  )

  return <Table columns={columns} data={data} />
}
