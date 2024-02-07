import styled from '@emotion/styled'
import { Typo } from '@fe3o3/ui'
import React, { useCallback, useMemo } from 'react'

import NextNavControl from '~/Pagination/NextNavControl'
import PrevNavControl from '~/Pagination/PrevNavControl'

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
`

export interface Props {
  page: number
  isLast: boolean
  onChange: (page: number) => void
}

function OffsetPagination({ page, isLast, onChange }: Props) {
  const isDisabledPrev = useMemo(() => page <= 0, [page])

  const handlePrevClick = useCallback(() => {
    if (isDisabledPrev) {
      return
    }

    onChange(page - 1)
  }, [isDisabledPrev, onChange, page])

  const handleNextClick = useCallback(() => {
    if (isLast) {
      return
    }

    onChange(page + 1)
  }, [isLast, onChange, page])

  return (
    <Container>
      <PrevNavControl disabled={isDisabledPrev} onClick={handlePrevClick} />
      <Typo type="S1">{page + 1} 페이지</Typo>
      <NextNavControl disabled={isLast} onClick={handleNextClick} />
    </Container>
  )
}

export default OffsetPagination
