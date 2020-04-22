import { useLocation } from "react-router-dom";

export default function useQuery(
	fn?: (param: string) => string
): URLSearchParams {
	const param = useLocation().search;

	if (fn) {
		return new URLSearchParams(fn(param));
	}

	return new URLSearchParams(param);
}
