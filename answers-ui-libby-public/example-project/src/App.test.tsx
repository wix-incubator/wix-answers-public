import { assert } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

const renderAndMountComp = <P extends {}>(Comp: React.ComponentClass<any>, props: P) => {
	const elem = document.createElement('div');
	document.body.appendChild(elem);
	ReactDOM.render(React.createElement(Comp, props),  elem);
	return elem;
};

it('renders without crashing', () => {
	const props = {};
	const wrapper = renderAndMountComp(App, props);

	assert.equal(wrapper.textContent, 'Libby Boilerplate');
});
