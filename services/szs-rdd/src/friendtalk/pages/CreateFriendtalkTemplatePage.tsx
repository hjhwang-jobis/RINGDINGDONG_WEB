import { Text } from '@3o3/mystique-components'

import PageContainer from '~/components/PageContainer'
import { PageMode } from '~/constants'
import FriendtalkForm from '~/friendtalk/components/FriendtalkForm'

export default function CreateFriendtalkTemplatePage() {
  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        친구톡 템플릿 생성
      </Text>
      <FriendtalkForm pageMode={PageMode.EDIT} />
    </PageContainer>
  )
}
