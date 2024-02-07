import { Flex, Spacing } from '@3o3/mystique-components'
import { Pagination2 } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from '~/constants'
import { RoutePath } from '~/routes'
import { Parameter } from '~/types'
import { Pagination } from '~/types/api'

import BasicParameterListFormSearch from './BasicParameterListFormSearch'
import BasicParameterListTable from './BasicParameterListTable'

interface Props {
  data?: Parameter[]
  pagination: Pagination
}

export default function BasicParameterList({ data, pagination }: Props) {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams({
    size: `${DEFAULT_PAGE_SIZE}`,
    page: `${DEFAULT_PAGE_NO}`,
    parameter: '',
    title: '',
  })

  const params = {
    pageSize: Number(searchParams.get('size')),
    pageNo: Number(searchParams.get('page')) - 1,
    parameter: searchParams.get('parameter'),
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
            navigate(
              `${RoutePath.BasicParameter}/${RoutePath.CreateBasicParameter}`
            )
          }
        >
          기본 파라미터 생성
        </Button>
      </Flex>
      <BasicParameterListFormSearch />
      <Spacing px={10} />
      <BasicParameterListTable data={data ?? []} />
      <Spacing px={10} />
      <Pagination2
        page={pagination.pageNo || 0}
        onChange={(pageNo) =>
          setSearchParams({
            page: `${pageNo + 1}`,
            size: `${pagination.pageSize}`,
            parameter: params.parameter ?? '',
            title: params.title ?? '',
          })
        }
        pageCount={pagination.totalPage}
      />
    </>
  )
}
