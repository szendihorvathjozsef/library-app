import React from "react";
import { useTranslation } from "react-i18next";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import MuiToolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import DrawerItem from "./DrawerItem";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { transformQueryParam } from "shared/util/query";
import SearchInput from "../SearchInput";

// @ts-ignore
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const Toolbar = () => {
	const classes = useStyles();
	const history = useHistory();
	const { t } = useTranslation();
	const [state, setState] = React.useState(false);
	const inputRef = React.useRef<HTMLInputElement>(null!);

	function toggleState() {
		setState(prev => !prev);
	}

	function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter" && inputRef.current?.value) {
			event.preventDefault();
			history.push(
				`/search?keyword=${transformQueryParam(inputRef.current.value)}`,
			);
		}
	}

	const drawer = (
		<React.Fragment>
			<Divider />
			<List>
				<DrawerItem to="/" text={t("common.home")} icon={<HomeOutlinedIcon />} />
				<DrawerItem
					to="/books"
					text={t("common.books")}
					icon={<MenuBookOutlinedIcon />}
				/>
				<DrawerItem
					to="/categories"
					text={t("common.categories")}
					icon={<CategoryOutlinedIcon />}
				/>
				<DrawerItem
					to="/authors"
					text={t("common.authors")}
					icon={<PersonOutlineOutlinedIcon />}
				/>
			</List>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<div className={classes.root}>
				<AppBar position="fixed" className={classes.appBar}>
					<MuiToolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="open drawer"
							onClick={toggleState}
						>
							<MenuIcon />
						</IconButton>
						<Typography className={classes.title} variant="h6" noWrap>
							{t("application")}
						</Typography>
						<SearchInput
							type="search"
							name="keyword"
							id="search-input"
							aria-describedby="search-input-helper-text"
							placeholder="Keresés..."
							onKeyPress={handleKeyPress}
							inputRef={inputRef}
						/>
					</MuiToolbar>
				</AppBar>
			</div>
			<nav className={classes.drawer} aria-label="navigation drawer">
				<Hidden smDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						<div className={classes.toolbar} />
						<div role="presentation">{drawer}</div>
					</Drawer>
				</Hidden>
				<Hidden mdUp implementation="css">
					<SwipeableDrawer
						disableBackdropTransition={!iOS}
						disableDiscovery={iOS}
						anchor="left"
						open={state}
						onClose={toggleState}
						onOpen={toggleState}
						ModalProps={{
							keepMounted: true,
						}}
						classes={{
							paper: classes.drawerPaper,
						}}
					>
						<div className={classes.toolbar}>
							<Typography variant="h6" noWrap>
								{t("application")}
							</Typography>
						</div>
						<div onClick={toggleState} role="presentation">
							{drawer}
						</div>
					</SwipeableDrawer>
				</Hidden>
			</nav>
		</React.Fragment>
	);
};

export default Toolbar;
