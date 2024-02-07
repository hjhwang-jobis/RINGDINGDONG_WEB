import { Flex, Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { Button } from '@fe3o3/ui'
import React, { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Link } from 'react-router-dom'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import KeyValueTable from '~/components/KeyValueTable'
import {
  MessageGroupSendStatusType,
  MessageGroupSendStatusTypeMap,
} from '~/constants'
import {
  MESSAGE_GROUP_PARTITION_FROM_MIN,
  MESSAGE_GROUP_PARTITION_TO_MAX,
} from '~/constants'
import { RoutePath } from '~/routes'
import { validators } from '~/utils'

export default function CampaignFormRowMessageGroupList() {
  const { control, getValues } = useFormContext()
  const name = 'messageGroups'
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  return (
    <>
      <Flex justifyContent="start">
        <Button
          size="small"
          variant="lineBlue"
          type="button"
          onClick={() =>
            append({
              name: `${fields.length + 1}번 메시지 그룹`,
              partitionFrom: MESSAGE_GROUP_PARTITION_FROM_MIN,
              partitionTo: MESSAGE_GROUP_PARTITION_TO_MAX,
            })
          }
        >
          메시지그룹 추가
        </Button>
      </Flex>
      {fields.length === 0 ? (
        <Flex justifyContent="center">
          <Text
            typography="body16"
            weight="medium"
            color={colors.light.scheme.$gray40}
          >
            등록된 메시지 그룹이 없습니다.
          </Text>
        </Flex>
      ) : (
        <>
          {fields.map((field, index) => {
            // TODO 낱개를 getValues로 가져오는 것이 아닌 객체로 가져오기. field를 올바른 타입을 지정해서 가져오는 방법은 없을까?
            const prefix = `${name}.${index}`
            const valueId = getValues(`${prefix}.id`)
            const valueCreatedAt = getValues(`${prefix}.createdAt`)
            const valueUpdatedAt = getValues(`${prefix}.updatedAt`)
            const valueSendStatus = getValues(`${prefix}.sendStatus`)
            const valueIsActive = getValues(`${prefix}.isActive`)
            const valueSendingRequestAt = getValues(
              `${prefix}.sendingRequestAt`
            )
            const messageChannel = getValues('messageChannel')
            const keyMessageGroupName = `${prefix}.name`
            const keyPartitionFrom = `${prefix}.partitionFrom`
            const keyPartitionTo = `${prefix}.partitionTo`

            return (
              <Fragment key={field.id}>
                <Spacing px={10} />
                <KeyValueTable.Root>
                  {valueId && (
                    <>
                      <KeyValueTable.KeyColumn>id</KeyValueTable.KeyColumn>
                      <KeyValueTable.ValueColumn>
                        <Link
                          to={`${RoutePath.MessageGroup}/${RoutePath.MessageGroupDetail}/${messageChannel}/${valueId}`}
                        >
                          {valueId}
                        </Link>
                      </KeyValueTable.ValueColumn>
                    </>
                  )}
                  {valueCreatedAt && (
                    <>
                      <KeyValueTable.KeyColumn>
                        생성일자
                      </KeyValueTable.KeyColumn>
                      <KeyValueTable.ValueColumn>
                        {valueCreatedAt}
                      </KeyValueTable.ValueColumn>
                    </>
                  )}
                  {valueUpdatedAt && (
                    <>
                      <KeyValueTable.KeyColumn>
                        수정일자
                      </KeyValueTable.KeyColumn>
                      <KeyValueTable.ValueColumn>
                        {valueUpdatedAt}
                      </KeyValueTable.ValueColumn>
                    </>
                  )}
                  {valueSendStatus && (
                    <>
                      <KeyValueTable.KeyColumn>
                        발송 상태
                      </KeyValueTable.KeyColumn>
                      <KeyValueTable.ValueColumn>
                        {
                          MessageGroupSendStatusTypeMap[
                            valueSendStatus as MessageGroupSendStatusType
                          ]
                        }
                      </KeyValueTable.ValueColumn>
                    </>
                  )}
                  {valueIsActive && (
                    <>
                      <KeyValueTable.KeyColumn>
                        활성화 여부
                      </KeyValueTable.KeyColumn>
                      <KeyValueTable.ValueColumn>
                        {valueIsActive}
                      </KeyValueTable.ValueColumn>
                    </>
                  )}
                  {valueSendingRequestAt && (
                    <>
                      <KeyValueTable.KeyColumn>
                        발송요청일시
                      </KeyValueTable.KeyColumn>
                      <KeyValueTable.ValueColumn>
                        {valueSendingRequestAt}
                      </KeyValueTable.ValueColumn>
                    </>
                  )}
                  <KeyValueTable.KeyColumn>
                    메시지 그룹 이름
                  </KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    <FormRowBasicInputField
                      name={keyMessageGroupName}
                      placeholder="메시지 그룹 이름을 입력해주세요"
                      validateInRules={(v) =>
                        validators.run([
                          validators.validateInRulesStrMinMax(v, 5, 40),
                        ])
                      }
                    />
                  </KeyValueTable.ValueColumn>
                  <KeyValueTable.KeyColumn>분할 설정</KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    <Flex justifyContent="start" alignItems="center">
                      <FormRowBasicInputField
                        name={keyPartitionFrom}
                        type="number"
                        validateInRules={(v) =>
                          validators.run([
                            validators.validateInRulesNumberRange(
                              v,
                              MESSAGE_GROUP_PARTITION_FROM_MIN,
                              MESSAGE_GROUP_PARTITION_TO_MAX
                            ),
                          ])
                        }
                      />
                      <Text
                        typography="body16"
                        weight="medium"
                        color={colors.light.scheme.$gray40}
                      >
                        &nbsp;~&nbsp;
                      </Text>
                      <FormRowBasicInputField
                        name={keyPartitionTo}
                        type="number"
                        validateInRules={(v) =>
                          validators.run([
                            validators.validateInRulesNumberRange(
                              v,
                              MESSAGE_GROUP_PARTITION_FROM_MIN,
                              MESSAGE_GROUP_PARTITION_TO_MAX
                            ),
                          ])
                        }
                      />
                    </Flex>
                  </KeyValueTable.ValueColumn>
                  <KeyValueTable.KeyColumn>삭제</KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    <Flex justifyContent="start">
                      <Button
                        size="small"
                        variant="lineRed"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        메시지그룹 삭제
                      </Button>
                    </Flex>
                  </KeyValueTable.ValueColumn>
                </KeyValueTable.Root>
              </Fragment>
            )
          })}
        </>
      )}
    </>
  )
}
