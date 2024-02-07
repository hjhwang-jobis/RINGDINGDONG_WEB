import { Spacing } from '@3o3/mystique-components'
import { Pagination2 } from '@3o3-internal/components'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from '~/constants'
import { Parameter } from '~/types'
import { Pagination } from '~/types/api'

import AutoParameterListFormSearch from './AutoParameterListFormSearch'
import AutoParameterListTable from './AutoParameterListTable'

interface Props {
  data?: Parameter[]
  pagination: Pagination
}

export default function AutoParameterList({ data, pagination }: Props) {
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
      <AutoParameterListFormSearch />
      <Spacing px={10} />
      <AutoParameterListTable data={data ?? []} />
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
