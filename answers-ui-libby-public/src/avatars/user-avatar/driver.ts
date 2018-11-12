import { UniDriver } from 'unidriver';

export type UserAvatarDriver = {
	getInitials: () => Promise<string>;
	isProfileImgVisible: () => Promise<boolean>;
	isInitialsVisible: () => Promise<boolean>;
	isUserBadgeVisible: () => Promise<boolean>;
	getProfileImgUrl: () => Promise<string>;
};

export const createUserAvatarDriver = (wrapper: UniDriver): UserAvatarDriver => {
	const base = wrapper.$(`.user-avatar`);
	return {
		getInitials: () => base.$('.inner').text(),
		isProfileImgVisible: () => base.$('img').exists(),
		isInitialsVisible: () => base.$('initials').exists(),
		isUserBadgeVisible: () => base.$('.user-badge').exists(),
		getProfileImgUrl: async () => base.$('img').attr('src') || '',
	};
};
