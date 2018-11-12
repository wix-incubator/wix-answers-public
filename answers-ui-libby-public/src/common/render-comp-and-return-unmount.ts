import * as React from 'react';
import * as ReactDom from 'react-dom';

export const renderCompAndReturnUnmount = (elem: HTMLElement, component: any, props: any) => {
	ReactDom.render(React.createElement(component, props) as any,  elem);

	return () => {
		ReactDom.unmountComponentAtNode(elem);
	};
};
