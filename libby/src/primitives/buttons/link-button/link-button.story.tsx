import * as React from 'react';
import { LinkButton, DangerLinkButton } from './link-button';
import { delay } from '../../../common';

export const storyOfLinkButton = () => {
	const alertClick = () => alert(42);
	const noOp: () => any = () => null;

	const alertWithDelay = (str: string) => () => {
		return delay(Math.random() * 3000 + 300).then(() => alert(str));
	};

	return (
		<span className='row'>
			<span className='column'>
				<h5 className='h5-title'>Default</h5>
				<LinkButton onClick={alertClick}>Linked Button</LinkButton>
			</span>
			<span className='column'>
				<h5 className='h5-title'>Default</h5>
				<LinkButton onClick={alertWithDelay('hi')}>Async Linked Button</LinkButton>
			</span>
			<span className='column'>
				<h5 className='h5-title'>Danger</h5>
				<DangerLinkButton onClick={alertClick}>Danger Link Button</DangerLinkButton>
			</span>
			<span className='column'>
				<h5 className='h5-title'>Disabled</h5>
				<LinkButton onClick={noOp} disabled={true}>Disabled</LinkButton>
			</span>
		</span>
	);
};
