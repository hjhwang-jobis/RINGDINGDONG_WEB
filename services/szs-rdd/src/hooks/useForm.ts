import { useCallback } from 'react'
import {
  FieldError,
  FieldPath,
  RegisterOptions,
  useForm as useReactHookForm,
  ValidateResult,
} from 'react-hook-form'
import { FieldValues, UseFormProps } from 'react-hook-form/dist/types'

export type FormValidationRules<Fields extends FieldValues = FieldValues> =
  Partial<
    Record<
      keyof Fields,
      Pick<
        RegisterOptions<Fields>,
        | 'required'
        | 'min'
        | 'max'
        | 'maxLength'
        | 'minLength'
        | 'pattern'
        | 'setValueAs'
      > &
        Partial<{ validate: (value: any) => ValidateResult }>
    >
  >

export default function useForm<
  Fields extends FieldValues = FieldValues,
  TContext extends object = object,
>(
  {
    mode = 'all',
    reValidateMode,
    resolver,
    context,
    defaultValues,
    shouldFocusError,
    shouldUseNativeValidation,
    shouldUnregister,
    criteriaMode,
  }: UseFormProps<Fields, TContext> = { mode: 'all' }
) {
  const reactHookForm = useReactHookForm<Fields, TContext>({
    mode,
    reValidateMode,
    resolver,
    context,
    defaultValues,
    shouldFocusError,
    shouldUseNativeValidation,
    shouldUnregister,
    criteriaMode,
  })

  const hasError = useCallback(
    <FieldName extends FieldPath<Fields> = FieldPath<Fields>>(
      fieldName: FieldName
    ) => !!reactHookForm.formState.errors[fieldName],
    [reactHookForm.formState.errors]
  )

  const getErrorMessage = useCallback(
    <FieldName extends FieldPath<Fields> = FieldPath<Fields>>(
      fieldName: FieldName
    ) => {
      const error = reactHookForm.formState.errors[fieldName] as FieldError

      return error?.message
    },
    [reactHookForm.formState.errors]
  )

  return {
    ...reactHookForm,
    isValid: reactHookForm.formState.isValid,
    hasError,
    getErrorMessage,
  }
}
