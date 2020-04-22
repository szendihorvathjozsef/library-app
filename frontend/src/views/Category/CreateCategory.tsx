import React from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { Category, SliceStates } from "shared/types";
import CategoryForm from "./components/CategoryForm";
import { createCategory } from "shared/network/category-api";

interface CreateCategoryProps {}

const CreateCategory = (props: CreateCategoryProps) => {
	const { t } = useTranslation();
	const { enqueueSnackbar } = useSnackbar();
	const [status, setStatus] = React.useState<SliceStates>("idle");

	async function onSubmit(values: Category) {
		setStatus("pending");
		try {
			await createCategory(values);
			enqueueSnackbar(
				t("notification.create.success", { subject: t("category.subject") }),
				{ variant: "success" }
			);
			setStatus("success");
		} catch (e) {
			enqueueSnackbar(
				t("notification.create.failure", { subject: t("category.subject") }),
				{ variant: "error" }
			);
			setStatus("failure");
		}
	}

	return (
		<Box display="flex" justifyContent="center">
			<Paper style={{ padding: 16, width: 400 }}>
				<Typography variant="h5" color="initial" gutterBottom>
					{t("category.create")}
				</Typography>
				<CategoryForm onSubmit={onSubmit} isLoading={status === "pending"} />
			</Paper>
		</Box>
	);
};

export default CreateCategory;
