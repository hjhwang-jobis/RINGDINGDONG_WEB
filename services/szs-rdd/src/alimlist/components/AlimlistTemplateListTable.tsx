import { Flex } from '@3o3/mystique-components'
import { Column, Table } from '@3o3-internal/components'
import { css } from '@emotion/react'
import { Button } from '@fe3o3/ui'
import { Row } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { AlimlistTemplateNotificationTypeMap } from '~/alimlist/constants'
import { RoutePath } from '~/routes'
import { GetAlimlistTemplates } from '~/types/api'

interface Props {
  data: GetAlimlistTemplates.AlimlistTemplate[]
}

type CellType = GetAlimlistTemplates.AlimlistTemplate

export default function AlimlistTable({ data }: Props) {
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
            to={`${RoutePath.AlimlistTemplate}/${RoutePath.AlimlistTemplateDetail}/${value}`}
          >
            {value}
          </Link>
        ),
      },
      {
        Header: '메시지 타입',
        accessor: 'notificationType',
        Cell: ({ value }) => AlimlistTemplateNotificationTypeMap[value] ?? '',
      },
      {
        Header: '타이틀',
        accessor: 'title',
      },
      {
        Header: '서브타이틀',
        accessor: 'subTitle',
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
                type="submit"
                size="small"
                variant="lightBlue"
                css={css`
                  width: 80px;
                `}
                onClick={() =>
                  navigate(
                    `${RoutePath.AlimlistTemplate}/${RoutePath.CopyAlimlistTemplate}/${row.original.templateCode}`
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
