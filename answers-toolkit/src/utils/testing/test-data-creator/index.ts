export type TestDataCreator<T> = (partial?: Partial<T>) => T;

export type ObjOrObjCreator<T> = T | (() => T);

export const testDataCreator = <T extends object>(defaults: ObjOrObjCreator<T>): TestDataCreator<T> => {
	return (partial = {}) => {
		const objDefaults = (typeof defaults === 'function' ? defaults() : defaults) as object;
		const objPartial = partial as object;
		// tslint:disable-next-line:no-object-literal-type-assertion
		const ret: any =  {...objDefaults, ...objPartial} as T;
		return ret;
	};
};
