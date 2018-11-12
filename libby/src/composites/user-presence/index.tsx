import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps, AvatarUser } from '../../common';
import { UserAvatar } from '../../avatars';
import { classNames, TranslateFn } from 'answers-lib';
import { Popover } from '../../primitives';
import { Text } from '../../typography';

export const UserPresenceKey = 'user-presence';

export enum PresenceType {
	VIEWING = 0,
	TYPING = 1,
	TALKING = 2,
}

export type PresenceUserData = {
	user: AvatarUser;
	type: PresenceType;
};

export type UserPresenceProps = {
	presenceUserData: PresenceUserData[];
	t: (key: string, params?: any) => string;
	showText?: boolean;
} & BaseProps;

export type UserPresenceState = {
	isAdditionalUsersOpen: boolean,
};

export class UserPresence extends React.PureComponent<UserPresenceProps, UserPresenceState> {

	state: UserPresenceState = {
		isAdditionalUsersOpen: false,
	};

	tp: TranslateFn = (key, params) => {
		return this.props.t(`${UserPresenceKey}.${key}`, params);
	}

	toggleAdditionalUsers = () => {
		this.state.isAdditionalUsersOpen
			? this.setState({ isAdditionalUsersOpen: false })
			: this.setState({ isAdditionalUsersOpen: true });
	}

	renderAdditionalUsers = (additionalUsers: PresenceUserData[]) => (
		additionalUsers.map((au) => (
			<li key={au.user.id}>
				<UserAvatar user={au.user} size={'xsmall'} />
				<Text type='t1a'>{au.user.fullName}</Text>
			</li>
		))
	)

	render () {
		const { props, state, tp } = this;
		const showText = !!props.showText;
		const diff = props.presenceUserData.length - 1;
		const { type, user } = props.presenceUserData[0];
		const additionalUsers = diff > 0 ? props.presenceUserData.filter((_, i) => i !== 0) : [];

		const additionalUsersList = (
			<ul className='additional-users'>
				<li><Text className='type' type='t4a'>{'Agents Viewing:'}</Text></li>
				{this.renderAdditionalUsers(additionalUsers)}
			</ul>);

		const classes = {
			viewing: type === PresenceType.VIEWING,
			talking: type === PresenceType.TALKING,
			typing: type === PresenceType.TYPING
		};

		const presenceAvatars = (
			<div
				className={namespacedClassnames('presence-avatars', { clickable: diff > 0 })}
				onClick={this.toggleAdditionalUsers}
			>
				<UserAvatar className={namespacedClassnames(classes)} user={user} size={'xsmall'} />
				{diff > 0 ? <span className='additional-users-avatar'><span>{`+${diff}`}</span></span> : null}
			</div>
		);

		const presenceAvatarsWithPopover = (
			<Popover
				isOpen={state.isAdditionalUsersOpen}
				body={additionalUsersList}
				onOuterAction={this.toggleAdditionalUsers}
				preferPlace='above'
			>
				{presenceAvatars}
			</Popover>
		);

		const presenceText = (
			<div className={classNames('presence-text', { multi: diff > 0 })}>
				{diff === 0 ? <Text className='name' type='t4a'>{props.presenceUserData[0].user.firstName}</Text> : null}
				<Text className='type' type='t4a'>{tp(`type.${type}`)}</Text>
				<span className='dots'>...</span>
			</div>
		);

		return (
			<div className={namespacedClassnames(UserPresenceKey, props.className)}>
				{diff > 0 ? presenceAvatarsWithPopover : presenceAvatars}
				{showText && presenceText}
			</div>
		);
	}
}
