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
		setup: function () {

		},
		restart: true
	}
};
