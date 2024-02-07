import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import { validators } from '~/utils'
interface Props {
  name: string
  disabled?: boolean
}

export default function FormRowTextTemplateCode({
  name,
  disabled = false,
}: Props) {
  return (
    <FormRowBasicInputField
      name={name}
      placeholder="템플릿 코드를 입력해주세요."
      validateInRules={(v) =>
        validators.run([
          validators.validateInRulesFormatTemplateCode(v),
          validators.validateInRulesStrMinMax(v, 5, 40),
        ])
      }
      disabled={disabled}
    />
  )
}
