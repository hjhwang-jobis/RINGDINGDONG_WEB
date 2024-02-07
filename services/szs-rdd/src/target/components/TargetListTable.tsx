import { Column, Table } from '@3o3-internal/components'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { RoutePath } from '~/routes'
import { GetTargets } from '~/types/api'

interface Props {
  data: GetTargets.Target[]
}

export default function TargetListTable({ data }: Props) {
  const columns = useMemo<Column<GetTargets.Target>[]>(
    () => [
      {
        Header: 'id',
        accessor: 'id',
        Cell: ({ value }) => (
          <Link to={`${RoutePath.Target}/${RoutePath.EditTarget}/${value}`}>
            {value}
          </Link>
        ),
      },
      {
        Header: '타겟 id',
        accessor: 'targetId',
        Cell: ({ value, row }) => {
          const {
            original: { id },
          } = row

          return (
            <Link to={`${RoutePath.Target}/${RoutePath.EditTarget}/${id}`}>
              {value}
            </Link>
          )
        },
      },
      {
        Header: 'title',
        accessor: 'title',
      },
      {
        Header: '생성일자',
        accessor: 'createdAt',
      },
      {
        Header: '수정일자',
        accessor: 'updatedAt',
      },
    ],
    []
  )

  return <Table columns={columns} data={data} />
}
