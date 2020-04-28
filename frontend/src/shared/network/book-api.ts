import axios from "config/axios";
import { Book } from "shared/types";
import { BACKEND_URL } from "config/constants";

const ENDPOINT = "/books";

export const listBooks = () => axios.get<Book[]>(ENDPOINT);

export const getBook = (id: number) => axios.get<Book>(`${ENDPOINT}/${id}`);

export const modifyBook = (book: Book) =>
	axios.put<Book>(`${ENDPOINT}/${book.id}`, book);

export const createBook = (book: Book) => axios.post<Book>(`${ENDPOINT}`, book);

export const uploadCoverImage = (formData: FormData) =>
	axios.post(`${ENDPOINT}/image`, formData);

export const coverImage = (name: string) =>
	`${BACKEND_URL}${ENDPOINT}/image/${name}`;
