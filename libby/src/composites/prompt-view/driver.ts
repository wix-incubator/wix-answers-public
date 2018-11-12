import { UniDriver } from 'unidriver';
import { promptViewKey } from '.';
import { ValidatedValueCompDriverCreator } from '../../todo-move-to-lib';
import { createFormInputDriver } from '../form-input/driver';

export type BasePromptViewDriver<T> = {
	title: () => Promise<string>,
	enterValue: (val: T) => Promise<void>,
	confirmText: () => Promise<string>,
	cancelText: () => Promise<string>,
	// placeholder: () => Promise<string>,
	value: () => Promise<T>,
	valid: () => Promise<boolean>;
	base: UniDriver
};

// tslint:disable-next-line:max-line-length
export const createBasePromptViewDriver = <T>(valueCompDriverCreator: ValidatedValueCompDriverCreator<T>) => (wrapper: UniDriver): BasePromptViewDriver<T> => {
	const base = wrapper.$(`.${promptViewKey}`);
	const valueCompDriver = valueCompDriverCreator(base);

	return {
		title: base.$('.title').text,
		enterValue: async (val) => {
			await valueCompDriver.set(val);
			await base.$('.enter').click();
		},
		value: valueCompDriver.value,
		confirmText: () => base.$('.enter').text(),
		cancelText: () => base.$('.cancel').text(),
		// placeholder: () => {
		// 	if (valueCompDriver.placeholder) {
		// 		return valueCompDriver.placeholder();
		// 	} else {
		// 		return Promise.resolve('n/a');
		// 	}
		// },
		valid: () => {
			const {valid} = valueCompDriver;
			return valid ? valid() : Promise.resolve(true);
		},
		base
	};
};

export const createPromptViewDriver = createBasePromptViewDriver(createFormInputDriver);
