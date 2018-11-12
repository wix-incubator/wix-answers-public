import * as React from 'react';
import { CatalogGroup } from '..';
import { Collapsible, CollapsibleProps } from '../..';

export const collapsibleCatalogData: CatalogGroup<CollapsibleProps> = {
	render: (p) => <Collapsible {...p}>Collapsible content is here</Collapsible>,
	title: 'Collapsible',
	items: [
		{
			label: 'Closed',
			props: {
				isOpen: false,
				title: 'This is a closed collapsible'
			}
		},
		{
			label: 'Open',
			props: {
				isOpen: true,
				title: 'This is an open collapsible'
			}
		}
	]
};
