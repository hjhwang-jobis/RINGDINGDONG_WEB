import { Text } from '@3o3/mystique-components'
import React from 'react'

import PageContainer from '~/components/PageContainer'
import TargetForm from '~/target/components/TargetForm'

export default function CreateTargetPage() {
  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        타겟 생성
      </Text>
      <TargetForm />
    </PageContainer>
  )
}
