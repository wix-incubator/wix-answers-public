import * as React from 'react';
import { CatalogGroup } from '../';
import { InfoBox, InfoBoxProps } from '../../';

export const infoBoxCatalogData: CatalogGroup<InfoBoxProps> = {
	render: (p) => <InfoBox {...p}/>,
	title: 'Info Box',
	items: [
		{
			// label: 'Normal',
			props: {
				mainBody: <div>Bob!</div>,
				additionalBody: <div>More bobs!</div>,
				title: 'Bob Info',
				showMoreText: 'Show more',
				showLessText: 'Show less'
			}
		}
	]
};
