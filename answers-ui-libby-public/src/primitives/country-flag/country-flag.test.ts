import { CountryFlagProps } from './country-flag';
import { renderCountryFlagAndReturnDriver } from './country-flag.driver';
import { expect } from 'chai';

const defaultProps: CountryFlagProps = {
	countryCode: 'IL',
};

// tslint:disable-next-line:no-skipped-tests
describe.skip('Country Flag', () => {
	it('should have country code correctly, without name', () => {
		const comp = renderCountryFlagAndReturnDriver(defaultProps);

		expect(comp.getCountryCode()).to.eql(defaultProps.countryCode);
		expect(comp.getCountryName()).to.eql('');
	});

	it('should show country name when passed', () => {
		const countryName = 'Israel';
		const comp = renderCountryFlagAndReturnDriver({...defaultProps, name: countryName});

		expect(comp.getCountryName()).to.eql(countryName);
	});
});
