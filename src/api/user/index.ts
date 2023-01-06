import { defHttp } from '/@/utils/http/axios';

enum Api {
  USER_LIST = '/admin/users',
}

export const getUserList = (params: any) => defHttp.get<any>({ url: Api.USER_LIST, params });

export const addUser = (items: Array<any>) =>
  defHttp.post<Recordable[]>({ url: Api.USER_LIST, params: { items } });

export const delUsers = (id: any) =>
  defHttp.delete<any>({ url: Api.USER_LIST + '/', params: { ids: id } }, { joinParamsToUrl: true });

export const delUser = (id: any) => defHttp.delete<any>({ url: Api.USER_LIST + '/' + id });

export const editUser = (id: any, params: any) =>
  defHttp.put<any>({ url: Api.USER_LIST + '/' + id, params });

export const getUser = (id: any) => defHttp.get<any>({ url: Api.USER_LIST + '/' + id });
