import React from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { createSelector } from "@reduxjs/toolkit";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { Category } from "shared/types";
import BackArrow from "components/BackArrow";
import { RootState } from "config/root-reducer";
import { updateCategory } from "shared/network/category-api";
import CategoryForm from "./components/CategoryForm";
import { fetchCategory } from "shared/slices/categorySlice";

interface RouteParam {
	id: string;
}

interface UpdateCategoryProps extends RouteComponentProps<RouteParam> {}

const selector = createSelector(
	(state: RootState) => state.category,
	({ category, status }) => ({
		category,
		status,
	}),
);

const UpdateCategory = ({ match }: UpdateCategoryProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { id } = match?.params ?? {};
	const { category, status } = useSelector(selector);
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		if (id) {
			dispatch(fetchCategory(parseInt(id, 10)));
		}
	}, [id, dispatch]);

	async function onSubmit(data: Category) {
		setLoading(true);
		try {
			await updateCategory({ ...category, ...data });
			enqueueSnackbar(
				t("notification.update.success", { subject: t("category.subject") }),
				{ variant: "success" },
			);
		} catch (e) {
			enqueueSnackbar(
				t("notification.update.success", { subject: t("category.subject") }),
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
				<CategoryForm
					isLoading={status === "pending" || status === "idle" || loading}
					onSubmit={onSubmit}
					defaultValues={category}
				/>
			</Paper>
		</Box>
	);
};

export default UpdateCategory;
