import * as React from 'react';

export const RenderHtml = (props: {html: string, className?: string}) => {
	const html = {__html: props.html};
	return <span dangerouslySetInnerHTML={html} className={props.className} />;
};
