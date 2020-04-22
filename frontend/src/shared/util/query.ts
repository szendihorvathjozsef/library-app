export function transformQueryParam(query: string): string {
	return query.split(" ").join("+");
}
