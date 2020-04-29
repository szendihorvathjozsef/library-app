import React from "react";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import BookForm from "./components/BookForm";
import { Book, SliceStates } from "shared/types";
import { useTranslation } from "react-i18next";
import { createBook, uploadCoverImage } from "shared/network/book-api";
import { useSnackbar } from "notistack";
import BackArrow from "components/BackArrow";

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
				publisher: { id: values.publisherId },
				// @ts-ignore
				authors: values.authors?.map(id => ({ id })),
				image: null,
			});
			enqueueSnackbar(
				t("notification.create.success", { subject: t("book.subject") }),
				{ variant: "success" },
			);

			// @ts-ignore
			if (values.image?.length > 0) {
				const formData = new FormData();
				// @ts-ignore
				formData.append("file", values.image[0], values.image[0].name);
				formData.append("bookName", values.title);
				await uploadCoverImage(formData);
			}

			setStatus("success");
		} catch (e) {
			enqueueSnackbar(
				t("notification.create.failure", { subject: t("book.subject") }),
				{ variant: "error" },
			);
			setStatus("failure");
		}
	}

	return (
		<Box display="flex" justifyContent="center">
			<Paper style={{ padding: 16, width: 400 }}>
				<BackArrow>{t("book.create")}</BackArrow>
				<BookForm onSubmit={onSubmit} isLoading={status === "pending"} />
			</Paper>
		</Box>
	);
};

export default CreateBook;
