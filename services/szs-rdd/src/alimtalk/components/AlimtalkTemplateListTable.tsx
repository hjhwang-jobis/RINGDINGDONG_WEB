import { Flex } from '@3o3/mystique-components'
import { Column, ErrorModal, Table, useModal } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import { Row } from '@tanstack/react-table'
import React, { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { StatusTypeMap } from '~/alimtalk/constants'
import TableCellTextBlue from '~/components/TableCellTextBlue'
import TableCellTextRed from '~/components/TableCellTextRed'
import {
  ActiveTypeMap,
  AlimlistChannelIdToChannelTypeMap,
  AlimtalkChannelType,
  AlimtalkChannelTypeToChannelIdMap,
} from '~/constants'
import { usePostAlimtalkActivateMutation } from '~/hooks/queries/alimtalk/usePostAlimtalkActivateMutation'
import { RoutePath } from '~/routes'
import { GetAlimtalkTemplates } from '~/types/api'

import AlimtalkTemplateListTableModalMatchingParameterList from './AlimtalkTemplateListTableModalMatchingParameterList'

interface Props {
  data: GetAlimtalkTemplates.AlimtalkTemplate[]
}

const AlimTalkTemplateTable = ({ data }: Props) => {
  const { mutate } = usePostAlimtalkActivateMutation({
    onError: (error) => {
      showModal(ErrorModal, {
        title: '알림톡 템플릿 활성화 실패',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      })
    },
  })

  const { showModal } = useModal()
  const onClick = useCallback(
    (templateCode: string, profile: AlimtalkChannelType) => {
      showModal(AlimtalkTemplateListTableModalMatchingParameterList, {
        templateCode,
        profile,
        callback: (alimtalkMatchDetails) => {
          mutate({
            templateCode,
            profile,
            alimtalkMatchDetails,
          })
        },
      })
    },
    [mutate, showModal]
  )

  const columns = useMemo<Column<GetAlimtalkTemplates.AlimtalkTemplate>[]>(
    () => [
      {
        Header: '발신 프로필 그룹',
        accessor: 'channelId',
        Cell: ({ value }) =>
          AlimtalkChannelTypeToChannelIdMap[value as AlimtalkChannelType] ??
          value,
      },
      {
        Header: '템플릿 코드',
        accessor: 'templateCode',
        Cell: ({ value, row }) => {
          const alimlistChannelType =
            AlimlistChannelIdToChannelTypeMap[row.original.channelId]
          const to = `${RoutePath.AlimtalkTemplate}/${RoutePath.AlimlistTemplateDetail}/${alimlistChannelType}/${value}?active=${row.original.active}`

          return <Link to={to}>{value}</Link>
        },
      },
      {
        Header: '템플릿 이름',
        accessor: 'name',
      },
      {
        Header: '최종 템플릿 상태',
        accessor: 'status',
        Cell: ({ value }) =>
          StatusTypeMap[value] ? StatusTypeMap[value] : value,
      },
      {
        Header: '활성화 상태',
        accessor: 'active',
        Cell: ({ value }) =>
          value ? (
            <TableCellTextBlue text={ActiveTypeMap.ACTIVE} />
          ) : (
            <TableCellTextRed text={ActiveTypeMap.DEACTIVE} />
          ),
      },
      {
        Header: '생성일시',
        accessor: 'createdDateTime',
      },
      {
        Header: '액션',
        id: 'action',
        Cell: ({
          row,
        }: {
          row: Row<GetAlimtalkTemplates.AlimtalkTemplate>
        }) => {
          return (
            <Flex justifyContent="center">
              <Button
                type="button"
                size="small"
                variant="lightBlue"
                onClick={() => {
                  const alimlistChannelType =
                    AlimlistChannelIdToChannelTypeMap[row.original.channelId]
                  onClick(row.original.templateCode, alimlistChannelType)
                }}
                disabled={row.original.active}
              >
                활성화하기
              </Button>
            </Flex>
          )
        },
      },
    ],
    [onClick]
  )

  return <Table columns={columns} data={data} />
}

export default AlimTalkTemplateTable
