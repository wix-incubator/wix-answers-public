import * as React from 'react';
import { TranslateFn, ObjOrObjCreator, createTranslateFn, testDataCreator } from './../..';

class DummyClass {}

// this is a hack so lack of react doesn't cause this file to explode in runtime
const Comp: (typeof React.PureComponent) = React.PureComponent || DummyClass;

export class BaseAnsComp<P, S = {}> extends Comp<P, S> {}

export class ViewComp<P, S = {}> extends BaseAnsComp<P & ViewCompProps, S> {}

export type ViewCompProps = {t: TranslateFn};

export const testViewCompPropsCreator = <T extends {}> (defaultsOrFn: ObjOrObjCreator<Partial<ViewCompProps & T>>, tSource = {}) => {
	const t = createTranslateFn(tSource);

	const defaults = typeof defaultsOrFn === 'function' ? defaultsOrFn() : defaultsOrFn;
	return testDataCreator<T & ViewCompProps>(() => ({
		t,
		...defaults as any
	}));
};

// decprecated
export type AnsViewCompProps = ViewCompProps;
export class AnsViewComp<P, S = {}> extends ViewComp<P, S> {}
