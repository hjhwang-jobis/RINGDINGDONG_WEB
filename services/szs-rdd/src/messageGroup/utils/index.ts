import { MessageChannelType } from '~/constants'

export const canContainAlimlist = (messageChannelType: MessageChannelType) =>
  messageChannelType === MessageChannelType.PUSH ||
  messageChannelType === MessageChannelType.FRIENDTALK
