import React from "react";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "../../Router";

const useStyles = makeStyles(
	({ palette }: Theme) => ({
		listItem: {
			cursor: "pointer",
			alignContent: "center",
			"& $listItemIcon": {
				color: "black",
				zoom: "100%"
			},
			"& svg": {
				display: "block",
				transform: "translateX(30%)"
			},
			"&$activeListItem": {
				background: palette.secondary.light
			}
		},
		activeListItem: {},
		listItemText: {},
		listItemIcon: {
			marginRight: 0,
			paddingTop: "0px",
			paddingBottom: "0px"
		}
	}),
	{ name: "DrawerItem" }
);

interface DrawerItem {
	classes?: ReturnType<typeof useStyles>;
	to: string;
	text: string;
	icon: React.ReactElement<any>;
	className?: string;
}

const DrawerItem = ({ to, icon, text, classes, className }: DrawerItem) => {
	const defClasses = useStyles();

	return (
		<ListItem
			to={to}
			component={NavLink}
			activeClassName={defClasses.activeListItem}
			className={clsx(defClasses.listItem, className)}
			button
			exact
		>
			<ListItemIcon className={defClasses.listItemIcon}>{icon}</ListItemIcon>
			<ListItemText primary={text} className={defClasses.listItemText} />
		</ListItem>
	);
};

export default DrawerItem;
