import { Flex, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
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
import {
  ActiveTypeMap,
  AlimtalkChannelType,
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
  SortDirection,
} from '~/constants'
import { useGetAlimtalkTemplatesListInfiniteQuery } from '~/hooks/queries/alimtalk/useGetAlimtalkTemplatesListInfiniteQuery'
import { SelectedMessageGroupTemplate } from '~/messageGroup/types'
import {
  GetAlimtalkTemplates,
  GetAlimtalkTemplatesList,
  Response,
} from '~/types/api'
import { apiUtils } from '~/utils'
import { parameterUtils } from '~/utils'

interface Props extends BaseModal {
  callback: (
    selectedMessageGroupTemplates: SelectedMessageGroupTemplate[]
  ) => void
  alimtalkChannelType: AlimtalkChannelType
}

export default function MessageGroupFormModalAlimtalkList({
  modalKey,
  callback,
  alimtalkChannelType,
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
  } = useGetAlimtalkTemplatesListInfiniteQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNo: DEFAULT_PAGE_NO - 1,
      direction: SortDirection.DESC,
      profile: alimtalkChannelType,
    },
    {}
  )

  return (
    <Modal
      modalKey={modalKey}
      hasCancel
      cancelVariant="secondary"
      size="xl"
      title="알림톡 목록"
      onOkClick={() => callback(selectedMessageGroupTemplatesRef.current)}
    >
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="알림톡 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.pages ? (
        <>
          <Text typography="subtitle16">소재설정</Text>
          <br />
          <AlimtalkListTable
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

interface AlimtalkListTableProps {
  response: InfiniteData<Response<GetAlimtalkTemplatesList.Response>>
  onSelect: (
    selectedMessageGroupTemplate: SelectedMessageGroupTemplate[]
  ) => void
}

type CellType = GetAlimtalkTemplates.AlimtalkTemplate

function AlimtalkListTable({ response, onSelect }: AlimtalkListTableProps) {
  const data = response.pages.flatMap((group) => [...group.data.contents])

  const columns = useMemo<Column<CellType>[]>(
    () => [
      {
        id: 'rowCheckbox',
        Header: () => {
          return <Checkbox disabled={true} />
        },
        Cell: ({ row }: { row: any }) => {
          return (
            <Checkbox
              checked={row.getToggleRowSelectedProps().checked}
              disabled={!row.original?.active}
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
        accessor: 'name',
      },
      {
        Header: '활성화 상태',
        accessor: 'active',
        Cell: ({ value }) => {
          if (value) {
            return (
              <Flex justifyContent="center">
                <Text
                  typography="body12"
                  weight="medium"
                  color={colors.light.scheme.$blue50}
                >
                  {ActiveTypeMap.ACTIVE}
                </Text>
              </Flex>
            )
          }

          return (
            <Flex justifyContent="center">
              <Text
                typography="body12"
                weight="medium"
                color={colors.light.scheme.$red50}
              >
                {ActiveTypeMap.DEACTIVE}
              </Text>
            </Flex>
          )
        },
      },
      {
        Header: '이미지',
        accessor: 'templateImageUrl',
        Cell: ({ value }) => (
          <Flex justifyContent="center">
            <Thumbnail imgUrl={value} size={Size.SMALL} />
          </Flex>
        ),
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
            text: parameterUtils.extractTextFromAlimtalkTemplate(v.original),
          }))
        )
      }}
    />
  )
}
