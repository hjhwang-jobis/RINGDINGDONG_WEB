import { Flex, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'

interface Props {
  text: string
  align?: 'start' | 'center' | 'end'
}

export default function TableCellTextRed({ text, align = 'center' }: Props) {
  return (
    <Flex justifyContent={align}>
      <Text
        typography="body12"
        weight="medium"
        color={colors.light.scheme.$red50}
      >
        {text}
      </Text>
    </Flex>
  )
}
