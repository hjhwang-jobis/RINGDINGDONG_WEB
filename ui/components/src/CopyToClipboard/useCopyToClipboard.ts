import { useCallback } from 'react'

export function useCopyToClipboard() {
  return useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)

      return { result: true, text }
    } catch {
      return { result: false, text }
    }
  }, [])
}
