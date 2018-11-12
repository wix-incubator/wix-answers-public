import * as React from 'react';
import { CatalogGroup } from '..';
import { Checkbox, CheckboxProps } from '../..';

export const checkboxCatalogData: CatalogGroup<CheckboxProps> = {
	render: (p) => <Checkbox {...p}/>,
	title: 'Checkbox',
	items: [
		{
			label: 'Checked',
			props: {
				value: true
			}
		},
		{
			label: 'Unchecked',
			props: {
				value: false,
			}
		},
		{
			label: 'Checked Disabled',
			props: {
				value: true,
				disabled: true
			}
		},
		{
			label: 'Unchecked Disabled',
			props: {
				value: false,
				disabled: true
			}
		}
	]
};
