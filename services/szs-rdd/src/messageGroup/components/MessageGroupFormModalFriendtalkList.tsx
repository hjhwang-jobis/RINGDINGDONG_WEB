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
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE, SortDirection } from '~/constants'
import { FriendtalkTemplateType } from '~/friendtalk/constants'
import {
  ContentTypeBase,
  ContentTypeCarousel,
  ContentTypeWideImage,
  ContentTypeWideList,
} from '~/friendtalk/types'
import { useGetFriendtalkTemplateListInfiniteQuery } from '~/hooks/queries/friendtalk/useGetFriendtalkTemplateListInfiniteQuery'
import { SelectedMessageGroupTemplate } from '~/messageGroup/types'
import {
  GetFriendtalkTemplates,
  GetFriendtalkTemplatesList,
  Response,
} from '~/types/api'
import { apiUtils } from '~/utils'
import { parameterUtils } from '~/utils'

interface Props extends BaseModal {
  callback: (
    selectedMessageGroupTemplates: SelectedMessageGroupTemplate[]
  ) => void
}

export default function MessageGroupFormModalFriendtalkList({
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
  } = useGetFriendtalkTemplateListInfiniteQuery(
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
      title="친구톡 목록"
      onOkClick={() => callback(selectedMessageGroupTemplatesRef.current)}
    >
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="친구톡 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.pages ? (
        <>
          <Text typography="subtitle16">소재설정</Text>
          <br />
          <FriendtalkListTable
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

const getImageUrl = (data: GetFriendtalkTemplates.FriendtalkTemplate) => {
  if (data.templateType === FriendtalkTemplateType.BASE) {
    const content: ContentTypeBase = JSON.parse(data.content)

    return content.imageUrl
  }
  if (data.templateType === FriendtalkTemplateType.CAROUSEL) {
    const content: ContentTypeCarousel = JSON.parse(data.content)

    return content.items[0].imageUrl
  }
  if (data.templateType === FriendtalkTemplateType.WIDE_IMAGE) {
    const content: ContentTypeWideImage = JSON.parse(data.content)

    return content.imageUrl
  }
  if (data.templateType === FriendtalkTemplateType.WIDE_LIST) {
    const content: ContentTypeWideList = JSON.parse(data.content)

    return content.items[0].imageUrl
  }

  return ''
}

interface TableProps {
  response: InfiniteData<Response<GetFriendtalkTemplatesList.Response>>
  onSelect: (
    selectedMessageGroupTemplate: SelectedMessageGroupTemplate[]
  ) => void
}
function FriendtalkListTable({ response, onSelect }: TableProps) {
  const data = response.pages.flatMap((group) => [...group.data.contents])
  const columns = useMemo<Column<GetFriendtalkTemplates.FriendtalkTemplate>[]>(
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
        accessor: 'description',
      },
      {
        Header: '이미지',
        id: 'imageUrl',
        Cell: ({ row }: { row: any }) => {
          const imageUrl = getImageUrl(row.original)
          if (!imageUrl) {
            return (
              <Flex justifyContent="center">
                <Text
                  typography="body16"
                  weight="regular"
                  color={colors.light.scheme.$gray40}
                >
                  이미지가 없습니다.
                </Text>
              </Flex>
            )
          }

          return (
            <Flex justifyContent="center">
              <Thumbnail imgUrl={imageUrl} size={Size.SMALL} />
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
            text: parameterUtils.extractTextFromFriendtalkTemplate(v.original),
          }))
        )
      }}
    />
  )
}
