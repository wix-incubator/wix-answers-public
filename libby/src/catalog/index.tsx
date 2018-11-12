import { iconsCat } from './icons';
import { primitivesCat } from './primitives';
import { compositesCat } from './composites';

export type CatalogGroup<P> = {
	title: string;
	render: (p: P) => JSX.Element;
	items: Array<CatalogItem<P>>;
};

export type CatalogItem<P> = {
	label?: string;
	props: Partial<P>;
	render?: (p: P) => JSX.Element;
};

export type Catalog = {
	primitives: Array<CatalogGroup<any>>,
	composites: Array<CatalogGroup<any>>,
	icons: Array<CatalogGroup<any>>
};

export const catalog: Catalog = {
	primitives: primitivesCat,
	composites: compositesCat,
	icons: iconsCat
};
