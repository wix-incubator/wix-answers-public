import * as React from 'react';
import { CatalogGroup } from '..';
import { DrillMenuItem, DrillMenuItemProps } from '../..';

export const drillMenuItemCatalogData: CatalogGroup<DrillMenuItemProps> = {
	title: 'Drill Menu Item',
	render: (p) => <DrillMenuItem {...p}>Item Title</DrillMenuItem>,
	items: [
		{
			label: 'Normal',
			props: {
				onClick: () => alert('Clicked!')
			}
		},
		{
			label: 'Disabled',
			props: {
				disabled: true
			}
		}
	]
};
