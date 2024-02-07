import { Text } from '@3o3/mystique-components'

import PageContainer from '~/components/PageContainer'
import UploadFriendtalkTemplateImageForm from '~/friendtalkImage/components/UploadFriendtalkTemplateImageForm'

export default function UploadFriendtalkTemplateImagePage() {
  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        친구톡 템플릿 이미지 업로드
      </Text>
      <UploadFriendtalkTemplateImageForm />
    </PageContainer>
  )
}
