import * as React from 'react';
import { getLegacyBaseDriverFromWrapper } from '../../common/base-driver';
import { NumericInput, NumericInputProps } from './numeric-input';
import { renderAndMountComponent } from 'answers-toolkit';

export type NumericInputDriver = {
	getValue: () => number,
	enterValue: (value: number) => void;
	isDisabled: () => boolean;
	clickIncrement: () => void;
	clickDecrement: () => void;
};

export const createNumericInputDriver = (wrapper: Element) => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.numeric-input', NumericInput.name);

	const numericInput = baseDriver.find('input');

	const simulateMouseDown = (elem: Element) => {
		const event = document.createEvent('HTMLEvents');
		event.initEvent('mousedown', true, false);
		elem.dispatchEvent(event);
	};

	return {
		getValue: () => parseInt((numericInput.elem as HTMLInputElement).value, 10),
		enterValue: (value: number) => numericInput.enterValue(value.toString()),
		isDisabled: () => !!numericInput.getAttribute('disabled'),
		clickIncrement: () => simulateMouseDown(baseDriver.find('.increment').elem),
		clickDecrement: () => simulateMouseDown(baseDriver.find('.decrement').elem)
	};
};

export const createNumericInput = (props: NumericInputProps): NumericInputDriver => {
	const elem = renderAndMountComponent(<NumericInput {...props} />);
	return createNumericInputDriver(elem);
};
