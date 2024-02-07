import { Flex, Spacing } from '@3o3/mystique-components'
import { Pagination2 } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import { RoutePath } from '~/routes'
import { Pagination } from '~/types/api'
import { GetAlimlistTemplates } from '~/types/api'

import AlimlistTemplateFormSearch from './AlimlistTemplateFormSearch'
import AlimlistTable from './AlimlistTemplateListTable'

interface Props {
  data?: GetAlimlistTemplates.AlimlistTemplate[]
  pagination: Pagination
}

export default function AlimlistTemplateList({ data, pagination }: Props) {
  const navigate = useNavigate()

  const [, setSearchParams] = useSearchParams()

  return (
    <>
      <AlimlistTemplateFormSearch />
      <Flex justifyContent="end">
        <Button
          size="small"
          variant="primary"
          style={{
            margin: '10px 0 10px 10px',
          }}
          onClick={() =>
            navigate(
              `${RoutePath.AlimlistTemplate}/${RoutePath.CreateAlimlistTemplate}`
            )
          }
        >
          메시지 생성
        </Button>
      </Flex>
      <>
        <AlimlistTable data={data ?? []} />
        <Spacing px={8} />
        <Pagination2
          page={pagination.pageNo || 0}
          onChange={(pageNo) =>
            setSearchParams({
              page: `${pageNo + 1}`,
              size: `${pagination.pageSize}`,
            })
          }
          pageCount={pagination.totalPage}
        />
      </>
    </>
  )
}
