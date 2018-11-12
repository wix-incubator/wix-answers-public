import { UniDriver } from 'unidriver';
import { phoneInputKey } from '.';

export type PhoneInputDriver = {
	getNumber: () => Promise<string>;
	enterNumber: (num: string) => Promise<void>;
	base: UniDriver
};

export const createPhoneInputDriver = (wrapper: UniDriver): PhoneInputDriver => {
	const base = wrapper.$(`.${phoneInputKey}`);
	return {
		getNumber: () => base.$('input[type="tel"]').value(),
		enterNumber: (num: string) => base.$('input[type="tel"]').enterValue(num),
		base
	};
};
