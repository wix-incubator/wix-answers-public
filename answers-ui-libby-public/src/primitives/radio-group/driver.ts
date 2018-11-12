
import { UniDriver } from 'unidriver';

export type RadioGroupDriver = {
	getSelectedValue: () => Promise<string>;
	selectByValue: (value: string) => Promise<void>;
};

export const createRadioGroupDriver = (wrapper: UniDriver): RadioGroupDriver => {
	const radioGroup = wrapper.$('.radio-group');
	const radioButtons = radioGroup.$$('.radio-button');

	return {
		getSelectedValue: async () => {
			const radioItem = radioButtons
				.filter((i) => i.hasClass('checked')).get(0);
			if (!radioItem) {
				throw new Error('checked radio button does not exist');
			}
			return radioItem.attr('data-value');
		},
		selectByValue: async (value: string) => {
			const radioItem = radioButtons
				.filter(async (i) => await i.attr('data-value') === value).get(0);

			if (radioItem) {
				await radioItem.click();
			}
		}
	};
};
