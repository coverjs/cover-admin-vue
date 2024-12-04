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

export interface UpdateProfileDto {
  /** 昵称 */
  nickname?: string;
  /** 邮箱 */
  email?: string;
}

export interface UpdatePasswordDto {
  /** 旧密码 */
  oldPassword: string;
  /** 新密码 */
  newPassword: string;
}

export interface MenuVo {
  /**
   * id
   * @example 1
   */
  id: number;
  /**
   * 名称
   * @example "首页"
   */
  name: string;
  /** 国际化 */
  locale?: string;
  /**
   * 图标
   * @example "FileOutlined"
   */
  icon?: string;
  /** 权限编码 */
  code: string;
  /**
   * 父级id
   * @example 1
   */
  parentId?: number;
  /** 子菜单 */
  children?: MenuVo[];
  /**
   * 排序
   * @example 1
   */
  sort: number;
  /** 页面路径 */
  path: string;
  /** 节点类型 */
  type: "DIRECTORY" | "MENU" | "ACTION";
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
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
  /** 为该角色赋予权限的菜单id列表 */
  menuIds: number[];
}

export interface UpdateRoleDto {
  /** 角色名 */
  name?: string;
  /** 角色描述 */
  description?: string;
  /** 为该角色赋予权限的菜单id列表 */
  menuIds?: number[];
}

export interface CreateMenuDto {
  /**
   * 名称
   * @example "首页"
   */
  name: string;
  /** 国际化 */
  locale?: string;
  /**
   * 图标
   * @example "FileOutlined"
   */
  icon?: string;
  /**
   * 权限码
   * @example "home"
   */
  code: string;
  /**
   * 父级菜单id
   * @example 1
   */
  parentId?: number;
  /**
   * 排序
   * @example 1
   */
  sort: number;
  /**
   * 页面路径
   * @example "/home"
   */
  path?: string;
  /**
   * 节点类型, "DIRECTORY": 目录; "MENU": 菜单; "ACTION": 操作
   * @default "DIRECTORY"
   * @example "DIRECTORY"
   */
  type: "DIRECTORY" | "MENU" | "ACTION";
}

