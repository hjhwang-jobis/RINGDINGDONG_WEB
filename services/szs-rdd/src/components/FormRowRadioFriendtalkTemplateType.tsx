import React from 'react'

import FormRowRadio from '~/components/FormRowRadio'
import {
  FRIENDTALK_TEMPLATE_TYPE_NAME,
  FriendtalkTemplateType,
} from '~/friendtalk/constants'

interface Props {
  name: string
  readOnly?: boolean
  onChange?: (v: FriendtalkTemplateType) => void
}

export default function FormRowRadioFriendtalkTemplateType({
  name,
  readOnly = false,
  onChange,
}: Props) {
  return (
    <FormRowRadio
      name={name}
      options={[
        {
          label: FRIENDTALK_TEMPLATE_TYPE_NAME.기본텍스트,
          value: FriendtalkTemplateType.BASE,
        },
        {
          label: FRIENDTALK_TEMPLATE_TYPE_NAME.와이드이미지,
          value: FriendtalkTemplateType.WIDE_IMAGE,
        },
        {
          label: FRIENDTALK_TEMPLATE_TYPE_NAME.와이드리스트,
          value: FriendtalkTemplateType.WIDE_LIST,
        },
        {
          label: FRIENDTALK_TEMPLATE_TYPE_NAME.캐러셀,
          value: FriendtalkTemplateType.CAROUSEL,
        },
      ]}
      readOnly={readOnly}
      onChange={(v) => onChange?.(v)}
    />
  )
}
