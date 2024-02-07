import { Spacing } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React, { useCallback } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { queryClient } from '~/api/reactQuery'
import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowToggle from '~/components/FormRowToggle'
import FormRowValidateNSubmit from '~/components/FormRowValidateNSubmit'
import KeyValueTable from '~/components/KeyValueTable'
import { usePostTargetMutation } from '~/hooks/queries/target/usePostTargetMutation'
import { usePutTargetMutation } from '~/hooks/queries/target/usePutTargetMutation'
import { queryKeys } from '~/keys/queries'
import { RoutePath } from '~/routes'
import { TargetFrequencyChannelType } from '~/target/constants'
import { FormTarget } from '~/target/types'
import { PostTarget } from '~/types/api'
import { apiUtils } from '~/utils'
import { validators } from '~/utils'

import TargetFormRowFrequency from './TargetFormRowFrequency'
import TargetFormRowTargetGroup from './TargetFormRowTargetGroup'

const sanitizeData = (data: FormTarget): PostTarget.Request => {
  return {
    title: data.title,
    isDropDuplicated: data.isDropDuplicated,
    isExcludeDeniers: data.isExcludeDeniers,
    frequencies: [
      ...data.frequencies.map(({ channel, withinDays, moreThanCount }) => ({
        channel,
        withinDays: Number(withinDays),
        moreThanCount: Number(moreThanCount),
      })),
    ],
    includeTargetQueries: data.targetQueries
      .filter((v) => v.isIncluded)
      .map((v) => v.id),
    excludeTargetQueries: data.targetQueries
      .filter((v) => !v.isIncluded)
      .map((v) => v.id),
    includeMessageGroups: data.doneMessages
      .filter((v) => v.isIncluded)
      .map((v) => v.id),
    excludeMessageGroups: data.doneMessages
      .filter((v) => !v.isIncluded)
      .map((v) => v.id),
  }
}

interface Props {
  data?: FormTarget
  readOnly?: boolean
}

const getFrequencyEmpty = () => ({
  withinDays: 0,
  channel: TargetFrequencyChannelType.ALIMTALK,
  moreThanCount: 0,
})

const getAuthorEmpty = () => ({
  name: '',
  email: '',
})

export default function TargetForm({
  data = {
    id: 0,
    targetId: '',
    title: '',
    isDropDuplicated: true,
    isExcludeDeniers: true,
    createdAt: '',
    updatedAt: '',
    author: getAuthorEmpty(),
    frequencies: [getFrequencyEmpty()],
    targetQueries: [],
    doneMessages: [],
  },
  readOnly = false,
}: Props) {
  const navigate = useNavigate()
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      ...data,
    },
  })

  const frequencyFieldArray = useFieldArray({
    control: methods.control,
    name: 'frequencies',
  })

  const onSuccessMutation = useCallback(() => {
    queryClient.invalidateQueries(queryKeys.target.BASE)
    navigate(`${RoutePath.Target}/${RoutePath.TargetList}`)
  }, [navigate])

  const { mutate: mutatePostTarget, error: errorPostTarget } =
    usePostTargetMutation({
      onSuccess: onSuccessMutation,
    })

  const { mutate: mutatePutTarget, error: errorPutTarget } =
    usePutTargetMutation({
      onSuccess: onSuccessMutation,
    })

  return (
    <>
      {errorPostTarget && (
        <>
          <ErrorInfo
            title="타겟 생성 오류"
            message={apiUtils.getApiErrorMessage(errorPostTarget)}
          />
          <Spacing px={10} />
        </>
      )}
      {errorPutTarget && (
        <>
          <ErrorInfo
            title="타겟 수정 오류"
            message={apiUtils.getApiErrorMessage(errorPutTarget)}
          />
          <Spacing px={10} />
        </>
      )}
      <FormProvider {...methods}>
        <KeyValueTable.Root>
          {!!data.id && (
            <>
              <KeyValueTable.KeyColumn>id</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>{data.id}</KeyValueTable.ValueColumn>
            </>
          )}
          {!!data.targetId && (
            <>
              <KeyValueTable.KeyColumn>targetId</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                {data.targetId}
              </KeyValueTable.ValueColumn>
            </>
          )}
          <KeyValueTable.KeyColumn>타겟 이름</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowBasicInputField
              name={'title'}
              placeholder="타겟 이름을 입력해주세요."
              validateInRules={(v) =>
                validators.run([validators.validateInRulesStrMinMax(v, 5, 40)])
              }
              disabled={readOnly}
            />
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>타겟그룹 설정</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <TargetFormRowTargetGroup disabled={readOnly} />
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>수신빈도 관리</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <Button
              variant="lightBlue"
              size="small"
              onClick={() => {
                frequencyFieldArray.append(getFrequencyEmpty())
              }}
            >
              추가
            </Button>
            <Spacing px={10} />

            {frequencyFieldArray.fields.map((field, idx) => (
              <TargetFormRowFrequency
                key={field.id}
                idx={idx}
                onDelete={(id) => {
                  frequencyFieldArray.remove(id)
                }}
              />
            ))}
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>기타 설정</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <KeyValueTable.Root>
              <KeyValueTable.KeyColumn>집계간 중복제거</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                <FormRowToggle
                  name={'isDropDuplicated'}
                  labelOn="선택"
                  labelOff="미선택"
                  disabled={readOnly}
                />
              </KeyValueTable.ValueColumn>
              <KeyValueTable.KeyColumn>수신거부자 제외</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                <FormRowToggle
                  name={'isExcludeDeniers'}
                  labelOn="선택"
                  labelOff="미선택"
                  disabled={readOnly}
                />
              </KeyValueTable.ValueColumn>
            </KeyValueTable.Root>
          </KeyValueTable.ValueColumn>
          {data.createdAt && (
            <>
              <KeyValueTable.KeyColumn>생성일자</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                {data.createdAt}
              </KeyValueTable.ValueColumn>
            </>
          )}
          {data.updatedAt && (
            <>
              <KeyValueTable.KeyColumn>수정일자</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                {data.updatedAt}
              </KeyValueTable.ValueColumn>
            </>
          )}
          {data.author?.name && (
            <>
              <KeyValueTable.KeyColumn>작성자</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                <KeyValueTable.Root>
                  <KeyValueTable.KeyColumn>이름</KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    {data.author.name}
                  </KeyValueTable.ValueColumn>
                  <KeyValueTable.KeyColumn>이메일</KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    {data.author.email}
                  </KeyValueTable.ValueColumn>
                </KeyValueTable.Root>
              </KeyValueTable.ValueColumn>
            </>
          )}
          {!readOnly && (
            <FormRowValidateNSubmit
              onValidate={() => methods.trigger()}
              onSubmit={methods.handleSubmit((data) => {
                const dataSafe = sanitizeData(data)
                if (!!data.id) {
                  mutatePutTarget({
                    targetId: data.id,
                    ...dataSafe,
                  })
                } else {
                  mutatePostTarget(dataSafe)
                }
              })}
              isValid={methods.formState.isValid}
            />
          )}
        </KeyValueTable.Root>
      </FormProvider>
    </>
  )
}
