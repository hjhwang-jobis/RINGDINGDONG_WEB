import { Column, Table } from '@3o3-internal/components'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { MessageChannelTypeMap } from '~/constants'
import { RoutePath } from '~/routes'
import { Campaign } from '~/types'

interface Props {
  data: Campaign[]
  actionId: number
}

export default function ActionFormRowCampaignListTable({ data }: Props) {
  const columns = useMemo<Column<Campaign>[]>(
    () => [
      {
        Header: 'id',
        accessor: 'id',
        Cell: ({ value }) => (
          <Link
            to={`${RoutePath.Campaign}/${RoutePath.CampaignDetail}/${value}`}
          >
            {value}
          </Link>
        ),
      },
      {
        Header: '캠페인 이름',
        accessor: 'name',
        Cell: ({ value, row }) => (
          <Link
            to={`${RoutePath.Campaign}/${RoutePath.CampaignDetail}/${row.original.id}`}
          >
            {value}
          </Link>
        ),
      },
      {
        Header: '발송 채널',
        accessor: 'messageChannel',
        Cell: ({ value }) => MessageChannelTypeMap[value],
      },
      {
        Header: '발송요청건수',
        accessor: 'requestedCount',
      },
      {
        Header: '발송건수',
        accessor: 'sentCount',
      },
      {
        Header: '발송실패건수',
        accessor: 'failedCount',
      },
      {
        Header: '수신건수',
        accessor: 'succeedCount',
      },
    ],
    []
  )

  return <Table columns={columns} data={data} />
}
