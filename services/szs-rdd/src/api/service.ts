import { publicApi } from '~/api/reactQuery'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE, SortDirection } from '~/constants'
import {
  SendProfile,
  SendTestMessagePriority,
  SendTestMessageTagType,
} from '~/constants'
import {
  GetActions,
  GetActionsList,
  GetAlimlistTemplates,
  GetAlimlistTemplatesList,
  GetAlimtalkActivate,
  GetAlimtalkTemplates,
  GetAlimtalkTemplatesList,
  GetAlimtalkTemplatesMatchedParameters,
  GetAlimtalkTemplatesParameters,
  GetCampaigns,
  GetCdnAssetsList,
  GetDoneMessageGroupsList,
  GetFriendtalkTemplates,
  GetFriendtalkTemplatesImagesList,
  GetFriendtalkTemplatesList,
  GetHealthCheck,
  GetMessageGroups,
  GetParametersAutosList,
  GetParametersBasics,
  GetParametersBasicsList,
  GetParametersPersonalsList,
  GetPushTemplates,
  GetPushTemplatesList,
  GetTargets,
  GetTargetsList,
  GetTargetsQueries,
  GetTargetsQueriesList,
  GetTesters,
  GetTestersList,
  PostActions,
  PostAlimlistSend,
  PostAlimlistTemplates,
  PostAlimtalkActivate,
  PostAlimtalkSend,
  PostAuthUser,
  PostCampaigns,
  PostCdnAssets,
  PostFriendtalkSend,
  PostFriendtalkTemplatesBase,
  PostFriendtalkTemplatesCarousel,
  PostFriendtalkTemplatesImages,
  PostFriendtalkTemplatesWidelist,
  PostParametersBasics,
  PostPushSend,
  PostPushTemplates,
  PostTarget,
  PostTargetsQueries,
  PostTesters,
  PostTestersDelete,
  PutActions,
  PutCampaigns,
  PutMessageGroups,
  PutMessageGroupsActivate,
  PutMessageGroupsCancel,
  PutParametersBasics,
  PutTarget,
  PutTargetsQueries,
  PutTargetsQueriesCalculate,
  PutTesters,
  Response,
} from '~/types/api'
import { apiUtils } from '~/utils'

const postAuthUser = () => {
  return publicApi.post<PostAuthUser.Response>('auth/user')
}

const getHealthCheck = () => {
  return publicApi.get<GetHealthCheck.Response>('health')
}

/**
 * 액션 목록 조회
 * @param {GetActionsList.Request}
 * @return {GetActionsList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%95%A1%EC%85%98%20%EA%B4%80%EB%A6%AC/get_actions_api_v1_actions_list_get
 */
const getActionsList = ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageNo = DEFAULT_PAGE_NO - 1,
  name = null,
}: GetActionsList.Request) =>
  publicApi.get<GetActionsList.Response>('actions/list', {
    params: {
      pageSize,
      pageNo,
      name,
    },
  })

/**
 * 액션 상세 조회
 * @param {GetActions.Request}
 * @return {GetActions.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%95%A1%EC%85%98%20%EA%B4%80%EB%A6%AC/get_action_api_v1_campaigns_actions__actionId__get
 */
const getActions = ({ actionId }: GetActions.Request) =>
  publicApi.get<GetActions.Response>(`actions/${actionId}`)

/**
 * 액션 등록
 * @param {PostActions.Request}
 * @return {PostActions.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%95%A1%EC%85%98%20%EA%B4%80%EB%A6%AC/create_action_api_v1_campaigns_actions_post
 */
const postActions = (body: PostActions.Request) => {
  return publicApi.post<PostActions.Response>('actions', body)
}

/**
 * 액션 수정
 * @param {PutActions.Request}
 * @return {PutActions.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%95%A1%EC%85%98%20%EA%B4%80%EB%A6%AC/update_action_api_v1_campaigns_actions__actionId__put
 */
const putActions = ({ actionId, name, description }: PutActions.Request) => {
  return publicApi.put<PutActions.Response>(`actions/${actionId}`, {
    name,
    description,
  })
}

/**
 * 캠페인 상세 조회
 * @param {GetCampaigns.Request}
 * @return {GetCampaigns.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%BA%A0%ED%8E%98%EC%9D%B8%20%EA%B4%80%EB%A6%AC/get_campaign_api_v1_campaigns__campaignId__get
 */
const getCampaigns = ({ campaignId }: GetCampaigns.Request) =>
  publicApi.get<GetCampaigns.Response>(`campaigns/${campaignId}`)

/**
 * 캠페인 등록
 * @param {PostCampaigns.Request}
 * @return {PostCampaigns.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%BA%A0%ED%8E%98%EC%9D%B8%20%EA%B4%80%EB%A6%AC/create_campaign_api_v1_campaigns_post
 */
