import { getLegacyBaseDriverFromWrapper } from '../../drivers';
import { renderAndMountComponent } from 'answers-lib';
import * as React from 'react';

import { StepData, Steps, StepsProps } from './steps';

export type StepsDriver = {
	getCurrentStep: () => StepData;
	getSteps: () => StepData[];
	goToStep: (idx: number) => void;
	stepDisabledAtIdx: (idx: number) => boolean;
};

export const createStepsDriver = (wrapper: Element) => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.steps', Steps.name);

	return {
		getCurrentStep: () => {
			const selectedStep = baseDriver.find('.step-container.selected');
			return {key: selectedStep.getDataAttr('key'), label: selectedStep.find('.step-label').getText()};
		},
		getSteps: () => {
			const steps = baseDriver.findAll('.step-container');
			return steps.map((step) => {
				return {key: step.getDataAttr('key'), label: step.find('.step-label').getText()};
			});
		},
		goToStep: (idx: number) => {
			baseDriver.findAll(`.step-inner-wrapper .step-idx`).clickOn(idx);
		},
		stepDisabledAtIdx: (idx: number) => {
			return baseDriver.findAll('.step-container').get(idx).hasClass('disabled');
		}
	};
};

export const createSteps = (props: StepsProps): StepsDriver => {
	const elem = renderAndMountComponent(<Steps {...props} />);
	return createStepsDriver(elem);
};
