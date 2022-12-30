import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const dashboard: AppRouteModule = {
  path: '/auth',
  name: 'auth',
  component: LAYOUT,
  redirect: '/auth/userAuth',
  meta: {
    orderNo: 8,
    icon: 'ion:grid-outline',
    title: '权限配置',
    roles: [RoleEnum.ADMIN],
  },
  children: [
    {
      path: 'userAuth',
      name: 'userAuth',
      component: () => import('/@/views/auth/userAuth.vue'),
      meta: {
        // affix: true,
        title: '用户权限',
      },
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('/@/views/auth/role.vue'),
      meta: {
        // affix: true,
        title: '用户角色',
        hideMenu: true,
      },
    },
    {
      path: 'authority',
      name: 'authority',
      component: () => import('/@/views/auth/authority.vue'),
      meta: {
        // affix: true,
        title: '角色权限',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
