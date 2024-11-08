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

export interface AccountLoginVo {
  /** 登录成功后返回token */
  token: string;
}

export interface AccountLoginDto {
  /**
   * 账号
   * @example "admin"
   */
  username: string;
  /**
   * 密码
   * @example "admin"
   */
  password: string;
}

export interface CreateUserDto {
  /** 用户账号 */
  username: string;
  /** 密码 */
  password: string;
  /** 昵称 */
  nickname: string;
  /** 邮箱 */
  email: string;
  /** 角色id */
  roleId: number;
  /** 是否启用 */
  enable: boolean;
}

export interface RoleVo {
  /**
   * 角色id
   * @example 1
   */
  id: number;
  /**
   * 角色名称
   * @example "admin"
   */
  name: string;
  /**
   * 角色描述
   * @example "管理员"
   */
  description: string;
  /** 创建时间 */
  createdAt: string;
  /** 更新日期 */
  updatedAt: string;
}

export interface UserInfoVo {
  /** 账号 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 邮箱 */
  email: string;
  /** 角色 */
  role: RoleVo;
  /** 是否启用 */
  enable: boolean;
  /** 创建时间 */
  createdAt: string;
  /** 更新日期 */
  updatedAt: string;
}

export interface CreateRoleDto {
  /** 角色名 */
  name: string;
  /** 角色描述 */
  description: string;
}

export interface ProfileVo {
  /** 账号 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 邮箱 */
  email: string;
  /** 角色 */
  role: RoleVo;
  /** 是否启用 */
  enable: boolean;
  /** 创建时间 */
  createdAt: string;
  /** 更新日期 */
  updatedAt: string;
}

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
      const propertyContent: any[] =
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
 * @title Cover Admin Service
 * @version 1.0.0
 * @contact
 *
 * Coverjs后台服务端接口文档
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  upload = {
    /**
     * No description
     *
     * @tags 文件上传
     * @name UploadControllerUpload
     * @summary 单个文件上传接口示例
     * @request POST:/upload/file
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
        any,
        CommonResponseVo & {
          data?: string;
        }
      >({
        path: `/upload/file`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 文件上传
     * @name UploadControllerUploads
     * @summary 上传多个文件的示例
     * @request POST:/upload/files
     * @secure
     */
    uploadControllerUploads: (
      data: {
        files?: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        CommonResponseVo & {
          data?: string;
        }
      >({
        path: `/upload/files`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 文件上传
     * @name UploadControllerUploadMultipleFiles
     * @summary 根据字段名上传文件示例
     * @request POST:/upload/fields
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
      this.request<
        any,
        CommonResponseVo & {
          data?: string;
        }
      >({
        path: `/upload/fields`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags 授权
     * @name AuthControllerLogin
     * @summary 用户登录
     * @request POST:/auth
     */
    authControllerLogin: (data: AccountLoginDto, params: RequestParams = {}) =>
      this.request<
        any,
        CommonResponseVo & {
          data?: AccountLoginVo;
        }
      >({
        path: `/auth`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags 用户管理
     * @name UserControllerCreate
     * @summary 新建用户
     * @request POST:/user
     * @secure
     */
    userControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<any, CommonResponseVo>({
        path: `/user`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户管理
     * @name UserControllerFindList
     * @summary 获取用户列表
     * @request GET:/user
     * @secure
     */
    userControllerFindList: (
      query?: {
        /**
         * 当前页码
         * @min 1
         * @example 1
         */
        pageNum?: number;
        /**
         * 每页条数
         * @min 1
         * @example 10
         */
        pageSize?: number;
        /** 用户账号 */
        username?: string;
        /** 昵称 */
        nickname?: string;
        /** 邮箱 */
        email?: string;
        /** 角色id */
        roleId?: number;
        /** 是否启用 */
        enable?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        CommonResponseVo & {
          data?: {
            list: UserInfoVo[];
            /** @default 0 */
            total: number;
          };
        }
      >({
        path: `/user`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),
  };
  role = {
    /**
     * No description
     *
     * @tags 角色管理
     * @name RoleControllerCreate
     * @summary 新建角色
     * @request POST:/role
     * @secure
     */
    roleControllerCreate: (data: CreateRoleDto, params: RequestParams = {}) =>
      this.request<any, CommonResponseVo>({
        path: `/role`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 角色管理
     * @name RoleControllerFineList
     * @summary 获取角色列表
     * @request GET:/role
     * @secure
     */
    roleControllerFineList: (
      query?: {
        /**
         * 当前页码
         * @min 1
         * @example 1
         */
        pageNum?: number;
        /**
         * 每页条数
         * @min 1
         * @example 10
         */
        pageSize?: number;
        /** 角色名 */
        name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        CommonResponseVo & {
          data?: {
            list: RoleVo[];
            /** @default 0 */
            total: number;
          };
        }
      >({
        path: `/role`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),
  };
  profile = {
    /**
     * No description
     *
     * @tags 个人信息
     * @name ProfileControllerFindUserInfo
     * @summary 获取个人信息
     * @request GET:/profile
     * @secure
     */
    profileControllerFindUserInfo: (params: RequestParams = {}) =>
      this.request<
        any,
        CommonResponseVo & {
          data?: ProfileVo;
        }
      >({
        path: `/profile`,
        method: 'GET',
        secure: true,
        ...params,
      }),
  };
}
