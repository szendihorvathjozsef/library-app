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
import { Author } from "shared/types";
import Table from "components/Table";
import { Link } from "components/Router";
import { RouteComponentProps } from "react-router-dom";
import { fetchAuthors } from "shared/slices/authorSlice";

interface ListAuthorProps extends RouteComponentProps {}

const selector = createSelector(
	(state: RootState) => state.author,
	({ status, authors }) => ({
		status,
		authors,
	}),
);

const ListAuthor = ({ history }: ListAuthorProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { status, authors } = useSelector(selector);

	const columns = React.useMemo<Column<Author>[]>(
		() => [
			{
				Header: () => t("author.properties.lastName"),
				accessor: "lastName",
			},
			{
				Header: () => t("author.properties.firstName"),
				accessor: "firstName",
			},
		],
		[t],
	);

	React.useEffect(() => {
		dispatch(fetchAuthors());
	}, [dispatch]);

	return (
		<>
			<Typography variant="h3" color="initial">
				{t("common.authors")}
			</Typography>
			<Button variant="text" color="primary" component={Link} to="/authors/add">
				{t("author.create")}
			</Button>
			<Box display="flex" justifyContent="center">
				<Table
					isLoading={status === "pending" || status === "idle"}
					title={t("common.authors")}
					data={authors}
					columns={columns}
					actions={[
						{
							icon: () => <EditIcon />,
							tooltip: t("button.modify"),
							onClick: (event, rowData) =>
								history.push(`/authors/${rowData.id}/modify`),
						},
					]}
				/>
			</Box>
		</>
	);
};

export default ListAuthor;
