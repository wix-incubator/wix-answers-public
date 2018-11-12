import { createLabelView } from './label-view.driver';

import { expect } from 'chai';
import * as jsdomGlobal from 'jsdom-global';
import {spy} from 'sinon';
import { LabelData } from '../../common';

describe('Label', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('Should show label name', () => {
		const label: LabelData = {id: '123', name: 'bob-label-1'};
		const props = {label};
		const comp = createLabelView(props);
		expect(comp.getName()).to.eql(label.name);
	});

	it('Should remove if possible', () => {
		const label: LabelData = {id: '321', name: 'bob-label-2'};
		const onRemove = spy();
		const props = {label, onRemove};
		const comp = createLabelView(props);
		expect(onRemove.called).to.eql(false);
		comp.remove();
		expect(onRemove.called).to.eql(true);
		expect(onRemove.lastCall.args[0]).to.eql(props.label);
	});
});
