import { Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { Button } from '@fe3o3/ui'
import React, { Fragment } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

import { ParameterType } from '~/alimtalk/constants'
import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowSelect from '~/components/FormRowSelect'
import KeyValueTable from '~/components/KeyValueTable'
import { createOption } from '~/components/SelectBox'
import { ParameterField, SendTestMessagePayload } from '~/types'
import { GetAlimtalkTemplatesMatchedParameters, GetTesters } from '~/types/api'
import { autoFillParameterUtils, parameterUtils, validators } from '~/utils'

type AlimtalkMatchedParameterInfo =
  GetAlimtalkTemplatesMatchedParameters.AlimtalkMatchedParameterInfo

interface Props {
  matchedInfos: AlimtalkMatchedParameterInfo[]
  testers: GetTesters.Tester[]
  onSubmit: (payload: SendTestMessagePayload) => void
  disabled?: boolean
}

export default function AlimtalkTemplateDetailFormSendMessage({
  matchedInfos,
  testers,
  onSubmit,
  disabled = false,
}: Props) {
  const options = [
    createOption('없음', ''),
    ...testers.map((v) => createOption(v.note, v.userId)),
  ]

  const personalParameters: ParameterField[] =
    parameterUtils.getUniqueParameterFieldsFromMatchedInfos(
      ParameterType.PERSONAL,
      matchedInfos
    )

  const autoParameters: ParameterField[] =
    parameterUtils.getUniqueParameterFieldsFromMatchedInfos(
      ParameterType.AUTO,
      matchedInfos
    )

  const basicParameters: ParameterField[] =
    parameterUtils.getUniqueParameterFieldsFromMatchedInfos(
      ParameterType.BASIC,
      matchedInfos
    )

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      userId: options[0].value,
      // NOTE: autoFillParameter은 #{NAME}, #{OTHER_NAME}이 둘 다 있어야 사용자에게 보여진다.
      autoFillParameterFieldList: [...personalParameters],
      requestParameterFieldList: [...autoParameters, ...basicParameters],
    },
  })

  const { fields: autoFillParameterFields } = useFieldArray({
    control: methods.control,
    name: 'autoFillParameterFieldList',
  })

  const { fields: requestParameterFields } = useFieldArray({
    control: methods.control,
    name: 'requestParameterFieldList',
  })

  return (
    <FormProvider {...methods}>
      <KeyValueTable.Root>
        <KeyValueTable.KeyColumn>
          테스트 메시지를 받을 테스터
        </KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowSelect name="userId" options={options} disabled={disabled} />
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>autoFillParameter</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <Text typography="body16" weight="regular">
            {'#{NAME},#{OTHER_NAME}이 모두 있어야 입력이 가능합니다.'}
            <br />
            입력시에는 userId를 입력해야 합니다.
          </Text>
          <Spacing px={10} />
          {autoFillParameterFields.length === 0 ? (
            <Text
              typography="body14"
              weight="regular"
              color={`${colors.light.scheme.$red50}`}
            >
              치환할 키가 없습니다.
            </Text>
          ) : (
            <KeyValueTable.Root>
              {autoFillParameterFields
                .filter((field) =>
                  autoFillParameterUtils.isAutoFillParameter(field.key)
                )
                .map((field, index) => (
                  <Fragment key={field.id}>
                    <KeyValueTable.KeyColumn>
                      {`${field.key}`}
                    </KeyValueTable.KeyColumn>
                    <KeyValueTable.ValueColumn>
                      <FormRowBasicInputField
                        name={`autoFillParameterFieldList.${index}.value`}
                        placeholder="자동치환될 userid를 입력해주세요."
                        validateInRules={(v) =>
                          validators.run([
                            validators.validateInRulesFormatUserId(v),
                          ])
                        }
                        disabled={disabled}
                      />
                    </KeyValueTable.ValueColumn>
                  </Fragment>
                ))}
            </KeyValueTable.Root>
          )}
        </KeyValueTable.ValueColumn>
        {requestParameterFields.length > 0 && (
          <>
            <KeyValueTable.KeyColumn>requestParameter</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <Text typography="body16" weight="regular">
                자동치환할 값을 입력해주세요
              </Text>
              <Spacing px={10} />
              {requestParameterFields.length === 0 ? (
                <Text
                  typography="body14"
                  weight="regular"
                  color={`${colors.light.scheme.$red50}`}
                >
                  치환할 키가 없습니다.
                </Text>
              ) : (
                <KeyValueTable.Root>
                  {requestParameterFields.map((field, index) => (
                    <Fragment key={field.id}>
                      <KeyValueTable.KeyColumn>
                        {`${field.key}`}
                      </KeyValueTable.KeyColumn>
                      <KeyValueTable.ValueColumn>
                        <FormRowBasicInputField
                          name={`requestParameterFieldList.${index}.value`}
                          placeholder={`자동치환자 ${field.key}(을)를 입력해주세요`}
                          validateInRules={(v) =>
                            !!v || '유효한 자동치환자를 입력해주세요'
                          }
                          disabled={disabled}
                        />
                      </KeyValueTable.ValueColumn>
                    </Fragment>
                  ))}
                </KeyValueTable.Root>
              )}
            </KeyValueTable.ValueColumn>
          </>
        )}
        <KeyValueTable.KeyColumn>버튼</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <Button
            type="submit"
            size="small"
            onClick={methods.handleSubmit((data) => {
              const autoFillParameter =
                parameterUtils.convertToReplacableParameterMap(
                  data.autoFillParameterFieldList.map((v) => ({
                    key: parameterUtils.extractReplaceableKey(v.key),
                    value: v.value,
                  }))
                )
              const requestParameter =
                parameterUtils.convertToReplacableParameterMap(
                  data.requestParameterFieldList.map((v) => ({
                    key: parameterUtils.extractReplaceableKey(v.key),
                    value: v.value,
                  }))
                )

              onSubmit({
                userId: Number(data.userId),
                autoFillParameter,
                requestParameter,
                containsAlimlist: false,
              })
            })}
            disabled={!methods.formState.isValid || disabled}
          >
            테스트 발송
          </Button>
        </KeyValueTable.ValueColumn>
      </KeyValueTable.Root>
    </FormProvider>
  )
}
