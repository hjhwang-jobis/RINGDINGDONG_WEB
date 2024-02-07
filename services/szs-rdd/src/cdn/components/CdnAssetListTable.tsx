import { Flex } from '@3o3/mystique-components'
import { Column, Table } from '@3o3-internal/components'
import React, { useMemo } from 'react'

import Thumbnail, { Size } from '~/components/Thumbnail'
import { CdnAssetGroupMap } from '~/constants'
import { GetCdnAssetsList } from '~/types/api'

interface Props {
  data: GetCdnAssetsList.CdnAsset[]
}

export default function CdnAssetListTable({ data }: Props) {
  const columns = useMemo<Column<GetCdnAssetsList.CdnAsset>[]>(
    () => [
      {
        Header: 'id',
        accessor: 'assetId',
      },
      {
        Header: '이미지',
        accessor: 'fullAssetUrl',
        Cell: ({ value }) => {
          return (
            <Flex justifyContent="center">
              <Thumbnail imgUrl={value} size={Size.SMALL} />
            </Flex>
          )
        },
      },
      {
        Header: '파일이름',
        accessor: 'originName',
        Cell: ({ value, row }) => {
          return (
            <a
              href={row.original.fullAssetUrl}
              target="_blank"
              rel="noreferrer"
            >
              {value}
            </a>
          )
        },
      },
      {
        Header: '그룹명',
        accessor: 'assetGroup',
        Cell: ({ value }) => CdnAssetGroupMap[value],
      },

      {
        Header: '생성일자',
        accessor: 'createdAt',
      },
      {
        Header: '삭제일자',
        accessor: 'deletedAt',
      },
    ],
    []
  )

  return <Table columns={columns} data={data} />
}
