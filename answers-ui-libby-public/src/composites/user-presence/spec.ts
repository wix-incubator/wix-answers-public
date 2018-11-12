import { assert } from 'chai';
import { cleanPopovers, testViewCompPropsCreator, renderAndMountComp } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';
import { UserPresenceProps, UserPresence, PresenceType } from '.';
import { createUserPresenceDriver } from './driver';
import * as jsdomGlobal from 'jsdom-global';
import { AvatarUserBuilder } from '../../common';

const propsCreator = testViewCompPropsCreator<UserPresenceProps>(() => ({
	presenceUserData: [],
}));

const setup = (partialProps: Partial<UserPresenceProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<UserPresenceProps>(UserPresence, props);
	const baseDriver = reactUniDriver(elem);
	return createUserPresenceDriver(baseDriver);
};

describe('UserPresence', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('shows active user avatar in case of single user', async () => {
		const users = [new AvatarUserBuilder().withProfileImage('').build()];
		const presenceUserData = users.map((u) => ({ user: u, type: PresenceType.VIEWING }));
		const driver = setup({ presenceUserData });
		const expectedInitials = `${users[0].firstName[0].toUpperCase()}${users[0].lastName[0].toUpperCase()}`;

		assert.equal(await driver.activeUserInitials(), expectedInitials);
	});

	it('shows multi user state with presence type', async () => {
		const users = [
			new AvatarUserBuilder().withProfileImage('').build(),
			new AvatarUserBuilder().build(),
			new AvatarUserBuilder().build()
		];
		const expectedInitials = `${users[0].firstName[0].toUpperCase()}${users[0].lastName[0].toUpperCase()}`;
		const type = PresenceType.TALKING;
		const presenceUserData = users.map((u) => ({ user: u, type }));
		const driver = setup({ presenceUserData, showText: true });
		const diff = users.length - 1;

		assert.equal(await driver.activeUserInitials(), expectedInitials);
		assert.equal(await driver.activeAdditionalUsers(), `+${diff}`);
		assert.include(await driver.presenceType(), type.toString());
	});

	it('shows additional users list when there are multiple users', async () => {
		cleanPopovers();
		const users = [
			new AvatarUserBuilder().withProfileImage('').build(),
			new AvatarUserBuilder().withFullName('yossi haba').withId('1').build(),
			new AvatarUserBuilder().withFullName('chinggis khan').withId('2').build(),
		];
		const type = PresenceType.TALKING;
		const presenceUserData = users.map((u) => ({ user: u, type }));
		const driver = setup({ presenceUserData });

		assert.deepEqual(await driver.additionalUsersList(), ['Agents Viewing:', 'yossi haba', 'chinggis khan']);
	});

	it('shows additional users list when there are multiple users', async () => {
		const users = [
			new AvatarUserBuilder().withProfileImage('').build(),
		];
		const type = PresenceType.VIEWING;
		const presenceUserData = users.map((u) => ({ user: u, type }));
		const driver = setup({ presenceUserData });

		assert.deepEqual(await driver.hasPresenceType('viewing'), true);
	});
});
