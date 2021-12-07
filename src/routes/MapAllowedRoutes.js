import React, { memo } from 'react';
import { 
	Switch, 
	Route, 
	// useRouteMatch 
} from 'react-router-dom';
import NotFound from './../views/Common/NotFound';

function MapAllowedRoutes({routes, basePath, isAddNotFound}) {
	// const match = useRouteMatch(basePath);
	
	console.log(basePath)
	return (
		<Switch>
			{routes.map((route) => {
				/*
				* some variables are used by below code
				* some are not used by the code but destructure due to remove from rest object
				* just make sure that rest object only contain props that supported by react-router's route component
				* you may find props list here https://reactrouter.com/web/api/Route
				*/
				const { path, component: Component, children, title, permission, ...rest } = route;
				
				return (
					<Route 
					{...rest} 
					key={path} 
					path={`${basePath}${path}`}
					// path={`${match.path}${path}`}
					>
						
						<Component children={children} />
					</Route>
				)
			})}
			{isAddNotFound && <Route><NotFound /></Route>}
		</Switch>
	)
}
export default memo(MapAllowedRoutes);