import * as React from 'react';
import { CatalogGroup } from '..';
import { Text, Container, ContainerSection, ContainerProps } from '../..';

export const containerCatalogData: CatalogGroup<ContainerProps> = {
	title: 'Container',
	render: (p) => (
		<Container {...p}>
			<ContainerSection>
				<Text>Here is some text</Text>
			</ContainerSection>
			<ContainerSection>
				<Text>Here is some more text</Text>
			</ContainerSection>
		</Container>
	),
	items: [
		{
			props: {}
		}
	]
};
