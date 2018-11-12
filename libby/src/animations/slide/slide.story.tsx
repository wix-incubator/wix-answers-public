import * as React from 'react';
import { Toggle } from '../../primitives/toggle/toggle';
import { SlideAnimation } from './slide';

export class StoryOfSlide extends React.Component<any, any> {
	state = {
		isShowing: true
	};

	handleShowToggle (isShowing: boolean) {
		this.setState({isShowing});
	}

	render () {
		const handleShowToggle = this.handleShowToggle.bind(this);

		return (
			<div className='story-of-slide'>
				<Toggle value={this.state.isShowing} onChange={handleShowToggle} />
				<SlideAnimation show={this.state.isShowing}>
					<div>
						<div>I will do slide in and out!</div>
						<div>I will do slide in and out!</div>
						<div>I will do slide in and out!</div>
					</div>
				</SlideAnimation>
				<div>Some content</div>
			</div>
		);
	}
}
