import * as React from 'react';
import { devTranslations, TranslateFn, AnsViewComp } from 'answers-app-core';
import { Text } from 'answers-ui-libby';

export const {{lowerCamelCase}}Key = '{{lispCaseName}}';

export type {{camelCaseName}}Props = {
	// in
	value: string;

	// out
	onChange: (value: string) => void;
};

const translationPrefix = `{{translationNs}}.${{{lowerCamelCase}}Key}`;

devTranslations({
	"{{translationNs}}.{{lispCaseName}}.title": "This is {{camelCaseName}}!"
});

export type {{camelCaseName}}State = {};

export class {{camelCaseName}} extends AnsViewComp<{{camelCaseName}}Props, {{camelCaseName}}State> {

	state: {{camelCaseName}}State = {};

	tp: TranslateFn = (key, params) => {
		return this.props.t(`${translationPrefix}.${key}`, params);
	}

	render () {
		const {props, state, tp} = this;

		return (
			<div className={{{lowerCamelCase}}Key}>
				<pre><code>{JSON.stringify(props)}</code></pre>
				<pre><code>{JSON.stringify(state)}</code></pre>
				<Text type='t1a'>{tp('title')}</Text>
			</div>
		);
	}
}
