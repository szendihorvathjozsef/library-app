import React from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { createSelector } from "@reduxjs/toolkit";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { Book } from "shared/types";
import BackArrow from "components/BackArrow";
import { fetchBook } from "shared/slices/bookSlice";
import { modifyBook, uploadCoverImage } from "shared/network/book-api";
import { RootState } from "config/root-reducer";
import BookForm from "./components/BookForm";
import { BACKEND_URL } from "config/constants";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";

interface RouteParam {
	id: string;
}

interface ModifyBookProps extends RouteComponentProps<RouteParam> {}

const selector = createSelector(
	(state: RootState) => state.book,
	({ book, status }) => ({
		book,
		status,
	}),
);

const ModifyBook = ({ match }: ModifyBookProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { id } = match?.params ?? {};
	const { book, status } = useSelector(selector);
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		if (id) {
			dispatch(fetchBook(parseInt(id, 10)));
		}
	}, [id, dispatch]);

	async function onSubmit(data: Book) {
		setLoading(true);

		let authors = book.authors;

		if (
			data.authors &&
			!isEmpty(data.authors) &&
			!isEqual(data.authors, authors)
		) {
			// @ts-ignore
			authors = authors?.concat(data.authors.map(aId => ({ id: aId })));
		}

		const values: Book = {
			...data,
			id: book.id,
			language: data.language ?? book.language,
			authors: authors,
			publishDate: data.publishDate
				? new Date(data.publishDate).toISOString()
				: null,
			publisher:
				data.publisherId !== book.publisherId
					? { id: data.publisherId }
					: book.publisher,
			category:
				data.categoryId !== book.categoryId
					? { id: data.categoryId }
					: book.category,
			image: null,
		};

		try {
			await modifyBook(values);

			// @ts-ignore
			if (data.image?.length > 0) {
				const formData = new FormData();
				// @ts-ignore
				formData.append("file", data.image[0], data.image[0].name);
				formData.append("bookName", data.title);
				await uploadCoverImage(formData);
			}

			enqueueSnackbar(
				t("notification.update.success", { subject: t("book.subject") }),
				{ variant: "success" },
			);
		} catch (e) {
			enqueueSnackbar(
				t("notification.update.success", { subject: t("book.subject") }),
				{ variant: "error" },
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Box display="flex" justifyContent="center">
			<Paper style={{ padding: 16, width: 400 }}>
				<BackArrow>{t("book.update")}</BackArrow>
				<img
					src={`${BACKEND_URL}/books/image/${book.imageName}`}
					alt="Book cover"
				/>
				<BookForm
					isLoading={status === "pending" || status === "idle" || loading}
					onSubmit={onSubmit}
					defaultValues={book}
				/>
			</Paper>
		</Box>
	);
};

export default ModifyBook;
