import styled from '@emotion/styled'
import { palette } from '@fe3o3/ui'
import React from 'react'

import Td from '~/Table/Td'

/**
 * @interface Props
 * @property {string} text 노출되는 메시지
 * @property {number} columnCount 컬럼 개수
 */
interface Props {
  text: string
  columnCount: number
}

function EmptyRow({ text, columnCount }: Props) {
  return (
    <tr>
      <Td colSpan={columnCount} color={palette.gray[40]}>
        <Wrapper>{text}</Wrapper>
      </Td>
    </tr>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`

export default EmptyRow
