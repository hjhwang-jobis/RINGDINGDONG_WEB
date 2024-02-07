import { createBrowserRouter } from 'react-router-dom'

import {
  ActionDetailPage,
  ActionListPage,
  CreateActionPage,
  EditActionPage,
} from '~/action/pages'
import {
  AlimlistTemplateDetailPage,
  AlimlistTemplateListPage,
  CopyAlimlistTemplatePage,
  CreateAlimlistTemplatePage,
} from '~/alimlist/pages'
import {
  AlimtalkTemplateDetailPage,
  AlimtalkTemplateListPage,
} from '~/alimtalk/pages'
import { AutoParameterListPage } from '~/autoParameter/pages'
import {
  BasicParameterListPage,
  CreateBasicParameterPage,
  EditBasicParameterPage,
} from '~/basicParameter/pages'
import {
  CampaignDetailPage,
  CreateCampaignPage,
  EditCampaignPage,
} from '~/campaign/pages'
import { CdnAssetListPage, UploadCdnAssetPage } from '~/cdn/pages'
import Layout from '~/components/layout'
import {
  CampaignDashboardPage,
  EditTrackingLinkPage,
  SendingResultPage,
} from '~/dashboard/pages'
import Dummy from '~/dummy'
import {
  CopyFriendtalkTemplatePage,
  CreateFriendtalkTemplatePage,
  FriendtalkTemplateDetailPage,
  FriendtalkTemplateListPage,
} from '~/friendtalk/pages'
import {
  FriendtalkTemplateImagePage,
  UploadFriendtalkTemplateImagePage,
} from '~/friendtalkImage/pages'
import LogoutPage from '~/login/pages/LogoutPage'
import {
  ActivateMessageGroupPage,
  EditMessageGroupPage,
  MessageGroupDetailPage,
} from '~/messageGroup/pages'
import NotFoundPage from '~/pages/ErrorPage/NotFoundPage'
import { PersonalParameterListPage } from '~/personalParameter/pages'
import {
  CopyPushTemplatePage,
  CreatePushTemplatePage,
  PushTemplateDetailPage,
  PushTemplateListPage,
} from '~/push/pages'
import { EditSMSPage, SMSListPage } from '~/sms/pages'
import {
  CreateTargetPage,
  EditTargetPage,
  TargetListPage,
} from '~/target/pages'
import {
  CreateTargetQueryPage,
  EditTargetQueryPage,
  TargetQueryListPage,
} from '~/targetQuery/pages'
import {
  EditTesterPage,
  RegisterTesterPage,
  TestersListPage,
} from '~/tester/pages'

export const RoutePath = {
  Dummy: '/dummy',
  Login: '/login',
  Logout: '/logout',
  Root: '/',
  Dashboard: 'dashboard',
  CampaignDashboard: 'campaign',
  SendingResult: 'sending-result',
  EditTrackingLink: 'edit-tracking-link',
  Action: '/action',
  ActionDetail: 'detail',
  ActionList: 'list',
  CreateAction: 'create',
  EditAction: 'edit',
  Campaign: '/campaign',
  CampaignList: 'list',
  CreateCampaign: 'create',
  EditCampaign: `edit`,
  CampaignDetail: `detail`,
  MessageGroup: '/message-group',
  MessageGroupDetail: 'detail',
  EditMessageGroup: 'edit',
  ActivateMessageGroup: 'activate',
  Target: '/target',
  TargetList: 'list',
  CreateTarget: 'create',
  TargetQuery: '/target-query',
  TargetQueryList: 'list',
  TargetQueryDetail: 'detail',
  CreateTargetQuery: 'create',
  EditTarget: 'edit',
  AlimtalkTemplate: '/alimtalk-template',
  AlimtalkTemplateList: 'list',
  AlimtalkTemplateDetail: 'detail',
  FriendtalkTemplate: '/friendtalk-template',
  FriendtalkTemplateList: 'list',
  FriendtalkTemplateDetail: 'detail',
  FriendtalkTemplateImage: '/friendtalk-template-image',
  CreateFriendtalkTemplate: 'create',
  CopyFriendtalkTemplate: 'copy',
  FriendtalkTemplateImageList: 'list',
  UploadFriendtalkTemplateImage: 'upload',
  CreateFriendtalkTemplateImage: 'create',
  CdnAsset: '/cdn-asset',
  CdnAssetList: 'list',
  UploadCdnAsset: 'upload',
  PushTemplate: '/push',
  PushTemplateList: 'list',
  CreatePushTemplate: 'create',
  CopyPushTemplate: 'copy',
  PushTemplateDetail: 'detail',
  AlimlistTemplate: '/alimlist-template',
  AlimlistTemplateList: 'list',
  CreateAlimlistTemplate: 'create',
  CopyAlimlistTemplate: 'copy',
  AlimlistTemplateDetail: 'detail',
  Tester: '/tester',
  TesterList: 'list',
  RegisterTester: 'register',
  EditTester: 'edit',
  BasicParameter: '/basic-parameter',
  BasicParameterList: 'list',
  CreateBasicParameter: 'create',
  EditBasicParameter: 'edit',
  AutoParameter: '/auto-parameter',
  AutoParameterList: 'list',
  PersonalParameter: '/personal-parameter',
  PersonalParameterList: 'list',
  SMS: '/sms',
  SMSList: 'list',
  EditSMS: 'edit',
} as const

