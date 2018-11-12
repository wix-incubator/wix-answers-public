export const xlargeQueue = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="17">
<g fill="#B6C1CD" fill-rule="evenodd">
  <rect width="17" height="5" x="8" y="12" rx="2.5"/>
  <rect width="17" height="5" x="8" rx="2.5"/>
  <circle cx="2.5" cy="14.5" r="2.5"/>
  <circle cx="2.5" cy="2.5" r="2.5"/>
</g>
</svg>
`;

export const largeQueue = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="13">
<g fill="#B6C1CD" fill-rule="evenodd">
  <rect width="14" height="4" x="6" y="9" rx="2"/>
  <rect width="14" height="4" x="6" rx="2"/>
  <circle cx="2" cy="11" r="2"/>
  <circle cx="2" cy="2" r="2"/>
</g>
</svg>
`;

export const normalQueue = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="9">
<g fill="none" fill-rule="evenodd">
  <rect width="9" height="3" x="5" y="6" fill="#B6C1CD" rx="1.5"/>
  <rect width="9" height="3" x="5" fill="#B6C1CD" rx="1.5"/>
  <path fill="#BEC8D3" d="M0 0h3v3H0zm0 6h3v3H0z"/>
</g>
</svg>
`;

export const smallXsmallQueue = `
<svg xmlns="http://www.w3.org/2000/svg" width="11" height="7">
<g fill="#B6C1CD" fill-rule="evenodd">
  <rect width="7" height="2" x="4" y="5" rx="1"/>
  <rect width="7" height="2" x="4" rx="1"/>
  <path d="M0 0h2v2H0zm0 5h2v2H0z"/>
</g>
</svg>
`;

export const QueueIconMap: {[key: string]: string} = {
	xsmall: smallXsmallQueue,
	small: smallXsmallQueue,
	normal: normalQueue,
	large: largeQueue,
	xlarge: xlargeQueue
};
