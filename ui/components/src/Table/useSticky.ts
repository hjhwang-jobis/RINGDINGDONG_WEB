/**
 * Origin: https://github.com/GuillaumeJasmin/react-table-sticky
 * 해당 파일은 react-table v7 플러그인입니다. 위 라이브러리를 기반으로 작성되었습니다.
 */

import { useRef } from 'react'
import {
  ColumnInstance as BaseColumnInstance,
  Hooks,
  TableInstance,
  TableProps,
} from 'react-table'

type ColumnInstance<D extends object> = BaseColumnInstance<D> & {
  sticky?: 'left' | 'right'
}

useSticky.pluginName = 'useSticky'
const HEADER_CELL_ID = `header-cell`
let identifierCount = 0

function generateUniqueId() {
  return `T${identifierCount++}`
}

export function useSticky<D extends object>(hooks: Hooks<D>) {
  const tableId = useRef(generateUniqueId())

  hooks.getTableProps.push((props) => {
    const nextProps = getTableProps(tableId.current, props)

    return [props, nextProps]
  })

  hooks.getHeaderProps.push((props, { instance, column }) => {
    const nextProps = getStickyProps(
      tableId.current,
      'header',
      column,
      instance
    )

    return [props, nextProps]
  })

  hooks.getCellProps.push((props, { instance, cell }) => {
    const nextProps = getStickyProps(
      tableId.current,
      'cell',
      cell.column,
      instance
    )

    return [props, nextProps]
  })
}

function getTableProps(tableId: string, props: Partial<TableProps>) {
  const tableElement = document.getElementById(tableId)
  const scrollContainerElement = tableElement?.parentElement

  if (!scrollContainerElement) return { id: tableId, ...props }

  const hasHorizontalScroll =
    scrollContainerElement.scrollWidth > scrollContainerElement.clientWidth

  let className = props.className ?? ''

  if (hasHorizontalScroll) {
    className += ' horizontal-scroll'
  }

  return { ...props, id: tableId, className }
}

function getStickyProps<D extends object>(
  tableId: string,
  type: 'header' | 'cell',
  column: ColumnInstance<D>,
  instance: TableInstance<D>
) {
  const idPrefix = `${tableId}-${HEADER_CELL_ID}`
  let style = {}
  const dataAttrs: Record<string, unknown> = {}

  checkErrors(instance.columns)

  const sticky = getStickyValue(column)

  if (sticky) {
    style = {
      position: 'sticky',
      zIndex: 3,
    }

    if (sticky === 'left') {
      dataAttrs['data-sticky-left-td'] = true
    } else {
      dataAttrs['data-sticky-right-td'] = true
    }

    const headers = findHeadersSameLevel(column, instance.flatHeaders)

    const margin =
      sticky === 'left'
        ? getMarginLeft(idPrefix, column.id, headers)
        : getMarginRight(idPrefix, column.id, headers)

    style = {
      ...style,
      [sticky]: `${margin}px`,
    }

    const isLastLeftSticky = columnIsLastLeftSticky(column.id, headers)

    if (isLastLeftSticky) {
      dataAttrs['data-sticky-last-left-td'] = true
    }

    const isFirstRightSticky = columnIsFirstRightSticky(column.id, headers)

    if (isFirstRightSticky) {
      dataAttrs['data-sticky-first-right-td'] = true
    }
  }

  return {
    id: type === 'header' && sticky ? `${idPrefix}-${column.id}` : undefined,
    style,
    ...dataAttrs,
  }
}

export function getStickyValue<D extends object>(
  column: ColumnInstance<D>
): null | 'left' | 'right' {
  if (column.sticky === 'left' || column.sticky === 'right') {
    return column.sticky
  }

  if (column.parent) {
    return getStickyValue(column.parent)
  }

  return null
}

