import { RadioGroupLegacyDriver, createRadioGroupLegacyDriver, RadioGroupCompProps } from '../../drivers';
import { CollapsibleRadio } from './collapsible-radio';
import { renderAndMountComponent } from 'answers-toolkit';
import { RadioGroup } from '../../primitives/radio-group/radio-group';
import * as React from 'react';

export const createCollapsibleRadioGroupDriver = (wrapper: Element): RadioGroupLegacyDriver => {
	return createRadioGroupLegacyDriver(wrapper);
};

export const createCollapsibleRadioGroupComp = (props: RadioGroupCompProps) => {

	const radioButtonComp = props.items.map((item: any) => {
			const title = `title is ${item}`;
			const desc = `description - ${item}`;
			const isDisabled = props.disabledValues.indexOf(item) > -1;

			return (
				<CollapsibleRadio title={title} description={desc} value={item} key={item} disabled={isDisabled}>
					{item}
				</CollapsibleRadio>
			);
		});

	const radioGroup = (
		<RadioGroup onChange={props.onChange} selectedValue={props.items[0]}>
			{radioButtonComp}
		</RadioGroup>
	);

	const element = renderAndMountComponent(radioGroup);
	return createCollapsibleRadioGroupDriver(element);
};
