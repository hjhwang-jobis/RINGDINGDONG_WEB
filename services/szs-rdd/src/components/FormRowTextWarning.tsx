import { Flex, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'

interface Props {
  text: string
}

export default function FormRowTextWarning({ text }: Props) {
  return (
    <Flex justifyContent="start">
      <Text
        typography="body14"
        weight="regular"
        color={colors.light.scheme.$red60}
      >
        {text}
      </Text>
    </Flex>
  )
}
