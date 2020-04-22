import React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import ListCategory from "./ListCategory";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";

interface CategoryRoutesProps extends RouteComponentProps {}

const CategoryRoutes = ({ location, match }: CategoryRoutesProps) => (
	<Switch location={location}>
		<Route exact path={match?.path} component={ListCategory} />
		<Route path={`${match?.path}/create`} component={CreateCategory} />
		<Route path={`${match?.path}/:id/update`} component={UpdateCategory} />
	</Switch>
);

export default CategoryRoutes;
