import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { palette } from '@fe3o3/ui'
import React, { PropsWithChildren } from 'react'

/**
 * @interface
 * @property {boolean} [cellBordered] cell bordered 스타일 적용 여부
 * @property {boolean} [hover] hover 스타일 적용 여부
 * @property {string} [maxHeight] 테이블 최대 높이. 설정한 최대 높이보다 커지면 thead 영역이 `position: sticky` 처리됨
 * @property {boolean} [nowrap] `white-space: nowrap` 적용 여부
 * */
export interface SimpleTableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  cellBordered?: boolean
  hover?: boolean
  maxHeight?: string
  nowrap?: boolean
  layoutFixed?: boolean
}

function SimpleTable({
  cellBordered,
  hover,
  maxHeight,
  nowrap,
  children,
  layoutFixed,
  ...props
}: PropsWithChildren<SimpleTableProps>) {
  return (
    <Wrapper maxHeight={maxHeight} nowrap={nowrap}>
      <Table
        cellBordered={cellBordered}
        hover={hover}
        maxHeight={maxHeight}
        layoutFixed={layoutFixed}
        {...props}
      >
        {children}
      </Table>
    </Wrapper>
  )
}

const Wrapper = styled.div<Pick<SimpleTableProps, 'maxHeight' | 'nowrap'>>`
  width: 100%;
  overflow-x: auto;
  word-wrap: break-word;

  ${({ nowrap }) =>
    nowrap &&
    css`
      white-space: nowrap;
    `};

  ${({ maxHeight }) =>
    maxHeight &&
    css`
      overflow-y: auto;
      max-height: ${maxHeight};
    `};
`

const Table = styled.table<
  Pick<SimpleTableProps, 'cellBordered' | 'hover' | 'maxHeight'> & {
    layoutFixed?: boolean
  }
>`
  ${({ layoutFixed }) => layoutFixed && 'table-layout: fixed;'}
  width: 100%;
  border: 1px solid #dfe2e6;
  box-sizing: border-box;
  background-color: ${palette.white};

  ${({ cellBordered }) =>
    cellBordered &&
    css`
      th,
      td {
        border-left: 1px solid #dfe2e6;

        th:first-of-type,
        td:first-of-type {
          border-left: none;
        }
      }
    `};

  ${({ hover }) =>
    hover &&
    css`
      tbody > tr:hover {
        color: #212529;
        background-color: rgba(0, 0, 0, 0.075);
      }
    `};

  ${({ maxHeight }) =>
    maxHeight &&
    css`
      thead {
        position: sticky;
        top: -1px;
      }
    `};

  &.horizontal-scroll {
    [data-sticky-last-left-td] {
      box-shadow: inset -2px 0 6px -6px #333;
    }

    [data-sticky-first-right-td] {
      box-shadow: inset 2px 0 6px -6px #333;
    }
  }
`

export default SimpleTable
