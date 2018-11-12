import * as React from 'react';
import { getLegacyBaseDriverFromWrapper } from '../../common/base-driver';
import { renderAndMountComponent } from 'answers-toolkit';
import { createUserAvatarLegacyDriver } from '../user-avatar/user-avatar.legacy-driver';
import { CallCenterAvatar, CallCenterAvatarProps } from './call-center-avatar';
import { AvatarCallCenterAgentStatus } from '../../common';

export type CallCenterAvatarDriver = {
	getInitials: () => string;
	isProfileImgVisible: () => boolean;
	isStatusVisible: () => boolean;
	getStatus: () => AvatarCallCenterAgentStatus;
};

export const createCallCenterAvatarDriver = (wrapper: Element): CallCenterAvatarDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.call-center-avatar', CallCenterAvatar.name);
	const userAvatar = createUserAvatarLegacyDriver(wrapper);

	return {
		getInitials: () => userAvatar.getInitials(),
		isProfileImgVisible: () => userAvatar.isProfileImgVisible(),
		isStatusVisible: () => baseDriver.isChildVisible('.status-indicator'),
		getStatus: () => {
			return parseInt(baseDriver.find('.status-indicator').getDataAttr('status'), 10);
		}
	};
};

export const createCallCenterAvatar = (props: CallCenterAvatarProps): CallCenterAvatarDriver => {
	const element = renderAndMountComponent(<CallCenterAvatar {...props}/>);
	return createCallCenterAvatarDriver(element);
};
