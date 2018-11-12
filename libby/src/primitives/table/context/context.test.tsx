import * as React from 'react';
import { expect } from 'chai';
import { TableContextConsumer } from './consumer';
import { renderAndMountComponent } from 'answers-lib';
import { TableContext } from '.';
import { spy } from 'sinon';
import * as jsdomGlobal from 'jsdom-global';

describe ('Table Context', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('Consumes default context if consumer rendered without provider', async () => {
		const contextSpy = spy();
		const expectedContext: TableContext = {
			colWidths: []
		};

		const dummyRenderFn = (context: TableContext) => {
			contextSpy(context);
			return <div/>;
		};

		renderAndMountComponent(<TableContextConsumer render={dummyRenderFn}/>);

		expect(contextSpy.called).to.eql(true);
		expect(contextSpy.lastCall.args[0]).to.eql(expectedContext);
	});
});
