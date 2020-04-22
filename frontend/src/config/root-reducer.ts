import { combineReducers } from "@reduxjs/toolkit";

import book from "shared/slices/bookSlice";
import author from "shared/slices/authorSlice";
import publisher from "shared/slices/publisherSlice";
import category from "shared/slices/categorySlice";

const rootReducer = combineReducers({
	book,
	author,
	category,
	publisher
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
