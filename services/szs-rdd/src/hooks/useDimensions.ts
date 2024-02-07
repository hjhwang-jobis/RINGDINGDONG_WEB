import React, { useEffect, useState } from 'react'

export interface Dimension {
  width: number
  height: number
}

export function useDimensions(ref: React.RefObject<any>) {
  const [dimensions, setDimensions] = useState<Dimension>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (!ref) return

    const getDimensions = () => ({
      width: ref.current?.offsetWidth || 0,
      height: ref.current?.offsetHeight || 0,
    })

    const handleResize = () => setDimensions(getDimensions())

    if (ref.current) setDimensions(getDimensions())
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [ref])

  return dimensions
}
