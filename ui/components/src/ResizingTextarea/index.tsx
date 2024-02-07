import { Textarea, TextareaProps } from '@fe3o3/ui'
import React, {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

export type Props = TextareaProps

function ResizingTextarea(
  { onChange, ...rest }: Props,
  _ref: Ref<HTMLTextAreaElement>
) {
  const ref = useRef<HTMLTextAreaElement | null>(null)
  const previousValue = useRef<string | undefined>()

  const resize = useCallback(() => {
    const element = ref.current

    if (!element) return
    if (element.value === previousValue.current) return

    previousValue.current = element.value
    element.style.height = 'auto'
    element.style.height = `${element.scrollHeight + 5}px`
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      resize()
      onChange?.(e)
    },
    [onChange, resize]
  )

  useEffect(() => resize(), [resize, rest.value])

  useImperativeHandle(_ref, () => ref.current as HTMLTextAreaElement)

  return <Textarea ref={ref} onChange={handleChange} {...rest} />
}

export default forwardRef(ResizingTextarea)
