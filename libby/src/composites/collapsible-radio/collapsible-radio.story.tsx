import { Column } from '../../common/story-utils';
import {RadioGroup} from '../../primitives/radio-group/radio-group';
import {CollapsibleRadio} from './collapsible-radio';
import * as React from 'react';
import { RadioValue } from '../..';

export enum Bob {
	HI,
	HELLO,
	BYE
}

export class StoryOfCollapsibleRadio extends React.Component<any, any> {
	state = {
		selectedValue: Bob.HI
	};

	render () {
		const selectedValue = this.state.selectedValue;
		const onSelect = (val: RadioValue) => {
			this.setState({selectedValue: val});
		};

		return (
			<span className='row'>
				<RadioGroup selectedValue={selectedValue} onChange={onSelect}>
					<Column title='Example'>
						<CollapsibleRadio title='Radio 1' value={Bob.HI} key={1}>
							<div>This is collapsible body 1</div>
						</CollapsibleRadio>
					</Column>
					<Column title='With description'>
						<CollapsibleRadio title='Radio 2' value={Bob.HELLO} description={<span>This is HTML Element</span>} key={2}>
							<div>Bob is going radio 2</div>
						</CollapsibleRadio>
					</Column>
					<Column title='Disabled - Off'>
						<CollapsibleRadio title='Radio 3' value={Bob.BYE} disabled={true} key={3}/>
					</Column>
					<Column title='Disabled - On'>
						<CollapsibleRadio title='Radio 3' value={selectedValue} disabled={true} key={3}>
							<div>Bob and Bobbet</div>
						</CollapsibleRadio>
					</Column>
					<Column title='Disabled - Off - with description'>
						<CollapsibleRadio title='Radio 4' value={Bob.BYE} description='I am disabled' disabled={true} key={3}/>
					</Column>
					<Column title='Disabled - On - with description'>
						<CollapsibleRadio title='Radio 4' value={selectedValue} description='I am disabled' disabled={true} key={3}>
							<div>Bob and Bobbet</div>
						</CollapsibleRadio>
					</Column>
					<Column title='Without children'>
						<CollapsibleRadio title='Radio 5' value={Bob.HI} key={5} />
					</Column>
				</RadioGroup>
			</span>
		);
	}
}
