import React from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { createSelector } from "@reduxjs/toolkit";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { Author } from "shared/types";
import BackArrow from "components/BackArrow";
import { RootState } from "config/root-reducer";
import AuthorForm from "./components/AuthorForm";
import { fetchAuthor } from "shared/slices/authorSlice";
import { modifyAuthor } from "shared/network/author-api";

interface RouteParam {
	id: string;
}

interface ModifyBookProps extends RouteComponentProps<RouteParam> {}

const selector = createSelector(
	(state: RootState) => state.author,
	({ author, status }) => ({
		author,
		status,
	}),
);

const ModifyBook = ({ match }: ModifyBookProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { id } = match?.params ?? {};
	const { author, status } = useSelector(selector);
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		if (id) {
			dispatch(fetchAuthor(parseInt(id, 10)));
		}
	}, [id, dispatch]);

	async function onSubmit(data: Author) {
		setLoading(true);

		try {
			await modifyAuthor({
				id: author.id,
				firstName: data.firstName ?? author.firstName,
				lastName: data.lastName ?? author.lastName,
				nationality: data.nationality ?? author.nationality,
				birthday: data.birthday ?? author.birthday,
				diedOn: data.diedOn ?? author.diedOn,
			});

			enqueueSnackbar(
				t("notification.update.success", { subject: t("author.subject") }),
				{ variant: "success" },
			);
		} catch (e) {
			enqueueSnackbar(
				t("notification.update.success", { subject: t("author.subject") }),
				{ variant: "error" },
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Box display="flex" justifyContent="center">
			<Paper style={{ padding: 16, width: 400 }}>
				<BackArrow>{t("author.update")}</BackArrow>
				<AuthorForm
					isLoading={status === "pending" || status === "idle" || loading}
					onSubmit={onSubmit}
					defaultValues={author}
				/>
			</Paper>
		</Box>
	);
};

export default ModifyBook;
