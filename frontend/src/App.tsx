import React from "react";
import { Switch, Route, RouteChildrenProps } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { hu as huLocale, enUS as enLocale } from "date-fns/locale";
import Home from "views/Home";
import NoMatch from "views/NoMatch";
import Layout from "components/Layout";

const localeMap = {
	en: enLocale,
	hu: huLocale,
};

// Routes
const BookRoutes = React.lazy(() => import("views/Book"));
const CategoryRoutes = React.lazy(() => import("views/Category"));
const AuthorRoutes = React.lazy(() => import("views/Author"));

// Views
const Search = React.lazy(() => import("views/Search"));

interface AppProps extends RouteChildrenProps {}

function App({ location }: AppProps) {
	const [locale] = React.useState<"hu" | "en">("hu");

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
			<Layout>
				<Switch location={location}>
					<Route path="/" component={Home} exact />
					<Route path="/books" component={BookRoutes} />
					<Route path="/categories" component={CategoryRoutes} />
					<Route path="/authors" component={AuthorRoutes} />
					<Route path="/search" component={Search} />
					<Route component={NoMatch} />
				</Switch>
			</Layout>
		</MuiPickersUtilsProvider>
	);
}

export default App;
