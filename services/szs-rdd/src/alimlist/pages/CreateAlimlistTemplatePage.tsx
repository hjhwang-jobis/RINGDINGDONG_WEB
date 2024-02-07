import { Text } from '@3o3/mystique-components'

import AlimlistForm from '~/alimlist/components/AlimlistForm'
import PageContainer from '~/components/PageContainer'

export default function CreatePushTemplatePage() {
  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        알림리스트 템플릿 생성
      </Text>
      <AlimlistForm />
    </PageContainer>
  )
}
