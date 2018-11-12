import * as React from 'react';
import { RoundNotificationType, RoundNotification } from '.';

const notificationTypes = [
	RoundNotificationType.INFO, RoundNotificationType.ALERT, RoundNotificationType.WARNING, RoundNotificationType.CHECK
];
const highNumbersLowPriorities = [RoundNotificationType.INFO];

export class RoundNotificationStory extends React.Component<any, any> {
	state: any = {};

	render () {

		// tslint:disable-next-line:max-line-length
		const roundNotification = (count: number, type: RoundNotificationType) => (
				<RoundNotification
					count={count}
					type={type}
				/>
		);

		return (
			<div>
				<h5 className='h5-title'>All colors</h5>
				<div className={'row'}>
					{notificationTypes.map((type, idx) => <div key={idx} className={'column'}>{roundNotification(2, type)}</div>)}
				</div>
				<h5 className='h5-title'>High Number</h5>
				<div>
					{highNumbersLowPriorities.map((type) => roundNotification(231, type))}
				</div>
			</div>
		);
	}
}
