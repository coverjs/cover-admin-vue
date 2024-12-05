import type { InjectionKey } from 'vue';
import type { GlobalConfig } from './types';

export const CONFIG_CTX_KEY: InjectionKey<GlobalConfig> = Symbol('CONFIG_CTX_KEY');
