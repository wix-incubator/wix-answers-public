import { getLegacyBaseDriverFromWrapper, createLegacyInputDriver } from '../../drivers';
import { renderAndMountComponent } from 'answers-toolkit';
import * as React from 'react';

import {FormInputProps, FormInput} from './form-input.comp';

export type FormInputLegacyDriver = {
	getValue: () => string,
	enterValue: (value: string) => void,
	pressEnter: () => void;
	isDisabled: () => boolean,
	isReadOnly: () => boolean,
	isValid: () => boolean,
	getValidationMessage: () => string;
	getPlaceholder: () => string;
	getLabel: () => string;
};

export const createFormInputLegacyDriver = (wrapper: Element) => {

	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.form-input', FormInput.name);
	const inputDriver = createLegacyInputDriver(wrapper);

	return {
		getValue: () => inputDriver.getValue(),
		enterValue: (value: string) => inputDriver.enterValue(value),
		pressEnter: () => inputDriver.pressEnter(),
		isDisabled: () => inputDriver.isDisabled(),
		isReadOnly: () => inputDriver.isReadOnly(),
		isValid: () => !baseDriver.hasClass('invalid'),
		getPlaceholder: () => inputDriver.getPlaceholder(),
		getValidationMessage: () => {
			return baseDriver.isChildVisible('.validation-msg') ?
				baseDriver.find('.validation-msg').getText() : '';
		},
		getLabel: () => baseDriver.find('.label-text').getText()
	};
};

export const createFormInput = (props: FormInputProps): FormInputLegacyDriver => {
	const elem = renderAndMountComponent(<FormInput {...props} />);
	return createFormInputLegacyDriver(elem);
};
