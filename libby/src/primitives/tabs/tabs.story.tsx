import * as React from 'react';
import {Tabs} from './tabs';
import { LinkButton } from '..';
import { WarningMessageBox } from '../message-box/message-box';

export class TabsStory extends React.Component<any, any> {
	state = {
		selected: '',
		items: ['Lines Manager', 'Queues Manager', 'Voice & Messages']
	};

	constructor (props: any) {
		super(props);
		this.state.selected = this.state.items[0];
	}

	render () {
		const changeValue = (selected: string) => {
			this.setState({selected});
		};

		const add = () => {
			const n = prompt('Tab text');
			this.setState({items: [...this.state.items, n]});
		};

		const next = () => {
			const {items, selected} = this.state;
			const idx = items.indexOf(selected);
			const newItem = items[idx + 1 >= items.length ? 0 : idx + 1];
			this.setState({selected: newItem});
		};

		const tabItems = this.state.items.map((text, idx) => {
			if (idx === 2) {
				return { element: text, key: text, disabled: true, disabledTooltip: 'Disabled!' };
			} else {
				return {element: text, key: text};
			}
		});

		return (
			<div>
				<div>
					<h5 className='h5-title'>Normal</h5>
					<Tabs items={tabItems} onChange={changeValue} selected={this.state.selected}/>
				</div>
				<div>
					<h5 className='h5-title'>Larger</h5>
					<Tabs items={tabItems} size='large' onChange={changeValue} selected={this.state.selected}/>
				</div>
				<div>
					<LinkButton onClick={add}>Add</LinkButton>
					<LinkButton onClick={next}>Next</LinkButton>
					<WarningMessageBox>Tabs do not come in a container, just the tabs. Use TabsContainer composite</WarningMessageBox>
				</div>
			</div>
		);
	}
}
