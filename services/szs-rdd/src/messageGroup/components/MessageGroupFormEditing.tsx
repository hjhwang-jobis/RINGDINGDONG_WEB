import { ErrorModal, useModal } from '@3o3-internal/components'
import React from 'react'

import { MessageChannelType, SendProfile } from '~/constants'
import { usePutMessageGroupsMutation } from '~/hooks/queries/messageGroup/usePutMessageGroupsMutation'
import { FormData } from '~/messageGroup/types'
import { canContainAlimlist } from '~/messageGroup/utils'
import { MessageGroup, Parameter } from '~/types'
import { parameterUtils } from '~/utils'

import MessageGroupForm from './MessageGroupForm'

interface Props {
  messageChannelType: MessageChannelType
  sendProfile: SendProfile
  data: MessageGroup
  autoParameters: Parameter[]
  personalParameters: Parameter[]
}

export default function MessageGroupFormEditing({
  messageChannelType,
  sendProfile,
  data,
  autoParameters,
  personalParameters,
}: Props) {
  const { showModal } = useModal()
  const { mutate } = usePutMessageGroupsMutation({
    onSuccess: () => {},
    onError: (error) => {
      showModal(ErrorModal, {
        title: '메시지 그룹 수정 오류',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      })
    },
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
