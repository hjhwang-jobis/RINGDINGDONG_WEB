import { Column, Table } from '@3o3-internal/components'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { RoutePath } from '~/routes'
import { Parameter } from '~/types'

interface Props {
  data: Parameter[]
}

export default function BasicParameterListTable({ data }: Props) {
  const columns = useMemo<Column<Parameter>[]>(
    () => [
      {
        Header: 'id',
        accessor: 'id',
        Cell: ({ value, row }) => (
          <Link
            to={`${RoutePath.BasicParameter}/${RoutePath.EditBasicParameter}/${row.original.id}`}
          >
            {value}
          </Link>
        ),
      },
      {
        Header: '타이틀',
        accessor: 'title',
      },
      {
        Header: '파라미터값',
        accessor: 'parameter',
      },
      {
        Header: '쿼리 상세 설명',
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
