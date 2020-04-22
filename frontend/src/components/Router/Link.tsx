import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Link = React.forwardRef(
	(props: any, ref: React.Ref<HTMLAnchorElement>) => (
		<RouterLink {...props} innerRef={ref} />
	)
);

export default Link;
