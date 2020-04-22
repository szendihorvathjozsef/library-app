import React from "react";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { lighten, makeStyles, Theme } from "@material-ui/core/styles";
import GlobalFilter from "./GlobalFilter";

const useToolbarStyles = makeStyles(({ spacing, palette }: Theme) => ({
	root: {
		paddingLeft: spacing(2),
		paddingRight: spacing(1)
	},
	highlight:
		palette.type === "light"
			? {
					color: palette.secondary.main,
					backgroundColor: lighten(palette.secondary.light, 0.85)
			  }
			: {
					color: palette.text.primary,
					backgroundColor: palette.secondary.dark
			  },
	title: {
		flex: "1 1 100%"
	}
}));

interface TableToolbarProps {
	title: string;
	globalFilter: string;
	setGlobalFilter: (value: string | undefined) => void;
	preGlobalFilteredRows: any[];
}

const TableToolbar = ({
	title,
	globalFilter,
	setGlobalFilter,
	preGlobalFilteredRows
}: TableToolbarProps) => {
	const classes = useToolbarStyles();
	return (
		<Toolbar className={classes.root}>
			<Typography className={classes.title} variant="h6" id="tableTitle">
				{title}
			</Typography>
			<GlobalFilter
				preGlobalFilteredRows={preGlobalFilteredRows}
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
			/>
		</Toolbar>
	);
};

export default TableToolbar;
