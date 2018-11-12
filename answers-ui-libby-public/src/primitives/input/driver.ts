import { UniDriver } from 'unidriver';
import { inputKey } from './input';

export type InputDriver = {
	value: () => Promise<string>,
	enterValue: (value: string) => Promise<void>,
	set: (value: string) => Promise<void>,
	pressEnter: () => Promise<void>;
	disabled: () => Promise<boolean>,
	readOnly: () => Promise<boolean>,
	valid: () => Promise<boolean>,
	errorMsg: () => Promise<string>;
	placeholder: () => Promise<string>;
};

export const createInputDriver = (wrapper: UniDriver): InputDriver => {
	const input = wrapper.$(`.${inputKey}`);

	const inputField = input.$('.input-field');

	return {
		value: async () => {
			return inputField.value();
		},
		set: (value) => inputField.enterValue(value),
		enterValue: (value: string) => {
			return inputField.enterValue(value);
		},
		pressEnter: async () => {
			throw new Error('not implemented');
		},
		disabled: async () => {
			const dis = await inputField.attr('disabled');
			return !!dis;
		},
		readOnly: async () => {
			const val = await inputField.attr('readonly');
			return !!val;
		},
		valid: async () => {
			return inputField.hasClass('.invalid');
		},
		errorMsg: async () => {
			return input.$('.validation-error').text();
		},
		placeholder: async () => {
			return inputField.attr('placeholder');
		}
	};
};
