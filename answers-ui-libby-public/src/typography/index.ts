import {namespacedClassnames} from '../common/namespace-classes';

const actionEmptyStatePlaceholder = namespacedClassnames('action-empty-state-placeholder');

export const typography = {
	actionEmptyStatePlaceholder
};

export * from './titles/titles';
export * from './texts/texts';
export * from './text';
export * from './ellipsis';

export type TypographyConfig  = {
	size: number,
	weight: 300 | 400 | 500,
	color: string,
	style?: 'normal' | 'italic'
};

export type TypograpyTypes = {
	h0: TypographyConfig,
	h0a: TypographyConfig,
	h0b: TypographyConfig,
	h0c: TypographyConfig,
	h1: TypographyConfig,
	h2: TypographyConfig,
	h2a: TypographyConfig,
	h2b: TypographyConfig,
	t0: TypographyConfig,
	t0a: TypographyConfig,
	t1: TypographyConfig,
	t1a: TypographyConfig,
	t1b: TypographyConfig,
	t1c: TypographyConfig,
	t2: TypographyConfig,
	t2a: TypographyConfig,
	t2b: TypographyConfig,
	t2c: TypographyConfig,
	t4: TypographyConfig,
	t4a: TypographyConfig,
	t4b: TypographyConfig,
	t4c: TypographyConfig,
	t4d: TypographyConfig
};

export type TypographyType = keyof TypograpyTypes;

export const defaultTypographyType: TypographyType = 't2';

export const typographyTypes: TypograpyTypes = {
	h0: {
		size: 28,
		weight: 400,
		color: 'd10'
	},
	h0a: {
		size: 28,
		weight: 300,
		color: 'd30'
	},
	h0b: {
		size: 34,
		weight: 300,
		color: 'd20'
	},
	h0c: {
		size: 44,
		weight: 300,
		color: 'd20'
	},
	h1: {
		size: 20,
		weight: 500,
		color: 'd10'
	},
	h2: {
		size: 16,
		weight: 500,
		color: 'd20'
	},
	h2a: {
		size: 16,
		weight: 400,
		color: 'd20'
	},
	h2b: {
		size: 16,
		weight: 300,
		color: 'd30'
	},
	t0: {
		size: 18,
		weight: 400,
		color: 'd20'
	},
	t0a: {
		size: 18,
		weight: 500,
		color: 'd10'
	},
	t1: {
		size: 14,
		weight: 500,
		color: 'd20'
	},
	t1a: {
		size: 14,
		weight: 400,
		color: 'd20'
	},
	t1b: {
		size: 14,
		weight: 400,
		color: 'd30',
		style: 'italic'
	},
	t1c: {
		size: 14,
		weight: 400,
		color: 'd30'
	},
	t2: {
		size: 14,
		weight: 400,
		color: 'd40'
	},
	t2a: {
		size: 14,
		weight: 400,
		color: 'd40'
	},
	t2b: {
		size: 14,
		weight: 300,
		color: 'd30'
	},
	t2c: {
		size: 14,
		weight: 300,
		color: 'd20'
	},
	t4: {
		size: 10,
		weight: 400,
		color: 'd10'
	},
	t4a: {
		size: 12,
		weight: 400,
		color: 'd30'
	},
	t4b: {
		size: 12,
		weight: 300,
		color: 'd40'
	},
	t4c: {
		size: 12,
		weight: 400,
		color: 'd50'
	},
	t4d: {
		size: 12,
		weight: 400,
		color: 'd40'
	}
};
