import {
	LegacyBaseDriver,
	getLegacyBaseDriverFromWrapper,
	getBaseReactDriver
} from '../../drivers';

import {
	renderAndMountComponent
} from '../../common';

import {ensureExists} from 'answers-lib';

import { RadioButton, RadioGroup, RadioValue } from './radio-group';
import * as React from 'react';

export type RadioGroupLegacyDriver = {
	getSelectedValue: () => string;
	selectByValue: (value: string) => void;
	getChildrenByValue: (value: string) => LegacyBaseDriver;
	wrapper: Element
};

export type RadioGroupCompProps = {
	onChange: (newVal: RadioValue) => void;
	items: RadioValue[];
	disabledValues: string[];
};

export const createRadioGroupLegacyDriver = (wrapper: Element): RadioGroupLegacyDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.radio-group', RadioGroup.name);

	return {
		selectByValue: (value: string) => {
			const elem = baseDriver.findAll('.radio-button')
				.toArray()
				.find((i) => (i.getAttribute('data-value') || '') === value);
			ensureExists(elem).click();
		},
		getSelectedValue: () => {
			const value = baseDriver.findAll('.radio-button')
				.filter((i) => i.hasClass('checked')).get(0)
				.getAttribute('data-value');
			return ensureExists(value);
		},
		getChildrenByValue: (value: string) => {
			const {elem} = ensureExists(baseDriver.findAll('.radio-button')
				.toArray()
				.find((i) => i.getAttribute('data-value') === value));
			return getBaseReactDriver(elem);
		},
		wrapper
	};
};

export const createRadioGroupComp = (props: RadioGroupCompProps): RadioGroupLegacyDriver => {

	const radioButtonComp = props.items.map((item: any) => {
			const isDisabled = props.disabledValues.indexOf(item) > -1;
			return (
				<RadioButton value={item} key={item} disabled={isDisabled}>{item}</RadioButton>
			);
		});

	const radioGroup = (
		<RadioGroup onChange={props.onChange} selectedValue={props.items[0]}>
			{radioButtonComp}
		</RadioGroup>
	);

	const element = renderAndMountComponent(radioGroup);
	return createRadioGroupLegacyDriver(element);
};
