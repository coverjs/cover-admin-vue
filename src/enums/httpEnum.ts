import { ContentType as _ContentType } from '@/services/api'

export const ContentTypeEnum = _ContentType

export enum StatusEnum {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TIMEOUT = 408,
  INTERNAL_SERVER_ERRO = 500,
}
