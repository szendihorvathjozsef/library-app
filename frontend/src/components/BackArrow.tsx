import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ArrowBackOutlined from "@material-ui/icons/ArrowBackOutlined";
import { Link } from "components/Router";

interface BackArrowProps {
	to?: string;
	className?: string;
	children: React.ReactNode;
	classes?: Partial<ReturnType<typeof useStyles>>;
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
	toolbar: {
		marginBottom: spacing(1)
	},
	button: {
		flexBasis: "48px",
		flexGrow: 0
	},
	title: {
		flexBasis: "calc(100% - 48px)",
		flexGrow: 0,
		marginLeft: 0
	}
}));

const BackArrow = ({ to, children, className }: BackArrowProps) => {
	const classes = useStyles();
	const history = useHistory();
	const localTo = to ?? history.location.pathname;

	function handleClick() {
		if (!to) {
			history.goBack();
		}
	}

	return (
		<Toolbar disableGutters className={classes.toolbar}>
			<IconButton
				to={localTo}
				component={Link}
				onClick={handleClick}
				className={classes.button}
			>
				<ArrowBackOutlined />
			</IconButton>
			<Typography
				variant="h5"
				align="center"
				className={clsx(classes.title, className)}
				noWrap
			>
				{children}
			</Typography>
		</Toolbar>
	);
};

export default BackArrow;
