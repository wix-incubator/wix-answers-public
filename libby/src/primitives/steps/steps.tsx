import { BaseProps } from '../../common';
import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import * as classNames from 'classnames';

export type StepData = {
	key: string;
	label: string;
};

export type StepsProps = {
	steps: StepData[];
	currentStepKey: string;
	onChange: (stepKey: StepData) => void;
} & BaseProps;

export class Steps extends React.PureComponent<StepsProps> {

	isStepDisabled = (step: StepData) => {
		const { steps, currentStepKey} = this.props;
		const stepKeys = steps.map((s) => s.key);
		return stepKeys.indexOf(currentStepKey) <= stepKeys.indexOf(step.key);
	}

	renderStep = (step: StepData, idx: number) => {
		const {steps, onChange} = this.props;

		const isDisabled = this.isStepDisabled(step);
		const isSelected = step.key === this.props.currentStepKey;

		const classes = classNames('step-container', {
			selected: isSelected,
			disabled: !isSelected && isDisabled,
			checked: !isSelected && !isDisabled,
			short: steps.length < 3 && idx >= (steps.length - 1)
		});
		const maybeLine = idx < (steps.length - 1) ? <span className='dotted-line' /> : null;

		const onClick = () => {
			if (!isSelected && !isDisabled) {
				onChange(step);
			}
		};

		return (
			<span key={idx} className={classes} data-key={step.key}>
				<span key={idx} className='step-inner-wrapper'>
					<div className='step-idx' onClick={onClick}>{idx + 1}</div>
					{maybeLine}
				</span>
				<div className='step-label'>{step.label}</div>
			</span>
		);
	}

	render () {
		const {steps} = this.props;
		const className = namespacedClassnames('steps');
		const stepsComp = steps.map((step: StepData, idx: number) => this.renderStep(step, idx));

		return (
			<div className={className}>
				{stepsComp}
			</div>
		);
	}
}
