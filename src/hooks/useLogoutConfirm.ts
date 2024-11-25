import type { ShallowReactive } from 'vue';
import { useMessage } from '.';
import { useUserStore } from '@/store';
import { TimeEnum } from '@/enums';
import { t } from '@/locales';

const { createConfirm } = useMessage();
const modal: ShallowReactive<{
	visible: boolean;
	instance: ReturnType<typeof createConfirm> | void;
}> = shallowReactive({
	visible: false,
	instance: void 0,
});
export function useLogoutConfirm(mode: 'auto' | 'manual' = 'manual') {
	const userStore = useUserStore();
	const isManual = mode === 'manual';

	const titleKey = isManual
		? 'common.prompt'
		: 'authentication.loginAgainTitle';
	const contentKey = isManual
		? 'widgets.logoutTip'
		: 'authentication.loginAgainSubTitle';

	const onConfirm = () => {
		modal.visible = false;
		userStore?.logout(isManual); // 被动登出 不用调用接口
		modal.instance?.destroy();
	};

	const { start: showModal } = useTimeoutFn(
		// 让动画更丝滑
		() => {
			if (!userStore.getToken || modal.visible) return;

			modal.visible = true;
			let secondsToGo = 5;
			modal.instance = createConfirm({
				title: t(titleKey),
				content: t(contentKey),
				iconType: 'warning',
				okText: !isManual ? `${t('common.confirm')}(${secondsToGo})` : void 0,
				onOk: onConfirm,
				onCancel: () => (modal.visible = false),
			});

			if (isManual) return;

			const interval = setInterval(() => {
				secondsToGo--;
				modal.instance?.update({
					okText: `${t('common.confirm')}(${secondsToGo})`,
				});
				if (secondsToGo > 0) return;
				modal.visible && onConfirm();
				clearInterval(interval);
			}, TimeEnum.SECOND);
		},
		200,
		{ immediate: false },
	);

	return showModal;
}

export default useLogoutConfirm;
