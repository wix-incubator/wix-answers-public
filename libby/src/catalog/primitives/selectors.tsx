import * as React from 'react';
import { CatalogGroup } from '..';
import { Select, SelectProps } from '../..';
import { SelectOption } from '../../primitives/selectors/common';
import { MultiSelect, MultiSelectProps } from '../../primitives';

const options: SelectOption[] = [
	{ value: 1, label: 'Option 1' },
	{ value: 2, label: 'Option 2' },
	{ value: 3, label: 'Option 3' },
	{ value: 4, label: 'Option 4', disabled: true },
	{ value: 5, label: 'Option 5' },
	{ value: 6, label: 'Option 6' },
	{ value: 7, label: 'Option 7' },
	{ value: 8, label: 'Option 8', className: 'type-1' }
];

export const singleSelectCatalogData: CatalogGroup<SelectProps> = {
	title: 'Select',
	render: (p) => <Select {...p}/>,
	items: [
		{
			label: 'Normal',
			props: {
				options,
				value: 1
			}
		},
		{
			label: 'Disabled',
			props: {
				options,
				value: 1,
				disabled: true
			}
		}
	]
};

export const multiSelectCatalogData: CatalogGroup<MultiSelectProps> = {
	title: 'Multi Select',
	render: (p) => <MultiSelect {...p}/>,
	items: [
		{
			label: 'Normal',
			props: {
				options,
				value: [1, 2, 3]
			}
		},
		{
			label: 'Disabled',
			props: {
				options,
				value: [3, 5],
				disabled: true
			}
		}
	]
};
