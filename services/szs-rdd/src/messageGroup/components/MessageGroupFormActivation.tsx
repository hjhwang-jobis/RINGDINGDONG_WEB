import { ErrorModal, useModal } from '@3o3-internal/components'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { MessageChannelType, SendProfile } from '~/constants'
import { usePutMessageGroupsActivateMutation } from '~/hooks/queries/messageGroup/usePutMessageGroupsActivateMutation'
import { FormData } from '~/messageGroup/types'
import { canContainAlimlist } from '~/messageGroup/utils'
import { RoutePath } from '~/routes'
import { MessageGroup, Parameter } from '~/types'
import { parameterUtils } from '~/utils'

import MessageGroupForm from './MessageGroupForm'

interface Props {
  messageChannelType: MessageChannelType
  sendProfile: SendProfile
  data: MessageGroup
  autoParameters: Parameter[]
  personalParameters: Parameter[]
  campaignId: number
}

export default function MessageGroupFormActivation({
  messageChannelType,
  sendProfile,
  data,
  autoParameters,
  personalParameters,
  campaignId,
}: Props) {
  const { showModal } = useModal()
  const navigate = useNavigate()
  const { mutate } = usePutMessageGroupsActivateMutation({
    onSuccess: () =>
      navigate(
        `${RoutePath.Campaign}/${RoutePath.CampaignDetail}/${campaignId}`
      ),
    onError: (error) =>
      showModal(ErrorModal, {
        title: '메시지 그룹 활성화 오류',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      }),
  })

  const onSubmit = (data: FormData) => {
    const { formMessageGroupTemplates, sendingRequestAt } = data
    if (!formMessageGroupTemplates || !sendingRequestAt) {
      return
    }
    mutate({
      messageGroupId: data.id,
      sendingRequestAt,
      messageGroupTemplates: formMessageGroupTemplates.map((item) => ({
        messageChannel: messageChannelType,
        sendProfile: sendProfile,
        templateCode: item.templateCode,
        parameters: JSON.stringify(
          item.parameterRows.reduce(
            (acc, v) => ({
              ...acc,
              [parameterUtils.extractReplaceableKey(v.key)]: v.value,
            }),
            {}
          )
        ),
        isContainAlimlist: canContainAlimlist(messageChannelType)
          ? item.isContainAlimlist
          : false,
      })),
    })
  }

  return (
    <MessageGroupForm
      messageChannelType={messageChannelType}
      sendProfile={sendProfile}
      data={data}
      autoParameters={autoParameters}
      personalParameters={personalParameters}
      onSubmit={onSubmit}
    />
  )
}
