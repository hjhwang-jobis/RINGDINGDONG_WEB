import { Spacing, useGlobalModal } from '@3o3/mystique-components'
import { Button } from '@fe3o3/ui'
import React, { useCallback, useMemo, useState } from 'react'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import KeyValueTable from '~/components/KeyValueTable'
import { FriendtalkCouponButton } from '~/friendtalk/types'
import { validators } from '~/utils'

import ModalConfirmDeleteCoupon from './ModalConfirmDeleteCoupon'

interface FormRowCouponButtonProps {
  coupon: FriendtalkCouponButton
  onDelete: () => void
  onBlur: (coupon: FriendtalkCouponButton) => void
}

// FIX ME input field의 너비를 외부에서 제어하기 어렵습니다. fullWidth 속성을 주면, 컨테이너 바깥으로 나가는 현상이 있습니다.
// FIX ME 쿠폰은 배열이 아닌 1개입니다.

const FormRowCouponButton = ({
  coupon: couponFromProps,
  onDelete,
}: FormRowCouponButtonProps) => {
  const { openModal } = useGlobalModal()
  // eslint-disable-next-line
  const [coupon, setCoupon] = useState<FriendtalkCouponButton | null>({
    ...couponFromProps,
  })

  const validateUrlInRules = useCallback((v) => {
    return validators.isUrl(v) || '유효한 url 형식으로 입력해주세요'
  }, [])

  return (
    <>
      {coupon && (
        <KeyValueTable.Root>
          <KeyValueTable.KeyColumn>Title</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowBasicInputField
              // TODO Form에 설정할 수 있는 이름으로 세팅해야 합니다.
              name={''}
              placeholder="쿠폰 이름을 입력해주세요"
              validateInRules={(v) =>
                (v.length > 5 && v.length < 10) ||
                '5글자 이상, 10글자 이하로 입력해주세요'
              }
            />
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>Description</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowBasicInputField
              // TODO Form에 설정할 수 있는 이름으로 세팅해야 합니다.
              name={''}
              placeholder="쿠폰 설명을 입력해주세요"
              validateInRules={(v) =>
                (v.length > 5 && v.length < 10) ||
                '5글자 이상, 10글자 이하로 입력해주세요'
              }
            />
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>Mobile</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowBasicInputField
              // TODO Form에 설정할 수 있는 이름으로 세팅해야 합니다.
              name={''}
              placeholder="쿠폰 모바일 웹 url을 입력해주세요"
              validateInRules={validateUrlInRules}
            />
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>PC</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowBasicInputField
              // TODO Form에 설정할 수 있는 이름으로 세팅해야 합니다.
              name={''}
              placeholder="쿠폰 PC 웹 url을 입력해주세요"
              validateInRules={validateUrlInRules}
            />
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>Android</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowBasicInputField
              // TODO Form에 설정할 수 있는 이름으로 세팅해야 합니다.
              name={''}
              placeholder="쿠폰 안드로이드 딥링크 url을 입력해주세요"
              validateInRules={validateUrlInRules}
            />
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>ios</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowBasicInputField
              // TODO Form에 설정할 수 있는 이름으로 세팅해야 합니다.
              name={''}
              placeholder="쿠폰 iOS 딥링크 url을 입력해주세요"
              validateInRules={validateUrlInRules}
            />
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>삭제 버튼</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <Button
              size="small"
              variant="lineRed"
              onClick={() => {
                openModal(
                  <ModalConfirmDeleteCoupon onDelete={() => onDelete()} />
                )
              }}
            >
              삭제하기
            </Button>
          </KeyValueTable.ValueColumn>
        </KeyValueTable.Root>
      )}
    </>
  )
}

interface Props {
  couponButton: FriendtalkCouponButton | null
}

export default function FormRowCoupon({ couponButton }: Props) {
  const [coupon, setCoupon] = useState<FriendtalkCouponButton | null>(
    couponButton
  )

  const onDelete = useCallback(() => {
    setCoupon(null)
  }, [setCoupon])
  const onChange = useCallback(
    (item: FriendtalkCouponButton) => {
      setCoupon(item)
    },
    [setCoupon]
  )

  const createCoupon = useCallback(() => {
    setCoupon({
      title: '',
      description: '',
      linkMobile: '',
      linkPc: '',
      schemeAndroid: '',
      schemeIos: '',
    })
  }, [setCoupon])

  const stringified = useMemo(
    () => (coupon ? JSON.stringify(coupon) : ''),
    [coupon]
  )

  return (
    <>
      <input
        type="hidden"
        // TODO Form에 설정할 수 있는 이름으로 세팅해야 합니다.
        name={''}
        value={stringified}
      />
      {/* TODO 쿠폰 관련 API가 완료된 이후 연동해야 합니다. 그 전까지는 disabled 처리합니다. */}
      {/* https://jobis.slack.com/archives/C05BPGKMPS9/p1692588427873619?thread_ts=1692587639.785499&cid=C05BPGKMPS9 */}
      <Button size="small" onClick={createCoupon} disabled={true}>
        쿠폰 추가
      </Button>
      {coupon && (
        <>
          <Spacing px={16} />
          <FormRowCouponButton
            coupon={coupon}
            onBlur={onChange}
            onDelete={onDelete}
          />
        </>
      )}
    </>
  )
}
