import { UniDriver } from 'unidriver';
import { Simulate } from 'react-dom/test-utils';

export type MultiSelectDriver = {
	openSelection: () => Promise<void>;
	selectAtIndex: (index: number) => Promise<void>;
	getSelectionTitles: () => Promise<string[]>;
	selectByOptionClassName: (className: string) => Promise<void>;
	getSelectedValues: () => Promise<string[]>;
};

export const createMultiSelectDriver = (wrapper: UniDriver): MultiSelectDriver => {
	const multiSelect = wrapper.$('.multi-select');

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
		if (multiSelect.type === 'react') {
			const elem = await multiSelect.$('.Select-input input').getNative();
			Simulate.focus(elem);
		} else {
			return multiSelect.$('.Select-input input').click();
		}
	};

	const optionAtIndex = (index: number) => wrapper
		.$$('.Select-option')
		.get(index);

	return {
		openSelection: async () => focusInput(),
		selectAtIndex: async (index: number) => {
			await focusInput();
			const option = optionAtIndex(index);
			return mouseDownOnElement(option);
		},
		getSelectionTitles: async () => {
			await focusInput();
			return multiSelect.$$('.Select-option')
				.map((e) => e.text());
		},
		selectByOptionClassName: async (className: string) => {
			await focusInput();
			const option = multiSelect.$(`.Select-option.${className}`);
			return mouseDownOnElement(option);
		},
		getSelectedValues: async () => multiSelect.$$('.Select-value-label')
			.map(async (i) => (await i.text()).replace(/\s$/g, ''))
	};
};
