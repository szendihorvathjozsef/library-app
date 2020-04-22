import axios from "config/axios";
import { Author } from "shared/types";

const ENDPOINT = "/authors";

export const listAuthors = () => axios.get<Author[]>(ENDPOINT);

export const getAuthor = (id: number) => axios.get<Author>(`${ENDPOINT}/${id}`);

export const modifyAuthor = (author: Author) =>
	axios.put<Author>(`${ENDPOINT}/${author.id}`, author);

export const createAuthor = (author: Author) =>
	axios.post<Author>(`${ENDPOINT}`, author);
