import { defHttp } from '/@/utils/http/axios';

export const getAuthList = (role: any) => defHttp.get<any>({ url: '/admin/authorities/' + role });

export const addAuth = (items: any) =>
  defHttp.post<any>({ url: '/admin/authorities', data: { items } });

export const deleteAuth = (items: any) =>
  defHttp.post<any>({ url: '/admin/authorities/delete', data: { items } });

export const getRoleList = (params: any) => defHttp.get<any>({ url: '/admin/roles', params });

export const addRole = (name: any, items: any) =>
  defHttp.post<any>({ url: '/admin/roles/' + name + '/users', data: { items } });

export const getRoleByUser = (role: any, params: any) =>
  defHttp.get<any>({ url: '/admin/roles/' + role + '/users', params });

export const deleteRole = (role: any, items: any) =>
  defHttp.post<any>({ url: '/admin/roles/' + role + '/users/delete', data: { items } });
