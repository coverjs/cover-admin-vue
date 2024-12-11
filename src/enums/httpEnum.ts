import { ContentType as _ContentType } from '@/services/api';

export const ContentTypeEnum = _ContentType;

export enum StatusEnum {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TIMEOUT = 408,
  LOGIN_OTHER_DEVICE = 409,
  INTERNAL_SERVER_ERRO = 500,
}
