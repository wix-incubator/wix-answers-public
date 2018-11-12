import * as React from 'react';
// tslint:disable-next-line:max-line-length
import { PositiveButton, DangerButton, Button, AttentionButton, HollowButton, HollowAttentionButton, HollowPositiveButton, HollowDangerButton, SpecialButton } from './button';
import {Icon} from '../../icon/icon';
import { delay } from '../../../common';

export const storyOfButton = () => {
	const alertClick = () => alert(42);
	const noOp: () => any = () => null;
	const icon = `<svg width="13" height="13" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
		<path d="M7 6V0H6v6H0v1h6v6h1V7h6V6H7z"/></svg>`;

	const alertWithDelay = (str: string) => () => {
		return delay(Math.random() * 3000 + 300).then(() => alert(str));
	};

	return (
		<span className='story-wrapper'>
			<h3 className='h4-title'>Normal size</h3>
			<span className='row'>
				<span className='column'>
					<h5 className='h5-title'>Default</h5>
					<Button className='TEST-CLASS HELLO-CLASS' onClick={alertClick}>Button</Button>
				</span>
				<span className='column'>
					<h5 className='h5-title'>Loader</h5>
					<Button className='TEST-CLASS HELLO-CLASS' onClick={alertWithDelay('Yo!')}>Button</Button>
				</span>
				<span className='column'>
					<h5 className='h5-title'>With icon</h5>
					<Button onClick={noOp}><Icon icon={icon}/> Test</Button>
				</span>
				<span className='column'>
					<h5 className='h5-title'>Positive</h5>
					<PositiveButton onClick={noOp}>Positive</PositiveButton>
				</span>
				<span className='column'>
					<h5 className='h5-title'>Attention</h5>
					<AttentionButton onClick={noOp}>Attention</AttentionButton>
				</span>
				<span className='column'>
					<h5 className='h5-title'>Special</h5>
					<SpecialButton onClick={noOp}>Special</SpecialButton>
				</span>
				<span className='column'>
					<h5 className='h5-title'>Danger</h5>
					<DangerButton onClick={noOp}>Danger</DangerButton>
				</span>
				<span className='column'>
					<h5 className='h5-title'>Disabled</h5>
					<Button onClick={alertClick} disabled={true}>Button</Button>
				</span>
				<span className='column'>
					<h5 className='h5-title'>Disabled msg</h5>
					<Button onClick={alertClick} disabled={'i am disabled'}>Button</Button>
				</span>
			</span>
			<h3 className='h4-title'>Normal size - hollow</h3>
			<span className='row'>
				<span className='column'>
					<HollowButton onClick={alertClick}>Button</HollowButton>
				</span>
				<span className='column'>
					<HollowButton onClick={noOp}><Icon icon={icon}/> Test</HollowButton>
				</span>
				<span className='column'>
					<HollowPositiveButton onClick={noOp}>Positive</HollowPositiveButton>
				</span>
				<span className='column'>
					<HollowAttentionButton onClick={noOp}>Attention</HollowAttentionButton>
				</span>
				<span className='column'>
					<HollowDangerButton onClick={noOp}>Danger</HollowDangerButton>
				</span>
				<span className='column'>
					<HollowButton onClick={alertClick} disabled={true}>Button</HollowButton>
				</span>
			</span>

			<h3 className='h4-title'>Small size</h3>
			<span className='row'>
				<span className='column'>
					<Button size='small' onClick={alertClick}>Button</Button>
				</span>
				<span className='column'>
					<PositiveButton size='small' onClick={noOp}>Positive</PositiveButton>
				</span>
				<span className='column'>
					<AttentionButton size='small' onClick={noOp}>Attention</AttentionButton>
				</span>
				<span className='column'>
					<DangerButton size='small' onClick={noOp}>Danger</DangerButton>
				</span>
				<span className='column'>
					<Button size='small' onClick={alertClick} disabled={true}>Button</Button>
				</span>
			</span>

			<h3 className='h4-title'>Large size</h3>
			<span className='row'>
				<span className='column'>
					<Button size='large' onClick={alertClick}>Button</Button>
				</span>
				<span className='column'>
					<PositiveButton size='large' onClick={noOp}>Positive</PositiveButton>
				</span>
				<span className='column'>
					<AttentionButton size='large' onClick={noOp}>Attention</AttentionButton>
				</span>
				<span className='column'>
					<DangerButton size='large' onClick={noOp}>Danger</DangerButton>
				</span>
				<span className='column'>
					<Button size='large' onClick={alertClick} disabled={true}>Button</Button>
				</span>
			</span>

			<h3 className='h4-title'>Extra Large size</h3>
			<span className='row'>
				<span className='column'>
					<Button size='extra-large' onClick={alertClick}>Button</Button>
				</span>
				<span className='column'>
					<PositiveButton size='extra-large' onClick={noOp}>Positive</PositiveButton>
				</span>
				<span className='column'>
					<AttentionButton size='extra-large' onClick={noOp}>Attention</AttentionButton>
				</span>
				<span className='column'>
					<DangerButton size='extra-large' onClick={noOp}>Danger</DangerButton>
				</span>
				<span className='column'>
					<Button size='extra-large' onClick={alertClick} disabled={true}>Button</Button>
				</span>
			</span>
		</span>
	);
};
