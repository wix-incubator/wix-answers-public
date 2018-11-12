import * as React from 'react';
import { CatalogGroup } from '..';
import { InfoTooltip, InfoTooltipProps } from '../..';

export const infoTooltipCatalogData: CatalogGroup<InfoTooltipProps> = {
	title: 'Info Tooltip',
	render: (p) => <InfoTooltip {...p}/>,
	items: [
		{
			props: {
				text: 'Your info stuff goes here'
			}
		}
	]
};
