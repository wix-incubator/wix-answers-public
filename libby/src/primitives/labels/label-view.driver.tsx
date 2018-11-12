import { getLegacyBaseDriverFromWrapper } from '../../drivers';
import { renderAndMountComponent } from 'answers-lib';
import * as React from 'react';

import {LabelViewProps, LabelView, labelViewKey} from './label-view';

export type LabelViewDriver = {
	getName: () => string;
	remove: () => void;
};

export const createLabelViewDriver = (wrapper: Element, extra: string = '') => {

	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, `.${labelViewKey}${extra}`, labelViewKey);

	return {
		getName: () => baseDriver.getText(),
		remove: () => baseDriver.click()
	};
};

export const createLabelView = (props: LabelViewProps): LabelViewDriver => {
	const elem = renderAndMountComponent(<LabelView {...props} />);
	return createLabelViewDriver(elem);
};
