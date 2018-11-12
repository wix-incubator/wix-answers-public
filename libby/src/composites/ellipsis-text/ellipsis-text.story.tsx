import * as React from 'react';
import { Text } from '../../typography';
import { EllipsisText } from './ellipsis-text';

export class EllipsisTextStory extends React.Component<any, any> {
	state = {
		isOpen: false,
	};

	openModal = () => {
		this.setState({ isOpen: true });
	}

	closeModal = () => {
		this.setState({ isOpen: false });
	}

	render () {
		const longTextWords = <Text>Supercali fragilistice xpiali docious</Text>;
		// const longTextOneWord = <Text>Supercalifragilisticexpialidocious</Text>;
		// const shortText = <Text>Super</Text>;

		return (
			<div style={{width: 140}}>
				<EllipsisText>{longTextWords}</EllipsisText>
				<EllipsisText tooltipRelativeToBody={true}>{longTextWords}</EllipsisText>
				{/* <EllipsisText>{longTextOneWord}</EllipsisText> */}
				{/* <EllipsisText>{shortText}</EllipsisText> */}
			</div>
		);
	}
}
