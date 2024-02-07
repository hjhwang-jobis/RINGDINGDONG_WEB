import { GetCampaigns } from '~/types/api'

const campaign = {
  BASE: ['CAMPAIGNS'],
  getCampaigns: (params: GetCampaigns.Request) => [
    ...campaign.BASE,
    'getCampaigns',
    params,
  ],
} as const

export default campaign
