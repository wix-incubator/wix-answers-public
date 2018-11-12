import * as React from 'react';
import {namespacedClassnames, AvatarGroup} from '../../common';
import { BaseAvatar, AvatarSizes } from '../base-avatar/base-avatar';
import { Icon } from '../..';
import { GroupIconMap } from './group-icons';

export type GroupAvatarProps = {
	group: AvatarGroup;
	size?: AvatarSizes
};

export const getGroupInitials = (group: AvatarGroup): string => {
	const initials = group.name.split(' ')
		.reduce((result: string, currentWord: string, idx: number) => {
			return idx >= 1 ? result : `${result}${currentWord.substring(0, 1).toUpperCase()}`;
		}, '');

	return initials.length ? initials : 'NA';
};

export const GroupAvatar = (props: GroupAvatarProps) => {
	const group = props.group;
	const text = getGroupInitials(group);
	const size = props.size || 'normal';
	const className = namespacedClassnames('group-avatar', size);
	return (
		<div className={className}>
			<BaseAvatar size={size} id={group.id} initials={text}/>
			<Icon icon={GroupIconMap[props.size || 'normal']} />
		</div>
	);
};
