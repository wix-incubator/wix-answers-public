module.exports = function (wallaby) {


	return {
		files: [
			'src/**/*.ts',
			'src/**/*.tsx',
			{pattern: 'src/**/*.test.tsx', ignore: true},
			{pattern: 'src/**/*.test.ts', ignore: true},
			{pattern: 'src/**/spec.tsx', ignore: true},
			{pattern: 'src/**/spec.ts', ignore: true},
			{pattern: 'node_modules/**/*', ignore: true},
			{pattern: 'fixture/**/*', instrument: true}
		],

		tests: [
			'src/**/*.test.tsx',
			'src/**/*.test.ts',
			'src/**/spec.ts',
			'src/**/spec.tsx'
		],
		compilers: {
			'src/**/*.tsx?': wallaby.compilers.typeScript({
				module: 'commonjs',
				jsx: 'react'
			})
		},
		testFramework: 'mocha',
		env: {
			type: 'node'
		},
		// This has to be copied from jsdom setup...
		setup: function (wallaby) {
			const cleanup = require('jsdom-global')();

			const raf = require('raf');
			raf.polyfill(global);
			raf.polyfill(window);

			var LocalStorage = require('localstorage-memory');
			global.localStorage = LocalStorage;
			global.window.localStorage = global.localStorage;

			global.sessionStorage = localStorage;
			global.window.sessionStorage = localStorage;
			const DOMParser = function () {
				this.parseFromString = function (str) {
					const elem = document.createElement('div');
					elem.innerHTML = str;
					return {
						body: elem
					};
				}
			};

			global.DOMParser = DOMParser;
			global.window.DOMParser = DOMParser;

			global.window.body = {};
			global.window.document.body.createTextRange = () => ({
				getClientRects: () => {
					return {
						length: 0,
					};
				},
				getBoundingClientRect: () => ({})
			});

			global.document.createRange = () => ({
				setStart: () => {
					return {};
				},
				setEnd: () => {
					return {};
				},
				commonAncestorContainer: document.createElement('div'),
				getClientRects: () => {
					return {
						length: 0,
					};
				},
				getBoundingClientRect: () => ({})
			});

			window.getSelection = () => ({});

			var translations = require('answers-translation-statics').getTranslationsForTests('en');

			window.___answersTranslations = {en: translations};

			const Audio = function () {
				return { play: () => { } };
			};

			global.Audio = window.Audio = Audio;

			global.Image = function () {
				return {};
			};

		}
	}
};
