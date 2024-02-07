import { Flex, Text } from '@3o3/mystique-components'
import {
  BaseModal,
  Column,
  ErrorInfo,
  Modal,
  Table,
} from '@3o3-internal/components'
import { Checkbox } from '@fe3o3/ui'
import { InfiniteData } from '@tanstack/react-query'
import React, { useMemo, useRef } from 'react'

import InfiniteScrollBottom from '~/components/InfiniteScrollBottom'
import Loader from '~/components/Loader'
import Thumbnail, { Size } from '~/components/Thumbnail'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE, SortDirection } from '~/constants'
import { useGetPushTemplatesListInfiniteQuery } from '~/hooks/queries/push/useGetPushTemplatesListInfiniteQuery'
import { SelectedMessageGroupTemplate } from '~/messageGroup/types'
import { GetPushTemplates, GetPushTemplatesList, Response } from '~/types/api'
import { apiUtils } from '~/utils'
import { parameterUtils } from '~/utils'

interface Props extends BaseModal {
  callback: (
    selectedMessageGroupTemplates: SelectedMessageGroupTemplate[]
  ) => void
}

export default function MessageGroupFormModalPushList({
  modalKey,
  callback,
}: Props) {
  const selectedMessageGroupTemplatesRef = useRef<
    SelectedMessageGroupTemplate[]
  >([])

  const {
    data: response,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    error,
  } = useGetPushTemplatesListInfiniteQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNo: DEFAULT_PAGE_NO - 1,
      direction: SortDirection.DESC,
    },
    {}
  )

  return (
    <Modal
      modalKey={modalKey}
      hasCancel
      cancelVariant="secondary"
      size="xl"
      title="푸시 목록"
      onOkClick={() => callback(selectedMessageGroupTemplatesRef.current)}
    >
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="푸시 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.pages ? (
        <>
          <Text typography="subtitle16">소재설정</Text>
          <br />
          <PushListTable
            response={response}
            onSelect={(v) => (selectedMessageGroupTemplatesRef.current = v)}
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

interface PushListTableProps {
  response: InfiniteData<Response<GetPushTemplatesList.Response>>
  onSelect: (
    selectedMessageGroupTemplate: SelectedMessageGroupTemplate[]
  ) => void
}
function PushListTable({ response, onSelect }: PushListTableProps) {
  const data = response.pages.flatMap((group) => [...group.data.contents])
  const columns = useMemo<Column<GetPushTemplates.PushTemplate>[]>(
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
        Header: '템플릿 코드',
        accessor: 'templateCode',
      },
      {
        Header: '템플릿 이름',
        accessor: 'title',
      },
      {
        Header: '이미지',
        accessor: 'imageUrl',
        Cell: ({ value }) => {
          return (
            <Flex justifyContent="center">
              <Thumbnail imgUrl={value} size={Size.SMALL} />
            </Flex>
          )
        },
      },
    ],
    []
  )

  return (
    <Table
      columns={columns}
      data={data}
      onSelectedRowsChange={(items) => {
        onSelect(
          items.map((v) => ({
            templateCode: v.original.templateCode,
            text: parameterUtils.extractTextFromPushTemplate(v.original),
          }))
        )
      }}
    />
  )
}
