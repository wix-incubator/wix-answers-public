import * as React from 'react';
import { CatalogGroup } from '../';
import { iconsMap, Icon} from '../../';

const iconsArray: Array<{name: string, svg: string}> = [];

for (const iconKey of Object.keys(iconsMap)) {
	const iconData = (iconsMap as any)[iconKey];

	iconsArray.push({name: iconKey, svg: iconData});
}

export const processedCatalogData: CatalogGroup<any> = {
	render: (p) => <Icon {...p}/>,
	title: 'Icons',
	items: iconsArray.map((icon) => (
		{
			label: icon.name,
			props: {
				icon: icon.svg
			}
		}
	))
};
