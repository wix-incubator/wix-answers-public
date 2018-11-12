import * as React from 'react';
import { Column } from '../../common/story-utils';
import { Steps, StepData } from './steps';
import { Button } from '..';

const twoSteps: StepData[] = [
	{label: 'Testing 1 testing this', key: 'b0b0b-b0b0b'},
	{label: 'Testing 2', key: '1203103201230-213-1232130'},
];

const threeSteps: StepData[] = [
	...twoSteps,
	{label: 'Testing 3 Hello', key: '1203103201230-213-asdklsdalkdsa'},
];

const fourSteps: StepData[] = [
	...threeSteps,
	{label: 'Testing 4', key: 'asd0asdsad-sad-sda-sda--sad'}
];

const fiveSteps: StepData[] = [
	...fourSteps,
	{label: 'Testing 5 y helo ther', key: 'asd0asdsad-asdzckxlklcxxcz-sda-sda--sad'}
];

const divStyle = { width: '550px', border: '1px solid black', padding: '12px 10px'};
const NextButton = (props: any) => (
	<div style={{width: '100px'}}>
		<Button onClick={props.onClick}>Next</Button>
	</div>
);

export class StoryOfSteps extends React.Component<any, any> {
	state = {
		currStep2: twoSteps[0],
		currStep3: threeSteps[0],
		currStep4: fourSteps[0],
		currStep5: fiveSteps[0]
	};

	onChange2 = (step: StepData) => this.setState({currStep2: step});
	onChange3 = (step: StepData) => this.setState({currStep3: step});
	onChange4 = (step: StepData) => this.setState({currStep4: step});
	onChange5 = (step: StepData) => this.setState({currStep5: step});

	calcNextStep = (currStep: StepData, steps: StepData[]) => {
		const nextIdx = steps.indexOf(currStep) + 1;
		return steps[nextIdx % steps.length];
	}

	increment2 = () => {
		const nextStep = this.calcNextStep(this.state.currStep2, twoSteps);
		this.setState({currStep2: nextStep});
	}

	increment3 = () => {
		const nextStep = this.calcNextStep(this.state.currStep3, threeSteps);
		this.setState({currStep3: nextStep});
	}

	increment4 = () => {
		const nextStep = this.calcNextStep(this.state.currStep4, fourSteps);
		this.setState({currStep4: nextStep});
	}

	increment5 = () => {
		const nextStep = this.calcNextStep(this.state.currStep5, fiveSteps);
		this.setState({currStep5: nextStep});
	}

	render () {
		const curr2 = this.state.currStep2;
		const curr3 = this.state.currStep3;
		const curr4 = this.state.currStep4;
		const curr5 = this.state.currStep5;

		return (
			<span className='row'>
				<Column title='2 Steps'>
					<div style={divStyle}>
						<Steps steps={twoSteps} currentStepKey={curr2.key} onChange={this.onChange2} />
					</div>
					<NextButton onClick={this.increment2} />
				</Column>
				<Column title='3 Steps'>
					<div style={divStyle}>
						<Steps steps={threeSteps} currentStepKey={curr3.key} onChange={this.onChange3} />
					</div>
					<NextButton onClick={this.increment3} />
				</Column>
				<Column title='4 Steps'>
					<div style={divStyle}>
						<Steps steps={fourSteps} currentStepKey={curr4.key} onChange={this.onChange4} />
					</div>
					<NextButton onClick={this.increment4} />
				</Column>
				<Column title='5 Steps'>
					<div style={divStyle}>
						<Steps steps={fiveSteps} currentStepKey={curr5.key} onChange={this.onChange5} />
					</div>
					<NextButton onClick={this.increment5} />
				</Column>
			</span>
		);
	}
}
