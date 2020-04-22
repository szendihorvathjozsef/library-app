import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(
	({ spacing }: Theme) => ({
		root: {
			padding: spacing(2)
		}
	}),
	{ name: "NoMatch" }
);

const NoMatch = () => {
	const classes = useStyles();

	return (
		<Container maxWidth="sm">
			<div className={classes.root}>
				<Typography variant="h3" color="initial">
					404! A kerestt oldal nem található.
				</Typography>
			</div>
		</Container>
	);
};

export default NoMatch;
