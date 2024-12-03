import type { App, Plugin } from 'vue';

type SFCWithInstall<T> = T & Plugin;

export function withInstall<T>(comp: T) {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    const name = (comp as any).name || 'UnnamedComponent';

    // register component
    app.component(name, comp as SFCWithInstall<T>);
  };

  return comp as SFCWithInstall<T>;
}
