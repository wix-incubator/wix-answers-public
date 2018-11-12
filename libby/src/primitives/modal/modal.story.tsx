import * as React from 'react';
import { Modal, ModalSize } from '.';
import { Button, DangerButton } from '../buttons/button/button';
import { Text } from '../../typography';
import { ModalBody } from './modal-body/modal-body';
import { ModalHeader } from './modal-header/modal-header';
import { ModalFooter } from './modal-footer/modal-footer';
import { LinkButton } from '../buttons/link-button/link-button';
import { ModalSubHeader } from './modal-sub-header/modal-sub-header';

export class StoryOfModal extends React.Component<any, any> {
	state = {
		firstModalVisible: false,
		isAlertModalVisible: false
	};

	dismissFirstModal = () => {
		this.setState({ firstModalVisible: false });
	}

	dismissAlertModal = () => {
		this.setState({isAlertModalVisible: false});
	}

	showFirstModal = () => this.setState({firstModalVisible: true});

	showAlertModal = () => this.setState({isAlertModalVisible: true});

	renderModal = () => (
		<Modal isOpen={this.state.firstModalVisible} onDismiss={this.dismissFirstModal} size={ModalSize.LARGE}>
			<ModalHeader onBack={this.dismissFirstModal}>
				My Modal Title
			</ModalHeader>
			<ModalSubHeader size={ModalSize.MEDIUM}>
				<Text type='h1'>This is Sub Header</Text>
			</ModalSubHeader>
			<ModalBody>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
				<div>Wow wow wow, how amazing is this? A modal!! Can't believe.</div>
			</ModalBody>
			<ModalFooter>
				<Button onClick={this.dismissFirstModal}>Done</Button>
			</ModalFooter>
		</Modal>
	)

	renderAlertModal = () => (
		<Modal isOpen={this.state.isAlertModalVisible} size={ModalSize.SMALL}>
			<ModalBody>
				<p>Are you sure you want to delete that important thing?</p>
				<div>
					<LinkButton onClick={this.dismissAlertModal}>Go Back</LinkButton>
					<DangerButton onClick={this.dismissAlertModal}>Delete</DangerButton>
				</div>
			</ModalBody>
		</Modal>
	)

	render () {
		return (
			<span className='row'>
				<span className='column'>
					<Button onClick={this.showFirstModal}>Open Modal</Button>
					{this.renderModal()}
				</span>
				<span className='column'>
					<Button onClick={this.showAlertModal}>Open Alert</Button>
					{this.renderAlertModal()}
				</span>
			</span>
		);
	}
}
