import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import { useParams } from 'react-router-dom'

import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { useGetPushTemplatesQuery } from '~/hooks/queries/push/useGetPushTemplatesQuery'
import PushForm from '~/push/components/PushForm'
import { apiUtils } from '~/utils'

export default function CopyPushTemplatePage() {
  const { templateCode } = useParams()

  const {
    isLoading,
    error,
    data: response,
  } = useGetPushTemplatesQuery({
    templateCode: templateCode ?? '',
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        앱 푸시 템플릿 복사
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="앱푸쉬 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <PushForm
          data={{
            templateCode: response.data.templateCode,
            title: response.data.title,
            body: response.data.body,
            imageUrl: response.data.imageUrl,
            link: JSON.parse(response.data.data).link,
            requestParameter: response.data.requestParameter,
            autoFillParameter: response.data.autoFillParameter,
          }}
        />
      ) : null}
    </PageContainer>
  )
}
