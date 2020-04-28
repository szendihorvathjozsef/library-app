import axios from "config/axios";
import { CancelToken } from "axios";

const ENDPOINT = "/dashboard";

export const getStatistics = (cancelToken?: CancelToken) =>
	axios.get(`${ENDPOINT}/statistics`, { cancelToken });
