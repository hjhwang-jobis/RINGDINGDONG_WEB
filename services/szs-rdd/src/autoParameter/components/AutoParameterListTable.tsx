import { Column, Table } from '@3o3-internal/components'
import React, { useMemo } from 'react'

import { Parameter } from '~/types'

interface Props {
  data: Parameter[]
}

export default function AutoParameterListTable({ data }: Props) {
  const columns = useMemo<Column<Parameter>[]>(
    () => [
      {
        Header: 'id',
        accessor: 'id',
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
