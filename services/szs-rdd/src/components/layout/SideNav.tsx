import { Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import styled from '@emotion/styled'

import { RoutePath } from '~/routes'

import SideNavLink from './SideNavLink'

function SideNav() {
  return (
    <Container>
      <Spacing px={15} />
      <Text typography="heading24" weight="bold">
        캠페인
      </Text>
      <br />
      <Spacing px={7} />
      <Text typography="heading18">캠페인 액션</Text>
      <br />
      <SideNavLink
        to={`${RoutePath.Action}/${RoutePath.ActionList}`}
        name={'캠페인 액션 목록'}
      />
      <SideNavLink
        to={`${RoutePath.Action}/${RoutePath.CreateAction}`}
        name={'캠페인 액션 생성'}
      />
      <Spacing px={15} />
      <Text typography="heading24" weight="bold">
        타겟
      </Text>
      <br />
      <SideNavLink
        to={`${RoutePath.Target}/${RoutePath.TargetList}`}
        name={'타겟 목록'}
      />
      <SideNavLink
        to={`${RoutePath.Target}/${RoutePath.CreateTarget}`}
        name={'타겟 생성'}
      />
      <Spacing px={15} />
      <Text typography="heading24" weight="bold">
        타겟 쿼리
      </Text>
      <br />
      <SideNavLink
        to={`${RoutePath.TargetQuery}/${RoutePath.TargetQueryList}`}
        name={'타겟 쿼리 목록'}
      />
      <SideNavLink
        to={`${RoutePath.TargetQuery}/${RoutePath.CreateTargetQuery}`}
        name={'타겟 쿼리 생성'}
      />
      <Spacing px={15} />
      <Text typography="heading24" weight="bold">
        메시지 관리
      </Text>
      <br />
      <Spacing px={7} />
      <Text typography="heading18">카카오알림톡</Text>
      <br />
      <SideNavLink
        to={`${RoutePath.AlimtalkTemplate}/${RoutePath.AlimtalkTemplateList}`}
        name={'메시지 목록'}
      />
      <Spacing px={7} />
      <Text typography="heading18">카카오친구톡</Text>
      <br />
      <SideNavLink
        to={`${RoutePath.FriendtalkTemplate}/${RoutePath.FriendtalkTemplateList}`}
        name={'카카오친구톡 목록'}
      />
      <SideNavLink
        to={`${RoutePath.FriendtalkTemplate}/${RoutePath.CreateFriendtalkTemplate}`}
        name={'카카오친구톡 생성'}
      />
      <SideNavLink
        to={`${RoutePath.FriendtalkTemplateImage}/${RoutePath.FriendtalkTemplateImageList}`}
        name={'이미지 목록'}
      />
      <SideNavLink
        to={`${RoutePath.FriendtalkTemplateImage}/${RoutePath.UploadFriendtalkTemplateImage}`}
        name={'이미지 업로드'}
      />
      <Spacing px={7} />
      <Text typography="heading18">앱 푸시</Text>
      <br />
      <SideNavLink
        to={`${RoutePath.PushTemplate}/${RoutePath.PushTemplateList}`}
        name={'앱 푸시 목록'}
      />
      <SideNavLink
        to={`${RoutePath.PushTemplate}/${RoutePath.CreatePushTemplate}`}
        name={'앱 푸시 생성'}
      />
      <Spacing px={7} />
      <Text typography="heading18">알림리스트</Text>
      <br />
      <SideNavLink
        to={`${RoutePath.AlimlistTemplate}/${RoutePath.AlimlistTemplateList}`}
        name={'알림리스트 목록'}
      />
      <SideNavLink
        to={`${RoutePath.AlimlistTemplate}/${RoutePath.CreateAlimlistTemplate}`}
        name={'알림리스트 생성'}
      />
      {/* <Spacing px={7} />
      <Text typography="heading18">문자</Text>
      <br />
      <SideNavLink
        to={`${RoutePath.SMS}/${RoutePath.SMSList}`}
        name={'문자 목록'}
      />
      <SideNavLink
        to={`${RoutePath.SMS}/${RoutePath.EditSMS}`}
        name={'문자 생성'}
      /> */}
      <Spacing px={7} />
      <Text typography="heading18">CDN 이미지</Text>
      <br />
      <SideNavLink
        to={`${RoutePath.CdnAsset}/${RoutePath.CdnAssetList}`}
        name={'이미지 목록'}
      />
      <SideNavLink
        to={`${RoutePath.CdnAsset}/${RoutePath.UploadCdnAsset}`}
        name={'이미지 업로드'}
      />
      <Spacing px={7} />
      <Text typography="heading18">테스터</Text>
      <br />
      <SideNavLink
        to={`${RoutePath.Tester}/${RoutePath.TesterList}`}
        name={'테스터 목록'}
      />
      <SideNavLink
        to={`${RoutePath.Tester}/${RoutePath.RegisterTester}`}
        name={'테스터 등록'}
      />
      <Spacing px={15} />
      <Text typography="heading24" weight="bold">
        파라미터
      </Text>
      <br />
      <Spacing px={7} />
      <Text typography="heading18">기본 파라미터</Text>
      <br />
      <SideNavLink
        to={`${RoutePath.BasicParameter}/${RoutePath.BasicParameterList}`}
        name={'기본 파라미터 목록'}
      />
      <SideNavLink
        to={`${RoutePath.BasicParameter}/${RoutePath.CreateBasicParameter}`}
        name={'기본 파라미터 생성'}
      />
      <Spacing px={7} />
      <Text typography="heading18">자동계산 파라미터</Text>
      <br />
      <SideNavLink
        to={`${RoutePath.AutoParameter}/${RoutePath.AutoParameterList}`}
        name={'자동계산 파라미터 목록'}
      />
      <Spacing px={7} />
      <Text typography="heading18">개인정보 파라미터</Text>
      <br />
      <SideNavLink
        to={`${RoutePath.PersonalParameter}/${RoutePath.PersonalParameterList}`}
        name={'개인정보 파라미터 목록'}
      />
    </Container>
  )
}

export default SideNav

// TOOD 이렇게 쓰는 것이 맞을까? 아니면 다른 서비스들처럼 util로 관리해야 하나?
const Container = styled.div`
  flex-basis: 200px;
  height: 100%;
  border-right: 1px solid ${colors.light.scheme.$gray20};
  background: ${colors.light.scheme.$white};
  overflow-y: auto;
  padding-left: 10px;
  padding-bottom: 10px;
`
