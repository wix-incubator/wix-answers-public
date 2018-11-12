import { UniDriver } from 'unidriver';
import { searchInputKey } from './search-input';
import { createInputDriver } from '../../drivers';

export type SearchInputDriver = {
	value: () => Promise<string>;
	set: (value: string) => Promise<void>;
	reset: () => Promise<void>;
	disabled: () => Promise<boolean>;
	placeholder: () => Promise<string>;
};

export const createSearchInputDriver = (wrapper: UniDriver): SearchInputDriver => {
	const searchInput = wrapper.$(`.${searchInputKey}`);
	const inputField = createInputDriver(searchInput);

	return {
		value: () => inputField.value(),
		reset: () => searchInput.$('.reset-search-btn').click(),
		set: (value) => inputField.enterValue(value),
		disabled: () => inputField.disabled(),
		placeholder: () => inputField.placeholder()
	};
};
