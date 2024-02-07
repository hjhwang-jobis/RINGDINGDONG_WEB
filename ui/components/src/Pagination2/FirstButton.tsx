import React from 'react'

import NavigationButton, {
  NavigationButtonProps,
} from '~/Pagination2/NavigationButton'

type Props = Omit<NavigationButtonProps, 'icon'>

function FirstButton(props: Props) {
  return <NavigationButton icon="ic_basic_medium_chevrons_left" {...props} />
}

export default FirstButton
