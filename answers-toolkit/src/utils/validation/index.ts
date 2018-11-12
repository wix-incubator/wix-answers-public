import * as emailValidator from 'email-validator';

export const isEmailValid = (str: string): boolean => {
	return emailValidator.validate(str);
};

export const isUrl = (text: string) => {
	const pattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
	return pattern.test(text);
};
