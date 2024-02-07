import { Spacing } from '@3o3/mystique-components'
import { BaseModal, ErrorInfo, Modal, useModal } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import { InfiniteData } from '@tanstack/react-query'
import React, { useRef } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import InfiniteScrollBottom from '~/components/InfiniteScrollBottom'
import KeyValueTable from '~/components/KeyValueTable'
import Loader from '~/components/Loader'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from '~/constants'
import { useGetDoneMessageGroupsListInfiniteQuery } from '~/hooks/queries/target/useGetDoneMessageGroupsListInfiniteQuery'
import { useGetTargetsQueriesInfiniteQuery } from '~/hooks/queries/targetQuery/useGetTargetsQueriesInfiniteQuery'
import { DoneMessageFormType, TargetQueryFormType } from '~/target/types'
import {
  GetDoneMessageGroupsList,
  GetTargets,
  GetTargetsQueriesList,
  Response,
} from '~/types/api/'
import { apiUtils } from '~/utils'

import DoneMessageGroupsListTable from './DoneMessageGroupsListTableInModal'
import TargetFormRowDoneMessage from './TargetFormRowDoneMessage'
import TargetFormRowTargetQuery from './TargetFormRowTargetQuery'
import TargetQueryListTableInModal from './TargetQueryListTableInModal'

interface Props {
  disabled: boolean
}

export default function TargetFormRowTargetGroup({ disabled }: Props) {
  const { showModal } = useModal()

  const { control, watch } = useFormContext()
  const targetQueryFieldArray = useFieldArray({
    control: control,
    name: 'targetQueries',
  })

  const doneMessageFieldArray = useFieldArray({
    control: control,
    name: 'doneMessages',
  })

  const targetQueries: TargetQueryFormType[] = watch('targetQueries')
  const doneMessages: DoneMessageFormType[] = watch('doneMessages')

  return (
    <>
      <KeyValueTable.Root>
        <KeyValueTable.KeyColumn>타겟 쿼리 목록</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <Button
            variant="lightBlue"
            size="small"
            onClick={() =>
              showModal(TargetQuerySearchModal, {
                callback: (targetQueryList) =>
                  targetQueryFieldArray.append(
                    targetQueryList.map((v) => ({
                      ...v,
                      isIncluded: false,
                    }))
                  ),
                unselectableQueryIdList: targetQueries.map((v) => v.queryId),
              })
            }
          >
            추가
          </Button>
          <Spacing px={10} />
          {targetQueryFieldArray.fields.map((field, idx) => (
            <TargetFormRowTargetQuery
              key={field.id}
              idx={idx}
              disabled={disabled}
              onDelete={(v) => targetQueryFieldArray.remove(v)}
            />
          ))}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>수신 이력 목록</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <Button
            variant="lightBlue"
            size="small"
            onClick={() =>
              showModal(DoneMessageGroupSearchModal, {
                callback: (doneMessageList) =>
                  doneMessageFieldArray.append(
                    doneMessageList.map((v) => ({
                      ...v,
                      isIncluded: false,
                    }))
                  ),
                unselectableIdList: doneMessages.map((v) => v.id),
              })
            }
          >
            추가
          </Button>
          <Spacing px={10} />
          {doneMessageFieldArray.fields.map((field, idx) => (
            <TargetFormRowDoneMessage
              key={field.id}
              idx={idx}
              disabled={disabled}
              onDelete={(v) => doneMessageFieldArray.remove(v)}
            />
          ))}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>uid 업로드(csv)</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>(개발 중 입니다)</KeyValueTable.ValueColumn>
      </KeyValueTable.Root>
    </>
  )
}

const flatItems = (
  response?: InfiniteData<Response<GetTargetsQueriesList.Response>>
): GetTargets.TargetQuery[] => {
  if (!response || !response.pages || response.pages.length === 0) return []

  return response.pages.flatMap((group) => [...group.data.contents])
}

interface TargetQuerySearchModalProps extends BaseModal {
  callback: (targetQueryList: GetTargets.TargetQuery[]) => void
  unselectableQueryIdList: string[]
}

const TargetQuerySearchModal = ({
  modalKey,
  callback,
  unselectableQueryIdList,
}: TargetQuerySearchModalProps) => {
  const targetQueryListRef = useRef<GetTargets.TargetQuery[]>([])

  const {
    data: response,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    error,
  } = useGetTargetsQueriesInfiniteQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNo: DEFAULT_PAGE_NO - 1,
      queryId: '',
      title: '',
    },
    {}
  )

  const items = flatItems(response)

  return (
    <Modal
      modalKey={modalKey}
      hasCancel
      cancelVariant="secondary"
      size="xl"
      title="타겟 쿼리 목록"
      onOkClick={() => callback(targetQueryListRef.current)}
    >
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="타겟 쿼리 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && items.length > 0 ? (
        <>
          <TargetQueryListTableInModal
            data={items}
            onSelected={(selectedTargetQueryList) => {
              if (
                selectedTargetQueryList.map((v) => v.id).join('') ===
                targetQueryListRef.current.map((v) => v.id).join('')
              ) {
                return
              }
              targetQueryListRef.current = [...selectedTargetQueryList]
            }}
            unselectableQueryIdList={unselectableQueryIdList}
          />
          <InfiniteScrollBottom
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage ?? false}
            fetchNextPage={fetchNextPage}
          />
        </>
      ) : null}
    </Modal>
  )
}

const flatDoneMessageGroupsListItems = (
  response?: InfiniteData<Response<GetDoneMessageGroupsList.Response>>
): GetDoneMessageGroupsList.MessageGroup[] => {
  if (!response) return []

  return response.pages.flatMap((group) => [...group.data.contents])
}

interface DoneMessageGroupSearchModalProps extends BaseModal {
  callback: (
    doneMessageGroupList: GetDoneMessageGroupsList.MessageGroup[]
  ) => void
  unselectableIdList: number[]
}

const DoneMessageGroupSearchModal = ({
  modalKey,
  callback,
  unselectableIdList,
}: DoneMessageGroupSearchModalProps) => {
  const doneMessageGroupsListRef = useRef<
    GetDoneMessageGroupsList.MessageGroup[]
  >([])

  const {
    data: response,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    error,
  } = useGetDoneMessageGroupsListInfiniteQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNo: DEFAULT_PAGE_NO - 1,
    },
    {}
  )

  const items = flatDoneMessageGroupsListItems(response)

  return (
    <Modal
      modalKey={modalKey}
      hasCancel
      cancelVariant="secondary"
      size="xl"
      title="수신 이력 목록"
      onOkClick={() => callback(doneMessageGroupsListRef.current)}
    >
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="수신 이력 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response ? (
        <>
          <DoneMessageGroupsListTable
            data={items}
            onSelected={(selectedDoneMessageGroupsList) => {
              if (
                selectedDoneMessageGroupsList.map((v) => v.id).join('') ===
                doneMessageGroupsListRef.current.map((v) => v.id).join('')
              ) {
                return
              }
              doneMessageGroupsListRef.current = [
                ...selectedDoneMessageGroupsList,
              ]
            }}
            unselectableIdList={unselectableIdList}
          />
          <InfiniteScrollBottom
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage ?? false}
            fetchNextPage={fetchNextPage}
          />
        </>
      ) : null}
    </Modal>
  )
}
