import {storyOfLinkButton} from './link-button/link-button.story';
import {storyOfButton} from './button/button.story';
import * as React from 'react';

export const storyOfButtons = () => {
	return (
		<div className='story-container'>
			<div className='preview'>
				<h3 className='h3-title'>Button</h3>
				{storyOfButton()}
			</div>
			<div className='preview'>
				<h3 className='h3-title'>Linked Button</h3>
				{storyOfLinkButton()}
			</div>
		</div>
	);
};
