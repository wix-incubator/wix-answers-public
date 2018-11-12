import { UniDriver } from 'unidriver';
import { Simulate } from 'react-dom/test-utils';

export type FloaterSelectDriver = {
	getItemsContent: (innerSelector?: string) => Promise<any[]>,
	search: (term: string) => Promise<void>,
	pressDownKey: () => Promise<void>,
	pressEnterKey: () => Promise<void>,
	isLoading: () => Promise<boolean>,
	select: (idx: number) => Promise<void>,
	base: UniDriver
};

export function createFloaterSelectDriver (wrapper: UniDriver) {
	const base = wrapper.$('.floater-select');
	const searchField = base.$('input.search-field');

	return {
		getItemsContent: (innerSelector?: string) =>
			base.$$('.floater-select-item').map((item) => innerSelector ? item.$(innerSelector).text() : item.text()),
		search: (term: string) => searchField.enterValue(term),
		pressDownKey: async () => {
			throw new Error('not implemented');
		},
		pressEnterKey: async () => {
			throw new Error('not implemented');
		},
		isLoading: () => base.$('.loader').exists(),
		select: (idx: number) => base.$$('.floater-select-item').get(idx).getNative().then((el) => Simulate.mouseDown(el)),
		base
	};
}
