'use strict';

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

global.DOMParser = DOMParser;
var translations = require('@wix/answers-translation-statics').getTranslationsForTests('en');

window.___answersTranslations = {en: translations};
window.getSelection = () => ({
	removeAllRanges: () => {},
	addRange: () => {},
	getRangeAt: () => {return {
		setEnd: () => {},
		cloneRange: () => {}
	}}
});
global.getSelection = window.getSelection;

document.body.createTextRange = () => ({
	getClientRects: () => {
		return {
			length: 0,
		};
	},
	getBoundingClientRect: () => ({})
});

document.createRange = () => ({
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


const Audio = function () {
	return {play: () => {}};
};

global.Audio = window.Audio = Audio;

global.Image = function () {
	return {};
};
