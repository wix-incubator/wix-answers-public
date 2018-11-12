import * as React from 'react';
import { InfiniteScroll } from './';
import { UserAvatar } from '../../avatars';
import { Text } from '../../typography';
import { delay, AvatarUser, randomAvatarUsers } from '../../common';

export class StoryOfInfiniteScroll extends React.Component<any, any> {

	users: AvatarUser[] = randomAvatarUsers(200);

	fetchData = async (offset: number, count: number) => {
		console.info('fetching data!');
		const data = this.users.slice(offset, offset + count);
		await delay(500);
		return data;
	}

	renderItem = (user: AvatarUser) => {
		return (
			<div style={{ height: 60, display: 'flex', alignItems: 'center' }}>
				<UserAvatar user={user} />
				<Text type='t1'>{user.fullName}</Text>
		</div>
		);
	}

	renderTombstone = () => {
		return <div style={{ height: 60 }}><Text type='t1'>tombstone</Text></div>;
	}

	render () {
		return (
			<span className='row'>
				<div className='column' style={{ width: 300, borderRadius: 4, border: '1px solid lightgray' }}>
					<InfiniteScroll<AvatarUser>
						itemHeight={60}
						listHeight={400}
						enablePolling={true}
						pollingInterval={20000}
						fetchData={this.fetchData}
						renderItem={this.renderItem}
						renderTombstone={this.renderTombstone}
					/>
				</div>
			</span>
		);
	}
}
