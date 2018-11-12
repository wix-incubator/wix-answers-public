import { Category } from '../';

const rootCategoryId = '00000000-0000-0000-0000-000000000000';

const slugify = (text: string) => {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
};

export class CategoryBuilder {
	category: Category;

	constructor () {
		const defaultCategory: Category = {
			id: '01d1d0e8-5245-49d4-8f1b-92bf07e05f86',
			locale: 'en',
			name: 'Category Title',
			parentId: rootCategoryId,
			url: 'http://fullurl.com',
			uri: '/cat-uri',
		};
		this.category = defaultCategory;
	}

	withName (name: string) {
		this.category.name = name;
		this.category.uri = '/' + slugify(name) + (Math.random() * 999).toFixed(0);
		return this;
	}

	withChildren (children: Category[]) {
		children.forEach((cat) => {
				cat.parentId = this.category.id;
		});
		this.category.children = children;
		return this;
	}

	withId (id: string) {
		this.category.id = id;
		return this;
	}

	withLang (locale: string) {
		this.category.locale = locale;
		return this;
	}

	build () {
		return this.category;
	}
}
