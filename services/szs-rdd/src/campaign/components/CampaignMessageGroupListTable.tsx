import { Flex, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import {
  Column,
  ConfirmModal,
  ErrorModal,
  SimpleModal,
  Table,
  useModal,
} from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import { Row } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import TableCellTextBlue from '~/components/TableCellTextBlue'
import TableCellTextRed from '~/components/TableCellTextRed'
import {
  ActiveTypeMap,
  MessageChannelType,
  MessageGroupSendStatusType,
  MessageGroupSendStatusTypeMap,
  SendProfile,
} from '~/constants'
import { usePutMessageGroupsCancelMutation } from '~/hooks/queries/messageGroup/usePutMessageGroupsCancelMutation'
import { usePutMessageGroupsDeactivateMutation } from '~/hooks/queries/messageGroup/usePutMessageGroupsDeactivateMutation'
import { RoutePath } from '~/routes'
import { BaseModal, MessageGroup } from '~/types'

interface Props {
  data: MessageGroup[]
  messageChannel: MessageChannelType
  campaignId: number
  sendProfile: SendProfile
}

export default function MessageGroupFormMessageGroupTemplateListTable({
  data,
  messageChannel,
  campaignId,
  sendProfile,
}: Props) {
  const navigate = useNavigate()

  const { showModal } = useModal()
  const { mutate } = usePutMessageGroupsCancelMutation({
    onSuccess: () =>
      showModal(SimpleModal, {
        title: '메시지 그룹 발송취소 성공',
      }),
    onError: (error) =>
      showModal(ErrorModal, {
        title: '메시지 그룹 발송취소 실패',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      }),
  })

  const { mutate: mutateDeactivate } = usePutMessageGroupsDeactivateMutation({
    onSuccess: () =>
      showModal(SimpleModal, {
        title: '메시지 그룹 비활성화 성공',
      }),
    onError: (error) =>
      showModal(ErrorModal, {
        title: '메시지 그룹 비활성화 실패',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      }),
  })

  const columns = useMemo<Column<MessageGroup>[]>(
    () => [
      {
        Header: 'id',
        accessor: 'id',
        Cell: ({ value, row }) => {
          if (!row.original.isActive) {
            return value
          }

          const to = `${RoutePath.MessageGroup}/${RoutePath.MessageGroupDetail}/${value}?messageChannel=${messageChannel}&sendProfile=${sendProfile}`

          return <Link to={to}>{value}</Link>
        },
      },
      {
        Header: '메시지그룹명',
        accessor: 'name',
        Cell: ({ value, row }) => {
          if (!row.original.isActive) {
            return value
          }

          const to = `${RoutePath.MessageGroup}/${RoutePath.MessageGroupDetail}/${row.original.id}?messageChannel=${messageChannel}&sendProfile=${sendProfile}`

          return <Link to={to}>{value}</Link>
        },
      },
      {
        Header: '발송 상태',
        accessor: 'sendStatus',
        Cell: ({ value }) =>
          MessageGroupSendStatusTypeMap[value as MessageGroupSendStatusType],
      },
      {
        Header: '발송예정 시각',
        accessor: 'sendingRequestAt',
      },
      {
        Header: '분할시작지점',
        accessor: 'partitionFrom',
      },
      {
        Header: '분할종료지점',
        accessor: 'partitionTo',
      },
      {
        Header: '발송요청건수',
        accessor: 'requestedCount',
      },
      {
        Header: '발송건수',
        accessor: 'sentCount',
      },
      {
        Header: '발송실패건수',
        accessor: 'failedCount',
      },
      {
        Header: '수신건수',
        accessor: 'succeedCount',
      },
      {
        Header: '활성화여부',
        accessor: 'isActive',
        Cell: ({ value }) =>
          value ? (
            <TableCellTextBlue text={ActiveTypeMap.ACTIVE} />
          ) : (
            <TableCellTextRed text={ActiveTypeMap.DEACTIVE} />
          ),
      },
      {
        Header: '생성일시',
        accessor: 'createdAt',
      },
      {
        Header: '수정일시',
        accessor: 'updatedAt',
      },
      {
        Header: '활성/비활성',
        id: 'activate',
        Cell: ({ row }: { row: Row<MessageGroup> }) => {
          if (
            row.original.isActive &&
            row.original.sendStatus === MessageGroupSendStatusType.WAITING
          ) {
            return (
              <Flex justifyContent="center">
                <Button
                  size="small"
                  variant="danger"
                  disabled={!row.original.isActive}
                  onClick={() => {
                    showModal(DeactiveConfirmModal, {
                      onUpdate: () =>
                        mutateDeactivate({
                          messageGroupId: row.original.id,
                        }),
                    })
                  }}
                >
                  비활성화
                </Button>
              </Flex>
            )
          }

          return (
            <Flex justifyContent="center">
              <Button
                size="small"
                variant="lineBlue"
                disabled={row.original.isActive}
                onClick={() => {
                  navigate(
                    `${RoutePath.MessageGroup}/${RoutePath.ActivateMessageGroup}/${campaignId}/${row.original.id}?messageChannel=${messageChannel}&sendProfile=${sendProfile}`
                  )
                }}
              >
                활성화
              </Button>
            </Flex>
          )
        },
      },
      {
        Header: '발송취소',
        id: 'cancel',
        Cell: ({ row }: { row: Row<MessageGroup> }) => {
          return (
            <Flex justifyContent="center">
              <Button
                size="small"
                variant="danger"
                disabled={
                  !row.original.isActive ||
                  row.original.sendStatus !== MessageGroupSendStatusType.WAITING
                }
                // onClick={() =>
                //   mutate({
                //     messageGroupId: row.original.id,
                //   })
                // }
                onClick={() => {
                  showModal(CancelConfirmModal, {
                    onUpdate: () =>
                      mutate({
                        messageGroupId: row.original.id,
                      }),
                  })
                }}
              >
                발송취소하기
              </Button>
            </Flex>
          )
        },
      },
    ],
    [
      messageChannel,
      sendProfile,
      showModal,
      mutateDeactivate,
      navigate,
      campaignId,
      mutate,
    ]
  )

  return <Table columns={columns} data={data} />
}

interface ModalProps extends BaseModal {
  onUpdate: () => void
}
function DeactiveConfirmModal({ modalKey, onUpdate }: ModalProps) {
  return (
    <ConfirmModal
      modalKey={modalKey}
      title="해당 메세지 그룹을 비활성화 하시겠습니까?"
      okVariant="danger"
      okTitle="비활성화"
      onOkClick={onUpdate}
    >
      <Text
        typography="body14"
        weight="medium"
        color={colors.light.scheme.$red60}
      >
        비활성화 시 모든 설정은 초기화 되며 추후 재활성화가 가능합니다.
      </Text>
    </ConfirmModal>
  )
}

function CancelConfirmModal({ modalKey, onUpdate }: ModalProps) {
  return (
    <ConfirmModal
      modalKey={modalKey}
      title="해당 메세지 그룹을 발송 취소 하시겠습니까?"
      okVariant="danger"
      okTitle="발송취소하기"
      onOkClick={onUpdate}
    >
      <Text
        typography="body14"
        weight="medium"
        color={colors.light.scheme.$red60}
      >
        발송 취소 후 다시 활성화를 할 수 없습니다. 다시 한번 확인해 주세요.
      </Text>
    </ConfirmModal>
  )
}
