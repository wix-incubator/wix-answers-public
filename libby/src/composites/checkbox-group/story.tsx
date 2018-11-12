import * as React from 'react';
import { CheckboxGroup } from '.';
import { Text } from '../../typography';
import { Container } from '../../primitives/container';
import { Popover } from '../../primitives/popover/popover';
import { Button } from '../../primitives/buttons/button/button';
import { randomAvatarUsers, AvatarUser } from '../../common';

export class StoryOfCheckboxGroup extends React.Component<any, any> {
	allUsers: AvatarUser[] = randomAvatarUsers(20).map((u) => ({...u, fullName: `${u.firstName} ${u.lastName}`}));
	usersMap = new Map(this.allUsers.map<[string, boolean]>((u) => [u.id, false]));

	state = {
		users: this.allUsers,
		usersMap: this.usersMap,
		isPopover: false,
	};

	renderLabel = (id: string) => <Text>{this.allUsers.find((u) => u.id === id)!.fullName}</Text>;

	onChange = (usersMap: any) => this.setState({usersMap});

	onSearchTermChange = (term: string) => {
		const filteredUserIds = this.allUsers
			.filter((u) => u.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1)
			.map((u) => u.id);

		this.setState({searchTerm: term, filteredUserIds});
	}

	openPopover = () => this.setState({isPopover: true});

	closePopover = () => this.setState({isPopover: false});

	render () {
		const {state} = this;

		const items = state.users.map((user) => ({
			id: user.id,
			label: user.fullName,
			customElement: <Text>{user.fullName}</Text>
		}));

		const checkboxGroup = (
			<CheckboxGroup
				value={state.usersMap}
				items={items}
				onChange={this.onChange}
				searchPlaceholder='Search'
				maxSelections={3}
				maxSelectionsText={`Selection limited to 3 items`}
			/>
		);

		return (
			<div>
				<Container className='column'>
					{checkboxGroup}
				</Container>
				<Popover body={checkboxGroup} isOpen={state.isPopover} onOuterAction={this.closePopover}>
					<Button onClick={this.openPopover}>In Popover</Button>
				</Popover>
			</div>
		);
	}
}
