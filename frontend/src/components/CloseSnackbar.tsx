import React from "react";
import { useSnackbar } from "notistack";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

interface SnackbarCloseButtonProps {
	itemKey: string | number;
}

const CloseSnackbar = ({ itemKey }: SnackbarCloseButtonProps) => {
	const { closeSnackbar } = useSnackbar();

	return (
		<IconButton onClick={() => closeSnackbar(itemKey)}>
			<CloseIcon />
		</IconButton>
	);
};

export default CloseSnackbar;
