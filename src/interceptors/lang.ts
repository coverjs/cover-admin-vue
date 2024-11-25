import type { Middleware } from 'onion-interceptor';

import { lang } from '@/locales';
import { assign, isEmpty } from 'lodash-es';

export const langInterceptor: Middleware = async function (ctx, next) {
  if (!isEmpty(lang.value)) {
    ctx.cfg!.headers = assign(ctx.cfg!.headers, {
      lang: lang.value,
    });
  }
  await next();
};
