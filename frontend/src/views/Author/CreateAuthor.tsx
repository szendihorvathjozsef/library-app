import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import AuthorForm from "./components/AuthorForm";
import { Author, SliceStates } from "shared/types";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import BackArrow from "components/BackArrow";
import { createAuthor } from "shared/network/author-api";

const CreateAuthor = () => {
	const { t } = useTranslation();
	const { enqueueSnackbar } = useSnackbar();
	const [status, setStatus] = React.useState<SliceStates>("idle");

	async function onSubmit(values: Author) {
		setStatus("pending");
		try {
			await createAuthor(values);

			enqueueSnackbar(
				t("notification.create.success", { subject: t("author.subject") }),
				{ variant: "success" },
			);

			setStatus("success");
		} catch (e) {
			enqueueSnackbar(
				t("notification.create.failure", { subject: t("author.subject") }),
				{ variant: "error" },
			);
			setStatus("failure");
		}
	}

	return (
		<Box display="flex" justifyContent="center">
			<Paper style={{ padding: 16, width: 400 }}>
				<BackArrow>{t("author.create")}</BackArrow>
				<AuthorForm onSubmit={onSubmit} isLoading={status === "pending"} />
			</Paper>
		</Box>
	);
};

export default CreateAuthor;
