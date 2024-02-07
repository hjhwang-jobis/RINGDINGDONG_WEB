import { Text } from '@3o3/mystique-components'
import {
  ConfirmModal,
  ErrorInfo,
  ErrorModal,
  useModal,
} from '@3o3-internal/components'
import { useParams } from 'react-router-dom'

import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import SectionFormSendTestMessageForm from '~/components/SectionFormSendTestMessage'
import { useGetPushTemplatesQuery } from '~/hooks/queries/push/useGetPushTemplatesQuery'
import { usePostPushSendMutation } from '~/hooks/queries/push/usePostPushSendMutation'
import PushForm from '~/push/components/PushForm'
import { apiUtils } from '~/utils'

export default function PushTemplateDetailPage() {
  const { templateCode } = useParams()

  const {
    isLoading,
    error,
    data: response,
  } = useGetPushTemplatesQuery({
    templateCode: templateCode ?? '',
  })

  const { showModal } = useModal()
  const { mutate } = usePostPushSendMutation({
    onSuccess: () => {
      showModal(ConfirmModal, {
        title: '메시지 발송 성공',
      })
    },
    onError: (error) => {
      showModal(ErrorModal, {
        title: '푸시 테스트 메시지 발송 오류',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      })
    },
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        앱 푸시 템플릿 상세
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="앱 푸시 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <>
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
            readOnly
          />
          <SectionFormSendTestMessageForm
            replacableText={[response.data.title, response.data.body].join('')}
            onSubmit={({
              userId,
              requestParameter,
              autoFillParameter,
              containsAlimlist,
            }) => {
              mutate({
                templateCode: response.data.templateCode,
                userId,
                templateParameter: requestParameter,
                autoFillParameter,
                containsAlimlist,
              })
            }}
            canContainAlimlist={true}
          />
        </>
      ) : null}
    </PageContainer>
  )
}
