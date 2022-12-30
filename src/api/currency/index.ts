import { defHttp } from '/@/utils/http/axios';

enum Api {
  CURRENCY_LIST = '/admin/currencies',
}

export const getCurrencyList = (params: any) =>
  defHttp.get<any>({ url: Api.CURRENCY_LIST, params });

export const getCurrencyInfo = (id: any) => defHttp.get<any>({ url: Api.CURRENCY_LIST + '/' + id });

export const addCurrency = (items: Array<any>) =>
  defHttp.post({ url: Api.CURRENCY_LIST, params: { items } });

export const editCurrency = (id: any, params: any) =>
  defHttp.put<any>({ url: Api.CURRENCY_LIST + '/' + id, params });

export const delCurrency = (id: any) => defHttp.delete<any>({ url: Api.CURRENCY_LIST + '/' + id });

export const delCurrencies = (id: any) =>
  defHttp.delete<any>(
    { url: Api.CURRENCY_LIST + '/', params: { ids: id } },
    { joinParamsToUrl: true },
  );
