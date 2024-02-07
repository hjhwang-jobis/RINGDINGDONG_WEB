import { Flex } from '@3o3/mystique-components'
import { Column, Table } from '@3o3-internal/components'
import { css } from '@emotion/react'
import { Button } from '@fe3o3/ui'
import { Row } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { RoutePath } from '~/routes'
import { GetPushTemplates } from '~/types/api'

interface Props {
  data: GetPushTemplates.PushTemplate[]
}

type CellType = GetPushTemplates.PushTemplate

export default function PushTemplateListTable({ data }: Props) {
  const navigate = useNavigate()

  const columns = useMemo<Column<CellType>[]>(
    () => [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: '템플릿 코드',
        accessor: 'templateCode',
        Cell: ({ value }) => (
          <Link
            to={`${RoutePath.PushTemplate}/${RoutePath.PushTemplateDetail}/${value}`}
          >
            {value}
          </Link>
        ),
      },
      {
        Header: '타이틀',
        accessor: 'title',
      },
      {
        Header: '내용',
        accessor: 'body',
      },
      {
        Header: '생성일자',
        accessor: 'createdAt',
      },
      {
        Header: '템플릿 복사',
        id: 'action',
        Cell: ({ row }: { row: Row<CellType> }) => {
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
                    `${RoutePath.PushTemplate}/${RoutePath.CopyPushTemplate}/${row.original.templateCode}`
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
