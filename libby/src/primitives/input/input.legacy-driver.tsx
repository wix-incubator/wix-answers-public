import { getLegacyBaseDriverFromWrapper } from '../../drivers';
import { renderAndMountComponent } from 'answers-lib';
import * as React from 'react';

import {InputProps, Input} from './input';
import { KeyCode } from '../../common/key-codes.enum';

export type LegacyInputDriver = {
	getValue: () => string,
	enterValue: (value: string) => void,
	pressEnter: () => void;
	isDisabled: () => boolean,
	isReadOnly: () => boolean,
	isValid: () => boolean,
	getValidationErrorMessage: () => string;
	getPlaceholder: () => string;
};

export const createLegacyInputDriver = (wrapper: Element) => {

	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.input', Input.name);
	const inputField = baseDriver.find('.input-field');

	const inputElem = inputField.elem as HTMLInputElement;

	return {
		getValue: () => inputElem.value,
		enterValue: (value: string) => inputField.enterValue(value),
		pressEnter: () => inputField.pressKey(KeyCode.ENTER),
		isDisabled: () => inputElem.hasAttribute('disabled'),
		isReadOnly: () => inputElem.hasAttribute('readonly'),
		isValid: () => inputElem.classList.contains('invalid') ? false : true,
		getValidationErrorMessage: () => baseDriver.find('.validation-error').getText(),
		getPlaceholder: () => inputElem.getAttribute('placeholder') || ''
	};
};

export const createInput = (props: InputProps): LegacyInputDriver => {
	const elem = renderAndMountComponent(<Input {...props} />);
	return createLegacyInputDriver(elem);
};
