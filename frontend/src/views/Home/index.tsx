import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SliceStates } from "shared/types";
import Item from "./Item";

interface Statistics {
	books: number;
	authors: number;
	categories: string[];
}

const Home = () => {
	const [status, setStatus] = React.useState<SliceStates>("idle");
	const [statistics, setStatistics] = React.useState<Statistics | null>(null);

	React.useEffect(() => {
		setStatus("pending");
		const timer = setTimeout(() => {
			setStatistics({
				books: 100,
				authors: 20,
				categories: "test, lorem, ipsum, dolor".split(",")
			});
			setStatus("success");
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	if (status === "idle" || status === "pending") {
		return (
			<Grid container item justify="center" alignItems="stretch">
				<CircularProgress color="secondary" size={48} />
				<Typography variant="h6" color="initial">
					Töltés...
				</Typography>
			</Grid>
		);
	}

	return (
		<Grid container spacing={2}>
			{statistics &&
				Object.entries(statistics).map(([key, value]) => (
					<Grid xs={12} sm={4} md={4} lg={3} item key={key}>
						<Item title={key} content={value} />
					</Grid>
				))}
		</Grid>
	);
};

export default Home;
