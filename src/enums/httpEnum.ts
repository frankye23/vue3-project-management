/*
 * @Author: your name
 * @Date: 2022-02-28 17:13:39
 * @LastEditTime: 2022-04-12 14:44:07
 * @LastEditors: your name
 * @Description:
 * @FilePath: \apollo_backend\src\enums\httpEnum.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 1,
  TIMEOUT = 401,
  WRONG = 400,
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
