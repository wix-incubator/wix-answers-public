// Const colors
const WHITE = '#FFFFFF';
const BLACK = '#000000';

// Constants
// const minContrastRatio = 4.5;
// const minBrightnessDifference = 125;
// const minColorDifference = 500;
const numOfIterationsGlobal = 15;
const colorChangeAmplifier = 5;

export const defaultBrightTextColor = WHITE;
export const defaultDarkTextColor = '#445868';

function iterateBrightenOrDarken (hexColor: string, background: string, numOfIterations: number): string {
	let ratio = getContrastRatio(hexColor, background);
	let bc = hexColor;
	const bg = background;

	for (let i = 0; i < numOfIterations; i++) {
		if (ratio < 4.5) {
			// branding color is darker than background
			if (getLumaFromHex(bc) > getLumaFromHex(bg)) {
				// try to lighten bc
				if (getDistanceBetweenColors(bc, BLACK) > 25) {
					bc = lighten(bc, colorChangeAmplifier);
					ratio = getContrastRatio(bc, background);
				} else {
					return bc;
				}
			// branding color is lighter than background
			} else {
				// try to darken bc
				if (getDistanceBetweenColors(bc, WHITE) > 25) {
					bc = lighten(bc, -colorChangeAmplifier);
					ratio = getContrastRatio(bc, background);
				} else {
					return bc;
				}
			}
		} else {
			return bc;
		}
	}
	return bc;
}

export function nextGenBrandifier (hexColor1: string, hexColor2: string, background: string, prefferedColor?: number) {

	if (!hexColor1) {
		throw new Error('You must pass color1!');
	} else if (!hexColor2) {
		throw new Error('You must pass color2!');
	} else if (!background) {
		throw new Error('You must pass background!');
	}

	let bc1 = hexColor1;
	let bc2 = hexColor2;
	const bg = background;

	let ratio1 = getContrastRatio(hexColor1, bg);
	let ratio2 = getContrastRatio(hexColor2, bg);
	// const c1 = getLumaFromHex(hexColor1);
	// const c2 = getLumaFromHex(hexColor2);

	if (ratio1 < 4.5 && (calculateBrightnessDifference(bc1, bg) < 125 && calculateColorDifference(bc1, bg) < 500)) {
		const bc1Iterations = (prefferedColor === 1) ? numOfIterationsGlobal * 2 : numOfIterationsGlobal;
		const bc2Iterations = (prefferedColor === 2) ? numOfIterationsGlobal * 2 : numOfIterationsGlobal;

		// try to fix branding color 1
		bc1 = iterateBrightenOrDarken(bc1, bg, bc1Iterations);
		ratio1 = getContrastRatio(bc1, bg);

		if (ratio1 >= 4.5) {
			return bc1;
		} else {
			// branding color 1 is no good, try to use branding color 2
			bc2 = iterateBrightenOrDarken(bc2, bg, bc2Iterations);
			ratio2 = getContrastRatio(bc2, bg);

			if (ratio2 >= 4.5) {
			return bc2;
			} else {

			// cannot find good color, so returning the best one
			return ratio1 > ratio2 ? bc1 : bc2;
			}
		}
	} else {
		// tslint:disable-next-line:no-console
		console.log('No Change needed!');
	}

	// make sure to output hex color
	bc1 = bc1.indexOf('#') === -1 ? '#'.concat(bc1) : bc1;
	bc2 = bc2.indexOf('#') === -1 ? '#'.concat(bc2) : bc2;

	return bc1;
}

// function passContrastStandards (ratio: number) {
// 	let normalAA;
// 	let bigAA;
// 	let normalAAA;
// 	let bigAAA;

// 	if (ratio >= 4.5) {
// 		normalAA = true;
// 		bigAAA = true;
// 	} else {
// 		normalAA = false;
// 		bigAAA = false;
// 	}

// 	if (ratio >= 3) {
// 		bigAA = true;
// 	} else {
// 		bigAA = false;
// 	}

// 	if (ratio >= 7) {
// 		normalAAA = true;
// 	} else {
// 		normalAAA = false;
// 	}

