// import { FloaterMenu } from './floater-menu';
import { getLegacyBaseDriverFromWrapper } from '../../drivers';
// import {renderAndMountComponent } from 'answers-lib';
// import * as React from 'react';
import { ButtonDriver } from '../../primitives/buttons/base-button/base-button.driver';

export type ActionButtonDriver = ButtonDriver;

export const createActionButtonDriver = (wrapper: Element): ActionButtonDriver => {
	const classNames = `.action-button`;
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, classNames, 'action-button');
	return {
		click: () => baseDriver.click(),
		getText: () => baseDriver.getText(),
		isDisabled: () => baseDriver.elem.hasAttribute('disabled'),
		loaderVisible: () => false
	};
};
