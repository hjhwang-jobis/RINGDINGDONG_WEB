import { Flex, Spacing } from '@3o3/mystique-components'
import { Pagination2 } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { FriendtalkTemplateType } from '~/friendtalk/constants'
import { RoutePath } from '~/routes'
import { Pagination } from '~/types/api'
import { GetFriendtalkTemplates } from '~/types/api'

import FriendtalkTemplateFormSearch from './FriendtalkTemplateFormSearch'
import FriendtalkTemplateListTable from './FriendtalkTemplateListTable'

interface Props {
  data: GetFriendtalkTemplates.FriendtalkTemplate[]
  pagination: Pagination
}

export default function FriendtalkTemplate({ data, pagination }: Props) {
  const [, setSearchParams] = useSearchParams()
  const rows = data.map((v) => {
    const result = {
      ...v,
      isChecked: false,
      kakaotalkChannel: '확인필요!',
    }

    if (
      v.templateType === FriendtalkTemplateType.BASE ||
      v.templateType === FriendtalkTemplateType.WIDE_IMAGE
    ) {
      return {
        ...result,
        contentBasicWideImage: JSON.parse(v.content),
      }
    }

    if (v.templateType === FriendtalkTemplateType.CAROUSEL) {
      return {
        ...result,
        contentCarousel: JSON.parse(v.content),
      }
    }

    if (v.templateType === FriendtalkTemplateType.WIDE_LIST) {
      return {
        ...result,
        contentWideList: JSON.parse(v.content),
      }
    }

    return result
  })

  const navigate = useNavigate()

  return (
    <>
      <FriendtalkTemplateFormSearch />
      <Flex justifyContent="end">
        <Button
          size="small"
          variant="primary"
          style={{
            margin: '10px 0 10px 10px',
          }}
          onClick={() => {
            navigate(
              `${RoutePath.FriendtalkTemplate}/${RoutePath.CreateFriendtalkTemplate}`
            )
          }}
        >
          메시지 생성
        </Button>
      </Flex>
      <FriendtalkTemplateListTable data={rows} />
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
  )
}
