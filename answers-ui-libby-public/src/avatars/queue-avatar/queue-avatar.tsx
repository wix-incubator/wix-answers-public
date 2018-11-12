import * as React from 'react';
import {namespacedClassnames, AvatarQueue} from '../../common';
import {BaseAvatar, AvatarSizes} from '../base-avatar/base-avatar';
import { QueueIconMap } from './queue-icons';
import { Icon } from '../..';

export type QueueAvatarProps = {
	queue: AvatarQueue;
	size?: AvatarSizes
};

export const getQueueInitials = (name: string): string => {
	const maxLetters = 1;
	const initials = name.split(' ')
		.reduce((result: string, currentWord: string, idx: number) => {
			return idx >= maxLetters ? result : `${result}${currentWord.substring(0, 1).toUpperCase()}`;
		}, '');

	return initials.length ? initials : 'NA';
};

export const QueueAvatar = (props: QueueAvatarProps) => {
	const queue = props.queue;
	const text = getQueueInitials(queue.name);
	const size = props.size || 'normal';
	const className = namespacedClassnames('queue-avatar', size);

	return (
		<div className={className}>
			<BaseAvatar size={size} id={queue.id} initials={text}/>
			<Icon icon={QueueIconMap[size]} />
		</div>
	);
};
