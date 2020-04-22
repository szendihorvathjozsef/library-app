import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Category } from "shared/types";
import SubmitButton from "components/SubmitButton";

interface CategoryFormProps {
	onSubmit: (data: Category) => void;
	defaultValues?: Partial<Category>;
	isLoading?: boolean;
	text?: string;
}

const CategoryForm = ({
	onSubmit,
	text,
	defaultValues,
	isLoading = false
}: CategoryFormProps) => {
	const { t } = useTranslation();
	const { register, handleSubmit, errors } = useForm<Category>();

	return (
		<form onSubmit={handleSubmit(onSubmit)} key={defaultValues?.id}>
			<Grid container spacing={2} justify="center" alignItems="center">
				<Grid item xs={12}>
					<TextField
						id="name"
						type="text"
						name="name"
						variant="outlined"
						label={t("book.properties.title")}
						inputRef={register({
							required: { value: true, message: t("validation:required") },
							minLength: {
								value: 1,
								message: t("validation:minLength", { length: 1 })
							}
						})}
						defaultValue={defaultValues?.name}
						error={errors.name && true}
						helperText={errors.name?.message}
						fullWidth
					/>
				</Grid>
			</Grid>
			<SubmitButton isLoading={isLoading}>
				{text ?? t("button.submit")}
			</SubmitButton>
		</form>
	);
};

export default CategoryForm;
