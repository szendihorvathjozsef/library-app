import React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import ListAuthor from "./ListAuthor";
import CreateAuthor from "./CreateAuthor";
import ModifyBook from "./ModifyAuthor";

interface AuthorRoutesProps extends RouteComponentProps {}

const AuthorRoutes = ({ location, match }: AuthorRoutesProps) => (
	<Switch location={location}>
		<Route exact path={match?.path} component={ListAuthor} />
		<Route path={`${match?.path}/add`} component={CreateAuthor} />
		<Route path={`${match?.path}/:id/modify`} component={ModifyBook} />
	</Switch>
);

export default AuthorRoutes;
