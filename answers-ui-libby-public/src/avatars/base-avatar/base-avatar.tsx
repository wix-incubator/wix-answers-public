import { BaseProps } from '../../common';
import * as React from 'react';

export type AvatarSizes = 'xsmall' | 'small' | 'normal' | 'large' | 'xlarge';

export type BaseAvatarProps = {
	initials: string;
	id: string;
	imgSrc?: string;
	size?: AvatarSizes;
} & BaseProps;

const defaultProps = {
	size: 'normal'
};

export const calculateColorById = (id: string): number => {
	const maxColors = 10;
	return id.split('')
		.map((c: string) => c.charCodeAt(0))
		.reduce((a, b) => a + b) % maxColors + 1;
};

export class BaseAvatar extends React.Component<BaseAvatarProps, any> {
	colorGroup = calculateColorById(this.props.id);

	state = {
		imgLoadingError: false
	};

	fallback = (e: any) => {
		this.setState({imgLoadingError: e});
	}

	render () {
		const props = {...defaultProps, ...this.props};

		const initialsElement = (
			<div className={'initials color-' + this.colorGroup}>
					<span className='inner'>{props.initials}</span>
			</div>
		);

		const picElement = <img src={props.imgSrc} onError={this.fallback}/>;

		return (
		<div className={`${props.size} ${props.className ? props.className : ''}`}>
			{!props.imgSrc || this.state.imgLoadingError ? initialsElement : picElement}
		</div>);
	}
}
