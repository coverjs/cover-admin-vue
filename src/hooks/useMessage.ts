import type { ModalFuncProps } from 'ant-design-vue/lib/modal/Modal';
import { Modal, message, notification } from 'ant-design-vue';

import {
	InfoCircleFilled,
	CheckCircleFilled,
	CloseCircleFilled,
} from '@ant-design/icons-vue';

export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
	iconType: 'warning' | 'success' | 'error' | 'info';
}
export type ModalOptionsPartial = Partial<ModalOptionsEx> &
	Pick<ModalOptionsEx, 'content'>;

const iconMap = new Map([
	['warning', h(InfoCircleFilled, { class: 'modal-icon-warning' })],
	['success', h(CheckCircleFilled, { class: 'modal-icon-success' })],
	['info', h(InfoCircleFilled, { class: 'modal-icon-info' })],
	['error', h(CloseCircleFilled, { class: 'modal-icon-error' })],
]);
function getIcon(iconType: string) {
	return (
		iconMap.get(iconType) ?? h(InfoCircleFilled, { class: 'modal-icon-info' })
	);
}

/**
 * @description: Create confirmation box
 */
function createConfirm(options: ModalOptionsEx) {
	const iconType = options.iconType || 'warning';
	Reflect.deleteProperty(options, 'iconType');
	const opt: ModalFuncProps = {
		centered: true,
		icon: getIcon(iconType),
		...options,
		content: options.content,
	};
	return Modal.confirm(opt);
}

const getBaseOptions = () => {
	const { t } = useI18n();
	return {
		okText: t('common.confirm'),
		centered: true,
	};
};

function createModalOptions(
	options: ModalOptionsPartial,
	icon: string,
): ModalOptionsPartial {
	return {
		...getBaseOptions(),
		...options,
		content: options.content,
		icon: getIcon(icon),
	};
}

function createSuccessModal(options: ModalOptionsPartial) {
	return Modal.success(createModalOptions(options, 'success'));
}

function createErrorModal(options: ModalOptionsPartial) {
	return Modal.error(createModalOptions(options, 'error'));
}

function createInfoModal(options: ModalOptionsPartial) {
	return Modal.info(createModalOptions(options, 'info'));
}

function createWarningModal(options: ModalOptionsPartial) {
	return Modal.warning(createModalOptions(options, 'warning'));
}

notification.config({
	placement: 'topRight',
	duration: 3,
});

/**
 * @description: message
 */
export function useMessage() {
	return {
		createMessage: message,
		createNotify: notification,
		createConfirm,
		createSuccessModal,
		createErrorModal,
		createInfoModal,
		createWarningModal,
	};
}

export default useMessage;
