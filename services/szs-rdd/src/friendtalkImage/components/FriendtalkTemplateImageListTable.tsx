import { Flex } from '@3o3/mystique-components'
import { Column, Table } from '@3o3-internal/components'
import React, { useMemo } from 'react'

import Thumbnail, { Size } from '~/components/Thumbnail'
import { FriendtalkTemplateTypeMap } from '~/friendtalk/constants'
import { GetFriendtalkTemplatesImages } from '~/types/api'

interface Props {
  data: GetFriendtalkTemplatesImages.FriendtalkTemplateImage[]
}

export default function FriendtalkTemplateImageListTable({ data }: Props) {
  const columns = useMemo<
    Column<GetFriendtalkTemplatesImages.FriendtalkTemplateImage>[]
  >(
    () => [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: '이미지',
        accessor: 'url',
        Cell: ({ value }) => (
          <Flex justifyContent="center">
            <Thumbnail imgUrl={value} size={Size.SMALL} />
          </Flex>
        ),
      },
      {
        Header: '파일이름',
        accessor: 'originFileName',
        Cell: ({ value, row }) => {
          return (
            <a href={row.original.url} target="_blank" rel="noreferrer">
              {value}
            </a>
          )
        },
      },
      {
        Header: '생성일자',
        accessor: 'createdAt',
      },
      {
        Header: '템플릿 타입',
        accessor: 'templateType',
        Cell: ({ value }) => FriendtalkTemplateTypeMap[value],
      },
    ],
    []
  )

  return <Table columns={columns} data={data} />
}
