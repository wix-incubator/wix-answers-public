
import * as React from 'react';
import { namespacedClassnames, BaseProps } from '../../common';
import { Link as ReactRouterLink } from 'react-router-dom';

export type LinkTargetTypes = '_blank' | '_top' | '_parent' | '_self';

export type InternalLinkProps = {
	to: string;
} & BaseProps;

export type HtmlLinkProps = {
	href: string;
	target?: LinkTargetTypes;
} & BaseProps;

export type LinkProps = InternalLinkProps | HtmlLinkProps;

export const isHtmlLinkProps = (props: LinkProps): props is HtmlLinkProps => {
	return !!(props as HtmlLinkProps).href;
};

export class Link extends React.PureComponent<LinkProps> {

	generateClassNames = (...args: string[]) => namespacedClassnames('link', this.props.className, args);

	render () {
		const {props} = this;

		if (isHtmlLinkProps(props)) {
			const htmlClasses = this.generateClassNames('html');
			const maybeTarget = props.target ? {target: props.target} : {target: '_blank'};

			return (
				<a className={htmlClasses} href={props.href} {...maybeTarget}>
					{props.children}
					<span className='arrow-icon'/>
				</a>
			);
		} else {
			const rrClasses = this.generateClassNames('rr');
			return <ReactRouterLink className={rrClasses} to={props.to}>{props.children}</ReactRouterLink>;
		}
	}
}
