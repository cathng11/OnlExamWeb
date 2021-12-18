import React, { memo } from 'react';
import {
	Switch,
	Route,
	Redirect,
	useRouteMatch
} from 'react-router-dom';
import NotFound from './../views/Common/NotFound';
import { authentication } from './Authentication';

function MapAllowedRoutes({ routes, basePath, isAddNotFound }) {
	const match = useRouteMatch(basePath);
	let _path = "";
	return (
		<Switch>
			{routes.map((route) => {
				const { path, component: Component, children, title, permission, ...rest } = route;
				if (match && localStorage.getItem('roles')==='STUDENT') {
					_path = `${match.path}${path}`
				}
				else if (match && localStorage.getItem('roles')==='TEACHER')
				{
					_path = `${basePath}${path}`
				}else{
					_path = `${basePath}${path}`
				}
				return (
					<Route
						{...rest}
						key={path}
						path={_path}
					>

						{authentication.isAuthentication() ? <Component children={children} /> : <Redirect to='/login' />}
					</Route>
				)
			})}
			{isAddNotFound && <Route><NotFound /></Route>}
		</Switch >
	)
}
export default memo(MapAllowedRoutes);