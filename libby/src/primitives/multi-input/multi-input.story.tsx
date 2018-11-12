import * as React from 'react';
import { MultiInput } from './multi-input';
import { noop } from '../../common';
import { KeyCode } from '../../common/key-codes.enum';

// tslint:disable-next-line:max-line-length
const EMAIL_VALIDATION_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const NONE_REGEX = /noneregexbob/g;

const columnWidth = {width: '200px'};

export class StoryOfMultiInput extends React.PureComponent<any, any> {
	state = {
		values1: [] as string[],
		values2: [] as string[],
		values3: [] as string[]
	};

	render () {
		const changeValue1 = (values: string[]) => this.setState({values1: values});
		const changeValue2 = (values: string[]) => this.setState({values2: values});
		const changeValue3 = (values: string[]) => this.setState({values3: values});

		return (
			<span className='row'>
				<div className='column' style={columnWidth}>
					<h5 className='h5-title'>Regular</h5>
					<MultiInput
						values={this.state.values1}
						onChange={changeValue1}
						errorMessage=''
						placeholder='This is test multi input'
					/>
				</div>

				<div className='column' style={columnWidth}>
					<h5 className='h5-title'>With add on space (Email only)</h5>
					<MultiInput
						values={this.state.values2}
						onChange={changeValue2}
						errorMessage=''
						validationRegex={EMAIL_VALIDATION_REGEX}
						additionalAddKeys={[KeyCode.SPACE]}
						placeholder='This is Email multi input'
					/>
				</div>

				<div className='column' style={columnWidth}>
					<h5 className='h5-title'>With error message</h5>
					<MultiInput
						values={this.state.values3}
						onChange={changeValue3}
						errorMessage='Hi, this is error'
						validationRegex={NONE_REGEX}
						additionalAddKeys={[KeyCode.SPACE]}
						placeholder='This is Email multi input'
					/>
				</div>

				<div className='column' style={columnWidth}>
					<h5 className='h5-title'>Disabled</h5>
					<MultiInput
						values={['disabled']}
						onChange={noop}
						errorMessage=''
						placeholder='This is Email multi input'
						disabled={true}
					/>
				</div>
			</span>
		);
	}
}
