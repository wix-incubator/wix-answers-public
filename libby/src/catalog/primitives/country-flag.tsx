import * as React from 'react';
import { CatalogGroup } from '..';
import { CountryFlag, CountryFlagProps } from '../..';

export const countryFlagCatalogData: CatalogGroup<CountryFlagProps> = {
	title: 'Country Flag',
	render: (p) => <CountryFlag {...p}/>,
	items: [
		{
			props: {
				name: 'Israel',
				countryCode: 'IL'
			}
		},
		{
			props: {
				name: 'Turkey',
				countryCode: 'TR'
			}
		}
	]
};
