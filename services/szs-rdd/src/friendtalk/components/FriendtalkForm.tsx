import React, { useMemo, useState } from 'react'

import { PageMode, SendProfile } from '~/constants'
import FormTypeBasicText from '~/friendtalk/components/FormTypeBase'
import FormTypeCarousel from '~/friendtalk/components/FormTypeCarousel'
import FormTypeWideImage from '~/friendtalk/components/FormTypeWideImage'
import FormTypeWideList from '~/friendtalk/components/FormTypeWideList'
import { FriendtalkTemplateType } from '~/friendtalk/constants'
import {
  FormTypeBaseData,
  FormTypeCarouselData,
  FormTypeMap,
  FormTypeWideImageData,
  FormTypeWideListData,
} from '~/friendtalk/types'
import {
  parseContentTypeBase,
  parseContentTypeCarousel,
  parseContentTypeWideImage,
  parseContentTypeWideList,
} from '~/friendtalk/utils'
import { GetFriendtalkTemplates, Response } from '~/types/api'

const createFriendtalkEmpty = () => ({
  id: -1,
  sendProfile: Object.values(SendProfile)[0],
  templateCode: '',
  templateType: FriendtalkTemplateType.BASE,
  description: '',
  requestParameter: [],
  autoFillParameter: {},
  imageIds: [],
  content: '',
  advertisement: false,
})

const createFormData = (
  friendtalk?: GetFriendtalkTemplates.FriendtalkTemplate
): FormTypeMap => {
  const friendtalkSafe = friendtalk
    ? { ...friendtalk, imageIds: [] }
    : createFriendtalkEmpty()

  const isTypeBase = friendtalkSafe.templateType === FriendtalkTemplateType.BASE
  const contentTypeBase = isTypeBase
    ? parseContentTypeBase(friendtalkSafe.content)
    : parseContentTypeBase()

  const isTypeWideImage =
    friendtalkSafe.templateType === FriendtalkTemplateType.WIDE_IMAGE
  const contentTypeWideImage = isTypeWideImage
    ? parseContentTypeWideImage(friendtalkSafe.content)
    : parseContentTypeWideImage()
  const isTypeWideList =
    friendtalkSafe.templateType === FriendtalkTemplateType.WIDE_LIST
  const contentTypeWideList = isTypeWideList
    ? parseContentTypeWideList(friendtalkSafe.content)
    : parseContentTypeWideList()
  const isTypeCarousel =
    friendtalkSafe.templateType === FriendtalkTemplateType.CAROUSEL
  const contentTypeCarousel = isTypeCarousel
    ? parseContentTypeCarousel(friendtalkSafe.content)
    : parseContentTypeCarousel()

  return {
    templateType: friendtalkSafe.templateType,
    templateCode: friendtalkSafe.templateCode,
    sendProfile: friendtalkSafe.sendProfile as SendProfile,
    description: friendtalkSafe.description,
    requestParameter: friendtalkSafe.requestParameter,
    autoFillParameter: friendtalkSafe.autoFillParameter,
    imageIds: friendtalkSafe.imageIds,
    contentTypeBase,
    contentTypeWideImage,
    contentTypeWideList,
    contentTypeCarousel,
  }
}

interface Props {
  friendtalkResponse?: Response<GetFriendtalkTemplates.Response>
  pageMode: PageMode
}

export default function FriendtalkForm({
  friendtalkResponse,
  pageMode,
}: Props) {
  const formTypeDataDefault = useMemo(
    () =>
      createFormData(friendtalkResponse ? friendtalkResponse.data : undefined),
    [friendtalkResponse]
  )
  const [formTypeData, setFormTypeData] = useState({
    ...formTypeDataDefault,
  })

  const isPageModeReadOnly = pageMode === PageMode.READ_ONLY

  return (
    <>
      {`${formTypeData.templateType}` === FriendtalkTemplateType.BASE ? (
        <FormTypeBasicText
          data={{
            templateType: formTypeData.templateType,
            templateCode: formTypeData.templateCode,
            sendProfile: formTypeData.sendProfile,
            description: formTypeData.description,
            requestParameter: formTypeData.requestParameter,
            autoFillParameter: formTypeData.autoFillParameter,
            imageIds: formTypeData.imageIds,
            contentTypeBase: formTypeData.contentTypeBase,
          }}
          onChangeTemplateType={(newData: FormTypeBaseData) =>
            setFormTypeData((oldData) => {
              return {
                ...oldData,
                ...newData,
              }
            })
          }
          readOnly={isPageModeReadOnly}
        />
      ) : `${formTypeData.templateType}` === FriendtalkTemplateType.CAROUSEL ? (
        <FormTypeCarousel
          data={{
            templateType: formTypeData.templateType,
            templateCode: formTypeData.templateCode,
            sendProfile: formTypeData.sendProfile,
            description: formTypeData.description,
            imageIds: formTypeData.imageIds,
            contentTypeCarousel: formTypeData.contentTypeCarousel,
            autoFillParameter: formTypeData.autoFillParameter,
            requestParameter: formTypeData.requestParameter,
          }}
          onChangeTemplateType={(newData: FormTypeCarouselData) =>
            setFormTypeData((oldData) => {
              return {
                ...oldData,
                ...newData,
              }
            })
          }
          readOnly={isPageModeReadOnly}
        />
      ) : `${formTypeData.templateType}` ===
        FriendtalkTemplateType.WIDE_IMAGE ? (
        <FormTypeWideImage
          data={{
            templateType: formTypeData.templateType,
            templateCode: formTypeData.templateCode,
            sendProfile: formTypeData.sendProfile,
            description: formTypeData.description,
            autoFillParameter: formTypeData.autoFillParameter,
            requestParameter: formTypeData.requestParameter,
            imageIds: formTypeData.imageIds,
            contentTypeWideImage: formTypeData.contentTypeWideImage,
          }}
          onChangeTemplateType={(newData: FormTypeWideImageData) =>
            setFormTypeData((oldData) => {
              return {
                ...oldData,
                ...newData,
              }
            })
          }
          readOnly={isPageModeReadOnly}
        />
      ) : `${formTypeData.templateType}` ===
        FriendtalkTemplateType.WIDE_LIST ? (
        <FormTypeWideList
          data={{
            templateType: formTypeData.templateType,
            templateCode: formTypeData.templateCode,
            sendProfile: formTypeData.sendProfile,
            description: formTypeData.description,
            autoFillParameter: formTypeData.autoFillParameter,
            requestParameter: formTypeData.requestParameter,
            imageIds: formTypeData.imageIds,
            contentTypeWideList: formTypeData.contentTypeWideList,
          }}
          onChangeTemplateType={(newData: FormTypeWideListData) =>
            setFormTypeData((oldData) => {
              return {
                ...oldData,
                ...newData,
              }
            })
          }
          readOnly={isPageModeReadOnly}
        />
      ) : null}
    </>
  )
}
