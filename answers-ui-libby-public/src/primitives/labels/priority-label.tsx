import { BaseProps, namespacedClassnames, TicketPriority } from '../../common';
import * as React from 'react';

export enum PriorityLabelType {
	REGULAR = 1,
	REGULARICON = 2,
	SMALL = 3
}

export type PriorityLabelProps = {
	priority: TicketPriority;
	onToggle?: (priority: TicketPriority, e?: any) => void;
	toggled?: boolean;
	type?: PriorityLabelType;
} & BaseProps;

export const priorityLabelKey = 'priority-label';

export const PriorityLabel = ({ priority, className, toggled, onToggle, type}: PriorityLabelProps) => {
	const text = TicketPriority[priority].toLowerCase();
	const labelType = type
		? PriorityLabelType[type].toLowerCase() : PriorityLabelType[PriorityLabelType.REGULAR].toLowerCase();
	const filled = toggled !== false;
	const classNames =
		namespacedClassnames(priorityLabelKey, className, text, labelType, { filled, clickable: !!onToggle });

	const localOnToggle = onToggle ? (e: any) => onToggle(priority, e) : undefined;

	return <div data-priority={priority} className={classNames} onClick={localOnToggle}>{text}</div>;
};
