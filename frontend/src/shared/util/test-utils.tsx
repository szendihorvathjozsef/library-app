import React from "react";
import i18n from "i18next";
import DateFnsUtils from "@date-io/date-fns";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { render, RenderOptions } from "@testing-library/react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { hu } from "date-fns/locale";
import store from "config/store";
import theme from "config/theme";
import { RootState } from "config/root-reducer";

i18n.use(initReactI18next).init({
	ns: ["validation", "table"],
	fallbackLng: "hu",
	react: {
		useSuspense: false
	}
});

function customRender(
	ui: React.ReactElement,
	reduxState?: RootState,
	options?: Omit<RenderOptions, "queries">
) {
	return {
		...render(ui, {
			wrapper: ({ children }) => (
				<BrowserRouter basename="/">
					<I18nextProvider i18n={i18n}>
						<ReduxProvider store={store}>
							<MuiPickersUtilsProvider utils={DateFnsUtils} locale={hu}>
								<ThemeProvider theme={theme}>{children}</ThemeProvider>
							</MuiPickersUtilsProvider>
						</ReduxProvider>
					</I18nextProvider>
				</BrowserRouter>
			),
			...options
		}),
		store: store
	};
}

// re-export everything
export * from "@testing-library/react";
export * from "@testing-library/user-event";

// override render method
export { customRender as render };
