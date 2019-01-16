import { UniDriver } from 'unidriver';
import { FormControlKey } from './';

export type FormControlDriver = {
	label: () => Promise<string>;
	hasError: () => Promise<boolean>;
	errorMessage: () => Promise<string>;
	base: UniDriver
};

export const createFormControlDriver = (wrapper: UniDriver): FormControlDriver => {
	const base = wrapper.$(`.${FormControlKey}`);
	return {
		label: () => base.$('.label').text(),
		hasError: () => base.$('.validation-error').exists(),
		errorMessage: () => base.$('.validation-error').text(),
		base
	};
};
