import * as React from 'react';
import { assert } from 'chai';
import * as jsdomGlobal from 'jsdom-global';
import { Popover } from './popover';
import { noop } from '../../common';
import { renderAndMountComponent, eventually } from 'answers-lib';
import { popoverDriver } from './driver';
import { reactUniDriver } from 'unidriver';

describe('Popover', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	const SomePopover = (body: any, open: boolean, outerClick: any = noop) => {
		return <Popover body={body} isOpen={open} onOuterAction={outerClick}><div>Thing</div></Popover>;
	};
	const someBody = <div>Bob</div>;

	it('shows body when open', async () => {
		const comp = SomePopover(someBody, true);
		renderAndMountComponent(comp);
		const bd = reactUniDriver(document.body);

		const driver = popoverDriver(bd);

		return eventually(async () => {
			assert.equal(await driver.text(), 'Bob');
			assert.equal(await driver.exists(), true);
		});

	});

	it('does not show body when not open', async () => {
		const comp = SomePopover(someBody, false);
		renderAndMountComponent(comp);
		const bd = reactUniDriver(document.body);

		const driver = popoverDriver(bd);
		assert.equal(await driver.exists(), false);
	});

});
