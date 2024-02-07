import { Column, Table } from '@3o3-internal/components'
import { Checkbox } from '@fe3o3/ui'
import React, { useMemo } from 'react'

import { GetTargets } from '~/types/api'

interface Props {
  data: GetTargets.TargetQuery[]
  unselectableQueryIdList?: string[]
  onSelected: (selectedQueryIdList: GetTargets.TargetQuery[]) => void
}

export default function TargetQueryListTable({
  data,
  unselectableQueryIdList = [],
  onSelected,
}: Props) {
  const unselectableQueryIdSet = unselectableQueryIdList.reduce(
    (acc, v) => acc.add(v),
    new Set()
  )

  const columns = useMemo<Column<GetTargets.TargetQuery>[]>(
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
        // FIX ME: react-query의 Row 타입을 가져와 적용해야 합니다.
        Cell: ({ row }: { row: any }) => {
          const isUnSelectable = unselectableQueryIdSet.has(
            row.original.queryId
          )

          return (
            <Checkbox
              checked={row.getToggleRowSelectedProps().checked}
              onCheck={(isChecked) => {
                row.toggleRowSelected(isChecked)
              }}
              disabled={isUnSelectable}
            />
          )
        },
      },
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: '쿼리 ID',
        accessor: 'queryId',
      },
      {
        Header: '쿼리 제목',
        accessor: 'title',
      },
    ],
    [unselectableQueryIdSet]
  )

  return (
    <Table
      columns={columns}
      data={data}
      onSelectedRowsChange={(items) =>
        onSelected(items.map(({ original }) => original))
      }
    />
  )
}
