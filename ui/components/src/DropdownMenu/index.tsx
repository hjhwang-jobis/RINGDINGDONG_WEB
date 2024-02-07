import { useBooleanState } from '@3o3/react'
import React, { useEffect, useRef } from 'react'

import DropdownMenuItem from '~/DropdownMenu/DropdownMenuItem'
import DropdownMenuList from '~/DropdownMenu/DropdownMenuList'
import DropdownMenuProvider from '~/DropdownMenu/DropdownMenuProvider'
import Popper, { PopperPlacement } from '~/Popper'

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  targetElement: HTMLElement | null
  placement?: PopperPlacement
}

const DropdownMenu = ({
  targetElement,
  placement = 'bottom-start',
  ...rest
}: Props) => {
  const menuListRef = useRef<HTMLUListElement>(null)
  const [isMenuOpened, openMenu, closeMenu] = useBooleanState()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const eventElement = e.target as Element

      if (targetElement?.contains(eventElement)) {
        isMenuOpened ? closeMenu() : openMenu()

        return
      }

      if (!menuListRef.current?.contains(eventElement)) closeMenu()
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [closeMenu, isMenuOpened, openMenu, targetElement])

  return (
    <DropdownMenuProvider onClose={closeMenu}>
      {isMenuOpened && (
        <Popper reference={targetElement} trigger={[]} placement={placement}>
          <DropdownMenuList ref={menuListRef} {...rest} />
        </Popper>
      )}
    </DropdownMenuProvider>
  )
}

DropdownMenu.Item = DropdownMenuItem
export default DropdownMenu
