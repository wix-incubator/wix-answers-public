export enum UserPermissionLevel {
	ADMINISTRATOR = 80,
	AGENT = 20
}

export enum TicketPriority {
	LOW = 10,
	NORMAL = 20,
	HIGH = 30
}

export enum FileUploadError {
	FAILED_UPLOADING_ATTACHMENT = -73001,
	INVALID_EXTENSION = -73002,
	MAX_FILE_SIZE_EXCEEDED = -73003
}

export enum AvatarCallCenterAgentStatus {
	ONLINE = 10,
	WRAPPING_UP = 20,
	RESERVED = 30,
	TALKING = 40,
	LISTENING = 50,
	BUSY = 60,
	OFFLINE = 100
}

export interface AvatarUser {
	id: string;
	firstName: string;
	lastName: string;
	fullName: string;
	isAgent: boolean;
	profileImage: string;
	permissionLevel?: UserPermissionLevel;
}

export interface AvatarGroup {
	id: string;
	name: string;
}

export interface LabelData {
	id: string;
	name: string;
}

export interface AvatarQueue {
	name: string;
	id: string;
}

export interface Category {
	id: string;
	locale: string;
	name: string;
	parentId: string;
	url: string;
	uri: string;
	children?: Category[];
}

export interface FlatCategory {
	name: string;
	parentName?: string;
	id: string;
}

export type FlatCategoryList = FlatCategory[];

export declare type TranslateFunc = (key: string, params?: {
	[key: string]: string;
}) => string;

export interface PhoneLine {
	id: string;
	name: string;
	phoneNumber: string;
}

export interface PhoneNumber {
	number: string;
	countryCode: string;
}

export type FileUploadResponse = {
	filename: string;
	extension: string;
	filePath: string;
	filelink: string;
	contentType: string;
	fileSizeBytes: number;
	secured: boolean;
};
