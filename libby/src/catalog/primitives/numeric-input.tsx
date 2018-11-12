import * as React from 'react';
import { CatalogGroup } from '..';
import { NumericInput, NumericInputProps } from '../..';

export const numericInputCatalogData: CatalogGroup<NumericInputProps> = {
	title: 'Numeric Input',
	render: (p) => <NumericInput {...p}/>,
	items: [
		{
			label: 'Normal',
			props: {
				value: 100
			}
		},
		{
			label: 'Disabled',
			props: {
				value: 450,
				disabled: true
			}
		}
	]
};
