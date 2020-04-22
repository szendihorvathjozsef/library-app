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
import { Book } from "shared/types";
import Table from "components/Table";
import { Link } from "components/Router";
import { fetchBooks } from "shared/slices/bookSlice";
import { RouteComponentProps } from "react-router-dom";

interface ListBookProps extends RouteComponentProps {}

const selector = createSelector(
	(state: RootState) => state.book,
	({ status, books }) => ({
		status,
		books
	})
);

const ListBook = ({ history }: ListBookProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { status, books } = useSelector((state: RootState) => selector(state));

	const columns = React.useMemo<Column<Book>[]>(
		() => [
			{
				Header: () => t("book.properties.title"),
				accessor: "title"
			},
			{
				Header: () => t("book.properties.publishDate"),
				accessor: "publishDate",
				Cell: ({ cell: { value } }) =>
					value ? new Date(value).toLocaleString() : "No data"
			}
		],
		[t]
	);

	React.useEffect(() => {
		dispatch(fetchBooks());
	}, [dispatch]);

	return (
		<>
			<Typography variant="h3" color="initial">
				{t("common.books")}
			</Typography>
			<Button variant="text" color="primary" component={Link} to="/books/add">
				{t("book.create")}
			</Button>
			<Box display="flex" justifyContent="center">
				<Table
					isLoading={status === "pending" || status === "idle"}
					title={t("common.books")}
					data={books}
					columns={columns}
					actions={[
						{
							icon: () => <EditIcon />,
							tooltip: t("button.modify"),
							onClick: (event, rowData) => history.push(`/books/${rowData.id}/modify`)
						}
					]}
				/>
			</Box>
		</>
	);
};

export default ListBook;
