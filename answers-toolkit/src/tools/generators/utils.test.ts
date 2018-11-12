import { lispCase, lowerCamelCase } from './utils';
import { expect } from 'chai';
describe('utils', () => {

	it('should transfer pascal case to lisp case', () => {
		expect(lispCase('hi')).to.eql('hi');
		expect(lispCase('Hi')).to.eql('hi');
		expect(lispCase('HiBob')).to.eql('hi-bob');
		expect(lispCase('HiBobSon')).to.eql('hi-bob-son');
		expect(lispCase('hiBobSon')).to.eql('hi-bob-son');
		expect(lispCase('hiBobSon')).to.eql('hi-bob-son');
	});

	it('changes to lower camel case', () => {
		expect(lowerCamelCase('Bob')).to.eql('bob');
		expect(lowerCamelCase('BobViewer')).to.eql('bobViewer');
	});
});
