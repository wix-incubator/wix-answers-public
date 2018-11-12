
import * as React from 'react';
import { MultiInput, MultiInputProps } from './multi-input';
import { KeyCode } from '../../common/key-codes.enum';
import { getLegacyBaseDriverFromWrapper, simulateBlur } from '../../drivers';
import { renderAndMountComponent } from 'answers-toolkit';

export type MultiInputDriver = {
	getTags: () => string[],
	addTag: (tag: string) => void,
	blur: () => void,
	isTagRejected: () => boolean,
	isErrorMsgVisible: () => boolean,
	isDisabled: () => boolean
};

export const createMultiInputDriver = (wrapper: Element): MultiInputDriver => {
	const base = getLegacyBaseDriverFromWrapper(wrapper, '.multi-input', MultiInput.name);

	return {
		getTags: () => base.findAll('.react-tagsinput-tag').getText(),
		addTag: (tag: string) => {
			const input = base.find('input');
			input.enterValue(tag);
			input.pressKey(KeyCode.ENTER);
		},
		blur: () => {
			const input = base.find('input');
			simulateBlur(input.elem);
		},
		isTagRejected: () => !!base.isChildVisible('.is-rejected'),
		isErrorMsgVisible: () => !!base.isChildVisible('.invalid-msg'),
		isDisabled: () => !!base.hasClass('disabled')
	};
};

export const renderMultiInputAndReturnDriver = (props: MultiInputProps): MultiInputDriver => {
	const elem = renderAndMountComponent(<MultiInput {...props} />);
	return createMultiInputDriver(elem);
};
