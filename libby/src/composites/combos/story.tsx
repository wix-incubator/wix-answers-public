import * as React from 'react';

import {Text, Collapsible, Container} from '../..';

export class CombosStory extends React.PureComponent <any, any> {
	state = {
		open: true
	};

	toggle = () => this.setState({open: !this.state.open});
	render () {
		return (
			<div className='story-container'>
				<Text type='h1'>Secondary Container + Collapsible</Text>
				<Container secondary={true}>
						<Collapsible title='Title!' isOpen={this.state.open} onToggle={this.toggle}>
							Bob
						</Collapsible>
				</Container>
			</div>);
	}
}
