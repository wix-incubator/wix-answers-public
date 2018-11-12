
import { expect } from 'chai';
import * as jsdomGlobal from 'jsdom-global';
import { createNavButton } from './base-nav-button.driver';

describe('Nav Button', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('shows external navButton correctly', () => {
		const href = '/bob';
		const children = 'bob children';
		const props = {href, children};
		const comp = createNavButton(props, 'primary');
		expect(comp.getType()).to.eql('html');
		expect(comp.getText()).to.eql(children);
		expect(comp.hasArrow()).to.eql(true);
	});

	it('shows internal navButton correctly', () => {
		const to = '/bob';
		const children = 'router children';
		const props = {to, children};
		const comp = createNavButton(props, 'hollow');
		expect(comp.getType()).to.eql('rr');
		expect(comp.getText()).to.eql(children);
		expect(comp.hasArrow()).to.eql(false);
	});
});
