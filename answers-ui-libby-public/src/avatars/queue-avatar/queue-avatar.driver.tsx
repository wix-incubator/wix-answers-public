import {getLegacyBaseDriverFromWrapper} from '../../common/base-driver';
import {renderAndMountComponent } from 'answers-toolkit';
import * as React from 'react';

import {QueueAvatarProps, QueueAvatar} from './queue-avatar';

export type QueueAvatarDriver = {
	getInitials: () => string;
	isProfileImgVisible: () => boolean;
	isInitialsVisible: () => boolean;
};

export const createQueueAvatarDriver = (wrapper: Element): QueueAvatarDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.queue-avatar', QueueAvatar.name);

	return {
		getInitials: () => baseDriver.find('.inner').getText(),
		isProfileImgVisible: () => baseDriver.isChildVisible('img'),
		isInitialsVisible: () => baseDriver.isChildVisible('initials'),
	};
};

export const createQueueAvatar = (props: QueueAvatarProps, children?: any): QueueAvatarDriver => {
	const element = renderAndMountComponent(<QueueAvatar {...props}>{children}</QueueAvatar>);
	return createQueueAvatarDriver(element);
};
