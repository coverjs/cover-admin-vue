import { ContentType as _ContentType } from '@/services/api';

export const ContentTypeEnum = _ContentType;

export enum StatusEnum {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401, // -----------认证失败
  FORBIDDEN = 403, // --------------拒绝访问
  NOT_FOUND = 404, // --------------资源不存在
  TIMEOUT = 408, // ----------------请求超时
  LOGIN_OTHER_DEVICE = 409, // -----账号已在其他设备登录
  ROLE_UPDATED = 410, // -----------角色权限已更新
  INTERNAL_SERVER_ERRO = 500,
}
