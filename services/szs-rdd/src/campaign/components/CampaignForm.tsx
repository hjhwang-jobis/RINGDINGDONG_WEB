import { Flex, Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { ErrorModal, useModal } from '@3o3-internal/components'
import { css } from '@emotion/react'
import { Button } from '@fe3o3/ui'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowSelectMessageChannel from '~/components/FormRowSelectMessageChannel'
import FormRowSelectSendProfile from '~/components/FormRowSelectSendProfile'
import FormRowValidateNSubmit from '~/components/FormRowValidateNSubmit'
import KeyValueTable from '~/components/KeyValueTable'
import { MessageChannelType, SendProfile } from '~/constants'
import { usePostCampaignsMutation } from '~/hooks/queries/campaign/usePostCampaignsMutation'
import { usePutCampaignsMutation } from '~/hooks/queries/campaign/usePutCampaignsMutation'
import { RoutePath } from '~/routes'
import { Campaign, MessageGroup } from '~/types'
import { authorUtils, validators } from '~/utils'

import CampaignFormTargetSearchModal from './CampaignFormModalTargetList'
import CampaignFormRowMessageGroupList from './CampaignFormRowMessageGroupList'
import CampaignFormRowTargetTable from './CampaignFormRowTargetTable'

interface Props {
  data?: Campaign
  actionId?: number
}

const sanitizeMessageGroups = (messageGroups: MessageGroup[]) =>
  messageGroups.map((v) => ({
    ...v,
    partitionFrom: Number(v.partitionFrom),
    partitionTo: Number(v.partitionTo),
  }))

export default function CampaignForm({ data, actionId }: Props) {
  const navigate = useNavigate()
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      id: data?.id ?? -1,
      createdAt: data?.createdAt ?? '',
      updatedAt: data?.updatedAt ?? '',
      name: data?.name ?? '',
      actionId: data?.actionId ?? actionId ?? -1,
      targetId: data?.targetId ?? -1,
      messageChannel: data?.messageChannel ?? MessageChannelType.FRIENDTALK,
      sendProfile: data?.sendProfile ?? SendProfile.SZS,
      author: data?.author ?? authorUtils.getAuthorEmpty(),
      messageGroups: data?.messageGroups ?? [],
    },
  })

  const { showModal } = useModal()
  const { mutate: mutatePostCampaigns } = usePostCampaignsMutation({
    onSuccess: () =>
      navigate(`${RoutePath.Action}/${RoutePath.ActionDetail}/${actionId}`),
    onError: (error) => {
      showModal(ErrorModal, {
        title: '캠페인 생성 오류',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      })
    },
  })

  const { mutate: mutatePutCampaigns } = usePutCampaignsMutation({
    onSuccess: () =>
      navigate(
        `${RoutePath.Campaign}/${RoutePath.CampaignDetail}/${methods.getValues(
          'id'
        )}`
      ),
    onError: (error) => {
      showModal(ErrorModal, {
        title: '캠페인 수정 오류',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      })
    },
  })

  const isEditMode = data && data.id > 0

  const onSubmit = (data: Campaign) => {
    if (isEditMode) {
      mutatePutCampaigns({
        id: data.id,
        name: data.name,
        messageChannel: data.messageChannel,
        sendProfile: data.sendProfile,
        actionId: data.actionId,
        targetId: data.targetId,
        messageGroups: sanitizeMessageGroups(data.messageGroups),
      })

      return
    }
    mutatePostCampaigns({
      name: data.name,
      messageChannel: data.messageChannel,
      sendProfile: data.sendProfile,
      actionId: data.actionId,
      targetId: data.targetId,
      messageGroups: sanitizeMessageGroups(data.messageGroups),
    })
  }

  const messageChannel = methods.watch('messageChannel')
  const isSendProfileEnabled =
    messageChannel === MessageChannelType.ALIMTALK ||
    messageChannel === MessageChannelType.FRIENDTALK

  const targetId = methods.watch('targetId')
  const messageGroups = methods.watch('messageGroups')
  const isValidForm = messageGroups.length > 0 && targetId > 0

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <KeyValueTable.Root>
          {data && (
            <>
              <KeyValueTable.KeyColumn>id</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>{data.id}</KeyValueTable.ValueColumn>
              <KeyValueTable.KeyColumn>작성자</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                {data.author.name}
              </KeyValueTable.ValueColumn>
              <KeyValueTable.KeyColumn>생성일시</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                {data.createdAt}
              </KeyValueTable.ValueColumn>
            </>
          )}
          <KeyValueTable.KeyColumn>액션 id</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            {methods.getValues('actionId')}
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>캠페인 이름</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowBasicInputField
              name={'name'}
              placeholder="캠페인 이름을 입력해주세요."
              validateInRules={(v) =>
                validators.run([validators.validateInRulesStrMinMax(v, 5, 40)])
              }
            />
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>발송채널 설정</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowSelectMessageChannel name={'messageChannel'} />
          </KeyValueTable.ValueColumn>
          {/* NOTE: isSendProfileEnabled가 아니라면 sendProfile은 NONE 또는 빈값을 보낸다. */}
          {isSendProfileEnabled && (
            <>
              <KeyValueTable.KeyColumn>발신프로필 설정</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                <FormRowSelectSendProfile name={'sendProfile'} />
              </KeyValueTable.ValueColumn>
            </>
          )}
          <KeyValueTable.KeyColumn>타겟 설정</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <Button
              variant="lineBlue"
              size="small"
              type="button"
              onClick={() => {
                showModal(CampaignFormTargetSearchModal, {
                  callback: (targetId) =>
                    methods.setValue('targetId', targetId),
                  selectedId: targetId,
                })
              }}
            >
              타겟 추가
            </Button>
            {targetId > 0 ? (
              <>
                <Spacing px={10} />
                <CampaignFormRowTargetTable targetId={targetId} />
              </>
            ) : (
              <Flex
                justifyContent="center"
                alignItems="center"
                css={css`
                  padding: 10px;
                `}
              >
                <Text
                  typography="body16"
                  weight="regular"
                  color={colors.light.scheme.$gray40}
                >
                  등록된 타겟이 없습니다.
                </Text>
              </Flex>
            )}
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>메시지그룹</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <CampaignFormRowMessageGroupList />
          </KeyValueTable.ValueColumn>
          <FormRowValidateNSubmit
            onValidate={() => methods.trigger()}
            isValid={methods.formState.isValid && isValidForm}
          />
        </KeyValueTable.Root>
      </form>
    </FormProvider>
  )
}
