import { Flex, Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { ErrorModal, useModal } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowValidateNSubmit from '~/components/FormRowValidateNSubmit'
import KeyValueTable from '~/components/KeyValueTable'
import { usePostActionsMutation } from '~/hooks/queries/action/usePostActionsMutation'
import { usePutActionsMutation } from '~/hooks/queries/action/usePutActionsMutation'
import { RoutePath } from '~/routes'
import { ApiError } from '~/types/api'
import { GetActions } from '~/types/api'
import { authorUtils, validators } from '~/utils'

import ActionFormRowCampaignListTable from './ActionFormRowCampaignListTable'

interface Props {
  data?: GetActions.Action
}

export default function ActionForm({ data }: Props) {
  const navigate = useNavigate()
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      id: data?.id ?? -1,
      createdAt: data?.createdAt ?? '',
      updatedAt: data?.updatedAt ?? '',
      name: data?.name ?? '',
      description: data?.description ?? '',
      author: data?.author ?? authorUtils.getAuthorEmpty(),
      campaigns: data?.campaigns ?? [],
    },
  })

  const { showModal } = useModal()
  const onErrorPostActions = (error: ApiError<unknown>) =>
    showModal(ErrorModal, {
      title: '캠페인 액션 생성 오류',
      errorMessage: error.message,
      errorCode: error.code ?? -1,
    })
  const onErrorPutActions = (error: ApiError<unknown>) =>
    showModal(ErrorModal, {
      title: '캠페인 액션 수정 오류',
      errorMessage: error.message,
      errorCode: error.code ?? -1,
    })

  // NOTE: "저장" 버튼을 눌렀을 때의 동작
  const onSuccess = useCallback(() => {
    navigate(`${RoutePath.Action}/${RoutePath.ActionList}`)
  }, [navigate])
  const { mutate: mutatePostActions } = usePostActionsMutation({
    onSuccess,
    onError: onErrorPostActions,
  })
  const { mutate: mutatePutActions } = usePutActionsMutation({
    onSuccess,
    onError: onErrorPutActions,
  })
  const onSubmit = (data: GetActions.Action) => {
    if (data.id > 0) {
      mutatePutActions({
        actionId: data.id,
        name: data.name,
        description: data.description ?? '',
      })

      return
    }

    mutatePostActions({
      name: data.name,
      description: data.description ?? '',
    })
  }

  // NOTE: "캠페인 추가" 버튼을 눌렀을 때의 동작
  const { mutate: mutatePostActionsThenGoToCampaign } = usePostActionsMutation({
    onSuccess: ({ data }) =>
      navigate(`${RoutePath.Campaign}/${RoutePath.CreateCampaign}/${data.id}`),
    onError: onErrorPostActions,
  })
  const { mutate: mutatePutActionsThenGoToCampaign } = usePutActionsMutation({
    onSuccess: () =>
      navigate(`${RoutePath.Campaign}/${RoutePath.CreateCampaign}/${data?.id}`),
    onError: onErrorPutActions,
  })
  const onSubmitThenGoToCampaign = (data: GetActions.Action) => {
    if (data.id > 0) {
      mutatePutActionsThenGoToCampaign({
        actionId: data.id,
        name: data.name,
        description: data.description ?? '',
      })

      return
    }

    mutatePostActionsThenGoToCampaign({
      name: data.name,
      description: data.description ?? '',
    })
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <KeyValueTable.Root>
            {methods.getValues('id') > 0 && (
              <>
                <KeyValueTable.KeyColumn>id</KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>
                  {methods.getValues('id')}
                </KeyValueTable.ValueColumn>
              </>
            )}
            {methods.getValues('author').name && (
              <>
                <KeyValueTable.KeyColumn>작성자</KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>
                  {methods.getValues('author').name}
                </KeyValueTable.ValueColumn>
              </>
            )}
            {methods.getValues('createdAt') && (
              <>
                <KeyValueTable.KeyColumn>생성일시</KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>
                  {methods.getValues('createdAt')}
                </KeyValueTable.ValueColumn>
              </>
            )}
            <KeyValueTable.KeyColumn>캠페인 액션 이름</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowBasicInputField
                name={'name'}
                placeholder="이름을 입력해주세요."
                validateInRules={(v) =>
                  validators.run([
                    validators.validateInRulesStrMinMax(v, 5, 40),
                  ])
                }
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>설명</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowBasicInputField
                name={'description'}
                placeholder="설명을 입력해주세요."
                validateInRules={(v) =>
                  validators.run([
                    validators.validateInRulesStrMinMax(v, 5, 40),
                  ])
                }
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>캠페인 리스트</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <Flex justifyContent="end">
                <Button
                  size="small"
                  variant="primary"
                  type="button"
                  onClick={methods.handleSubmit(onSubmitThenGoToCampaign)}
                  disabled={!methods.formState.isValid}
                >
                  캠페인 추가
                </Button>
              </Flex>
              {data && data.campaigns.length > 0 ? (
                <>
                  <Spacing px={10} />
                  <ActionFormRowCampaignListTable
                    data={data.campaigns}
                    actionId={data.id}
                  />
                </>
              ) : (
                <Flex justifyContent="center">
                  <Text
                    typography="body16"
                    weight="regular"
                    color={colors.light.scheme.$gray40}
                  >
                    등록된 캠페인이 없습니다.
                  </Text>
                </Flex>
              )}
            </KeyValueTable.ValueColumn>
            <FormRowValidateNSubmit
              onValidate={() => methods.trigger()}
              isValid={methods.formState.isValid}
            />
          </KeyValueTable.Root>
        </form>
      </FormProvider>
    </>
  )
}
