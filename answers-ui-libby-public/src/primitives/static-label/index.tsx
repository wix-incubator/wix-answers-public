import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';
import { smallXsmallGroup } from '../../avatars/group-avatar/group-icons';
import { Icon } from '../icon/icon';

export const StaticLabelKey = 'static-label';

export enum StaticLabelType {
	INFO = 1,
	NEUTRAL = 2,
	NEUTRALICON = 3,
}

export enum StaticLabelSize {
	SMALL = 1,
	MEDIUM = 2,
}

export type StaticLabelProps = {
	name: string;
	type: StaticLabelType;
	size: StaticLabelSize;

} & BaseProps;

export type StaticLabelState = {};

export class StaticLabel extends React.PureComponent<StaticLabelProps, StaticLabelState> {

	state: StaticLabelState = {};

	render () {
		const { props } = this;
		const size = StaticLabelSize[props.size].toLowerCase();
		const type = StaticLabelType[props.type].toLowerCase();
		const icon = props.type === StaticLabelType.NEUTRALICON && <Icon icon={smallXsmallGroup} />;

		const classNames = namespacedClassnames(StaticLabelKey, size, type, props.className);

		return (
			<div className={classNames}>
				{props.name}
				{icon}
			</div>
		);
	}
}
