import * as React from 'react';
import { MediumTitle } from '../../typography/titles/titles';
import { namespacedClassnames } from '../../common/namespace-classes';
import { HeightAnimation } from '../../animations/height/height';
import { SmallToggleArrowIcon } from '../../icons/icons-components/small-toggle-arrow';
import { RenderHtml } from '../../common/render-html.comp';

export type CollapsibleProps = {
	isOpen: boolean;
	onToggle: (isOpen: boolean) => void;
	title: string | JSX.Element;
	children?: any;
};

export const Collapsible = (props: CollapsibleProps) => {
	const classNames = namespacedClassnames('collapsible', {open: props.isOpen});
	const toggleCollapsible = () => props.onToggle(!props.isOpen);

	const titleBody = typeof props.title === 'string' ? <RenderHtml html={props.title}/> : props.title;

	return (
		<div className={classNames}>
			<div className='title-wrapper' onClick={toggleCollapsible}>
				<SmallToggleArrowIcon/>
				<MediumTitle className='title'>{titleBody}</MediumTitle>
			</div>
			<div className='content-wrapper'>
				<HeightAnimation show={props.isOpen}>
					<div className='content'>
						{props.children}
					</div>
				</HeightAnimation>
			</div>
		</div>
	);
};
