import * as React from 'react';
import { CatalogGroup } from '..';
import { MultiInput, MultiInputProps } from '../..';

export const multiInputCatalogData: CatalogGroup<MultiInputProps> = {
	render: (p) => <MultiInput {...p}/>,
	title: 'Multi Input',
	items: [
		{
			label: 'Normal',
			props: {
				values: ['Apples', 'Oranges']
			}
		},
		{
			label: 'Disabled',
			props: {
				values: ['Apples', 'Oranges'],
				disabled: true
			}
		}
	]
};
