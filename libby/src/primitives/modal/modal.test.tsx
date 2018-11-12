import { expect } from 'chai';
import * as sinon from 'sinon';
import * as jsdomGlobal from 'jsdom-global';
import { createModal } from './driver';
import { ModalSize, ModalBody } from '.';
import { ModalHeader } from './modal-header/modal-header';
import { noop } from '../../common';
import * as React from 'react';

const modalHeader = <ModalHeader>Body</ModalHeader>;
const modalBody = <ModalBody>Body</ModalBody>;

describe('Modal', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('Should render a dismissable modal', async () => {
		const spy = sinon.spy();
		const modal = createModal({ onDismiss: spy, isOpen: true, size: ModalSize.MEDIUM });

		expect(spy.called).to.eql(false);
		await modal.clickOverlay();
		expect(spy.called).to.eql(true);
	});

	it('renders a close button on modal body when no header exists', async () => {
		const spy = sinon.spy();
		const modal = createModal({
			hideCloseButton: false,
			isOpen: true,
			onDismiss: spy,
			size: ModalSize.MEDIUM
		},
			undefined,
			modalBody
		);
		expect(await modal.hasBodyCloseButton()).to.eql(true);
		expect(spy.called).to.eql(false);
		await modal.clickCloseButton();
		expect(spy.called).to.eql(true);
	});

	it('does not render a close button in the body when hideCloseButton and no header exists', async () => {
		const modal = createModal({
			hideCloseButton: true,
			isOpen: true,
			onDismiss: noop,
			size: ModalSize.MEDIUM
		},
			undefined,
			modalBody
		);
		expect(await modal.hasBodyCloseButton()).to.eql(false);
	});

	it('does not render a close button when onDismiss is undefined', async () => {
		const modal = createModal({
			hideCloseButton: false,
			isOpen: true,
			size: ModalSize.MEDIUM
		},
			undefined,
			modalBody
		);
		expect(await modal.hasBodyCloseButton()).to.eql(false);
		expect(await modal.hasHeaderCloseButton()).to.eql(false);
	});

	// ASK: should the following two be combined into one?
	it('does not render a close button in the body when header exists', async () => {
		const modal = createModal({
			hideCloseButton: false,
			isOpen: true,
			onDismiss: noop,
			size: ModalSize.MEDIUM
		},
			modalHeader,
			modalBody
		);
		expect(await modal.hasBodyCloseButton()).to.eql(false);
	});

	it('renders a close button in the header', async () => {
		const modal = createModal({
			hideCloseButton: false,
			isOpen: true,
			onDismiss: noop,
			size: ModalSize.MEDIUM
		}, modalHeader, modalBody);
		expect(await modal.hasHeaderCloseButton()).to.eql(true);
	});
});