const postCampaigns = (body: PostCampaigns.Request) => {
  return publicApi.post<PostCampaigns.Response>('campaigns', body)
}

/**
 * 캠페인 수정
 * @param {PutCampaigns.Request}
 * @return {PutCampaigns.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%BA%A0%ED%8E%98%EC%9D%B8%20%EA%B4%80%EB%A6%AC/create_campaign_api_v1_campaigns_post
 */
const putCampaigns = ({
  id,
  name,
  messageChannel,
  sendProfile,
  actionId,
  targetId,
  messageGroups,
}: PutCampaigns.Request) => {
  return publicApi.put<PutCampaigns.Response>(`campaigns/${id}`, {
    name,
    messageChannel,
    sendProfile,
    actionId,
    targetId,
    messageGroups,
  })
}

/**
 * 메시지 그룹 상세 조회
 * @param {GetMessageGroups.Request}
 * @return {GetMessageGroups.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%BA%A0%ED%8E%98%EC%9D%B8%20%EA%B4%80%EB%A6%AC/get_campaign_api_v1_campaigns__campaignId__get
 */
const getMessageGroups = ({ messageGroupId }: GetMessageGroups.Request) =>
  publicApi.get<GetMessageGroups.Response>(`messageGroups/${messageGroupId}`)

/**
 * 발송 완료된 메세지그룹 목록 조회
 * @param {GetDoneMessageGroupsList.Request}
 * @return {GetDoneMessageGroupsList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EA%B4%80%EB%A6%AC/get_targets_api_v1_targets_get
 */
const getDoneMessageGroupsList = ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageNo = DEFAULT_PAGE_NO - 1,
}: GetDoneMessageGroupsList.Request) =>
  publicApi.get<GetDoneMessageGroupsList.Response>('messageGroups/done/list', {
    params: {
      pageSize,
      pageNo,
    },
  })

/**
 * 메시지 그룹 수정
 * @param {PutMessageGroups.Request}
 * @return {PutMessageGroups.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EB%A9%94%EC%84%B8%EC%A7%80%EA%B7%B8%EB%A3%B9%20%EA%B4%80%EB%A6%AC/update_message_group_api_v1_messageGroups__messageGroupId__put
 */
const putMessageGroups = ({
  messageGroupId,
  sendingRequestAt,
  messageGroupTemplates,
}: PutMessageGroups.Request) => {
  return publicApi.put<PutMessageGroups.Response>(
    `messageGroups/${messageGroupId}`,
    {
      sendingRequestAt,
      messageGroupTemplates,
    }
  )
}

/**
 * 메시지 그룹 활성화
 * @param {PutMessageGroupsActivate.Request}
 * @return {PutMessageGroupsActivate.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EB%A9%94%EC%84%B8%EC%A7%80%EA%B7%B8%EB%A3%B9%20%EA%B4%80%EB%A6%AC/update_message_group_api_v1_messageGroups__messageGroupId__put
 */
const putMessageGroupsActivate = ({
  messageGroupId,
  sendingRequestAt,
  messageGroupTemplates,
}: PutMessageGroupsActivate.Request) => {
  return publicApi.put<PutMessageGroupsActivate.Response>(
    `messageGroups/activate/${messageGroupId}`,
    {
      sendingRequestAt,
      messageGroupTemplates,
    }
  )
}

/**
 * 메시지 그룹 발송 취소
 * @param {PutMessageGroupsCancel.Request}
 * @return {PutMessageGroupsCancel.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EB%A9%94%EC%84%B8%EC%A7%80%EA%B7%B8%EB%A3%B9%20%EA%B4%80%EB%A6%AC/cancel_message_group_api_v1_messageGroups_cancel__messageGroupId__put
 */
const putMessageGroupsCancel = ({
  messageGroupId,
}: PutMessageGroupsCancel.Request) => {
  return publicApi.put<PutMessageGroupsCancel.Response>(
    `messageGroups/cancel/${messageGroupId}`
  )
}

/**
 * 메시지 그룹 비활성화
 * @param {PutMessageGroupsCancel.Request}
 * @return {PutMessageGroupsCancel.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EB%A9%94%EC%84%B8%EC%A7%80%EA%B7%B8%EB%A3%B9%20%EA%B4%80%EB%A6%AC/cancel_message_group_api_v1_messageGroups_cancel__messageGroupId__put
 */
const putMessageGroupsDeactivate = ({
  messageGroupId,
}: PutMessageGroupsCancel.Request) => {
  return publicApi.put<PutMessageGroupsCancel.Response>(
    `messageGroups/deactivate/${messageGroupId}`
  )
}

