import axios from "config/axios";
import { Category } from "shared/types";

const ENDPOINT = "/categories";

export const listCategories = () => axios.get<Category[]>(ENDPOINT);

export const getCategory = (id: number) =>
	axios.get<Category>(`${ENDPOINT}/${id}`);

export const createCategory = (category: Category) =>
	axios.post<Category>(`${ENDPOINT}`, { category });

export const updateCategory = (category: Category) =>
	axios.put<Category>(`${ENDPOINT}/${category.id}`, { category });
