import { Column } from '../../common/story-utils';
import * as React from 'react';
import { WarningMessageBox, AttentionMessageBox, InfoMessageBox, NeutralMessageBox } from './message-box';

export const StoryOfMessageBox = () => {
	return (
		<div>
			<h4 className='h4-title'>Default</h4>
			<span className='row' style={{flexWrap: 'nowrap'}}>
				<Column title='Warning'>
					<WarningMessageBox>
						<div><strong>Warning! </strong>You really should not do this.</div>
					</WarningMessageBox>
				</Column>
				<Column title='Attention'>
					<AttentionMessageBox>
						<strong>Hey!</strong>
						<div>This is some really important information. You don't wanna miss this</div>
						<div>It also looks great with multiple lines!</div>
					</AttentionMessageBox>
				</Column>
				<Column title='Info'>
					<InfoMessageBox>
						<div>This rule contains values that were deleted from the system</div>
					</InfoMessageBox>
				</Column>
				<Column title='Neutral'>
					<NeutralMessageBox>
						<div>Some general info</div>
					</NeutralMessageBox>
				</Column>
			</span>
			<h4 className='h4-title'>Embedded</h4>
			<span className='row' style={{flexWrap: 'nowrap'}}>
				<Column title='Warning'>
					<WarningMessageBox embedded={true}>
						<div><strong>Warning! </strong>You really should not do this.</div>
					</WarningMessageBox>
				</Column>
				<Column title='Attention'>
					<AttentionMessageBox embedded={true}>
						<strong>Hey!</strong>
						<div>It also looks great with multiple lines!</div>
					</AttentionMessageBox>
				</Column>
				<Column title='Info'>
					<InfoMessageBox embedded={true}>
						<div>This rule contains values that were deleted from the system</div>
					</InfoMessageBox>
				</Column>
				<Column title='Neutral'>
					<NeutralMessageBox embedded={true}>
						<div>Some general info</div>
					</NeutralMessageBox>
				</Column>
			</span>
		</div>
	);
};
