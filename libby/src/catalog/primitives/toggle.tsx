import * as React from 'react';
import { CatalogGroup } from '..';
import { Toggle, ToggleProps } from '../..';
import { noop } from '../../common';

export const toggleCatalogData: CatalogGroup<ToggleProps> = {
	title: 'Toggle',
	render: (p) => <Toggle {...p} onChange={noop}/>,
	items: [
		{
			label: 'Toggled On',
			props: {
				value: true
			}
		},
		{
			label: 'Toggled Off',
			props: {
				value: false
			}
		}
	]
};
