import {ToggleButton} from './toggle-button';
import * as React from 'react';

export class StoryOfToggleButton extends React.Component<any, any> {
	state = {
		buttonIsChecked: true
	};

	toggle = () => {
		const currentState = this.state.buttonIsChecked;
		this.setState({ buttonIsChecked: !currentState });
	}

	render () {
		return (
			<span className='row'>
				<div className='column'>
					<ToggleButton isChecked={this.state.buttonIsChecked} onClick={this.toggle}>Toggle Me!</ToggleButton>
				</div>
				<div className='column'>
					<ToggleButton isChecked={!this.state.buttonIsChecked} onClick={this.toggle} disabled={true}>Disabled</ToggleButton>
				</div>
			</span>
		);
	}
}
