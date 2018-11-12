import { Button } from '../../primitives/buttons';
import * as React from 'react';
import { ConfirmModal } from './confirm-modal.comp';
import { Text } from '../../typography';

export class StoryOfConfirmModal extends React.Component<any, any> {
	state = {
		isOpen: false,
	};

	openModal = () => {
		this.setState({ isOpen: true });
	}

	closeModal = () => {
		this.setState({ isOpen: false });
	}

	render () {
		const description = <Text type='t1c'>You will not be able to do this thing or any other thing anymore</Text>;

		return (
			<div>
				<Button onClick={this.openModal}>Open Confirm Modal</Button>
				<ConfirmModal
					isOpen={this.state.isOpen}
					title='Are you sure that you want to remove this thing?'
					body={description}
					confirmText='Yes, Remove It'
					cancelText='Cancel'
					level='alert'
					onConfirm={this.closeModal}
					onCancel={this.closeModal}
				/>
			</div>
		);
	}
}