import ProtectedRoute from '~/components/ProtectedRoute'

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <CampaignDashboardPage />,
      },
      {
        path: RoutePath.Dummy,
        element: <Dummy />,
      },
      {
        path: RoutePath.Dashboard,
        children: [
          {
            path: RoutePath.CampaignDashboard,
            element: <CampaignDashboardPage />,
          },
          {
            path: RoutePath.SendingResult,
            element: (
              <ProtectedRoute roles={['manager']}>
                <SendingResultPage />
              </ProtectedRoute>
            ),
          },
          {
            path: RoutePath.EditTrackingLink,
            element: <EditTrackingLinkPage />,
          },
        ],
      },
      {
        path: RoutePath.Action,
        children: [
          {
            path: RoutePath.ActionList,
            element: <ActionListPage />,
          },
          {
            path: RoutePath.CreateAction,
            element: <CreateActionPage />,
          },
          {
            path: `${RoutePath.ActionDetail}/:id`,
            element: <ActionDetailPage />,
          },
          {
            path: `${RoutePath.EditAction}/:id`,
            element: <EditActionPage />,
          },
        ],
      },
      {
        path: RoutePath.Campaign,
        children: [
          {
            path: `${RoutePath.CreateCampaign}/:actionId`,
            element: <CreateCampaignPage />,
          },
          {
            path: `${RoutePath.CampaignDetail}/:id`,
            element: <CampaignDetailPage />,
          },
          {
            path: `${RoutePath.EditCampaign}/:id`,
            element: <EditCampaignPage />,
          },
        ],
      },
      {
        path: RoutePath.MessageGroup,
        children: [
          {
            path: `${RoutePath.MessageGroupDetail}/:id`,
            element: <MessageGroupDetailPage />,
          },
          {
            path: `${RoutePath.EditMessageGroup}/:id`,
            element: <EditMessageGroupPage />,
          },
          {
            path: `${RoutePath.ActivateMessageGroup}/:campaignId/:messageGroupId`,
            element: <ActivateMessageGroupPage />,
          },
        ],
      },
      {
        path: RoutePath.Target,
        children: [
          {
            path: RoutePath.TargetList,
            element: <TargetListPage />,
          },
          {
            path: RoutePath.CreateTarget,
            element: <CreateTargetPage />,
          },
          {
            path: `${RoutePath.EditTarget}/:id`,
            element: <EditTargetPage />,
          },
        ],
      },
      {
        path: RoutePath.TargetQuery,
        children: [
          {
            path: RoutePath.TargetQueryList,
            element: <TargetQueryListPage />,
          },
          {
            path: RoutePath.CreateTargetQuery,
            element: <CreateTargetQueryPage />,
          },
          {
            path: `${RoutePath.TargetQueryDetail}/:id`,
            element: <EditTargetQueryPage />,
          },
        ],
      },
      {
        path: RoutePath.AlimtalkTemplate,
        children: [
          {
            path: RoutePath.AlimtalkTemplateList,
            element: <AlimtalkTemplateListPage />,
          },
          {
            path: `${RoutePath.AlimtalkTemplateDetail}/:profile/:templateCode`,
            element: <AlimtalkTemplateDetailPage />,
          },
        ],
      },
      {
        path: RoutePath.FriendtalkTemplate,
        children: [
          {
            path: RoutePath.FriendtalkTemplateList,
            element: <FriendtalkTemplateListPage />,
          },
          {
            path: `${RoutePath.FriendtalkTemplateDetail}/:templateCode`,
            element: <FriendtalkTemplateDetailPage />,
          },
          {
            path: `${RoutePath.CreateFriendtalkTemplate}`,
            element: <CreateFriendtalkTemplatePage />,
          },
          {
            path: `${RoutePath.CopyFriendtalkTemplate}/:templateCode`,
            element: <CopyFriendtalkTemplatePage />,
          },
        ],
      },
      {
        path: RoutePath.FriendtalkTemplateImage,
        children: [
          {
            path: RoutePath.FriendtalkTemplateImageList,
            element: <FriendtalkTemplateImagePage />,
          },
          {
            path: RoutePath.UploadFriendtalkTemplateImage,
            element: <UploadFriendtalkTemplateImagePage />,
          },
        ],
      },
      {
        path: RoutePath.PushTemplate,
        children: [
          {
            path: RoutePath.PushTemplateList,
            element: <PushTemplateListPage />,
          },
          {
            path: `${RoutePath.CopyPushTemplate}/:templateCode`,
            element: <CopyPushTemplatePage />,
          },
          {
            path: RoutePath.CreatePushTemplate,
            element: <CreatePushTemplatePage />,
          },
          {
            path: `${RoutePath.PushTemplateDetail}/:templateCode`,
            element: <PushTemplateDetailPage />,
          },
        ],
      },
      {
        path: RoutePath.AlimlistTemplate,
        children: [
          {
            path: RoutePath.AlimlistTemplateList,
            element: <AlimlistTemplateListPage />,
          },
          {
            path: RoutePath.CreateAlimlistTemplate,
            element: <CreateAlimlistTemplatePage />,
          },
          {
            path: `${RoutePath.CopyAlimlistTemplate}/:templateCode`,
            element: <CopyAlimlistTemplatePage />,
          },
          {
            path: `${RoutePath.AlimlistTemplateDetail}/:templateCode`,
            element: <AlimlistTemplateDetailPage />,
          },
        ],
      },
      {
        path: RoutePath.CdnAsset,
        children: [
          {
            path: RoutePath.CdnAssetList,
            element: <CdnAssetListPage />,
          },
          {
            path: RoutePath.UploadCdnAsset,
            element: <UploadCdnAssetPage />,
          },
        ],
      },
      {
        path: RoutePath.Tester,
        children: [
          {
            path: RoutePath.TesterList,
            element: <TestersListPage />,
          },
          {
            path: RoutePath.RegisterTester,
            element: <RegisterTesterPage />,
          },
          {
            path: `${RoutePath.EditTester}/:id`,
            element: <EditTesterPage />,
          },
        ],
      },
      {
        path: RoutePath.BasicParameter,
        children: [
          {
            path: RoutePath.BasicParameterList,
            element: <BasicParameterListPage />,
          },
          {
            path: RoutePath.CreateBasicParameter,
            element: <CreateBasicParameterPage />,
          },
          {
            path: `${RoutePath.EditBasicParameter}/:id`,
            element: <EditBasicParameterPage />,
          },
        ],
      },
      {
        path: RoutePath.AutoParameter,
        children: [
          {
            path: RoutePath.AutoParameterList,
            element: <AutoParameterListPage />,
          },
        ],
      },
      {
        path: RoutePath.PersonalParameter,
        children: [
          {
            path: RoutePath.PersonalParameterList,
            element: <PersonalParameterListPage />,
          },
        ],
      },
      {
        path: RoutePath.SMS,
        children: [
          {
            path: RoutePath.SMSList,
            element: <SMSListPage />,
          },
          {
            path: RoutePath.EditSMS,
            element: <EditSMSPage />,
          },
        ],
      },
    ],
  },
  {
    path: RoutePath.Logout,
    element: <LogoutPage />,
  },
  { path: '*', element: <NotFoundPage /> },
])
