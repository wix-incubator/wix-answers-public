import * as React from 'react';
import { getLegacyBaseDriverFromWrapper } from '../../common/base-driver';
import { TimeInput, TimeInputProps } from './time-input';
import { renderAndMountComponent } from 'answers-lib';
import { createLegacyInputDriver } from '../../primitives/input/input.legacy-driver';
import { Simulate } from 'react-dom/test-utils';

export type TimeInputDriver = {
	getTime: () => string;
	getPeriod: () => string;
	enterTime: (time: string) => void;
	clickPeriod: () => void;
	selectOption: (idx: number) => void;
};

export const createTimeInputDriver = (wrapper: Element): TimeInputDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.time-input', TimeInput.name);
	const timeInputElement = baseDriver.find('input').elem;

	return {
		getTime: () => createLegacyInputDriver(wrapper).getValue(),
		enterTime: (val: string) => {
			createLegacyInputDriver(wrapper).enterValue(val);
			Simulate.blur(timeInputElement);
		},
		getPeriod: () => baseDriver.find('.period').getText(),
		clickPeriod: () => baseDriver.find('.period').click(),
		selectOption: (idx) => {
			baseDriver.find('.toggle-options-button').click();
			baseDriver.findAll('.time-options-menu .time-option').get(idx).click();
		}
	};
};

export const createTimeInput = (props: TimeInputProps): TimeInputDriver => {
	const elem = renderAndMountComponent(<TimeInput {...props} />);
	return createTimeInputDriver(elem);
};
