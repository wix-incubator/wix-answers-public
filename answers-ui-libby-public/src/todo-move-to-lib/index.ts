import { UniDriver } from 'unidriver';

export type ValueCompProps<T, M = {}> = {
	value: T;
	onChange: (newVal: T) => void;
	className?: string;
} & M;

export type ValidatedValueCompProps<T, M = {}, V = string> = {
	validationError?: V;
} & ValueCompProps<T, M>;

export type ValueComp<T> = React.ComponentType<ValueCompProps<T>>;

export type ValidatedValueComp<T, M = {}, V = string> = React.ComponentType<ValidatedValueCompProps<T, M, V>>;

export interface ValueCompDriver<T> {
	set: (value: T) => Promise<void>;
	value: () => Promise<T>;
}

export interface ValidatedValueCompDriver<T> extends ValueCompDriver<T> {
	valid?: () => Promise<boolean>;
}

export type ValueCompDriverCreator<T> = (bd: UniDriver) => ValueCompDriver<T>;

export type ValidatedValueCompDriverCreator<T> = (bd: UniDriver) => ValidatedValueCompDriver<T>;

export const debounce = (func: any, wait: number, immediate = false) => {
	let timeout: any;
	return function (this: any) {
		// tslint:disable-next-line:no-this-assignment no-invalid-this
		const context = this;
		const args = arguments;
		const later = () => {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
			func.apply(context, args);
		}
	};
};
