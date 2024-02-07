import { Column, Table } from '@3o3-internal/components'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { RoutePath } from '~/routes'
import { GetActions } from '~/types/api'

interface Props {
  data: GetActions.Action[]
}

export default function ActionListTable({ data }: Props) {
  const columns = useMemo<Column<GetActions.Action>[]>(
    () => [
      {
        Header: 'id',
        accessor: 'id',
        Cell: ({ value }) => (
          <Link to={`${RoutePath.Action}/${RoutePath.ActionDetail}/${value}`}>
            {value}
          </Link>
        ),
      },
      {
        Header: '액션 이름',
        accessor: 'name',
        Cell: ({ value, row }) => (
          <Link
            to={`${RoutePath.Action}/${RoutePath.ActionDetail}/${row.original.id}`}
          >
            {value}
          </Link>
        ),
      },
      {
        Header: '액션 설명',
        accessor: 'description',
      },
      {
        Header: '작성자',
        accessor: 'author',
        Cell: ({ value }) => value.name,
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
