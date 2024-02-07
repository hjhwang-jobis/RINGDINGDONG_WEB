import { Spacing } from '@3o3/mystique-components'
import { Pagination2 } from '@3o3-internal/components'
import { useSearchParams } from 'react-router-dom'

import { GetAlimtalkTemplates, Pagination } from '~/types/api'

import AlimtalkTemplateFormSearch from './AlimtalkTemplateFormSearch'
import AlimtalkTemplateListTable from './AlimtalkTemplateListTable'

interface Props {
  data?: GetAlimtalkTemplates.AlimtalkTemplate[]
  pagination: Pagination
  profile: string
}

export default function ({ data, pagination, profile }: Props) {
  const [, setSearchParams] = useSearchParams()

  return (
    <>
      <AlimtalkTemplateFormSearch />
      <Spacing px={8} />
      <AlimtalkTemplateListTable data={data ?? []} />
      <Spacing px={8} />
      <Pagination2
        page={pagination.pageNo || 0}
        onChange={(pageNo) =>
          setSearchParams({
            page: `${pageNo + 1}`,
            size: `${pagination.pageSize}`,
            profile: `${profile}`,
          })
        }
        pageCount={pagination.totalPage}
      />
    </>
  )
}
