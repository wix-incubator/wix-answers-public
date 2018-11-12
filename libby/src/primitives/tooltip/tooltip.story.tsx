import * as React from 'react';
import { Tooltip } from './tooltip';
import { Column } from '../../common/story-utils';
import { Button } from '../buttons/button/button';
import { noop } from '../../common';
import { LinkButton } from '../..';

export const StoryOfTooltip = () => {
	const promptAlert = () => window.alert('Interacted!');

	const tooltipBody = (
		<div>
			<div>This action is disabled for now. But who knows, maybe one day it will be enabled?</div>
			<LinkButton onClick={promptAlert}>Activate!</LinkButton>
		</div>
	);

	const style = {
		width: 300,
		height: 200,
		overflow: 'scroll',
		position: 'relative',
		border: '1px solid lightgrey',
		bordeRadius: '4px'
	} as any;

	const onClick = () => noop();

	return (
		<div>
			<Column title='Default Tooltip'>
				<Tooltip body={tooltipBody}>
					<Button onClick={onClick} disabled={true}>Hover Me</Button>
				</Tooltip>
			</Column>
			<Column title='Relative To Body'>
				<div style={style}>
					<div style={{width: '200%', height: '200%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<Tooltip body={tooltipBody} relativeToBody={true}>
							<Button onClick={onClick} disabled={true}>Hover Me</Button>
						</Tooltip>
					</div>
				</div>
			</Column>
			<Column title='Force Open'>
				<Tooltip body={'I am open'} forceVisible={true}>
					<Button onClick={onClick} disabled={true}>Wont render a tooltip</Button>
				</Tooltip>
			</Column>
		</div>
	);
};
