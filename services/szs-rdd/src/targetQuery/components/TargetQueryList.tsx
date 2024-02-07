import { Flex, Spacing } from '@3o3/mystique-components'
import { Pagination2 } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from '~/constants'
import { RoutePath } from '~/routes'
import { Pagination } from '~/types/api'
import { GetTargets } from '~/types/api'

import TargetQueryListFormSearch from './TargetQueryListFormSearch'
import TargetQueryListTable from './TargetQueryListTable'

interface Props {
  data?: GetTargets.TargetQuery[]
  pagination: Pagination
}

export default function TargetQueryList({ data, pagination }: Props) {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams({
    size: `${DEFAULT_PAGE_SIZE}`,
    page: `${DEFAULT_PAGE_NO}`,
    queryId: '',
    title: '',
  })

  const params = {
    pageSize: Number(searchParams.get('size')),
    pageNo: Number(searchParams.get('page')) - 1,
    queryId: searchParams.get('queryId'),
    title: searchParams.get('title'),
  }

  return (
    <>
      <Flex justifyContent="end">
        <Button
          size="small"
          variant="primary"
          style={{
            margin: '10px 0 10px 10px',
          }}
          onClick={() =>
            navigate(`${RoutePath.TargetQuery}/${RoutePath.CreateTargetQuery}`)
          }
        >
          타겟 쿼리 생성
        </Button>
      </Flex>
      <TargetQueryListFormSearch />
      <Spacing px={10} />
      <TargetQueryListTable data={data ?? []} />
      <Spacing px={10} />
      <Pagination2
        page={pagination.pageNo || 0}
        onChange={(pageNo) =>
          setSearchParams({
            page: `${pageNo + 1}`,
            size: `${pagination.pageSize}`,
            queryId: params.queryId ?? '',
            title: params.title ?? '',
          })
        }
        pageCount={pagination.totalPage}
      />
    </>
  )
}