export function columnIsLastLeftSticky<D extends object>(
  columnId: ColumnInstance<D>['id'],
  columns: ColumnInstance<D>[]
): boolean {
  const index = columns.findIndex(({ id }: any) => id === columnId)
  const column = columns[index]
  const nextColumn = columns[index + 1]
  const columnIsLeftSticky = getStickyValue(column) === 'left'
  const nextColumnIsLeftSticky =
    nextColumn && getStickyValue(nextColumn) === 'left'

  return columnIsLeftSticky && !nextColumnIsLeftSticky
}

export function columnIsFirstRightSticky<D extends object>(
  columnId: ColumnInstance<D>['id'],
  columns: ColumnInstance<D>[]
): boolean {
  const index = columns.findIndex(({ id }: any) => id === columnId)
  const column = columns[index]
  const prevColumn = columns[index - 1]
  const columnIsRightSticky = getStickyValue(column) === 'right'
  const prevColumnIsRightSticky =
    prevColumn && getStickyValue(prevColumn) === 'right'

  return columnIsRightSticky && !prevColumnIsRightSticky
}

function getMarginLeft<D extends object>(
  idPrefix: string,
  columnId: ColumnInstance<D>['id'],
  columns: ColumnInstance<D>[]
) {
  const currentIndex = columns.findIndex(({ id }) => id === columnId)
  let margin = -1

  columns.forEach((value, index) => {
    if (index >= currentIndex) return

    if (getStickyValue(value) === 'left') {
      const columnId = `${idPrefix}-${String(value.id)}`

      if (columnId) {
        const width = getElementWidth(columnId)

        if (width) {
          margin += width - (index + 1)
        }
      }
    }
  })

  return margin
}

function getMarginRight<D extends object>(
  idPrefix: string,
  columnId: ColumnInstance<D>['id'],
  columns: ColumnInstance<D>[]
) {
  const currentIndex = columns.findIndex(({ id }) => id === columnId)
  const reversedCurrentIndex = columns.length - (currentIndex + 1)
  let margin = -1

  columns.reverse().forEach((value, index) => {
    if (index >= reversedCurrentIndex) return

    if (getStickyValue(value) === 'right') {
      const columnId = `${idPrefix}-${String(value.id)}`

      if (columnId) {
        const width = getElementWidth(columnId)

        if (width) {
          margin += width - (index + 1)
        }
      }
    }
  })

  return margin
}

function getElementWidth(id: string) {
  return document.getElementById(id)?.offsetWidth
}

function findHeadersSameLevel<D extends object>(
  header: ColumnInstance<D>,
  headers: ColumnInstance<D>[]
) {
  return headers.filter((flatHeaderItem: any) => {
    return flatHeaderItem.depth === header.depth
  })
}

export function checkErrors<D extends object>(columns: ColumnInstance<D>[]) {
  const hasGroups = !!columns.find((column) => column.parent)
  const stickyColumnsWithoutGroup = columns
    .filter((column) => column.sticky && !column.parent)
    .map(({ Header }) => `'${Header}'`)

  if (hasGroups && stickyColumnsWithoutGroup.length) {
    throw new Error(`WARNING react-table-sticky:
      \nYour ReactTable has group and sticky columns outside groups, and that will break UI.
      \nYou must place ${stickyColumnsWithoutGroup.join(
        ' and '
      )} columns into a group (even a group with an empty Header label)\n`)
  }

  const bugWithUnderColumnsSticky = columns.find(
    (parentCol) =>
      !parentCol.sticky &&
      parentCol.columns &&
      parentCol.columns.find((col: ColumnInstance<D>) => col.sticky)
  )

  if (!bugWithUnderColumnsSticky) return

  const childBugs = bugWithUnderColumnsSticky.columns?.find(
    ({ sticky }: ColumnInstance<D>) => sticky
  )

  if (!childBugs) return

  throw new Error(`WARNING react-table-sticky:
    \nYour ReactTable contain columns group with at least one child columns sticky.
    \nWhen ReactTable has columns groups, only columns groups can be sticky
    \nYou must set sticky: 'left' | 'right' for the '${bugWithUnderColumnsSticky.Header}'
    column, or remove the sticky property of '${childBugs.Header}' column.`)
}
