import { Text } from '@3o3/mystique-components'

import UploadCdnAssetForm from '~/cdn/components/UploadCdnAssetForm'
import PageContainer from '~/components/PageContainer'

export default function UploadCdnAssetPage() {
  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        CDN 이미지 업로드
      </Text>
      <UploadCdnAssetForm />
    </PageContainer>
  )
}
