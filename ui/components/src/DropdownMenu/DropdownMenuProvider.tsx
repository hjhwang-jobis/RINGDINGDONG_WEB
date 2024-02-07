import { noop } from 'lodash-es'
import React, { createContext, PropsWithChildren } from 'react'

export const DropdownMenuContext = createContext<Props>({ onClose: noop })

interface Props {
  onClose: () => void
}

function DropdownMenuProvider({ children, ...rest }: PropsWithChildren<Props>) {
  return (
    <DropdownMenuContext.Provider value={rest}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

export default DropdownMenuProvider
