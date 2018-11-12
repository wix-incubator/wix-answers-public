import * as React from 'react';
import { Toggle } from '../../primitives/toggle/toggle';
import { OpacityAnimation } from './opacity';

export class StoryOfOpacity extends React.Component<any, any> {
	state = {
		isShowing: true
	};

	handleShowToggle (isShowing: boolean) {
		this.setState({isShowing});
	}

	render () {
		const handleShowToggle = this.handleShowToggle.bind(this);

		return (
			<div className='story-of-opacity'>
				<Toggle value={this.state.isShowing} onChange={handleShowToggle} />
				<OpacityAnimation show={this.state.isShowing}>
					<div>I will do opacity in and out!</div>
					<div>I will do opacity in and out!</div>
					<div>I will do opacity in and out!</div>
				</OpacityAnimation>
			</div>
		);
	}
}
