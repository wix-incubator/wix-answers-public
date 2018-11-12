import * as React from 'react';
import { AgentStatusIndicator } from '../../primitives/status-indicator/status-indicator';
import { AvatarSizes } from '../base-avatar/base-avatar';
import { namespacedClassnames } from '../../common/namespace-classes';
import { UserAvatar } from '../user-avatar/user-avatar';
import { AvatarCallCenterAgentStatus, AvatarUser } from '../../common';

export type CallCenterAvatarProps = {
	user: AvatarUser;
	status?: AvatarCallCenterAgentStatus;
	size?: AvatarSizes;
};

export const CallCenterAvatar = (props: CallCenterAvatarProps) => {
	const user = props.user;
	const size = props.size || 'normal';

	const classNames = namespacedClassnames('call-center-avatar', size);

	return (
		<div className={classNames}>
			<UserAvatar user={user} size={size} isAgent={true}/>
			{props.status ? <AgentStatusIndicator status={props.status} size={size}/> : null}
		</div>
	);
};
