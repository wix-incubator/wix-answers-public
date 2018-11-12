export const xlargeGroup = `
<svg xmlns="http://www.w3.org/2000/svg" width="21" height="19">
<g fill="#B6C1CD" fill-rule="evenodd">
  <circle cx="17" cy="15" r="4"/>
  <circle cx="4" cy="15" r="4"/>
  <circle cx="11" cy="4" r="4"/>
</g>
</svg>
`;

export const largeGroup = `
<svg xmlns="http://www.w3.org/2000/svg" width="19" height="17">
<g fill="#B6C1CD" fill-rule="evenodd">
  <ellipse cx="15.381" cy="13.421" rx="3.619" ry="3.579"/>
  <ellipse cx="3.619" cy="13.421" rx="3.619" ry="3.579"/>
  <ellipse cx="9.952" cy="3.579" rx="3.619" ry="3.579"/>
</g>
</svg>
`;

export const normalGroup = `
<svg xmlns="http://www.w3.org/2000/svg" width="13" height="12">
<g fill="#B6C1CD" fill-rule="evenodd">
  <circle cx="10.5" cy="9.5" r="2.5"/>
  <circle cx="2.5" cy="9.5" r="2.5"/>
  <circle cx="6.5" cy="2.5" r="2.5"/>
</g>
</svg>
`;

export const smallXsmallGroup = `
<svg xmlns="http://www.w3.org/2000/svg" width="10" height="9">
<g fill="#B6C1CD" fill-rule="evenodd">
  <circle cx="8" cy="7" r="2"/>
  <circle cx="2" cy="7" r="2"/>
  <circle cx="5" cy="2" r="2"/>
</g>
</svg>
`;

export const GroupIconMap: {[key: string]: string} = {
	xsmall: smallXsmallGroup,
	small: smallXsmallGroup,
	normal: normalGroup,
	large: largeGroup,
	xlarge: xlargeGroup
};
