import * as React from 'react';
import { CatalogGroup } from '..';
import { Tooltip, TooltipProps } from '../..';

export const tooltipCatalogData: CatalogGroup<TooltipProps> = {
	title: 'Tooltip',
	render: (p) => <Tooltip {...p}>HOVER ME</Tooltip>,
	items: [
		{
			label: 'Normal',
			props: {
				body: 'This is a very cool tooltip thingy'
			}
		}
	]
};
