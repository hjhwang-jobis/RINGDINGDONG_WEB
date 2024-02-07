import React, { useState } from 'react'

import { ImageDescription } from '~/types'

import ImageGrid from './ImageGrid'
import InfiniteScrollBottom from './InfiniteScrollBottom'

interface Props {
  imageDescriptions: ImageDescription[]
  isFetchingNextPage: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
  onSelected: (id: string) => void
  unselectableImageIds: string[]
}

export default function InfiniteImageGrid({
  imageDescriptions,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  onSelected,
  unselectableImageIds,
}: Props) {
  const [selectedImageId, setSelectedImageId] = useState('')

  return (
    <>
      <ImageGrid.Root>
        {imageDescriptions.map(({ url, id }) => (
          <ImageGrid.Image
            key={id}
            id={`${id}`}
            src={url}
            onClick={(id) => {
              setSelectedImageId(id)
              onSelected(id)
            }}
            selected={selectedImageId === `${id}`}
            disabled={
              !!unselectableImageIds.find(
                (v) => `${v}`.toLowerCase() === `${id}`.toLowerCase()
              )
            }
          />
        ))}
      </ImageGrid.Root>
      <InfiniteScrollBottom
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  )
}
