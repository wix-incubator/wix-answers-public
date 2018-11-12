import { getLegacyBaseDriverFromWrapper, simulateBlur } from '../../drivers';
import {renderAndMountComponent } from 'answers-lib';
import * as React from 'react';

import {TextAreaProps, TextArea} from '../..';

export type TextAreaDriver = {
	getValue: () => string,
	blur: () => void,
	enterValue: (value: string) => void,
	isDisabled: () => boolean,
	isReadOnly: () => boolean
};

export const createTextAreaDriver = (wrapper: Element) => {

	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.text-area', TextArea.name);
	const textArea = baseDriver.elem as HTMLTextAreaElement;

	return {
		getValue: () => textArea.value,
		enterValue: (value: string) => baseDriver.enterValue(value),
		blur: () => simulateBlur(textArea),
		isDisabled: () => textArea.hasAttribute('disabled'),
		isReadOnly: () => textArea.hasAttribute('readonly')
	};
};

export const createTextArea = (props: TextAreaProps): TextAreaDriver => {
	const elem = renderAndMountComponent(<TextArea {...props} />);
	return createTextAreaDriver(elem);
};
