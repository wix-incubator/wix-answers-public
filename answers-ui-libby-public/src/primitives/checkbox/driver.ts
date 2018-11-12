import { UniDriver } from 'unidriver';
import { checkboxKey } from './checkbox';

export type CheckboxDriver = {
	toggle: () => Promise<void>;
	label: () => Promise<string>;
	value: () => Promise<boolean>;
	set: (val: boolean) => Promise<void>;
};

export const createCheckboxDriver = (wrapper: UniDriver): CheckboxDriver => {
	const base = wrapper.$(`.${checkboxKey}`);
	const value = () => base.hasClass('checked');
	const toggle = () => base.$('input').click();
	return {
		toggle,
		label: base.$('.checkbox-body').text,
		value,
		set: async (val) => {
			const curr = await value();
			if (curr !== val) {
				await toggle();
			}
		}
	};
};
