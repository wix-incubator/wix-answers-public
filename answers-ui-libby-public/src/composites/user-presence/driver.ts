import { UniDriver, reactUniDriver } from 'unidriver';
import { createUserAvatarDriver, popoverDriver } from '../../drivers';
import { UserPresenceKey } from '.';

export type UserPresenceDriver = {
	activeUserInitials: () => Promise<string>,
	presenceType: () => Promise<string>,
	hasPresenceType: (type: string) => Promise<boolean>,
	activeAdditionalUsers: () => Promise<string>,
	additionalUsersList: () => Promise<string[]>,
	base: UniDriver
};

export const createUserPresenceDriver = (wrapper: UniDriver): UserPresenceDriver => {
	const base = wrapper.$(`.${UserPresenceKey}`);
	return {
		activeUserInitials: () => createUserAvatarDriver(base).getInitials(),
		presenceType: () => base.$('.type').text(),
		hasPresenceType: (type) => 	base.$(`.${type}`).exists(),
		activeAdditionalUsers: () => base.$('.additional-users-avatar').text(),
		additionalUsersList: async () => {
			await base.$('.presence-avatars').click();
			const additionalUsersPopover = popoverDriver(reactUniDriver(document.body));
			return additionalUsersPopover.$$('.text').text();
		},
		base
	};
};
