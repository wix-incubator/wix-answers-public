import {ButtonDriver} from '../base-button/base-button.driver';
import * as React from 'react';
import { LinkButtonProps, LinkButton } from './link-button';
import { getLegacyBaseDriverFromWrapper } from '../../../common/base-driver';
import { renderAndMountComponent } from 'answers-toolkit';

export const createLinkButtonLegacyDriver = (wrapper: Element): ButtonDriver => {
	const classNames = '.link-button';
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, classNames, LinkButton.name);
	return {
		click: () => baseDriver.click(),
		getText: () => baseDriver.elem.innerHTML,
		isDisabled: () => baseDriver.elem.hasAttribute('disabled'),
		loaderVisible: () => false
	};
};

export const createLinkButton = (props: LinkButtonProps): ButtonDriver => {
	const element = renderAndMountComponent(<LinkButton {...props}>{props.children}</LinkButton>);
	return createLinkButtonLegacyDriver(element);
};
