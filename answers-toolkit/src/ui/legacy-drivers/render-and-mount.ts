import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ViewCompProps } from '../view-comp/index';
import { createTranslateFn, deprecatedMsg } from './../..';

export const renderAndMountComponent = (component: any): Element => {
	const elem = document.createElement('div');
	document.body.appendChild(elem);
	ReactDOM.render(component as any,  elem);
	return elem;
};

export const renderToBody = (component: any) => {
	const elem = document.createElement('div');
	document.body.innerHTML = '';
	ReactDOM.render(component as any,  elem);
	document.body.appendChild(elem);
	return elem;
};

export const renderAndMountComp = <P extends {}>(Comp: React.ComponentClass<any>, props: P) => {
	const elem = document.createElement('div');
	document.body.appendChild(elem);
	ReactDOM.render(React.createElement(Comp, props),  elem);
	return elem;
};

/* Deprecated!!! */
export const renderAndMountAnsViewComponent = <P extends {}>(Comp: React.ComponentClass<any>, props: P) => {
	deprecatedMsg(`renderAndMountAndViewComponent is deprecated. Please use 'renderAndMountComp' with 'testViewCompPropsCreator'`);
	const t = createTranslateFn({});
	const p: ViewCompProps = {t, ...props as any};
	return renderAndMountComponent(React.createElement(Comp, p));
};
