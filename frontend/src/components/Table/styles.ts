import { makeStyles, Theme } from "@material-ui/core/styles";

const useTableStyles = makeStyles(
	({ zIndex }: Theme) => ({
		paper: {
			position: "relative"
		},
		loading: {
			position: "absolute",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			right: 0,
			bottom: 0,
			top: 0,
			left: 0,
			backgroundColor: "rgba(255, 255, 255, 0.85)",
			WebkitTapHighlightColor: "transparent",
			zIndex: zIndex.drawer
		}
	}),
	{ name: "Table" }
);

export default useTableStyles;
