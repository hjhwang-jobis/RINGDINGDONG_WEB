import React from 'react'

import NavigationButton, {
  NavigationButtonProps,
} from '~/Pagination2/NavigationButton'

type Props = Omit<NavigationButtonProps, 'icon'>

function LastButton(props: Props) {
  return <NavigationButton icon="ic_basic_medium_chevrons_right" {...props} />
}

export default LastButton
