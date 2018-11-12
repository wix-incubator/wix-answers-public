// tslint:disable-next-line:no-var-requires
const realClassNames = require('classnames');

export interface ClassDictionary {
	[id: string]: boolean;
}

export interface ClassArray extends Array<ClassValue> { }

export type ClassValue = string | number | ClassDictionary | ClassArray | any;

export const classNames = (...classes: ClassValue[]) => {
	return realClassNames(...classes);
};
