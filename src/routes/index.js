import React, { memo } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import history from '../utils/history';
import Login from '../views/Common/Login';
import { authentication } from './Authentication';
import PrivateRoutes from './PrivateRoutes';

function Routes() {
	return (
		<Router history={history}>
			<Switch>
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Login} />
				<PrivateRoute path="/" component={PrivateRoutes} />
			</Switch>
		</Router>
	)
}
function PrivateRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={props => (
				authentication.isAuthentication() ?
					(<Component {...props} />)
					:
					(<Redirect to="/login" />)
			)}
		></Route>
	)
}
export default memo(Routes);

