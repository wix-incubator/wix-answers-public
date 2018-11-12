
import { expect } from 'chai';
import * as jsdomGlobal from 'jsdom-global';
import { createLink } from './link.driver';

describe('Link', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('shows external link correctly', () => {
		const href = '/bob';
		const children = 'bob children';
		const props = {href, children};
		const comp = createLink(props);
		expect(comp.getType()).to.eql('html');
		expect(comp.getText()).to.eql(children);
		expect(comp.hasArrow()).to.eql(true);
	});

	it('shows internal link correctly', () => {
		const to = '/bob';
		const children = 'router children';
		const props = {to, children};
		const comp = createLink(props);
		expect(comp.getType()).to.eql('rr');
		expect(comp.getText()).to.eql(children);
		expect(comp.hasArrow()).to.eql(false);
	});
});
