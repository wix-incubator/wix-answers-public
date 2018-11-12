import * as React from 'react';
import { namespacedClassnames } from '../../common';
import { iconsMap } from '../../icons';
import { Icon } from '../icon/icon';

export const roundNotificationKey = 'round-notification';

export type RoundNotificationProps = {
	type: RoundNotificationType;
	count?: number;
};

export enum RoundNotificationType {
	INFO = 1,
	ALERT = 2,
	WARNING = 3,
	CHECK = 4
}

export type RoundNotificationState = {};

export class RoundNotification extends React.Component<RoundNotificationProps, RoundNotificationState> {

	state: RoundNotificationState = {};

	// tp: TranslateFn = (key, params) => {
	// 	return this.props.t(`${translationPrefix}.${key}`, params);
	// }

	render () {
		const { props } = this;

		const count = props.count || 0;

		const notificationType = RoundNotificationType[props.type].toLowerCase();
		const maybeHighNumber = count > 9;
		const classNames = namespacedClassnames(roundNotificationKey, notificationType, { high: maybeHighNumber });

		const body = props.type === RoundNotificationType.CHECK
			? <Icon icon={iconsMap.checkMark} />
			: count;

		return (
			<div className={classNames}>
				<div className={'count'}>{body}</div>
			</div>
		);
	}
}
