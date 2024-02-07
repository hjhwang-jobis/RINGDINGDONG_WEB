import { hasRole } from '~/utils/roleUtils'

export default function () {
  return hasRole(['manager']) ? <div> abcde</div> : <div> ab</div>
}
