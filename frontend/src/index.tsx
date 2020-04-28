import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { SnackbarProvider } from "notistack";
import store from "config/store";
import theme from "config/theme";
import Fallback from "components/Fallback";
import CloseSnackbar from "components/CloseSnackbar";
import "./i18n";

const render = () => {
	const App = require("./App").default;

	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<SnackbarProvider
						maxSnack={2}
						action={key => <CloseSnackbar itemKey={key} />}
					>
						<DndProvider backend={HTML5Backend}>
							<React.Suspense fallback={<Fallback />}>
								<App />
							</React.Suspense>
						</DndProvider>
					</SnackbarProvider>
				</ThemeProvider>
			</BrowserRouter>
		</Provider>,
		document.getElementById("root")
	);
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
	module.hot.accept("./App", render);
}
