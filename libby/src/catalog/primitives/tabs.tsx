import * as React from 'react';
import { CatalogGroup } from '..';
import { Tabs, TabsProps } from '../..';

export const tabsCatalogData: CatalogGroup<TabsProps> = {
	title: 'Tabs',
	render: (p) => <Tabs {...p}/>,
	items: [
		{
			label: 'Normal',
			props: {
				items: [
					{
						element: 'Tab 1',
						key: 'tab-1'
					},
					{
						element: 'Tab 2',
						key: 'tab-2'
					},
					{
						element: 'Tab 3',
						key: 'tab-3',
						disabled: true
					}
				],
				selected: 'tab-1'
			}
		}
	]
};
