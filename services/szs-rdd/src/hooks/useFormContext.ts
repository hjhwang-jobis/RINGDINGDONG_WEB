import { useCallback } from 'react'
import {
  FieldError,
  FieldPath,
  useFormContext as useReactHookFormContext,
} from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types'

export default function useFormContext<
  Fields extends FieldValues = FieldValues,
>() {
  const reactHookFormContext = useReactHookFormContext<Fields>()

  const hasError = useCallback(
    <FieldName extends FieldPath<Fields> = FieldPath<Fields>>(
      fieldName: FieldName
    ) => !reactHookFormContext.formState.errors[fieldName],
    [reactHookFormContext.formState.errors]
  )

  const getErrorMessage = useCallback(
    <FieldName extends FieldPath<Fields> = FieldPath<Fields>>(
      fieldName: FieldName
    ) => {
      const error = reactHookFormContext.formState.errors[
        fieldName
      ] as FieldError

      return error?.message
    },
    [reactHookFormContext.formState.errors]
  )

  return {
    ...reactHookFormContext,
    isValid: reactHookFormContext.formState.isValid,
    hasError,
    getErrorMessage,
  }
}
