import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import { useParams } from 'react-router-dom'

import AlimlistForm from '~/alimlist/components/AlimlistForm'
import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { useGetAlimlistTemplatesQuery } from '~/hooks/queries/alimlist/useGetAlimlistTemplatesQuery'
import { apiUtils } from '~/utils'

export default function CopyAlimlistTemplatePage() {
  const { templateCode } = useParams()

  const {
    isLoading,
    error,
    data: response,
  } = useGetAlimlistTemplatesQuery({
    templateCode: templateCode ?? '',
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        알림리스트 템플릿 복사
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="알림리스트 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <AlimlistForm
          data={{
            templateCode: response.data.templateCode,
            title: response.data.title,
            subTitle: response.data.subTitle,
            imageUrl: response.data.imageUrl,
            buttonRequests: JSON.parse(response.data.button),
            notificationType: response.data.notificationType,
            requestParameter: response.data.requestParameter,
            autoFillParameter: response.data.autoFillParameter,
          }}
        />
      ) : null}
    </PageContainer>
  )
}
