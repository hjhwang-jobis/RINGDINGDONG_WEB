import {
  FriendtalkButtonTarget,
  FriendtalkButtonType,
} from '~/friendtalk/constants'
import {
  ContentTypeBase,
  ContentTypeCarousel,
  ContentTypeCarouselItem,
  ContentTypeWideImage,
  ContentTypeWideList,
  ContentTypeWideListItem,
  FriendtalkButton,
  FriendtalkButtonBaseType,
  FriendtalkButtonWideImageType,
  FriendtalkButtonWideListType,
  FriendtalkCouponButton,
} from '~/friendtalk/types'

export const getEmptyCarouselItem = () => ({
  imageId: -1,
  imageLink: '',
  imageUrl: '',
  header: '#{NAME}님 안녕하세요',
  message: '#{NAME}님 안녕하세요',
  buttons: [
    {
      friendtalkButtonType: FriendtalkButtonType.WL,
      name: '클릭해주세요',
      linkPc: 'https://app.3o3.co.kr/',
      linkMobile: 'https://app.3o3.co.kr/',
      chatExtra: null,
      chatEvent: null,
      schemeAndroid: null,
      schemeIos: null,
      target: FriendtalkButtonTarget.OUT,
    },
  ],
})

export const getEmptyWideListItem = () => ({
  title: '#{NAME}님 안녕하세요',
  linkPc: 'https://app.3o3.co.kr/',
  linkMobile: 'https://app.3o3.co.kr/',
  schemeAndroid: '',
  schemeIos: '',
  imageId: -1,
  imageUrl: '',
  isShow: true,
})

export const getImageRatio = ({
  width,
  height,
  fixed = 2,
}: {
  width: number
  height: number
  fixed?: number
}) => Number((width / height).toFixed(fixed))

