import { Text } from '@3o3/mystique-components'
import React from 'react'

import PageContainer from '~/components/PageContainer'
import TargetQueryForm from '~/targetQuery/components/TargetQueryForm'

export default function CreateTargetQueryPage() {
  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        타겟 쿼리 생성
      </Text>
      <TargetQueryForm />
    </PageContainer>
  )
}
