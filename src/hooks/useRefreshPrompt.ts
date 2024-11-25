import { useRegisterSW } from 'virtual:pwa-register/vue';
import { Button } from 'ant-design-vue';
import { TimeEnum } from '@/enums';

import useMessage from './useMessage';

export function useRefreshPrompt(
	pollingInterval: number = TimeEnum.LONG_POLLING_INTERVAL,
) {
	const { createNotify } = useMessage();
	const { t } = useI18n();
	const { updateServiceWorker } = useRegisterSW({
		onNeedRefresh() {
			createNotify.info({
				key: 'refresh_prompt',
				message: t('widgets.checkUpdatesTitle'),
				description: t('widgets.checkUpdatesDescription'),
				placement: 'bottomRight',
				duration: 0,
				btn: h(
					Button,
					{
						type: 'primary',
						onClick: async () => {
							await updateServiceWorker(true);
						},
					},
					t('common.refresh'),
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
