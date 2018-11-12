import * as React from 'react';
import { PhoneNumberView, CallData } from './phone-number-view';
import { Column } from '../../common/story-utils';
import { PhoneLine, PhoneLineBuilder } from '../../common';

export class StoryOfPhoneNumberView extends React.Component<any, any> {
	dummyLines: PhoneLine[] = [
		new PhoneLineBuilder().withName('JD').withId('1').build(),
		new PhoneLineBuilder().withId('2').withName('SC').build()
	];

	dummyLine: PhoneLine[] = [
		new PhoneLineBuilder().withName('JD').withId('1').build()
	];

	doCall (callData: CallData) {
		const { phoneNumber, lineId } = callData;
		alert(
			`Making a call to: ${phoneNumber.countryCode} ${phoneNumber.number} using the line: ${lineId}`
		);
	}

	render () {
		const phoneNumber = {
			countryCode: '972',
			number: '123123123'
		};

		const handleCallClick = (n: CallData) => this.doCall(n);

		const t = () => 'Bob';

		return (
			<span className='row'>
				<Column title='Regular'>
					<PhoneNumberView
						lines={this.dummyLine}
						phoneNumber={phoneNumber}
						onCall={handleCallClick}
						t={t}
					/>
				</Column>
				<Column title='Regular No lines Passed'>
					<PhoneNumberView
						lines={[]}
						phoneNumber={phoneNumber}
						onCall={handleCallClick}
						t={t}
					/>
				</Column>
				<Column title='Regular Multiple Lines'>
					<PhoneNumberView
						lines={this.dummyLines}
						phoneNumber={phoneNumber}
						onCall={handleCallClick}
						t={t}
					/>
				</Column>
				<Column title='Disabled (no onCall passed)'>
					<PhoneNumberView lines={[]} phoneNumber={phoneNumber} t={t} />
				</Column>
			</span>
		);
	}
}