export interface UpdateMenuDto {
  /**
   * 名称
   * @example "首页"
   */
  name: string;
  /** 国际化 */
  locale?: string;
  /**
   * 图标
   * @example "FileOutlined"
   */
  icon?: string;
  /**
   * 权限码
   * @example "home"
   */
  code: string;
  /**
   * 父级菜单id, 需要移除时传null
   * @example 1
   */
  parentId?: number;
  /**
   * 排序
   * @example 1
   */
  sort: number;
  /**
   * 页面路径
   * @example "/home"
   */
  path?: string;
  /**
   * 节点类型, "DIRECTORY": 目录; "MENU": 菜单; "ACTION": 操作
   * @default "DIRECTORY"
   * @example "DIRECTORY"
   */
  type: "DIRECTORY" | "MENU" | "ACTION";
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

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";
import type { CustomRequestOptions } from "../types";

export type QueryParamsType = Record<string | number, any>;

export interface CustromRequestParams {
  customOptions?: CustomRequestOptions;
}

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
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

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path"> & CustromRequestParams;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
  customOptions?: CustromRequestParams["customOptions"];
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
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
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
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
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
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
 * @termsOfService https://github.com/coverjs
 * @contact
 *
 * Coverjs后台服务端接口文档
 *
 * 推荐使用<a href="https://apifox.com/apidoc/shared-0995dfb9-d5c1-49d1-a153-4bc5574445bc/">Apifox</a>查看更友好的接口文档
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags 授权
     * @name AuthLogin
     * @summary 用户登录
     * @request POST:/auth/login
     */
    authLogin: (data: AccountLoginDto, params: RequestParams = {}) =>
      this.request<
        any,
        CommonResponseVo & {
          data?: AccountLoginVo;
        }
      >({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 授权
     * @name AuthLogout
     * @summary 退出登录
     * @request POST:/auth/logout
     * @secure
     */
    authLogout: (params: RequestParams = {}) =>
      this.request<any, CommonResponseVo>({
        path: `/auth/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  profile = {
    /**
     * No description
     *
     * @tags 个人信息
     * @name ProfileFindUserInfo
     * @summary 获取当前用户信息
     * @request GET:/profile
     * @secure
     */
    profileFindUserInfo: (params: RequestParams = {}) =>
      this.request<
        any,
        CommonResponseVo & {
          data?: ProfileVo;
        }
      >({
        path: `/profile`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 个人信息
     * @name ProfileUpdateUserInfo
     * @summary 修改当前登录用户信息
     * @request PATCH:/profile/update
     * @secure
     */
    profileUpdateUserInfo: (data: UpdateProfileDto, params: RequestParams = {}) =>
      this.request<any, CommonResponseVo>({
        path: `/profile/update`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 个人信息
     * @name ProfileUpdatePassword
     * @summary 修改密码
     * @request PATCH:/profile/updatePassword
     * @secure
     */
    profileUpdatePassword: (data: UpdatePasswordDto, params: RequestParams = {}) =>
      this.request<any, CommonResponseVo>({
        path: `/profile/updatePassword`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 个人信息
     * @name ProfileGetMenus
     * @summary 获取当前用户菜单
     * @request GET:/profile/menus
     * @secure
     */
    profileGetMenus: (params: RequestParams = {}) =>
      this.request<
        any,
        CommonResponseVo & {
          data?: MenuVo[];
        }
      >({
        path: `/profile/menus`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  system = {
    /**
     * @description [ 权限码：system:user:add ]
     *
     * @tags 系统管理-用户管理
     * @name UserCreate
     * @summary 新建用户
     * @request POST:/system/user
     * @secure
     */
    userCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<any, CommonResponseVo>({
        path: `/system/user`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description [ 权限码：system:user:list ]
     *
     * @tags 系统管理-用户管理
     * @name UserFindList
     * @summary 获取用户列表
     * @request GET:/system/user
     * @secure
     */
    userFindList: (
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
          data?: UserInfoVo[];
        }
      >({
        path: `/system/user`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description [ 权限码：system:role:add ]
     *
     * @tags 系统管理-角色管理
     * @name RoleCreate
     * @summary 创建角色
     * @request POST:/system/role
     * @secure
     */
    roleCreate: (data: CreateRoleDto, params: RequestParams = {}) =>
      this.request<any, CommonResponseVo>({
        path: `/system/role`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description [ 权限码：system:role:list ]
     *
     * @tags 系统管理-角色管理
     * @name RoleFineList
     * @summary 获取角色列表
     * @request GET:/system/role
     * @secure
     */
    roleFineList: (
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
          data?: RoleVo[];
        }
      >({
        path: `/system/role`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description [ 权限码：system:role:delete ]
     *
     * @tags 系统管理-角色管理
     * @name RoleRemove
     * @summary 删除角色
     * @request DELETE:/system/role/{id}
     * @secure
     */
    roleRemove: (id: number, params: RequestParams = {}) =>
      this.request<any, CommonResponseVo>({
        path: `/system/role/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description [ 权限码：system:role:update ]
     *
     * @tags 系统管理-角色管理
     * @name RoleUpdate
     * @summary 修改角色
     * @request PATCH:/system/role/{id}
     * @secure
     */
    roleUpdate: (id: number, data: UpdateRoleDto, params: RequestParams = {}) =>
      this.request<any, CommonResponseVo>({
        path: `/system/role/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 创建菜单 [ 权限码：system:menu:add ]
     *
     * @tags 系统管理-菜单管理
     * @name MenuCreate
     * @summary 新建菜单
     * @request POST:/system/menu
     * @secure
     */
    menuCreate: (data: CreateMenuDto, params: RequestParams = {}) =>
      this.request<any, CommonResponseVo>({
        path: `/system/menu`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取菜单列表数据 [ 权限码：system:menu:list ]
     *
     * @tags 系统管理-菜单管理
     * @name MenuFindList
     * @summary 查询菜单列表
     * @request GET:/system/menu
     * @secure
     */
    menuFindList: (params: RequestParams = {}) =>
      this.request<
        any,
        CommonResponseVo & {
          data?: MenuVo[];
        }
      >({
        path: `/system/menu`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 系统管理-菜单管理
     * @name MenuUpdate
     * @summary 修改菜单
     * @request PATCH:/system/menu/{id}
     * @secure
     */
    menuUpdate: (id: number, data: UpdateMenuDto, params: RequestParams = {}) =>
      this.request<any, CommonResponseVo>({
        path: `/system/menu/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  upload = {
    /**
     * No description
     *
     * @tags 文件上传
     * @name UploadUpload
     * @summary 单个文件上传接口示例
     * @request POST:/upload/file
     */
    uploadUpload: (
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
        method: "POST",
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 文件上传
     * @name UploadUploads
     * @summary 上传多个文件的示例
     * @request POST:/upload/files
     */
    uploadUploads: (
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
        method: "POST",
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 文件上传
     * @name UploadUploadMultipleFiles
     * @summary 根据字段名上传文件示例
     * @request POST:/upload/fields
     */
    uploadUploadMultipleFiles: (
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
        method: "POST",
        body: data,
        type: ContentType.FormData,
        ...params,
      }),
  };
}
