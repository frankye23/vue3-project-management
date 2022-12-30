/*
 * @Author: your name
 * @Date: 2022-04-08 13:48:42
 * @LastEditTime: 2022-04-25 14:35:30
 * @LastEditors: your name
 * @Description:
 * @FilePath: \apollo_backend\src\api\user\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
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
