import * as React from 'react';
import { ButtonGroup } from './button-group';
import { PositiveButton, Button } from '../../primitives/buttons/button/button';
import { delay } from '../../common';
import { Icon } from '../../primitives/icon/icon';
import { iconsMap } from '../../icons/processed';
import { AttentionMessageBox } from '../../primitives/message-box/message-box';

export class ButtonGroupStory extends React.Component<any, any> {
	state = {
		isOpen: false
	};

	render () {
		const alertClicked = () => alert('clicked!');
		const alertDelayed = () => delay(3000).then(() => alert('click'));

		// tslint:disable:jsx-key
		return (
				<div>
				<div className='row'>
					<div className='column'>
					<ButtonGroup>
						<Button onClick={alertClicked}>Bob</Button>
						<Button onClick={alertDelayed}>David</Button>
						<Button onClick={alertClicked} className='options'><Icon icon={iconsMap.buttonDd}/></Button>
					</ButtonGroup>

					<AttentionMessageBox>
						If you need that chupchuk add "options" classname and the buttonDd icon
					</AttentionMessageBox>
					</div>

					<div className='column'>
					<ButtonGroup>
						<PositiveButton onClick={alertClicked}>Vova</PositiveButton>
						<PositiveButton onClick={alertDelayed}>Nahum</PositiveButton>
					</ButtonGroup>
					</div>
				</div>
			</div>);
	}
}
