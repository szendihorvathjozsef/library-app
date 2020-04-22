import React from "react";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import BookForm from "./components/BookForm";
import { Book, SliceStates } from "shared/types";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { createBook } from "shared/network/book-api";
import { useSnackbar } from "notistack";

interface CreateBookProps {}

const CreateBook = (props: CreateBookProps) => {
	const { t } = useTranslation();
	const { enqueueSnackbar } = useSnackbar();
	const [status, setStatus] = React.useState<SliceStates>("idle");

	async function onSubmit(values: Book) {
		setStatus("pending");
		try {
			await createBook({
				...values,
				category: { id: values.categoryId },
				publisher: { id: values.publisherId }
			});
			enqueueSnackbar(
				t("notification.create.success", { subject: t("book.subject") }),
				{ variant: "success" }
			);
			setStatus("success");
		} catch (e) {
			enqueueSnackbar(
				t("notification.create.failure", { subject: t("book.subject") }),
				{ variant: "error" }
			);
			setStatus("failure");
		}
	}

	return (
		<Box display="flex" justifyContent="center">
			<Paper style={{ padding: 16, width: 400 }}>
				<Typography variant="h5" color="initial" gutterBottom>
					{t("book.create")}
				</Typography>
				<BookForm onSubmit={onSubmit} />
			</Paper>
		</Box>
	);
};

export default CreateBook;
