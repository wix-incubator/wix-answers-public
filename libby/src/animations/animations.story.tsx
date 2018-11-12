import * as React from 'react';
import { StoryOfOpacity } from './opacity/opacity.story';
import { StoryOfHeight } from './height/height.story';
import { StoryOfSlide } from './slide/slide.story';
import { SlideContainerStory } from './slide-container/slide-container.story';

export const StoryOfAnimations = () => {
	return (
		<div className='story-container'>

		<div className='animation-example'>
				<SlideContainerStory/>
			</div>
			<div className='animation-example'>
				<StoryOfOpacity />
			</div>
			<div className='animation-example'>
				<StoryOfHeight />
			</div>
			<div className='animation-example'>
				<StoryOfSlide />
			</div>

		</div>
	);
};
