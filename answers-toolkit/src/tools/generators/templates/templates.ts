import {lispCase, lowerCamelCase} from '../utils';

export const style = (lisped: string) => `
.${lisped} {
	color: pink;
	&:after {
		content: 'Unstyled!';
		font-size: 50px;
	}
}
`;

export const driver = (compName: string) => `import { UniDriver } from 'unidriver';
import { ${lowerCamelCase(compName)}Key } from './';

export type ${compName}Driver = {
	text: () => Promise<string>,
	base: UniDriver
};

export const create${compName}Driver = (wrapper: UniDriver): ${compName}Driver => {
	const base = wrapper.$(\`.\$\{${lowerCamelCase(compName)}Key\}\`);
	return {
		text: () => base.$('.title').text(),
		base
	};
};
`;

export const component = (compName: string, translationNs: string) => {
const compKeyVarName = `${lowerCamelCase(compName)}Key`;

return `import * as React from 'react';
import { devTranslations, TranslateFn, AnsViewComp } from '@wix/answers-app-core';
import { Text } from '@wix/answers-ui-libby';

export const ${compKeyVarName} = '${lispCase(compName)}';

export type ${compName}Props = {
	// in
	value: string;

	// out
	onChange: (value: string) => void;
};

const translationPrefix = \`${translationNs}.\$\{${compKeyVarName}\}\`;

devTranslations({
	"${translationNs}.${lispCase(compName)}.title": "This is ${compName}!"
});

export type ${compName}State = {};

export class ${compName} extends AnsViewComp<${compName}Props, ${compName}State> {

	state: ${compName}State = {};

	tp: TranslateFn = (key, params) => {
		return this.props.t(\`\${translationPrefix}.\${key}\`, params);
	}

	render () {
		const {props, state, tp} = this;

		return (
			<div className={${compKeyVarName}}>
				<pre><code>{JSON.stringify(props)}</code></pre>
				<pre><code>{JSON.stringify(state)}</code></pre>
				<Text type='t1a'>{tp('title')}</Text>
			</div>
		);
	}
}
`;
};

export const test = (compName: string) => `import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from '@wix/answers-app-core';
import { reactUniDriver } from 'unidriver';

import { ${compName}, ${compName}Props } from './';
import { create${compName}Driver } from './driver';

const propsCreator = testViewCompPropsCreator<${compName}Props>(() => ({
	value: 'bob',
	onChange: () => null
}));

const setup = (partialProps: Partial<${compName}Props>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<${compName}Props>(${compName}, props);
	const baseDriver = reactUniDriver(elem);
	return create${compName}Driver(baseDriver);
};

describe('${compName}', () => {
	it('shows the title', async () => {
		const driver = setup({});
		assert.equal(await driver.text(), 'Dod shel gever');
	});
});
`;
