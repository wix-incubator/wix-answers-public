import * as React from 'react';
import { TabsContainer } from './tabs-container';
import { TabData } from '../../primitives/tabs/tabs';
import { Text } from '../../typography';
import { ContainerSection } from '../../primitives/container';

export class StoryOfTabsContainer extends React.Component<any, any> {
	demoTabItems = ['Channel Settings', 'Agent Tools', 'Spam & Security'];

	state = {
		selectedIndex: 0,
	};

	handleChange (key: string) {
		this.setState({ selectedIndex: parseInt(key, 10) });
	}

	render () {
		const tabItems: TabData[] = this.demoTabItems.map((item, idx) => ({element: item, key: `${idx}`}));

		const handleChange = this.handleChange.bind(this);

		const channelSettingsTab = (
			<ContainerSection>
				<Text>This is Channels Settings Tab</Text>
			</ContainerSection>
		);

		const agentToolsTab = (
			<ContainerSection>
				<Text>This is Agent Tools Tab</Text>
			</ContainerSection>
		);

		const spamAndSecurityTab = (
			<ContainerSection>
				<Text>This is Spam & Security Tab</Text>
			</ContainerSection>
		);

		const renderedTabs = [channelSettingsTab, agentToolsTab, spamAndSecurityTab];
		const selectedIndex = this.state.selectedIndex;

		return (
			<div>
				<TabsContainer tabItems={tabItems} tabSize={'large'} onChange={handleChange} selected={`${selectedIndex}`}>
					{renderedTabs[selectedIndex]}
				</TabsContainer>
			</div>
		);
	}
}
