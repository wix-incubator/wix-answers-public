import { Column } from '../../common/story-utils';
import {RadioGroup, RadioButton, RadioValue} from './radio-group';
import * as React from 'react';

export enum Bob {
	HI,
	HELLO,
	BYE
}

const noOp: () => null = () => null;

export class StoryOfRadioGroup extends React.Component<any, any> {
	state = {
		selectedValue1: Bob.HI,
		selectedValue2: Bob.HI
	};

	render () {
		const onRadioSelect1 = (val: RadioValue) => {
			this.setState({selectedValue1: val});
		};

		const onRadioSelect2 = (val: RadioValue) => {
			this.setState({selectedValue2: val});
		};

		return (
			<span className='row'>
				<Column title='Default Example'>
					<RadioGroup onChange={onRadioSelect1} selectedValue={this.state.selectedValue1}>
						<RadioButton value={Bob.HI}/>
						<RadioButton value={Bob.HELLO}/>
						<RadioButton value={Bob.BYE} disabled={true}/>
					</RadioGroup>
				</Column>
				<Column title='Example with Content'>
					<RadioGroup onChange={onRadioSelect2} selectedValue={this.state.selectedValue2}>
						<RadioButton value={Bob.HI}>Child 1</RadioButton>
						<RadioButton value={Bob.HELLO}>Child 2</RadioButton>
						<RadioButton value={Bob.BYE} disabled={true}>Child 3</RadioButton>
					</RadioGroup>
				</Column>
				<Column title='Disabled'>
					<RadioGroup onChange={noOp} selectedValue={Bob.HI}>
						<RadioButton value={Bob.BYE} disabled={true}/>
					</RadioGroup>
				</Column>
				<Column title='Disabled - checked'>
					<RadioGroup onChange={noOp} selectedValue={Bob.HI}>
						<RadioButton value={Bob.HI} disabled={true}/>
					</RadioGroup>
				</Column>
			</span>
		);
	}
}
