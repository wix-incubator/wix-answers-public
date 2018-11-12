import {expect} from 'chai';
import * as driver from './steps.driver';
import * as jsdomGlobal from 'jsdom-global';

import {noop} from '../../common';
import { spy } from 'sinon';
import { StepData } from './steps';

describe('Steps', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	const steps: StepData[] = [
			{
				key: '0bobobob--bobob-',
				label: 'Apple',
			},
			{
				key: '0basd-aasd-das-das-sad',
				label: 'Tomato',
			},
			{
				key: '0basd-123123321-das-das-sad',
				label: 'Pineapple Pie',
			}
	];

	it('renders steps correctly and show current step', () => {
		const comp = driver.createSteps({ steps, currentStepKey: steps[1].key, onChange: noop});
		expect(comp.getSteps().length).to.eql(steps.length);
		expect(comp.getSteps().map((s) => s.label)).to.eql(steps.map((s) => s.label));
		expect(comp.getCurrentStep()).to.eql(steps[1]);
	});

	it('calls cb on previous step click', () => {
		const onChangeSpy = spy();
		const comp = driver.createSteps({ steps, currentStepKey: steps[1].key, onChange: onChangeSpy});
		expect(onChangeSpy.called).to.eql(false);
		comp.goToStep(0);
		expect(onChangeSpy.called).to.eql(true);
	});

	it('shows next steps disabled, and doesnt call cb on forward steps/self clicks', () => {
		const onChangeSpy = spy();
		const comp = driver.createSteps({ steps, currentStepKey: steps[0].key, onChange: onChangeSpy});

		expect(comp.stepDisabledAtIdx(1)).to.eql(true);
		expect(comp.stepDisabledAtIdx(2)).to.eql(true);

		expect(onChangeSpy.called).to.eql(false);
		comp.goToStep(0);
		expect(onChangeSpy.called).to.eql(false);
		comp.goToStep(1);
		expect(onChangeSpy.called).to.eql(false);
		comp.goToStep(2);
		expect(onChangeSpy.called).to.eql(false);
	});
});
