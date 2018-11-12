import { getLegacyBaseDriverFromWrapper } from '../../drivers';
import {renderAndMountComponent } from 'answers-lib';
import {createToggleDriver} from '../../primitives/toggle/toggle.driver';
import * as React from 'react';

import {CollapsbileToggleProps, CollapsbileToggle} from './collapsible-toggle';

export type CollapsbileToggleDriver = {
	getTitleText: () => string;
	isOn: () => boolean;
	toggle: () => void;
	toggleCollapsible: () => void;
	isExpanded: () => boolean;
};

export const createCollapsbileToggleDriver = (wrapper: Element) => {

	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.collapsible-toggle', 'CollapsibleToggle');
	const toggleDriver = createToggleDriver(baseDriver.find('.toggle-wrapper').elem);

	return {
		getTitleText: () => baseDriver.find('.header-title').getText(),
		isOn: () => baseDriver.elem.classList.contains('on'),
		toggle: () => toggleDriver.toggle(),
		toggleCollapsible: () => baseDriver.find('.header-title').click(),
		isExpanded: () => baseDriver.elem.classList.contains('expanded')
	};
};

export const createCollapsbileToggle = (props: CollapsbileToggleProps): CollapsbileToggleDriver => {
	const elem = renderAndMountComponent(<CollapsbileToggle {...props} />);
	return createCollapsbileToggleDriver(elem);
};
