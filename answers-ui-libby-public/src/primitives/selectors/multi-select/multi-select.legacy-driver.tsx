import {getLegacyBaseDriverFromWrapper} from '../../../common/base-driver';
import {renderAndMountComponent } from 'answers-toolkit';
import {Simulate} from 'react-dom/test-utils';
import * as React from 'react';
import { MultiSelect, MultiSelectProps } from './multi-select';

export type MultiSelectLegacyDriver = {
	openSelection: () => void;
	selectAtIndex: (index: number) => void;
	getSelectionTitles: () => string[];
	selectByOptionClassName: (className: string) => void;
	getSelectedValues: () => string[];
};

export const createMultiSelectLegacyDriver = (element: Element): MultiSelectLegacyDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(element, '.multi-select', MultiSelect.name);

	const selectInput = baseDriver.find('.Select-input input').elem;
	const openSelection = () => Simulate.focus(selectInput);
	const optionAtIndex = (index: number) => baseDriver
		.findAll('.Select-option').get(index);

	return {
		openSelection: () => openSelection(),
		selectAtIndex: (index: number) => {
			openSelection();
			const {elem} = optionAtIndex(index);
			Simulate.mouseDown(elem);
		},
		getSelectionTitles: () => {
			openSelection();
			return baseDriver.findAll('.Select-option').map((e) => e.getText());
		},
		selectByOptionClassName: (className: string) => {
			openSelection();
			const {elem} = baseDriver.find(`.Select-option.${className}`);
			Simulate.mouseDown(elem);
		},
		getSelectedValues: () => baseDriver.findAll('.Select-value-label').map((i) => i.getText().replace(/\s$/g, ''))
	};
};

export const createMultiSelect = (props: MultiSelectProps): MultiSelectLegacyDriver => {
	const elem = renderAndMountComponent(<MultiSelect {...props} />);
	return createMultiSelectLegacyDriver(elem);
};
