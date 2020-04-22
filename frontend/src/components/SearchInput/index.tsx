import React from "react";
import clsx from "clsx";
import InputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, Theme, fade } from "@material-ui/core/styles";

const useStyles = makeStyles(
	({ transitions, shape, spacing, breakpoints, palette }: Theme) => ({
		search: {
			position: "relative",
			borderRadius: shape.borderRadius,
			backgroundColor: fade(palette.common.white, 0.15),
			"&:hover": {
				backgroundColor: fade(palette.common.white, 0.25)
			},
			marginLeft: 0,
			width: "100%",
			[breakpoints.up("sm")]: {
				marginLeft: spacing(1),
				width: "auto"
			}
		},
		searchIcon: {
			padding: spacing(0, 2),
			height: "100%",
			position: "absolute",
			pointerEvents: "none",
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		},
		inputRoot: {
			color: "inherit"
		},
		inputInput: {
			padding: spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${spacing(4)}px)`,
			transition: transitions.create("width"),
			width: "100%",
			[breakpoints.up("sm")]: {
				width: "12ch",
				"&:focus": {
					width: "20ch"
				}
			}
		},
		inputError: {},
		errorHelperText: {
			color: palette.error.dark
		}
	}),
	{ name: "SearchBar" }
);

interface SearchInputProps extends Omit<InputBaseProps, "classes"> {
	classes?: Partial<Omit<ReturnType<typeof useStyles>, "search">>;
}

const SearchInput = ({
	classes,
	className,
	inputProps,
	...rest
}: SearchInputProps) => {
	const defClasses = useStyles();

	return (
		<div className={clsx(defClasses.search, className)}>
			<div className={clsx(defClasses.searchIcon, classes?.searchIcon)}>
				<SearchIcon />
			</div>
			<InputBase
				classes={{
					root: clsx(defClasses.inputRoot, classes?.inputRoot),
					input: clsx(defClasses.inputInput, classes?.inputInput),
					error: clsx(defClasses.inputError, classes?.inputError)
				}}
				inputProps={{ "aria-label": "search", ...inputProps }}
				{...rest}
			/>
		</div>
	);
};

export default SearchInput;
