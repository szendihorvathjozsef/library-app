import React from "react";
import { useDrag, useDrop, DropTargetMonitor, XYCoord } from "react-dnd";
import Box from "@material-ui/core/Box";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

interface CellProps {
	column: any;
	index: number;
	moveColumn: (dragIndex: number, hoverIndex: number) => void;
}

const TYPE = "CELL";

const useStyles = makeStyles(
	({ transitions }: Theme) => ({
		box: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",

			"& $dragHandle": {
				opacity: 0,
				transition: transitions.create("opacity", { duration: 300 })
			},
			"&:hover $dragHandle, &:focus $dragHandle": {
				opacity: 1
			}
		},
		dragHandle: {
			cursor: "move"
		}
	}),
	{ name: "Cell" }
);

const Cell = ({ column, index, moveColumn, ...rest }: CellProps) => {
	const classes = useStyles();
	const dragRef = React.useRef<HTMLButtonElement>(null!);
	const ref = React.useRef<HTMLTableHeaderCellElement>(null!);

	const [, drop] = useDrop({
		accept: TYPE,
		hover(item: any, monitor: DropTargetMonitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current!.getBoundingClientRect();

			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			const clientOffset = monitor.getClientOffset();

			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			moveColumn(dragIndex, hoverIndex);

			item.index = hoverIndex;
		}
	});

	const [{ isDragging }, drag, preview] = useDrag({
		item: { type: TYPE, index },
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging()
		})
	});

	if (column.id !== "action") {
		preview(drop(ref));
		drag(dragRef);

		return (
			<TableCell ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} {...rest}>
				<Box className={classes.box}>
					<IconButton
						size="small"
						ref={dragRef}
						className={classes.dragHandle}
						onClick={e => e.stopPropagation()}
					>
						<DragIndicatorIcon />
					</IconButton>
					<span>{column.render("Header")}</span>
					<TableSortLabel
						active={column.isSorted}
						direction={column.isSortedDesc ? "desc" : "asc"}
					/>
				</Box>
			</TableCell>
		);
	}

	return <TableCell>{column.render("Header")}</TableCell>;
};

export default Cell;
