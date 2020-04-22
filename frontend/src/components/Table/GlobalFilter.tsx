import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import SearchInput from "../SearchInput";

interface GlobalFilterProps {
	preGlobalFilteredRows: any[];
	globalFilter: string;
	setGlobalFilter: (value: string | undefined) => void;
}

const useStyles = makeStyles({
	search: {
		backgroundColor: "rgba(0,0,0,.25)",
		"&:hover": {
			backgroundColor: "rgba(0,0,0,.15)"
		}
	}
});

const GlobalFilter = ({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter
}: GlobalFilterProps) => {
	const { t } = useTranslation();
	const classes = useStyles();
	const count = preGlobalFilteredRows.length;

	// Global filter only works with pagination from the first page.
	// This may not be a problem for server side pagination when
	// only the current page is downloaded.

	return (
		<SearchInput
			value={globalFilter || ""}
			onChange={e => {
				setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
			}}
			placeholder={`${count} ${t("table:record")}`}
			className={classes.search}
		/>
	);
};

export default GlobalFilter;
