import { createWarningMessageBox } from './message-box.driver';
import { expect } from 'chai';
import * as jsdomGlobal from 'jsdom-global';

describe('Message Box', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('Should render as expected', () => {
		const props = {};
		const content = 'Attention hamudim, this is a message';

		const comp = createWarningMessageBox(props, content);
		expect(comp.getText()).to.eql(content);
	});
});
