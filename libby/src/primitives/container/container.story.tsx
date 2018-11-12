import * as React from 'react';
import { Container, ContainerSection } from '.';
import { Text } from '../../typography';
import { LargeTitle } from '../../typography/titles/titles';
import { SettingsContainerSection } from './container-sections/settings-container-section';
import { HollowButton } from '../..';
import { noop } from '../../common';
import { Toggle } from '../toggle/toggle';
import { Link } from '../link/link.comp';

export class StoryOfContainer extends React.Component<any, any> {
	state = {
		isToggled: true
	};

	onToggle = () => this.setState({isToggled: !this.state.isToggled});

	render () {
		return (
			<div>
				<h5 className='h5-title'>Container with default container sections</h5>
				<Container className='test-container more test'>
					<ContainerSection className='section-test'>
						<LargeTitle>Upper container</LargeTitle>
						<Text>
							This is the upper section of the container
						</Text>
					</ContainerSection>
					<ContainerSection>
						<LargeTitle>Lower container</LargeTitle>
						<Text>
							This is the lower section of the container
						</Text>
					</ContainerSection>
				</Container>
				<h5 className='h5-title'>Container with SettingsContainerSection</h5>
				<Container className='test-container more test'>
					<SettingsContainerSection title='Title & Description' description='A description for this thing'>
						<HollowButton onClick={noop}>Edit</HollowButton>
					</SettingsContainerSection>
					<SettingsContainerSection title='Just Title'>
						<HollowButton onClick={noop}>Edit</HollowButton>
					</SettingsContainerSection>
					<SettingsContainerSection
						title='Many Actions'
						description='This is a description text for a settings container section that contains toggles and buttons'
					>
						<Link href='http://www.wixanswers.com' target='_blank'>www.wixanswers.com</Link>
						<Toggle value={this.state.isToggled} onChange={this.onToggle}/>
						<HollowButton onClick={noop}>Edit</HollowButton>
					</SettingsContainerSection>
				</Container>
				<Container secondary={true}>
					<ContainerSection>
						<Text>Secondary container!</Text>
					</ContainerSection>
				</Container>
			</div>
		);
	}
}
