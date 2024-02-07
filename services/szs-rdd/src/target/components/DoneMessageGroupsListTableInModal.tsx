import { Column, Table } from '@3o3-internal/components'
import { Checkbox } from '@fe3o3/ui'
import React, { useMemo } from 'react'

import { GetDoneMessageGroupsList } from '~/types/api'

interface Props {
  data: GetDoneMessageGroupsList.MessageGroup[]
  unselectableIdList?: number[]
  onSelected: (
    selectedQueryIdList: GetDoneMessageGroupsList.MessageGroup[]
  ) => void
}

export default function DoneMessageGroupsListTable({
  data,
  unselectableIdList = [],
  onSelected,
}: Props) {
  const unselectableQueryIdSet = unselectableIdList.reduce(
    (acc, v) => acc.add(v),
    new Set()
  )

  const columns = useMemo<Column<GetDoneMessageGroupsList.MessageGroup>[]>(
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
          const isUnSelectable = unselectableQueryIdSet.has(row.original.id)

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
        Header: '캠페인 이름',
        accessor: 'campaign',
        Cell: ({ value }) => value.name,
      },
      {
        Header: '메세지 그룹명',
        accessor: 'name',
      },
      {
        Header: '발송 종료 시각',
        accessor: 'updatedAt',
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
