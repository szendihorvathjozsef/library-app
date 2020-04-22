import React from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

interface ItemProps {
	title: string;
	content: any;
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: "flex",
		justifyContent: "space-between",
		minHeight: 200
	},
	details: {
		display: "flex",
		flexDirection: "column"
	},
	content: {
		flex: "1 0 auto"
	},
	cover: {
		maxWidth: 200,
		width: 200
	},
	controls: {
		display: "flex",
		alignItems: "center",
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1)
	},
	playIcon: {
		height: 38,
		width: 38
	}
}));

export default function Item(props: ItemProps) {
	const classes = useStyles();
	const { t } = useTranslation();
	const { title, content } = props;

	return (
		<Card className={classes.root}>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography component="h5" variant="h5">
						{t(`common.${title}`)}
					</Typography>
					{content}
				</CardContent>
				<div className={classes.controls}></div>
			</div>
			<CardMedia
				className={classes.cover}
				image="https://picsum.photos/seed/picsum/200/300"
				title="Live from space album cover"
			/>
		</Card>
	);
}
