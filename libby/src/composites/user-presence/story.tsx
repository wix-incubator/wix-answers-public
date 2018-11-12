import * as React from 'react';
import { UserPresence, PresenceType } from '.';
import { Column, AvatarUserBuilder } from '../../common';

export class StoryOfUserPresence extends React.Component<any, any> {
	render () {
		const t = () => 'bob';

		const users = [
			new AvatarUserBuilder().withProfileImage('').build(),
			new AvatarUserBuilder().withFullName('yossi haba').withId('1').build(),
			new AvatarUserBuilder().withFullName('chinggis khan').withId('2').build(),
		];

		const presenceTalking = [...users].map((u) => ({ user: u, type: PresenceType.TALKING }));
		const presenceTyping = [...users].map((u) => ({ user: u, type: PresenceType.TYPING }));
		const presenceViewing = [...users].map((u) => ({ user: u, type: PresenceType.VIEWING }));

		return (
			<span className='row'>
				<Column title={'Typing'}>
					<UserPresence presenceUserData={presenceTyping} t={t} />
				</Column>
				<Column title={'Talking'}>
					<UserPresence presenceUserData={presenceTalking} t={t} showText={true} />
				</Column>
				<Column title={'Typing'}>
					<UserPresence presenceUserData={[...presenceTyping, ...presenceTyping]} t={t} showText={false} />
				</Column>
				<Column title={'Viewing'}>
					<UserPresence presenceUserData={presenceViewing} t={t} showText={true} />
				</Column>
			</span>
		);
	}
}
