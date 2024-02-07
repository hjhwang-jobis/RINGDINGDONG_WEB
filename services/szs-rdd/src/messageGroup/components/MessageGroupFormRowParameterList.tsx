import { Spacing } from '@3o3/mystique-components'
import React, { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowTextWarning from '~/components/FormRowTextWarning'
import FormRowToggle from '~/components/FormRowToggle'
import KeyValueTable from '~/components/KeyValueTable'
import { MessageChannelType } from '~/constants'
import { ParameterRow } from '~/messageGroup/types'
import { canContainAlimlist } from '~/messageGroup/utils'
import { validators } from '~/utils'

interface Props {
  messageChannelType: MessageChannelType
}

export default function MessageGroupFormRowParameterList({
  messageChannelType,
}: Props) {
  const { control, getValues } = useFormContext()
  const name = 'formMessageGroupTemplates'

  const { fields } = useFieldArray({
    control,
    name,
  })

  return (
    <>
      {fields.length === 0 ? (
        <>
          <Spacing px={10} />
          <FormRowTextWarning text={'등록된 일반 파라미터가 없습니다.'} />
          <Spacing px={10} />
        </>
      ) : (
        <KeyValueTable.Root>
          {fields.map((field, idx) => {
            const templateCode: string = getValues(
              `${name}.${idx}.templateCode`
            )
            const parameterRows: ParameterRow[] = getValues(
              `${name}.${idx}.parameterRows`
            )

            return (
              <Fragment key={field.id}>
                <KeyValueTable.KeyColumn>
                  {templateCode}
                </KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>
                  <KeyValueTable.Root>
                    <KeyValueTable.KeyColumn>
                      알림리스트 동시 발송 여부
                    </KeyValueTable.KeyColumn>
                    <KeyValueTable.ValueColumn>
                      <FormRowToggle
                        name={`${name}.${idx}.isContainAlimlist`}
                        labelOn="동시 발송합니다"
                        labelOff="동시 발송하지 않습니다"
                        disabled={!canContainAlimlist(messageChannelType)}
                      />
                    </KeyValueTable.ValueColumn>
                    {parameterRows.map((parameterRow, innerIdx) => {
                      return (
                        <Fragment key={`${field.id}-${innerIdx}`}>
                          <KeyValueTable.KeyColumn>
                            {parameterRow.key}
                          </KeyValueTable.KeyColumn>
                          <KeyValueTable.ValueColumn>
                            <FormRowBasicInputField
                              name={`${name}.${idx}.parameterRows.${innerIdx}.value`}
                              validateInRules={(v) =>
                                validators.run([
                                  validators.validateInRulesRequired(v),
                                ])
                              }
                            />
                          </KeyValueTable.ValueColumn>
                        </Fragment>
                      )
                    })}
                  </KeyValueTable.Root>
                </KeyValueTable.ValueColumn>
              </Fragment>
            )
          })}
        </KeyValueTable.Root>
      )}
    </>
  )
}
