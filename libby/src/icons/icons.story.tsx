import * as React from 'react';

import * as iconComponents from './icons-components';
import { iconsMap } from './processed';
import { Column } from '../common/story-utils';
import { Icon } from '../primitives/icon/icon';

export const StoryOfIcons = () => {
	let iconsArray: any = [];

	// Create iconComponents demo
	for (const icon of Object.keys(iconComponents)) {
		if (typeof (iconComponents as any)[icon] === 'function') {
			const iconComp = (
				<Column title={icon}>
					{(iconComponents as any)[icon]()}
				</Column>
			);

			iconsArray = [...iconsArray, iconComp];
		}
	}

	// Create processed icons demo
	for (const iconKey of Object.keys(iconsMap)) {
		const comp = (
			<Column title={iconKey}>
				<Icon icon={(iconsMap as any)[iconKey]}/>
			</Column>
		);

		iconsArray = [...iconsArray, comp];
	}

	return (
		<div className='icons-story'>
			{iconsArray}
		</div>
	);
};