/**
 * 기본 파라미터 목록 조회
 * @param {GetParametersBasicsList.Request}
 * @return {GetParametersBasicsList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EA%B8%B0%EB%B3%B8%20%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0%20%EA%B4%80%EB%A6%AC/get_parameters_api_v1_parameters_basics_get
 */
const getParametersBasicsList = ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageNo = DEFAULT_PAGE_NO - 1,
  parameter = null,
  title = null,
}: GetParametersBasicsList.Request) =>
  publicApi.get<GetParametersBasicsList.Response>('parameters/basics/list', {
    params: {
      pageSize,
      pageNo,
      parameter,
      title,
    },
  })

/**
 * 기본 파라미터 상세 조회
 * @param {GetParametersBasics.Request}
 * @return {GetParametersBasics.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EA%B8%B0%EB%B3%B8%20%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0%20%EA%B4%80%EB%A6%AC/get_parameter_api_v1_parameters_basics__parameterId__get
 */
const getParametersBasics = ({ parameterId }: GetParametersBasics.Request) =>
  publicApi.get<GetParametersBasics.Response>(
    `parameters/basics/${parameterId}`
  )

/**
 * 기본 파라미터 등록
 * @param {PostParametersBasics.Request}
 * @return {PostParametersBasics.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EA%B8%B0%EB%B3%B8%20%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0%20%EA%B4%80%EB%A6%AC/create_parameter_api_v1_parameters_basics_post
 */
const postParametersBasics = (body: PostParametersBasics.Request) => {
  return publicApi.post<PostParametersBasics.Response>(
    'parameters/basics',
    body
  )
}

/**
 * 기본 파라미터 수정
 * @param {PutParametersBasics.Request}
 * @return {PutParametersBasics.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EA%B8%B0%EB%B3%B8%20%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0%20%EA%B4%80%EB%A6%AC/update_parameter_api_v1_parameters_basics__parameterId__put
 */
const putParametersBasics = ({
  parameterId,
  title,
  description,
}: PutParametersBasics.Request) => {
  return publicApi.put<PutParametersBasics.Response>(
    `parameters/basics/${parameterId}`,
    {
      title,
      description,
    }
  )
}

/**
 * 자동계산 파라미터 목록 조회
 * @param {GetParametersAutosList.Request}
 * @return {GetParametersAutosList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%9E%90%EB%8F%99%EA%B3%84%EC%82%B0%20%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0/get_parameters_api_v1_parameters_autos_list_get
 */
const getParametersAutosList = ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageNo = DEFAULT_PAGE_NO - 1,
  parameter = null,
  title = null,
}: GetParametersAutosList.Request) =>
  publicApi.get<GetParametersAutosList.Response>('parameters/autos/list', {
    params: {
      pageSize,
      pageNo,
      parameter,
      title,
    },
  })

/**
 * 개인정보 파라미터 목록 조회
 * @param {GetParametersPersonalsList.Request}
 * @return {GetParametersPersonalsList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%20%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0/get_parameters_api_v1_parameters_personals_list_get
 */
const getParametersPersonalsList = ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageNo = DEFAULT_PAGE_NO - 1,
  parameter = null,
  title = null,
}: GetParametersPersonalsList.Request) =>
  publicApi.get<GetParametersPersonalsList.Response>(
    'parameters/personals/list',
    {
      params: {
        pageSize,
        pageNo,
        parameter,
        title,
      },
    }
  )

/**
 * 타겟 목록 조회
 * @param {GetTargetsList.Request}
 * @return {GetTargetsList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EA%B4%80%EB%A6%AC/get_targets_api_v1_targets_get
 */
const getTargetsList = ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageNo = DEFAULT_PAGE_NO - 1,
  targetId = null,
  title = null,
}: GetTargetsList.Request) =>
  publicApi.get<GetTargetsList.Response>('targets/list', {
    params: {
      pageSize,
      pageNo,
      targetId,
      title,
    },
  })

/**
 * 타겟 상세 조회
 * @param {GetTargets.Request}
 * @return {GetTargets.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EA%B4%80%EB%A6%AC/get_target_api_v1_targets__targetId__get
 */
const getTargets = ({ targetId }: GetTargets.Request) =>
  publicApi.get<GetTargets.Response>(`targets/${targetId}`)

/**
 * 타겟 등록
 * @param {PostTarget.Request}
 * @return {PostTarget.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EA%B4%80%EB%A6%AC/create_target_api_v1_targets_post
 */
const postTargets = (body: PostTarget.Request) => {
  return publicApi.post<PostTarget.Response>('targets', body)
}

/**
 * 타겟 수정
 * @param {PutTarget.Request}
 * @return {PutTarget.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EA%B4%80%EB%A6%AC/update_target_api_v1_targets__targetId__put
 */
