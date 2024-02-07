import { Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { ErrorModal, useModal } from '@3o3-internal/components'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowTextAreaComment from '~/components/FormRowTextArea'
import FormRowValidateNSubmit from '~/components/FormRowValidateNSubmit'
import KeyValueTable from '~/components/KeyValueTable'
import { usePostTestersMutation } from '~/hooks/queries/tester/usePostTestersMutation'
import { usePutTestersMutation } from '~/hooks/queries/tester/usePutTestersMutation'
import { RoutePath } from '~/routes'
import { GetTestersList } from '~/types/api'
import { validators } from '~/utils'

interface Props {
  data?: GetTestersList.Tester
}

export default function PushForm({ data }: Props) {
  const navigate = useNavigate()
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      id: data?.id ?? -1,
      userId: data?.userId ?? -1,
      note: data?.note ?? '',
      createdAt: data?.createdAt ?? '',
      updatedAt: data?.updatedAt ?? '',
    },
  })

  const onSuccess = () =>
    navigate(`${RoutePath.Tester}/${RoutePath.TesterList}`)
  const { showModal } = useModal()
  const { mutate: postTesters } = usePostTestersMutation({
    onSuccess,
    onError: (error) => {
      showModal(ErrorModal, {
        title: '테스터 생성 오류',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      })
    },
  })

  const { mutate: putTesters } = usePutTestersMutation({
    onSuccess,
    onError: (error) => {
      showModal(ErrorModal, {
        title: '테스터 수정 오류',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      })
    },
  })
  const isEditMode = data?.id && data.id > 0
  const onSubmit = (data: GetTestersList.Tester) => {
    if (isEditMode) {
      putTesters({
        testerId: Number(data.id),
        userId: Number(data.userId),
        note: data.note,
      })
    } else {
      postTesters({
        userId: Number(data.userId),
        note: data.note,
      })
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <KeyValueTable.Root>
          <KeyValueTable.KeyColumn>Terry user id</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            {isEditMode ? (
              <Text
                typography="body16"
                weight="regular"
                color={colors.light.scheme.$gray40}
              >
                {data?.userId}
              </Text>
            ) : (
              <FormRowBasicInputField
                name={'userId'}
                placeholder={'Terry userId(숫자)를 입력해주세요'}
                validateInRules={(v) =>
                  validators.run([validators.validateInRulesFormatUserId(v)])
                }
              />
            )}
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>테스터 구분용 노트</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowTextAreaComment name={'note'} min={5} max={200} />
          </KeyValueTable.ValueColumn>
          <FormRowValidateNSubmit
            onValidate={() => methods.trigger()}
            isValid={methods.formState.isValid}
          />
        </KeyValueTable.Root>
      </form>
    </FormProvider>
  )
}
