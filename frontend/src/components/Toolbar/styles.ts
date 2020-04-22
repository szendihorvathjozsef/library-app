import { Theme, makeStyles } from "@material-ui/core/styles";

const DRAWER_WIDTH = 240;

const useStyles = makeStyles(
	({ spacing, breakpoints, palette, shape, transitions, mixins }: Theme) => ({
		root: {
			flexGrow: 1
		},
		appBar: {
			[breakpoints.up("md")]: {
				width: `calc(100% - ${DRAWER_WIDTH}px)`,
				marginLeft: DRAWER_WIDTH
			}
		},
		menuButton: {
			marginRight: spacing(2),
			[breakpoints.up("md")]: {
				display: "none"
			}
		},
		title: {
			flexGrow: 1,
			display: "none",
			[breakpoints.up("sm")]: {
				display: "block"
			}
		},
		drawer: {
			[breakpoints.up("md")]: {
				width: DRAWER_WIDTH,
				flexShrink: 0
			}
		},
		drawerPaper: {
			width: DRAWER_WIDTH
		},
		listItem: {
			"&.active": {
				backgroundColor: palette.primary.light
			}
		},
		toolbar: {
			...mixins.toolbar,
			display: "flex",
			alignItems: "center",
			paddingLeft: spacing(2)
		}
	}),
	{ name: "Toolbar" }
);

export default useStyles;
