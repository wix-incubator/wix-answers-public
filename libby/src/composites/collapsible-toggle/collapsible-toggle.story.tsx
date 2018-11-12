import { Column } from '../../common/story-utils';
import { CollapsbileToggle, CollapsibleToggleValue } from './collapsible-toggle';
import * as React from 'react';

export class StoryOfCollapsibleToggle extends React.Component<any, any> {
	state = {
		toggled: true,
		expanded: false
	};

	render () {
		const noOp = (): any => null;
		const toggle = (newValue: CollapsibleToggleValue) => {
			this.setState({ toggled: newValue.toggled , expanded: newValue.expanded });
		};

		const value = {expanded: this.state.expanded, toggled: this.state.toggled};

		return (
			<span className='row'>
				<Column title='Example'>
					<CollapsbileToggle title='English' value={value} onChange={toggle}>
						<div>This is collapsible body</div>
					</CollapsbileToggle>
				</Column>
				<Column title='Disabled - On'>
					<CollapsbileToggle title='Disabled' value={{expanded: false, toggled: true}} onChange={noOp} disabled={true}>
						<div>This is disabled</div>
					</CollapsbileToggle>
				</Column>
				<Column title='Disabled - Off'>
					<CollapsbileToggle title='Disabled' value={{expanded: false, toggled: false}} onChange={noOp} disabled={true}>
						<div>This is disabled</div>
					</CollapsbileToggle>
				</Column>
				<Column title='Disabled - On - Expanded'>
					<CollapsbileToggle title='Disabled' value={{expanded: true, toggled: true}} onChange={noOp} disabled={true}>
						<div>This is disabled</div>
					</CollapsbileToggle>
				</Column>
				<Column title='Disabled - Off - Expanded'>
					<CollapsbileToggle title='Disabled' value={{expanded: true, toggled: false}} onChange={noOp} disabled={true}>
						<div>This is disabled</div>
					</CollapsbileToggle>
				</Column>
			</span>
		);
	}
}
