import axios from "config/axios";
import { Publisher } from "shared/types";

const ENDPOINT = "/publishers";

export const listPublishers = () => axios.get<Publisher[]>(ENDPOINT);

export const getPublisher = (id: number) =>
	axios.get<Publisher>(`${ENDPOINT}/${id}`);

export const createPublisher = (publish: Publisher) =>
	axios.post<Publisher>(`${ENDPOINT}`, { publish });

export const updatePublisher = (publish: Publisher) =>
	axios.put<Publisher>(`${ENDPOINT}/${publish.id}`, { publish });
