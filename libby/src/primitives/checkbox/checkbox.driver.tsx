import {Checkbox, CheckboxProps} from './checkbox';
import {renderAndMountComponent } from 'answers-lib';
import {getLegacyBaseDriverFromWrapper} from '../../common/base-driver';
import * as React from 'react';

export type LegacyCheckboxDriver = {
	click: () => void;
	getLabel: () => string;
	isChecked: () => boolean;
	isLarge: () => boolean;
};

export const createLegacyCheckboxDriver = (wrapper: Element): LegacyCheckboxDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.checkbox', Checkbox.name);
	return {
		click: () => baseDriver.click(),
		getLabel: () => baseDriver.find('.checkbox-body').getText(),
		isChecked: () => baseDriver.elem.classList.contains('checked'),
		isLarge: () => baseDriver.elem.classList.contains('large')
	};
};

export const createCheckbox = (props: CheckboxProps): LegacyCheckboxDriver => {
	const element = renderAndMountComponent(<Checkbox {...props}/>);
	return createLegacyCheckboxDriver(element);
};
