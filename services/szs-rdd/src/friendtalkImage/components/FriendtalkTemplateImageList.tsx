import { Flex, Spacing } from '@3o3/mystique-components'
import { Pagination2 } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { RoutePath } from '~/routes'
import { Pagination } from '~/types/api'
import { GetFriendtalkTemplatesImages } from '~/types/api'

import FriendtalkTemplateImageListTable from './FriendtalkTemplateImageListTable'

interface Props {
  data: GetFriendtalkTemplatesImages.FriendtalkTemplateImage[]
  pagination: Pagination
}

export default function FriendtalkTemplateImageList({
  data,
  pagination,
}: Props) {
  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  return (
    <>
      <Flex justifyContent="end">
        <Button
          size="small"
          variant="primary"
          style={{
            margin: '10px 0 10px 10px',
          }}
          onClick={() => {
            navigate(
              `${RoutePath.FriendtalkTemplateImage}/${RoutePath.UploadFriendtalkTemplateImage}`
            )
          }}
        >
          이미지 업로드
        </Button>
      </Flex>
      <FriendtalkTemplateImageListTable data={data} />
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
