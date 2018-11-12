import { BaseNavButton, BaseNavButtonProps, BaseNavButtonTypes } from './base-nav-button/base-nav-button.comp';
import { isHtmlLinkProps } from '../..';
import * as React from 'react';

const renderBaseNavButton = (props: BaseNavButtonProps, type: BaseNavButtonTypes) => {

	if (isHtmlLinkProps(props)) {
		return <BaseNavButton {...props} className={type}>{props.children}</BaseNavButton>;
	} else {
		return <BaseNavButton {...props} className={type}>{props.children}</BaseNavButton>;
	}
};

export const NavButton = (props: BaseNavButtonProps) => renderBaseNavButton(props, 'primary');

export const SecondaryNavButton = (props: BaseNavButtonProps) => renderBaseNavButton(props, 'hollow');
