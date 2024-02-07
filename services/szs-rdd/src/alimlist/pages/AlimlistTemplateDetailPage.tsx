import { Text } from '@3o3/mystique-components'
import {
  ConfirmModal,
  ErrorInfo,
  ErrorModal,
  useModal,
} from '@3o3-internal/components'
import { useParams } from 'react-router-dom'

import AlimlistForm from '~/alimlist/components/AlimlistForm'
import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import SectionFormSendTestMessageForm from '~/components/SectionFormSendTestMessage'
import { useGetAlimlistTemplatesQuery } from '~/hooks/queries/alimlist/useGetAlimlistTemplatesQuery'
import { usePostAlimlistSendMutation } from '~/hooks/queries/alimlist/usePostAlimlistSendMutation'
import { apiUtils } from '~/utils'

export default function AlimlistTemplateDetailPage() {
  const { templateCode } = useParams()

  const {
    isLoading,
    error,
    data: response,
  } = useGetAlimlistTemplatesQuery({
    templateCode: templateCode ?? '',
  })

  const { showModal } = useModal()
  const { mutate } = usePostAlimlistSendMutation({
    onSuccess: () => {
      showModal(ConfirmModal, {
        title: '메시지 발송 성공',
      })
    },
    onError: (error) => {
      showModal(ErrorModal, {
        title: '알림리스트 테스트 발송실패',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      })
    },
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        알림리스트 템플릿 상세
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="알림리스트 템플릿 상세 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <>
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
            readOnly
          />
          <SectionFormSendTestMessageForm
            replacableText={[response.data.title, response.data.subTitle].join(
              ''
            )}
            onSubmit={({ userId, requestParameter, autoFillParameter }) => {
              mutate({
                userId,
                templateCode: response.data.templateCode,
                requestParameter,
                autoFillParameter,
              })
            }}
          />
        </>
      ) : null}
    </PageContainer>
  )
}
