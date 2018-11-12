import {getLegacyBaseDriverFromWrapper} from '../../common/base-driver';
import {renderAndMountComponent } from 'answers-toolkit';
import * as React from 'react';

import {GroupAvatarProps, GroupAvatar} from './group-avatar';

export type GroupAvatarDriver = {
	getInitials: () => string;
	isProfileImgVisible: () => boolean;
	isInitialsVisible: () => boolean;
};

export const createGroupAvatarDriver = (wrapper: Element): GroupAvatarDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.group-avatar', GroupAvatar.name);

	return {
		getInitials: () => baseDriver.find('.inner').getText(),
		isProfileImgVisible: () => baseDriver.isChildVisible('img'),
		isInitialsVisible: () => baseDriver.isChildVisible('initials')
	};
};

export const createGroupAvatar = (props: GroupAvatarProps, children?: any): GroupAvatarDriver => {
	const element = renderAndMountComponent(<GroupAvatar {...props}>{children}</GroupAvatar>);
	return createGroupAvatarDriver(element);
};
