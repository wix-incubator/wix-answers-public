import * as jsdomGlobal from 'jsdom-global';
import * as driver from './call-center-avatar.driver';
import { expect } from 'chai';
import { AvatarCallCenterAgentStatus, AvatarUserBuilder } from '../../common';

describe('Call Center Avatar', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('Should show initials and status for agent without profile picture', () => {
		const firstName = 'Agent';
		const lastName = 'Bob';
		const status = AvatarCallCenterAgentStatus.TALKING;
		const agent = new AvatarUserBuilder()
			.withFirstName(firstName)
			.withLastName(lastName)
			.withProfileImage('')
			.build();

		const size = 'normal';

		const comp = driver.createCallCenterAvatar({ user: agent, status, size});

		expect(comp.isProfileImgVisible()).to.eql(false);
		expect(comp.isStatusVisible()).to.eql(true);
		expect(comp.getInitials()).to.eql('AB');
		expect(comp.getStatus()).to.eql(status);
	});

	it('should hide status if no status is passed', () => {
		const agent = new AvatarUserBuilder().build();
		const comp = driver.createCallCenterAvatar({user: agent, size: 'normal'});

		expect(comp.isStatusVisible()).to.eql(false);
	});
});
