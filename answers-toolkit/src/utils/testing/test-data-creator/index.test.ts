import { expect } from 'chai';
import { testDataCreator } from './';

describe('test data creator', () => {
	it('should  create a test data creator with defaults', () => {
		const creator = testDataCreator({a: 1, b: 2});
		expect(creator({}).a).to.eql(1);
		expect(creator({}).b).to.eql(2);
		expect(creator({a: 2}).a).to.eql(2);
		expect(creator({b: undefined}).b).to.eql(undefined);
	});

	it('should create a test data creator with defaults as function and call it each time', () => {
		let a = 0;
		const creator = testDataCreator(() => ({a}));
		expect(creator({}).a).to.eql(0);
		a = 42;
		expect(creator({}).a).to.eql(42);
	});
});
