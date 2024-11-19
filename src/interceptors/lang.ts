import type { Middleware } from 'onion-interceptor';

import { assign, isEmpty } from 'lodash-es';
import { lang } from '@/locales';

export const langInterceptor: Middleware = async function (ctx, next) {
  if (!isEmpty(lang.value)) {
    ctx.cfg!.headers = assign(ctx.cfg!.headers, {
      lang: lang.value,
    });
  }
  await next();
};
