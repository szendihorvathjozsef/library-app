import { Category, SliceStates } from "shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "config/store";
import { listCategories, getCategory } from "shared/network/category-api";

interface CategoryState {
	categories: Category[];
	category: Category;
	status: SliceStates;
	error: string | null;
}

const initialState: CategoryState = {
	categories: [],
	category: {} as Category,
	status: "idle",
	error: null
};

function loadingStart(state: CategoryState) {
	state.status = "pending";
}

function loadingFailure(state: CategoryState, action: PayloadAction<string>) {
	state.status = "failure";
	state.error = action.payload;
}

const category = createSlice({
	name: "category",
	initialState,
	reducers: {
		getCategorysStart: loadingStart,
		getCategoryStart: loadingStart,
		getCategorysSuccess(state, action: PayloadAction<Category[]>) {
			state.categories = action.payload;
			state.status = "success";
			state.error = null;
		},
		getCategorySuccess(state, action: PayloadAction<Category>) {
			state.category = action.payload;
			state.status = "success";
			state.error = null;
		},
		getCategorysFailure: loadingFailure,
		getCategoryFailure: loadingFailure
	}
});

export default category.reducer;

export const {
	getCategoryStart,
	getCategorysStart,
	getCategorySuccess,
	getCategorysSuccess,
	getCategoryFailure,
	getCategorysFailure
} = category.actions;

export const fetchCategories = (): AppThunk => async dispatch => {
	try {
		dispatch(getCategorysStart());
		const { data } = await listCategories();
		dispatch(getCategorysSuccess(data));
	} catch (err) {
		dispatch(getCategorysFailure(err.toString()));
	}
};

export const fetchCategory = (id: number): AppThunk => async dispatch => {
	try {
		dispatch(getCategoryStart());
		const { data } = await getCategory(id);
		dispatch(getCategorySuccess(data));
	} catch (err) {
		dispatch(getCategoryFailure(err.toString()));
	}
};