const putTargets = ({
  targetId,
  title,
  isDropDuplicated,
  isExcludeDeniers,
  frequencies,
  includeTargetQueries,
  excludeTargetQueries,
  includeMessageGroups,
  excludeMessageGroups,
}: PutTarget.Request) => {
  return publicApi.put<PutTarget.Response>(`targets/${targetId}`, {
    title,
    isDropDuplicated,
    isExcludeDeniers,
    frequencies,
    includeTargetQueries,
    excludeTargetQueries,
    includeMessageGroups,
    excludeMessageGroups,
  })
}

/**
 * 타겟 쿼리 목록 조회
 * @param {GetTargetsQueriesList.Request}
 * @return {GetTargetsQueriesList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EC%BF%BC%EB%A6%AC%20%EA%B4%80%EB%A6%AC/get_target_queries_api_v1_targets_queries_get
 */
const getTargetsQueriesList = ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageNo = DEFAULT_PAGE_NO - 1,
  queryId = null,
  title = null,
}: GetTargetsQueriesList.Request) =>
  publicApi.get<GetTargetsQueriesList.Response>('targets/queries/list', {
    params: {
      pageSize,
      pageNo,
      queryId,
      title,
    },
  })

/**
 * 타겟 쿼리 상세 조회
 * @param {GetTargetsQueries.Request}
 * @return {GetTargetsQueries.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EC%BF%BC%EB%A6%AC%20%EA%B4%80%EB%A6%AC/get_target_query_api_v1_targets_queries__targetQueryId__get
 */
const getTargetsQueries = ({ targetQueryId }: GetTargetsQueries.Request) =>
  publicApi.get<GetTargetsQueries.Response>(`targets/queries/${targetQueryId}`)

/**
 * 타겟 쿼리 등록
 * @param {PostTargetsQueries.Request}
 * @return {PostTargetsQueries.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EC%BF%BC%EB%A6%AC%20%EA%B4%80%EB%A6%AC/create_target_query_api_v1_targets_queries_post
 */
const postTargetsQueries = (body: PostTargetsQueries.Request) => {
  return publicApi.post<PostTargetsQueries.Response>('targets/queries', body)
}

/**
 * 타겟 쿼리 수정
 * @param {PutTargetsQueries.Request}
 * @return {PutTargetsQueries.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EC%BF%BC%EB%A6%AC%20%EA%B4%80%EB%A6%AC/update_target_query_api_v1_targets_queries__targetQueryId__put
 */
const putTargetsQueries = ({
  targetQueryId,
  title,
  jiraTicketLink,
  description,
  query,
}: PutTargetsQueries.Request) => {
  return publicApi.put<PutTargetsQueries.Response>(
    `targets/queries/${targetQueryId}`,
    {
      title,
      jiraTicketLink,
      description,
      query,
    }
  )
}

/**
 * 타겟 쿼리 모수 업데이트
 * @param {PutTargetsQueriesCalculate.Request}
 * @return {PutTargetsQueriesCalculate.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EC%BF%BC%EB%A6%AC%20%EA%B4%80%EB%A6%AC/update_target_query_api_v1_targets_queries__targetQueryId__put
 */
const putTargetsQueriesCalculate = ({
  targetQueryId,
}: PutTargetsQueriesCalculate.Request) => {
  return publicApi.put<PutTargetsQueriesCalculate.Response>(
    `targets/queries/calculate/${targetQueryId}`
  )
}

/**
 * 푸시 템플릿 등록
 * @param {PostPushTemplates.Request}
 * @return {PostPushTemplates.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%91%B8%EC%8B%9C%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/create_push_template_api_v1_push_templates_post
 */
const postPushTemplates = (body: PostPushTemplates.Request) => {
  return publicApi.post<PostPushTemplates.Response>('push/templates', body)
}

/**
 * 푸시 템플릿 상세 조회
 * @param {GetPushTemplates.Request}
 * @return {GetPushTemplates.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%91%B8%EC%8B%9C%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_push_template_api_v1_push_templates__template_code__get
 */
const getPushTemplates = ({ templateCode }: GetPushTemplates.Request) => {
  const result = publicApi.get<GetPushTemplates.Response>(
    `push/templates/${templateCode}`
  )

  return result
}

/**
 * 푸시 템플릿 목록 조회
 * @param {GetPushTemplatesList.Request}
 * @return {GetPushTemplatesList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%91%B8%EC%8B%9C%20%EB%A9%94%EC%84%B8%EC%A7%80%20%EA%B4%80%EB%A6%AC/get_push_templates_api_v1_push_templates_get
 */
