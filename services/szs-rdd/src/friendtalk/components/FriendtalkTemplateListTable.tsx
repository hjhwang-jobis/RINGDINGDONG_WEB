import { Flex } from '@3o3/mystique-components'
import { Column, Table } from '@3o3-internal/components'
import { css } from '@emotion/react'
import { Button } from '@fe3o3/ui'
import { Row } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { FriendtalkTemplateTypeMap } from '~/friendtalk/constants'
import { RoutePath } from '~/routes'
import { GetFriendtalkTemplates } from '~/types/api'

interface Props {
  data: GetFriendtalkTemplates.FriendtalkTemplate[]
}

export default function FriendtalkTemplateTable({ data }: Props) {
  const navigate = useNavigate()

  const columns = useMemo<Column<GetFriendtalkTemplates.FriendtalkTemplate>[]>(
    () => [
      {
        Header: 'id',
        accessor: 'id',
        Cell: ({ value, row }) => {
          const {
            original: { templateCode },
          } = row

          const to = `${RoutePath.FriendtalkTemplate}/${RoutePath.FriendtalkTemplateDetail}/${templateCode}`

          return <Link to={to}>{value}</Link>
        },
      },
      {
        Header: '템플릿 코드',
        accessor: 'templateCode',
        Cell: ({ value }) => {
          const to = `${RoutePath.FriendtalkTemplate}/${RoutePath.FriendtalkTemplateDetail}/${value}`

          return <Link to={to}>{value}</Link>
        },
      },
      {
        Header: '생성일시',
        accessor: 'createdAt',
      },
      {
        Header: '카카오톡 채널',
        accessor: 'sendProfile',
      },
      {
        Header: '유형',
        accessor: 'templateType',
        Cell: ({ value }) => FriendtalkTemplateTypeMap[value],
      },
      {
        Header: '이름',
        accessor: 'description',
      },
      {
        Header: '템플릿 복사',
        id: 'action',
        Cell: ({
          row,
        }: {
          row: Row<GetFriendtalkTemplates.FriendtalkTemplate>
        }) => {
          return (
            <Flex justifyContent="center">
              <Button
                type="button"
                size="small"
                variant="lightBlue"
                css={css`
                  width: 80px;
                `}
                onClick={() =>
                  navigate(
                    `${RoutePath.FriendtalkTemplate}/${RoutePath.CopyFriendtalkTemplate}/${row.original.templateCode}`
                  )
                }
              >
                복사하기
              </Button>
            </Flex>
          )
        },
      },
    ],
    [navigate]
  )

  return <Table columns={columns} data={data} />
}
