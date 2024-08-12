import { useRegisterSW } from "virtual:pwa-register/vue";
import { notification, Button } from "ant-design-vue";

export function useRefreshPrompt(pollingInterval: number = 10000) {
  const { updateServiceWorker } = useRegisterSW({
    onNeedRefresh() {
      notification.info({
        message: "new version",
        description: "New content available, click on reload button to update.",
        placement: "bottomRight",
        duration: 0,
        btn: h(
          Button,
          {
            type: "primary",
            onClick: async () => {
              await updateServiceWorker(true);
            },
          },
          "Reload"
        ),
      });
    },
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, pollingInterval);
    },
  });
}

export default useRefreshPrompt;
