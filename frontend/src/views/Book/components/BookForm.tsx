import React from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Book } from "shared/types";
import SubmitButton from "components/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "config/root-reducer";
import { fetchCategories } from "shared/slices/categorySlice";
import { createSelector } from "@reduxjs/toolkit";
import { fetchAuthors } from "shared/slices/authorSlice";
import { fetchPublishers } from "shared/slices/publisherSlice";

interface BookFormProps {
	onSubmit: (data: Book) => void;
	defaultValues?: Partial<Book>;
	isLoading?: boolean;
	text?: string;
}

const selector = createSelector(
	(state: RootState) => state.author.authors,
	(state: RootState) => state.category.categories,
	(state: RootState) => state.publisher.publishers,
	(authors, categories, publishers) => ({ authors, categories, publishers }),
);

const BookForm = ({
	onSubmit,
	text,
	defaultValues,
	isLoading = false,
}: BookFormProps) => {
	const { t } = useTranslation();
	const { register, handleSubmit, errors, control } = useForm<Book>();
	const dispatch = useDispatch();
	const { categories, authors, publishers } = useSelector(selector);

	React.useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchAuthors());
		dispatch(fetchPublishers());
	}, [dispatch]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} key={defaultValues?.id}>
			<Grid container spacing={2} justify="center" alignItems="center">
				<Grid item xs={12}>
					<TextField
						id="title"
						type="text"
						name="title"
						variant="outlined"
						label={t("book.properties.title")}
						inputRef={register({
							required: { value: true, message: t("validation:required") },
							minLength: {
								value: 4,
								message: t("validation:minLength", { length: 4 }),
							},
						})}
						defaultValue={defaultValues?.title}
						error={errors.title && true}
						helperText={errors.title?.message}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="pageCount"
						name="pageCount"
						variant="outlined"
						label={t("book.properties.pageCount")}
						inputRef={register({
							required: { value: true, message: t("validation:required") },
							pattern: {
								value: /^-?\d+\.?\d*$/,
								message: t("validation:type.number"),
							},
							validate: {
								positive: value =>
									parseInt(value, 10) > 1 ||
									t("validation:min", { length: 0 }).toString(),
							},
						})}
						defaultValue={defaultValues?.pageCount}
						error={errors.pageCount && true}
						helperText={errors.pageCount?.message}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						as={
							<TextField
								id="categoryId"
								name="categoryId"
								variant="outlined"
								label={t("book.properties.category")}
								error={errors.categoryId && true}
								helperText={errors.categoryId?.message}
								fullWidth
								select
							>
								<MenuItem value="">Kérem válasszon</MenuItem>
								{categories?.map(category => (
									<MenuItem key={category.id} value={category.id}>
										{category.name}
									</MenuItem>
								))}
							</TextField>
						}
						control={control}
						name="categoryId"
						defaultValue={defaultValues?.categoryId ?? ""}
						rules={{ required: { value: true, message: t("validation:required") } }}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						rows="4"
						id="description"
						name="description"
						variant="outlined"
						label={t("book.properties.description")}
						inputRef={register({
							minLength: {
								value: 5,
								message: t("validation:minLength", { length: 5 }),
							},
							maxLength: {
								value: 255,
								message: t("validation:maxLength", { length: 255 }),
							},
						})}
						defaultValue={defaultValues?.description}
						error={errors.description && true}
						helperText={errors.description?.message}
						multiline
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="language"
						name="language"
						variant="outlined"
						label={t("book.properties.language")}
						inputRef={register}
						defaultValue={defaultValues?.language}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="translator"
						name="translator"
						variant="outlined"
						label={t("book.properties.translator")}
						inputRef={register}
						defaultValue={defaultValues?.translator}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						as={
							<TextField
								id="publisherId"
								name="publisherId"
								variant="outlined"
								label={t("book.properties.publisher")}
								error={errors.categoryId && true}
								helperText={errors.categoryId?.message}
								fullWidth
								select
							>
								<MenuItem value="">Kérem válasszon</MenuItem>
								{publishers?.map(publisher => (
									<MenuItem key={publisher.id} value={publisher.id}>
										{publisher.name}
									</MenuItem>
								))}
							</TextField>
						}
						control={control}
						name="publisherId"
						defaultValue={defaultValues?.publisherId ?? ""}
						rules={{ required: { value: true, message: t("validation:required") } }}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="image"
						name="image"
						type="file"
						variant="outlined"
						label={t("book.properties.imageName")}
						inputRef={register}
						InputLabelProps={{ shrink: true }}
						fullWidth
						defaultValue=""
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						as={
							<TextField
								id="authors"
								name="authors"
								variant="outlined"
								label={t("book.properties.authors")}
								fullWidth
								SelectProps={{
									multiple: true,
									renderValue: selected => {
										const selectedAuthors: string[] =
											authors
												.filter(a => (selected as number[]).includes(a.id))
												.map(a => `${a.lastName} ${a.firstName}`) ?? [];

										return selectedAuthors.join(", ");
									},
								}}
								select
							>
								<MenuItem value="">Kérem válasszon</MenuItem>
								{authors?.map(author => (
									<MenuItem key={author.id} value={author.id}>
										{author.lastName} {author.firstName}
									</MenuItem>
								))}
							</TextField>
						}
						control={control}
						name="authors"
						defaultValue={defaultValues?.authors ?? []}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						as={
							// @ts-ignore
							<KeyboardDatePicker
								variant="dialog"
								label={t("book.properties.publishDate")}
								inputVariant="outlined"
								format="yyyy. MM. dd."
								error={errors?.publishDate && true}
								helperText={errors.publishDate?.message}
								fullWidth
							/>
						}
						defaultValue={defaultValues?.publishDate}
						control={control}
						name="publishDate"
					/>
				</Grid>
			</Grid>
			<SubmitButton isLoading={isLoading}>
				{text ?? t("button.submit")}
			</SubmitButton>
		</form>
	);
};

export default BookForm;
