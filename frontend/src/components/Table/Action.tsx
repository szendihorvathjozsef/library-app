import React from "react";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Row } from "react-table";

export interface TableAction<T extends object> {
	onClick: (event: any, rowData: T) => void;
	disabled?: boolean;
	icon: () => React.ReactElement<any>;
	isFreeAction?: boolean;
	position?: "auto" | "toolbar" | "toolbarOnSelect" | "row";
	tooltip?: string;
	hidden?: boolean;
}

interface TableActionProps<T extends object> {
	data: Row<T>;
	size?: "small" | "medium";
	action: TableAction<T>;
}

const Action = <T extends object>({
	data,
	size = "medium",
	action
}: TableActionProps<T>) => {
	if (action.hidden) {
		return null;
	}

	const disabled = action.disabled;

	const handleOnClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		if (action.onClick) {
			action.onClick(event, data.original);
			event.stopPropagation();
		}
	};

	const icon =
		typeof action.icon === "string" ? (
			<Icon>{action.icon}</Icon>
		) : (
			<action.icon />
		);

	const button = (
		<IconButton
			size={size}
			color="inherit"
			disabled={disabled}
			onClick={handleOnClick}
		>
			{icon}
		</IconButton>
	);

	if (action.tooltip) {
		return disabled ? (
			<Tooltip title={action.tooltip}>
				<span>{button}</span>
			</Tooltip>
		) : (
			<Tooltip title={action.tooltip}>{button}</Tooltip>
		);
	} else {
		return button;
	}
};

export default Action;
