import { Flex, Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { ErrorInfo } from '@3o3-internal/components'
import {
  BaseModal,
  ConfirmModal,
  Pagination2,
  useModal,
} from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { queryClient } from '~/api/reactQuery'
import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import KeyValueTable from '~/components/KeyValueTable'
import { usePostTestersDeleteMutation } from '~/hooks/queries/tester/usePostTestersDeleteMutation'
import { queryKeys } from '~/keys/queries'
import { RoutePath } from '~/routes'
import { GetTesters, Pagination } from '~/types/api'
import { apiUtils } from '~/utils'
import { validators } from '~/utils'

import TesterListTable from './TesterListTable'

interface Props {
  data: GetTesters.Tester[]
  pagination: Pagination
}

export default function TesterList({ data, pagination }: Props) {
  const { showModal } = useModal()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get('userId')
  const [selectedTesterIds, setSelectedTesterIds] = useState<number[]>([])

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      userId,
    },
  })

  const { mutate, error } = usePostTestersDeleteMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.testers.BASE)
      setSearchParams({
        page: '1',
        size: `${pagination.pageSize}`,
      })
    },
  })

  return (
    <>
      {error && (
        <>
          <ErrorInfo
            title="테스터 삭제 오류"
            message={apiUtils.getApiErrorMessage(error)}
          />
          <Spacing px={10} />
        </>
      )}
      <Flex justifyContent="end">
        <Button
          size="small"
          variant="danger"
          style={{
            margin: '10px 0 10px 10px',
          }}
          onClick={() => {
            showModal(DeleteTesterConfirmModal, {
              testerIds: [...selectedTesterIds],
              onDelete: () =>
                mutate({
                  ids: [...selectedTesterIds],
                }),
            })
          }}
          disabled={selectedTesterIds.length < 1}
        >
          테스터 삭제하기
        </Button>
        <Button
          size="small"
          variant="primary"
          style={{
            margin: '10px 0 10px 10px',
          }}
          onClick={() => {
            navigate(`${RoutePath.Tester}/${RoutePath.RegisterTester}`)
          }}
        >
          테스터 추가하기
        </Button>
      </Flex>
      <Spacing px={10} />
      <FormProvider {...methods}>
        <KeyValueTable.Root>
          <KeyValueTable.KeyColumn>userId</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowBasicInputField
              name={'userId'}
              placeholder="Terry user id는 숫자로 구성되어 있습니다"
              validateInRules={(v) =>
                validators.run([validators.validateInRulesFormatUserId(v)])
              }
            />
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>검색하기</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <Button
              size="small"
              variant="primary"
              onClick={() =>
                setSearchParams({
                  page: '1',
                  size: `${pagination.pageSize}`,
                  userId: methods.getValues('userId') ?? '',
                })
              }
            >
              검색하기
            </Button>
          </KeyValueTable.ValueColumn>
        </KeyValueTable.Root>
      </FormProvider>
      <Spacing px={10} />
      <TesterListTable
        data={data}
        onSelect={(selectedIdxList) => {
          if (selectedIdxList.join('') === selectedTesterIds.join('')) {
            return
          }
          setSelectedTesterIds(selectedIdxList)
        }}
      />
      <Spacing px={10} />
      <Pagination2
        page={pagination.pageNo || 0}
        onChange={(pageNo) =>
          setSearchParams({
            page: `${pageNo + 1}`,
            size: `${pagination.pageSize}`,
            userId: userId ?? '',
          })
        }
        pageCount={pagination.totalPage}
      />
    </>
  )
}

interface ModalProps extends BaseModal {
  testerIds: number[]
  onDelete: () => void
}
function DeleteTesterConfirmModal({
  modalKey,
  testerIds,
  onDelete,
}: ModalProps) {
  return (
    <ConfirmModal
      modalKey={modalKey}
      title="선택한 테스터 유저를 삭제하시겠습니까?"
      okVariant="danger"
      okTitle="삭제하기"
      onOkClick={onDelete}
    >
      <Text typography="body14" weight="regular">
        {`${testerIds.join(',')}번의 테스터들을 삭제합니다.`}
      </Text>
      <br />
      <Text
        typography="body14"
        weight="medium"
        color={colors.light.scheme.$red60}
      >
        다시 한번 더 확인해주세요.
      </Text>
    </ConfirmModal>
  )
}
