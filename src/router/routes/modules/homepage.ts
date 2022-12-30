import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/homepage',
  name: 'homepage',
  component: LAYOUT,
  redirect: '/homepage/banner',
  meta: {
    orderNo: 2,
    icon: 'ion:grid-outline',
    title: t('routes.homepage.homepage'),
  },
  children: [
    {
      path: 'bannner',
      name: 'Banner',
      component: () => import('/@/views/homepage/banner/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.homepage.banner'),
      },
    },
    {
      path: 'recommend',
      name: 'recommend',
      component: () => import('/@/views/homepage/recommend/index.vue'),
      meta: {
        title: t('routes.homepage.recommend'),
      },
    },
  ],
};

export default dashboard;
