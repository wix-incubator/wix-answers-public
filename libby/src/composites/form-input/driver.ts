import { UniDriver } from 'unidriver';
import { createInputDriver } from '../../primitives/drivers';

export type FormInputDriver = {
	value: () => Promise<string>;
	set: (value: string) => Promise<void>;
	pressEnter: () => Promise<void>;
	isDisabled: () => Promise<boolean>;
	isReadOnly: () => Promise<boolean>;
	valid: () => Promise<boolean>;
	getValidationMessage: () => Promise<string>;
	placeholder: () => Promise<string>;
	getLabel: () => Promise<string>;
};

export const createFormInputDriver = (wrapper: UniDriver): FormInputDriver => {

	const baseDriver = wrapper.$('.form-input');
	const inputDriver = createInputDriver(wrapper);

	return {
		value: () => inputDriver.value(),
		set: (value: string) => inputDriver.enterValue(value),
		pressEnter: () => inputDriver.pressEnter(),
		isDisabled: () => inputDriver.disabled(),
		isReadOnly: () => inputDriver.readOnly(),
		valid: async () => !(await baseDriver.hasClass('invalid')),
		placeholder: () => inputDriver.placeholder(),
		getValidationMessage: async () => {
			return (await baseDriver.$('.validation-msg').exists()) ?
				baseDriver.$('.validation-msg').text() : '';
		},
		getLabel: () => baseDriver.$('.label-text').text()
	};
};
