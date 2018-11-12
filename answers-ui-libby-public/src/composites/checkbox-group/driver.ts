import { createInputDriver } from '../../primitives/input/driver';
import { UniDriver } from 'unidriver';
import { CheckboxGroupKey } from '.';

export type CheckboxGroupDriver = {
	labels: () => Promise<string[]>;
	disabledLabels: () => Promise<string[]>;
	selectedLabels: () => Promise<string[]>;
	toggle: (idx: number) => Promise<void>;
	search: (term: string) => Promise<void>;
	base: UniDriver
};

export const createCheckboxGroupDriver = (wrapper: UniDriver): CheckboxGroupDriver => {
	const base = wrapper.$(`.${CheckboxGroupKey}`);
	return {
		labels: () => base.$$('.checkbox-label').text(),
		disabledLabels: () => base.$$('.checkbox.disabled .checkbox-label').text(),
		selectedLabels: () => base.$$('.checkbox.checked .checkbox-label').text(),
		toggle: (idx: number) => base.$$('.checkbox input').get(idx).click(),
		search: (term: string) => createInputDriver(base).set(term),
		base
	};
};
