import * as React from 'react';
import { CatalogGroup } from './../';
import { Link, LinkProps } from '../../../src';

export const linkCatalogData: CatalogGroup<LinkProps> = {
	render: (p) => <Link {...p}>This is a link</Link>,
	title: 'Link',
	items: [
		{
			label: 'Internal',
			props: {
				to: '/app/callcenter'
			}
		},
		{
			label: 'External',
			props: {
				href: 'http://www.google.com'
			}
		}
	]
};