const getPushTemplatesList = ({
  pageSize,
  pageNo,
  templateCode = '',
  field = 'id',
  direction = SortDirection.DESC,
}: GetPushTemplatesList.Request): Promise<
  Response<GetPushTemplatesList.Response>
> => {
  const result = publicApi.get<GetPushTemplatesList.Response>(
    'push/templates/list',
    {
      params: {
        pageNo,
        pageSize,
        templateCode,
        field,
        direction,
      },
    }
  )

  return result
}

/**
 * 푸시 단건 발송
 * @param {PostPushSend.Request}
 * @return {PostPushSend.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%91%B8%EC%8B%9C%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/send_push_api_v1_push_send_post
 */
const postPushSend = ({
  userId,
  templateCode,
  templateParameter,
  autoFillParameter,
  priority = SendTestMessagePriority.FASTEST,
  containsAlimlist = false,
}: PostPushSend.Request) => {
  return publicApi.post<PostPushSend.Response>('push/send', {
    userId,
    templateCode,
    templateParameter,
    autoFillParameter,
    priority,
    containsAlimlist,
  })
}
/**
 * 알림톡 템플릿 목록 조회
 * @param {GetAlimtalkTemplatesList.Request}
 * @return {GetAlimtalkTemplatesList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_alimtalk_templates_api_v1_alimtalk_templates_list_get
 */
const getAlimtalkTemplatesList = ({
  pageNo,
  pageSize,
  searchStartDate = apiUtils.getDefaultSearchStartDate(),
  templateCode = null,
  name = null,
  profile = null,
  includeDeleted = null,
  field = null,
  direction = SortDirection.DESC,
}: GetAlimtalkTemplatesList.Request): Promise<
  Response<GetAlimtalkTemplatesList.Response>
> => {
  const result = publicApi.get<GetAlimtalkTemplatesList.Response>(
    'alimtalk/templates/list',
    {
      params: {
        pageNo,
        pageSize,
        searchStartDate,
        templateCode,
        name,
        profile,
        includeDeleted,
        field,
        direction,
      },
    }
  )

  return result
}

/**
 * 알림톡 템플릿 상세 조회
 * @param {GetAlimtalkTemplate.Request}
 * @return {GetAlimtalkTemplate.Response}
 */
const getAlimtalkTemplates = ({
  templateCode,
  profile,
}: GetAlimtalkTemplates.Request): Promise<
  Response<GetAlimtalkTemplates.Response>
> => {
  const result = publicApi.get<GetAlimtalkTemplates.Response>(
    `alimtalk/templates/${templateCode}?profile=${profile}`
  )

  return result
}

/**
 * 알림톡 템플릿 파라미터 목록 조회
 * @param {GetAlimtalkTemplatesParameters.Request}
 * @return {GetAlimtalkTemplatesParameters.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_alimtalk_template_parameters_api_v1_alimtalk_templates_parameters__templateCode__get
 */
const getAlimtalkTemplatesParameters = ({
  templateCode,
  profile,
}: GetAlimtalkTemplatesParameters.Request): Promise<
  Response<GetAlimtalkTemplatesParameters.Response>
> => {
  const result = publicApi.get<GetAlimtalkTemplatesParameters.Response>(
    `alimtalk/templates/parameters/${templateCode}?profile=${profile}`
  )

  return result
}

/**
 * 알림톡 템플릿 파라미터 매칭정보 조회, 파라미터 치환, 테스트 발송, 메시지 그룹 소재 설정시 사용
 * @param {GetAlimtalkTemplatesMatchedParameters.Request}
 * @return {GetAlimtalkTemplatesMatchedParameters.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_alimtalk_template_matched_parameters_api_v1_alimtalk_templates_matchedParameters__templateCode__get
 */
const getAlimtalkTemplatesMatchedParameters = ({
  templateCode,
  profile,
}: GetAlimtalkTemplatesMatchedParameters.Request): Promise<
  Response<GetAlimtalkTemplatesMatchedParameters.Response>
> => {
  const result = publicApi.get<GetAlimtalkTemplatesMatchedParameters.Response>(
    `alimtalk/templates/matchedParameters/${templateCode}?profile=${profile}`
  )

  return result
}

/**
 * 알림톡 템플릿 파라미터 목록 조회. 활성화시 사용
 * @param {GetAlimtalkActivate.Request}
 * @return {GetAlimtalkActivate.Response}
 */
const getAlimtalkActivate = ({
  templateCode,
}: GetAlimtalkActivate.Request): Promise<
  Response<GetAlimtalkActivate.Response>
> => {
  const result = publicApi.get<GetAlimtalkActivate.Response>(
    `alimtalk/activate/${templateCode}`
  )

  return result
}

