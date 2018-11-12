import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { AvatarSizes } from '../..';
import { AvatarCallCenterAgentStatus } from '../../common';

export type AgentStatusIndicatorProps = {
	status: AvatarCallCenterAgentStatus;
	showGlow?: boolean;
	size?: AvatarSizes;
};

export const AgentStatusIndicator = (props: AgentStatusIndicatorProps) => {
	const size = props.size || 'normal';
	const additionalClassNames = {
		'is-glowing': props.showGlow && props.status !== AvatarCallCenterAgentStatus.OFFLINE,
	};

	const classNames = namespacedClassnames('status-indicator', additionalClassNames, size);

	return (
		<span className={classNames} data-status={props.status}/>
	);
};
