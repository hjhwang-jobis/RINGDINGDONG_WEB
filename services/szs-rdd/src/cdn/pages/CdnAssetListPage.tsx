import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import CdnAssetList from '~/cdn/components/CdnAssetList'
import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from '~/constants'
import { CdnAssetGroup } from '~/constants'
import { useGetCdnAssetsListQuery } from '~/hooks/queries/cdn/useGetCdnAssetsListQuery'
import { apiUtils } from '~/utils'

export default function CdnAssetListPage() {
  const [searchParams] = useSearchParams({
    size: `${DEFAULT_PAGE_SIZE}`,
    page: `${DEFAULT_PAGE_NO}`,
    assetGroup: CdnAssetGroup.AlimList,
  })

  const params = {
    pageSize: Number(searchParams.get('size')),
    pageNo: Number(searchParams.get('page')) - 1,
    assetGroup: searchParams.get('assetGroup') as CdnAssetGroup,
  }

  const {
    data: response,
    isLoading,
    error,
  } = useGetCdnAssetsListQuery({
    ...params,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        CDN Asset 목록 조회
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="cdn asset 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data?.contents ? (
        <CdnAssetList
          data={response.data.contents}
          assetGroup={params.assetGroup}
          pagination={{
            pageSize: response.data.pageSize,
            pageNo: response.data.pageNo,
            totalElements: response.data.totalElements,
            totalPage: response.data.totalPage,
          }}
        />
      ) : null}
    </PageContainer>
  )
}
