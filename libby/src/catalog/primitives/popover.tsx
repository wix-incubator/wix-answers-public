import * as React from 'react';
import { CatalogGroup } from '..';
import { Popover } from '../..';
import { PopoverProps } from '../../primitives/popover/base-popover';

export const popoverCatalogData: CatalogGroup<PopoverProps> = {
	title: 'Popover',
	render: (p) => <Popover {...p}><div>Trigger</div></Popover>,
	items: [
		{
			label: 'Open',
			props: {
				body: 'Hi There',
				isOpen: true
			}
		}
	]
};
