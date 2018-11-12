import * as React from 'react';
import { Toggle } from '../../primitives/toggle/toggle';
import { HeightAnimation } from './height';

export class StoryOfHeight extends React.Component<any, any> {
	state = {
		isShowing: true
	};

	handleShowToggle (isShowing: boolean) {
		this.setState({isShowing});
	}

	render () {
		const handleShowToggle = this.handleShowToggle.bind(this);

		return (
			<div className='story-of-height'>
				<Toggle value={this.state.isShowing} onChange={handleShowToggle} />
				<HeightAnimation show={this.state.isShowing}>
					<div>
						<div>We must have a parent, and we will do height!</div>
						<div>We must have a parent, and we will do height!</div>
						<div>We must have a parent, and we will do height!</div>
					</div>
				</HeightAnimation>
				<div>
					Something under the animated content...
				</div>
			</div>
		);
	}
}
