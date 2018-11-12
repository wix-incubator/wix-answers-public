import {getLegacyBaseDriverFromWrapper} from '../../../common/base-driver';
import {SelectProps, Select} from './select';
import {renderAndMountComponent } from 'answers-lib';
import {Simulate} from 'react-dom/test-utils';
import * as React from 'react';

export type SelectLegacyDriver = {
	openSelection: () => void;
	selectAtIndex: (index: number) => void;
	getSelectionTitles: () => string[];
	selectByOptionClassName: (className: string) => void;
	getSelectedValue: () => string;
	getPlaceholder: () => string;
	enterText: (val: string) => void;
};

export const createSelectLegacyDriver = (element: Element): SelectLegacyDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(element, '.select', Select.name);

	const selectInput = baseDriver.find('.Select-input input');
	const openSelection = () => Simulate.focus(selectInput.elem);
	const optionAtIndex = (index: number) => baseDriver
		.findAll('.Select-option')
		.get(index);

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
		getSelectedValue: () => {
			const selector = '.Select-value';
			return baseDriver.isChildVisible(selector) ? baseDriver.find(selector).getText() : '';
		},
		getPlaceholder: () => {
			return baseDriver.find('.Select-placeholder').getText();
		},
		enterText: (val: string) => selectInput.enterValue(val)
	};
};

export const createSelect = (props: SelectProps): SelectLegacyDriver => {
	const elem = renderAndMountComponent(<Select {...props} />);
	return createSelectLegacyDriver(elem);
};
