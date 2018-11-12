import { getLegacyBaseDriverFromWrapper } from '../../common/base-driver';
import { MessageBoxType, MessageBoxProps, WarningMessageBox } from './message-box';
import { renderAndMountComponent } from 'answers-toolkit';
import * as React from 'react';

export type MessageBoxDriver = {
	getText: () => string;
};

const createMessageBoxDriver = (wrapper: Element, type: MessageBoxType): MessageBoxDriver => {
	const classNames = `.message-box.${type}`;
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, classNames, 'MessageBox');

	return {
		getText: () => baseDriver.getText()
	};
};

export const createWarningMessageBoxDriver = (wrapper: Element): MessageBoxDriver => {
	return createMessageBoxDriver(wrapper, 'warning');
};

export const createAttentionMessageBoxDriver = (wrapper: Element): MessageBoxDriver => {
	return createMessageBoxDriver(wrapper, 'attention');
};

export const createWarningMessageBox = (props: MessageBoxProps, content: string): MessageBoxDriver => {
	const elem = renderAndMountComponent(<WarningMessageBox {...props}>{content}</WarningMessageBox>);
	return createWarningMessageBoxDriver(elem);
};
