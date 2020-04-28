import React from "react";

import {
	Box,
	Typography,
	Paper,
	makeStyles,
	Theme,
	CircularProgress,
	Grid,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { RouteComponentProps } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "config/root-reducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "shared/slices/bookSlice";
import { coverImage } from "shared/network/book-api";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

type Props = RouteComponentProps<{ id: string }>;

const selector = createSelector(
	(state: RootState) => state.book,
	({ book, status }) => ({
		book,
		status,
	}),
);

const useStyles = makeStyles(
	({ spacing }: Theme) => ({
		avatar: {
			width: spacing(10),
			height: spacing(10),
		},
		title: {
			paddingLeft: spacing(2),
		},
		category: {
			paddingLeft: spacing(2),
		},
		pageCount: {
			lineHeight: "32px",
		},
	}),
	{ name: "BookDetails" },
);

const BookDetails = ({ match }: Props) => {
	const classes = useStyles();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { id } = match?.params ?? {};
	const { book, status } = useSelector(selector);

	React.useEffect(() => {
		if (id) {
			dispatch(fetchBook(parseInt(id, 10)));
		}
	}, [id]);

	return (
		<React.Fragment>
			{status === "idle" || status === "pending" ? (
				<Box display="flex" justifyContent="center">
					<CircularProgress size={64} />
				</Box>
			) : (
				<Paper>
					<Box display="flex" width="100%" p={2} flexDirection="column">
						<Box display="flex" alignItems="center">
							<Avatar
								src={coverImage(book.imageName)}
								alt={`${book.title} book's cover`}
								className={classes.avatar}
							/>
							<Typography variant="h4" className={classes.title}>
								{book.title}
							</Typography>
							<Typography variant="button" className={classes.category}>
								{book.category?.name}
							</Typography>
						</Box>
						<Grid container>
							<Grid item xs>
								<Typography variant="h6">{t("book.properties.authors")}:</Typography>
								<ul>
									{book.authors?.map(author => (
										<li>
											<Typography>
												{author.lastName} {author.firstName}
											</Typography>
										</li>
									))}
								</ul>
							</Grid>
							<Grid item xs>
								<Box display="flex" flexDirection="column">
									<Typography variant="h6">Adatok:</Typography>
									<Typography>
										{t("book.properties.pageCount")}: {book.pageCount}
									</Typography>
									{book.publishDate && (
										<Typography>
											{t("book.properties.publishDate")}:{" "}
											{format(new Date(book.publishDate), "yyyy. MM. dd.")}
										</Typography>
									)}
									{book.language && (
										<Typography>
											{t("book.properties.language")}: {book.language}
										</Typography>
									)}
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			)}
		</React.Fragment>
	);
};

export default BookDetails;
