import React, { useCallback } from 'react'

type KeyEventListener = (e: React.KeyboardEvent) => void

export function useEvent(
  eventName: string,
  ...keys: string[]
): [
  (callback: KeyEventListener) => KeyEventListener,
  (callback: KeyEventListener) => void,
] {
  const registerKeyEvent = useCallback(
    (callback: KeyEventListener) => {
      const hasKeys = keys && keys.length > 0
      const listener = hasKeys
        ? (e: React.KeyboardEvent) => {
            if (keys.includes(e.key)) callback(e)
          }
        : callback

      window.addEventListener(eventName, listener as any)

      return listener
    },
    [eventName, keys]
  )

  const removeKeyEvent = useCallback(
    (callback: KeyEventListener) => {
      window.removeEventListener(eventName, callback as any)
    },
    [eventName]
  )

  return [registerKeyEvent, removeKeyEvent]
}

export function useEnterKeyEvent() {
  return useEvent('keydown', 'Enter')
}

export function useEscKeyEvent() {
  return useEvent('keydown', 'Escape')
}

export function useArrowDownEvent() {
  return useEvent('keydown', 'ArrowDown')
}

export function useArrowUpEvent() {
  return useEvent('keydown', 'ArrowUp')
}

export function useMouseMoveEvent() {
  return useEvent('mousemove')
}
