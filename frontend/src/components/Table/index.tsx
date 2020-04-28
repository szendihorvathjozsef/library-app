import React from "react";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import MuiTable from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableContainer from "@material-ui/core/TableContainer";
import CircularProgress from "@material-ui/core/CircularProgress";
import MuiTablePagination, {
	LabelDisplayedRowsArgs
} from "@material-ui/core/TablePagination";

import {
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable,
	Column
} from "react-table";

import { useImmer } from "shared/hooks/useImmer";
import Cell from "./Cell";
import TableToolbar from "./TableToolbar";
import TablePaginationAction from "./TablePaginationAction";
import useTableStyles from "./styles";
import Action, { TableAction } from "./Action";

interface TableProps<T extends object> {
	data: T[];
	columns: Column<T>[];
	title: string;
	isLoading?: boolean;
	rowsPerPageOptions?: Array<number | { label: string; value: number }>;
	actions?: TableAction<T>[];
}

const Table = <T extends object>({
	data,
	title,
	columns: defColumns,
	isLoading = false,
	rowsPerPageOptions: defRowsPerPageOptions,
	actions
}: TableProps<T>) => {
	const { t } = useTranslation();
	const classes = useTableStyles();
	const [columns, setColums] = useImmer<Column<T>[]>(defColumns);
	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,
		preGlobalFilteredRows,
		setGlobalFilter,
		state: { pageIndex, pageSize, globalFilter }
	} = useTable<T>(
		{
			columns,
			data
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		hooks => {
			if (actions) {
				hooks.visibleColumns.push(columns => [
					...columns,
					{
						id: "action",
						Header: () => <div />,
						Cell: ({ row }) => {
							return actions
								.filter(a => !a.isFreeAction)
								.map((a, index) => <Action data={row} action={a} key={index} />);
						}
					}
				]);
			}
		}
	);

	const rowsPerPageOptions = defRowsPerPageOptions ?? [
		5,
		10,
		25,
		{ label: t("table:all"), value: data.length }
	];

	function handleChangePage(
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) {
		gotoPage(newPage);
	}

	function handleChangeRowsPerPage(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setPageSize(parseInt(event.target.value, 10));
	}

	function moveColumn(dragIndex: number, hoverIndex: number) {
		setColums((draft: Column<T>[]) => {
			let item = draft[dragIndex];
			draft.splice(dragIndex, 1);
			draft.splice(hoverIndex, 0, item);
		});
	}

	return (
		<TableContainer>
			<Paper className={classes.paper}>
				<TableToolbar
					preGlobalFilteredRows={preGlobalFilteredRows}
					setGlobalFilter={setGlobalFilter}
					globalFilter={globalFilter}
					title={title}
				/>
				{isLoading && (
					<div className={classes.loading}>
						<CircularProgress color="primary" size={48} />
					</div>
				)}
					<MuiTable {...getTableProps()}>
						<TableHead>
							{headerGroups.map(headerGroup => (
								<TableRow {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column, index) => (
										<Cell
											index={index}
											column={column}
											moveColumn={moveColumn}
											key={index}
											{...column.getHeaderProps(column.getSortByToggleProps())}
										/>
									))}
								</TableRow>
							))}
						</TableHead>
						<TableBody>
							{page.map((row, i) => {
								prepareRow(row);
								return (
									<TableRow {...row.getRowProps()}>
										{row.cells.map(cell => {
											return (
												<TableCell {...cell.getCellProps()}>
													{cell.render("Cell")}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
						<TableFooter>
							<TableRow>
								<MuiTablePagination
									rowsPerPageOptions={rowsPerPageOptions}
									colSpan={3}
									count={data.length}
									rowsPerPage={pageSize}
									page={pageIndex}
									SelectProps={{
										inputProps: { "aria-label": "rows per page" },
										native: true
									}}
									labelDisplayedRows={({ from, count, to }: LabelDisplayedRowsArgs) =>
										t("table:displayedRows", {
											from: from,
											to: to === -1 ? count : to,
											count: count !== -1 ? count : to
										})
									}
									labelRowsPerPage={t("table:rowsPerPage")}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
									ActionsComponent={TablePaginationAction}
								/>
							</TableRow>
						</TableFooter>
					</MuiTable>
			</Paper>
		</TableContainer>
	);
};

export default Table;
