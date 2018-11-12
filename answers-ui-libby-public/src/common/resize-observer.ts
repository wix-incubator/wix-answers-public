import { ResizeObserverHandler } from './resize-observer';
import * as ResizeObserver from 'resize-observer-polyfill';
// import ResizeObserver from 'resize-observer-polyfill';
import { noop } from '.';

export type OnResizeCallback = (width: number, height: number) => void;

export type ResizeObserverHandler = {
	observeElem: (elem: Element) => void;
	unobserveElem: (elem: Element) => void;
	clean: () => void;
};

export const safelyCreateResizeObserver = (resizeCb: OnResizeCallback): ResizeObserverHandler => {
	try {
		// Looks like weird things happen when RO plays with jsdom.
		// https://github.com/que-etc/resize-observer-polyfill/issues/34
		// Because we create modals in many places, here seemed a good place to ensure
		// safe initialization in RO
		const w: any = window;
		if (!w.SVGElement) {
			w.SVGElement = HTMLElement;
		}

		const RO: any = ResizeObserver;
		const resizeObserver = new RO((observedElements: any) => {
			observedElements.forEach((elem: any) => {
				const {width, height} = elem.contentRect;
				resizeCb(width, height);
			});
		});

		return {
			observeElem: (elem) => resizeObserver.observe(elem),
			unobserveElem: (elem) => resizeObserver.unobserve(elem),
			clean: () => resizeObserver.disconnect()
		};
	} catch (e) {
		console.warn(e);
		return {
			observeElem: (_) => noop(),
			unobserveElem: (_) => noop(),
			clean: () => noop()
		};
	}
};

export const createResizeObserver = (resizeCb: OnResizeCallback): ResizeObserverHandler => {
	return safelyCreateResizeObserver(resizeCb);
};
