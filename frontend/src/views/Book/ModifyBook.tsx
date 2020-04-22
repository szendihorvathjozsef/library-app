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
import { modifyBook } from "shared/network/book-api";
import { RootState } from "config/root-reducer";
import BookForm from "./components/BookForm";

interface RouteParam {
	id: string;
}

interface ModifyBookProps extends RouteComponentProps<RouteParam> {}

const selector = createSelector(
	(state: RootState) => state.book,
	({ book, status }) => ({
		book,
		status
	})
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
		try {
			const values: Book = {
				...book,
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
						: book.category
			};

			await modifyBook(values);

			enqueueSnackbar(
				t("notification.update.success", { subject: t("book.subject") }),
				{ variant: "success" }
			);
		} catch (e) {
			enqueueSnackbar(
				t("notification.update.success", { subject: t("book.subject") }),
				{ variant: "error" }
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Box display="flex" justifyContent="center">
			<Paper style={{ padding: 16, width: 400 }}>
				<BackArrow>{t("book.update")}</BackArrow>
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
