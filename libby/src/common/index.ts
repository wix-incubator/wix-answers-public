import { FlatCategoryList, Category } from './domain';

export { renderAndMountComponent } from 'answers-lib';
export { findInPopover } from './find-in-popover';
export { ClickOutside } from './click-outside.comp';
export { isUrl } from './is-url';

export * from './domain';
export * from './namespace-classes';
export * from './story-utils';
export * from './user-input-commons';

export const noop = (): void => undefined;

export const delay = (time: number) => new Promise((res) => setTimeout(res, time));

export type BaseProps = {
	className?: string;
	children?: any;
};

export type WithClassName = {
	className?: string;
};

export type ValueCompProps<T, M = {}> = {
	value: T,
	onChange: (newVal: T) => void
} & M;

export const isPromise = (maybeP: any): maybeP is Promise<any> => {
	return maybeP && maybeP.then && maybeP.catch;
};

export const flattenCategories = (cats: Category[]): FlatCategoryList => {
	return cats.reduce<FlatCategoryList>((p, c) => {
		const children = c.children || [];
		const childrenFlats = children.reduce<FlatCategoryList>((sp, sc) => {
			return [{id: sc.id, name: sc.name, parentName: c.name}, ...sp];
		}, []);
		return [...p, {id: c.id, name: c.name}, ...childrenFlats];
	}, []);
};
