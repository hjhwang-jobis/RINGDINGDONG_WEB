import { Column, Table } from '@3o3-internal/components'
import { Checkbox } from '@fe3o3/ui'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { RoutePath } from '~/routes'
import { GetTesters } from '~/types/api'

interface Props {
  data: GetTesters.Tester[]
  onSelect: (selectedIdxList: number[]) => void
}

export default function TesterListTable({ data, onSelect }: Props) {
  const columns = useMemo<Column<GetTesters.Tester>[]>(
    () => [
      {
        id: 'rowCheckbox',
        Header: ({ getToggleAllRowsSelectedProps, toggleAllRowsSelected }) => {
          const { checked } = getToggleAllRowsSelectedProps()

          return (
            <Checkbox
              checked={checked}
              onCheck={(isChecked) => {
                toggleAllRowsSelected(isChecked)
              }}
            />
          )
        },
        Cell: ({ row }: { row: any }) => {
          return (
            <Checkbox
              checked={row.getToggleRowSelectedProps().checked}
              onCheck={(isChecked) => {
                row.toggleRowSelected(isChecked)
              }}
            />
          )
        },
      },
      {
        Header: 'id',
        accessor: 'id',
        Cell: ({ value }) => {
          const to = `${RoutePath.Tester}/${RoutePath.EditTester}/${value}`

          return <Link to={to}>{value}</Link>
        },
      },
      {
        Header: 'userId',
        accessor: 'userId',
      },
      {
        Header: 'note',
        accessor: 'note',
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

  return (
    <Table
      columns={columns}
      data={data}
      onSelectedRowsChange={(items) => {
        onSelect(items.map(({ original: { id } }) => id))
      }}
    />
  )
}
