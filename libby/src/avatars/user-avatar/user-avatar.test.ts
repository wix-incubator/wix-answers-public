import {expect} from 'chai';
// import * as sinon from 'sinon';

import * as driver from './user-avatar.legacy-driver';
import * as jsdomGlobal from 'jsdom-global';
import { AvatarUserBuilder } from '../../common';

describe('user avatar', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should show initials for user without a profile image', () => {
		const firstName = 'Bob';
		const lastName = 'Stone';
		const user = new AvatarUserBuilder()
			.withProfileImage('')
			.withFirstName(firstName)
			.withLastName(lastName)
			.build();

		const comp = driver.createUserAvatar({user});

		expect(comp.getInitials()).to.eql('BS');
		expect(comp.isProfileImgVisible()).to.eql(false);
	});

	it('should show profile img if available', () => {
		const user = new AvatarUserBuilder().build();
		const comp = driver.createUserAvatar({user});

		expect(comp.isProfileImgVisible()).to.eql(true);
		expect(comp.getProfileImgUrl()).to.eql(user.profileImage);
		expect(comp.isInitialsVisible()).to.eql(false);
	});

	it('should show initials for user without an image and a first/last name', () => {
		const displayName = 'Bobsville';
		const user = new AvatarUserBuilder()
			.withFullName(displayName)
			.withProfileImage('')
			.withFirstName('')
			.withLastName('')
			.build();

		const comp = driver.createUserAvatar({user});

		expect(comp.getInitials()).to.eql('Bo');
		expect(comp.isProfileImgVisible()).to.eql(false);
	});

	it('should show ? for user without an image and a first/last/display name', () => {
		const user = new AvatarUserBuilder()
			.withProfileImage('')
			.withFirstName('')
			.withLastName('')
			.withFullName('')
			.build();

		const comp = driver.createUserAvatar({user});
		expect(comp.getInitials()).to.eql('?');
		expect(comp.isProfileImgVisible()).to.eql(false);
	});

	it('should show/hide userBadge if user is/not agent', () => {
		const agent = new AvatarUserBuilder().withIsAgent(true).build();
		const user = new AvatarUserBuilder().withIsAgent(false).build();
		const compUser = driver.createUserAvatar({user});
		const compAgent = driver.createUserAvatar({user: agent});

		expect(compUser.isUserBadgeVisible()).to.eql(true);
		expect(compAgent.isUserBadgeVisible()).to.eql(false);
	});

	it('should show userBadge if user isAgent field is missing and no prop isAgent was passed', () => {
		const user = new AvatarUserBuilder().build();
		// tslint:disable-next-line:no-string-literal
		delete user['isAgent'];

		const compUser = driver.createUserAvatar({user});
		expect(compUser.isUserBadgeVisible()).to.eql(true);
	});

	it('should show/hide userBadge if passing isAgent prop', () => {
		const agent = new AvatarUserBuilder().withIsAgent(true).build();
		const user = new AvatarUserBuilder().withIsAgent(false).build();
		const compUser = driver.createUserAvatar({user, isAgent: true});
		const compAgent = driver.createUserAvatar({user: agent, isAgent: false});

		expect(compUser.isUserBadgeVisible()).to.eql(false);
		expect(compAgent.isUserBadgeVisible()).to.eql(true);
	});

	// tslint:disable-next-line:no-skipped-tests
	it.skip('should show initials when an invalid image url is given', async () => {
		const firstName = 'Bob';
		const lastName = 'Stone';
		const user = new AvatarUserBuilder()
			.withProfileImage('invalidURL')
			.withFirstName(firstName)
			.withLastName(lastName)
			.build();

		const comp = driver.createUserAvatar({user});

		const testPromise = new Promise((resolve, _) => {
			return setTimeout(() => {
				resolve();
			}, 1000);
		});

		await testPromise;

		expect(comp.getInitials()).to.equal('BS');
		expect(comp.isProfileImgVisible()).to.eql(false);
	});
});
