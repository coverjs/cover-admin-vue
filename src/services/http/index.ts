/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUserDto {
  /**
   * 用户名
   * @example "admin"
   */
  username: string;
  /**
   * 密码
   * @example "admin"
   */
  password: string;
  /**
   * 邮箱
   * @example "admin@admin.com"
   */
  email: string;
  /**
   * 角色id
   * @example 1
   */
  roleId: number;
  /**
   * 昵称
   * @example "admin"
   */
  nickname: string;
}

export interface AccountLoginVo {
  /** token */
  token: string;
}

export interface AccountLoginDto {
  /**
   * 用户名
   * @example "admin"
   */
  username: string;
  /**
   * 密码
   * @example "admin"
   */
  password: string;
  /**
   * 登录类型
   * @example "account"
   */
  type: 'account' | 'mobile';
}

export interface CreateRoleDto {
  /**
   * 角色名
   * @example "admin"
   */
  name: string;
  /**
   * 角色描述
   * @example "管理员权限"
   */
  desricption?: string;
}

export type QueryRoleDto = object;

export interface CommonResponseVo {
  /**
   * 响应状态码
   * @default 0
   */
  code: number;
  /**
   * 响应信息
   * @default "ok"
   */
  msg: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';
import type CustomOptions from '../types';

export type QueryParamsType = Record<string | number, any>;

export interface CustromRequestParams {
  customOptions?: CustomOptions;
}

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
> &
  CustromRequestParams;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
  customOptions?: CustromRequestParams['customOptions'];
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: unknown[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Cover Admin
 * @version 1.0.0
 * @license MIT
 * @contact
 *
 * Cover Admin 接口文档
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags 用户管理
     * @name UserControllerCreate
     * @summary 创建用户
     * @request POST:/api/user/create
     * @secure
     */
    userControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<CommonResponseVo, any>({
        path: `/api/user/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 账号管理
     * @name AccountControllerLogin
     * @summary 登录
     * @request POST:/api/account/login
     */
    accountControllerLogin: (
      data: AccountLoginDto,
      params: RequestParams = {},
    ) =>
      this.request<
        CommonResponseVo & {
          data?: AccountLoginVo;
        },
        any
      >({
        path: `/api/account/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 账号管理
     * @name AccountControllerGetCurrentUser
     * @summary 获取当前用户信息
     * @request GET:/api/account/current
     * @secure
     */
    accountControllerGetCurrentUser: (params: RequestParams = {}) =>
      this.request<CommonResponseVo, any>({
        path: `/api/account/current`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色管理
     * @name RoleControllerCreate
     * @summary 创建角色
     * @request POST:/api/role
     * @secure
     */
    roleControllerCreate: (data: CreateRoleDto, params: RequestParams = {}) =>
      this.request<CommonResponseVo, any>({
        path: `/api/role`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色管理
     * @name RoleControllerFindAll
     * @summary 查询所有角色
     * @request GET:/api/role
     * @secure
     */
    roleControllerFindAll: (data: QueryRoleDto, params: RequestParams = {}) =>
      this.request<CommonResponseVo, any>({
        path: `/api/role`,
        method: 'GET',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色管理
     * @name RoleControllerFindOne
     * @summary 查询单个角色
     * @request GET:/api/role/{id}
     * @secure
     */
    roleControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<CommonResponseVo, any>({
        path: `/api/role/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色管理
     * @name RoleControllerRemove
     * @summary 删除角色
     * @request DELETE:/api/role/{id}
     * @secure
     */
    roleControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<CommonResponseVo, any>({
        path: `/api/role/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 上传
     * @name UploadControllerUpload
     * @summary 上传单个文件的示例
     * @request POST:/api/upload/file
     * @secure
     */
    uploadControllerUpload: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CommonResponseVo & {
          data?: string;
        },
        any
      >({
        path: `/api/upload/file`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 上传
     * @name UploadControllerUploads
     * @summary 上传多个文件的示例
     * @request POST:/api/upload/files
     * @secure
     */
    uploadControllerUploads: (
      data: {
        files?: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CommonResponseVo & {
          data?: string;
        },
        any
      >({
        path: `/api/upload/files`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 上传
     * @name UploadControllerUploadMultipleFiles
     * @summary 按字段上传文件的示例
     * @request POST:/api/upload/fields
     * @secure
     */
    uploadControllerUploadMultipleFiles: (
      data: {
        /** @format binary */
        avatar?: File;
        /** @format binary */
        background?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommonResponseVo, any>({
        path: `/api/upload/fields`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),
  };
}
