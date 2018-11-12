import * as React from 'react';
import { BaseProps } from '../../../common';
import { Text } from '../../../typography';
import { namespacedClassnames } from '../../../common/namespace-classes';

export type SettingsContainerSectionProps = {
	title: string | JSX.Element;
	description?: string | JSX.Element;
} & BaseProps;

export const SettingsContainerSection = (props: SettingsContainerSectionProps) => {
	const classNames = namespacedClassnames('settings-container-section', props.className || '');

	return (
		<div className={classNames}>
			<div className='section-text'>
				<Text type='h2a' className='title'>{props.title}</Text>
				{props.description ? <Text type='t2b' className='description'>{props.description}</Text> : null}
			</div>
			<div className='actions-container'>
				{props.children}
			</div>
		</div>
	);
};
