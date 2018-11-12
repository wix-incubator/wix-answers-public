import { UniDriver } from 'unidriver';
import { Simulate } from 'react-dom/test-utils';

export type SelectDriver = {
	openSelection: () => Promise<void>;
	selectAtIndex: (index: number) => Promise<void>;
	getSelectionTitles: () => Promise<string[]>;
	selectByOptionClassName: (className: string) => Promise<void>;
	getSelectedValue: () => Promise<string>;
	getPlaceholder: () => Promise<string>;
	enterText: (val: string) => Promise<void>;
	isDisabled: () => Promise<boolean>;
};

export const createSelectDriver = (wrapper: UniDriver): SelectDriver => {
	const select = wrapper.$('.select');

	const mouseDownOnElement = async (e: UniDriver) => {
		if (e.type === 'react') {
			const rawElem = await e.getNative();
			Simulate.mouseDown(rawElem);
			return Promise.resolve();
		} else {
			return e.click();
		}
	};

	const focusInput = async () => {
		if (select.type === 'react') {
			const elem = await select.$('.Select-input input').getNative();
			Simulate.focus(elem);
		} else {
			return select.$('.Select-input input').click();
		}
	};

	const optionAtIndex = (index: number) => select.$$('.Select-option').get(index);

	return {
		openSelection: async () => focusInput(),
		selectAtIndex: async (index: number) => {
			await focusInput();
			const option = await optionAtIndex(index);
			return mouseDownOnElement(option);
		},
		getSelectionTitles: async () => {
			await focusInput();
			return select.$$('.Select-option')
				.map((e) => e.text());
		},
		selectByOptionClassName: async (className: string) => {
			await focusInput();
			const option = select.$(`.Select-option.${className}`);
			return mouseDownOnElement(option);
		},
		getSelectedValue: async () => {
			const selector = '.Select-value';
			return select.hasClass(selector) ? select.$(selector).text() : '';
		},
		getPlaceholder: async () => {
			return select.$('.Select-placeholder').text();
		},
		enterText: async (val: string) => select.$('.Select-input input').enterValue(val),
		isDisabled: () => select.hasClass('is-disabled')
	};
};
