import { Button } from '../../primitives/buttons';
import * as React from 'react';
import { AlertModal } from './alert-modal.comp';
import { Text } from '../../typography';

export class StoryOfAlertModal extends React.Component<any, any> {
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
				<Button onClick={this.openModal}>Open Alert Modal</Button>
				<AlertModal
					isOpen={this.state.isOpen}
					body={description}
					closeText='Yes, Remove It'
					onClose={this.closeModal}
				/>
			</div>
		);
	}
}
