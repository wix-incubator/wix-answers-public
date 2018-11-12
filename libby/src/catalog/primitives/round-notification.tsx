import * as React from 'react';
import { CatalogGroup } from '..';
import { RoundNotification, RoundNotificationProps } from '../..';
import { RoundNotificationType } from '../../primitives';

export const roundNotificationCatalogData: CatalogGroup<RoundNotificationProps> = {
	title: 'Round Notification',
	render: (p) => <RoundNotification {...p}/>,
	items: [
		{
			label: 'Alert',
			props: {
				type: RoundNotificationType.ALERT,
				count: 4
			}
		},
		{
			label: 'Check',
			props: {
				type: RoundNotificationType.CHECK,
				count: 4
			}
		},
		{
			label: 'Info',
			props: {
				type: RoundNotificationType.INFO,
				count: 4
			}
		}
	]
};
