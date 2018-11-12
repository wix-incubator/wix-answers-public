import * as React from 'react';
import {namespacedClassnames, AvatarUser} from '../../common';
import {BaseAvatar, AvatarSizes} from '../base-avatar/base-avatar';
import { UserBadgeIcon } from '../../icons/icons-components/user-badge';

export type UserAvatarProps = {
	user: AvatarUser;
	size?: AvatarSizes;
	isAgent?: boolean;
	className?: string;
};

export const getUserInitials = (user: AvatarUser) => {
	const firstName = user.firstName ? user.firstName : (user.fullName ? user.fullName.split(' ')[0] : '');
	const lastName = user.lastName ? user.lastName : (user.fullName ? user.fullName.split(' ')[1] : '');

	let firstLetter = '';
	let secondLetter = '';
	if (firstName) {
		firstLetter = firstName.slice(0, 1).toUpperCase();
		secondLetter = (lastName ? lastName.slice(0, 1).toUpperCase() : firstName.slice(1, 2)) || '';
	}

	return firstLetter ? (firstLetter + secondLetter) : '?';
};

export const UserBadge = (props: {size: AvatarSizes}) => {
	switch (props.size) {
		default:
		case 'normal':
			return <UserBadgeIcon size='normal'/>;

		case 'large':
		case 'xlarge':
			return <UserBadgeIcon size='large'/>;

		case 'small':
		case 'xsmall':
			return <UserBadgeIcon size='small'/>;
	}
};

export const UserAvatar = (props: UserAvatarProps) => {
	const avatarSize = props.size ? props.size : 'normal';
	const text = getUserInitials(props.user);
	const imgSrc = props.user.profileImage || '';
	const isAnon = (text === '?') ? 'anonymous' : '';
	const className = namespacedClassnames('user-avatar', isAnon, avatarSize, props.className);

	const isAgent = (props.isAgent !== undefined) ?
		props.isAgent : (props.user.isAgent !== undefined) ?
			props.user.isAgent : false;

	return (
		<div className={className}>
			<BaseAvatar className='avatar-inner' size={avatarSize} id={props.user.id} initials={text} imgSrc={imgSrc}/>
			{!isAgent ? <UserBadge size={avatarSize} /> : null}
		</div>
	);
};

export type UserAvatarOnBgProps = {
	user: AvatarUser;
	size?: 'normal' | 'large';
	isAgent?: boolean;
	className?: string;
};

export const UserAvatarOnBg = (props: UserAvatarProps) => {
	const size = props.size || 'normal';
	const className = namespacedClassnames('avatar-on-background');
	return <UserAvatar className={className} {...props} size={size}/>;
};
