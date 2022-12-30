import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';

const dashboard: AppRouteModule = {
  path: '/user',
  name: 'user',
  component: LAYOUT,
  redirect: '/user/list',
  meta: {
    orderNo: 7,
    icon: 'ion:grid-outline',
    title: t('routes.user.user'),
    roles: [RoleEnum.EDITOR, RoleEnum.ADMIN],
  },
  children: [
    {
      path: 'List',
      name: 'userList',
      component: () => import('/@/views/user/UserList.vue'),
      meta: {
        // affix: true,
        title: t('routes.user.userDetail'),
      },
    },
    {
      path: ':id',
      name: 'userInfo',
      component: () => import('/@/views/user/UserInfo.vue'),
      meta: {
        title: t('routes.user.userInfo'),
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
