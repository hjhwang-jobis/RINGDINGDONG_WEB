import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import { validators } from '~/utils'
interface Props {
  name: string
  disabled?: boolean
  onBlur?: (v: string) => void
}

export default function FormRowTextMessageName({
  name,
  disabled = false,
  onBlur,
}: Props) {
  return (
    <FormRowBasicInputField
      name={name}
      placeholder="템플릿 이름을 입력해주세요"
      validateInRules={(v) =>
        validators.run([validators.validateInRulesStrMinMax(v, 2, 34)])
      }
      disabled={disabled}
      onBlur={(v) => onBlur?.(v)}
    />
  )
}
