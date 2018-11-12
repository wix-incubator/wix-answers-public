import * as React from 'react';
import { CatalogGroup } from '..';
import { AgentStatusIndicator, AgentStatusIndicatorProps } from '../..';
import { AvatarCallCenterAgentStatus } from '../../common';

export const statusIndicatorCatalogData: CatalogGroup<AgentStatusIndicatorProps> = {
	title: 'Status Indicator',
	render: (p) => (
		<>
			<AgentStatusIndicator {...p}/>
			<AgentStatusIndicator {...p} showGlow={true}/>
		</>
	),
	items: [
		{
			label: 'Online',
			props: {
				status: AvatarCallCenterAgentStatus.ONLINE
			}
		},
		{
			label: 'Offline',
			props: {
				status: AvatarCallCenterAgentStatus.OFFLINE
			}
		},
		{
			label: 'Busy',
			props: {
				status: AvatarCallCenterAgentStatus.BUSY
			}
		},
		{
			label: 'Talking',
			props: {
				status: AvatarCallCenterAgentStatus.TALKING
			}
		}
	]
};
