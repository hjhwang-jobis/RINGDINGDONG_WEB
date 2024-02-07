import {
  BaseModal,
  Column,
  ErrorInfo,
  Modal,
  Table,
} from '@3o3-internal/components'
import { Radio } from '@fe3o3/ui'
import { InfiniteData } from '@tanstack/react-query'
import React, { useMemo, useState } from 'react'

import InfiniteScrollBottom from '~/components/InfiniteScrollBottom'
import Loader from '~/components/Loader'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from '~/constants'
import { useGetTargetsListInfiniteQuery } from '~/hooks/queries/target/useGetTargetsListInfiniteQuery'
import { GetTargets, GetTargetsList, Response } from '~/types/api'
import { apiUtils } from '~/utils'

interface Props extends BaseModal {
  callback: (targetId: number) => void
  selectedId: number
}

export default function CampaignFormModalTargetList({
  modalKey,
  callback,
  selectedId,
}: Props) {
  const [id, setId] = useState(selectedId)

  const {
    data: response,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    error,
  } = useGetTargetsListInfiniteQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNo: DEFAULT_PAGE_NO - 1,
    },
    {}
  )

  return (
    <Modal
      modalKey={modalKey}
      hasCancel
      cancelVariant="secondary"
      size="xl"
      title="타겟 목록"
      onOkClick={() => callback(id)}
    >
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="친구톡 템플릿 이미지 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.pages ? (
        <>
          <TargetListTable
            response={response}
            onSelect={(id) => setId(id)}
            selectedId={id}
          />
          <InfiniteScrollBottom
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage ?? false}
            fetchNextPage={fetchNextPage}
          />
        </>
      ) : null}
    </Modal>
  )
}

interface TargetListTableProps {
  response: InfiniteData<Response<GetTargetsList.Response>>
  selectedId: number
  onSelect: (id: number) => void
}
function TargetListTable({
  response,
  selectedId,
  onSelect,
}: TargetListTableProps) {
  const data = response.pages.flatMap((group) => [...group.data.contents])

  const columns = useMemo<Column<GetTargets.Target>[]>(
    () => [
      {
        id: 'rowRadioButton',
        Cell: ({ row }: { row: any }) => {
          const isChecked = Number(row.original.id) === Number(selectedId)

          return (
            <Radio
              checked={isChecked}
              onCheck={(isChecked) => {
                row.toggleRowSelected(isChecked)
              }}
            />
          )
        },
      },
      {
        Header: '타겟',
        accessor: 'title',
      },
      {
        Header: '타겟 모수',
        accessor: 'estimatedTargetCount',
      },
    ],
    [selectedId]
  )

  return (
    <Table
      columns={columns}
      data={data}
      onSelectedRowsChange={(items) => {
        if (items && items.length > 0) {
          const id = items[0].original.id
          onSelect(Number(id))
        }
      }}
    />
  )
}
