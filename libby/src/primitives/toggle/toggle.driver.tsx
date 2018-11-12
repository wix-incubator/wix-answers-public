import {getLegacyBaseDriverFromWrapper} from '../../common/base-driver';
import {renderAndMountComponent } from 'answers-lib';
import * as React from 'react';

import {ToggleProps, Toggle} from './toggle';

export type ToggleDriver = {
	isOn: () => boolean;
	isOff: () => boolean;
	toggle: () => void;
};

export const createToggleDriver = (wrapper: Element) => {

	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.toggle', 'Toggle');

	const isOn = () =>  baseDriver.elem.classList.contains('on');

	return {
		isOn,
		isOff: () => {
			return !isOn();
		},
		toggle: () => {
			return baseDriver.click();
		}
	};
};

export const createToggle = (props: ToggleProps): ToggleDriver => {
	const elem = renderAndMountComponent(<Toggle {...props} />);
	return createToggleDriver(elem);
};
