import * as React from 'react';
import { CatalogGroup } from '..';
import { ToggleButton, ToggleButtonProps } from '../..';

export const toggleButtonCatalogData: CatalogGroup<ToggleButtonProps> = {
	title: 'Toggle Button',
	render: (p) => <ToggleButton {...p}>Toggle Me</ToggleButton>,
	items: [
		{
			label: 'Toggled On',
			props: {
				isChecked: true
			}
		},
		{
			label: 'Toggled Off',
			props: {
				isChecked: false
			}
		}
	]
};