// NOTE: react-hook-form의 useFieldArray의 Props.name 참조 방식에 사용하는 체이닝 변수명을 가져오기 위해 만들었습니다.
// https://react-hook-form.com/docs/usefieldarray
export const formTypeMapNameTree = {
  templateType: {
    getName: function () {
      return 'templateType'
    },
  },
  templateCode: {
    getName: function () {
      return 'templateCode'
    },
  },
  sendProfile: {
    getName: function () {
      return 'sendProfile'
    },
  },
  description: {
    getName: function () {
      return 'description'
    },
  },
  contentTypeBase: {
    getName: function () {
      return 'contentTypeBase'
    },
    imageId: {
      getParent: () => formTypeMapNameTree.contentTypeBase,
      getName: function () {
        return `${this.getParent().getName()}.imageId`
      },
    },
    imageLink: {
      getParent: () => formTypeMapNameTree.contentTypeBase,
      getName: function () {
        return `${this.getParent().getName()}.imageLink`
      },
    },
    comment: {
      getParent: () => formTypeMapNameTree.contentTypeBase,
      getName: function () {
        return `${this.getParent().getName()}.comment`
      },
    },
    buttons: {
      getParent: () => formTypeMapNameTree.contentTypeBase,
      getName: function () {
        return `${this.getParent().getName()}.buttons`
      },
      isShow: {
        getParent: () => formTypeMapNameTree.contentTypeBase.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].isShow`
        },
      },
      name: {
        getParent: () => formTypeMapNameTree.contentTypeBase.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].name`
        },
      },
      linkPc: {
        getParent: () => formTypeMapNameTree.contentTypeBase.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].linkPc`
        },
      },
      linkMobile: {
        getParent: () => formTypeMapNameTree.contentTypeBase.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].linkMobile`
        },
      },
      target: {
        getParent: () => formTypeMapNameTree.contentTypeBase.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].target`
        },
      },
      isOutlink: {
        getParent: () => formTypeMapNameTree.contentTypeBase.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].isOutlink`
        },
      },
    },
  },
  contentTypeWideImage: {
    getName: function () {
      return 'contentTypeWideImage'
    },
    imageId: {
      getParent: () => formTypeMapNameTree.contentTypeWideImage,
      getName: function () {
        return `${this.getParent().getName()}.imageId`
      },
    },
    imageUrl: {
      getParent: () => formTypeMapNameTree.contentTypeWideImage,
      getName: function () {
        return `${this.getParent().getName()}.imageUrl`
      },
    },
    imageLink: {
      getParent: () => formTypeMapNameTree.contentTypeWideImage,
      getName: function () {
        return `${this.getParent().getName()}.imageLink`
      },
    },
    comment: {
      getParent: () => formTypeMapNameTree.contentTypeWideImage,
      getName: function () {
        return `${this.getParent().getName()}.comment`
      },
    },
    buttons: {
      getParent: () => formTypeMapNameTree.contentTypeWideImage,
      getName: function () {
        return `${this.getParent().getName()}.buttons`
      },
      isShow: {
        getParent: () => formTypeMapNameTree.contentTypeWideImage.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].isShow`
        },
      },
      name: {
        getParent: () => formTypeMapNameTree.contentTypeWideImage.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].name`
        },
      },
      linkPc: {
        getParent: () => formTypeMapNameTree.contentTypeWideImage.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].linkPc`
        },
      },
      linkMobile: {
        getParent: () => formTypeMapNameTree.contentTypeWideImage.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].linkMobile`
        },
      },
      target: {
        getParent: () => formTypeMapNameTree.contentTypeWideImage.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].target`
        },
      },
      isOutlink: {
        getParent: () => formTypeMapNameTree.contentTypeWideImage.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].isOutlink`
        },
      },
    },
    couponButton: {
      leafName: 'couponButton',
      getParent: () => formTypeMapNameTree.contentTypeWideImage,
      getName: function () {
        return `${this.getParent().getName()}.couponButton`
      },
    },
  },
  contentTypeWideList: {
    getName: function () {
      return 'contentTypeWideList' as const
    },
    header: {
      getParent: () => formTypeMapNameTree.contentTypeWideList,
      getName: function () {
        return `${this.getParent().getName()}.header`
      },
    },
    items: {
      getParent: () => formTypeMapNameTree.contentTypeWideList,
      getName: function () {
        return `${this.getParent().getName()}.items` as const
      },
      title: {
        getParent: () => formTypeMapNameTree.contentTypeWideList.items,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].title`
        },
      },
      imageId: {
        getParent: () => formTypeMapNameTree.contentTypeWideList.items,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].imageId`
        },
      },
      imageUrl: {
        getParent: () => formTypeMapNameTree.contentTypeWideList.items,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].imageUrl`
        },
      },
      comment: {
        getParent: () => formTypeMapNameTree.contentTypeWideList.items,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].comment`
        },
      },
      linkMobile: {
        getParent: () => formTypeMapNameTree.contentTypeWideList.items,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].linkMobile`
        },
      },
      linkPc: {
        getParent: () => formTypeMapNameTree.contentTypeWideList.items,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].linkPc`
        },
      },
      isShow: {
        getParent: () => formTypeMapNameTree.contentTypeWideList.items,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].isShow`
        },
      },
    },
    buttons: {
      getParent: () => formTypeMapNameTree.contentTypeWideList,
      getName: function () {
        return `${this.getParent().getName()}.buttons`
      },
      name: {
        getParent: () => formTypeMapNameTree.contentTypeWideList.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].name`
        },
      },
      linkPc: {
        getParent: () => formTypeMapNameTree.contentTypeWideList.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].linkPc`
        },
      },
      linkMobile: {
        getParent: () => formTypeMapNameTree.contentTypeWideList.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].linkMobile`
        },
      },
      target: {
        getParent: () => formTypeMapNameTree.contentTypeWideList.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].target`
        },
      },
      isOutlink: {
        getParent: () => formTypeMapNameTree.contentTypeWideList.buttons,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].isOutlink`
        },
      },
    },
  },
  contentTypeCarousel: {
    getName: function () {
      return 'contentTypeCarousel'
    },
    items: {
      getParent: () => formTypeMapNameTree.contentTypeCarousel,
      getName: function () {
        return `${this.getParent().getName()}.items`
      },
      imageId: {
        getParent: () => formTypeMapNameTree.contentTypeCarousel.items,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].imageId`
        },
      },
      imageUrl: {
        getParent: () => formTypeMapNameTree.contentTypeCarousel.items,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].imageUrl`
        },
      },
      imageLink: {
        getParent: () => formTypeMapNameTree.contentTypeCarousel.items,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].imageLink`
        },
      },
      header: {
        getParent: () => formTypeMapNameTree.contentTypeCarousel.items,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].header`
        },
      },
      message: {
        getParent: () => formTypeMapNameTree.contentTypeCarousel.items,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].message`
        },
      },
      buttons: {
        getParent: () => formTypeMapNameTree.contentTypeCarousel.items,
        getName: function (idx: number) {
          return `${this.getParent().getName()}[${idx}].buttons`
        },
        friendtalkButtonType: {
          getParent: () =>
            formTypeMapNameTree.contentTypeCarousel.items.buttons,
          getName: function (idx: number, buttonIdx: number) {
            return `${this.getParent().getName(
              idx
            )}[${buttonIdx}].friendtalkButtonType`
          },
        },
        name: {
          getParent: () =>
            formTypeMapNameTree.contentTypeCarousel.items.buttons,
          getName: function (idx: number, buttonIdx: number) {
            return `${this.getParent().getName(idx)}[${buttonIdx}].name`
          },
        },
        linkPc: {
          getParent: () =>
            formTypeMapNameTree.contentTypeCarousel.items.buttons,
          getName: function (idx: number, buttonIdx: number) {
            return `${this.getParent().getName(idx)}[${buttonIdx}].linkPc`
          },
        },
        linkMobile: {
          getParent: () =>
            formTypeMapNameTree.contentTypeCarousel.items.buttons,
          getName: function (idx: number, buttonIdx: number) {
            return `${this.getParent().getName(idx)}[${buttonIdx}].linkMobile`
          },
        },
      },
    },
    carouselTail: {
      getParent: () => formTypeMapNameTree.contentTypeCarousel,
      getName: function () {
        return `${this.getParent().getName()}.carouselTail`
      },
      linkMobile: {
        getParent: () => formTypeMapNameTree.contentTypeCarousel.carouselTail,
        getName: function () {
          return `${this.getParent().getName()}.linkMobile`
        },
      },
      linkPc: {
        getParent: () => formTypeMapNameTree.contentTypeCarousel.carouselTail,
        getName: function () {
          return `${this.getParent().getName()}.linkPc`
        },
      },
      schemeIos: {
        getParent: () => formTypeMapNameTree.contentTypeCarousel.carouselTail,
        getName: function () {
          return `${this.getParent().getName()}.schemeIos`
        },
      },
      schemeAndroid: {
        getParent: () => formTypeMapNameTree.contentTypeCarousel.carouselTail,
        getName: function () {
          return `${this.getParent().getName()}.schemeAndroid`
        },
      },
    },
  },
}

export const isOutlink = (v: string) =>
  v.toLowerCase() === FriendtalkButtonTarget.OUT.toLowerCase()

export const getBaseTemplateEmptySanitiized = () => {
  const src = getBaseTemplateEmpty()

  return {
    imageLink: src.imageLink,
    comment: src.comment,
    buttons: src.buttons.map((v) => sanitizeFriendtalkButton(v)),
    couponButton: src.couponButton,
  }
}

export const getCouponButtonEmpty = (): FriendtalkCouponButton => ({
  title: '',
  description: '',
  linkMobile: '',
  linkPc: '',
  schemeAndroid: '',
  schemeIos: '',
})

export const getBaseTemplateEmpty = () => {
  const buttonDefault: FriendtalkButtonBaseType = {
    friendtalkButtonType: FriendtalkButtonType.WL,
    name: '버튼',
    linkPc: 'https://app.3o3.co.kr/',
    linkMobile: 'https://app.3o3.co.kr/',
    target: FriendtalkButtonTarget.OUT,
    isOutlink: true,
    isShow: true,
  }
  const buttonsDefault = [
    {
      ...buttonDefault,
    },
    {
      ...buttonDefault,
    },
  ]

  return {
    imageId: -1,
    imageUrl: '',
    imageLink: 'https://app.3o3.co.kr/',
    comment: '',
    buttons: buttonsDefault,
    couponButton: getCouponButtonEmpty(),
  }
}

export const parseContentTypeBase = (content?: string): ContentTypeBase => {
  const contentDefault = getBaseTemplateEmpty()

  if (!content) {
    return contentDefault
  }

  try {
    const parsedContent = JSON.parse(content)

    parsedContent.buttons = parsedContent.buttons.map(
      (v: FriendtalkButton) => ({
        ...v,
        isShow: true,
        isOutlink: isOutlink(v.target ?? ''),
      })
    )

    return {
      imageId: parsedContent.imageId ?? -1,
      imageUrl: parsedContent.imageUrl ?? '',
      imageLink: parsedContent.imageLink ?? '',
      comment: parsedContent.comment ?? '',
      buttons: parsedContent.buttons ?? contentDefault.buttons,
      couponButton: parsedContent.couponButton ?? contentDefault.couponButton,
    }
  } catch (error) {
    throw error
  }
}

export const getWideImageTemplateEmptySanitized = () => {
  const src = getWideImageTemplateEmpty()

  return {
    imageUrl: src.imageUrl,
    imageLink: src.imageLink,
    comment: src.comment,
    buttons: src.buttons.map((v) => sanitizeFriendtalkButton(v)),
    couponButton: src.couponButton,
  }
}

export const getWideImageTemplateEmpty = () => {
  const buttonsDefault: FriendtalkButtonWideImageType[] = [
    {
      friendtalkButtonType: FriendtalkButtonType.WL,
      name: '버튼',
      linkPc: 'https://app.3o3.co.kr/',
      linkMobile: 'https://app.3o3.co.kr/',
      chatExtra: null,
      chatEvent: null,
      schemeAndroid: null,
      schemeIos: null,
      target: FriendtalkButtonTarget.IN,
      isOutlink: false,
      isShow: true,
    },
  ]

  return {
    imageId: -1,
    imageUrl: '',
    imageLink: 'https://app.3o3.co.kr/',
    comment: '',
    buttons: buttonsDefault,
    couponButton: getCouponButtonEmpty(),
  }
}

export const parseContentTypeWideImage = (
  content?: string
): ContentTypeWideImage => {
  const contentDefault = getWideImageTemplateEmpty()

  if (!content) {
    return contentDefault
  }

  try {
    const parsedContent = JSON.parse(content)

    return {
      imageId:
        parsedContent && parsedContent.imageId ? parsedContent.imageId : -1,
      imageUrl:
        parsedContent && parsedContent.imageUrl ? parsedContent.imageUrl : '',
      imageLink:
        parsedContent && parsedContent.imageLink ? parsedContent.imageLink : '',
      comment:
        parsedContent && parsedContent.comment ? parsedContent.comment : '',
      buttons:
        parsedContent && parsedContent.buttons
          ? parsedContent.buttons.map((v: FriendtalkButton) => ({
              ...v,
              isShow: true,
              isOutlink: isOutlink(`${v.target}`),
            }))
          : [...contentDefault.buttons],
      couponButton: getCouponButtonEmpty(),
    }
  } catch (error) {
    // TODO content가 유효하지 않은 형식임을 사용자에게 알려야 함.
    return contentDefault
  }
}

export const getWideListTemplateEmptySanitized = () => {
  const src = getWideListTemplateEmpty()

  return {
    header: src.header,
    items: src.items.map((v) => sanitizeWideListItem(v)),
    buttons: src.buttons.map((v) => sanitizeFriendtalkButton(v)),
  }
}

export const getWideListTemplateEmpty = () => {
  const buttonsDefault: FriendtalkButtonWideListType[] = [
    {
      friendtalkButtonType: FriendtalkButtonType.WL,
      name: '버튼',
      linkPc: 'https://app.3o3.co.kr/',
      linkMobile: 'https://app.3o3.co.kr/',
      target: FriendtalkButtonTarget.IN,
      isOutlink: false,
    },
  ]

  const itemDefault = getEmptyWideListItem()

  const itemsDefault = [
    { ...itemDefault },
    { ...itemDefault },
    { ...itemDefault },
    { ...itemDefault, isShow: false },
  ]

  return {
    header: '',
    items: [...itemsDefault],
    buttons: buttonsDefault,
    couponButton: getCouponButtonEmpty(),
  }
}

export const parseContentTypeWideList = (
  content?: string
): ContentTypeWideList => {
  const contentDefault = getWideListTemplateEmpty()

  if (!content) {
    return contentDefault
  }

  try {
    const parsedContent = JSON.parse(content)
    parsedContent.items = parsedContent.items.map(
      (v: ContentTypeWideListItem) => ({
        ...v,
        isShow: true,
        imageId: v.imageId,
        imageUrl: v.imageUrl,
      })
    )

    return {
      header: parsedContent.header,
      items: parsedContent.items,
      buttons: parsedContent.buttons.map(
        (button: FriendtalkButton): FriendtalkButtonWideListType => ({
          ...button,
          isOutlink: isOutlink(`${button.target}`),
        })
      ),
      couponButton: getCouponButtonEmpty(),
    }
  } catch (error) {
    // TODO content가 유효하지 않은 형식임을 사용자에게 알려야 함.
    return contentDefault
  }
}

export const getCarouselTemplateEmptySanitized = () => {
  const src = getCarouselTemplateEmpty()

  return {
    items: src.items.map((v) => sanitizeContentTypeCarouselItem(v)),
    carouselTail: src.carouselTail,
  }
}

export const sanitizeContentTypeCarouselItem = (
  v: ContentTypeCarouselItem
) => ({
  imageId: v.imageId ?? -1,
  imageLink: v.imageLink ?? '',
  imageUrl: v.imageUrl ?? '',
  header: v.header,
  message: v.message,
  buttons: v.buttons.map((v) => ({
    friendtalkButtonType: v.friendtalkButtonType,
    name: v.name,
    linkPc: v.linkPc,
    linkMobile: v.linkMobile,
    target: sanitizeFriendtalkButtonTarget(v.target),
  })),
})

export const getCarouselTemplateEmpty = () => {
  const itemsDefault: ContentTypeCarouselItem[] = [getEmptyCarouselItem()]
  const carouselTailDefault = {
    linkMobile: 'https://app.3o3.co.kr/',
    linkPc: 'https://app.3o3.co.kr/',
    schemeIos: '',
    schemeAndroid: '',
  }

  return {
    items: itemsDefault,
    carouselTail: carouselTailDefault,
  }
}

export const parseContentTypeCarousel = (
  content?: string
): ContentTypeCarousel => {
  const contentDefault = getCarouselTemplateEmpty()

  if (!content) {
    return contentDefault
  }

  try {
    const parsedContent = JSON.parse(content)

    return {
      items: parsedContent.items,
      carouselTail: parsedContent.carouselTail,
    }
  } catch (error) {
    return contentDefault
  }
}

export const sanitizeWideListItem = (target: ContentTypeWideListItem) => ({
  imageId: target.imageId,
  title: target.title,
  linkPc: target.linkPc,
  linkMobile: target.linkMobile,
  schemeAndroid: target.schemeAndroid,
  schemeIos: target.schemeIos,
})

export const sanitizeFriendtalkButton = (
  target:
    | FriendtalkButtonWideListType
    | FriendtalkButtonBaseType
    | FriendtalkButtonWideImageType
): FriendtalkButton => ({
  friendtalkButtonType: target.friendtalkButtonType,
  name: target.name,
  linkPc: target.linkPc,
  linkMobile: target.linkMobile,
  schemeIos: target.schemeIos,
  schemeAndroid: target.schemeAndroid,
  chatExtra: target.chatExtra,
  chatEvent: target.chatEvent,
  target: target.target,
})

const sanitizeFriendtalkButtonTarget = (v: string | null | undefined) => {
  if (v === '' || v === null || v === undefined || typeof v !== 'string') {
    return FriendtalkButtonTarget.IN
  }

  if (v.toUpperCase() === FriendtalkButtonTarget.OUT) {
    return FriendtalkButtonTarget.OUT
  }

  return FriendtalkButtonTarget.IN
}
