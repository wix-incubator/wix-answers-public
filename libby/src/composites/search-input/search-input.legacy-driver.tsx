import * as React from 'react';
import { getLegacyBaseDriverFromWrapper } from '../../common/base-driver';
import { renderAndMountComponent } from 'answers-lib';
import { SearchInput, SearchInputProps } from './search-input';
import { createLegacyInputDriver } from '../../drivers';

export type SearchLegacyInputDriver = {
	getQuery: () => string;
	setQuery: (query: string) => void;
	isDisabled: () => boolean;
};

export const createLegacySearchInputDriver = (wrapper: Element) => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.search-input', SearchInput.name);
	const inputDriver = createLegacyInputDriver(baseDriver.elem);

	return {
		getQuery: () => inputDriver.getValue(),
		setQuery: (query: string) => inputDriver.enterValue(query),
		isDisabled: () => inputDriver.isDisabled(),
	};
};

export const createSearchInput = (props: SearchInputProps): SearchLegacyInputDriver => {
	const elem = renderAndMountComponent(<SearchInput {...props} />);
	return createLegacySearchInputDriver(elem);
};
