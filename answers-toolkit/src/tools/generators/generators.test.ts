import {expect} from 'chai';
import { generateComponentContent } from './generators';

describe('generators', () => {
	describe('should generate a stateless component', () => {

		it('should generate a style file', () => {
			const componentName = 'BobViewer';
			const generatedCode = generateComponentContent(componentName, 'app.some-comp');
			expect(generatedCode.style.content).to.eql(`
			.bob-viewer {
				color: pink;
				&:after {
					content: 'Unstyled!';
					font-size: 50px;
				}
			}
			`.replace(/\t\t\t/g, ''));

			expect(generatedCode.style.fileName).to.eql('_style.scss');
		});

		it('should generate a a component file', () => {
			const componentName = 'JojoHalastra';
			const generatedCode = generateComponentContent(componentName, 'app.some-comp');
			expect(generatedCode.component.fileName).to.eql('index.tsx');
			expect(generatedCode.component.content).to.eql(`import * as React from 'react';
			import { devTranslations, TranslateFn, AnsViewComp } from '@wix/answers-app-core';
			import { Text } from '@wix/answers-ui-libby';

			export const jojoHalastraKey = 'jojo-halastra';

			export type JojoHalastraProps = {
				// in
				value: string;

				// out
				onChange: (value: string) => void;
			};

			const translationPrefix = \`app.some-comp.\$\{jojoHalastraKey\}\`;

			devTranslations({
				"app.some-comp.jojo-halastra.title": "This is JojoHalastra!"
			});

			export type JojoHalastraState = {};

			export class JojoHalastra extends AnsViewComp<JojoHalastraProps, JojoHalastraState> {

				state: JojoHalastraState = {};

				tp: TranslateFn = (key, params) => {
					return this.props.t(\`\${translationPrefix}.\${key}\`, params);
				}

				render () {
					const {props, state, tp} = this;

					return (
						<div className={jojoHalastraKey}>
							<pre><code>{JSON.stringify(props)}</code></pre>
							<pre><code>{JSON.stringify(state)}</code></pre>
							<Text type='t1a'>{tp('title')}</Text>
						</div>
					);
				}
			}
			`.split('\n').map((row) => row.replace(/\t\t\t/, '')).join('\n'));
		});

		it('should generate a a driver file', () => {
			const componentName = 'BobViewer';
			const generatedCode = generateComponentContent(componentName, 'app.some-comp');
			expect(generatedCode.driver.fileName).to.eql('driver.tsx');
			expect(generatedCode.driver.content).to.eql(`import { UniDriver } from 'unidriver';
			import { bobViewerKey } from './';

			export type BobViewerDriver = {
				text: () => Promise<string>,
				base: UniDriver
			};

			export const createBobViewerDriver = (wrapper: UniDriver): BobViewerDriver => {
				const base = wrapper.$(\`.\$\{bobViewerKey\}\`);
				return {
					text: () => base.$('.title').text(),
					base
				};
			};
			`.replace(/\t\t\t/g, ''));
		});

		it('should generate a test file', () => {
			const componentName = 'ArticleFixatizator';
			const generatedCode = generateComponentContent(componentName, 'app.some-bob.gog');
			expect(generatedCode.test.fileName).to.eql('spec.tsx');
			expect(generatedCode.test.content).to.eql(`import { assert } from 'chai';
			import { testViewCompPropsCreator, renderAndMountComp } from '@wix/answers-app-core';
			import { reactUniDriver } from 'unidriver';

			import { ArticleFixatizator, ArticleFixatizatorProps } from './';
			import { createArticleFixatizatorDriver } from './driver';

			const propsCreator = testViewCompPropsCreator<ArticleFixatizatorProps>(() => ({
				value: 'bob',
				onChange: () => null
			}));

			const setup = (partialProps: Partial<ArticleFixatizatorProps>) => {
				const props = propsCreator(partialProps);
				const elem = renderAndMountComp<ArticleFixatizatorProps>(ArticleFixatizator, props);
				const baseDriver = reactUniDriver(elem);
				return createArticleFixatizatorDriver(baseDriver);
			};

			describe('ArticleFixatizator', () => {
				it('shows the title', async () => {
					const driver = setup({});
					assert.equal(await driver.text(), 'Dod shel gever');
				});
			});
			`.replace(/\t\t\t/g, ''));
		});
	});
});
