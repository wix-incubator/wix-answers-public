import {ToggleButtonProps, ToggleButton} from './toggle-button';
import {renderAndMountComponent } from 'answers-lib';
import {getLegacyBaseDriverFromWrapper} from '../../common/base-driver';
import * as React from 'react';

export type ToggleButtonDriver = {
		click: () => void;
		getText: () => string;
		isChecked: () => boolean;
};

export const createToggleButtonDriver = (wrapper: Element): ToggleButtonDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.toggle-button', ToggleButton.name);
	return {
		click: () => baseDriver.click(),
		getText: () => baseDriver.getText(),
		isChecked: () => baseDriver.elem.classList.contains('checked')
	};
};

export const createToggleButton = (props: ToggleButtonProps, children?: any): ToggleButtonDriver => {
	const element = renderAndMountComponent(<ToggleButton {...props}>{children}</ToggleButton>);
	return createToggleButtonDriver(element);
};
