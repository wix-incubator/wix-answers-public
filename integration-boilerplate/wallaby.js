module.exports = function (wallaby) {
	return {
		files: [
			'src/**/*.ts',
			{ pattern: 'src/**/*spec.ts', ignore: true },
			{ pattern: 'node_modules/**/*', ignore: true },
		],

		tests: [
			'src/**/*spec.ts'
		],
		compilers: {
			'src/**/*.ts?': wallaby.compilers.typeScript({
				module: 'commonjs'
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