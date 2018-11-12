import { getLegacyBaseDriverFromWrapper } from '../../drivers';
import { renderAndMountComponent, createTestHistory } from 'answers-toolkit';
import * as React from 'react';

import { Link, LinkProps, HtmlLinkProps, InternalLinkProps } from './link.comp';
import { Router } from 'react-router';

export type LinkDriver = {
	getType: () => string;
	getText: () => void;
	hasArrow: () => boolean;
	click: () => void;
};

export const createLinkDriver = (wrapper: Element, optionalClass?: string) => {
	const optClass = optionalClass ? `.${optionalClass}` : '';
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, `.link${optClass}`, Link.name);

	return {
		getType: () => baseDriver.hasClass('rr') ? 'rr' : 'html',
		getText: () => baseDriver.getText(),
		hasArrow: () => baseDriver.isChildVisible('.arrow-icon'),
		click: () => baseDriver.click()
	};
};

export const createLink = (props: LinkProps): LinkDriver => {
	const history = createTestHistory();
	const comp = (props as HtmlLinkProps).href ? (
		<Link {...props} href={(props as HtmlLinkProps).href}>{props.children}</Link>
	) : (
		<Link {...props} to={(props as InternalLinkProps).to}>{props.children}</Link>
	);

	const elem = renderAndMountComponent(<Router history={history}>{comp}</Router>);
	return createLinkDriver(elem);
};
