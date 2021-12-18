import { Box, styled } from '@mui/material';
import React, { Fragment } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { PrivateRoutesConfig } from '../config';
import '../styles/LinkEffect.css';
import { getAllowedRoutes, isLoggedIn } from '../utils';
import HeadBar from '../views/Common/HeadBar';
import MapAllowedRoutes from './MapAllowedRoutes';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	...theme.mixins.toolbar,
}))

export default function PrivateRoutes() {
	let history = useHistory()
	let allowedRoutes = [];
	const user = JSON.parse(localStorage.getItem("user"));
	allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);
	React.useEffect(() => {
		if (localStorage.getItem("token")) {
			if (localStorage.getItem("roles") === 'STUDENT')
				history.push(`/${user.Username}`)
		}// eslint-disable-next-line
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
						basePath={localStorage.getItem("roles") === 'STUDENT' ? `/${JSON.parse(localStorage.getItem("user")).Username.toString()}` : ""}
						isAddNotFound />
				</Box>

			</Box >
		</Fragment>
	);
}
