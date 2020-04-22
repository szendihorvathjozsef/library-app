import React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import ListBook from "./ListBook";
import CreateBook from "./CreateBook";
import ModifyBook from "./ModifyBook";

interface BookRoutesProps extends RouteComponentProps {}

const BookRoutes = ({ location, match }: BookRoutesProps) => (
	<Switch location={location}>
		<Route exact path={match?.path} component={ListBook} />
		<Route path={`${match?.path}/add`} component={CreateBook} />
		<Route path={`${match?.path}/:id/modify`} component={ModifyBook} />
	</Switch>
);

export default BookRoutes;
