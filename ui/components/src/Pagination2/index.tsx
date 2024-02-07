import { Flex } from '@3o3/ui'
import styled from '@emotion/styled'
import React, { useCallback, useMemo } from 'react'

import FirstButton from '~/Pagination2/FirstButton'
import LastButton from '~/Pagination2/LastButton'
import NextButton from '~/Pagination2/NextButton'
import PageButton from '~/Pagination2/PageButton'
import PreviousButton from '~/Pagination2/PreviousButton'

/**
 * @interface
 * @property {number} pageCount 전체 페이지 수
 * @property {number} page 현재 페이지 인덱스. 0 부터 시작
 * @property {number} [visiblePageCount] 보여지는 페이지 개수. 기본값: 5
 * @property {(page: number) => void} onChange 페이지 변경 시 발생하는 이벤트 콜백
 * */
interface Props {
  pageCount: number
  page: number
  visiblePageCount?: number
  onChange: (page: number) => void
}

function Pagination({
  pageCount,
  page,
  visiblePageCount = 5,
  onChange,
}: Props) {
  const chunkCount = useMemo(
    () => Math.ceil(pageCount / visiblePageCount),
    [pageCount, visiblePageCount]
  )

  const chunkIndex = useMemo(
    () => Math.trunc(page / visiblePageCount),
    [page, visiblePageCount]
  )

  const pageCountPerChunk = useMemo(() => {
    if (chunkCount === 1) return pageCount

    if (chunkIndex === chunkCount - 1) {
      return pageCount - chunkIndex * visiblePageCount
    }

    return visiblePageCount
  }, [chunkCount, chunkIndex, pageCount, visiblePageCount])

  const items = useMemo(
    () => Array(pageCountPerChunk).fill(null),
    [pageCountPerChunk]
  )

  const isPreviousDisabled = useMemo(() => chunkIndex <= 0, [chunkIndex])

  const isNextDisabled = useMemo(
    () => chunkIndex >= chunkCount - 1,
    [chunkCount, chunkIndex]
  )

  const getPage = useCallback(
    (itemIndex: number) => chunkIndex * visiblePageCount + itemIndex,
    [chunkIndex, visiblePageCount]
  )

  const pageOnPreviousChunk = useMemo(
    () => Math.max(getPage(0) - 1, 0),
    [getPage]
  )

  const pageOnNextChunk = useMemo(
    () => Math.min(getPage(pageCountPerChunk - 1) + 1, pageCount - 1),
    [getPage, pageCount, pageCountPerChunk]
  )

  const handleChange = useCallback(
    (page: number) => () => onChange(page),
    [onChange]
  )

  if (pageCount < 1) return null

  return (
    <Container as="nav" alignItems="center" justifyContent="center">
      <FirstButton disabled={isPreviousDisabled} onClick={handleChange(0)} />
      <PreviousButton
        disabled={isPreviousDisabled}
        onClick={handleChange(pageOnPreviousChunk)}
      />
      {items.map((value, itemIndex) => {
        const index = getPage(itemIndex)

        return (
          <PageButton
            key={index}
            page={index}
            active={page === index}
            onClick={handleChange(index)}
          />
        )
      })}
      <NextButton
        disabled={isNextDisabled}
        onClick={handleChange(pageOnNextChunk)}
      />
      <LastButton
        disabled={isNextDisabled}
        onClick={handleChange(pageCount - 1)}
      />
    </Container>
  )
}

const Container = styled(Flex)`
  button + button {
    margin-left: 0.5rem;
  }
`

export default Pagination
