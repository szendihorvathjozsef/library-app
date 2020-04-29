import React from "react";
import { Column } from "react-table";
import { useTranslation } from "react-i18next";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import { RootState } from "config/root-reducer";
import { Category } from "shared/types";
import Table from "components/Table";
import { Link } from "components/Router";
import { RouteComponentProps } from "react-router-dom";
import { fetchCategories } from "shared/slices/categorySlice";

interface ListCategoryProps extends RouteComponentProps {}

const selector = createSelector(
	(state: RootState) => state.category,
	({ status, categories }) => ({
		status,
		categories,
	}),
);

const ListCategory = ({ history }: ListCategoryProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { status, categories } = useSelector(selector);

	const columns = React.useMemo<Column<Category>[]>(
		() => [
			{
				Header: () => t("category.properties.name"),
				accessor: "name",
			},
		],
		[t],
	);

	React.useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<>
			<Typography variant="h3" color="initial">
				{t("common.categories")}
			</Typography>
			<Button
				variant="text"
				color="primary"
				component={Link}
				to="/categories/create"
			>
				{t("category.create")}
			</Button>
			<Box display="flex" justifyContent="center">
				<Table
					isLoading={status === "pending" || status === "idle"}
					title={t("common.categories")}
					data={categories}
					columns={columns}
					actions={[
						{
							icon: () => <EditIcon />,
							tooltip: t("button.modify"),
							onClick: (event, rowData) =>
								history.push(`/categories/${rowData.id}/update`),
						},
					]}
				/>
			</Box>
		</>
	);
};

export default ListCategory;
