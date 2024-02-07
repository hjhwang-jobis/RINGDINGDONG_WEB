import { BaseModal, ErrorInfo, Modal } from '@3o3-internal/components'
import React, { useRef } from 'react'

import { ParameterType } from '~/alimtalk/constants'
import { AlimtalkMatchDetail } from '~/alimtalk/types'
import Loader from '~/components/Loader'
import {
  AlimtalkChannelType,
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE_LARGE,
} from '~/constants'
import { useGetAlimtalkTemplatesParametersQuery } from '~/hooks/queries/alimtalk/useGetAlimtalkTemplatesParametersQuery'
import { useGetParametersAutosListQuery } from '~/hooks/queries/autoParameter/useGetParametersAutosListQuery'
import { useGetParametersBasicsListQuery } from '~/hooks/queries/basicParameter/useGetParametersBasicsListQuery'
import { useGetParametersPersonalsListQuery } from '~/hooks/queries/personalParameter/useGetParametersPersonalsListQuery'
import { apiUtils } from '~/utils'

import AlimtalkTemplateListTableModalMatchingParameterListForm from './AlimtalkTemplateListTableModalMatchingParameterListForm'

interface Props extends BaseModal {
  templateCode: string
  profile: AlimtalkChannelType
  callback: (alimtalkMatchDetails: AlimtalkMatchDetail[]) => void
}

export default function AlimtalkTemplateListTableModalMatchingParameterList({
  modalKey,
  templateCode,
  profile,
  callback,
}: Props) {
  const alimtalkMatchDetailsRef = useRef<AlimtalkMatchDetail[]>([])

  const {
    data: responseAlimtalkTemplatesParameters,
    isLoading: isLoadingAlimtalkTemplatesParameters,
    error: errorAlimtalkTemplatesParameters,
  } = useGetAlimtalkTemplatesParametersQuery({
    templateCode,
    profile,
  })

  const {
    data: responseAutoParameters,
    isLoading: isLoadingAutoParameters,
    error: errorAutoParameters,
  } = useGetParametersAutosListQuery({
    pageSize: DEFAULT_PAGE_SIZE_LARGE,
    pageNo: DEFAULT_PAGE_NO - 1,
  })

  const {
    data: responseBasicParameters,
    isLoading: isLoadingBasicParameters,
    error: errorBasicParameters,
  } = useGetParametersBasicsListQuery({
    pageSize: DEFAULT_PAGE_SIZE_LARGE,
    pageNo: DEFAULT_PAGE_NO - 1,
  })

  const {
    data: responsePersonalParameters,
    isLoading: isLoadingPersonalParameters,
    error: errorPersonalParameters,
  } = useGetParametersPersonalsListQuery({
    pageSize: DEFAULT_PAGE_SIZE_LARGE,
    pageNo: DEFAULT_PAGE_NO - 1,
  })

  return (
    <Modal
      modalKey={modalKey}
      hasCancel
      cancelVariant="secondary"
      size="xl"
      title="알림톡 파라미터 매칭"
      onOkClick={() => callback(alimtalkMatchDetailsRef.current)}
    >
      {isLoadingAlimtalkTemplatesParameters ||
      isLoadingAutoParameters ||
      isLoadingBasicParameters ||
      isLoadingPersonalParameters ? (
        <Loader />
      ) : errorAlimtalkTemplatesParameters ? (
        <ErrorInfo
          title="알림톡 상세 조회 오류"
          message={apiUtils.getApiErrorMessage(
            errorAlimtalkTemplatesParameters
          )}
        />
      ) : errorAutoParameters ? (
        <ErrorInfo
          title="자동계산 파라미터 조회 오류"
          message={apiUtils.getApiErrorMessage(errorAutoParameters)}
        />
      ) : errorBasicParameters ? (
        <ErrorInfo
          title="기본 파라미터 조회 오류"
          message={apiUtils.getApiErrorMessage(errorBasicParameters)}
        />
      ) : errorPersonalParameters ? (
        <ErrorInfo
          title="개인정보 파라미터 조회 오류"
          message={apiUtils.getApiErrorMessage(errorPersonalParameters)}
        />
      ) : responseAlimtalkTemplatesParameters &&
        responseBasicParameters &&
        responsePersonalParameters &&
        responseAutoParameters ? (
        <AlimtalkTemplateListTableModalMatchingParameterListForm
          alimtalkParameters={
            responseAlimtalkTemplatesParameters.data.parameters
          }
          autoParameters={[...responseAutoParameters.data.contents]}
          personalParameters={[...responsePersonalParameters.data.contents]}
          basicParameters={[...responseBasicParameters.data.contents]}
          onBlur={({ alimtlakMatchParameters }) => {
            const list = alimtlakMatchParameters.map((item) => {
              if (!item.matchedParameter) {
                return item
              }

              const data: {
                parameterType: ParameterType
                matchedParameter: string
              } = JSON.parse(item.matchedParameter)

              return {
                ...item,
                parameterType: data.parameterType,
                matchedParameter: data.matchedParameter,
              }
            })

            alimtalkMatchDetailsRef.current = list
          }}
        />
      ) : null}
    </Modal>
  )
}
