import { renderAndMountComponent, createTestHistory } from 'answers-lib';
import * as React from 'react';
import { LinkDriver, createLinkDriver } from '../../../primitives/link/link.driver';
import { Router } from 'react-router';
import { BaseNavButton, BaseNavButtonProps, BaseNavButtonTypes } from './base-nav-button.comp';
import { getLegacyBaseDriverFromWrapper } from '../../../common/base-driver';
import { isHtmlLinkProps } from '../../..';

export type NavButtonDriver = LinkDriver;

export const createNavButtonDriver = (wrapper: Element): NavButtonDriver => {
	const base = getLegacyBaseDriverFromWrapper(wrapper, `.nav-button`, BaseNavButton.name);
	const linkDriver = createLinkDriver(base.elem);

	return linkDriver;
};

export const createNavButton = (props: BaseNavButtonProps, type: BaseNavButtonTypes): NavButtonDriver => {
	const history = createTestHistory();
	const classes = `${props.className} ${type}`;
	let comp: any;
	// tslint:disable-next-line:prefer-conditional-expression
	if (isHtmlLinkProps(props)) {
		comp = <BaseNavButton {...props} className={classes}>{props.children}</BaseNavButton>;
	} else {
		comp = <BaseNavButton {...props} className={classes}>{props.children}</BaseNavButton>;
	}
	const elem = renderAndMountComponent(<Router history={history}>{comp}</Router>);
	return createLinkDriver(elem);
};
