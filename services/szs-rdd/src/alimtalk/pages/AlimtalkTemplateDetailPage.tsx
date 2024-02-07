import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import AlimtalkTemplateDetail from '~/alimtalk/components/AlimtalkTemplateDetail'
import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { AlimtalkChannelType } from '~/constants'
import { useGetAlimtalkTemplatesMatchedParametersQuery } from '~/hooks/queries/alimtalk/useGetAlimtalkTemplatesMatchedParametersQuery'
import { useGetAlimtalkTemplatesQuery } from '~/hooks/queries/alimtalk/useGetAlimtalkTemplatesQuery'
import { apiUtils } from '~/utils'

export default function AlimtalkTemplateDetailPage() {
  const { profile, templateCode } = useParams()
  const [searchParams] = useSearchParams()
  const active = searchParams.get('active') === 'true'

  const {
    data: response,
    isLoading,
    error,
  } = useGetAlimtalkTemplatesQuery({
    templateCode: templateCode ?? '',
    profile: (profile ?? '') as AlimtalkChannelType,
  })

  const {
    data: responseMatchedParameters,
    isLoading: isLoadingMatchedParameters,
    error: errorMatchedParameters,
  } = useGetAlimtalkTemplatesMatchedParametersQuery({
    templateCode: templateCode ?? '',
    profile: (profile ?? '') as AlimtalkChannelType,
  })

  if (active) {
    return (
      <PageContainer>
        <Text typography="heading40" weight="bold">
          알림톡 템플릿 상세정보
        </Text>
        {isLoading || isLoadingMatchedParameters ? (
          <Loader />
        ) : error ? (
          <ErrorInfo
            title="알림톡 템플릿 상세정보 조회 오류"
            message={apiUtils.getApiErrorMessage(error)}
          />
        ) : errorMatchedParameters ? (
          <ErrorInfo
            title="알림톡 템플릿 파라미터 매칭 정보 조회 오류"
            message={apiUtils.getApiErrorMessage(errorMatchedParameters)}
          />
        ) : response && response.data ? (
          <AlimtalkTemplateDetail
            data={response.data}
            dataMatchedParameters={responseMatchedParameters.data}
          />
        ) : null}
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        알림톡 템플릿 상세정보
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="알림톡 템플릿 상세정보 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <AlimtalkTemplateDetail data={response.data} />
      ) : null}
    </PageContainer>
  )
}
