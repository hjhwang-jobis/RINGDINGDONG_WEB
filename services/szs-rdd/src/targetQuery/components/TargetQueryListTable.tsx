import { Flex } from '@3o3/mystique-components'
import { BasicModal, ErrorModal, useModal } from '@3o3-internal/components'
import { Column, Table } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import { Row } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { usePutTargetsQueriesCalculateMutation } from '~/hooks/queries/targetQuery/usePutTargetsQueriesCalculateMutation'
import { RoutePath } from '~/routes'
import { GetTargets, GetTargetsQueries } from '~/types/api'

interface Props {
  data: GetTargets.TargetQuery[]
}

export default function TargetQueryListTable({ data }: Props) {
  const { showModal } = useModal()
  const { mutate: mutatePutTargetsQueriesCalculate } =
    usePutTargetsQueriesCalculateMutation({
      onSuccess: () => {
        showModal(BasicModal, {
          title: '예상 모수 계산 시작',
          content: '보통 1~2분 내로 계산이 완료됩니다.',
          onOkClick: () => {
            window.location.reload()
          },
        })
      },
      onError: (error) => {
        showModal(ErrorModal, {
          title: '타겟 쿼리 수정 오류',
          errorMessage: error.message,
          errorCode: error.code ?? -1,
        })
      },
    })

  const columns = useMemo<Column<GetTargets.TargetQuery>[]>(
    () => [
      {
        Header: '쿼리 ID',
        accessor: 'queryId',
        Cell: ({ value, row }) => (
          <Link
            to={`${RoutePath.TargetQuery}/${RoutePath.TargetQueryDetail}/${row.original.id}`}
          >
            {value}
          </Link>
        ),
      },
      {
        Header: '타겟 쿼리명',
        accessor: 'title',
      },
      {
        Header: '작성자',
        accessor: 'author',
        Cell: ({ value }) => value.name,
      },
      {
        Header: '생성일자',
        accessor: 'createdAt',
      },
      {
        Header: '수정일자',
        accessor: 'updatedAt',
      },
      {
        Header: '상태',
        accessor: 'status',
      },
      {
        Header: '예상모수',
        accessor: 'calculatedCount',
      },
      {
        Header: '예상모수 갱신일자',
        accessor: 'lastCalculatedAt',
      },
      {
        Header: '액션',
        id: 'action',
        Cell: ({ row }: { row: Row<GetTargetsQueries.TargetQuery> }) => {
          return (
            <Flex justifyContent="center">
              <Button
                type="button"
                size="small"
                variant="lightBlue"
                onClick={() => {
                  mutatePutTargetsQueriesCalculate({
                    targetQueryId: `${row.original.id}`,
                  })
                }}
                disabled={row.original.status === 'QUERYING'}
              >
                예상모수갱신
              </Button>
            </Flex>
          )
        },
      },
    ],
    [mutatePutTargetsQueriesCalculate]
  )

  return <Table columns={columns} data={data} />
}
