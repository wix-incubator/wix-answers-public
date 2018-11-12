import { UniDriver } from 'unidriver';

export type TextAreaAutosizeDriver = {
	getValue: () => Promise<string>,
	enterValue: (value: string) => Promise<void>,
	disabled: () => Promise<boolean>,
	readOnly: () => Promise<boolean>
};

export const createTextAreaAutosizeDriver = (wrapper: UniDriver): TextAreaAutosizeDriver => {
	const base = wrapper.$(`.text-area-autosize`);

	return {
		getValue: () => base.value(),
		enterValue: (value: string) => base.enterValue(value),
		disabled: async () => {
			const dis = await base.attr('disabled');
			return !!dis;
		},
		readOnly: async () => {
			const val = await base.attr('readonly');
			return !!val;
		},
	};
};
