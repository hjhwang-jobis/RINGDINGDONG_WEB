import { Skeleton } from '@fe3o3/ui'
import { isBoolean, isEmpty, isNil, isNumber, isObject } from 'lodash-es'
import React, { useCallback, useEffect, useMemo } from 'react'
import {
  CellPropGetter,
  Column as ReactTableColumn,
  IdType,
  Row,
  RowPropGetter,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table'

import Cell from '~/Table/Cell'
import EmptyRow from '~/Table/EmptyRow'
import SimpleTable, { SimpleTableProps } from '~/Table/SimpleTable'
import SortableHeader from '~/Table/SortableHeader'
import TBody from '~/Table/TBody'
import Td from '~/Table/Td'
import TFoot from '~/Table/TFoot'
import Th from '~/Table/Th'
import THead from '~/Table/THead'
import Tr from '~/Table/Tr'
import { SortDirection } from '~/Table/types'
import { useSticky } from '~/Table/useSticky'

function hasNoValue(value?: any) {
  if (isNil(value)) return true
  if (isObject(value)) return isEmpty(value)
  if (isBoolean(value) || isNumber(value)) return false

  return value.trim().length === 0
}

interface Cell {
  style?: React.CSSProperties
  sortable?: boolean
  isAlwaysExecuteCell?: boolean
  sticky?: 'left' | 'right'
}

export type Column<T extends object> = ReactTableColumn<T> & Cell

type RowSelectCallback<T extends object> = (
  rows: Row<T>[],
  isAllSelected?: boolean
) => void

type SortingChangeCallback<T extends object> = (
  columnId: IdType<T>,
  isSorted: boolean,
  sortDirection?: SortDirection
) => void

type SelectedRowsCallback<T extends object> = (selectedRows: Row<T>[]) => void

/**
 * @template T
 * @interface
 * @property {Column<T>[]} columns 컬럼 리스트
 * @property {T[]} data 데이터 리스트
 * @property {boolean} [isLoading] 로딩 여부
 * @property {boolean} [hasFooter] Footer 여부
 * @property {RowSelectCallback<T>} [onRowSelect] 선택된 row 가 변경될 때마다 발생하는 이벤트 콜백
 * @property {boolean} [rowSelectOnClick] row 클릭으로 선택되는지 여부
 * @property {SortingChangeCallback<T>} [onSortingChange] sorting 이 변경될 때마다 발생하는 이벤트 콜백
 * @property {SelectedRowsCallback<T>} [onSelectedRowsChange] checkbox로 선택된 row가 변경될때마다 호출하는 이벤트 콜백
 * @property {boolean} [serverSideSorting] serverSideSorting 여부
 * @property {number} [skeletonCount] 로딩 시 스켈레톤 row 개수
 * @property {string} [emptyText] 데이터 리스트 비어있을 때 노출되는 메시지
 * @property {string} [emptyCellText] cell 비어있을 때 노출되는 메시지
 * */
export interface TableProps<T extends object> extends SimpleTableProps {
  columns: Column<T>[]
  data: T[]
  isLoading?: boolean
  hasFooter?: boolean
  // FIX ME: 체크박스 동작과 연결되어 있지 않습니다. 수정필요!
  onRowSelect?: RowSelectCallback<T>
  rowSelectOnClick?: boolean
  onSortingChange?: SortingChangeCallback<T>
  onSelectedRowsChange?: SelectedRowsCallback<T>
  serverSideSorting?: boolean
  skeletonCount?: number
  emptyText?: string
  emptyCellText?: string
  rowProps?: (row: Row<T>) => RowPropGetter<T>
  cellProps?: (column: Column<T>) => CellPropGetter<T>
}

function Table<T extends object>({
  isLoading,
  columns,
  data,
  hasFooter,
  onRowSelect,
  rowSelectOnClick,
  onSortingChange,
  onSelectedRowsChange,
  serverSideSorting,
  skeletonCount = 5,
  emptyText = '정보가 없습니다',
  emptyCellText,
  rowProps,
  cellProps,
  ...rest
}: TableProps<T>) {
  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column, index) => {
            const skeleton: Column<T> = {
              id: index.toString(),
              Header: <Skeleton width={100} height={16} />,
              Cell: <Skeleton width={100} height={16} />,
            }

            return skeleton
          })
        : columns,
    [isLoading, columns]
  )

  const tableData = useMemo(
    () => (isLoading ? Array(skeletonCount).fill({}) : data),
    [isLoading, skeletonCount, data]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    prepareRow,
    rows,
    selectedFlatRows,
    isAllRowsSelected,
    state: { selectedRowIds },
  } = useTable<T>(
    {
      columns: tableColumns,
      data: tableData,
      manualSortBy: serverSideSorting,
    },
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [...columns])
    },
    useSticky
  )

  // FIX ME: react-table에서 checkbox로 선택된 rows를 받아오는 방식을 급하게 구현한 것입니다.
  // 이후 매뉴얼을 숙지하여 더 나은 방식으로 교체할 예정입니다.
  useEffect(() => {
    const selectedRows = rows.filter((row) => !!selectedRowIds[row.id])
    if (onSelectedRowsChange) {
      onSelectedRowsChange(selectedRows)
    }
  }, [onSelectedRowsChange, selectedRowIds, rows])

  const handleRowClick = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement>, row: Row<T>) => {
      if (!rowSelectOnClick) return

      e.preventDefault()
      row.toggleRowSelected()
      onRowSelect?.(selectedFlatRows, isAllRowsSelected)
    },
    [isAllRowsSelected, onRowSelect, rowSelectOnClick, selectedFlatRows]
  )

  return (
    <SimpleTable {...rest} {...getTableProps()}>
      <THead>
        {headerGroups.map((headerGroup) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((header) => {
                const column = header as Column<T>
                const { style: headerStyle, ...headerProps } =
                  header.getHeaderProps()
                const style = { ...column.style, ...headerStyle }

                return column.sortable ? (
                  <SortableHeader
                    {...headerProps}
                    style={style}
                    header={header}
                    isSorted={header.isSorted}
                    isSortedDesc={header.isSortedDesc}
                    onSortingChange={onSortingChange}
                  />
                ) : (
                  <Th {...headerProps} style={style}>
                    {header.render('Header')}
                  </Th>
                )
              })}
            </Tr>
          )
        })}
      </THead>
      <TBody {...getTableBodyProps()}>
        {rows.length > 0 ? (
          rows.map((row) => {
            prepareRow(row)

            return (
              // eslint-disable-next-line react/jsx-key
              <Tr
                {...row.getRowProps(rowProps?.(row))}
                onClick={(e) => handleRowClick(e, row)}
              >
                {row.cells.map((cell) => {
                  const column = cell.column as Column<T>
                  const { value } = cell

                  const { style: cellStyle, ...cellPropsRest } = {
                    ...cell.getCellProps(cellProps?.(column)),
                  }

                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Td
                      style={{ ...cellStyle, ...column.style }}
                      {...cellPropsRest}
                    >
                      {Boolean(column.accessor) &&
                      hasNoValue(value) &&
                      !column.isAlwaysExecuteCell
                        ? emptyCellText || ''
                        : cell.render('Cell')}
                    </Td>
                  )
                })}
              </Tr>
            )
          })
        ) : (
          <EmptyRow text={emptyText} columnCount={columns.length} />
        )}
      </TBody>
      {hasFooter && !isLoading && (
        <TFoot>
          <Tr {...footerGroups[0].getFooterGroupProps()}>
            {footerGroups[0].headers.map((header) => {
              const column = header as Column<T>

              const { style: footerStyle, ...footerProps } = {
                ...header.getFooterProps(),
              }

              return (
                // eslint-disable-next-line react/jsx-key
                <Td
                  {...footerProps}
                  style={{ ...footerStyle, ...column.style }}
                >
                  {header.render('Footer')}
                </Td>
              )
            })}
          </Tr>
        </TFoot>
      )}
    </SimpleTable>
  )
}

export default Table