// 	return {normalAA, bigAA, normalAAA, bigAAA};
// }

export function brandifier (hexColor1: string, hexColor2: string, backgroundHexColor: string) {

	if (!hexColor1) {
		throw new Error('You must pass color1!');
	} else if (!hexColor2) {
		throw new Error('You must pass color2!');
	} else if (!backgroundHexColor) {
		throw new Error('You must pass background color!');
	}

	const color1Luma = getLumaFromHex(hexColor1);
	const color2Luma = getLumaFromHex(hexColor2);

	// const lighterColor;
	// const darkerColor;

	const originalC1 = hexColor1;
	const originalC2 = hexColor2;

	// tslint:disable-next-line:prefer-conditional-expression
	if (color1Luma > color2Luma) {
		// C1 is lighter than C2 -> Weight out C1 by making it lighter
		hexColor1 = lighten(hexColor1, 10);
	} else {
		// C1 is darker than C2 -> Weight out C1 by making it darker.
		hexColor1 = lighten(hexColor1, -10);
	}

	const c1yiq = getYiqFromHex(hexColor1);
	// const c2yiq = getYiqFromHex(hexColor2);
	const bgyiq = getYiqFromHex(backgroundHexColor);

	return (Math.abs(bgyiq - c1yiq) > 75) ? originalC1 : originalC2;
}

// Calculators
// ===========

export function hex2Rgb (hexColor: string): {r: number, g: number, b: number} {
	hexColor = hexColor.replace('#', '');
	const r = parseInt(hexColor.substr(0, 2), 16);
	const g = parseInt(hexColor.substr(2, 2), 16);
	const b = parseInt(hexColor.substr(4, 2), 16);

	return {r, g, b};
}

export function getYiqFromHex (hexcolor: string) {
	const rgb = hex2Rgb(hexcolor);
	return ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
}

// https://www.w3.org/TR/AERT#color-contrast - brightness difference should be above 125.
function calculateBrightnessDifference (hexcolor1: string, hexcolor2: string): number {
	const c1 = getYiqFromHex(hexcolor1);
	const c2 = getYiqFromHex(hexcolor2);

	return Math.ceil(Math.max(c1, c2) - Math.min(c1, c2));
}

export const getIdealForegroundColor = (backgroundColor: string, options: string[]) => {
	const diffObj = options.reduce((prev, curr) => {
	const diff = calculateColorDifference(backgroundColor, curr);
	return (diff > prev.diff) ? {diff, color: curr} : prev;
	}, {diff: 0, color: options && options[0]});
	return diffObj.color;
};

export const getIdealTextColor = (backgroundColor: string, darkColor: string = defaultDarkTextColor, brightColor: string = defaultBrightTextColor) => {
	return getIdealForegroundColor(backgroundColor, [darkColor, brightColor]);
};

// https://www.w3.org/TR/AERT#color-contrast - color difference should be above 500 to have sufficient hue contrast
function calculateColorDifference (hexColor1: string, hexColor2: string) {
	const rgb1 = hex2Rgb(hexColor1);
	const rgb2 = hex2Rgb(hexColor2);

	return (Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r))
	+ (Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g))
	+ (Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b));
}

function getLumaFromHex (hexcolor: string) {
	hexcolor = hexcolor.replace('#', '');
	const r = getsRGB(hexcolor.substr(0, 2));
	const g = getsRGB(hexcolor.substr(2, 2));
	const b = getsRGB(hexcolor.substr(4, 2));

	const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	return luma;
}

// http://webaim.org/resources/contrastchecker/
function getsRGB (hexcolor: string) {
	let color = parseInt(hexcolor, 16);
	color = color / 255;
	color = (color <= 0.03928) ? color / 12.92 : Math.pow(((color + 0.055) / 1.055), 2.4);
	return color;
}

