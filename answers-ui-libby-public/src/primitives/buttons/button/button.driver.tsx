import { createBaseButtonDriver, ButtonDriver } from '../base-button/base-button.driver';

export const createButtonDriver = (wrapper: Element): ButtonDriver => {
	return createBaseButtonDriver(wrapper, 'default');
};

export const createHollowButtonDriver = (wrapper: Element): ButtonDriver => {
	return createBaseButtonDriver(wrapper, 'default', true);
};

export const createPositiveButtonDriver = (wrapper: Element): ButtonDriver => {
	return createBaseButtonDriver(wrapper, 'positive');
};

export const createHollowPositiveButtonDriver = (wrapper: Element): ButtonDriver => {
	return createBaseButtonDriver(wrapper, 'positive', true);
};

export const createAttentionButtonDriver = (wrapper: Element): ButtonDriver => {
	return createBaseButtonDriver(wrapper, 'attention');
};

export const createHollowAttentionButtonDriver = (wrapper: Element): ButtonDriver => {
	return createBaseButtonDriver(wrapper, 'attention', true);
};

export const createDangerButtonDriver = (wrapper: Element): ButtonDriver => {
	return createBaseButtonDriver(wrapper, 'danger');
};

export const createHollowDangerButtonDriver = (wrapper: Element): ButtonDriver => {
	return createBaseButtonDriver(wrapper, 'danger', true);
};

export const createrPemiumButtonDriver = (wrapper: Element): ButtonDriver => {
	return createBaseButtonDriver(wrapper, 'premium');
};

export const createrHollowPemiumButtonDriver = (wrapper: Element): ButtonDriver => {
	return createBaseButtonDriver(wrapper, 'premium', true);
};
