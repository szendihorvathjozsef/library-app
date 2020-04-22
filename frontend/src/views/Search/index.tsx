import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import useQuery from "shared/hooks/useQuery";
import { makeStyles, Theme } from "@material-ui/core";

interface State {
	keyword?: string;
}

interface SearchProps extends RouteComponentProps<{}, {}, State> {}

const useStyles = makeStyles(({ palette }: Theme) => ({
	inputRoot: {
		/* backgroundColor: fade(palette.secondary.main, 0.6),
		"&:hover, &:focus": {
			backgroundColor: fade(palette.secondary.main, 0.6)
		} */
	}
}));

const Search = ({ history }: SearchProps) => {
	const query = useQuery();
	const classes = useStyles();
	const keyword = query.get("keyword") ?? null;
	const inputRef = React.useRef<HTMLInputElement>(null!);

	function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter" && inputRef.current?.value) {
			event.preventDefault();
		}
	}

	React.useEffect(() => {
		if (keyword) {
			console.log(keyword);
		}
	}, [keyword]);

	return (
		<Grid container spacing={2} justify="center">
			<Grid item xs={6}>
				<FormControl hiddenLabel variant="filled" fullWidth>
					<FilledInput
						id="filled-adornment-weight"
						inputRef={inputRef}
						classes={{
							root: classes.inputRoot
						}}
						defaultValue={keyword}
						onKeyPress={handleKeyPress}
						startAdornment={
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						}
						placeholder="Keresés..."
						aria-describedby="filled-weight-helper-text"
						inputProps={{
							"aria-label": "weight"
						}}
						fullWidth
					/>
				</FormControl>
			</Grid>
		</Grid>
	);
};

export default Search;
