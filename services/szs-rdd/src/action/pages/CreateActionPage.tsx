import { Text } from '@3o3/mystique-components'
import React from 'react'

import ActionForm from '~/action/components/ActionForm'
import PageContainer from '~/components/PageContainer'

export default function CreateActionPage() {
  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        액션 생성
      </Text>
      <ActionForm />
    </PageContainer>
  )
}
