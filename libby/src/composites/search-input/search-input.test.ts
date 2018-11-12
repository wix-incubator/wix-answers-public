import * as jsdomGlobal from 'jsdom-global';
import * as sinon from 'sinon';
import { createSearchInput } from './search-input.legacy-driver';
import { expect } from 'chai';
import { SearchInputProps } from './search-input';

const defaultProps: SearchInputProps = {
	query: '',
	onSearch: () => null,
	onReset: () => null
};

describe('Search Input', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should render passed query', () => {
		const query = 'bob test';
		const comp = createSearchInput({...defaultProps, query });

		expect(comp.getQuery()).to.eql(query);
	});

	it('should call onSearch cb on query change correctly', () => {
		const onSearch = sinon.spy();
		const newQuery = 'bob bobo bobobobo';
		const comp = createSearchInput({...defaultProps, onSearch });

		expect(onSearch.called).to.eql(false);
		expect(comp.setQuery(newQuery));
		expect(onSearch.called).to.eql(true);
		expect(onSearch.lastCall.args).to.eql([newQuery]);
	});

	it('should disable input correctly', () => {
		const comp = createSearchInput({...defaultProps, disabled: true });

		expect(comp.isDisabled()).to.eql(true);
	});
});
