import { getLegacyBaseDriverFromWrapper } from '../../../drivers';
import {renderAndMountComponent } from 'answers-toolkit';
import * as React from 'react';

import {ButtonProps, BaseButton, ButtonType} from './base-button.comp';

export type ButtonDriver = {
		click: () => void;
		getText: () => string;
		isDisabled: () => boolean;
		loaderVisible: () => boolean;
};

// tslint:disable-next-line:max-line-length
export const createBaseButtonDriver = (wrapper: Element, buttonType?: ButtonType, isHollow: boolean = false): ButtonDriver => {
	const buttonClassNames = buttonType ? `.button.${buttonType}` : '.button';

	const maybeHollowClass = isHollow ? '.hollow' : ':not(.hollow)';
	const classNames = `${buttonClassNames}${maybeHollowClass}`;

	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, classNames, BaseButton.name);

	return {
		click: () => baseDriver.click(),
		getText: () => baseDriver.getText(),
		isDisabled: () => baseDriver.elem.hasAttribute('disabled'),
		loaderVisible: () => baseDriver.isChildVisible('.tiny-loader')
	};
};

export const createBaseButton = (props: ButtonProps, children?: any): ButtonDriver => {
	const element = renderAndMountComponent(<BaseButton {...props}>{children}</BaseButton>);
	return createBaseButtonDriver(element);
};
