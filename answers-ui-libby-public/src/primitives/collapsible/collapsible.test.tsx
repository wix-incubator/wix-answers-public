import * as jsdomGlobal from 'jsdom-global';
import * as driver from './collapsible.driver';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { CollapsibleProps } from './collapsible';
import { noop } from 'answers-toolkit';
import * as React from 'react';

describe('Collapsible', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('Should show the collapsible title with content open, and call cb on toggle', () => {
		const onToggle = sinon.spy();
		const props: CollapsibleProps = {
			isOpen: true,
			onToggle,
			title: 'Bolabar'
		};

		const comp = driver.createCollapsible(props);

		expect(comp.getTitle()).to.eql(props.title);
		expect(onToggle.called).to.eql(false);
		expect(comp.isOpen()).to.eql(true);
		comp.toggle();
		expect(onToggle.called).to.eql(true);
		expect(onToggle.lastCall.args).to.eql([false]);
	});

	it('renders tsx header too', () => {
		const props: CollapsibleProps = {
			isOpen: true,
			onToggle: noop,
			title: <span>Bob</span>
		};
		const comp = driver.createCollapsible(props);

		expect(comp.getTitle()).to.eql('Bob');
	});
});
