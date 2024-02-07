import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE_LARGE,
  MessageChannelType,
  SendProfile,
} from '~/constants'
import { useGetParametersAutosListQuery } from '~/hooks/queries/autoParameter/useGetParametersAutosListQuery'
import { useGetMessageGroupsQuery } from '~/hooks/queries/messageGroup/useGetMessageGroupsQuery'
import { useGetParametersPersonalsListQuery } from '~/hooks/queries/personalParameter/useGetParametersPersonalsListQuery'
import MessageGroupFormEditing from '~/messageGroup/components/MessageGroupFormEditing'
import { apiUtils } from '~/utils'

export default function EditMessageGroupPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const messageChannelType = searchParams.get(
    'messageChannel'
  ) as MessageChannelType
  const sendProfile = searchParams.get('sendProfile') as SendProfile
  const {
    data: response,
    isLoading,
    error,
  } = useGetMessageGroupsQuery({
    messageGroupId: Number(id) ?? -1,
  })

  const {
    data: responsePersonalParameters,
    isLoading: isLoadingPersonalParameters,
    error: errorPersonalParameters,
  } = useGetParametersPersonalsListQuery({
    pageSize: DEFAULT_PAGE_SIZE_LARGE,
    pageNo: DEFAULT_PAGE_NO,
  })

  const {
    data: responseAutoParameters,
    isLoading: isLoadingAutoParameters,
    error: errorAutoParameters,
  } = useGetParametersAutosListQuery({
    pageSize: DEFAULT_PAGE_SIZE_LARGE,
    pageNo: DEFAULT_PAGE_NO,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        메시지그룹 수정 페이지
      </Text>
      {isLoading || isLoadingPersonalParameters || isLoadingAutoParameters ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="메시지그룹 상세정보 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : errorPersonalParameters ? (
        <ErrorInfo
          title="개인정보 파라미터 조회 오류"
          message={apiUtils.getApiErrorMessage(errorPersonalParameters)}
        />
      ) : errorAutoParameters ? (
        <ErrorInfo
          title="자동계산 파라미터 조회 오류"
          message={apiUtils.getApiErrorMessage(errorAutoParameters)}
        />
      ) : response &&
        response.data &&
        responsePersonalParameters &&
        responseAutoParameters &&
        messageChannelType ? (
        <MessageGroupFormEditing
          data={response.data}
          autoParameters={responseAutoParameters.data.contents}
          personalParameters={responsePersonalParameters.data.contents}
          messageChannelType={messageChannelType}
          sendProfile={sendProfile}
        />
      ) : null}
    </PageContainer>
  )
}
