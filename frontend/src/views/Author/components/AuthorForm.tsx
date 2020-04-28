import React from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Author } from "shared/types";
import SubmitButton from "components/SubmitButton";

interface AuthorFormProps {
	onSubmit: (data: Author) => void;
	defaultValues?: Partial<Author>;
	isLoading?: boolean;
	text?: string;
}

const AuthorForm = ({
	onSubmit,
	text,
	defaultValues,
	isLoading = false,
}: AuthorFormProps) => {
	const { t } = useTranslation();
	const { register, handleSubmit, errors, control } = useForm<Author>();

	return (
		<form onSubmit={handleSubmit(onSubmit)} key={defaultValues?.id}>
			<Grid container spacing={2} justify="center" alignItems="center">
				<Grid item xs={12}>
					<TextField
						type="text"
						id="lastName"
						name="lastName"
						variant="outlined"
						label={t("author.properties.lastName")}
						inputRef={register({
							required: { value: true, message: t("validation:required") },
						})}
						defaultValue={defaultValues?.lastName}
						error={errors.lastName && true}
						helperText={errors.lastName?.message}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						type="text"
						id="firstName"
						name="firstName"
						variant="outlined"
						label={t("author.properties.firstName")}
						inputRef={register({
							required: { value: true, message: t("validation:required") },
						})}
						defaultValue={defaultValues?.firstName}
						error={errors.firstName && true}
						helperText={errors.firstName?.message}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						type="text"
						id="nationality"
						name="nationality"
						variant="outlined"
						label={t("author.properties.nationality")}
						inputRef={register({
							required: { value: true, message: t("validation:required") },
						})}
						defaultValue={defaultValues?.nationality}
						error={errors.nationality && true}
						helperText={errors.nationality?.message}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						as={
							// @ts-ignore
							<KeyboardDatePicker
								variant="dialog"
								label={t("author.properties.birthday")}
								inputVariant="outlined"
								format="yyyy. MM. dd."
								error={errors?.birthday && true}
								helperText={errors.birthday?.message}
								fullWidth
							/>
						}
						defaultValue={defaultValues?.birthday ?? null}
						control={control}
						name="birthday"
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						as={
							// @ts-ignore
							<KeyboardDatePicker
								variant="dialog"
								label={t("author.properties.diedOn")}
								inputVariant="outlined"
								format="yyyy. MM. dd."
								error={errors?.diedOn && true}
								helperText={errors.diedOn?.message}
								fullWidth
							/>
						}
						defaultValue={defaultValues?.diedOn ?? null}
						control={control}
						name="diedOn"
					/>
				</Grid>
			</Grid>
			<SubmitButton isLoading={isLoading}>
				{text ?? t("button.submit")}
			</SubmitButton>
		</form>
	);
};

export default AuthorForm;
