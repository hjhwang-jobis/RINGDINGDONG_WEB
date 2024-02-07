import { Text } from '@3o3/mystique-components'

import PageContainer from '~/components/PageContainer'
import TesterForm from '~/tester/components/TesterForm'

export default function RegisterTesterPage() {
  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        테스터 등록하기
      </Text>
      <TesterForm />
    </PageContainer>
  )
}
