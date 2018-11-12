import * as React from 'react';
import { ColorPicker } from './color-picker.comp';
import { Container } from '../..';

export class StoryOfColorPicker extends React.PureComponent<{}, {}> {
	state = {
		value: '#3899ec',
		isOpen: false
	};

	onChange = (value: string) => this.setState({value});

	render () {
		const t = () => 'Invalid HEX color';

		return (
			<div style={{width: '170px'}}>
				<Container>
					<ColorPicker value={this.state.value} onChange={this.onChange} t={t}/>
				</Container>
			</div>
		);
	}
}
