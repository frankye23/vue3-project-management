/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  account: string;
  password: string;
  type: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  email: string;
  have_pay_password: number;
  have_totp_auth: number;
  lang: string;
  last_login_time: string;
  phone: string;
  phone_code: string;
  refer_code: string;
  register_ip: string;
  roles: RoleInfo[];
  seconde_login: number;
  timezone: string;
  uid: string;
  verfied_email: number;
  verfied_phone: number;
}
