import * as React from 'react';
import { Column } from '../../common';
import { DrillMenuItem } from './drill-menu-item';
import { noop } from 'answers-lib';
import { Text } from '../../typography';

export class StoryOfDrillMenuItem extends React.PureComponent<any> {
	render () {
		return (
			<div className='row'>
				<Column title='All States' style={{width: '600px'}}>
					<DrillMenuItem onClick={noop}><Text type='h2a'>Item 1</Text></DrillMenuItem>
					<DrillMenuItem onClick={noop}><Text type='h2a'>Item 2</Text></DrillMenuItem>
					<DrillMenuItem onClick={noop}><Text type='h2a'>Item 3</Text></DrillMenuItem>
					<DrillMenuItem onClick={noop} disabled={true}>Disabled</DrillMenuItem>
				</Column>
			</div>
		);
	}
}
