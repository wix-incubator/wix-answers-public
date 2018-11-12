import * as React from 'react';
import { Column } from '../../common/story-utils';
import { Container } from '../container/container';
import { Collapsible } from './collapsible';

export class StoryOfCollapsible extends React.Component<any, any> {
	state = {
		isOpen: false
	};

	toggleCollapsible (isOpen: boolean) {
		this.setState({isOpen});
	}

	render () {
		const handleCollapsibleToggle = (isOpen: boolean) => this.toggleCollapsible(isOpen);

		const collapsibleStyle = {
			padding: '0 5px'
		};

		return (
			<span className='row'>
				<Column>
					<Container>
						<Collapsible isOpen={this.state.isOpen} onToggle={handleCollapsibleToggle} title='Hello'>
							<div style={collapsibleStyle}>I am the content!</div>
						</Collapsible>
					</Container>
				</Column>
			</span>
		);
	}
}
