
import { AvatarUserBuilder } from './avatar-user';
import { AvatarGroupBuilder } from './avatar-group';
import { AvatarCallCenterAgentStatus, UserPermissionLevel, Category, FlatCategory } from '../types';
import { AvatarQueueBuilder } from './avatar-queue';
import { LabelDataBuilder } from './label-data';
import { CategoryBuilder } from './category';
import { flattenCategories } from '../../';

// tslint:disable-next-line:max-line-length
const names = ['Bob', 'Jacob', 'Sima', 'Mazal', 'Uncle', 'Dod', 'Yasha', 'Yoshi', 'Daniel', 'Nimrod', 'Aaron', 'Gabi', 'Asaf', 'Boris', 'Tali', 'Adam', 'Itay', 'Elad', 'Zohar', 'Gil', 'Guy', 'Rami', 'Ramay', 'Bobby', 'John', 'Tal', 'Gal', 'Elliot', 'Shir', 'Ayelet', 'Michal', 'Eilon', 'Ben-el', 'Tavori', 'Joseph'];

const generateMany = <T>(gen: () => T, count: number): T[] => {
	return Array.apply(null, Array(count))
			.map(gen);
};

const enumToArray = (en: any): any[] => {
	const arr = [] as any[];
	for (const i in en) {
		if (!isNaN(i as any) && en.hasOwnProperty(i)) {
			arr.push(parseInt(i, 10));
		}
	}
	return arr;
};

export const randomUuid = () => {
	let d = new Date().getTime();
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		// tslint:disable-next-line:no-bitwise
		const r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		// tslint:disable-next-line:no-bitwise
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
};

const randomNumber = (min = 0, max = 10) => Math.floor((max - min) * Math.random() + min);

const pickRandom = <T>(l: T[]): T => {
	const idx = Math.floor(l.length * Math.random());
	return l[idx];
};

const randomName = (): string => pickRandom(names) + randomNumber(1, 99);

export const randomAvatarUser = (isAgent: boolean = false) => new AvatarUserBuilder()
	.withFirstName(randomName())
	.withLastName(randomName())
	.withPermissionLevel(isAgent ? UserPermissionLevel.AGENT : null)
	.withIsAgent(isAgent)
	.build();

export const randomAvatarUsers = (count: number, isAgent: boolean = false) =>
	generateMany(() => randomAvatarUser(isAgent), count);

export const randomAvatarGroup = () => new AvatarGroupBuilder()
	.withId(randomUuid())
	.withName(randomName())
	.build();

export const randomAvatarGroups = (count: number) => generateMany(randomAvatarGroup, count);

export const randomCallCenterAgentStatus = () =>
	pickRandom<AvatarCallCenterAgentStatus>(enumToArray(AvatarCallCenterAgentStatus));

export const randomAvatarQueue = () => new AvatarQueueBuilder()
	.withId(randomUuid())
	.withName(randomName())
	.build();

export const randomLabel = () => new LabelDataBuilder()
	.withId(randomUuid())
	.withName(randomName())
	.build();

export const randomLabels = (count: number) => generateMany(randomLabel, count);

const randomCategory = (children: Category[] = [], locale = 'en') => new CategoryBuilder()
	.withId(randomUuid())
	.withLang(locale)
	.withName(randomName())
	.withChildren(children)
	.build();

// tslint:disable-next-line:max-line-length
export const randomFlatCategoryTree = (howManyCategories: number = 10, subsCatPerCategory: number = 0, locale: string = 'en'): FlatCategory[] => {
	const cats = generateMany(() => {
		const children = generateMany(() => randomCategory([], locale), subsCatPerCategory);
		return randomCategory(children, locale);
	}, howManyCategories);

	return flattenCategories(cats);
};
