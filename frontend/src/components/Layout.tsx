import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "./Toolbar";

interface LayoutProps {
	children: React.ReactNode;
}

const useStyles = makeStyles(
	({ mixins, spacing }: Theme) => ({
		root: {
			display: "flex"
		},
		content: {
			flexGrow: 1,
			padding: spacing(3)
		},
		toolbar: mixins.toolbar
	}),
	{ name: "Fallback" }
);

const Layout = ({ children }: LayoutProps) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Toolbar />
			<Container maxWidth="xl" component="main" className={classes.content}>
				<div className={classes.toolbar} />
				{children}
			</Container>
		</div>
	);
};

export default Layout;
