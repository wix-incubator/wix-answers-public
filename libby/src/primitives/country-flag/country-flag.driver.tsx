import * as React from 'react';
import { getBaseReactDriver } from '../../drivers';
import { renderAndMountComponent } from 'answers-lib';
import { LegacyBaseDriver } from '../../common/base-driver';
import { CountryFlag, CountryFlagProps } from './country-flag';

export type CountryFlagDriver = {
	getCountryCode: () => string;
	getCountryName: () => string;
	base: LegacyBaseDriver;
};

export const createCountryFlagDriver = (elem: Element): CountryFlagDriver => {
	const base = getBaseReactDriver(elem);

	return {
		getCountryCode: () => base.find('.flag-icon').getDataAttr('country'),
		getCountryName: () => {
			if (base.isChildVisible('.country-name')) {
				return base.find('.country-name').getText();
			} else {
				return '';
			}
		},
		base
	};
};

export const renderCountryFlagAndReturnDriver = (props: CountryFlagProps): CountryFlagDriver => {
	const elem = renderAndMountComponent(<CountryFlag {...props}/>);
	return createCountryFlagDriver(elem);
};
