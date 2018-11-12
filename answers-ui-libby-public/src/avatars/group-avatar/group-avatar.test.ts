import {expect} from 'chai';
// import * as sinon from 'sinon';

import * as driver from './group-avatar.driver';
import * as jsdomGlobal from 'jsdom-global';
import { AvatarGroupBuilder } from '../../common';

describe('Group avatar', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('shows initials for group without a avatar image', () => {
		const groupName = 'Bob Team';
		const group = new AvatarGroupBuilder()
			.withName(groupName)
			.build();

		const comp = driver.createGroupAvatar({group});
		expect(comp.getInitials()).to.eql('B');
		expect(comp.isProfileImgVisible()).to.eql(false);
	});

	it('shows NA for group without an image and a first/last name', () => {
		const group = new AvatarGroupBuilder()
			.withName('')
			.build();

		const comp = driver.createGroupAvatar({group});

		expect(comp.getInitials()).to.eql('NA');
		expect(comp.isProfileImgVisible()).to.eql(false);
	});
});
