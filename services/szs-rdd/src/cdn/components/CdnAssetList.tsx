import { Flex, Spacing } from '@3o3/mystique-components'
import { Pagination2 } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { RADIO_OPTION_LIST_CDN_ASSET_GROUP } from '~/cdn/constants'
import KeyValueTable from '~/components/KeyValueTable'
import RadioField from '~/components/RadioField'
import { CdnAssetGroup } from '~/constants'
import { RoutePath } from '~/routes'
import { GetCdnAssetsList, Pagination } from '~/types/api'

import CdnAssetListTable from './CdnAssetListTable'

interface Props {
  data: GetCdnAssetsList.CdnAsset[]
  assetGroup: CdnAssetGroup
  pagination: Pagination
}

export default function CdnAssetList({ data, assetGroup, pagination }: Props) {
  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  return (
    <>
      <Flex justifyContent="end">
        <Button
          size="small"
          variant="primary"
          style={{
            margin: '10px 0 10px 10px',
          }}
          onClick={() => {
            navigate(
              `${RoutePath.CdnAsset}/${RoutePath.UploadCdnAsset}?assetGroup=${assetGroup}`
            )
          }}
        >
          이미지 업로드
        </Button>
      </Flex>
      <KeyValueTable.Root>
        <KeyValueTable.KeyColumn>Asset 그룹</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <RadioField
            options={RADIO_OPTION_LIST_CDN_ASSET_GROUP}
            value={assetGroup}
            onChange={(v) =>
              setSearchParams({
                page: '1',
                size: `${pagination.pageSize}`,
                assetGroup: v,
              })
            }
          />
        </KeyValueTable.ValueColumn>
      </KeyValueTable.Root>
      <Spacing px={10} />
      <CdnAssetListTable data={data} />
      <Spacing px={10} />
      <Pagination2
        page={pagination.pageNo || 0}
        onChange={(pageNo) =>
          setSearchParams({
            page: `${pageNo + 1}`,
            size: `${pagination.pageSize}`,
            assetGroup,
          })
        }
        pageCount={pagination.totalPage}
      />
    </>
  )
}
