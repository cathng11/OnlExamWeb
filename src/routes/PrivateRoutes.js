import { Box, styled } from '@mui/material';
import React, { Fragment, useContext } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { PrivateRoutesConfig } from '../config';
import '../styles/LinkEffect.css';
import { getAllowedRoutes, isLoggedIn } from '../utils';
import HeadBar from '../views/Common/HeadBar';
import UserContext from './../context/UserContext';
import MapAllowedRoutes from './MapAllowedRoutes';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	...theme.mixins.toolbar,
}))

export default function PrivateRoutes() {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	let history = useHistory()
	let allowedRoutes = [];
	const user = JSON.parse(localStorage.getItem("user"));
	allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);
	React.useEffect(() => {
		if (localStorage.getItem("token")) {
			if (localStorage.getItem("roles") === 'STUDENT')
				history.push(`/${user.Username}`)

		}

	}, [])
	if (isLoggedIn()) allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);
	else return <Redirect to="/login" />;
	return (
		<Fragment>
			<Box sx={{ display: 'flex' }}>
				<HeadBar allowedRoutes={allowedRoutes} />
				<Box component="main" sx={{ flexGrow: 1, background: 'white' }}>
					<DrawerHeader sx={{ background: 'white' }}></DrawerHeader>
					<MapAllowedRoutes
						routes={allowedRoutes}
						basePath={localStorage.getItem("roles") === 'STUDENT' ? `/${JSON.parse(localStorage.getItem("user")).Username}` : ""}
						isAddNotFound />
				</Box>

			</Box >
		</Fragment>
	);
}
