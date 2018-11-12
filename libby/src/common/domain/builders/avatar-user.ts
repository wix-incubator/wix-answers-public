import { AvatarUser, UserPermissionLevel } from '../types';

export class AvatarUserBuilder {
	user: AvatarUser;

	constructor () {
		this.user = {
			id: 'bboob0b0b0-boobob-obob00b0b-0b0b0b',
			firstName: 'bob',
			lastName: 'last',
			fullName: 'bob last',
			profileImage: 'http://www.traviscreekstables.com/img/img-horses02.jpg',
			isAgent: false
		};
	}

	withId (id: string) {
		this.user.id = id;
		return this;
	}

	withFirstName (firstName: string) {
		this.user.firstName = firstName;
		return this;
	}

	withLastName (lastName: string) {
		this.user.lastName = lastName;
		return this;
	}

	withFullName (fullName: string) {
		this.user.fullName = fullName;
		return this;
	}

	withProfileImage (profileImage: string) {
		this.user.profileImage = profileImage;
		return this;
	}

	withIsAgent (isAgent: boolean) {
		this.user.isAgent = isAgent;
		return this;
	}

	withPermissionLevel (permissionLevel: UserPermissionLevel | null) {
		this.user.permissionLevel = permissionLevel || undefined;
		return this;
	}

	build (): AvatarUser {
		return this.user;
	}
}
