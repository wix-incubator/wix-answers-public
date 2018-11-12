import {Column} from '../../common';
import * as React from 'react';
import { SimpleTooltip } from './simple-tooltip';
import { InfoTooltip } from '../info-tooltip/info-tooltip';

export class StoryOfSimpleTooltip extends React.Component<any, any> {
	render () {
		return (
			<span className='row'>
				<Column title='Default'>
					<SimpleTooltip text='I appear on hover!'>
						<span>Hover Me</span>
					</SimpleTooltip>
				</Column>
				<Column title='Info Tooltip'>
					<InfoTooltip text='I appear on hover!'/>
				</Column>
			</span>
		);
	}
}
