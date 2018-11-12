import * as React from 'react';
import { LinkProps, Link, isHtmlLinkProps } from '../../..';

export type BaseNavButtonProps = LinkProps;

export type BaseNavButtonTypes = 'primary' | 'hollow';

export class BaseNavButton extends React.PureComponent<BaseNavButtonProps> {
	render () {
		const {props} = this;
		const classNames = `nav-button ${props.className}`;

		// can't get TS to understand it's ok..
		if (isHtmlLinkProps(props)) {
			return <Link {...props} className={classNames}>{props.children}</Link>;
		} else {
			return <Link {...props} className={classNames}>{props.children}</Link>;
		}
	}
}