/**
 * 알림톡 단건 발송
 * @param {PostAlimtalkSend.Request}
 * @return {PostAlimtalkSend.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/send_alimtalk_api_v1_alimtalk_send_post
 */
const postAlimtalkSend = ({
  tag = SendTestMessageTagType.RDD,
  templateCode,
  sendProfile = SendProfile.SZS,
  userId,
  parameterMap,
  autoFillParameter,
  priority,
  containsAlimlist = false,
}: PostAlimtalkSend.Request) => {
  return publicApi.post<PostAlimtalkSend.Response>('alimtalk/send', {
    tag,
    templateCode,
    sendProfile,
    userId,
    parameterMap,
    autoFillParameter,
    priority,
    containsAlimlist,
  })
}

/**
 * 알림톡 템플릿 활성화
 * @param {PostAlimtalkActivate.Request}
 * @return {PostAlimtalkActivate.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/activate_alimtalk_template_api_v1_alimtalk_activate__templateCode__post
 */
const postAlimtalkActivate = ({
  templateCode,
  profile,
  alimtalkMatchDetails,
}: PostAlimtalkActivate.Request) => {
  return publicApi.post<PostAlimtalkActivate.Response>(
    `alimtalk/activate/${templateCode}?profile=${profile}`,
    {
      alimtalkMatchDetails,
    }
  )
}

/**
 * 친구톡 템플릿 상세 조회
 * @param {GetFriendtalkTemplates.Request}
 * @return {GetFriendtalkTemplates.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_friendtalk_template_api_v1_friendtalk_templates__template_code__get
 */
const getFriendtalkTemplates = ({
  templateCode,
}: GetFriendtalkTemplates.Request) => {
  const result = publicApi.get<GetFriendtalkTemplates.Response>(
    `friendtalk/templates/${templateCode}`
  )

  return result
}

/**
 * 친구톡 템플릿 목록 조회
 * @param {GetFriendtalkTemplatesList.Request}
 * @return {GetFriendtalkTemplatesList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_friendtalk_templates_api_v1_friendtalk_templates_list_get
 */
const getFriendtalkTemplatesList = ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageNo = DEFAULT_PAGE_NO - 1,
  templateCode = null,
  field = 'id',
  direction = SortDirection.DESC,
}: GetFriendtalkTemplatesList.Request) =>
  publicApi.get<GetFriendtalkTemplatesList.Response>(
    'friendtalk/templates/list',
    {
      params: {
        pageSize,
        pageNo,
        templateCode,
        field,
        direction,
      },
    }
  )

/**
 * 친구톡 BASE/WIDE 템플릿 등록
 * @param {PostFriendtalkTemplatesBase.Request}
 * @return {PostFriendtalkTemplatesBase.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/create_friendtalk_base_template_api_v1_friendtalk_templates_base_post
 */
const postFriendtalkTemplatesBase = (
  body: PostFriendtalkTemplatesBase.Request
) => {
  return publicApi.post<PostFriendtalkTemplatesBase.Response>(
    'friendtalk/templates/base',
    {
      ...body,
    }
  )
}

/**
 * 친구톡 CAROUSEL 템플릿 등록
 * @param {PostFriendtalkTemplatesCarousel.Request}
 * @return {PostFriendtalkTemplatesCarousel.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/create_friendtalk_carousel_template_api_v1_friendtalk_templates_carousel_post
 */
const postFriendtalkTemplatesCarousel = (
  body: PostFriendtalkTemplatesCarousel.Request
) => {
  return publicApi.post<PostFriendtalkTemplatesCarousel.Response>(
    'friendtalk/templates/carousel',
    {
      ...body,
    }
  )
}

/**
 * 친구톡 WIDELIST 템플릿 등록
 * @param {PostFriendtalkTemplatesWidelist.Request}
 * @return {PostFriendtalkTemplatesWidelist.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/create_friendtalk_widelist_template_api_v1_friendtalk_templates_widelist_post
 */
const postFriendtalkTemplatesWidelist = (
  body: PostFriendtalkTemplatesWidelist.Request
) => {
  return publicApi.post<PostFriendtalkTemplatesWidelist.Response>(
    'friendtalk/templates/widelist',
    {
      ...body,
    }
  )
}

/**
 * 친구톡 단건 발송
 * @param {PostFriendtalkSend.Request}
 * @return {PostFriendtalkSend.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/send_friendtalk_api_v1_friendtalk_send_post
 */
const postFriendtalkSend = ({
  tag = SendTestMessageTagType.RDD,
  templateCode,
  userId,
  requestParameter,
  autoFillParameter,
  containsAlimlist = false,
}: PostFriendtalkSend.Request) => {
  return publicApi.post<PostFriendtalkSend.Response>('friendtalk/send', {
    tag,
    templateCode,
    userId,
    requestParameter,
    autoFillParameter,
    containsAlimlist,
  })
}

