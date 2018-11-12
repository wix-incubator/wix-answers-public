import {namespacedClassnames} from '../../common';
import {Toggle} from '../../primitives/toggle/toggle';
import * as React from 'react';
import { HeightAnimation } from '../../animations/height/height';

export type ControlledComp<T> = {
	value: T,
	onChange: (newValue: T) => void
};

export type CollapsibleToggleValue = {
	toggled: boolean;
	expanded: boolean;
};

export type CollapsbileToggleProps = {
	title: string;
	disabled?: boolean;
	children?: any;
} & ControlledComp<CollapsibleToggleValue>;

export const CollapsbileToggle = (props: CollapsbileToggleProps) => {
	const val = props.value;
	const disabled = props.disabled;

	const classNames = namespacedClassnames('collapsible-toggle', {on: val.toggled, expanded: val.expanded});

	const toggleCollapse = () => {
		props.onChange({...val, expanded: !val.expanded});
	};

	const toggle = () => {
		const shouldCollapse = val.expanded && val.toggled;
		const expanded = shouldCollapse ? false : val.expanded;

		props.onChange({expanded, toggled: !val.toggled});
	};

	return (
		<span className={classNames}>
			<div className='collapsible-header'>
				<span className='header-title' onClick={toggleCollapse}>{props.title}</span>
				<span className='toggle-wrapper'><Toggle value={val.toggled} onChange={toggle} disabled={disabled}/></span>
			</div>
			<div className='collapsible-body'>
				<HeightAnimation show={val.expanded}>
					<div className='body-wrapper'>{props.children}</div>
				</HeightAnimation>
			</div>
		</span>
	);
};
