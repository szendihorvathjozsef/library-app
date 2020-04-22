import React from "react";
import clsx from "clsx";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(
	({ spacing }: Theme) => ({
		wrapper: {
			display: "flex",
			margin: spacing(1),
			position: "relative",
			justifyContent: "center"
		},
		button: {},
		progress: {
			position: "absolute",
			top: "50%",
			left: "50%",
			marginTop: -12,
			marginLeft: -12
		}
	}),
	{ name: "SubmitButton" }
);

interface SubmitButtonProps extends Omit<ButtonProps, "classes"> {
	classes?: Partial<ReturnType<typeof useStyles>>;
	isLoading: boolean;
}

const SubmitButton = ({
	classes,
	isLoading = false,
	children,
	variant = "contained",
	color = "primary",
	...rest
}: SubmitButtonProps) => {
	const defClasses = useStyles();

	return (
		<div className={clsx(defClasses.wrapper, classes?.wrapper)}>
			<Button
				variant={variant}
				color={color}
				type="submit"
				disabled={isLoading}
				{...rest}
			>
				{children}
			</Button>
			{isLoading && (
				<CircularProgress
					size={24}
					className={clsx(defClasses.progress, classes?.progress)}
				/>
			)}
		</div>
	);
};

export default SubmitButton;
