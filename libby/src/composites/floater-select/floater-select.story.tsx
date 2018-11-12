import {delay, AvatarUser, randomAvatarUsers} from '../../common';
import {FloaterSelect} from './floater-select.comp';
import * as React from 'react';
import { CallCenterAvatar } from '../../avatars/call-center-avatar/call-center-avatar';
import { Container } from '../../primitives/container/container';

export class StoryOfFloaterSelect extends React.PureComponent<any> {

	render () {
		const onSelect = (agent: AvatarUser) => alert(`${agent.fullName} was selected!`);
		const ItemRenderer = ({item}: any) => (
			// tslint:disable-next-line
			<span>
				<CallCenterAvatar user={item} size='xsmall' status={20}/>
				<span style={{marginLeft: '10px'}}>{item.fullName}</span>
			</span>
		);
		const placeholderText = 'Search for agents';
		const props: any = {
			search: this.search,
			ItemRenderer,
			debounceDelay: 500,
			placeholderText,
			noResults: 'No results..',
			onSelect
		};
		return (
			<div style={{width: '300px'}}>
				<Container>
					<FloaterSelect {...props}/>
				</Container>
			</div>
		);
	}

	private search = async (_: string, count: number) => {
		await delay(1500);
		return Promise.resolve(randomAvatarUsers(count, true));
	}
}
