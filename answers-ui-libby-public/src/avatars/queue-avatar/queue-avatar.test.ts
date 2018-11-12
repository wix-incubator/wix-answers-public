import {expect} from 'chai';
// import * as sinon from 'sinon';

import * as driver from './queue-avatar.driver';
import * as jsdomGlobal from 'jsdom-global';
import { AvatarQueueBuilder } from '../../common';

describe('Queue avatar', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('shows initials for queue without a avatar image', () => {
		const queueName = 'Bob Team';
		const queue = new AvatarQueueBuilder()
			.withName(queueName)
			.build();

		const comp = driver.createQueueAvatar({queue});
		expect(comp.getInitials()).to.eql('B');
		expect(comp.isProfileImgVisible()).to.eql(false);
	});

	it('shows NA for queue without an image and a first/last name', () => {
		const queue = new AvatarQueueBuilder()
			.withName('')
			.build();

		const comp = driver.createQueueAvatar({queue});

		expect(comp.getInitials()).to.eql('NA');
		expect(comp.isProfileImgVisible()).to.eql(false);
	});
});
