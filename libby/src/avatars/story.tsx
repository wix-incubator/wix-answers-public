import { Column } from '../common/story-utils';
import * as React from 'react';
import {AvatarSizes, UserAvatar, GroupAvatar, UserAvatarOnBg, QueueAvatar, CallCenterAvatar} from '../';
import {
	AvatarUserBuilder, AvatarGroupBuilder, randomAvatarUser, randomCallCenterAgentStatus, randomAvatarQueue
} from '../common';

const avatarSizes: AvatarSizes[] = ['xsmall', 'small', 'normal', 'large', 'xlarge'];

const createUserAvatars = () => {
	return avatarSizes.map((size: AvatarSizes) => {
		const userWithProfle = new AvatarUserBuilder().build();
		const userWithoutProfle = new AvatarUserBuilder()
			.withFirstName(userWithProfle.firstName).withProfileImage('').build();
		const anonUser = new AvatarUserBuilder().withFirstName('').withProfileImage('').build();

		return (
			<Column title={size} key={size}>
				<span className='column'><UserAvatar user={userWithoutProfle} size={size}/></span>
				<span className='column'><UserAvatar user={userWithProfle} size={size}/></span>
				<span className='column'><UserAvatar user={anonUser} size={size}/></span>
			</Column>
		);
	});
};

const createUserAvatarsOnBackground = () => {
	return ['normal', 'large'].map((s: string) => {
		const size = s as AvatarSizes;
		const userWithProfle = new AvatarUserBuilder().build();
		const userWithoutProfle = new AvatarUserBuilder()
			.withFirstName(userWithProfle.firstName).withProfileImage('').build();
		const anonUser = new AvatarUserBuilder().withFirstName('').withProfileImage('').build();

		return (
			<Column title={size} key={size}>
				<span className='column'><UserAvatarOnBg user={userWithoutProfle} size={size}/></span>
				<span className='column'><UserAvatarOnBg user={userWithProfle} size={size}/></span>
				<span className='column'><UserAvatarOnBg user={anonUser} size={size}/></span>
			</Column>
		);
	});
};

const createCallCenterAvatars = () => {
	return avatarSizes.map((size: AvatarSizes) => {
		const agentWithProfile = randomAvatarUser();
		const agentWithoutProfile = randomAvatarUser();
		agentWithoutProfile.profileImage = '';
		const randomStatus1 = randomCallCenterAgentStatus();
		const randomStatus2 = randomCallCenterAgentStatus();

		return (
			<Column title={size} key={size}>
				<span className='column'>
					<CallCenterAvatar user={agentWithoutProfile} status={randomStatus1} size={size}/>
				</span>
				<span className='column'>
					<CallCenterAvatar user={agentWithProfile} status={randomStatus2} size={size}/>
				</span>
			</Column>
		);
	});
};

const createGroupAvatars = () => {
	return avatarSizes.map((size: AvatarSizes) => {
		const group = new AvatarGroupBuilder().build();

		return (
			<Column title={size} key={size}>
				<span className='column'><GroupAvatar group={group} size={size}/></span>
			</Column>
		);
	});
};

const createQueueAvatars = () => {
	return avatarSizes.map((size: AvatarSizes) => {
		const queue = randomAvatarQueue();

		return (
			<Column title={size} key={size}>
				<span className='column'><QueueAvatar queue={queue} size={size}/></span>
			</Column>
		);
	});
};

export const AvatarsStory = () => {
	return (
		<div className='story-container'>
			<h2 className='h2-title'>Avatars</h2>

			<div className='preview'>
				<h4 className='h4-title'>User Avatars</h4>
				<div>{createUserAvatars()}</div>
			</div>

			<div className='preview dark-bg' style={{backgroundColor: '#31424f'}}>
				<h4 className='h4-title'>User Avatars on background</h4>
				<div>{createUserAvatarsOnBackground()}</div>
			</div>

			<div className='preview'>
				<h4 className='h4-title'>Group Avatars</h4>
				<div>{createGroupAvatars()}</div>
				<h4 className='h4-title'>Queue Avatars</h4>
				<div>{createQueueAvatars()}</div>
			</div>

			<div className='preview'>
				<h4 className='h4-title'>Agent/Callcenter Avatars</h4>
				<div>{createCallCenterAvatars()}</div>
			</div>
		</div>
	);
};
