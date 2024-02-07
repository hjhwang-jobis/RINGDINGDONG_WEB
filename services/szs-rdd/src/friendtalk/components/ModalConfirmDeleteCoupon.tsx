import { Modal } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'

interface Props {
  onDelete: () => void
}

export default function ModalConfirmDeleteCoupon({ onDelete }: Props) {
  return (
    <Modal.Root>
      <Modal.Header>쿠폰을 삭제하시겠습니까?</Modal.Header>
      <Modal.Body>
        <span css={{ color: colors.light.scheme.$red50 }}>
          입력한 정보가 모두 삭제됩니다.
        </span>
        <br />
        계속 진행하시겠습니까?
      </Modal.Body>
      <Modal.Button
        primary={{
          buttonType: 'box',
          variant: 'outlineRed',
          children: '삭제하기',
          onClick: onDelete,
        }}
        secondary={{
          buttonType: 'box',
          variant: 'outlineGray',
          children: '취소',
        }}
      />
    </Modal.Root>
  )
}
