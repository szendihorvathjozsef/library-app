import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(
	({ spacing }: Theme) => ({
		root: {
			padding: spacing(2)
		}
	}),
	{ name: "Fallback" }
);

const Fallback = () => {
	const classes = useStyles();

	return (
		<Container maxWidth="sm">
			<div className={classes.root}>
				<CircularProgress color="secondary" size={64} />
			</div>
		</Container>
	);
};

export default Fallback;