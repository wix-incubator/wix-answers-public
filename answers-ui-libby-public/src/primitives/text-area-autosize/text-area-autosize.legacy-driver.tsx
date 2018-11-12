import { getLegacyBaseDriverFromWrapper } from '../../drivers';
import {renderAndMountComponent } from 'answers-toolkit';
import * as React from 'react';

import {TextAreaAutosizeProps, TextAreaAutosize} from '../..';

export type TextAreaAutosizeLegacyDriver = {
	getValue: () => string,
	enterValue: (value: string) => void,
	isDisabled: () => boolean,
	isReadOnly: () => boolean
};

export const createTextAreaAutosizeLegacyDriver = (wrapper: Element) => {

	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.text-area-autosize', TextAreaAutosize.name);
	const textArea = baseDriver.elem as HTMLTextAreaElement;

	return {
		getValue: () => textArea.value,
		enterValue: (value: string) => baseDriver.enterValue(value),
		isDisabled: () => textArea.hasAttribute('disabled'),
		isReadOnly: () => textArea.hasAttribute('readonly')
	};
};

export const createTextAreaAutosize = (props: TextAreaAutosizeProps): TextAreaAutosizeLegacyDriver => {
	const elem = renderAndMountComponent(<TextAreaAutosize {...props} />);
	return createTextAreaAutosizeLegacyDriver(elem);
};
