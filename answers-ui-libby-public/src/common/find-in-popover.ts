import { ensureExists } from 'answers-toolkit';
import { getBaseReactDriver, LegacyBaseDriver } from './base-driver';

export const findInPopover = (selector: string): LegacyBaseDriver => {
	const maybeElem = document.body.querySelector(`.Popover ${selector}`);
	const child = ensureExists(maybeElem, `Element with selector ${selector} was not found in a Popover`);
	return getBaseReactDriver(child as Element);
};
