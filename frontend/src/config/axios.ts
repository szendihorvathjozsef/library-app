import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BACKEND_URL } from "./constants";

const TIMEOUT = 30 * 1000;

const instance = axios.create({
	baseURL: BACKEND_URL,
	timeout: TIMEOUT,
});

async function onRequestSuccess(config: AxiosRequestConfig) {
	return config;
}

function onResponseSuccess(response: AxiosResponse) {
	return response;
}

function onResponseError(error: any) {
	return Promise.reject(error.response);
}

instance.interceptors.request.use(onRequestSuccess);
instance.interceptors.response.use(onResponseSuccess, onResponseError);

export default instance;