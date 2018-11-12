import * as React from 'react';
import { getLegacyBaseDriverFromWrapper } from '../../common/base-driver';
import { Collapsible, CollapsibleProps } from './collapsible';
import { renderAndMountComponent } from 'answers-toolkit';

export type CollapsibleDriver = {
	getTitle: () => string;
	isOpen: () => boolean;
	toggle: () => void;
};

export const createCollapsibleDriver = (wrapper: Element): CollapsibleDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.collapsible', Collapsible.name);

	return {
		getTitle: () => baseDriver.find('.title').getText(),
		isOpen: () => baseDriver.elem.classList.contains('open'),
		toggle: () => baseDriver.find('.title-wrapper').click()
	};
};

export const createCollapsible = (props: CollapsibleProps) => {
	const elem = renderAndMountComponent(<Collapsible {...props}/>);
	return createCollapsibleDriver(elem);
};