/**
 * 친구톡 템플릿 이미지 등록
 * @param {PostFriendtalkTemplatesImages.Request}
 * @return {PostFriendtalkTemplatesImages.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/create_friendtalk_template_image_api_v1_friendtalk_templates_images_post
 */
const postFriendtalkTemplateImages = ({
  body,
  type,
}: PostFriendtalkTemplatesImages.Request) => {
  return publicApi.post<PostFriendtalkTemplatesImages.Response>(
    'friendtalk/templates/images',
    body,
    {
      params: { type },
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )
}

/**
 * 친구톡 템플릿 이미지 목록 조회
 * @param {GetFriendtalkTemplatesImagesList.Request}
 * @return {GetFriendtalkTemplatesImagesList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_friendtalk_template_images_api_v1_friendtalk_templates_images_list_get
 */
const getFriendtalkTemplateImagesList = ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageNo = DEFAULT_PAGE_NO - 1,
  url = null,
  templateType = null,
  originFileName = null,
  field = 'id',
  direction = SortDirection.DESC,
}: GetFriendtalkTemplatesImagesList.Request) =>
  publicApi.get<GetFriendtalkTemplatesImagesList.Response>(
    'friendtalk/templates/images/list',
    {
      params: {
        pageSize,
        pageNo,
        url,
        templateType,
        originFileName,
        field,
        direction,
      },
    }
  )

/**
 * 알림리스트 템플릿 목록 조회
 * @param {GetAlimlistTemplatesList.Request}
 * @return {GetAlimlistTemplatesList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%EB%A6%AC%EC%8A%A4%ED%8A%B8%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_alimlist_templates_api_v1_alimlist_templates_list_get
 */
const getAlimlistTemplatesList = ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageNo = DEFAULT_PAGE_NO - 1,
  templateCode = null,
  field = 'id',
  direction = SortDirection.DESC,
}: GetAlimlistTemplatesList.Request) =>
  publicApi.get<GetAlimlistTemplatesList.Response>('alimlist/templates/list', {
    params: {
      pageSize,
      pageNo,
      templateCode,
      field,
      direction,
    },
  })

/**
 * 알림리스트 템플릿 상세 조회
 * @param {GetAlimlistTemplates.Request}
 * @return {GetAlimlistTemplates.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%EB%A6%AC%EC%8A%A4%ED%8A%B8%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_alimlist_template_api_v1_alimlist_templates__template_code__get
 */
const getAlimlistTemplates = ({
  templateCode,
}: GetAlimlistTemplates.Request) => {
  const result = publicApi.get<GetAlimlistTemplates.Response>(
    `alimlist/templates/${templateCode}`
  )

  return result
}

/**
 * 알림리스트 템플릿 등록
 * @param {PostAlimlistTemplates.Request}
 * @return {PostAlimlistTemplates.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%EB%A6%AC%EC%8A%A4%ED%8A%B8%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/create_alimlist_template_api_v1_alimlist_templates_post
 */
const postAlimlistTemplates = (body: PostAlimlistTemplates.Request) => {
  return publicApi.post<PostAlimlistTemplates.Response>('alimlist/templates', {
    ...body,
    // NOTE: 기획 문서상으로 detail은 사용되지 않으므로 공백문자열로 전달합니다.
    // https://docs.google.com/presentation/d/12HERRBQgAGEUtsjHN0NrgDDH6Nf_TZyMtCf76L73naU/edit#slide=id.g2560d691ddc_0_795
    detail: '',
  })
}

/**
 * 알림리스트 단건 발송
 * @param {PostAlimlistSend.Request}
 * @return {PostAlimlistSend.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%EB%A6%AC%EC%8A%A4%ED%8A%B8%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/send_alimlist_api_v1_alimlist_send_post
 */
const postAlimlistSend = ({
  userId,
  templateCode,
  requestParameter,
  autoFillParameter,
}: PostAlimlistSend.Request) => {
  return publicApi.post<PostAlimlistSend.Response>('alimlist/send', {
    userId,
    templateCode,
    requestParameter,
    autoFillParameter,
  })
}

/**
 * cdn asset 목록 조회
 * @param {GetCdnAssetsList.Request}
 * @return {GetCdnAssetsList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/cdn%20asset%20%EA%B4%80%EB%A6%AC/get_cdn_assets_api_v1_cdn_assets_list_get
 */
const getCdnAssetsList = ({
  assetGroup,
  pageSize = DEFAULT_PAGE_SIZE,
  pageNo = DEFAULT_PAGE_NO - 1,
}: GetCdnAssetsList.Request) =>
  publicApi.get<GetCdnAssetsList.Response>('cdn/assets/list', {
    params: {
      assetGroup,
      pageSize,
      pageNo,
    },
  })

