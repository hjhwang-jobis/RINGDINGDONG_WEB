import { Text } from '@3o3/mystique-components'

import PageContainer from '~/components/PageContainer'
import PushForm from '~/push/components/PushForm'

export default function CreatePushTemplatePage() {
  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        앱 푸시 템플릿 생성
      </Text>
      <PushForm />
    </PageContainer>
  )
}
