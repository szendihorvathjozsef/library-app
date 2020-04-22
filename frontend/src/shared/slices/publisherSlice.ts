import { Publisher, SliceStates } from "shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "config/store";
import { listPublishers, getPublisher } from "shared/network/publisher-api";

interface PublisherState {
	publishers: Publisher[];
	publisher: Publisher;
	status: SliceStates;
	error: string | null;
}

const initialState: PublisherState = {
	publishers: [],
	publisher: {} as Publisher,
	status: "idle",
	error: null
};

function loadingStart(state: PublisherState) {
	state.status = "pending";
}

function loadingFailure(state: PublisherState, action: PayloadAction<string>) {
	state.status = "failure";
	state.error = action.payload;
}

const publisher = createSlice({
	name: "publisher",
	initialState,
	reducers: {
		getPublishersStart: loadingStart,
		getPublisherStart: loadingStart,
		getPublishersSuccess(state, { payload }: PayloadAction<Publisher[]>) {
			state.publishers = payload;
			state.status = "success";
			state.error = null;
		},
		getPublisherSuccess(state, { payload }: PayloadAction<Publisher>) {
			state.publisher = payload;
			state.status = "success";
			state.error = null;
		},
		getPublishersFailure: loadingFailure,
		getPublisherFailure: loadingFailure
	}
});

export default publisher.reducer;

export const {
	getPublisherStart,
	getPublishersStart,
	getPublisherSuccess,
	getPublishersSuccess,
	getPublisherFailure,
	getPublishersFailure
} = publisher.actions;

export const fetchPublishers = (): AppThunk => async dispatch => {
	try {
		dispatch(getPublishersStart());
		const { data } = await listPublishers();
		dispatch(getPublishersSuccess(data));
	} catch (err) {
		dispatch(getPublishersFailure(err.toString()));
	}
};

export const fetchPublisher = (id: number): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch(getPublisherStart());
		const { data } = await getPublisher(id);
		dispatch(getPublisherSuccess(data));
	} catch (err) {
		dispatch(getPublisherFailure(err.toString()));
	}
};
