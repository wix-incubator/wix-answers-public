export type TranslationSource = {[k: string]: string};
export type TranslateFn = (key: string, params?: {[k: string]: string | number}) => string;

export type Locale = 'en' | string;

export type LocaleToTranslationSource = {
	en: TranslationSource,
	[k: string]: TranslationSource;
};

export const createTranslateFn = (source: TranslationSource): TranslateFn => {

	const translateFn: TranslateFn = (key, params = {}) => {
		const str = source[key] || key;

		return Object.keys(params).reduce((prev, paramName) => {
			const param = params[paramName];

			const pattern = new RegExp(`{{${paramName}}}`, 'g');
			return prev.replace(pattern, param.toString());
		}, str);
	};

	return translateFn;
};
