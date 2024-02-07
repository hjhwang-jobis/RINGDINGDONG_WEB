import { Column, Table } from '@3o3-internal/components'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import TableCellTextBlue from '~/components/TableCellTextBlue'
import TableCellTextRed from '~/components/TableCellTextRed'
import {
  MessageChannelType,
  MessageGroupTemplateSendStatusType,
  MessageGroupTemplateSendStatusTypeMap,
  SendProfile,
} from '~/constants'
import { RoutePath } from '~/routes'
import { MessageGroupTemplate } from '~/types'

interface Props {
  data: MessageGroupTemplate[]
  sendProfile: SendProfile
}

export default function MessageGroupFormMessageGroupTemplateListTable({
  data,
  sendProfile,
}: Props) {
  const columns = useMemo<Column<MessageGroupTemplate>[]>(
    () => [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: '템플릿 코드',
        accessor: 'templateCode',
        Cell: ({ value, row }) => {
          const messageChannel: MessageChannelType = row.original.messageChannel

          if (messageChannel === MessageChannelType.ALIMLIST) {
            const to = `${RoutePath.AlimlistTemplate}/${RoutePath.AlimlistTemplateDetail}/${value}`

            return <Link to={to}>{value}</Link>
          }
          if (messageChannel === MessageChannelType.ALIMTALK) {
            const to = `${RoutePath.AlimtalkTemplate}/${RoutePath.AlimtalkTemplateDetail}/${sendProfile}/${value}?active=true`

            return <Link to={to}>{value}</Link>
          }
          if (messageChannel === MessageChannelType.FRIENDTALK) {
            const to = `${RoutePath.FriendtalkTemplate}/${RoutePath.FriendtalkTemplateDetail}/${value}`

            return <Link to={to}>{value}</Link>
          }
          if (messageChannel === MessageChannelType.PUSH) {
            const to = `${RoutePath.PushTemplate}/${RoutePath.PushTemplateDetail}/${value}`

            return <Link to={to}>{value}</Link>
          }

          return value
        },
      },
      {
        Header: '발송 상태',
        accessor: 'sendStatus',
        Cell: ({ value }) =>
          MessageGroupTemplateSendStatusTypeMap[
            value as MessageGroupTemplateSendStatusType
          ],
      },
      {
        Header: '발송요청건수',
        accessor: 'requestedCount',
      },
      {
        Header: '발송건수',
        accessor: 'sentCount',
      },
      {
        Header: '발송실패건수',
        accessor: 'failedCount',
      },
      {
        Header: '수신건수',
        accessor: 'succeedCount',
      },
      {
        Header: '헤르메스 태그',
        accessor: 'hermesTag',
      },
      {
        Header: '파라미터 정보',
        accessor: 'parameters',
      },
      {
        Header: '알림리스트 동시 발송 여부',
        accessor: 'isContainAlimlist',
        Cell: ({ value }) =>
          value ? (
            <TableCellTextBlue text={'동시 발송'} />
          ) : (
            <TableCellTextRed text={'동시 발송 안함'} />
          ),
      },
      {
        Header: '발송시작시간',
        accessor: 'sendStartedAt',
      },
      {
        Header: '발송종료시간',
        accessor: 'sendFinishedAt',
      },
      {
        Header: '생성일시',
        accessor: 'createdAt',
      },
    ],
    [sendProfile]
  )

  return <Table columns={columns} data={data} />
}
