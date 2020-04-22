import { Author, SliceStates } from "shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "config/store";
import { listAuthors, getAuthor } from "shared/network/author-api";

interface AuthorState {
	authors: Author[];
	author: Author;
	status: SliceStates;
	error: string | null;
}

const initialState: AuthorState = {
	authors: [],
	author: {} as Author,
	status: "idle",
	error: null
};

function loadingStart(state: AuthorState) {
	state.status = "pending";
}

function loadingFailure(state: AuthorState, action: PayloadAction<string>) {
	state.status = "failure";
	state.error = action.payload;
}

const author = createSlice({
	name: "author",
	initialState,
	reducers: {
		getAuthorsStart: loadingStart,
		getAuthorStart: loadingStart,
		getAuthorsSuccess(state, { payload }: PayloadAction<Author[]>) {
			state.authors = payload;
			state.status = "success";
			state.error = null;
		},
		getAuthorSuccess(state, { payload }: PayloadAction<Author>) {
			state.author = payload;
			state.status = "success";
			state.error = null;
		},
		getAuthorsFailure: loadingFailure,
		getAuthorFailure: loadingFailure
	}
});

export default author.reducer;

export const {
	getAuthorStart,
	getAuthorsStart,
	getAuthorSuccess,
	getAuthorsSuccess,
	getAuthorFailure,
	getAuthorsFailure
} = author.actions;

export const fetchAuthors = (): AppThunk => async dispatch => {
	try {
		dispatch(getAuthorsStart());
		const { data } = await listAuthors();
		dispatch(getAuthorsSuccess(data));
	} catch (err) {
		dispatch(getAuthorsFailure(err.toString()));
	}
};

export const fetchAuthor = (id: number): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch(getAuthorStart());
		const { data } = await getAuthor(id);
		dispatch(getAuthorSuccess(data));
	} catch (err) {
		dispatch(getAuthorFailure(err.toString()));
	}
};
