import { Navigate, useLocation } from 'react-router-dom'

import { RoutePath } from '~/routes'

function CampaignDashboardPage() {
  const location = useLocation()

  if (RoutePath.Root === location.pathname) {
    const to = `${RoutePath.Action}/${RoutePath.ActionList}`

    return <Navigate to={to} state={{ from: location }} replace />
  }

  return <div>CampaignDashboardPage</div>
}
export default CampaignDashboardPage
