// .env.development
// VITE_PROXY=[["/basic-api","http://localhost:3000"]]
// VITE_GLOB_API_URL=/basic-api

import { defHttp } from '/@/utils/http/axios';

enum Api {
  PRODUCT_LIST = '/admin/products',
  ADD_PRODUCT = '/admin/products',
  DELETE_PRODUCT = '/admin/products/',
  EDIT_PRODUCT = '/admin/products',
}

/**
 * @description: Get sample options value
 */
export const getProductList = (params: any) => defHttp.get<any>({ url: Api.PRODUCT_LIST, params });

export const getProductDetail = (id: any) => defHttp.get<any>({ url: Api.PRODUCT_LIST + '/' + id });

export const getProductHistory = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.PRODUCT_LIST + '/' + id + '/histories', params });

export const editProductHistory = (id: any, data: any) =>
  defHttp.put<any>({ url: Api.PRODUCT_LIST + '/' + id + '/histories', data });

export const addProduct = (items: Array<any>) =>
  defHttp.post<Recordable[]>({ url: Api.ADD_PRODUCT, params: { items } });

export const editProduct = (id: any, params: any) =>
  defHttp.put<any>({ url: Api.EDIT_PRODUCT + '/' + id, params });

// export const clearProduct = (id: any) => defHttp.delete<any>({ url: Api.DELETE_PRODUCT, { params } });
export const clearProduct = (id: any) =>
  defHttp.delete<any>({ url: Api.DELETE_PRODUCT, params: { ids: id } }, { joinParamsToUrl: true });

export const deleteProduct = (id: any) => defHttp.delete<any>({ url: Api.DELETE_PRODUCT + id });

export const getProductDescription = (id: any, params: any) =>
  defHttp.get<any>({ url: '/admin/products/' + id + '/descriptions', params });

export const addProductDescription = (id: any, items: any) =>
  defHttp.post<any>({ url: '/admin/products/' + id + '/descriptions', params: { items } });

export const deleteDesc = (id: any, descId: any) =>
  defHttp.delete<any>({ url: '/admin/products/' + id + '/descriptions/' + descId });

// export const clearDesc = (id: any, descId: any) =>
//   defHttp.delete<any>({ url: '/admin/products/' + id + '/descriptions' + '?ids=' + descId });

export const editProductDescription = (id: any, descId: any, params: any) =>
  defHttp.put<any>({ url: '/admin/products/' + id + '/descriptions/' + descId, params });

export const getAttrList = (params: any) =>
  defHttp.get<any>({ url: '/admin/products/attrs', params });

export const addAttr = (items: Array<any>) =>
  defHttp.post<Recordable[]>({ url: '/admin/products/attrs', params: { items } });

export const deleteAttr = (id: any) => defHttp.delete<any>({ url: '/admin/products/attrs/' + id });

export const editAttr = (id: any, params: any) =>
  defHttp.put<any>({ url: '/admin/products/attrs/' + id, params });
