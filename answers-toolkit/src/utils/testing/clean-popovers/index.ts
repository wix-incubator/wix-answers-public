export const cleanPopovers = () => {
	const ps = Array.from(document.querySelectorAll('.Popover'));
	ps.forEach((e) => e.remove());
};