// Luminosity Contrast Ratio should be above 4.5 to meet normalAA standards - https://www.w3.org/TR/WCAG/
function getContrastRatio (hexColor1: string, hexColor2: string): number {

	if (!hexColor1) {
		throw new Error('You must pass color1!');
	} else if (!hexColor2) {
		throw new Error('You must pass color2!');
	}

	// const minContrastRatio = 4.5;

	const c1 = getLumaFromHex(hexColor1);
	const c2 = getLumaFromHex(hexColor2);

	const ratio = (Math.max(c1, c2) + 0.05) / (Math.min(c1, c2) + 0.05);

	return parseFloat(ratio.toFixed(1));
}

// https://gist.github.com/renancouto/4675192
function lighten (hexColor: string, percent: number) {
	const color = hexColor.replace('#', '');

	// tslint:disable-next-line:one-variable-per-declaration
	const num = parseInt(color, 16),
		amt = Math.round(2.55 * percent),
		// tslint:disable-next-line:no-bitwise
		R = (num >> 16) + amt,
		// tslint:disable-next-line:no-bitwise
		B = (num >> 8 & 0x00FF) + amt,
		// tslint:disable-next-line:no-bitwise
		G = (num & 0x0000FF) + amt;

	return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
}

// https://gist.github.com/mailtruck/2411659
function getDistanceBetweenColors (hexColor1: string, hexColor2: string) {
	// tslint:disable-next-line:one-variable-per-declaration
	let p1, p2, p3;

	const rgb1 = hex2Rgb(hexColor1);
	const rgb2 = hex2Rgb(hexColor2);

	p1 = (rgb1.r / 255) * 100;
	p2 = (rgb1.g / 255) * 100;
	p3 = (rgb1.b / 255) * 100;

	const perc1 = Math.round((p1 + p2 + p3) / 3);

	p1 = (rgb2.r / 255) * 100;
	p2 = (rgb2.g / 255) * 100;
	p3 = (rgb2.b / 255) * 100;

	const perc2 = Math.round((p1 + p2 + p3) / 3);

	return Math.abs(perc1 - perc2);
}

// Convert RGB to Hex
// function rgbToHex (rgb: {r: number, g: number, b: number}): string {
// 	// tslint:disable-next-line:no-bitwise
// 	return '#' + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
// }

//  Converts an RGB color value to HSL.
// function rgbToHsl (hexColor: string): {h: number, s: number, l: number} {
// 	const rgb = hex2Rgb(hexColor);
// 	const r = rgb.r;
// 	const g = rgb.g;
// 	const b = rgb.b;

//  const max = Math.max(r, g, b), min = Math.min(r, g, b);
//  let h, s, l = (max + min) / 2;

//  if (max === min) {
// 	 h = s = 0; // achromatic
//   } else {
// 	 const d = max - min;
// 	 s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

// 	 switch (max) {
// 		case r: h = (g - b) / d + (g < b ? 6 : 0); break;
// 		case g: h = (b - r) / d + 2; break;
// 		case b: h = (r - g) / d + 4; break;
// 	 }

// 	 h /= 6;
//   }

// 	return {h, s, l};
// }

// Converts an HSL color value to RGB.
// function hslToRgb (hsl: {h: number, s: number, l: number}): {r: number, g: number, b: number} {
// 	const h = hsl.h;
// 	const s = hsl.s;
// 	const l = hsl.l;

// 	let r, g, b;

//  if (s === 0) {
// 	 r = g = b = l; // achromatic
//   } else {
// 	 const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
// 	 const p = 2 * l - q;

// 	 r = hue2rgb(p, q, h + 1 / 3);
// 	 g = hue2rgb(p, q, h);
// 	 b = hue2rgb(p, q, h - 1 / 3);
//   }

// 	return {r: r * 255, g: g * 255, b: b * 255 };
// }

// // HSL to RGB helper
// function hue2rgb (p: number, q: number, t: number) {
// 	if (t < 0) { t += 1; }
// 	if (t > 1) { t -= 1; }
// 	if (t < 1 / 6) { return p + (q - p) * 6 * t; }
// 	if (t < 1 / 2) { return q; }
// 	if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
// 	return p;
// }

// function simpleBrandifier (hexColor1: string, hexColor2: string, backgroundColor: string) {

// }
