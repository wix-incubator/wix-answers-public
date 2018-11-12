import {BaseButton} from '../base-button/base-button.comp';
import * as React from 'react';
import { BaseProps } from '../../../common';

export type ButtonProps = {
	onClick: (e: MouseEvent) => void;
	disabled?: boolean | string;
	size?: 'small' | 'normal' | 'large' | 'extra-large';
} & BaseProps;

const defaultProps = {
	disabled: false
};

export const Button = (partialProps: ButtonProps) => {
	const props = {...defaultProps, ...partialProps};
	return <BaseButton {...props}>{props.children}</BaseButton>;
};

export const HollowButton = (partialProps: ButtonProps) => {
	const props = {...defaultProps, ...partialProps};
	return <BaseButton {...props} isHollow={true}>{props.children}</BaseButton>;
};

export const AttentionButton = (partialProps: ButtonProps) => {
	const type = 'attention';
	const props = {...defaultProps, ...partialProps};
	return <BaseButton {...props} buttonType={type}>{props.children}</BaseButton>;
};

export const SpecialButton = (partialProps: ButtonProps) => {
	const type = 'special';
	const props = {...defaultProps, ...partialProps};
	return <BaseButton {...props} buttonType={type}>{props.children}</BaseButton>;
};

export const HollowSpecialButton = (partialProps: ButtonProps) => {
	const type = 'special';
	const props = {...defaultProps, ...partialProps};
	return <BaseButton {...props} isHollow={true} buttonType={type}>{props.children}</BaseButton>;
};

export const HollowAttentionButton = (partialProps: ButtonProps) => {
	const type = 'attention';
	const props = {...defaultProps, ...partialProps};
	return (
		<BaseButton {...props} isHollow={true} buttonType={type}>
			{props.children}
		</BaseButton>
	);
};

export const DangerButton = (partialProps: ButtonProps) => {
	const type = 'danger';
	const props = {...defaultProps, ...partialProps};
	return <BaseButton {...props} buttonType={type}>{props.children}</BaseButton>;
};

export const HollowDangerButton = (partialProps: ButtonProps) => {
	const type = 'danger';
	const props = {...defaultProps, ...partialProps};
	return (
		<BaseButton {...props} isHollow={true} buttonType={type}>
			{props.children}
		</BaseButton>
	);
};

export const PositiveButton = (partialProps: ButtonProps) => {
	const type = 'positive';
	const props = {...defaultProps, ...partialProps};
	return <BaseButton {...props} buttonType={type}>{props.children}</BaseButton>;
};

export const HollowPositiveButton = (partialProps: ButtonProps) => {
	const type = 'positive';
	const props = {...defaultProps, ...partialProps};
	return (
		<BaseButton {...props} isHollow={true} buttonType={type}>
			{props.children}
		</BaseButton>
	);
};

export const PremiumButton = (partialProps: ButtonProps) => {
	const type = 'premium';
	const props = { ...defaultProps, ...partialProps };
	return <BaseButton {...props} buttonType={type}>{props.children}</BaseButton>;
};

export const HollowPremiumButton = (partialProps: ButtonProps) => {
	const type = 'premium';
	const props = { ...defaultProps, ...partialProps };
	return <BaseButton {...props} buttonType={type} isHollow={true}>{props.children}</BaseButton>;
};
