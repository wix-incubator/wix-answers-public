import * as React from 'react';
import { ActionButton } from './action-button';
import { QueueIcon } from '../../icons/icons-components/queue-icon';
import { delay } from '../../common';
import { AttachmentIcon } from '../..';

const alertWithDelay = (str: string) => () => {
	return delay(Math.random() * 3000 + 300).then(() => alert(str));
};

export class ActionButtonStory extends React.Component<any, any> {
	state = {
		isOpen: false
	};

	render () {
		const alertClicked = () => alert('clicked!');

		// tslint:disable:jsx-key
		return (
				<div>
				<div className='row'>
					<div className='column'>
					<ActionButton
						onClick={alertClicked}
						description={'This is a nice action, many popup on screen'}
					>
						<AttachmentIcon/>
					</ActionButton>
					</div>
					<div className='column'>
					<ActionButton
						onClick={alertWithDelay('hio')}
						description={'Queue icon!'}
					>
						<QueueIcon/>
					</ActionButton>
					<ActionButton
						buttonType='special'
						onClick={alertWithDelay('hio')}
						description={'Queue icon!'}
					>
						<QueueIcon/>
					</ActionButton>
					</div>
					<div className='column'>
					<ActionButton
						disabled={'You can not do this sir'}
						onClick={alertClicked}
						description={'This is a nice action, many popup on screen'}
					>
						<AttachmentIcon/>
					</ActionButton>
					</div>
				</div>
			</div>);
	}
}
