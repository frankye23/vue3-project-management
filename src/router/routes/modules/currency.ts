import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';

const dashboard: AppRouteModule = {
  path: '/currency',
  name: 'currency',
  component: LAYOUT,
  redirect: '/currency/list',
  meta: {
    orderNo: 6,
    icon: 'ion:grid-outline',
    title: t('routes.currency.info'),
    roles: [RoleEnum.EDITOR, RoleEnum.ADMIN],
  },
  children: [
    {
      path: 'list',
      name: 'CurrencyList',
      component: () => import('/@/views/currency/Currency.vue'),
      meta: {
        // affix: true,
        title: t('routes.currency.list'),
      },
    },
  ],
};

export default dashboard;
