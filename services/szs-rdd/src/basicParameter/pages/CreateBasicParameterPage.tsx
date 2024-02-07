import { Text } from '@3o3/mystique-components'
import React from 'react'

import BasicParameterForm from '~/basicParameter/components/BasicParameterForm'
import PageContainer from '~/components/PageContainer'

export default function CreateBasicParameterPage() {
  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        기본 파라미터 생성
      </Text>
      <BasicParameterForm />
    </PageContainer>
  )
}
