import React from 'react';
import {
	Route as ReactRouterDomRoute,
	RouteProps as ReactRouterDomProps,
	Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactRouterDomProps {
	isPrivate?: boolean;
	component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
	isPrivate = false,
	component: Component,
	...rest
}) => {
	const { user } = useAuth();
	const isSigned = !!user;

	return (
		<ReactRouterDomRoute
			{...rest}
			render={({ location }) => {
				return isPrivate === isSigned ? (
					<Component />
				) : (
					<Redirect
						to={{
							pathname: isPrivate ? '/' : '/dashboard',
							state: { from: location },
						}}
					/>
				);
			}}
		/>
	);
};

export default Route;
