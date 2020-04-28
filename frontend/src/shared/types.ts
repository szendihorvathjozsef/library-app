export type Author = {
	id: number;
	firstName?: string;
	lastName?: string;
	birthday?: Date | string | number | null;
	diedOn?: Date | string | number | null;
	nationality?: string;
};

export type Category = {
	id: number;
	name?: string;
};

export type Publisher = {
	id: number;
	name?: string;
};

export type Book = {
	id: number;
	authors?: Author[];
	title: string;
	tags?: string[];
	category: Category;
	categoryId: number;
	pageCount?: number;
	publishDate?: Date | string | number | null;
	excerpt?: string | null;
	description?: string;
	bookIdentifier?: string;
	bookoIdentifierType?: string;
	publisher: Publisher;
	publisherId: number;
	language?: string;
	translator?: string;
	imageName?: any | null;
	image?: Blob | null;
};

export type ResponseTypes = "OK" | "INVALID_INPUT" | "ERROR" | "NOT_FOUND";

export type SliceStates = "idle" | "pending" | "failure" | "success";

export type HttpResponse = {
	status: ResponseTypes | string;
};
