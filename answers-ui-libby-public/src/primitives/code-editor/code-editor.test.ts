import { spy } from 'sinon';
import { expect } from 'chai';

import * as jsdomGlobal from 'jsdom-global';
import * as driver from './code-editor.driver';
import { CodeEditorProps } from './code-editor';

describe('codeEditor', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
		const body = document.body as any;
		if (!body.createTextRange) {
			body.createTextRange = () => ({
				getClientRects: () => {
					return {
						length: 0,
					};
				},
				getBoundingClientRect: () => ({})
			});
		}

	});

	afterEach(() => {
		cleanup();
	});

	// tslint:disable-next-line:no-skipped-tests
	it.skip('Should load codeEditor with value and call cb on change', () => {
		const value = '<div>Hello</div>';
		const onChange = spy();

		const props: CodeEditorProps = {value, onChange, mode: 'html'};
		const comp = driver.createCodeEditor(props);
		expect(onChange.called).to.eql(false);
		expect(comp.getValue()).to.eql(value);
		comp.enterValue('<div>Yo</div>');
		expect(onChange.called).to.eql(true);
		expect(onChange.lastCall.args[0]).to.eql('<div>Yo</div>');
	});
});
