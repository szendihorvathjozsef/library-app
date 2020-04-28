import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SliceStates } from "shared/types";
import Item from "./Item";
import { getStatistics } from "shared/network/dashboard-api";

interface Statistics {
	books: number;
	authors: number;
}

const Home = () => {
	const [status, setStatus] = React.useState<SliceStates>("idle");
	const [statistics, setStatistics] = React.useState<Statistics | null>(null);

	React.useEffect(() => {
		let source = axios.CancelToken.source();

		async function getData() {
			setStatus("pending");
			try {
				const { data } = await getStatistics(source.token);
				setStatistics(data);
				setStatus("success");
			} catch {
				setStatistics(null);
				setStatus("failure");
			}
		}

		getData();
		return () => {
			source.cancel();
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
