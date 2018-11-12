import * as React from 'react';
import { TabData, TabSize, Tabs } from '../../primitives/tabs/tabs';
import { BaseProps } from '../../common';
import { Container } from '../../primitives/container/container';
import { namespacedClassnames } from '../../common/namespace-classes';

export type TabsContainerProps = {
	tabItems: TabData[];
	selected: string;
	tabSize?: TabSize;
	onChange: (key: string) => void;
} & BaseProps;

export const TabsContainer = (props: TabsContainerProps) => {
	const handleTabChange = (selectedTabKey: string) => {
		props.onChange(selectedTabKey);
	};

	const classNames = namespacedClassnames('tabs-container', props.className);

	return (
		<div className={classNames}>
			<Container>
				<Tabs items={props.tabItems} size={props.tabSize} onChange={handleTabChange} selected={props.selected} />
				{props.children}
			</Container>
		</div>
	);
};
