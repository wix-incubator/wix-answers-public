import * as React from 'react';
import { CatalogGroup } from '..';
import { iconsMap, Icon, IconProps } from '../..';

export const iconCatalogData: CatalogGroup<IconProps> = {
	title: 'Icon',
	render: (p) => <Icon {...p}/>,
	items: [
		{
			label: 'Example 1',
			props: {
				icon: iconsMap.wand
			}
		}, {
			label: 'Example 2',
			props: {
				icon: iconsMap.subcategory
			}
		}
	]
};
