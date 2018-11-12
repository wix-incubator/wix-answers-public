import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-lib';
import { reactUniDriver } from 'unidriver';
import { RoundNotification, RoundNotificationProps, RoundNotificationType } from '.';
import { createRoundNotificationDriver } from './driver';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testViewCompPropsCreator<RoundNotificationProps>(() => ({
	type: RoundNotificationType.ALERT,
	count: 5
}));

const setup = (partialProps: Partial<RoundNotificationProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<RoundNotificationProps>(RoundNotification, props);
	const baseDriver = reactUniDriver(elem);
	return createRoundNotificationDriver(baseDriver);
};

describe('RoundNotification', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('shows the count', async () => {
		const count = Math.floor(Math.random() * 100);
		const driver = setup({count});

		assert.equal(await driver.hasIcon(), false);
		assert.equal(await driver.count(), count);
	});

	it('shows checkmark icon for check type', async () => {
		const type = RoundNotificationType.CHECK;
		const driver = setup({type});
		assert.equal(await driver.hasIcon(), true);
	});
});
