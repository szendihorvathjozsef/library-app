import { Book, SliceStates } from "shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "config/store";
import { listBooks, getBook } from "shared/network/book-api";

interface BookState {
	books: Book[];
	book: Book;
	status: SliceStates;
	error: string | null;
}

const initialState: BookState = {
	books: [],
	book: {} as Book,
	status: "idle",
	error: null
};

function loadingStart(state: BookState) {
	state.status = "pending";
}

function loadingFailure(state: BookState, action: PayloadAction<string>) {
	state.status = "failure";
	state.error = action.payload;
}

const book = createSlice({
	name: "book",
	initialState,
	reducers: {
		getBooksStart: loadingStart,
		getBookStart: loadingStart,
		getBooksSuccess(state, { payload }: PayloadAction<Book[]>) {
			state.books = payload;
			state.status = "success";
			state.error = null;
		},
		getBookSuccess(state, { payload }: PayloadAction<Book>) {
			state.book = payload;
			state.status = "success";
			state.error = null;
		},
		getBooksFailure: loadingFailure,
		getBookFailure: loadingFailure
	}
});

export default book.reducer;

export const {
	getBookStart,
	getBooksStart,
	getBookSuccess,
	getBooksSuccess,
	getBookFailure,
	getBooksFailure
} = book.actions;

export const fetchBooks = (): AppThunk => async dispatch => {
	try {
		dispatch(getBooksStart());
		const { data } = await listBooks();
		dispatch(getBooksSuccess(data));
	} catch (err) {
		dispatch(getBooksFailure(err.toString()));
	}
};

export const fetchBook = (id: number): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch(getBookStart());
		const { data } = await getBook(id);
		dispatch(getBookSuccess(data));
	} catch (err) {
		dispatch(getBookFailure(err.toString()));
	}
};