/**
 * cdn asset 등록
 * @param {PostCdnAssets.Request}
 * @return {PostCdnAssets.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/cdn%20asset%20%EA%B4%80%EB%A6%AC/create_cdn_asset_api_v1_cdn_assets_post
 */
const postCdnAssets = ({ body, assetGroup }: PostCdnAssets.Request) => {
  return publicApi.post<PostCdnAssets.Response>('cdn/assets', body, {
    params: { assetGroup },
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

/**
 * 테스터 목록 조회
 * @param {GetTestersList.Request}
 * @return {GetTestersList.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%85%8C%EC%8A%A4%ED%84%B0%20%EA%B4%80%EB%A6%AC/get_testers_api_v1_testers_list_get
 */
const getTestersList = ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageNo = DEFAULT_PAGE_NO - 1,
  userId = '',
  note = '',
}: GetTestersList.Request) =>
  publicApi.get<GetTestersList.Response>('testers/list', {
    params: {
      pageSize,
      pageNo,
      userId,
      note,
    },
  })

/**
 * 테스터 상세 조회
 * @param {GetTesters.Request}
 * @return {GetTesters.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%85%8C%EC%8A%A4%ED%84%B0%20%EA%B4%80%EB%A6%AC/get_testers_api_v1_testers_get
 */
const getTesters = ({ testerId }: GetTesters.Request) =>
  publicApi.get<GetTesters.Response>(`testers/${testerId}`, {
    params: {
      testerId,
    },
  })

/**
 * 테스터 등록
 * @param {PostTesters.Request}
 * @return {PostTesters.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%85%8C%EC%8A%A4%ED%84%B0%20%EA%B4%80%EB%A6%AC/create_tester_api_v1_testers_post
 */
const postTesters = (body: PostTesters.Request) => {
  return publicApi.post<PostTesters.Response>('testers', body)
}

/**
 * 테스터 수정
 * @param {PutTesters.Request}
 * @return {PutTesters.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%85%8C%EC%8A%A4%ED%84%B0%20%EA%B4%80%EB%A6%AC/update_tester_api_v1_testers__testerId__put
 */
const putTesters = ({ testerId, userId, note }: PutTesters.Request) => {
  return publicApi.put<PutTesters.Response>(`testers/${testerId}`, {
    userId,
    note,
  })
}

/**
 * 테스터 벌크 삭제
 * @param {PostTestersDelete.Request}
 * @return {PostTestersDelete.Response}
 * @see https://rdd-internal.dev.jobis.co/docs#/%ED%85%8C%EC%8A%A4%ED%84%B0%20%EA%B4%80%EB%A6%AC/delete_testers_api_v1_testers_delete_post
 */
const postTestersDelete = (body: PostTestersDelete.Request) => {
  return publicApi.post<PostTestersDelete.Response>(`testers/delete`, body)
}

export default {
  postAuthUser,
  getHealthCheck,
  getActionsList,
  getActions,
  postActions,
  putActions,
  getCampaigns,
  postCampaigns,
  putCampaigns,
  getMessageGroups,
  putMessageGroupsActivate,
  putMessageGroupsCancel,
  putMessageGroupsDeactivate,
  putMessageGroups,
  getParametersBasicsList,
  getParametersBasics,
  postParametersBasics,
  putParametersBasics,
  getParametersAutosList,
  getParametersPersonalsList,
  getTargets,
  getTargetsList,
  postTargets,
  putTargets,
  getTargetsQueriesList,
  getTargetsQueries,
  postTargetsQueries,
  putTargetsQueries,
  putTargetsQueriesCalculate,
  getPushTemplates,
  getPushTemplatesList,
  postPushTemplates,
  postPushSend,
  getAlimlistTemplates,
  getAlimlistTemplatesList,
  postAlimlistTemplates,
  postAlimlistSend,
  getAlimtalkTemplatesList,
  getAlimtalkTemplates,
  getAlimtalkTemplatesParameters,
  getAlimtalkTemplatesMatchedParameters,
  getAlimtalkActivate,
  postAlimtalkSend,
  postAlimtalkActivate,
  getFriendtalkTemplates,
  getFriendtalkTemplatesList,
  postFriendtalkTemplatesBase,
  postFriendtalkTemplatesCarousel,
  postFriendtalkTemplatesWidelist,
  getFriendtalkTemplateImagesList,
  postFriendtalkSend,
  getCdnAssetsList,
  postFriendtalkTemplateImages,
  postCdnAssets,
  getTestersList,
  getTesters,
  postTesters,
  putTesters,
  postTestersDelete,
  getDoneMessageGroupsList,
}
