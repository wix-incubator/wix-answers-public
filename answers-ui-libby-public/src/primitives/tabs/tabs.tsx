import { namespacedClassnames, BaseProps } from '../../common';
import * as React from 'react';
import { Tooltip } from '../tooltip/tooltip';

export type TabData = {
	element: any;
	key: string;
	disabled?: boolean;
	disabledTooltip?: string;
};

export type TabSize = 'normal' | 'large';

export const tabsKey = 'tabs';

export type TabsProps = {
	items: TabData[];
	selected: string;
	size?: TabSize;
	onChange: (newKey: string) => void;
} & BaseProps;

type TabProps = {
	selected: boolean;
	onSelect: () => void;
	disabled?: boolean;
} & BaseProps;

const Tab = (props: TabProps) => {
	const className = namespacedClassnames('tab', {selected: props.selected, disabled: props.disabled});
	return <div className={className} onClick={props.onSelect}>{props.children}</div>;
};

export const Tabs = (props: TabsProps) => {
	const className = namespacedClassnames(tabsKey, props.size || '', props.className || '');

	const onChangeTab = (tab: TabData) => () => {
		if (!tab.disabled) {
			props.onChange(tab.key);
		}
	};

	const createTab = (tab: TabData) => {
		const isSelected = props.selected.includes(tab.key);
		const tabElement = tab.disabled && tab.disabledTooltip ? (
			<Tooltip body={tab.disabledTooltip}>
				{tab.element}
			</Tooltip>
		) : tab.element;

		return (
			<Tab
				key={tab.key}
				selected={isSelected}
				onSelect={onChangeTab(tab)}
				disabled={tab.disabled}
			>
				{tabElement}
			</Tab>
		);
	};
	return <div className={className}>{props.items.map(createTab)}</div>;
};
