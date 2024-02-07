import { Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import React, { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import KeyValueTable from '~/components/KeyValueTable'
import { validators } from '~/utils'

interface Props {
  name: string
  disabled?: boolean
  onBlur?: () => void
}

export default function FormRowAutoFillParameters({
  name,
  disabled = false,
  onBlur,
}: Props) {
  const { control, getValues } = useFormContext()
  const { fields } = useFieldArray({
    control: control,
    name,
  })

  return (
    <KeyValueTable.Root>
      {fields.length === 0 ? (
        <Text
          typography="body14"
          weight="medium"
          color={colors.light.scheme.$gray40}
        >
          자동치환 파라미터가 없습니다.
        </Text>
      ) : (
        <>
          {fields.map((field, index) => {
            const fieldName = `${name}.${index}.value`
            const key = getValues(`${name}.${index}.key`)

            return (
              <Fragment key={field.id}>
                <KeyValueTable.KeyColumn>{key}</KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>
                  <FormRowBasicInputField
                    name={fieldName}
                    placeholder={`자동치환자 ${key}를 입력해주세요`}
                    validateInRules={(v) =>
                      validators.run([
                        validators.validateInRulesStrMinMax(v, 2, 10),
                      ])
                    }
                    disabled={disabled}
                    onBlur={() => onBlur?.()}
                  />
                </KeyValueTable.ValueColumn>
              </Fragment>
            )
          })}
        </>
      )}
    </KeyValueTable.Root>
  )
}
