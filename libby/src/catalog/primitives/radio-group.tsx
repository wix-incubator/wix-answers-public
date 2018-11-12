import * as React from 'react';
import { CatalogGroup } from '..';
import { RadioGroup, RadioGroupProps } from '../..';
import { RadioButton } from '../../primitives';
import { noop } from 'answers-lib';

export const radioGroupCatalogData: CatalogGroup<RadioGroupProps> = {
	title: 'Radio Group & Radio Buttons',
	render: (p) => (
		<RadioGroup {...p}>
			<RadioButton value='button-1'>One</RadioButton>
			<RadioButton value='button-2'>Two</RadioButton>
			<RadioButton value='button-3'>Three</RadioButton>
		</RadioGroup>
	),
	items: [
		{
			label: 'Normal',
			props: {
				selectedValue: 'button-1',
				onChange: noop
			}
		}
	]
};
