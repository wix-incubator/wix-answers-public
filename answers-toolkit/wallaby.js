const shared = require('./config/wallaby');

// module.exports = function (wallaby) {
//   return shared(wallaby);
// };

module.exports = function (wallaby) {
	const sharedConfig = shared(wallaby);
	sharedConfig.tests.push('sandbox/**/*.test.ts');
	sharedConfig.files.push('sandbox/**/*.tsx');
	return sharedConfig;
};
