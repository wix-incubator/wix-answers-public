'use strict';
import { brandifier, nextGenBrandifier, getIdealForegroundColor, getIdealTextColor, defaultDarkTextColor, defaultBrightTextColor } from './';

import { expect } from 'chai';

const WHITE = '#ffffff';
const BLACK = '#000000';
const red = '#ff0000';

describe('Brandifier', () => {
	it('should not do anything when there is enough contrast', () => {
		expect(brandifier(red, WHITE, WHITE)).to.eql(red);
	});

	describe('over white background', () => {
		it('should return second color when first is too light', () => {
			const color1 = WHITE;
			const color2 = BLACK;

			expect(brandifier(color1, color2, WHITE)).to.eql(color2);

			expect(brandifier(color2, color1, WHITE)).to.eql(color2);

			expect(brandifier(color1, color2, BLACK)).to.eql(color1);
		});
	});

	describe('light color over light background', () => {
		it('should return the less light color out of the two', () => {
			const color1 = '#eeeeee';
			const color2 = '#e2e2e2';
			const bg = '#ffffff';

			expect(brandifier(color1, color2, bg)).to.eql(color2);
		});
	});

	describe('dark color over dark background', () => {
		it('should return the less dark color out of the two', () => {
			const color1 = '#2e2e2e';
			const color2 = '#444242';
			const bg = '#000000';

			expect(brandifier(color1, color2, bg)).to.eql(color2);
		});
	});
});

// new brandifier tests
// ====================
describe('New Brandifier', () => {
	it('should not do anything when there is enough contrast', () => {
		expect(nextGenBrandifier(red, WHITE, WHITE)).to.eql(red);
	});

	describe('over white background', () => {
		it('should return second color when first is too light', () => {
			const color1 = WHITE;
			const color2 = BLACK;

			expect(nextGenBrandifier(color1, color2, WHITE)).to.eql(color2);

			expect(nextGenBrandifier(color2, color1, WHITE)).to.eql(color2);

			expect(nextGenBrandifier(color1, color2, BLACK)).to.eql(color1);
		});
	});

	describe('light color over light background', () => {
		it('should return the less light color out of the two', () => {
			const color1 = '#eeeeee';
			const color2 = '#e2e2e2';
			const bg = '#ffffff';

			expect(nextGenBrandifier(color1, color2, bg)).to.eql(color2);
		});
	});

	describe('dark color over dark background', () => {
		it('should return the less dark color out of the two', () => {
			const color1 = '#2e2e2e';
			const color2 = '#444242';
			const bg = '#000000';

			expect(nextGenBrandifier(color1, color2, bg)).to.eql('#787676');
		});
	});

	describe('get ideal color', () => {
		it('should return best foreground color according background', () => {
			const color1 = '#000000';
			const color2 = '#ffffff';

			expect(getIdealForegroundColor(color1, [color1, color2])).to.eql(color2);
			expect(getIdealForegroundColor(color2, [color1, color2])).to.eql(color1);
		});

		it('should return best text color according background', () => {
			expect(getIdealTextColor('#fffff')).to.eql(defaultDarkTextColor);
			expect(getIdealTextColor('#232323')).to.eql(defaultBrightTextColor);
		});
	});
});
