import {getLegacyBaseDriverFromWrapper} from '../../common/base-driver';
import {renderAndMountComponent } from 'answers-toolkit';
import * as React from 'react';

import {UserAvatarProps, UserAvatar} from './user-avatar';

export type UserAvatarLegacyDriver = {
	getInitials: () => string;
	isProfileImgVisible: () => boolean;
	isInitialsVisible: () => boolean;
	isUserBadgeVisible: () => boolean;
	getProfileImgUrl: () => string;
};

export const createUserAvatarLegacyDriver = (wrapper: Element): UserAvatarLegacyDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.user-avatar', UserAvatar.name);

	return {
		getInitials: () => baseDriver.find('.inner').getText(),
		isProfileImgVisible: () => baseDriver.isChildVisible('img'),
		isInitialsVisible: () => baseDriver.isChildVisible('initials'),
		isUserBadgeVisible: () => baseDriver.isChildVisible('.user-badge'),
		getProfileImgUrl: () => baseDriver.find('img').getAttribute('src') || ''
	};
};

export const createUserAvatar = (props: UserAvatarProps, children?: any): UserAvatarLegacyDriver => {
	const element = renderAndMountComponent(<UserAvatar {...props}>{children}</UserAvatar>);
	return createUserAvatarLegacyDriver(element);
};
