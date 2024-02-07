import { Flex, Spacing } from '@3o3/mystique-components'
import { Pagination2 } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from '~/constants'
import { RoutePath } from '~/routes'
import { Pagination } from '~/types/api'
import { GetActions } from '~/types/api'

import ActionListFormSearch from './ActionListFormSearch'
import ActionListTable from './ActionListTable'

interface Props {
  data?: GetActions.Action[]
  pagination: Pagination
}

export default function ActionList({ data, pagination }: Props) {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams({
    size: `${DEFAULT_PAGE_SIZE}`,
    page: `${DEFAULT_PAGE_NO}`,
    name: '',
  })

  const params = {
    pageSize: Number(searchParams.get('size')),
    pageNo: Number(searchParams.get('page')) - 1,
    name: searchParams.get('name'),
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
            navigate(`${RoutePath.Action}/${RoutePath.CreateAction}`)
          }
        >
          캠페인 액션 생성
        </Button>
      </Flex>
      <ActionListFormSearch />
      <Spacing px={10} />
      <ActionListTable data={data ?? []} />
      <Spacing px={10} />
      <Pagination2
        page={pagination.pageNo || 0}
        onChange={(pageNo) =>
          setSearchParams({
            page: `${pageNo + 1}`,
            size: `${pagination.pageSize}`,
            name: params.name ?? '',
          })
        }
        pageCount={pagination.totalPage}
      />
    </>
  )
}
